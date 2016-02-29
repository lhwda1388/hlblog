var path = require('path');

module.exports = {
    mode : process.env.NODE_ENV,
    db   : {
        host      : 'mongodb://localhost:27017/hlblog',
        dbOption  : { user: 'lhw' , pass : '1234'}

    }
};
