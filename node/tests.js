'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _main = require('./main.js');

var _controls = require('./controls.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// util functions
var assert = function assert(val, error_msg) {
    if (!val) {
        console.log('[X] AssertionError: ' + error_msg + ' (' + val + ')');
    } else {
        process ? process.stdout.write('.') : console.log('.');
    }
};

var assert_fuzzy_equal_time = function assert_fuzzy_equal_time(val1, val2, error_msg) {
    assert(Math.abs(val1 - val2) < 25, error_msg);
};

// Tests with a real time source
var start_time = Date.now();
var time_passed = function time_passed() {
    return Date.now() - start_time;
};

var wt1 = new _main.WarpedTime();

assert_fuzzy_equal_time(wt1.genesis_time, start_time, 'wt.genesis_time - start_time == ' + (wt1.genesis_time - start_time) + ' but should be ~0');

assert_fuzzy_equal_time(wt1.getWarpedTime(), Date.now(), 'wt.getWarpedTime() - Date.now() == ' + (wt1.getWarpedTime() - Date.now()) + ' but should be ~0');

wt1.setSpeed(0.1);
setTimeout(function () {
    return assert_fuzzy_equal_time(wt1.getWarpedTime(), start_time + time_passed() / 10, 'wt.getWarpedTime() - start_time + time_passed / 10 == ' + (wt1.getWarpedTime() - start_time + time_passed() / 10) + ' but should be ~0.' + ' start_time=' + start_time + ' time_passed=' + time_passed());
}, 100);

var wt2 = new _main.WarpedTime();
var t = 500;
var speed = 5;
var delay = 100;
wt2.setWarpedTime(t);
wt2.setSpeed(speed);

setTimeout(function () {
    return assert_fuzzy_equal_time(wt2.getWarpedTime(), t + delay * speed, 'wt.getWarpedTime() - t + (delay * speed) == ' + (wt2.getWarpedTime() - t + delay * speed) + ' but should be ~0');
}, delay);

// Tests with time_source mocked out
var time_source_mock = {
    now: function now() {
        return 100;
    }
};

var wt3 = new _main.WarpedTime({
    timeSource: time_source_mock
});
assert(wt3.genesis_time === 100, 'expected 5, got ' + wt3.genesis_time);

wt3.setSpeed(2);
assert(wt3.speed === 2, 'expected 2, got ' + wt3.speed);

wt3.setWarpedTime(5);
assert(wt3.getWarpedTime() === 5, 'expected 5, got ' + wt3.getWarpedTime());

time_source_mock.now = function () {
    return 110;
};

// should be 2 * 10 + 5
assert(wt3.getWarpedTime() === 25, 'expected 25, got ' + wt3.getWarpedTime());

wt3.setActualTime(115);
assert(wt3.getActualTime() === 115, 'expected 115, got ' + wt3.getActualTime());

// Test TimeControls class

var TestableTick = function (_Tick) {
    (0, _inherits3.default)(TestableTick, _Tick);

    function TestableTick() {
        (0, _classCallCheck3.default)(this, TestableTick);
        return (0, _possibleConstructorReturn3.default)(this, (TestableTick.__proto__ || (0, _getPrototypeOf2.default)(TestableTick)).apply(this, arguments));
    }

    (0, _createClass3.default)(TestableTick, [{
        key: 'tick',
        value: function tick() {
            this.subscribers.forEach(function (fn) {
                return fn();
            });
            if (this.running) {
                setTimeout(this.tick.bind(this), 2);
            }
        }
    }]);
    return TestableTick;
}(_main.Tick);

var TestableTimeControls = function (_TimeControls) {
    (0, _inherits3.default)(TestableTimeControls, _TimeControls);

    function TestableTimeControls() {
        (0, _classCallCheck3.default)(this, TestableTimeControls);
        return (0, _possibleConstructorReturn3.default)(this, (TestableTimeControls.__proto__ || (0, _getPrototypeOf2.default)(TestableTimeControls)).apply(this, arguments));
    }

    (0, _createClass3.default)(TestableTimeControls, [{
        key: 'tick',
        value: function tick() {
            this.state = this.computeState();
        }
    }]);
    return TestableTimeControls;
}(_controls.TimeControls);

var tick = new TestableTick();
assert(Array.isArray(tick.subscribers), 'expected an Array, got ' + (0, _typeof3.default)(tick.subscribers));
assert(tick.running === true, 'expected true, got ' + tick.running);

var controls_start = Date.now();
var props = { time: new _main.WarpedTime(), tick: tick };
var controls = new TestableTimeControls(props);

var state = controls.computeState();
assert_fuzzy_equal_time(state.genesis_time, controls_start, 'expected ' + controls_start + ', got ' + state.genesis_time);

controls.time.setWarpedTime(t);
assert_fuzzy_equal_time(controls.time.getWarpedTime(), t, 'expected ' + t + ', got ' + controls.time.getWarpedTime());

var testControlsAfterNDelays = function testControlsAfterNDelays(n, wt, t, delay, recursive_call) {
    if (recursive_call) {
        var warped_time = controls.state.warped_time;
        assert_fuzzy_equal_time(warped_time, t + delay * speed, 'warped_time - t + (delay * speed) == ' + (warped_time - (t + delay * speed)) + ' but should be ~0.\n' + ('warped_time: ' + warped_time) + (', t: ' + t + ', delay: ' + delay + ', speed: ' + speed) + ('\nn is ' + n + '.'));
    }
    controls.time.setSpeed(speed);
    controls.time.setWarpedTime(t);
    if (n > 0) {
        setTimeout(testControlsAfterNDelays, delay, n - 1, wt, t, delay, true);
    } else {
        tick.stop();
    }
};
testControlsAfterNDelays(20, controls, 10, 10, false);
