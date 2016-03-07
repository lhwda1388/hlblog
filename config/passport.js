module.exports = function (passport, User, LocalStrategy) {

  passport.serializeUser(function (user, done) {
    done(null, user.usr_email);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
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

        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);

      });

    }

  ));

};
