'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dom = require('../../utils/dom');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _support = require('../../utils/support');

var _support2 = _interopRequireDefault(_support);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

var _index = require('./update/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./translate/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./transition/index');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('./slide/index');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('./loop/index');

var _index10 = _interopRequireDefault(_index9);

var _index11 = require('./grab-cursor/index');

var _index12 = _interopRequireDefault(_index11);

var _index13 = require('./manipulation/index');

var _index14 = _interopRequireDefault(_index13);

var _index15 = require('./events/index');

var _index16 = _interopRequireDefault(_index15);

var _index17 = require('./breakpoints/index');

var _index18 = _interopRequireDefault(_index17);

var _index19 = require('./classes/index');

var _index20 = _interopRequireDefault(_index19);

var _index21 = require('./images/index');

var _index22 = _interopRequireDefault(_index21);

var _index23 = require('./check-overflow/index');

var _index24 = _interopRequireDefault(_index23);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prototypes = {
  update: _index2.default,
  translate: _index4.default,
  transition: _index6.default,
  slide: _index8.default,
  loop: _index10.default,
  grabCursor: _index12.default,
  manipulation: _index14.default,
  events: _index16.default,
  breakpoints: _index18.default,
  checkOverflow: _index24.default,
  classes: _index20.default,
  images: _index22.default
};

var extendedDefaults = {};

