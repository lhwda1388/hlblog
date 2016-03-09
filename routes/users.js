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
    res.redirect("/"+req.user.usr_path);
  }

});
router.get('/login_fail' , function(req, res, next){
  var backURL=req.header('Referer') || '/';
  res.redirect(backURL);
});

router.get('/logout' , function(req, res, next){
  var usr_path = req.user.usr_path;
  req.session.destroy()
  req.logout()
  res.redirect('/' + usr_path);
});

module.exports = router;
