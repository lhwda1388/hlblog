var error = require("../util/error");

module.exports.Category = function(req, res, next){
  var Category    = global.mongoose.model('category');
  var usr_path    = req.params.usr_path;
  var post        = global.mongoose.model('post');
  Category.find({usr_path : usr_path}, function(err, categories){
    if(!err){
      var condition = {usr_path : usr_path};
      var cntList   = [];
      var cntObj    = {};
      post.count(condition, function(err, count){
          categories.totalCnt = count;
      });

      for(var i=0; i < categories.length; i++){
        var category_no = categories[i].category_no;
        var cnt = 0;
        if(category_no) {
            condition = { usr_path : usr_path, category_no : category_no};
        }
        post.count(condition, function(err, count){
          cntObj.count = count;
          cntList.push(cntObj);
          cntObj    = {};
        });
      }
      categories.cntList = cntList;
      req.categories = categories;
    }


    next();
  });
};

module.exports.Auth = function(req, res, next){
  if(!req.isAuthenticated()){
    var backURL = req.header('Referer') || '/' + req.params.usr_path;
    res.redirect(backURL);
  }
  next();

};

module.exports.usrPathChk = function(req, res, next){
  var usr_path    = req.params.usr_path;

  if(usr_path != ""){
    var User    = global.mongoose.model('user');
    User.findOne({ usr_path : usr_path }, function (err, user) {
      if (err || !user) {
        err = new Error('Not Found');
        err.status = 404;
        next(err);
      }else{
        next();
      }
    });
  }else{
    next();
  }
}

module.exports.urlPath = function(req, res, next){
  var usr_path = "";
  if(req.isAuthenticated()){
      req.usr_path = req.user.usr_path;
  }
  next();
}
module.exports.log = function(req, res, next){
  var log    = global.mongoose.model('log');
  var ip     = req.headers['x-forwarded-for'] ||
               req.connection.remoteAddress ||
               req.socket.remoteAddress ||
               req.connection.socket.remoteAddress ||
               req.clientIp;


  var access_path = req.originalUrl;

  var postRegist = new log({
                      "access_path" : access_path,
                      "ip"          : ip,
                      "access_date" : Date.now()
                  });
  postRegist.save(function (err) {
  });

  next();
}
