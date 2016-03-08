var express = require('express');
var passport = require('passport');
var auth =  require("./auth");
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', passport.authenticate('login' , { successRedirect:'/users/login_success', failureRedirect: '/users/login_fail', failureFlash: false } ), function(req, res, next) {
});

router.get('/login_fail' , function(req, res, next){
  console.log("fail");
  res.redirect('/');
});

router.get('/login_success' , function(req, res, next){
  console.log(req.user.usr_path);
  console.log("sucess");
  res.redirect('/');
});

router.post('/logout' , function(req, res, next){
  req.session.destroy()
  req.logout()
  res.redirect('/')
});

module.exports = router;
