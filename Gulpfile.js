'use strict';

var gulp = require('gulp')
    , _ = require('lodash')
    , bower = require('main-bower-files')
    , bowerNormalizer = require('gulp-bower-normalize')
    , rename = require('gulp-rename')
    , install = require('gulp-install')
    , watch = require('gulp-watch')
    , babel = require('gulp-babel')
    , uglify = require('gulp-uglify')
    , gutil = require('gulp-util')
    , gulpif = require('gulp-if')
    , rjs = require('gulp-requirejs-optimize')
    , twig_compile = require('./twig-compile')
    , shell = require('gulp-shell')
    , sourcemaps = require('gulp-sourcemaps')
    , sass = require('gulp-sass')
    , autoprefixer = require('gulp-autoprefixer')
    , cmq = require('gulp-merge-media-queries')
    , progeny = require('gulp-progeny')
    , minifyCss = require('gulp-minify-css')
    , browserSync = require('browser-sync')
    , react = require('gulp-react')
    , requireConvert = require("gulp-require-convert");


var logger = function (prefix) {
    return require('gulp-print')(function (filepath) {
        return prefix + ': ' + filepath;
    });
};

var env = process.env.NODE_ENV || 'dev';
var config = {
    ENV: env,
    dependencies: {
        bootstrap: {
          path: './bower_components/bootstrap/dist',
          paths: [ './bower_components/bootstrap/dist' ],
          extensions: [  'eot', 'svg', 'tff', 'ttf','woff', 'woff2', 'css', 'js'  ]
        },
        js: {
            minify: env !== 'dev',
            path: __dirname + '/frontend/javascripts',
            paths: [ './frontend/javascripts' ],
            extensions: [ 'js', 'es6' ],
            babel: {
                options: {
                    modules: 'amd'
                }
            }
        },
        views: {
            path: './views',
            extensions: [ 'twig' ],
            options: {
                module: 'amd',
                twig: 'twig',
                compileOptions: {
                    viewPrefix: 'views/'
                }
            }
        },
        stylesheets: {
            path: 'frontend/stylesheets',
            extensions: [ 'scss', 'css' ],
            autoprefixer: [
                "last 2 version",
                "ie 10",
                "ios 6",
                "android 4"
            ]
        },
        fonts: {
            path: './frontend/fonts',
            extensions: [ 'eot', 'svg', 'tff', 'ttf','woff', 'woff2' ]
        },
        images: {
            path: './frontend/images',
            extensions: [ 'svg', 'jpg', 'jpeg', 'png' ]
        }
    },
    browsersync: {
        watch: [
            __dirname + '/views/*.twig',
            __dirname + '/public/dependencies/css/*.css'
        ]
    },
    BOWER_JSON: './bower.json',
    BOWER_COMPONENTS: './bower_components',
    DEST_PATH: './public/dependencies'
};

var handleRename = (function (config) {
    return rename(function (file) {
        if(!config[ file.basename ]) {
            return;
        }
        file.basename = config[ file.basename ];
    });
})(_.merge({overrides: {renames: {}}}, require(config.BOWER_JSON)).overrides.renames);

var getPaths = function (path, extensions) {
    return _.map(extensions, function (ext) {
        return path + '/**/*.' + ext;
    })
};

gulp.task('bower:dependencies', [ 'bower:install' ], function () {
    return gulp.src(bower(), {base: config.BOWER_COMPONENTS})
        .pipe(bowerNormalizer({bowerJson: config.BOWER_JSON, flatten: true}))
        .pipe(logger('bower'))
        .pipe(handleRename)
        .pipe(gulpif(function (file) {
            //TODO:
            return false && config.dependencies.js.minify && require('path').parse(file.path).ext === '.js'
        }, uglify()))
        .pipe(gulp.dest(config.DEST_PATH));
});

gulp.task('bower:install', function () {
    return gulp.src([ config.BOWER_JSON ])
        .pipe(install());
});

