'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ConsoleApp = require('./components/ConsoleApp');

var _ConsoleApp2 = _interopRequireDefault(_ConsoleApp);

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_ConsoleApp2.default, null), document.getElementById('app_content'));
_reactDom2.default.render(_react2.default.createElement(_Header2.default, null), document.getElementById('qdup_header'));