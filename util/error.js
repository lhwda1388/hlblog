module.exports = {
    SERVER_ERROR : function(res,err){
        //res.status(500);
        res.send('error',err);
    },
    NOT_FOUND : function(res,err){
        //res.status(404);
        res.send('error', err);
    }
};
