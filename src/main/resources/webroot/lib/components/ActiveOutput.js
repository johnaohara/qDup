'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var reactStringReplace = require('react-string-replace');

var ActiveOutput = function (_React$Component) {
    _inherits(ActiveOutput, _React$Component);

    function ActiveOutput() {
        _classCallCheck(this, ActiveOutput);

        var _this = _possibleConstructorReturn(this, (ActiveOutput.__proto__ || Object.getPrototypeOf(ActiveOutput)).call(this));

        _this.state = {
            output: '',
            name: '',
            host: ''
        };
        return _this;
    }

    _createClass(ActiveOutput, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.timer = setInterval(function () {
                return _this2.getActiveCommands();
            }, 1000);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.timer = null;
        }
    }, {
        key: 'getActiveCommands',
        value: function getActiveCommands() {
            var _this3 = this;

            fetch('http://test.perf:31337/active', { mode: 'cors' }).then(function (results) {
                return results.json();
            }).then(function (data) {
                _this3.setState({ output: data[0].output, name: data[0].name, host: data[0].host });
                console.info(data[0].output);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { id: 'editor' },
                _react2.default.createElement(
                    'div',
                    { className: 'panel-v', style: { width: "calc(100% - 0.5px)" } },
                    _react2.default.createElement(
                        'div',
                        { className: 'panel-h panel', style: { height: "calc(10% - 0.5px)" } },
                        _react2.default.createElement(
                            'div',
                            { className: 'windowLabelCont' },
                            _react2.default.createElement(
                                'a',
                                { href: '#', className: 'windowLabel', 'data-panel': 'html', 'data-popover-trigger': 'html' },
                                ' ',
                                _react2.default.createElement(
                                    'span',
                                    {
                                        className: 'label' },
                                    'Active Command'
                                ),
                                _react2.default.createElement(
                                    'svg',
                                    { width: '8', height: '7', viewBox: '-0.019531 -52.792969 30.039062 25.195312' },
                                    _react2.default.createElement('path', {
                                        d: 'M29.941406 -52.500000C29.785156 -52.656250 29.589844 -52.753906 29.355469 -52.792969L0.644531 -52.792969C0.410156 -52.753906 0.214844 -52.656250 0.058594 -52.500000C-0.019531 -52.265625 0.000000 -52.050781 0.117188 -51.855469L14.472656 -27.890625C14.628906 -27.734375 14.804688 -27.636719 15.000000 -27.597656C15.234375 -27.636719 15.410156 -27.734375 15.527344 -27.890625L29.882812 -51.855469C30.000000 -52.089844 30.019531 -52.304688 29.941406 -52.500000ZM29.941406 -52.500000' })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'CodeMirror cm-s-default CodeMirror-wrap' },
                            _react2.default.createElement(
                                'div',
                                { className: 'CodeMirror-scroll', tabIndex: '-1' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'CodeMirror-sizer',
                                        style: {
                                            marginLeft: "58px",
                                            marginBottom: "-15px",
                                            borderRightWidth: "15px",
                                            minHeight: "72px",
                                            paddingRight: "0px",
                                            paddingBottom: "0px"
                                        } },
                                    _react2.default.createElement(
                                        'div',
                                        { style: { position: "relative", top: "0px" } },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'CodeMirror-lines', role: 'presentation' },
                                            'host:    ',
                                            this.state.host,
                                            _react2.default.createElement('br', null),
                                            'command: ',
                                            this.state.name
                                        )
                                    )
                                ),
                                _react2.default.createElement('div', {
                                    style: {
                                        position: "absolute",
                                        height: "15px",
                                        width: "1px",
                                        borderBottom: "0px solid transparent",
                                        top: "72px"
                                    } })
                            )
                        )
                    ),
                    _react2.default.createElement('div', { className: 'gutter gutter-vertical', style: { height: "1px" } }),
                    _react2.default.createElement(
                        'div',
                        { className: 'panel-h panel', style: { height: "calc(90% - 0.5px)" } },
                        _react2.default.createElement(
                            'div',
                            { className: 'windowLabelCont' },
                            _react2.default.createElement(
                                'a',
                                { href: '#', className: 'windowLabel', 'data-panel': 'html', 'data-popover-trigger': 'html' },
                                ' ',
                                _react2.default.createElement(
                                    'span',
                                    {
                                        className: 'label' },
                                    'Console Output'
                                ),
                                _react2.default.createElement(
                                    'svg',
                                    { width: '8', height: '7', viewBox: '-0.019531 -52.792969 30.039062 25.195312' },
                                    _react2.default.createElement('path', {
                                        d: 'M29.941406 -52.500000C29.785156 -52.656250 29.589844 -52.753906 29.355469 -52.792969L0.644531 -52.792969C0.410156 -52.753906 0.214844 -52.656250 0.058594 -52.500000C-0.019531 -52.265625 0.000000 -52.050781 0.117188 -51.855469L14.472656 -27.890625C14.628906 -27.734375 14.804688 -27.636719 15.000000 -27.597656C15.234375 -27.636719 15.410156 -27.734375 15.527344 -27.890625L29.882812 -51.855469C30.000000 -52.089844 30.019531 -52.304688 29.941406 -52.500000ZM29.941406 -52.500000' })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'CodeMirror cm-s-default CodeMirror-wrap' },
                            _react2.default.createElement(
                                'div',
                                { className: 'CodeMirror-scroll', tabIndex: '-1' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'CodeMirror-sizer',
                                        style: {
                                            marginLeft: "58px",
                                            marginBottom: "-15px",
                                            borderRightWidth: "15px",
                                            minHeight: "72px",
                                            paddingRight: "0px",
                                            paddingBottom: "0px"
                                        } },
                                    _react2.default.createElement(
                                        'div',
                                        { style: { position: "relative", top: "0px" } },
                                        _react2.default.createElement('div', { className: 'CodeMirror-lines', role: 'presentation', dangerouslySetInnerHTML: { __html: this.state.output.replace(/(?:[\n])/g, "<br/>") } })
                                    )
                                ),
                                _react2.default.createElement('div', {
                                    style: {
                                        position: "absolute",
                                        height: "15px",
                                        width: "1px",
                                        borderBottom: "0px solid transparent",
                                        top: "72px"
                                    } })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ActiveOutput;
}(_react2.default.Component);

exports.default = ActiveOutput;