var Swiper = function (_SwiperClass) {
  (0, _inherits3.default)(Swiper, _SwiperClass);

  function Swiper() {
    var _ret3;

    (0, _classCallCheck3.default)(this, Swiper);

    var el = void 0;
    var params = void 0;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
      params = args[0];
    } else {
      el = args[0];
      params = args[1];
    }
    if (!params) params = {};

    params = _utils2.default.extend({}, params);
    if (el && !params.el) params.el = el;

    var _this = (0, _possibleConstructorReturn3.default)(this, (Swiper.__proto__ || (0, _getPrototypeOf2.default)(Swiper)).call(this, params));

    (0, _keys2.default)(prototypes).forEach(function (prototypeGroup) {
      (0, _keys2.default)(prototypes[prototypeGroup]).forEach(function (protoMethod) {
        if (!Swiper.prototype[protoMethod]) {
          Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }
      });
    });

    var swiper = _this;
    if (typeof swiper.modules === 'undefined') {
      swiper.modules = {};
    }
    (0, _keys2.default)(swiper.modules).forEach(function (moduleName) {
      var module = swiper.modules[moduleName];
      if (module.params) {
        var moduleParamName = (0, _keys2.default)(module.params)[0];
        var moduleParams = module.params[moduleParamName];
        if ((typeof moduleParams === 'undefined' ? 'undefined' : (0, _typeof3.default)(moduleParams)) !== 'object' || moduleParams === null) return;
        if (!(moduleParamName in params && 'enabled' in moduleParams)) return;
        if (params[moduleParamName] === true) {
          params[moduleParamName] = { enabled: true };
        }
        if ((0, _typeof3.default)(params[moduleParamName]) === 'object' && !('enabled' in params[moduleParamName])) {
          params[moduleParamName].enabled = true;
        }
        if (!params[moduleParamName]) params[moduleParamName] = { enabled: false };
      }
    });

    var swiperParams = _utils2.default.extend({}, _defaults2.default);
    swiper.useModulesParams(swiperParams);

    swiper.params = _utils2.default.extend({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = _utils2.default.extend({}, swiper.params);
    swiper.passedParams = _utils2.default.extend({}, params);

    swiper.$ = _dom2.default;

    var $el = (0, _dom2.default)(swiper.params.el);
    el = $el[0];

    if (!el) {
      var _ret;

      return _ret = undefined, (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    if ($el.length > 1) {
      var _ret2;

      var swipers = [];
      $el.each(function (index, containerEl) {
        var newParams = _utils2.default.extend({}, params, { el: containerEl });
        swipers.push(new Swiper(newParams));
      });
      return _ret2 = swipers, (0, _possibleConstructorReturn3.default)(_this, _ret2);
    }

    el.swiper = swiper;
    $el.data('swiper', swiper);

    var $wrapperEl = $el.children('.' + swiper.params.wrapperClass);

    _utils2.default.extend(swiper, {
      $el: $el,
      el: el,
      $wrapperEl: $wrapperEl,
      wrapperEl: $wrapperEl[0],

      classNames: [],

      slides: (0, _dom2.default)(),
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],

      isHorizontal: function isHorizontal() {
        return swiper.params.direction === 'horizontal';
      },
      isVertical: function isVertical() {
        return swiper.params.direction === 'vertical';
      },

      rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
      rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
      wrongRTL: $wrapperEl.css('display') === '-webkit-box',

      activeIndex: 0,
      realIndex: 0,

      isBeginning: true,
      isEnd: false,

      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,

      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,

      touchEvents: function touchEvents() {
        var touch = ['touchstart', 'touchmove', 'touchend'];
        var desktop = ['mousedown', 'mousemove', 'mouseup'];
        if (_support2.default.pointerEvents) {
          desktop = ['pointerdown', 'pointermove', 'pointerup'];
        } else if (_support2.default.prefixedPointerEvents) {
          desktop = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
        }
        swiper.touchEventsTouch = {
          start: touch[0],
          move: touch[1],
          end: touch[2]
        };
        swiper.touchEventsDesktop = {
          start: desktop[0],
          move: desktop[1],
          end: desktop[2]
        };
        return _support2.default.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
      }(),
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,

        formElements: 'input, select, option, textarea, button, video',

        lastClickTime: _utils2.default.now(),
        clickTimeout: undefined,

        velocities: [],
        allowMomentumBounce: undefined,
        isTouchEvent: undefined,
        startMoving: undefined
      },

      allowClick: true,

      allowTouchMove: swiper.params.allowTouchMove,

      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },

      imagesToLoad: [],
      imagesLoaded: 0

    });

    swiper.useModules();

    if (swiper.params.init) {
      swiper.init();
    }

    return _ret3 = swiper, (0, _possibleConstructorReturn3.default)(_this, _ret3);
  }

  (0, _createClass3.default)(Swiper, [{
    key: 'slidesPerViewDynamic',
    value: function slidesPerViewDynamic() {
      var swiper = this;
      var params = swiper.params,
          slides = swiper.slides,
          slidesGrid = swiper.slidesGrid,
          swiperSize = swiper.size,
          activeIndex = swiper.activeIndex;

      var spv = 1;
      if (params.centeredSlides) {
        var slideSize = slides[activeIndex].swiperSlideSize;
        var breakLoop = void 0;
        for (var i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
        for (var _i = activeIndex - 1; _i >= 0; _i -= 1) {
          if (slides[_i] && !breakLoop) {
            slideSize += slides[_i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
      } else {
        for (var _i2 = activeIndex + 1; _i2 < slides.length; _i2 += 1) {
          if (slidesGrid[_i2] - slidesGrid[activeIndex] < swiperSize) {
            spv += 1;
          }
        }
      }
      return spv;
    }
  }, {
    key: 'update',
    value: function update() {
      var swiper = this;
      if (!swiper || swiper.destroyed) return;
      var snapGrid = swiper.snapGrid,
          params = swiper.params;

      if (params.breakpoints) {
        swiper.setBreakpoint();
      }
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();

      function setTranslate() {
        var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      var translated = void 0;
      if (swiper.params.freeMode) {
        setTranslate();
        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
          translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }
        if (!translated) {
          setTranslate();
        }
      }
      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
      swiper.emit('update');
    }
  }, {
    key: 'init',
    value: function init() {
      var swiper = this;
      if (swiper.initialized) return;

      swiper.emit('beforeInit');

      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      }

      swiper.addClasses();

      if (swiper.params.loop) {
        swiper.loopCreate();
      }

      swiper.updateSize();

      swiper.updateSlides();

      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      }

      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }

      if (swiper.params.preloadImages) {
        swiper.preloadImages();
      }

      if (swiper.params.loop) {
        swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
      }

      swiper.attachEvents();

      swiper.initialized = true;

      swiper.emit('init');
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var deleteInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var cleanStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var swiper = this;
      var params = swiper.params,
          $el = swiper.$el,
          $wrapperEl = swiper.$wrapperEl,
          slides = swiper.slides;


      if (typeof swiper.params === 'undefined' || swiper.destroyed) {
        return null;
      }

      swiper.emit('beforeDestroy');

      swiper.initialized = false;

      swiper.detachEvents();

      if (params.loop) {
        swiper.loopDestroy();
      }

      if (cleanStyles) {
        swiper.removeClasses();
        $el.removeAttr('style');
        $wrapperEl.removeAttr('style');
        if (slides && slides.length) {
          slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index').removeAttr('data-swiper-column').removeAttr('data-swiper-row');
        }
      }

      swiper.emit('destroy');

      (0, _keys2.default)(swiper.eventsListeners).forEach(function (eventName) {
        swiper.off(eventName);
      });

      if (deleteInstance !== false) {
        swiper.$el[0].swiper = null;
        swiper.$el.data('swiper', null);
        _utils2.default.deleteProps(swiper);
      }
      swiper.destroyed = true;

      return null;
    }
  }], [{
    key: 'extendDefaults',
    value: function extendDefaults(newDefaults) {
      _utils2.default.extend(extendedDefaults, newDefaults);
    }
  }, {
    key: 'extendedDefaults',
    get: function get() {
      return extendedDefaults;
    }
  }, {
    key: 'defaults',
    get: function get() {
      return _defaults2.default;
    }
  }, {
    key: 'Class',
    get: function get() {
      return _class2.default;
    }
  }, {
    key: '$',
    get: function get() {
      return _dom2.default;
    }
  }]);
  return Swiper;
}(_class2.default);

exports.default = Swiper;