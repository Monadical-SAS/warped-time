'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.time = exports.WarpedTime = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _reducers = require('./reducers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WarpedTime = function () {
    function WarpedTime() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            store = _ref.store,
            speed = _ref.speed,
            server_time = _ref.server_time,
            warped_time = _ref.warped_time,
            genesis_time = _ref.genesis_time,
            _ref$timeSource = _ref.timeSource,
            timeSource = _ref$timeSource === undefined ? Date : _ref$timeSource;

        (0, _classCallCheck3.default)(this, WarpedTime);

        this.store = store;
        this.timeSource = timeSource;
        this.speed = 1;
        this._lastTime = timeSource.now();
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
        this.genesis_time = genesis_time || this.getWarpedTime();
        this.most_future_time = this.getWarpedTime();

        if (store) {
            this.store.subscribe(this.handleStateChange.bind(this));
        }
    }

    (0, _createClass3.default)(WarpedTime, [{
        key: 'setSpeed',
        value: function setSpeed(speed) {
            raise_if_not_number(speed, '@WarpedTime.setSpeed');
            this.speed = speed;
            return this.getWarpedTime();
        }
    }, {
        key: 'getSystemTime',
        value: function getSystemTime() {
            return this.timeSource.now();
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

            raise_if_not_number(server_time, '@WarpedTime.setActualTime');
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
            this.most_future_time = Math.max(this.most_future_time, this._currTime);
            return this._currTime;
        }
    }, {
        key: 'setWarpedTime',
        value: function setWarpedTime(timestamp, duration) {
            raise_if_not_number(timestamp, '@WarpedTime.setWarpedTime');
            if (duration) {
                // TODO: gradual syncing not implemented yet
                console.error('Passing 2nd argument duration is not supported yet.');
                debugger;
            } else {
                this._lastTime = this.getActualTime();
                this._currTime = timestamp;
                return this.getWarpedTime();
            }
        }
    }, {
        key: 'handleStateChange',
        value: function handleStateChange() {
            var speed = (0, _reducers.select_time)(this.store.getState()).speed;
            if (speed !== null) {
                this.setSpeed(speed);
            }
            var warped_time = (0, _reducers.select_time)(this.store.getState()).warped_time;
            if (warped_time !== null) {
                this.setWarpedTime(warped_time);
            }
        }
    }]);
    return WarpedTime;
}(); /*
         Usage:
             window.store = createStore(combineReducers({time, ...}))
     
             window.time = new WarpedTime(window.store)
     
             time.getWarpedTime() => 3241
             window.store.dispatch({type: 'SET_SPEED', speed: -1})
             time.getWarpedTime() = 3100
     
     */

var raise_if_not_number = function raise_if_not_number(n, msg) {
    if (!(typeof n === 'number')) {
        throw 'Expected a number but got ' + (typeof n === 'undefined' ? 'undefined' : (0, _typeof3.default)(n)) + '.' + (msg ? '\n' + msg : '');
    }
};

exports.WarpedTime = WarpedTime;
exports.time = _reducers.time;
