(function () {
  "use strict";
  requirejs.config({
    "urlArgs": "bust=" + (new Date()).getTime(),
    "baseUrl": '/dependencies/js',
    "waitSeconds": 60*60*60,
    "paths": {},
    "map": {
      "*": {
        twig: "config/twig",
        underscore: "lodash"
      },
      "config/twig": {
        "twig": "twig"
      }
    },
    "shim": {
      "jquery.tooltipster.min":{
        deps: ["jquery"]
      },
      "jquery.validate": {
        deps: ["jquery"]
      },
      "jquery.inputmask.bundle.min": {
        deps: ["jquery"]
      },
      "bootstrap": {
        deps: ["jquery"]
      },
      "backgrid-paginator": {
        deps: ["backgrid"]
      }
    }
  });
  requirejs(["admin/main"], function(main){
    ;
  });
}());
