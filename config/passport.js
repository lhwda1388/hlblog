var crypto = require('../util/crypto');


module.exports = function (passport, User, LocalStrategy) {

  passport.serializeUser(function (user, done) {
    done(null, user.usr_email);
  });

  passport.deserializeUser(function(email, done) {
    User.findOne({ usr_email : email }, function (err, user) {
      var resUser = {
          usr_email : user.usr_email,
          usr_ne    : user.usr_ne,
          auth      : user.auth,
          reg_dt    : user.reg_dt
      }
      done(err, resUser);
    });
  });

  passport.use('login', new LocalStrategy({
    usernameField : 'usr_email',
    passwordField : 'usr_pwd',
    passReqToCallback : true
  }, function (req, email, password, done) {
      User.findOne({ usr_email : email }, function (err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        if (!user.validPassword(crypto.encrypt(password))) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);

      });

    }

  ));

};
