'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _switch = require('vant/es/switch');

var _switch2 = _interopRequireDefault(_switch);

var _col = require('vant/es/col');

var _col2 = _interopRequireDefault(_col);

var _row = require('vant/es/row');

var _row2 = _interopRequireDefault(_row);

var _cellGroup = require('vant/es/cell-group');

var _cellGroup2 = _interopRequireDefault(_cellGroup);

var _cell = require('vant/es/cell');

var _cell2 = _interopRequireDefault(_cell);

var _radio = require('vant/es/radio');

var _radio2 = _interopRequireDefault(_radio);

var _radioGroup = require('vant/es/radio-group');

var _radioGroup2 = _interopRequireDefault(_radioGroup);

var _picker = require('vant/es/picker');

var _picker2 = _interopRequireDefault(_picker);

var _popup = require('vant/es/popup');

var _popup2 = _interopRequireDefault(_popup);

var _slider = require('vant/es/slider');

var _slider2 = _interopRequireDefault(_slider);

var _icon = require('vant/es/icon');

var _icon2 = _interopRequireDefault(_icon);

var _tabbarItem = require('vant/es/tabbar-item');

var _tabbarItem2 = _interopRequireDefault(_tabbarItem);

var _tabbar = require('vant/es/tabbar');

var _tabbar2 = _interopRequireDefault(_tabbar);

var _collapseItem = require('vant/es/collapse-item');

var _collapseItem2 = _interopRequireDefault(_collapseItem);

var _collapse = require('vant/es/collapse');

var _collapse2 = _interopRequireDefault(_collapse);

var _button = require('vant/es/button');

var _button2 = _interopRequireDefault(_button);

require('vant/es/switch/style');

require('vant/es/col/style');

require('vant/es/row/style');

require('vant/es/cell-group/style');

require('vant/es/cell/style');

require('vant/es/radio/style');

require('vant/es/radio-group/style');

require('vant/es/picker/style');

require('vant/es/popup/style');

require('vant/es/slider/style');

require('vant/es/icon/style');

require('vant/es/tabbar-item/style');

require('vant/es/tabbar/style');

require('vant/es/collapse-item/style');

require('vant/es/collapse/style');

require('vant/es/button/style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = [_button2.default, _collapse2.default, _collapseItem2.default, _tabbar2.default, _tabbarItem2.default, _icon2.default, _slider2.default, _popup2.default, _picker2.default, _radioGroup2.default, _radio2.default, _cell2.default, _cellGroup2.default, _row2.default, _col2.default, _switch2.default];
exports.default = {
    install: function install(Vue) {
        components.forEach(function (c) {
            return Vue.use(c);
        });
    }
};