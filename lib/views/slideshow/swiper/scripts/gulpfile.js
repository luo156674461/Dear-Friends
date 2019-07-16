'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var gopen = require('gulp-open');
var modifyFile = require('gulp-modify-file');

var buildJs = require('./build-js.js');
var buildLess = require('./build-less.js');

gulp.task('playground', function (cb) {
  var env = process.env.NODE_ENV || 'development';
  gulp.src('./playground/index.html').pipe(modifyFile(function (content) {
    if (env === 'development') {
      return content.replace('../dist/css/swiper.min.css', '../build/css/swiper.css').replace('../dist/js/swiper.min.js', '../build/js/swiper.js');
    }
    return content.replace('../build/css/swiper.css', '../dist/css/swiper.min.css').replace('../build/js/swiper.js', '../dist/js/swiper.min.js');
  })).pipe(gulp.dest('./playground/')).on('end', function () {
    if (cb) cb();
  });
});
gulp.task('js', function (cb) {
  buildJs(cb);
});

gulp.task('less', function (cb) {
  buildLess(cb);
});

gulp.task('build', ['js', 'less']);

gulp.task('watch', function () {
  gulp.watch('./src/**/**/*.js', ['js']);
  gulp.watch('./src/**/**/*.less', ['less']);
});

gulp.task('connect', function () {
  connect.server({
    root: ['./'],
    livereload: true,
    port: '3000'
  });
});

gulp.task('open', function () {
  gulp.src('./playground/index.html').pipe(gopen({ uri: 'http://localhost:3000/playground/' }));
});

gulp.task('server', ['watch', 'connect', 'open']);

gulp.task('default', ['server']);