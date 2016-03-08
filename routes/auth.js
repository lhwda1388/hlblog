var error = require("../util/error");

module.exports.Category = function(req, res, next){
  var Category    = global.mongoose.model('category');
  var usr_path    = req.params.usr_path;
  Category.find({usr_path : usr_path}, function(err, categories){
    if(!err) req.categories = categories;
    next();
  });
};

module.exports.Auth = function(req, res, next){
  var usr_path    = req.params.usr_path;
  if(!req.isAuthenticated())

  next();
};

module.exports.usrPathChk = function(req, res, next){
  var usr_path    = req.params.usr_path;
  if(usr_path != ""){
    var User    = global.mongoose.model('user');
    User.findOne({ usr_path : usr_path }, function (err, user) {
      if (err) {
        error.NOT_FOUND(res, err);
      }else if(!user){
        error.NOT_FOUND(res, err);
      }
    });
  }
  next();
}

module.exports.urlPath = function(req, res, next){
  var usr_path = "";
  if(req.isAuthenticated()){
      req.usr_path = req.user.usr_path;
  }
  next();
}
