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

var RoadsFootpaths = function RoadsFootpaths(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ viewBox: "0 0 20 18", className: "custom-icon" }, props),
    _react2.default.createElement("path", { d: "M21.714 18.342L17.132 3.661a1.154 1.154 0 0 0-.286-.464c-.132-.131-.271-.197-.418-.197h-3.725c.095 0 .18.044.253.133.073.09.113.195.12.317l.165 2.7a.466.466 0 0 1-.087.323.298.298 0 0 1-.242.127h-1.824a.297.297 0 0 1-.242-.127.464.464 0 0 1-.088-.323l.165-2.7a.534.534 0 0 1 .121-.317c.073-.088.157-.133.253-.133H7.57c-.146 0-.285.066-.417.197a1.154 1.154 0 0 0-.286.464L2.286 18.342A5.254 5.254 0 0 0 2 19.973c0 .685.168 1.027.506 1.027h7.736c-.096 0-.176-.044-.242-.133a.467.467 0 0 1-.088-.317l.22-3.6a.536.536 0 0 1 .12-.316c.074-.09.158-.133.254-.133h2.988c.096 0 .18.044.253.133.073.089.114.194.121.316l.22 3.6a.468.468 0 0 1-.088.317c-.066.089-.146.133-.242.133h7.736c.337 0 .506-.342.506-1.027 0-.506-.095-1.05-.286-1.63zm-8.715-5.707a.35.35 0 0 1-.08.26.267.267 0 0 1-.208.105H10.29a.267.267 0 0 1-.209-.104.35.35 0 0 1-.079-.26v-.053l.238-4.166a.503.503 0 0 1 .11-.293c.066-.083.142-.124.228-.124h1.846c.086 0 .162.041.228.124.067.082.103.18.11.293l.238 4.166v.052z" })
  );
};

exports.default = RoadsFootpaths;