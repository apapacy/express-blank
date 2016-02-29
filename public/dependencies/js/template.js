define(['exports', 'module', 'lodash'], function (exports, module, _lodash) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _2 = _interopRequireDefault(_lodash);

    var global = {};
    var store = {};

    module.exports = {
        load: function load(name, req, onLoad, config) {
            if (config.isBuild) {
                onLoad(null);
                return;
            }

            if (store[name]) {
                onLoad(store[name]);
                return;
            }

            requirejs(['views/app' + name], function (template) {
                store[name] = function (context) {
                    return template.render.call(template, _2['default'].merge({}, global, context));
                };

                onLoad(store[name]);
            });
        },
        setGlobals: function setGlobals(globals) {
            global = globals;
        }
    };
});