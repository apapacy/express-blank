"use strict";

var fs = require("fs");

var translations = {};
var dottedTranslations = {};

function walk(target, source, step, path) {
  for (var prop in source) {
    target[path + prop] = source[prop];
    if (typeof source[prop] === "object") {
      walk(target, source[prop], 1 + step, path + prop + ".");
    }
  }
}

function load(path) {
  var paths = fs.readdirSync(path);
  var matches;
  for (var i = 0; i < paths.length; i++) {
    if (matches = paths[i].match(/([^.]+)\.(\w{2})\.json/)) {
      if (typeof translations[matches[1]] !== "object") {
        translations[matches[1]] = {};
      }
      translations[matches[1]][matches[2]] = JSON.parse(fs.readFileSync(path + "/" + paths[i]));
    }
  }
  for (var domain in translations) {
    dottedTranslations[domain] = {};
    for (var lang in translations[domain]) {
      dottedTranslations[domain][lang] = {};
      walk(dottedTranslations[domain][lang], translations[domain][lang], 0, "");
    }
  }
}

load("./app/Resources/translations");

function reload() {
  load("./app/Resources/translations");

}

// Валит Нод при асинхрнной записи
//fs.watch("./app/Resources/translations", function(eventName, fileName) {
//  load("./app/Resources/translations");
//});

module.exports = {
  translations: dottedTranslations,
  reload: reload
};
