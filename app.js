var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config =  require('./config/config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var model = require('./models/model')(mongoose);
var auth = require('./routes/auth');
var routes = require('./routes/index');
var users = require('./routes/users');
var etcs = require('./routes/etcs')
var flash = require('connect-flash');
var requestIp = require('request-ip');
var multer  = require('multer');

var passportConf = require('./config/passport')(passport, mongoose.model('user'), LocalStrategy);

var app = express();

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: "1024mb"}));
app.use(bodyParser.urlencoded({ extended: true, limit: "1024mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(requestIp.mw());

app.use(require('express-session')({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(auth.log)
app.use('/user/', users);
app.use('/etcs/', etcs);
app.use("/:usr_path", auth.Category, auth.usrPathChk, function(req, res, next){
  if(req.isAuthenticated() ) res.locals.users = req.user;
  else res.locals.users = undefined;

  res.locals.defaultPath = req.params.usr_path;
  res.locals.categories  = req.categories;
  req.usr_path = req.params.usr_path;
  next();
});
app.use("/", routes, function(req, res, next){
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

mongoose.connect(config.db.host, config.db.dbOption,function(err){
    console.log( arguments );
});

global.config = config;
global.model = model;
global.mongoose = mongoose;
module.exports = app;
