var express = require('express');
var passport = require('passport');
var auth =  require("./auth");
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/user/login_fail', failureFlash: true } ), function(req, res, next) {

  if(req.isAuthenticated()){
    var backURL=req.header('Referer') || '/';
    res.redirect(backURL);
  }

});
router.get('/login_fail' , function(req, res, next){
  var backURL=req.header('Referer') || '/';
  res.redirect(backURL);
});

router.get('/logout' , function(req, res, next){
  var backURL=req.header('Referer') || '/';
  req.session.destroy()
  req.logout()
  res.redirect(backURL);
});
router.post('/addUser', function(req, res, next){
  
});

module.exports = router;
