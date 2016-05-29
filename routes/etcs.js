var express = require('express');
var router = express.Router();
var layout_path = "layout/layout";
var crypto = require('../util/crypto');
var auth  = require("./auth");
var fs = require('fs');
var multer = require('multer');


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

router.post('/imageUpload', function(req,res){
      console.log(JSON.stringify(req.body));
      console.log(req.files);
      var imageFile = req.files.uploadFile;
      if (imageFile) {
          // 변수 선언
          var name = imageFile.name;
          var path = imageFile.path;
          var type = imageFile.mimetype;
          // 이미지 파일 확인
          if (type.indexOf('image') != -1) {
              // 이미지 파일의 경우 : 파일 이름을 변경합니다.
              var outputPath = '../upload/' + Date.now() + '_' + name;
              fs.rename(path, outputPath, function (err) {
                  if (err) {
                      res.send({resCode : err.code});
                      return;
                  }
                  res.send({resCode : "0000",url : outputPath});

              });
          } else {
              // 이미지 파일이 아닌 경우 : 파일 이름 제거
              fs.unlink(path, function(err) {
                  res.send({resCode : err.code});
              });
          }
      } else {
          res.send({resCode : "9999"});
      }
});
module.exports = router;
