'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _store = require('./vuex/store');

var _store2 = _interopRequireDefault(_store);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

require('font-awesome/css/font-awesome.min.css');

require('video.js/dist/video-js.css');

var _vueResource = require('vue-resource');

var _vueResource2 = _interopRequireDefault(_vueResource);

var _vueCookie = require('vue-cookie');

var _vueCookie2 = _interopRequireDefault(_vueCookie);

var _vantUiConfig = require('./vant-ui.config.js');

var _vantUiConfig2 = _interopRequireDefault(_vantUiConfig);

require('vant/lib/index.css');

var _elementUi = require('element-ui');

var _elementUi2 = _interopRequireDefault(_elementUi);

require('element-ui/lib/theme-default/index.css');

var _iview = require('iview');

var _iview2 = _interopRequireDefault(_iview);

require('iview/dist/styles/iview.css');

var _http = require('./api/http');

var _http2 = _interopRequireDefault(_http);

var _tools = require('./tools');

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('vue-video-player/src/custom-theme.css');

_vue2.default.prototype.$api = _http2.default;

_vue2.default.prototype.$des = _tools2.default;

_vue2.default.config.productionTip = false;
_vue2.default.use(_vueResource2.default);
_vue2.default.use(_iview2.default);
_vue2.default.use(_elementUi2.default);
_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_vuex2.default);
_vue2.default.use(_vueCookie2.default);
_vue2.default.use(_vantUiConfig2.default);

var router = new _vueRouter2.default({
    routes: _routes2.default
});

router.beforeEach(function (to, from, next) {
    if (to.path == '/login') {
        sessionStorage.removeItem('mess');
        _store2.default.commit('navDis');
    } else {
        _store2.default.commit('navApp');
    }

    var mess = JSON.parse(sessionStorage.getItem('mess'));

    if (!to.path.indexOf('/qcode')) {
        next();
    } else if (!mess && to.path != '/login') {
        next({ path: '/login' });
    } else {
        if (mess !== null) {
            var user_name = mess.user;
            var init_token = mess.token;
            var time = new Date().getTime();
            var cache = _tools2.default.encrypt(user_name + ':' + init_token + ':' + time);

            _http2.default.router_check('cache_deny/?cache=' + cache, {}, function (r) {
                if (r.state === 200) {
                    next();
                } else if (r.state === 400) {
                    sessionStorage.removeItem('mess');
                    _store2.default.dispatch('inchange');
                } else if (r.state === 500) {
                    _http2.default.router_check('cache_deny/?cache=' + cache, {}, function (r) {});
                    next();
                }
            });
        }
        next();
    }
});

new _vue2.default({
    el: '#app',
    template: '<App/>',
    router: router,
    store: _store2.default,
    components: { App: _App2.default }

});
_store2.default.dispatch('setToken', _routes2.default);