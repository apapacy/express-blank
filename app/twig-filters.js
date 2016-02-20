var Twig = require("twig");
var translations = (require("./translations")["messages"]["ru"]);

Twig.extendFilter("trans", function(value) {
    return translations[value];
});
