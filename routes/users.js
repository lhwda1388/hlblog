var express = require('express');
var passport = require('passport');
var auth =  require("./auth");
var crypto = require('../util/crypto');
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
  var backURL=req.header('Referer') || '/';
	if(req.user){
		var session	= req.user;
    var s_auth = session.auth;

    if(s_auth == "A"){

      var field 	   = req.body;
      var usr_email  = field.usr_email;
      var usr_pwd    = crypto.encrypt(field.usr_pwd);
      var usr_ne     = field.usr_ne;
      var usr_path   = field.usr_path;
      var auth       = "";
      var user 	     = global.mongoose.model('user');

      var userRegist = new user({
                  usr_email : usr_email,
                  usr_pwd   : usr_pwd,
                  usr_ne    : usr_ne,
                  usr_path  : usr_path,
                  auth      : auth,
                  reg_dt    : Date.now()
                });
      userRegist.save(function (err) {
        if (err) {
          console.log("err:" + err);
          res.redirect(backURL);
        }else{
          res.redirect(backURL);
        }

      });

    }else{
      res.redirect(backURL);
    }

  }else{
    res.redirect(backURL);
  }

});

module.exports = router;
