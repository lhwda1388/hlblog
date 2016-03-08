
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
