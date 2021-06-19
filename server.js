const express = require('express');
const app = express();
var sanitizeHtml = require('sanitize-html');

//dydals5678.tistory.com/99 [아빠개발자의 노트]
출처: https: app.use(express.urlencoded({ extended: true }));
// ejs사용하겠다 선언
app.set('view engine', 'ejs');
require('dotenv').config();

// 미들웨어 추가
// public 폴더를 사용할것이다 라는 의미
app.use('/public', express.static('public'));

// 생성하려는 PORT번호 설정
PORT = 5000;

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
app.get('/', (req, res) => {
  // sendFile 사용방법
  //   res.sendFile(__dirname + '/index.html');
  res.render('index');
});

app.get('/write', (req, res) => {
  res.render('write');
});

// post request 처리
app.post('/add', (req, res) => {
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
      console.log(result);
      let prevTotalPost = result.totalPost;

      // post라는 collection에 하나를 저장할것임
      //   총게시물 개수 +1로 아이디를 지정하고 나머지 데이터 저장
      db.collection('post').insertOne(
        { _id: prevTotalPost + 1, title, date },
        (error, result) => {
          console.log('DB 저장완료');

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
        }
      );

      //   db.collection('counter').
    }
  );

  res.send('전송완료');
});

// ejs를 사용하는 list 요청처리
app.get('/list', (req, res) => {
  // 해당 post collection에 포함된 모든 데이터를 가져온다
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

  db.collection('post').deleteOne({ _id: +req.body._id }, (error, result) => {
    if (error) {
      req.status(400).send({ message: '삭제 실패했습니다' });
      return console.log(error);
    }
    console.log(req.body._id + '번 내용 삭제 완료');
    // 응답코드 200을 front로 보내라는 뜻이다.
    res.status(200).send({ message: '삭제 성공했습니다' });
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

// 이상한 주소로 들어가면 notFound 출력
// notfound 처리는 항상 마지막에 위치해야함
app.get('/:notfoundparams', (req, res) => {
  res.render('notFound');
});
