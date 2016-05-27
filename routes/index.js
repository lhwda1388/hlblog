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
	var searchText  = field.searchText;
	var category_no = field.category_no;
	var post        = global.mongoose.model('post');
	var skipNo      = listScale * ( pageNo - 1 );
	var condition = {usr_path : usr_path};
	
	if(category_no) {
		
		if(searchText){
			searchText = new RegExp(unescape(searchText).trim(), "i");
			condition = { usr_path : usr_path, category_no : category_no , title : searchText};
		}else{
			condition = { usr_path : usr_path, category_no : category_no };
		}
		
	}else{
		
		if(searchText){
			searchText = new RegExp(unescape(searchText).trim(), "i");
			condition = { usr_path : usr_path, title : searchText};
		}else{
			condition = { usr_path : usr_path};
		}
		
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
  var usr_path = req.params.usr_path;
  var post_no  = req.params.post_no;
  var post = global.mongoose.model('post');
  var condition = {
      usr_path : usr_path ,
      post_no : post_no
  };
  var post_data = {};
  post.findOne(condition)
      .exec(function(err, data){
        if(err || !data){
          var backURL = req.header('Referer') || '/' + req.params.usr_path;
          res.redirect(backURL);
        }

        res.render(layout_path, { title : "hlblog" , body: '../post.ejs' });

      });

});

router.post('/:usr_path/:post_no/getReplyList', function(req, res, next) {
  var usr_path = req.params.usr_path;
  var post_no  = req.params.post_no;
  var reply = global.mongoose.model('reply');
  var condition = {
      post_no : post_no
  };
  var post_data = {};
  reply.find(condition)
        .sort({reply_no : -1})
        .exec(function (err, rpl) {
            if (err) {
                error.SERVER_ERROR(res, err);
                return;
            }

            reply.count(condition, function(err, count){
                res.send({
                    count       : count,
                    reply       : rpl
                });
            });
        });

});

router.post('/:usr_path/:post_no/setReply', function(req, res, next) {
	var usr_path    = req.params.usr_path;
	var post_no  	= req.params.post_no;
	var usr_email   = "";
	var resCode		= "0000";
	if(req.user){
		var session	= req.user;
		usr_email 	= session.usr_email;
    }else{
		usr_email 	= "GUEST";
	}
    var field 	= req.body;
    var content = field.replyContent;
    var reply 	= global.mongoose.model('reply');
    var cnt 	= 0;
    reply.count({}, function(err, count){
        cnt = count;
    });

    reply.findOne().sort({reply_no : -1}).exec(function(err, doc){
      var max = cnt == 0 ? 1 : parseInt(doc.reply_no) + 1;
      var replyRegist = new reply({
									reply_no  : max,
									post_no   : post_no ,
									content   : content ,
									usr_email : usr_email,
									reg_dt 	  : Date.now()
								});
      replyRegist.save(function (err) {
        if (err) {
			resCode = "9999";
        }else{
			resCode = "0000";
        }

      });

    });
	res.send({ resCode : resCode });

});



router.post('/:usr_path/:post_no/getData', function(req, res, next) {
  var usr_path = req.params.usr_path;
  var post_no  = req.params.post_no;
  var post = global.mongoose.model('post');
  var condition = {
      usr_path : usr_path ,
      post_no : post_no
  };
  var post_data = {};
  post.findOne(condition)
      .exec(function(err, data){
        if(err || !data){
          error.SERVER_ERROR(res, err);
          return;
        }
		res.send({ data : data });

      });

});

router.get('/:usr_path/:post_no/modify', function(req, res, next) {
  var usr_path = req.params.usr_path;
  var backURL = req.header('Referer') || '/' + req.params.usr_path;
  if(req.user && (req.user.usr_path == usr_path)){

    var post_no  = req.params.post_no;
    var post = global.mongoose.model('post');
    var condition = {
        usr_path : req.user.usr_path ,
        post_no : post_no
    };
    var post_data = {};
    post.findOne(condition)
        .exec(function(err, data){
          if(err || !data){
            res.redirect(backURL);
          }

          res.render(layout_path, { title : "hlblog" , body: '../modify.ejs' , post_data : data});

        });
  }else{
      res.redirect(backURL);
  }
});

router.post('/:usr_path/:post_no/modify/getData', function(req, res, next) {
	var usr_path = req.params.usr_path;
    var post_no  = req.params.post_no;
	console.log('1test');
    var post = global.mongoose.model('post');
    var condition = {
        usr_path : req.user.usr_path ,
        post_no : post_no
    };
    var post_data = {};
    post.findOne(condition)
        .exec(function(err, data){
          if(err || !data){
            error.SERVER_ERROR(res, err);
			return;
          }
		  res.send({ data : data });
        });

});

router.post('/:usr_path/:post_no/modify/set', auth.Auth, function(req, res, next) {
  var usr_path    = req.params.usr_path;
  var post_no  = req.params.post_no;
  if(req.user && (req.user.usr_path == usr_path)){
    var session= req.user;
    var field = req.body;
    var title = field.title;
    var content = field.content;
    var category_no = field.category_no;
    var post = global.mongoose.model('post');
    var cnt = 0;

    post.update({post_no: post_no, usr_path: req.user.usr_path},
                  {
                    $set: {
                          "category_no" : category_no,
                          "title" : title,
                          "content" : content,
                          "reg_dt" : Date.now()
                        }
                  },
                  function(err, result){
                    if (err) {

                    }else {

                    }
                  }
               );
  }
  res.redirect("/".concat(usr_path));
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
router.post('/:usr_path/post/deletePost',  function(req, res, next) {

  var field = req.body;
  var post = global.mongoose.model('post');
  post.remove({ post_no: field.post_no }).exec(function(err) {
    if (err) {
      res.send({
          resCode         : "9999"
      });
    }else {
      res.send({
          resCode         : "0000"
      });
    }
  });

});


router.post('/:usr_path/addCat/set', auth.Auth, function(req, res, next) {
  var usr_path    = req.params.usr_path;
  if(req.user && req.user.auth == "A"){
    var session= req.user;
    var field = req.body;
    var usr_path = session.usr_path;
    var category_ne = field.category_ne;
    var category = global.mongoose.model('category');
    var cnt = 0;
    category.count({}, function(err, count){
        cnt = count;
    });
    category.findOne().sort({category_no : -1}).exec(function(err, doc){
      var max = cnt == 0 ? 1 : parseInt(doc.category_no) + 1;
      var catRegist = new category({
                          "category_no" : max,
                          "category_ne" : category_ne,
                          "auth" : "",
                          "usr_path" : usr_path,
                          "reg_dt" : Date.now()
                      });
      catRegist.save(function (err) {
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
