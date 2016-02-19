(function () {
   'use strict';
   /*global requirejs */
   requirejs.config({
     'urlArgs': 'bust=' + (new Date()).getTime(),
     'baseUrl': '/assets/js',
     'waitSeconds': 30,
     'paths': {
        'jquery': 'jquery-2.1.4'
      }
   });
   require(['jquery']);
}());
