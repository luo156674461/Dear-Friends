'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _store = require('../vuex/store');

var _store2 = _interopRequireDefault(_store);

var _tools = require('../tools');

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = "http://www.onetwoshare.net/api";

var request = require('superagent');

function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

function filter_null(o) {
    for (var key in o) {
        if (o[key] == null) {
            delete o[key];
        }
        if (toType(o[key]) == 'string') {
            o[key] = o[key].trim();
            if (o[key].length == 0) {
                delete o[key];
            }
        }
    }
    return o;
}

function _api_base(method, url, params, success, failure) {
    var r = request(method, url).type('application/json;charset=UTF-8');
    if (params) {
        if (method === 'POST' || method === 'PUT') {
            if (toType(params) == 'object') {
                params = (0, _stringify2.default)(params);
            }

            r = r.send(params);
        } else if (method == 'GET' || method === 'DELETE') {
            r = r.query(params);
        }
    }
    r.end(function (err, res) {
        if (err) {
            success(res.body);
            return;
        };
        if (res.status == '201' || res.status == '200' || res.status == '202') {
            if (success) {
                success(res.body);
            }
        } else {
            if (failure) {
                failure(res.body);
            } else {
                alert('error: ' + (0, _stringify2.default)(res.body));
            }
        }
    });
};
function _init() {
    var mess = _store2.default.state.mess;
    var user_name = mess.user;
    var init_token = mess.token;
    var time = new Date().getTime();
    var cache = _tools2.default.encrypt(user_name + ':' + init_token + ':' + time);
    return _api_base('GET', root + '/' + ('cache_deny/?cache=' + cache), {}, function (r) {
        if (r.state === 400) {
            _store2.default.dispatch('inchange');
        }
    });
};
function verify(url) {
    var zhu = ['user_info', 'register', 'set_register_cache'];
    if (!(url.split('/')[0] in zhu)) {
        return false;
    } else {
        return true;
    }
}
exports.default = {
    show_root: root,
    router_check: function router_check(url, params, success, failure) {
        if (url.indexOf('?') != -1) {
            return _api_base('GET', root + '/' + url + '&format=json', params, success, failure);
        } else {
            return _api_base('GET', root + '/' + url + '?format=json', params, success, failure);
        }
    },
    login: function login(url, params, success, failure) {
        if (url.indexOf('?') != -1) {
            return _api_base('POST', root + '/' + url + '&format=json', params, success, failure);
        } else {
            return _api_base('POST', root + '/' + url + '?format=json', params, success, failure);
        }
    },
    get: function get(url, params, success, failure) {
        if (verify(url)) {
            _init();
        };
        if (url.indexOf('?') != -1) {
            return _api_base('GET', root + '/' + url + '&format=json', params, success, failure);
        } else {
            return _api_base('GET', root + '/' + url + '?format=json', params, success, failure);
        }
    },
    post: function post(url, params, success, failure) {
        if (verify(url)) {
            _init();
        };
        if (url.indexOf('?') != -1) {
            return _api_base('POST', root + '/' + url + '&format=json', params, success, failure);
        } else {
            return _api_base('POST', root + '/' + url + '?format=json', params, success, failure);
        }
    },
    delete: function _delete(url, params, success, failure) {
        return _api_base('DELETE', root + '/' + url, params, success, failure);
    },
    put: function put(url, params, success, failure) {
        return _api_base('PUT', root + '/' + url, params, success, failure);
    }
};