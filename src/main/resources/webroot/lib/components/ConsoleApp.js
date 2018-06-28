'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActiveOutput = require('./ActiveOutput');

var _ActiveOutput2 = _interopRequireDefault(_ActiveOutput);

var _PendingDownloadsOutput = require('./PendingDownloadsOutput');

var _PendingDownloadsOutput2 = _interopRequireDefault(_PendingDownloadsOutput);

var _LatchesOutput = require('./LatchesOutput');

var _LatchesOutput2 = _interopRequireDefault(_LatchesOutput);

var _CountersOutput = require('./CountersOutput');

var _CountersOutput2 = _interopRequireDefault(_CountersOutput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConsoleApp = function (_React$Component) {
    _inherits(ConsoleApp, _React$Component);

    function ConsoleApp(props) {
        _classCallCheck(this, ConsoleApp);

        var _this = _possibleConstructorReturn(this, (ConsoleApp.__proto__ || Object.getPrototypeOf(ConsoleApp)).call(this, props));

        _this.state = {
            showActiveOutput: true,
            showPendingdownloads: false,
            showLatches: false,
            showCounters: false
        };
        _this._onActiveClick = _this._onActiveClick.bind(_this);
        _this._onPendingClick = _this._onActiveClick.bind(_this);
        _this._onLatchesClick = _this._onLatchesClick.bind(_this);
        _this._onCountersClick = _this._onCountersClick.bind(_this);
        return _this;
    }

    _createClass(ConsoleApp, [{
        key: '_onActiveClick',
        value: function _onActiveClick() {
            this.setState({
                showActiveOutput: true,
                showPendingdownloads: false,
                showLatches: false,
                showCounters: false
            });
        }
    }, {
        key: '_onPendingClick',
        value: function _onPendingClick() {
            this.setState({
                showActiveOutput: false,
                showPendingdownloads: true,
                showLatches: false,
                showCounters: false
            });
        }
    }, {
        key: '_onLatchesClick',
        value: function _onLatchesClick() {
            this.setState({
                showActiveOutput: false,
                showPendingdownloads: false,
                showLatches: true,
                showCounters: false
            });
        }
    }, {
        key: '_onCountersClick',
        value: function _onCountersClick() {
            this.setState({
                showActiveOutput: false,
                showPendingdownloads: false,
                showLatches: false,
                showCounters: true
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.state.showActiveOutput ? _react2.default.createElement(_ActiveOutput2.default, null) : null,
                this.state.showPendingdownloads ? _react2.default.createElement(_PendingDownloadsOutput2.default, null) : null,
                this.state.showLatches ? _react2.default.createElement(_LatchesOutput2.default, null) : null,
                this.state.showCounters ? _react2.default.createElement(_CountersOutput2.default, null) : null
            );
        }
    }]);

    return ConsoleApp;
}(_react2.default.Component);

exports.default = ConsoleApp;