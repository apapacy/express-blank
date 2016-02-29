import _ from 'lodash'

let global = {};
let store = {};

export default {
    load: function (name, req, onLoad, config) {
        if(config.isBuild) {
            onLoad(null);
            return;
        }

        if(store[ name ]) {
            onLoad(store[ name ]);
            return;
        }

        requirejs([ 'views/app' + name ], function (template) {
            store[ name ] = function (context) {
                return template.render.call(template,
                    _.merge({}, global, context)
                )
            };

            onLoad(store[ name ]);
        });
    },
    setGlobals: function (globals) {
        global = globals;
    }
}