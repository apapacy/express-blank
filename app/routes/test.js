"use strict";

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.all('/hello-jsx', function(req, res, next) {
  var React = require('react');
  var ReactDOMServer = require('react-dom/server');
  var MyComponent = require("../react/HelloDOM.jsx");
  var MyElement  = React.createElement(MyComponent, {name: "React"}, null);
  var output = ReactDOMServer.renderToString(MyElement);


  res.send(output);
});

module.exports = router;
