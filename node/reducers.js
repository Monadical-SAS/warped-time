'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.time = exports.select = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var select = exports.select = function select(state) {
    return state.time;
};

var initial_state = {
    speed: 1
};

var time = exports.time = function time() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial_state;
    var action = arguments[1];

    switch (action.type) {
        case 'SET_TIME_WARP':
            return (0, _extends3.default)({}, state, { speed: action.speed });
        default:
            return state;
    }
};
