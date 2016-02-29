"use strict";

var _ = require("lodash");
var fs= require("fs");
var dottedConfig = {};

function walk(target, source, step, path) {
  for (var prop in source) {
    if (typeof source[prop] !== "object") {
      target[path + prop] = source[prop];
    } else {
      walk(target, source[prop], 1 + step, path + prop + ".");
    }
  }
}

try {
  var parameters = JSON.parse(fs.readFileSync("app/config/parameters.json").toString("UTF-8"));
} catch (ex) {
  var parameters = {};
  console.log(ex);
}

try {
  var config = JSON.parse(fs.readFileSync("app/config/config.json").toString("UTF-8"));
} catch (ex) {
  config = {};
  console.log(ex);
}

walk(dottedConfig, config, 0, "app.");
walk(dottedConfig, parameters, 0, "app.");

module.exports = dottedConfig;
