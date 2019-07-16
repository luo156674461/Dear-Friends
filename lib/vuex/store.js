'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

var state = {
    count: 10,
    state: {
        token: ''
    },
    mess: {},
    arrNum: 0,
    appear: false,
    start: false,
    show: false,
    perhint: false,
    pernum: 0,
    fundShow: false,
    millShow: false,
    orderShow: false,
    suspendShow: false,
    loadShow: false,
    newiInfo: {},
    qrshow: false,

    nav: false,
    headShow: false,
    active: 0 };

var mutations = {
    set_token: function set_token(state, token) {
        state.token = token;
        sessionStorage.token = token;
    },
    del_token: function del_token(state) {
        state.token = '';
        sessionStorage.removeItem('token');
    },
    getMess: function getMess(state) {
        state.mess = JSON.parse(sessionStorage.getItem('mess'));

        if (state.mess.time.length === 0) {
            this.$router.push({ path: '/login' });
        }
    },
    byValue: function byValue(state) {
        state.arrNum = state.mess.time[state.mess.time.length - 1];
        state.mess.time.pop();
        sessionStorage.setItem('mess', (0, _stringify2.default)(state.mess));
    },
    change: function change(state) {
        state.appear = !state.appear;
    },
    jumpReg: function jumpReg(state) {
        state.start = !state.start;
    },
    eye: function eye(state) {
        state.show = !state.show;
    },
    fundopen: function fundopen(state) {
        state.fundShow = !state.fundShow;
    },
    millopen: function millopen(state) {
        state.millShow = !state.millShow;
    },
    orderopen: function orderopen(state) {
        state.orderShow = !state.orderShow;
    },
    suspendopen: function suspendopen(state) {
        state.suspendShow = !state.suspendShow;
    },
    loadopen: function loadopen(state) {
        state.loadShow = true;
    },
    loadcut: function loadcut(state) {
        state.loadShow = false;
    },
    qropne: function qropne(state) {
        state.qrshow = !state.qrshow;
    },
    perh: function perh(state) {
        state.perhint = true;
    },
    vanish: function vanish(state) {
        state.perhint = false;
    },
    add: function add(state) {
        state.pernum++;
    },
    min: function min(state) {
        state.pernum--;
    },
    navApp: function navApp(state) {
        state.nav = true;
    },
    navDis: function navDis(state) {
        state.nav = false;
    },
    headT: function headT(state) {
        state.headShow = true;
    },
    headF: function headF(state) {
        state.headShow = false;
    },
    act: function act(state, payload) {
        state.active = payload;
    }
};

exports.default = new _vuex2.default.Store({
    actions: _actions2.default,
    state: state,
    mutations: mutations
});