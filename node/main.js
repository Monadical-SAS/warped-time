'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TimeControlsComponent = exports.TimeControls = exports.time = exports.WarpedTime = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _reducers = require('./reducers.js');

var _controls = require('./controls.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    Usage:
        window.store = createStore(combineReducers({time, ...}))

        window.time = new WarpedTime(window.store)

        time.getWarpedTime() => 3241
        window.store.dispatch({type: 'SET_TIME_WARP', speed: -1})
        time.getWarpedTime() = 3100

*/

var WarpedTime = function () {
    function WarpedTime() {
        var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var speed = arguments[1];
        var server_time = arguments[2];
        var warped_time = arguments[3];
        (0, _classCallCheck3.default)(this, WarpedTime);

        this.store = store;
        this.speed = 1;
        this._lastTime = new Date().getTime();
        this._currTime = this._lastTime;
        this.server_offset = 0;

        if (speed !== undefined) {
            this.setSpeed(speed);
        }
        if (server_time !== undefined) {
            this.setActualTime(server_time);
        }
        if (warped_time !== undefined) {
            this.setWarpedTime(warped_time);
        }

        if (store) {
            this.store.subscribe(this.handleStateChange.bind(this));
        }
    }

    (0, _createClass3.default)(WarpedTime, [{
        key: 'setSpeed',
        value: function setSpeed(speed) {
            this.speed = speed;
        }
    }, {
        key: 'getSystemTime',
        value: function getSystemTime() {
            return new Date().getTime();
        }
    }, {
        key: 'getActualTime',
        value: function getActualTime() {
            return this.getSystemTime() + this.server_offset;
        }
    }, {
        key: 'setActualTime',
        value: function setActualTime(server_time, duration) {
            var _this = this;

            var system_time = this.getSystemTime();
            var final_offset = server_time - system_time;

            if (duration) {
                debugger;
                // TODO: test this gradual adjustment code
                var step_time = 10;
                var total_steps = duration / step_time;
                var step_amt = (final_offset - this.server_offset) / total_steps;
                var step = 0;
                var adjuster = function adjuster() {
                    _this.server_offset += step_amt;
                    step += 1;
                    if (step < total_steps && _this.server_offset != final_offset) {
                        setTimemout(adjuster, 10);
                    }
                };
                return this.getActualTime();
            } else {
                this.server_offset = final_offset;
                return this.getActualTime();
            }
        }
    }, {
        key: 'getWarpedTime',
        value: function getWarpedTime() {
            var actualTime = this.getActualTime();
            this._currTime += (actualTime - this._lastTime) * this.speed;
            this._lastTime = actualTime;
            return this._currTime;
        }
    }, {
        key: 'setWarpedTime',
        value: function setWarpedTime(timestamp, duration) {
            if (duration) {
                // TODO: gradual syncing not implemented yet
                debugger;
            } else {
                this._lastTime = timestamp;
                this._curTime = this.getActualTime();
                return this.getWarpedTime();
            }
        }
    }, {
        key: 'handleStateChange',
        value: function handleStateChange() {
            this.setSpeed((0, _reducers.select)(this.store.getState()).speed);
        }
    }]);
    return WarpedTime;
}();

exports.WarpedTime = WarpedTime;
exports.time = _reducers.time;
exports.TimeControls = _controls.TimeControls;
exports.TimeControlsComponent = _controls.TimeControlsComponent;
