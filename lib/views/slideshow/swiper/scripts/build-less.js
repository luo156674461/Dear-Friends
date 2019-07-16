'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gulp = require('gulp');
var fs = require('fs');
var modifyFile = require('gulp-modify-file');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var header = require('gulp-header');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

var config = require('./build-config.js');
var banner = require('./banner.js');

function build(cb) {
  var env = process.env.NODE_ENV || 'development';

  var components = [];
  config.components.forEach(function (name) {
    var lessFilePath = './src/components/' + name + '/' + name + '.less';
    if (fs.existsSync(lessFilePath)) {
      components.push(name);
    }
  });

  var colors = [];

  (0, _keys2.default)(config.colors).forEach(function (key) {
    colors.push(key + ' ' + config.colors[key]);
  });

  gulp.src('./src/swiper.less').pipe(modifyFile(function (content) {
    var newContent = content.replace('//IMPORT_COMPONENTS', components.map(function (component) {
      return '@import url(\'./components/' + component + '/' + component + '.less\');';
    }).join('\n')).replace('$themeColor', config.themeColor).replace('$colors', colors.join(', '));
    return newContent;
  })).pipe(less({
    javascriptEnabled: true
  })).on('error', function (err) {
    if (cb) cb();
    console.error(err.toString());
  }).pipe(autoprefixer({
    cascade: false
  })).on('error', function (err) {
    if (cb) cb();
    console.error(err.toString());
  }).pipe(header(banner)).pipe(gulp.dest('./' + (env === 'development' ? 'build' : 'dist') + '/css/')).on('end', function () {
    if (env === 'development') {
      if (cb) cb();
      return;
    }
    gulp.src('./dist/css/swiper.css').pipe(cleanCSS({
      advanced: false,
      aggressiveMerging: false
    })).pipe(header(banner)).pipe(rename(function (filePath) {
      filePath.basename += '.min';
    })).pipe(gulp.dest('./dist/css/')).on('end', function () {
      if (cb) cb();
    });
  });
}

module.exports = build;