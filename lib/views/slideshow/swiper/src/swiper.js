'use strict';

var _coreClass = require('./components/core/core-class');

var _coreClass2 = _interopRequireDefault(_coreClass);

var _device = require('./modules/device/device');

var _device2 = _interopRequireDefault(_device);

var _support = require('./modules/support/support');

var _support2 = _interopRequireDefault(_support);

var _browser = require('./modules/browser/browser');

var _browser2 = _interopRequireDefault(_browser);

var _resize = require('./modules/resize/resize');

var _resize2 = _interopRequireDefault(_resize);

var _observer = require('./modules/observer/observer');

var _observer2 = _interopRequireDefault(_observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = [_device2.default, _support2.default, _browser2.default, _resize2.default, _observer2.default];

if (typeof _coreClass2.default.use === 'undefined') {
  _coreClass2.default.use = _coreClass2.default.Class.use;
  _coreClass2.default.installModule = _coreClass2.default.Class.installModule;
}

_coreClass2.default.use(components);