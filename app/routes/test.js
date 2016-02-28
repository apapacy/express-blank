"use strict";

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.all('/hello-jsx', function(req, res, next) {
  var React = require('react');
  var ReactDOMServer = require('react-dom/server');
  var component = require("../react/HelloDOM.jsx");
  var output = ReactDOMServer.renderToString(component);


  res.send(output);
});

module.exports = router;
