'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.TimeControls = exports.TimeControlsComponent = undefined;

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

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _monadicalReactComponents = require('monadical-react-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SOURCE = "https://github.com/Monadical-SAS/redux-time/blob/master/warped-time/controls.js";

var FPS = function FPS(speed, current_timestamp, former_time) {
        return Math.round(speed * 1000 / (current_timestamp - former_time)) || 0;
};

var TimeControlsComponent = exports.TimeControlsComponent = function TimeControlsComponent(_ref) {
        var genesis_time = _ref.genesis_time,
            warped_time = _ref.warped_time,
            former_time = _ref.former_time,
            most_future_time = _ref.most_future_time,
            actual_time = _ref.actual_time,
            speed = _ref.speed,
            setSpeed = _ref.setSpeed,
            setWarpedTime = _ref.setWarpedTime,
            debug = _ref.debug,
            expanded = _ref.expanded;


        return (0, _jsx3.default)(_monadicalReactComponents.ExpandableSection, {
                name: 'Time Controls',
                source: debug && SOURCE,
                expanded: expanded
        }, void 0, 'Speed of Time: ', speed, 'x | Warped \uD83D\uDD50 ', Math.round(warped_time, 0), ' | Actual \uD83D\uDD70 ', actual_time, ' ', speed == 0 ? '(updating paused)' : '', ' |\xA0', FPS(speed, warped_time, former_time), ' FPS', (0, _jsx3.default)('br', {}), (0, _jsx3.default)('span', {
                style: { float: 'right' }
        }, void 0, ' ', actual_time, ' '), (0, _jsx3.default)('span', {
                style: { float: 'left' }
        }, void 0, ' ', genesis_time, ' '), (0, _jsx3.default)('div', {
                style: { width: '70%', display: 'block',
                        'margin-left': 'auto', 'margin-right': 'auto' }
        }, void 0, (0, _jsx3.default)('input', {
                type: 'range',
                onChange: function onChange(e) {
                        setSpeed(0);
                        setWarpedTime(Number(e.target.value));
                },
                min: genesis_time,
                max: most_future_time,
                step: Math.min(30 - (most_future_time - genesis_time) / 5, 30),
                value: warped_time,
                style: {
                        float: 'left', height: '10px', display: 'inline',
                        width: Math.min((most_future_time - genesis_time) / 150, 100) + '%'
                }
        })), (0, _jsx3.default)('br', {}), (0, _jsx3.default)(_reactBootstrap.Button, {
                bsStyle: speed === -10 ? 'success' : 'default',
                onClick: function onClick() {
                        return setSpeed(-10);
                }
        }, void 0, '-10x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
                bsStyle: speed === -1 ? 'success' : 'default',
                onClick: function onClick() {
                        return setSpeed(-1);
                }
        }, void 0, '-1x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
                bsStyle: speed === -0.1 ? 'success' : 'default',
                onClick: function onClick() {
                        return setSpeed(-0.1);
                }
        }, void 0, '-0.1x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
                bsStyle: speed === -0.01 ? 'success' : 'default',
                onClick: function onClick() {
                        return setSpeed(-0.01);
                }
        }, void 0, '-0.01x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
                bsStyle: speed === -0.001 ? 'success' : 'default',
                onClick: function onClick() {
                        return setSpeed(-0.001);
                }
        }, void 0, '-0.001x'), ' \xA0', speed === 0 ? (0, _jsx3.default)(_reactBootstrap.Button, {
                bsStyle: 'success',
                onClick: function onClick() {
                        return setSpeed(1);
                }
        }, void 0, '\u25B6\uFE0F') : (0, _jsx3.default)(_reactBootstrap.Button, {
                bsStyle: 'danger',
                onClick: function onClick() {
                        return setSpeed(0);
                }
        }, void 0, '\u23F8'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
                bsStyle: speed === 0.001 ? 'success' : 'default',
                onClick: function onClick() {
                        return setSpeed(0.001);
                }
        }, void 0, '+0.001x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
                bsStyle: speed === 0.01 ? 'success' : 'default',
                onClick: function onClick() {
                        return setSpeed(0.01);
                }
        }, void 0, '+0.01x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
                bsStyle: speed === 0.1 ? 'success' : 'default',
                onClick: function onClick() {
                        return setSpeed(0.1);
                }
        }, void 0, '+0.1x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
                bsStyle: speed === 1 ? 'success' : 'default',
                onClick: function onClick() {
                        return setSpeed(1);
                }
        }, void 0, '1x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
                bsStyle: speed === 10 ? 'success' : 'default',
                onClick: function onClick() {
                        return setSpeed(10);
                }
        }, void 0, '+10x'));
};

// auto-self-updating TimeControls component using requestAnimationFrame

var TimeControls = exports.TimeControls = function (_React$Component) {
        (0, _inherits3.default)(TimeControls, _React$Component);

        function TimeControls(props) {
                (0, _classCallCheck3.default)(this, TimeControls);

                var _this = (0, _possibleConstructorReturn3.default)(this, (TimeControls.__proto__ || (0, _getPrototypeOf2.default)(TimeControls)).call(this, props));

                _this.time = props.time;
                _this.state = {};
                props.tick.subscribe(_this.tick.bind(_this));
                return _this;
        }

        (0, _createClass3.default)(TimeControls, [{
                key: 'computeState',
                value: function computeState() {
                        return {
                                speed: this.time.speed,
                                former_time: this.state.warped_time,
                                genesis_time: this.time.genesis_time,
                                warped_time: this.time.getWarpedTime(),
                                actual_time: this.time.getActualTime(),
                                most_future_time: this.time.most_future_time
                        };
                }
        }, {
                key: 'tick',
                value: function tick() {
                        this.setState(this.computeState());
                }
        }, {
                key: 'render',
                value: function render() {
                        var _context;

                        return (0, _jsx3.default)(TimeControlsComponent, {
                                speed: this.state.speed,
                                former_time: this.state.former_time,
                                genesis_time: this.state.genesis_time,
                                warped_time: this.state.warped_time,
                                actual_time: this.state.actual_time,
                                most_future_time: this.state.most_future_time,
                                setSpeed: (_context = this.time).setSpeed.bind(_context),
                                setWarpedTime: (_context = this.time).setWarpedTime.bind(_context),
                                debug: this.props.debug,
                                expanded: this.props.expanded
                        });
                }
        }]);
        return TimeControls;
}(_react2.default.Component);
