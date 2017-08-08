'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TimeControls = exports.TimeControlsComponent = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var FPS = function FPS(speed, current_timestamp, last_timestamp) {
    return Math.round(speed * 1000 / (current_timestamp - last_timestamp)) || 0;
};

var TimeControlsComponent = exports.TimeControlsComponent = function TimeControlsComponent(_ref) {
    var current_timestamp = _ref.current_timestamp,
        last_timestamp = _ref.last_timestamp,
        speed = _ref.speed,
        setSpeed = _ref.setSpeed,
        debug = _ref.debug,
        expanded = _ref.expanded;

    return (0, _jsx3.default)(_monadicalReactComponents.ExpandableSection, {
        name: 'Time Controls',
        source: debug && SOURCE,
        expanded: expanded
    }, void 0, 'Speed of Time: ', speed, 'x | Warped \uD83D\uDD50 ', Math.round(current_timestamp, 0), ' | Actual \uD83D\uDD70 ', new Date().getTime(), ' ', speed == 0 ? '(updating paused)' : '', ' |\xA0', FPS(speed, current_timestamp, last_timestamp), ' FPS', (0, _jsx3.default)('br', {}), 'Reverse \u23EA', (0, _jsx3.default)('input', {
        type: 'range',
        onChange: function onChange(e) {
            return setSpeed(e.target.value);
        },
        min: -2,
        max: 2,
        step: 0.01,
        value: speed,
        style: { width: '70%', height: '10px', display: 'inline' }
    }), '\u23E9 Forward', (0, _jsx3.default)('br', {}), (0, _jsx3.default)(_reactBootstrap.Button, {
        onClick: setSpeed.bind(undefined, -100)
    }, void 0, '-100x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
        onClick: setSpeed.bind(undefined, -10)
    }, void 0, '-10x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
        onClick: setSpeed.bind(undefined, -1)
    }, void 0, '-1x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
        onClick: setSpeed.bind(undefined, -0.1)
    }, void 0, '-0.1x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
        onClick: setSpeed.bind(undefined, -0.01)
    }, void 0, '-0.01x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
        bsStyle: 'danger',
        onClick: setSpeed.bind(undefined, 0)
    }, void 0, '\u23F8'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
        bsStyle: 'success',
        onClick: setSpeed.bind(undefined, 1)
    }, void 0, '\u25B6\uFE0F'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
        onClick: setSpeed.bind(undefined, 0.01)
    }, void 0, '+0.01x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
        onClick: setSpeed.bind(undefined, 0.1)
    }, void 0, '+0.1x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
        onClick: setSpeed.bind(undefined, 1)
    }, void 0, '1x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
        onClick: setSpeed.bind(undefined, 10)
    }, void 0, '+10x'), ' \xA0', (0, _jsx3.default)(_reactBootstrap.Button, {
        onClick: setSpeed.bind(undefined, 100)
    }, void 0, '+100x'));
};

// auto-self-updating TimeControls component using requestAnimationFrame

var TimeControls = exports.TimeControls = function (_React$Component) {
    (0, _inherits3.default)(TimeControls, _React$Component);

    function TimeControls(props) {
        (0, _classCallCheck3.default)(this, TimeControls);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TimeControls.__proto__ || (0, _getPrototypeOf2.default)(TimeControls)).call(this, props));

        _this.time = _this.props.time || window.time;
        _this.state = {
            speed: _this.time.speed,
            current_timestamp: _this.time.getWarpedTime(),
            last_timestamp: _this.time.getWarpedTime() - 20
        };
        return _this;
    }

    (0, _createClass3.default)(TimeControls, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.animating = true;
            this.tick();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.animating = false;
        }
    }, {
        key: 'tick',
        value: function tick() {
            this.setState({
                current_timestamp: this.props.time.getWarpedTime(),
                last_timestamp: this.state.current_timestamp
            });
            if (this.animating) {
                window.requestAnimationFrame(this.tick.bind(this));
            }
        }
    }, {
        key: 'setSpeed',
        value: function setSpeed(speed) {
            this.time.setSpeed(speed);
            this.setState((0, _extends3.default)({}, this.state, { speed: speed }));
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _jsx3.default)(TimeControlsComponent, {
                speed: this.state.speed,
                current_timestamp: this.state.current_timestamp,
                last_timestamp: this.state.last_timestamp,
                setSpeed: this.setSpeed.bind(this),
                debug: this.props.debug,
                expanded: this.props.expanded
            });
        }
    }]);
    return TimeControls;
}(_react2.default.Component);
