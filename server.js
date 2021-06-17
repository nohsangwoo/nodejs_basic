const express = require('express');
const app = express();

PORT = 5000;

app.listen(PORT, function () {
  console.log('listening on ' + PORT);
});
