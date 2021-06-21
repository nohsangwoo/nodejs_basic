const router = require('express').Router();

// 로그인 했는지 여부
function isLogin(req, res, next) {
  //   console.log('islogin?', req.user);
  if (req.user) {
    // next의 뜻은 next()로 통과 시켜달라는 의미
    next();
  } else {
    res.render('login');
    // res.send('this user is logged in');
  }
}

// 이 이후 라인에 오는 라우터는 모두 isLogin 미들웨어가 적용됨
router.use(isLogin);

// router.use('/shirts', isLogin); // 특정 라우터만 적용가능

router.get('/shirts', (req, res) => {
  res.send('this page is selling shorts');
});

router.get('/pants', (req, res) => {
  res.send('this page is selling pants');
});

module.exports = router;
