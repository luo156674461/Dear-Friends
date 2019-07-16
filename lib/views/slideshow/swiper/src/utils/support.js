'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ssrWindow = require('ssr-window');

var Support = function Support() {
  var testDiv = _ssrWindow.document.createElement('div');
  return {
    touch: _ssrWindow.window.Modernizr && _ssrWindow.window.Modernizr.touch === true || function checkTouch() {
      return !!(_ssrWindow.window.navigator.maxTouchPoints > 0 || 'ontouchstart' in _ssrWindow.window || _ssrWindow.window.DocumentTouch && _ssrWindow.document instanceof _ssrWindow.window.DocumentTouch);
    }(),

    pointerEvents: !!(_ssrWindow.window.navigator.pointerEnabled || _ssrWindow.window.PointerEvent || 'maxTouchPoints' in _ssrWindow.window.navigator),
    prefixedPointerEvents: !!_ssrWindow.window.navigator.msPointerEnabled,

    transition: function checkTransition() {
      var style = testDiv.style;
      return 'transition' in style || 'webkitTransition' in style || 'MozTransition' in style;
    }(),
    transforms3d: _ssrWindow.window.Modernizr && _ssrWindow.window.Modernizr.csstransforms3d === true || function checkTransforms3d() {
      var style = testDiv.style;
      return 'webkitPerspective' in style || 'MozPerspective' in style || 'OPerspective' in style || 'MsPerspective' in style || 'perspective' in style;
    }(),

    flexbox: function checkFlexbox() {
      var style = testDiv.style;
      var styles = 'alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(' ');
      for (var i = 0; i < styles.length; i += 1) {
        if (styles[i] in style) return true;
      }
      return false;
    }(),

    observer: function checkObserver() {
      return 'MutationObserver' in _ssrWindow.window || 'WebkitMutationObserver' in _ssrWindow.window;
    }(),

    passiveListener: function checkPassiveListener() {
      var supportsPassive = false;
      try {
        var opts = Object.defineProperty({}, 'passive', {
          get: function get() {
            supportsPassive = true;
          }
        });
        _ssrWindow.window.addEventListener('testPassiveListener', null, opts);
      } catch (e) {}
      return supportsPassive;
    }(),

    gestures: function checkGestures() {
      return 'ongesturestart' in _ssrWindow.window;
    }()
  };
}();

exports.default = Support;