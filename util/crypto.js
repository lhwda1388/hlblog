var crypto = require('crypto');
var sha1 = crypto.createHash('sha1');
var key = "ZGxndXNkbjg4YmxvZ2VuY3J5cHRrZXl2YWx1ZW5vZGVjcnlwdA==";

module.exports = {
  encrypt : function (input){
    var cipher = crypto.createCipher('aes192', key);

    cipher.update(input, 'utf8', 'base64');

    var chiperOutput = cipher.final('base64');
    return chiperOutput;
  },
  decrypt : function(input){
    var decipher = crypto.createDecipher('aes192', key);

    decipher.update(chiperOutput, 'base64', 'utf8');

    var decipherOutput = decipher.final('utf8');
    return decipherOutput;
  }

};
