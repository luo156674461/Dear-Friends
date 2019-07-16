'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Users = exports.LoginUsers = undefined;

var _mockjs = require('mockjs');

var _mockjs2 = _interopRequireDefault(_mockjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginUsers = [{
  id: 1,
  username: 'admin',
  password: '123456',
  avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
  name: '张某某'
}];

var Users = [];

for (var i = 0; i < 86; i++) {
  Users.push(_mockjs2.default.mock({
    id: _mockjs2.default.Random.guid(),
    name: _mockjs2.default.Random.cname(),
    addr: _mockjs2.default.mock('@county(true)'),
    'age|18-60': 1,
    birth: _mockjs2.default.Random.date(),
    sex: _mockjs2.default.Random.integer(0, 1)
  }));
}

exports.LoginUsers = LoginUsers;
exports.Users = Users;