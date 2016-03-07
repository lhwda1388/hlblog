var express = require('express');
var router = express.Router();
var layout_path = "layout/layout";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(layout_path, { title : "hlblog" , body: '../index.ejs' });
  /*var user = global.mongoose.model('user');
  var userSave = new user({
                          "usr_email" : "lhwda1388@gmail.com" ,
                          "usr_pwd"   : "1234",
                          "usr_ne"    : "이현우",
                          "auth"      : "A",
                          "reg_dt"    : Date.now()
                      });
      userSave.save(function (err) {
        if (err) {
          error.SERVER_ERROR(res, err);
          return;
        }else{
          res.send({
              resCode: "0000",
              resMsg: "성공"
          });
        }

      });*/
});


router.get('/login_fail', function(req, res, next) {

});

router.get('/post', function(req, res, next) {
  res.render(layout_path, { title : "hlblog" , body: '../post.ejs' });
});

router.get('/contact', function(req, res, next) {
  res.render(layout_path, { title : "hlblog" , body: '../contact.ejs' });
});

router.get('/about', function(req, res, next) {
  res.render(layout_path, { title : "hlblog" , body: '../about.ejs' });
});



module.exports = router;
