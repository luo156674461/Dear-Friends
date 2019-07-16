'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	increment: function increment(_ref) {
		var commit = _ref.commit;

		commit('INCREMENT');
	},
	decrement: function decrement(_ref2) {
		var commit = _ref2.commit;

		commit('DECREMENT');
	},
	inchange: function inchange(_ref3) {
		var commit = _ref3.commit;

		commit('change');
	}
};