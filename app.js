"use setrict";

require("coffee-script")
require("coffee-script/register")
require('traceur').require.makeDefault(function(filename) {
    // don't transpile our dependencies, just our app
    return filename.indexOf('node_modules') === -1;
}, {
  annotations: true,
  arrayComprehension: true,
  asyncFunctions: true,
  asyncGenerators: true,
  jsx:true,
});




//var db = require("./app/db7");
var soap = require("./app/controller/soap.coffee");

var express = require('express');
var passport = require('./app/passport');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./app/routes/index');
var users = require('./app/routes/users');
var admin = require('./app/routes/admin');
var soap = require('./app/routes/soap');

var app = express();
// Twig engine is autoconfigured with where express is enables
// It may be first in load chaining to prevent rewriting of express functional (bodyParser ...)
var Twig = require("twig"),
  express = require('express'),
  app = express();
// This section is optional and used to configure twig.
app.set("twig options", {
  strict_variables: false
});
require("./app/twig-filters");
// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.raw({
  inflate: true,
  limit: '1024mb'
}));

app.use(logger('dev'));

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true,
  outputStyle: 'compressed'
}));

app.use("^(/[^\\/]+)?/admin(/[\s\S]*)?",passport.authenticate(['basic'],{session: false}));

app.use(express.static(path.join(__dirname, 'public')));

// i18n routers enabled:
// - in templates {{lang}}
// - in routes responce.locals["lang"]
// - in some helpers as this.context._locals.lang or this.context.lang or ...
app.use('^/?([a-z]{2})?', function(request, responce, next) {
  if (request.params[0]) {
    responce.locals["lang"] = request.params[0];
  } else {
    responce.locals["lang"] = "ru";
  }
  next();
});
app.use('(/[a-z]{2})?', routes);
app.use('(/[a-z]{2})?/admin', admin);
app.use('/soap', soap);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get('/twig', function(req, res) {
  res.render('JsonEditor/get.html.twig', {
    message: "Hello World"
  });
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

module.exports = app;
