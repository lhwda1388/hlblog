var express = require('express');
var router = express.Router();
var layout_path = "layout/layout";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(layout_path, { title : "hlblog" , body: '../index.ejs' });
});

/* GET home page. */
router.get('/post', function(req, res, next) {
  res.render(layout_path, { title : "hlblog" , body: '../post.ejs' });
});

/* GET home page. */
router.get('/contact', function(req, res, next) {
  res.render(layout_path, { title : "hlblog" , body: '../contact.ejs' });
});

/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render(layout_path, { title : "hlblog" , body: '../about.ejs' });
});



module.exports = router;
