(function () {
    'use strict';
    /*global requirejs */
    requirejs.config({
        "urlArgs":     "bust=" + (new Date()).getTime(),
        'baseUrl':     '/assets/js',
        'waitSeconds': 30,
        }
    );
    require(['jquery', 'admin/post']);
}());