var express = require('express');
var router = express.Router();
var layout_path = "layout/layout";
var crypto = require('../util/crypto');
var auth  = require("./auth");

router.get('/', function(req, res, next) {

  res.render(layout_path, { title : "hlblog" , body: '../index.ejs' });
});
/* GET home page. */
router.get('/:usr_path', function(req, res, next) {
  var usr_path = req.params.usr_path;

  res.render(layout_path, { title : "hlblog" , body: '../index.ejs' });
});

router.post('/:usr_path/post/getPost', function(req, res, next){
console.log("test : " + req.usr_path);
  /*var field       = req.body;
  var pageNo      = parseInt(field.pageNo);
  var listScale   = parseInt(field.listScale);

  var searchText  = field.search_text.trim();
  var post        = global.mongoose.model('post');
  var skipNo      = listScale * ( pageNo - 1 );
  var condition = {usr_path : "lhwda1388"};
  if(searchText != "") {
      searchText = new RegExp(searchText, "i");
      condition = { title : searchText};
  }

  post.find(condition)
        .skip(skipNo)
        .limit(listScale)
        .sort({parent_no : -1, child_sort : 1})
        .exec(function (err, hb) {
            if (err) {
                error.SERVER_ERROR(res, err);
                return;
            }
            post.count(condition, function(err, count){
                res.send({
                    count       : count,
                    hBoard       : hb
                });
            });
        });*/
});

router.get('/:usr_path/:post_no', function(req, res, next) {
  res.render(layout_path, { title : "hlblog" , body: '../post.ejs' });
});

router.get('/:usr_path/contact', function(req, res, next) {
  res.render(layout_path, { title : "hlblog" , body: '../contact.ejs' });
});

router.get('/:usr_path/about', function(req, res, next) {
  res.render(layout_path, { title : "hlblog" , body: '../about.ejs' });
});



module.exports = router;
