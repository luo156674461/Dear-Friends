'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _device = require('../../utils/device');

var _device2 = _interopRequireDefault(_device);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'device',
  proto: {
    device: _device2.default
  },
  static: {
    device: _device2.default
  }
};