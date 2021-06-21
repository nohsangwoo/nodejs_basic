const express = require('express');
const app = express();
const sanitizeHtml = require('sanitize-html');

// about session
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

// for upload
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/image');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var path = require('path');

var upload = multer({
  storage: storage,
  //   파일 확장자 제한
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return callback(new Error('PNG, JPG만 업로드하세요'));
    }
    callback(null, true);
  },
  //   파일 사이즈 제한
  limits: {
    fileSize: 1024 * 1024,
  },
});
// end of upload settings

var imageFolder = './public/image';
var fs = require('fs');
// app.use : 미들웨어를 사용하겠다는 뜻
app.use(
  session({ secret: '비밀코드', resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
// ejs사용하겠다 선언
app.set('view engine', 'ejs');
require('dotenv').config();

// 미들웨어 추가
// public 폴더를 사용할것이다 라는 의미
app.use('/public', express.static('public'));

// 로그인 했는지 여부
function isLogin(req, res, next) {
  console.log('islogin?', req.user);
  if (req.user) {
    // next의 뜻은 next()로 통과 시켜달라는 의미
    next();
  } else {
    res.render('login');
    // res.send('this user is logged in');
  }
}

// 생성하려는 PORT번호 설정
PORT = 8080;

// mongoDB사용하기위한 라이브러리 호출
const MongoClient = require('mongodb').MongoClient;

const MONGO_DB_PASSWORD = process.env.MONGODB_DB_ACCESS_PASSWORD;
const MONGO_DB_ID = process.env.MONGODB_DB_ACCESS_ID;

const mongoDBurl =
  'mongodb+srv://' +
  MONGO_DB_ID +
  ':' +
  MONGO_DB_PASSWORD +
  '@cluster0.ay4zt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// console.log(mongoDBurl);

let db;
// 연결 설정
MongoClient.connect(
  mongoDBurl,
  { useUnifiedTopology: true },
  (error, client) => {
    // error 핸들링 및 early return
    if (error) {
      return console.log(error);
    }

    // todoapp이라는 database에 연결 요청
    db = client.db('todoapp');

    app.listen(PORT, function () {
      console.log('listening on ' + PORT);
    });
  }
);

app.get('/pet', (req, res) => {
  res.send('펫 용품 쇼핑 사이트');
});

app.get('/beauty', (req, res) => {
  res.send('뷰티 용품 쇼핑 사이트');
});

// 요청에대한 응답으로 파일을 보낼수 있음
// __dirname : 현재 디렉토리 경로
app.get('/', isLogin, (req, res) => {
  // res.render('index');
  res.render('mypage', { user: req.user });
});

app.get('/write', isLogin, (req, res) => {
  res.render('write');
});

// post request 처리
app.post('/add', isLogin, (req, res) => {
  //   res.sendFile(__dirname + 'add.html');
  //   console.log(req.body);
  const { title, date } = req.body;
  //   counter에서 현재 저장된 총 게시물의 갯수를 불러옴
  db.collection('counter').findOne(
    { name: 'numberOfPost' },
    (error, result) => {
      if (error) {
        return console.log(error);
      }
      // console.log(result);
      // console.log(req.user);
      // return;
      let prevTotalPost = result.totalPost;

      const insertContents = {
        _id: prevTotalPost + 1,
        title,
        date,
        admin: req.user._id,
      };

      // post라는 collection에 하나를 저장할것임
      //   총게시물 개수 +1로 아이디를 지정하고 나머지 데이터 저장
      db.collection('post').insertOne(insertContents, (error, result) => {
        // console.log('DB 저장완료');

        //   counter라는 콜렉션에 있는 totalPost 라는 항목도 1 증가시켜주기(수정)
        //  arg1: 수정할 데이터 조건, arg2:수정값, ags3: 결과 처리
        db.collection('counter').updateOne(
          { name: 'numberOfPost' },
          // update operator
          // $set :{변결할 변수 : 변경할 값}
          // $inc(증가)
          // min(기존값보다 적을때만 변경)
          // rename(key값 이름 변경)
          // ...
          { $inc: { totalPost: 1 } },
          (error, result) => {
            if (error) {
              return console.log(error);
            }
            console.log('counter 증가 완료');
          }
        );
      });
    }
  );
  res.redirect('/');
});

// ejs를 사용하는 list 요청처리
app.get('/list', (req, res) => {
  // 해당 post collection에 포함된 모든 데이터를 가져온다
  // 모든 데이터를 찾아달라할때 자주 사용됨 find().toArray()
  db.collection('post')
    .find()
    .toArray((error, result) => {
      if (error) {
        return console.log(error);
      }
      res.render('list', { posts: result });
    });
});

// delete
app.delete('/delete', (req, res) => {
  //   const getId = +req?.body?._id;
  //   console.log('on delete', req.body);
  // console.log(req.user, req.body);
  // return;
  const deleteCondition = {
    _id: +req.body._id,
    admin: req.user._id,
  };

  // let isExist = true;
  db.collection('post').findOne(deleteCondition, (error, isExist) => {
    db.collection('post').deleteOne(deleteCondition, (error, result) => {
      // console.log('결과:', result);
      if (!isExist) {
        res.status(400).send({ message: '삭제 실패했습니다' });
      } else {
        // 응답코드 200을 front로 보내라는 뜻이다.
        res.status(200).send({ message: '삭제 성공했습니다' });
      }
    });
  });
});

// detail뒤에 붙는 값은 parameter처리
app.get('/detail/:id', (req, res) => {
  const _id = +req?.params?.id;

  db.collection('post').findOne({ _id }, (error, result) => {
    if (error) {
      //   res.sendStatus(404, { message: 'not found page' });
      //   res.send('not Found');
      return console.log(error);
    }
    // console.log('result& error', result, error);
    if (!result) {
      return res.render('notFound');
    }
    res.render('detail', { data: result });
  });
});

app.put('/edit', (req, res) => {
  // console.log(req.body);

  const { _id, title, date } = req.body;

  console.log(_id, title, date);
  console.log(typeof _id);
  // return;

  db.collection('post').updateOne(
    { _id: +_id },
    // 기본적인 스크립트 공격방어를 위해 sanitizeHtml 적용
    { $set: { title: sanitizeHtml(title), date: sanitizeHtml(date) } },
    (error, result) => {
      // console.log(error, result);
      if (error || !result) {
        if (error) {
          res.status(400);
          return console.log(error);
        } else {
          res.status(400);
          return console.log('not Found');
        }
      }
      console.log(_id + '번 업데이트 성공');
      // 프론트의 성공시 작동하는 done함수를 실행시키려면 성공했다는 응답코드를 보내야함
      res.status(200).send({ message: '수정 성공했습니다' });
      // res.render('/');
    }
  );
  //   res.render('edit', { data: req.body });
});

app.get('/login', (req, res) => {
  res.render('login');
});

// passport를 이용하려 로그인 인증을 도움받음
app.post(
  '/login',
  // local이란 방식으로 로그인 인증 시도,
  // 성공하면 req,res처리 , 로그인 실패하면 failureRedirect를 이용하여 fail경로로 리다이렉트시켜줌
  passport.authenticate('local', {
    failureRedirect: '/fail',
  }),
  (req, res) => {
    // 로그인 성공시 기본 경로로 보내달라
    res.redirect('/');
  }
);

app.get('/fail', (req, res) => {
  res.render('fail');
});

app.get('/mypage', isLogin, (req, res) => {
  // console.log('mypage get', req.user);
  res.render('mypage', { user: req.user });
});

// 검색기능
app.get('/search', (req, res) => {
  console.log(req?.query?.value);
  const term = req?.query?.value;
  const searchCondition = [
    {
      $search: {
        index: 'titleSearch',
        text: {
          query: req.query.value,
          path: 'title', // title date 둘다 찾고싶으면['title' 'date']
        },
      },
    },
    // 정렬 방법 1 or -1
    { $sort: { _id: 1 } },
    // 5개의 검색결과만 가져와달라는 의미
    // { $limit: 5 },
    // 검색조건 더 주기
    // { $project: { title: 1, _id: 0, score: { $meta: 'searchScore' } } },
  ];
  db.collection('post')
    // search Index를 이용하여 검색할때 사용
    .aggregate(searchCondition)
    .toArray((error, result) => {
      console.log(result);
      if (error) {
        return console.log(error);
      }
      console.log('검색된 내용: ', result.length);

      if (result.length !== 0) {
        res.render('search', { posts: result });
      } else {
        res.render('searchError');
      }
    });
});

// 아이디 비번을 검사해줌
passport.use(
  new LocalStrategy(
    {
      // form에서 입력한 name값을 매칭
      usernameField: 'id',
      passwordField: 'pw',
      // 로그인후 세션을 저장할것인지 세팅
      session: true,
      // 아이디 비번 말고도 다른것을 검증 하고싶을때 옵션
      passReqToCallback: false,
    },
    // 사용자에게 입력받은 아이디와 비번을 실제로 DB의 아이디와 비번과 비교하는 실제코드
    function (id, pw, done) {
      //console.log(id, pw);
      // done: 은 3개의 parameter를 가짐
      // param1: server error
      // param2: 성공여부의 결과
      // param3: 실패시 에라메시지
      db.collection('login').findOne({ id: id }, function (error, result) {
        if (error) return done(error);

        if (!result) return done(null, false, { message: 'doesnt exist ID' });
        if (pw === result.pw) {
          return done(null, result);
        } else {
          return done(null, false, { message: 'password is wrong' });
        }
      });
    }
  )
);

// id를 이용하여 세션데이터 만들기
// 보통 id를 가지고 장난침
// 세선데이터를 만들고 쿠키로 보냄
passport.serializeUser(function (user, done) {
  console.log('serializeUser', user);
  done(null, user.id);
});

// 이 세션을 가진사람을 찾아달라고 할때 씀
// 로그인한 유저의 각종 정보를 DB에서 가져다 쓰기위한 용도
passport.deserializeUser(function (id, done) {
  console.log('deserializeUser: ', id);
  db.collection('login').findOne({ id: id }, function (error, result) {
    console.log('check deserialize DB collection', result);
    // 이것은 이제 req.user에 저장됨
    done(null, result);
  });
});

app.post('/register', (req, res) => {
  const { id, pw } = req.body;
  // console.log(req.body);
  db.collection('login').insertOne({ id, pw }, (error, result) => {
    res.redirect('/');
  });
});

// shop.js파일 import
// "/shop" 이하의 경로로 접속하면 아래 미들웨어를 적용한다
// 이 미들웨어는 라우터이기때문에 shop에 관련된 라우팅을 관리한다
app.use('/shop', require('./routes/shop.js'));

app.use('/board/sub', isLogin, require('./routes/board.js'));

app.get('/upload', (req, res) => {
  res.render('upload');
});

// 파일 업로드 방법
// upload.single('profile')  // input type=file 인것의 name
// upload.array('profile', 10), // input name과 , 전송할 파일의 최대 갯수
// 파일 여러개 보낼때 html input도 복수 선택 가능하게 설정해줘야함 검색  ㄱ ㄱ
app.post('/upload', upload.single('profile'), function (req, res) {
  res.redirect('checkImages');
});

// app.get('/image', (req, res) => {
//   fs.readdir(imageFolder, function (error, filelist) {
//     console.log(filelist);
//     res.send(filelist);
//   });
// });

app.get('/checkImages', (req, res) => {
  fs.readdir(imageFolder, function (error, filelist) {
    // console.log(filelist);
    // res.send(filelist);
    res.render('checkImages', { files: filelist });
  });
});

app.get('/image/:imageName', function (req, res) {
  res.sendFile(__dirname + '/public/image/' + req.params.imageName);
});

// 이상한 주소로 들어가면 notFound 출력
// notfound 처리는 항상 마지막에 위치해야함
app.get('/:notfoundparams', (req, res) => {
  res.render('notFound');
});
