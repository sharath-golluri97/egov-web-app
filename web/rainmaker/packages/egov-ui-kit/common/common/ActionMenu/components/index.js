"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _Menu = require("material-ui/Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require("material-ui/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _reactRedux = require("react-redux");

var _components = require("components");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _lodash = require("lodash");

var _commons = require("egov-ui-kit/utils/commons");

var _ChevronLeft = require("@material-ui/icons/ChevronLeft");

var _ChevronLeft2 = _interopRequireDefault(_ChevronLeft);

var _ChevronRight = require("@material-ui/icons/ChevronRight");

var _ChevronRight2 = _interopRequireDefault(_ChevronRight);

var _Tooltip = require("@material-ui/core/Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = (0, _defineProperty3.default)({
  inputStyle: {
    color: "white !important",
    marginTop: "0px",
    marginLeft: "-10px"
  },
  fibreIconStyle: {
    height: "21px",
    width: "21px",
    margin: 0,
    position: "relative",
    fill: "rgba(0, 0, 0, 0.6)"
  },
  arrowIconStyle: {
    right: "-10px"
  },
  defaultMenuItemStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 0,
    padding: 0,
    paddingLeft: 0
  },
  inputIconStyle: {
    margin: "0",
    bottom: "15px",
    top: "auto",
    right: "6px"
  },
  textFieldStyle: {
    height: "auto"
  }
}, "inputStyle", {
  bottom: "5px",
  height: "auto",
  marginTop: 0
});

