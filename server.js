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
