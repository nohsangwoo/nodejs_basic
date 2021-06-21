const router = require('express').Router();

router.get('/sports', (req, res) => {
  res.send('this page is sports board');
});

router.get('/game', (req, res) => {
  res.send('this page is game board');
});

module.exports = router;
