(function () {
    'use strict';
    /*global requirejs */
    requirejs.config({
        "urlArgs":     "bust=" + (new Date()).getTime(),
        'baseUrl':     '/js',
        'waitSeconds': 30,
        'paths':       {
            'json-editor': '/json-editor',
            "jquery": "jquery-2.1.4"
        },
        shim: {
            'admin/json-editor': {
                deps: ['json-editor/dist/jsoneditor.min']
            },
            'jquery.elastic.source': {
                deps: ['jquery']
            }
        }

    });
    require(['admin/json-editor']);
}());
