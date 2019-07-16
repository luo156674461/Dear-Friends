'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUser = exports.editUser = exports.batchRemoveUser = exports.removeUser = exports.getUserListPage = exports.getUserList = exports.requestLogin = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base = '';

var requestLogin = exports.requestLogin = function requestLogin(params) {
  return _axios2.default.post(base + '/login', params).then(function (res) {
    return res.data;
  });
};

var getUserList = exports.getUserList = function getUserList(params) {
  return _axios2.default.get(base + '/user/list', { params: params });
};

var getUserListPage = exports.getUserListPage = function getUserListPage(params) {
  return _axios2.default.get(base + '/user/listpage', { params: params });
};

var removeUser = exports.removeUser = function removeUser(params) {
  return _axios2.default.get(base + '/user/remove', { params: params });
};

var batchRemoveUser = exports.batchRemoveUser = function batchRemoveUser(params) {
  return _axios2.default.get(base + '/user/batchremove', { params: params });
};

var editUser = exports.editUser = function editUser(params) {
  return _axios2.default.get(base + '/user/edit', { params: params });
};

var addUser = exports.addUser = function addUser(params) {
  return _axios2.default.get(base + '/user/add', { params: params });
};