'use strict';

var _main = require('./main.js');

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
