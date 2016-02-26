"use strict";

var passport = require('passport');
var config = require("./config");
var BasicStrategy = require('passport-http').BasicStrategy;
//var DigestStrategy = require('passport-http').DigestStrategy;

passport.use(new BasicStrategy(function(name, password, next) {
  if (name !== config["app.admin.name"]) {
    return next("Not valid user", false, {
      message: 'Incorrect username'
    });
  }
  if (password !== config["app.admin.password"]) {
    return next(null, false, {
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
