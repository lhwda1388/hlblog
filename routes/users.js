var express = require('express');
var passport = require('passport');
var auth =  require("./auth");
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/user/login_fail', failureFlash: false } ), function(req, res, next) {

  if(req.isAuthenticated()){
    console.log(req.url);
    res.redirect("/");
  }

});
router.get('/login_fail' , function(req, res, next){
//  res.redirect('/' + req.usr_path)
});

router.get('/logout' , function(req, res, next){
  req.session.destroy()
  req.logout()
  res.redirect('/' + req.usr_path)
});

module.exports = router;
