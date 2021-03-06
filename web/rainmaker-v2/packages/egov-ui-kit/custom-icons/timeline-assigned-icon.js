"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require("material-ui/SvgIcon");

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assignedIcon = function assignedIcon(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ viewBox: "0 0 24 24", className: "custom-icon" }, props),
    _react2.default.createElement("path", {
      d: "M10.233 5.503c0 1.575-1.248 2.85-2.791 2.85-1.542 0-2.79-1.275-2.79-2.85C4.652 3.931 5.9.246 7.442.246c1.543 0 2.791 3.684 2.791 5.257zM22 11.201c0 1.575-1.248 2.849-2.792 2.849-1.54 0-2.79-1.274-2.79-2.849 0-1.573 2.543-4.141 4.084-4.141C22.046 7.06 22 9.628 22 11.2zm-16.418 0c0 1.575-1.248 2.849-2.792 2.849-1.54 0-2.789-1.274-2.789-2.849 0-1.573-.095-4.141 1.446-4.141 1.544 0 4.135 2.568 4.135 4.141zm11.72-5.698c0 1.575-1.248 2.85-2.791 2.85-1.542 0-2.79-1.275-2.79-2.85 0-1.572 1.248-5.257 2.79-5.257 1.543 0 2.79 3.684 2.79 5.257zm.61 11.206c.75 3.15-2.408 5.625-7.06 5.535-4.645-.09-7.748-2.638-6.932-5.698.814-3.055 3.971-5.535 7.054-5.535 3.085 0 6.19 2.553 6.939 5.698z",
      id: "a"
    })
  );
};

exports.default = assignedIcon;