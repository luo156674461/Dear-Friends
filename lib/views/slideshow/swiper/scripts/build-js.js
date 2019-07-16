'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gulp = require('gulp');
var fs = require('fs');
var rollup = require('rollup');
var buble = require('rollup-plugin-buble');
var replace = require('rollup-plugin-replace');
var resolve = require('rollup-plugin-node-resolve');
var header = require('gulp-header');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

var config = require('./build-config.js');
var banner = require('./banner.js');

function es(components, cb) {
  var env = process.env.NODE_ENV || 'development';
  var target = process.env.TARGET || config.target;

  rollup.rollup({
    input: './src/swiper.js',
    external: ['dom7/dist/dom7.modular', 'ssr-window'],
    plugins: [replace({
      delimiters: ['', ''],
      'process.env.NODE_ENV': (0, _stringify2.default)(env),
      'process.env.TARGET': (0, _stringify2.default)(target),
      '//IMPORT_COMPONENTS': components.map(function (component) {
        return 'import ' + component.capitalized + ' from \'./components/' + component.name + '/' + component.name + '\';';
      }).join('\n'),
      '//INSTALL_COMPONENTS': components.map(function (component) {
        return '' + component.capitalized;
      }).join(',\n  '),
      '//EXPORT': 'export default Swiper'
    }), resolve({ jsnext: true })]
  }).then(function (bundle) {
    return bundle.write({
      format: 'es',
      name: 'Swiper',
      strict: true,
      sourcemap: env === 'development',
      sourcemapFile: './' + (env === 'development' ? 'build' : 'dist') + '/js/swiper.esm.bundle.js.map',
      banner: banner,
      file: './' + (env === 'development' ? 'build' : 'dist') + '/js/swiper.esm.bundle.js'
    });
  }).then(function () {
    if (cb) cb();
  }).catch(function (err) {
    if (cb) cb();
    console.error(err.toString());
  });

  rollup.rollup({
    input: './src/swiper.js',
    external: ['dom7/dist/dom7.modular', 'ssr-window'],
    plugins: [replace({
      delimiters: ['', ''],
      'process.env.NODE_ENV': (0, _stringify2.default)(env),
      'process.env.TARGET': (0, _stringify2.default)(target),
      '//IMPORT_COMPONENTS': components.map(function (component) {
        return 'import ' + component.capitalized + ' from \'./components/' + component.name + '/' + component.name + '\';';
      }).join('\n'),
      '//INSTALL_COMPONENTS': '',
      '//EXPORT': 'export { Swiper, ' + components.map(function (component) {
        return component.capitalized;
      }).join(', ') + ' }'
    }), resolve({ jsnext: true })]
  }).then(function (bundle) {
    return bundle.write({
      format: 'es',
      name: 'Swiper',
      strict: true,
      banner: banner,
      sourcemap: env === 'development',
      sourcemapFile: './' + (env === 'development' ? 'build' : 'dist') + '/js/swiper.esm.js.map',
      file: './' + (env === 'development' ? 'build' : 'dist') + '/js/swiper.esm.js'
    });
  }).then(function () {
    if (cb) cb();
  }).catch(function (err) {
    if (cb) cb();
    console.error(err.toString());
  });
}
function umd(components, cb) {
  var env = process.env.NODE_ENV || 'development';
  var target = process.env.TARGET || config.target;

  rollup.rollup({
    input: './src/swiper.js',
    plugins: [replace({
      delimiters: ['', ''],
      'process.env.NODE_ENV': (0, _stringify2.default)(env),
      'process.env.TARGET': (0, _stringify2.default)(target),
      '//IMPORT_COMPONENTS': components.map(function (component) {
        return 'import ' + component.capitalized + ' from \'./components/' + component.name + '/' + component.name + '\';';
      }).join('\n'),
      '//INSTALL_COMPONENTS': components.map(function (component) {
        return '' + component.capitalized;
      }).join(',\n  '),
      '//EXPORT': 'export default Swiper;'
    }), resolve({ jsnext: true }), buble()]
  }).then(function (bundle) {
    return bundle.write({
      format: 'umd',
      name: 'Swiper',
      strict: true,
      sourcemap: env === 'development',
      sourcemapFile: './' + (env === 'development' ? 'build' : 'dist') + '/js/swiper.js.map',
      banner: banner,
      file: './' + (env === 'development' ? 'build' : 'dist') + '/js/swiper.js'
    });
  }).then(function () {
    if (env === 'development') {
      if (cb) cb();
      return;
    }

    gulp.src('./dist/js/swiper.js').pipe(sourcemaps.init()).pipe(uglify()).pipe(header(banner)).pipe(rename(function (filePath) {
      filePath.basename += '.min';
    })).pipe(sourcemaps.write('./')).pipe(gulp.dest('./dist/js/')).on('end', function () {
      cb();
    });
  }).catch(function (err) {
    if (cb) cb();
    console.error(err.toString());
  });
}
function build(cb) {
  var env = process.env.NODE_ENV || 'development';

  var components = [];
  config.components.forEach(function (name) {
    var capitalized = name.split('-').map(function (word) {
      return word.split('').map(function (char, index) {
        if (index === 0) return char.toUpperCase();
        return char;
      }).join('');
    }).join('');
    var jsFilePath = './src/components/' + name + '/' + name + '.js';
    if (fs.existsSync(jsFilePath)) {
      components.push({ name: name, capitalized: capitalized });
    }
  });

  var expectCbs = env === 'development' ? 1 : 2;
  var cbs = 0;

  umd(components, function () {
    cbs += 1;
    if (cbs === expectCbs) cb();
  });
  if (env !== 'development') {
    es(components, function () {
      cbs += 1;
      if (cbs === expectCbs) cb();
    });
  }
}

module.exports = build;