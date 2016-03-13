var express = require('express');
var router = express.Router();
var layout_path = "layout/layout";
var crypto = require('../util/crypto');
var auth  = require("./auth");

router.get('/', function(req, res, next) {
  res.locals.defaultPath = "";
  res.render(layout_path, { title : "hlblog" , body: '../index.ejs' });
});
/* GET home page. */
router.get('/:usr_path', function(req, res, next) {
  res.render(layout_path, { title : "hlblog" , body: '../main.ejs' });
});

router.post('/:usr_path/post/getPost', function(req, res, next){
  var field       = req.body;
  var pageNo      = parseInt(field.page_no);
  var listScale   = parseInt(field.listScale);
  var usr_path    = req.params.usr_path;
  var searchText  = field.search_text.trim();
  var category_no = field.category_no;
  var post        = global.mongoose.model('post');
  var skipNo      = listScale * ( pageNo - 1 );
  var condition = {usr_path : usr_path};
  console.log("category_no : " + category_no);
  if(category_no) {
      //searchText = new RegExp(searchText, "i");
      condition = { usr_path : usr_path, category_no : category_no};
  }

  post.find(condition)
        .skip(skipNo)
        .limit(listScale)
        .sort({post_no : -1})
        .exec(function (err, pst) {
            if (err) {
                error.SERVER_ERROR(res, err);
                return;
            }
            post.count(condition, function(err, count){
                res.send({
                    count       : count,
                    post        : pst
                });
            });
        });
});

router.get('/:usr_path/:post_no', function(req, res, next) {
  res.render(layout_path, { title : "hlblog" , body: '../post.ejs' });
});

router.get('/:usr_path/post/regist', auth.Auth, function(req, res, next) {
  res.render(layout_path, { title : "hlblog" , body: '../regist.ejs' });
});

router.post('/:usr_path/post/regist/set', auth.Auth, function(req, res, next) {
  var usr_path    = req.params.usr_path;
  if(req.user){
    var session= req.user;
    var field = req.body;
    var title = field.title;
    var content = field.content;
    var usr_email = session.usr_email;
    var usr_path = session.usr_path;
    var category_no = field.category_no;
    var type = field.type;
    var post = global.mongoose.model('post');
    var cnt = 0;
    post.count({}, function(err, count){
        cnt = count;
    });
    post.findOne().sort({post_no : -1}).exec(function(err, doc){
      var max = cnt == 0 ? 1 : parseInt(doc.post_no) + 1;
      var postRegist = new post({
                          "post_no" : max,
                          "category_no" : category_no,
                          "title" : title,
                          "content" : content,
                          "usr_email" : usr_email,
                          "usr_path" : usr_path,
                          "reg_dt" : Date.now()
                      });
      postRegist.save(function (err) {
        if (err) {

        }else{
        
        }

      });
    });
  }
  res.redirect("/".concat(usr_path));
});

router.get('/:usr_path/post/about', function(req, res, next) {
  res.render(layout_path, { title : "hlblog" , body: '../about.ejs' });
});



module.exports = router;