(function (handle) {
    var conf = config.dependencies.stylesheets, paths = getPaths(conf.path, conf.extensions);
    gulp.task('dependencies:stylesheets:watch', [ 'dependencies:stylesheets:build' ], function () {
        return watch(paths, function (file) {
            return handle(conf, file.path);
        });
    });
    gulp.task('dependencies:stylesheets:build', [], function () {
        return handle(conf, paths);
    });
})(function (conf, paths) {
    return gulp.src(paths, {base: conf.path})
        .pipe(progeny({
            regexp: /^\s*@import\s*['"]?([^'"]+)['"]?/,
            prefix: '_',
            extensionsList: [ 'scss' ],
            multipass: [
                /@import[^;]+;/g,
                /\s*['"][^'"]+['"]\s*,?/g,
                /(?:['"])([^'"]+)/
            ]
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', gutil.log)
        .pipe(autoprefixer(conf.autoprefixer))
        .pipe(cmq())
        .pipe(gulpif(config.dependencies.js.minify, minifyCss()))
        .pipe(sourcemaps.write())
        .pipe(logger('stylesheets'))
        .pipe(gulp.dest(config.DEST_PATH + '/css'));
});

(function (handle) {
    var conf = config.dependencies.fonts, paths = getPaths(conf.path, conf.extensions);
    gulp.task('dependencies:fonts:watch', [ 'dependencies:fonts:build' ], function () {
        return watch(paths, function (file) {
            return handle(conf, file.path);
        });
    });
    gulp.task('dependencies:fonts:build', [], function () {
        return handle(conf, paths);
    });
})(function (conf, paths) {
    return gulp.src(paths, {base: conf.path})
        .pipe(logger('fonts'))
        .pipe(gulp.dest(config.DEST_PATH + '/fonts'));
});

(function (handle) {
    var conf = config.dependencies.images, paths = getPaths(conf.path, conf.extensions);
    gulp.task('dependencies:images:watch', [ 'dependencies:images:build' ], function () {
        return watch(paths, function (file) {
            return handle(conf, file.path);
        });
    });
    gulp.task('dependencies:images:build', [], function () {
        return handle(conf, paths);
    });
})(function (conf, paths) {
    return gulp.src(paths, {base: conf.path})
        .pipe(logger('images'))
        .pipe(gulp.dest(config.DEST_PATH + '/images'));
});


gulp.task('dependencies:jsx:build', function () {
	return gulp.src('./app/react/**/*.jsx')
		.pipe(react())
    .pipe(rename(function (path) {
                    path.extname = ".es6";
                }))
		.pipe(gulp.dest('./frontend/javascripts/react'));
});

gulp.task("dependencies:jsx:watch", ["dependencies:jsx:build"], function() {
    gulp.src('./app/react/**/*.jsx')
   .pipe(watch('./app/react/**/*.jsx'))
   .pipe(react())
   .pipe(rename(function (path) {
                   path.extname = ".es6";
               }))
   .pipe(requireConvert())
   .pipe(gulp.dest('./frontend/javascripts/react'));
});


(function (handle) {
    var conf = config.dependencies.js, paths = getPaths(conf.path, conf.extensions);
    gulp.task('dependencies:js:watch', [ 'dependencies:js:build' ], function () {
        return watch(paths, function (file) {
            return handle(conf, file.path);
        });
    });
    gulp.task('dependencies:js:build', [ 'bower:dependencies','dependencies:jsx:build' ], function () {
        return handle(conf, paths);
    });
})(function (conf, path) {
    return gulp.src(path, {base: conf.path})
        .pipe(gulpif('**/*.es6', babel(conf.babel.options)))
        .on('error', gutil.log)
        .pipe(gulpif(conf.minify, uglify()))
        .on('error', gutil.log)
        .pipe(logger('js'))
        .pipe(gulp.dest(config.DEST_PATH + '/js'));
});

(function (handle) {

    var conf = config.dependencies.views, paths = [ conf.path + '/**/*.twig' ];

    conf.options.compileOptions.lookPaths = [ conf.path ];

    var ENV_VAR = '_GULP_DEP_VIEW_BUILD';
    gulp.task('dependencies:views:watch', [ 'dependencies:views:build' ], function () {
        return watch(paths, function (file) {
            // twigjs bug :(
            var env = {};
            env[ ENV_VAR ] = file.path;
            return gulp.src([ file.path ], {read: false})
                .pipe(shell([
                    'node_modules/.bin/gulp dependencies:views:build'
                ], {
                    quiet: true,
                    env: env,
                    cwd: __dirname
                }))
                .pipe(logger('views'));
        })
    });

    gulp.task('dependencies:views:build', function () {
        return handle(conf, process.env[ ENV_VAR ] || paths);
    });
})(function (conf, paths) {
    console.log(conf);
    console.log(paths);
    return gulp.src(paths, {base: './views'})
        .pipe(twig_compile(conf.options))
        .on('error', function () {
            //TODO: notify
            console.error(arguments)
        })
        .pipe(logger('views'))
        .pipe(gulp.dest(config.DEST_PATH + '/js/' + conf.options.compileOptions.viewPrefix));
});

gulp.task('bootstrap', function(){
  var conf = config.dependencies.bootstrap;
  return gulp.src(conf.path + '/**/*', {base: conf.path})
    .pipe(gulp.dest(config.DEST_PATH + '/bootstrap'))
});

gulp.task('browsersync', function () {
    var conf = config.browsersync;
    browserSync.create();
    browserSync.init();
    gulp.watch(conf.watch).on('change', browserSync.reload)
});
gulp.task('watch/sync', [
    'browsersync',
    'watch'
], _.noop);
gulp.task('watch', [
    'dependencies:js:watch',
    'dependencies:jsx:watch',
    'dependencies:views:watch',
    'dependencies:stylesheets:watch',
    'dependencies:fonts:watch',
    'dependencies:images:watch'
], _.noop);
gulp.task('default', [
    'bower:dependencies',
    'dependencies:js:build',
    'dependencies:stylesheets:build',
    'dependencies:views:build',
    'dependencies:fonts:build',
    'dependencies:images:build',
    'bootstrap'
], _.noop);
