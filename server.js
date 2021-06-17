const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
// ejs사용하겠다 선언
app.set('view engine', 'ejs');
require('dotenv').config();

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
  // __dirname :
  res.sendFile(__dirname + '/index.html');
});

app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/write.html');
});

// post request 처리
app.post('/add', (req, res) => {
  //   res.sendFile(__dirname + 'add.html');
  console.log(req.body);
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
      console.log(result);
      res.render('list.ejs', { posts: result });
    });
});

// delete
app.delete('/delete', (req, res) => {
  console.log(req.body);
});
