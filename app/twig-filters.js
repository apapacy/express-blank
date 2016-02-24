var Twig = require("twig");
var translations = require("./translations");

Twig.extendFilter("trans", function(value) {
  var lang = this.context._locals.lang || "ru";
  var trans = translations["messages"][lang];
  if (typeof trans === "undefined" || typeof trans[value] === "undefined") {
    var trans = translations["messages"]["ru"];
  }
  return trans[value];
});
