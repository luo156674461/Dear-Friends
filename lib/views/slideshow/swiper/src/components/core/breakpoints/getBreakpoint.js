'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = function (breakpoints) {
  var swiper = this;

  if (!breakpoints) return undefined;
  var breakpoint = false;
  var points = [];
  (0, _keys2.default)(breakpoints).forEach(function (point) {
    points.push(point);
  });
  points.sort(function (a, b) {
    return parseInt(a, 10) - parseInt(b, 10);
  });
  for (var i = 0; i < points.length; i += 1) {
    var point = points[i];
    if (swiper.params.breakpointsInverse) {
      if (point <= _ssrWindow.window.innerWidth) {
        breakpoint = point;
      }
    } else if (point >= _ssrWindow.window.innerWidth && !breakpoint) {
      breakpoint = point;
    }
  }
  return breakpoint || 'max';
};

var _ssrWindow = require('ssr-window');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }