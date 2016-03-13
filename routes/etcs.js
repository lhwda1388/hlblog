var express = require('express');
var router = express.Router();
var layout_path = "layout/layout";
var crypto = require('../util/crypto');
var auth  = require("./auth");

router.post('/getBlogUrlList', function(req, res, next){
  var field       = req.body;
  var user        = global.mongoose.model('user');
  user.find({})
        .sort({reg_dt : -1})
        .exec(function (err, usr) {
            if (err) {
                error.SERVER_ERROR(res, err);
                return;
            }
            user.count({}, function(err, count){
                res.send({
                    count       : count,
                    urlList     : usr
                });
            });
        });
});

module.exports = router;
