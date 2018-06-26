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
            name: ''
        };
        return _this;
    }

    _createClass(ActiveOutput, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            fetch('http://test.perf:31337/active', { mode: 'cors' }).then(function (results) {
                return results.json();
            }).then(function (data) {
                _this2.setState({ output: data[0].output, name: data[0].name });
                console.info(data[0].output);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(
                    'h2',
                    null,
                    'Name'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    this.state.name
                ),
                _react2.default.createElement(
                    'h2',
                    null,
                    'Output'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'console' },
                    _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: this.state.output.replace(/(?:\\[rn]|[\r\n])/g, "<br>") } })
                )
            );
        }
    }]);

    return ActiveOutput;
}(_react2.default.Component);

exports.default = ActiveOutput;