var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
//var DigestStrategy = require('passport-http').DigestStrategy;


passport.use(new BasicStrategy(function(name, password, next) {
  if (name !== "admin0") {
    return next(null, false, {
      message: 'Incorrect username'
    });
  }
  if (password !== "password") {
    return done({name:name}, false, {
      message: 'Incorrect password'
    });
  }
  return next( null, {
    name: name
  });
}, function(err) {

  return done(err);
}));


module.exports = passport;
