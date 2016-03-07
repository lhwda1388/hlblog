var express = require('express');
var passport=require('passport')
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', passport.authenticate('login' , { failureRedirect: '/users/login_fail', failureFlash: false } ), function(req, res, next) {
     res.redirect('/usrs/login_success');
});

router.get('/login_fail' , function(req, res, next){
    console.log("fail");
  res.redirect('/');
});

router.get('/login_success' , function(req, res, next){
  console.log("sucess");
  res.redirect('/');
   // res.render('users', { user: req.user });
});

module.exports = router;
