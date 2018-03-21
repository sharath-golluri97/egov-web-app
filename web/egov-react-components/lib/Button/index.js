"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RaisedButton = require("material-ui/RaisedButton");

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(props) {
  var label = props.label,
      _props$icon = props.icon,
      icon = _props$icon === undefined ? {} : _props$icon,
      className = props.className,
      onClick = props.onClick,
      backgroundColor = props.backgroundColor,
      labelColor = props.labelColor,
      fullWidth = props.fullWidth,
      disabled = props.disabled,
      _props$primary = props.primary,
      primary = _props$primary === undefined ? false : _props$primary,
      _props$style = props.style,
      style = _props$style === undefined ? {} : _props$style,
      id = props.id;

  return _react2.default.createElement(_RaisedButton2.default, _extends({
    icon: _react2.default.createElement(
      "i",
      { style: icon.style, className: "material-icons" },
      icon.name
    )
  }, props));
};

Button.propTypes = {
  onClick: _propTypes2.default.func,
  primary: _propTypes2.default.bool,
  fullWidth: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  style: _propTypes2.default.object
};

exports.default = Button;