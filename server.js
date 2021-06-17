const express = require('express');
const app = express();

PORT = 5000;

app.listen(PORT, function () {
  console.log('listening on ' + PORT);
});

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