var ActionMenuComp = function (_Component) {
  (0, _inherits3.default)(ActionMenuComp, _Component);

  function ActionMenuComp(props) {
    (0, _classCallCheck3.default)(this, ActionMenuComp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActionMenuComp.__proto__ || Object.getPrototypeOf(ActionMenuComp)).call(this, props));

    _this.handleChange = function (e) {
      _this.setState({
        searchText: e.target.value
      });
    };

    _this.addMenuItems = function (path, splitArray, menuItems, index) {
      var _this$props = _this.props,
          role = _this$props.role,
          actionListArr = _this$props.actionListArr;

      var actionList = actionListArr;

      if (splitArray.length > 1) {
        if (!(0, _lodash.some)(menuItems, { name: splitArray[0] })) {
          menuItems.push({
            path: path != "" ? path + "." + splitArray[0] : "",
            name: splitArray[0],
            url: "",
            queryParams: actionList[index].queryParams,
            orderNumber: actionList[index].orderNumber,
            navigationURL: actionList[index].navigationURL,
            leftIcon: actionList[index].leftIcon
          });
        }
      } else {
        menuItems.push({
          path: path != "" ? path + "." + splitArray[0] : "",
          name: actionList[index].displayName,
          url: actionList[index].url,
          queryParams: actionList[index].queryParams,
          orderNumber: actionList[index].orderNumber,
          navigationURL: actionList[index].navigationURL,
          leftIcon: actionList[index].leftIcon
        });
      }
      menuItems = (0, _lodash.orderBy)(menuItems, ["orderNumber"], ["asc"]);
      _this.setState({
        menuItems: menuItems,
        path: path
      });
    };

    _this.menuChange = function (pathParam) {
      var path = pathParam.path;
      var _this$props2 = _this.props,
          role = _this$props2.role,
          actionListArr = _this$props2.actionListArr;

      var actionList = actionListArr;
      var menuItems = [];

      for (var i = 0; i < (actionList && actionList.length); i++) {
        if (actionList[i].path !== "") {
          if (path && !path.parentMenu && actionList[i].path.startsWith(path + ".")) {
            var splitArray = actionList[i].path.split(path + ".")[1].split(".");
            _this.addMenuItems(path, splitArray, menuItems, i);
          } else if (pathParam && pathParam.parentMenu && actionList[i].navigationURL) {
            var _splitArray = actionList[i].path.split(".");
            _this.addMenuItems(path, _splitArray, menuItems, i);
          }
        }
      }
    };

    _this.changeLevel = function (path) {
      var searchText = _this.state.searchText;
      var setRoute = _this.props.setRoute;


      if (!path) {
        var pathParam = {
          path: "",
          parentMenu: true
        };
        _this.menuChange(pathParam);
        setRoute("/");
      } else {
        var splitArray = (0, _lodash.split)(path, ".");
        var x = splitArray.slice(0, splitArray.length - 1).join(".");
        if (x != "" && splitArray.length > 1) {
          var _pathParam = {
            path: x,
            parentMenu: false
          };
          _this.menuChange(_pathParam);
        } else {
          var _pathParam2 = {
            path: "",
            parentMenu: true
          };
          _this.menuChange(_pathParam2);
        }
      }
    };

    _this.changeRoute = function (route) {
      var setRoute = _this.props.setRoute;

      setRoute(route);
    };

    _this.state = {
      searchText: "",
      path: "",
      menuItems: [],
      selectedMenuIndex: 0
    };
    _this.setWrapperRef = _this.setWrapperRef.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ActionMenuComp, [{
    key: "setWrapperRef",
    value: function setWrapperRef(node) {
      this.wrapperRef = node;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // for better reusability moving out
      this.initialMenuUpdate();
    }
  }, {
    key: "initialMenuUpdate",
    value: function initialMenuUpdate() {
      var pathParam = {};
      var menuPath = (0, _commons.fetchFromLocalStorage)("menuPath");
      pathParam = {
        path: "",
        parentMenu: true
      };
      var url = (0, _get2.default)(window, "location.pathname").split("/").pop();
      if (url !== "inbox" && menuPath) {
        var menupathArray = menuPath && menuPath.split(".");
        if (menupathArray && menupathArray.length > 1) {
          menupathArray.pop();
          pathParam = {
            path: menupathArray.join("."),
            parentMenu: false
          };
        }
      }
      var actionListArr = this.props.actionListArr;


      if (actionListArr) {
        this.menuChange(pathParam);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps && nextProps.activeRoutePath != this.props.activeRoutePath) {
        this.initialMenuUpdate();
        this.setState({
          searchText: ""
        });
      }
    }
  }, {
    key: "changeModulesActions",
    value: function changeModulesActions(modules, items) {
      this.setState({
        modules: modules,
        items: items
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          role = _props.role,
          actionListArr = _props.actionListArr,
          activeRoutePath = _props.activeRoutePath,
          updateActiveRoute = _props.updateActiveRoute,
          toggleDrawer = _props.toggleDrawer,
          menuDrawerOpen = _props.menuDrawerOpen;
      var _state = this.state,
          searchText = _state.searchText,
          path = _state.path,
          menuItems = _state.menuItems;
      var changeLevel = this.changeLevel,
          menuChange = this.menuChange;

      var actionList = actionListArr;
      var menuTitle = path.split(".");
      var activeItmem = localStorage.getItem("menuName");
      var showMenuItem = function showMenuItem() {
        var navigationURL = window.location.href.split("/").pop();
        if (searchText.length == 0) {
          return menuItems.map(function (item, index) {
            var iconLeft = void 0;
            if (item.leftIcon) {
              iconLeft = item.leftIcon.split(":");
            }
            if (!item.url) {
              return _react2.default.createElement(
                "div",
                { className: "sideMenuItem" },
                _react2.default.createElement(_MenuItem2.default, {
                  key: index,
                  innerDivStyle: styles.defaultMenuItemStyle,
                  style: { whiteSpace: "initial" },
                  leftIcon: iconLeft && iconLeft.length == 2 && _react2.default.createElement(_components.Icon, {
                    name: iconLeft[1],
                    action: iconLeft[0],
                    color: "rgba(0, 0, 0, 0.6000000238418579)",
                    style: styles.fibreIconStyle,
                    className: "iconClassHover material-icons whiteColor custom-style-for-" + item.leftIcon.name
                  }),
                  primaryText: _react2.default.createElement(
                    "div",
                    { className: "menuStyle with-childs" },
                    item.name || ""
                  ),
                  rightIcon: _react2.default.createElement(_components.Icon, {
                    name: "chevron-right",
                    action: "navigation",
                    color: "rgba(0, 0, 0, 0.8700000047683716)",
                    className: "iconClassHover material-icons whiteColor menu-right-icon",
                    style: styles.arrowIconStyle
                  }),
                  onClick: function onClick() {
                    var pathParam = {
                      path: !item.path ? item.name : item.path,
                      parentPath: false
                    };
                    toggleDrawer && toggleDrawer();
                    menuChange(pathParam);
                  }
                })
              );
            } else {
              if (item.navigationURL && item.navigationURL !== "newTab") {
                return _react2.default.createElement(
                  _reactRouterDom.Link,
                  {
                    style: { textDecoration: "none" },
                    key: index,
                    to: item.navigationURL === "/" ? "" + item.navigationURL : "/" + item.navigationURL
                  },
                  _react2.default.createElement(
                    "div",
                    { className: "sideMenuItem " + (activeItmem == item.name ? "selected" : "") },
                    _react2.default.createElement(_MenuItem2.default, {
                      innerDivStyle: styles.defaultMenuItemStyle,
                      style: { whiteSpace: "initial" },
                      key: index,
                      onClick: function onClick() {
                        //  localStorage.setItem("menuPath", item.path);
                        updateActiveRoute(item.path, item.name);
                        document.title = item.name;
                        toggleDrawer && toggleDrawer();
                        if (window.location.href.indexOf(item.navigationURL) > 0 && item.navigationURL.startsWith("integration")) {
                          window.location.reload();
                        }
                      },
                      leftIcon: iconLeft && iconLeft.length === 2 && _react2.default.createElement(_components.Icon, {
                        name: iconLeft[1],
                        action: iconLeft[0],
                        color: "rgba(0, 0, 0, 0.6000000238418579)",
                        style: styles.fibreIconStyle,
                        className: "iconClassHover material-icons whiteColor custom-style-for-" + item.leftIcon.name
                      }),
                      primaryText: _react2.default.createElement(
                        "div",
                        { className: "menuStyle" },
                        item.name || ""
                      )
                    })
                  )
                );
              } else {
                return _react2.default.createElement(
                  "a",
                  { href: item.url, target: "_blank" },
                  _react2.default.createElement(
                    "div",
                    { className: "sideMenuItem" },
                    _react2.default.createElement(_MenuItem2.default, {
                      innerDivStyle: styles.defaultMenuItemStyle,
                      style: { whiteSpace: "initial" },
                      key: index,
                      onClick: function onClick() {
                        localStorage.setItem("menuPath", item.path);
                        document.title = item.name;
                      },
                      leftIcon: iconLeft && iconLeft.length === 2 && _react2.default.createElement(_components.Icon, {
                        name: iconLeft[1],
                        action: iconLeft[0],
                        color: "rgba(0, 0, 0, 0.6000000238418579)",
                        style: styles.fibreIconStyle,
                        className: "iconClassHover material-icons whiteColor custom-style-for-" + item.leftIcon.name
                      }),
                      primaryText: _react2.default.createElement(
                        "div",
                        { className: "menuStyle" },
                        item.name || ""
                      )
                    })
                  )
                );
              }
            }
          });
        } else {
          return actionList && actionList.map(function (item, index) {
            var iconLeft = void 0;
            if (item.leftIcon) {
              iconLeft = item.leftIcon.split(":");
            }
            if (item.path && item.url && item.displayName.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
              if (item.navigationURL) {
                return _react2.default.createElement(
                  _reactRouterDom.Link,
                  {
                    style: { textDecoration: "none" },
                    key: index,
                    to: item.navigationURL === "/" ? "" + item.navigationURL : "/" + item.navigationURL
                  },
                  _react2.default.createElement(
                    "div",
                    { className: "sideMenuItem" },
                    _react2.default.createElement(_MenuItem2.default, {
                      innerDivStyle: styles.defaultMenuItemStyle,
                      style: { whiteSpace: "initial" },
                      onClick: function onClick() {
                        document.title = item.displayName;
                        toggleDrawer && toggleDrawer();
                        updateActiveRoute(item.path, item.displayName);
                      },
                      leftIcon: iconLeft && iconLeft.length === 2 && _react2.default.createElement(_components.Icon, {
                        name: iconLeft[1],
                        action: iconLeft[0],
                        color: "rgba(0, 0, 0, 0.6000000238418579)",
                        style: styles.fibreIconStyle,
                        className: "iconClassHover material-icons whiteColor custom-style-for-" + item.leftIcon.name
                      }),
                      primaryText: _react2.default.createElement(
                        "div",
                        { className: "menuStyle" },
                        item.displayName || ""
                      )
                    })
                  )
                );
              }
            }
          });
        }
      };

      return actionList ? _react2.default.createElement(
        "div",
        { ref: this.setWrapperRef },
        _react2.default.createElement("div", { className: "whiteColor" }),
        _react2.default.createElement(
          "div",
          { className: "menu-item-title" },
          menuTitle && menuTitle[menuTitle.length - 1]
        ),
        _react2.default.createElement(
          _Menu2.default,
          {
            disableAutoFocus: true,
            desktop: true,
            autoWidth: false,
            style: { width: "100%" },
            className: "actionMenuMenu",
            menuItemStyle: { paddingLeft: "0", width: "100%" }
          },
          !path && _react2.default.createElement(
            "div",
            {
              onClick: function onClick() {
                toggleDrawer && toggleDrawer();
              }
            },
            _react2.default.createElement(_components.TextFieldIcon, {
              value: searchText,
              hintText: _react2.default.createElement(_translationNode2.default, { label: "PT_SEARCH_BUTTON" }),
              iconStyle: styles.inputIconStyle,
              inputStyle: styles.inputStyle,
              textFieldStyle: styles.textFieldStyle,
              onChange: function onChange(e) {
                _this2.handleChange(e);
              }
            })
          ),
          (path || searchText) && _react2.default.createElement(
            "div",
            {
              className: "pull-left whiteColor pointerCursor",
              onClick: function onClick() {
                toggleDrawer && toggleDrawer();
                changeLevel(path);
              }
            },
            _react2.default.createElement(_components.Icon, { name: "arrow-back", action: "navigation", color: "rgba(0, 0, 0, 0.6000000238418579)" })
          ),
          path && _react2.default.createElement(
            "div",
            {
              className: "pull-right pointerCursor",
              onClick: function onClick() {
                // changeLevel("");
                updateActiveRoute("Home", "Home");
                _this2.changeRoute("/");
              }
            },
            _react2.default.createElement(_components.Icon, { name: "home", action: "action", color: "rgba(0, 0, 0, 0.6000000238418579)" })
          ),
          _react2.default.createElement("div", { className: "clearfix" }),
          _react2.default.createElement(
            "div",
            { style: { paddingLeft: "-24px" } },
            showMenuItem()
          ),
          toggleDrawer ? _react2.default.createElement(
            "div",
            { className: "sideMenuItem drawer-collapse-menu-item" },
            _react2.default.createElement(_MenuItem2.default, {
              innerDivStyle: styles.defaultMenuItemStyle,
              style: { whiteSpace: "initial" },
              onClick: function onClick() {
                toggleDrawer && toggleDrawer(false);
              },
              leftIcon: menuDrawerOpen ? _react2.default.createElement(_ChevronLeft2.default, { style: styles.fibreIconStyle, className: "iconClassHover material-icons whiteColor" }) : _react2.default.createElement(
                _Tooltip2.default,
                { id: "menu-toggle-tooltip", placement: "right", title: _react2.default.createElement(
                    "div",
                    { style: { color: "black" } },
                    "Expand menu"
                  ) },
                _react2.default.createElement(_ChevronRight2.default, { style: styles.fibreIconStyle, className: "iconClassHover material-icons whiteColor" })
              ),
              primaryText: _react2.default.createElement(
                "div",
                { className: "menuStyle" },
                menuDrawerOpen ? "Collapse" : ""
              )
            })
          ) : ""
        )
      ) : null;
    }
  }]);
  return ActionMenuComp;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleToggle: function handleToggle(showMenu) {
      return dispatch({ type: "MENU_TOGGLE", showMenu: showMenu });
    },
    setRoute: function setRoute(route) {
      return dispatch({ type: "SET_ROUTE", route: route });
    }
  };
};
exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(ActionMenuComp);