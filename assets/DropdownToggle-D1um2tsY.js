import { r as reactExports, R as React } from "./index-C-_iGYWo.js";
import { P as PropTypes } from "./index-C6XlOQIa.js";
import { M as ManagerReferenceNodeSetterContext, s as setRef, a as safeInvoke, u as unwrapArray, b as Manager } from "./Popper-Nje4Jlb9.js";
import { c as classNames } from "./index-xoeSAV6i.js";
import { a as DropdownContext } from "./DropdownMenu-BQNQz3tb.js";
import { t as tagPropType, k as keyCodes, o as omit, m as mapToCssModules } from "./utils-BFoSoHid.js";
import { g as getDefaultExportFromCjs } from "./_commonjsHelpers-CcAunmGO.js";
import { B as Button } from "./Button-MsrGxmE9.js";
var warning = function() {
};
var warning_1 = warning;
const warning$1 = /* @__PURE__ */ getDefaultExportFromCjs(warning_1);
function Reference(_ref) {
  var children = _ref.children, innerRef = _ref.innerRef;
  var setReferenceNode = reactExports.useContext(ManagerReferenceNodeSetterContext);
  var refHandler = reactExports.useCallback(function(node) {
    setRef(innerRef, node);
    safeInvoke(setReferenceNode, node);
  }, [innerRef, setReferenceNode]);
  reactExports.useEffect(function() {
    return function() {
      return setRef(innerRef, null);
    };
  }, []);
  reactExports.useEffect(function() {
    warning$1(Boolean(setReferenceNode), "`Reference` should not be used outside of a `Manager` component.");
  }, [setReferenceNode]);
  return unwrapArray(children)({
    ref: refHandler
  });
}
var InputGroupContext = /* @__PURE__ */ React.createContext({});
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$1(obj);
}
var _excluded$1 = ["className", "cssModule", "direction", "isOpen", "group", "size", "nav", "setActiveFromChild", "active", "tag", "menuRole"];
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}
function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$1(o, p);
}
function _createSuper$1(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$1(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$1(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$1(this, result);
  };
}
function _possibleConstructorReturn$1(self, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$1(self);
}
function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$1(o);
}
var propTypes$1 = {
  a11y: PropTypes.bool,
  disabled: PropTypes.bool,
  direction: PropTypes.oneOf(["up", "down", "start", "end", "left", "right"]),
  group: PropTypes.bool,
  isOpen: PropTypes.bool,
  nav: PropTypes.bool,
  active: PropTypes.bool,
  size: PropTypes.string,
  tag: tagPropType,
  toggle: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  dropup: PropTypes.bool,
  inNavbar: PropTypes.bool,
  setActiveFromChild: PropTypes.bool,
  menuRole: PropTypes.oneOf(["listbox", "menu"])
};
var defaultProps$1 = {
  a11y: true,
  isOpen: false,
  direction: "down",
  nav: false,
  active: false,
  inNavbar: false,
  setActiveFromChild: false
};
var preventDefaultKeys = [keyCodes.space, keyCodes.enter, keyCodes.up, keyCodes.down, keyCodes.end, keyCodes.home];
var Dropdown = /* @__PURE__ */ function(_React$Component) {
  _inherits$1(Dropdown2, _React$Component);
  var _super = _createSuper$1(Dropdown2);
  function Dropdown2(props) {
    var _this;
    _classCallCheck$1(this, Dropdown2);
    _this = _super.call(this, props);
    _this.addEvents = _this.addEvents.bind(_assertThisInitialized$1(_this));
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_assertThisInitialized$1(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized$1(_this));
    _this.removeEvents = _this.removeEvents.bind(_assertThisInitialized$1(_this));
    _this.toggle = _this.toggle.bind(_assertThisInitialized$1(_this));
    _this.handleMenuRef = _this.handleMenuRef.bind(_assertThisInitialized$1(_this));
    _this.handleToggleRef = _this.handleToggleRef.bind(_assertThisInitialized$1(_this));
    _this.containerRef = /* @__PURE__ */ React.createRef();
    _this.menuRef = /* @__PURE__ */ React.createRef();
    _this.toggleRef = /* @__PURE__ */ React.createRef();
    return _this;
  }
  _createClass$1(Dropdown2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleProps();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.isOpen !== prevProps.isOpen) {
        this.handleProps();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeEvents();
    }
  }, {
    key: "handleMenuRef",
    value: function handleMenuRef(menuRef) {
      this.menuRef.current = menuRef;
    }
  }, {
    key: "handleToggleRef",
    value: function handleToggleRef(toggleRef) {
      this.toggleRef.current = toggleRef;
    }
  }, {
    key: "handleDocumentClick",
    value: function handleDocumentClick(e) {
      if (e && (e.which === 3 || e.type === "keyup" && e.which !== keyCodes.tab)) return;
      var container = this.getContainer();
      var menu = this.getMenu();
      var toggle = this.getToggle();
      if (!toggle) {
        return;
      }
      var targetIsToggle = toggle.contains(e.target);
      var clickIsInMenu = menu && menu.contains(e.target) && menu !== e.target;
      var clickIsInInput = false;
      if (container) {
        clickIsInInput = container.classList.contains("input-group") && container.classList.contains("dropdown") && e.target.tagName === "INPUT";
      }
      if ((targetIsToggle && !clickIsInInput || clickIsInMenu) && (e.type !== "keyup" || e.which === keyCodes.tab)) {
        return;
      }
      this.toggle(e);
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      var _this2 = this;
      var isTargetMenuItem = e.target.getAttribute("role") === "menuitem" || e.target.getAttribute("role") === "option";
      var isTargetMenuCtrl = this.getMenuCtrl() === e.target;
      var isTab = keyCodes.tab === e.which;
      if (/input|textarea/i.test(e.target.tagName) || isTab && !this.props.a11y || isTab && !(isTargetMenuItem || isTargetMenuCtrl)) {
        return;
      }
      if (preventDefaultKeys.indexOf(e.which) !== -1 || e.which >= 48 && e.which <= 90) {
        e.preventDefault();
      }
      if (this.props.disabled) return;
      if (isTargetMenuCtrl) {
        if ([keyCodes.space, keyCodes.enter, keyCodes.up, keyCodes.down].indexOf(e.which) > -1) {
          if (!this.props.isOpen) {
            this.toggle(e);
          }
          setTimeout(function() {
            var _this2$getMenuItems$;
            return (_this2$getMenuItems$ = _this2.getMenuItems()[0]) === null || _this2$getMenuItems$ === void 0 ? void 0 : _this2$getMenuItems$.focus();
          });
        } else if (this.props.isOpen && isTab) {
          var _this$getMenuItems$;
          e.preventDefault();
          (_this$getMenuItems$ = this.getMenuItems()[0]) === null || _this$getMenuItems$ === void 0 ? void 0 : _this$getMenuItems$.focus();
        } else if (this.props.isOpen && e.which === keyCodes.esc) {
          this.toggle(e);
        }
      }
      if (this.props.isOpen && isTargetMenuItem) {
        if ([keyCodes.tab, keyCodes.esc].indexOf(e.which) > -1) {
          this.toggle(e);
          this.getMenuCtrl().focus();
        } else if ([keyCodes.space, keyCodes.enter].indexOf(e.which) > -1) {
          e.target.click();
          this.getMenuCtrl().focus();
        } else if ([keyCodes.down, keyCodes.up].indexOf(e.which) > -1 || [keyCodes.n, keyCodes.p].indexOf(e.which) > -1 && e.ctrlKey) {
          var $menuitems = this.getMenuItems();
          var index = $menuitems.indexOf(e.target);
          if (keyCodes.up === e.which || keyCodes.p === e.which && e.ctrlKey) {
            index = index !== 0 ? index - 1 : $menuitems.length - 1;
          } else if (keyCodes.down === e.which || keyCodes.n === e.which && e.ctrlKey) {
            index = index === $menuitems.length - 1 ? 0 : index + 1;
          }
          $menuitems[index].focus();
        } else if (keyCodes.end === e.which) {
          var _$menuitems = this.getMenuItems();
          _$menuitems[_$menuitems.length - 1].focus();
        } else if (keyCodes.home === e.which) {
          var _$menuitems2 = this.getMenuItems();
          _$menuitems2[0].focus();
        } else if (e.which >= 48 && e.which <= 90) {
          var _$menuitems3 = this.getMenuItems();
          var charPressed = String.fromCharCode(e.which).toLowerCase();
          for (var i = 0; i < _$menuitems3.length; i += 1) {
            var firstLetter = _$menuitems3[i].textContent && _$menuitems3[i].textContent[0].toLowerCase();
            if (firstLetter === charPressed) {
              _$menuitems3[i].focus();
              break;
            }
          }
        }
      }
    }
  }, {
    key: "handleProps",
    value: function handleProps() {
      if (this.props.isOpen) {
        this.addEvents();
      } else {
        this.removeEvents();
      }
    }
  }, {
    key: "getContextValue",
    value: function getContextValue() {
      return {
        toggle: this.toggle,
        isOpen: this.props.isOpen,
        direction: this.props.direction === "down" && this.props.dropup ? "up" : this.props.direction,
        inNavbar: this.props.inNavbar,
        disabled: this.props.disabled,
        // Callback that should be called by DropdownMenu to provide a ref to
        // a HTML tag that's used for the DropdownMenu
        onMenuRef: this.handleMenuRef,
        onToggleRef: this.handleToggleRef,
        menuRole: this.props.menuRole
      };
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.containerRef.current;
    }
  }, {
    key: "getMenu",
    value: function getMenu() {
      return this.menuRef.current;
    }
  }, {
    key: "getToggle",
    value: function getToggle() {
      return this.toggleRef.current;
    }
  }, {
    key: "getMenuCtrl",
    value: function getMenuCtrl() {
      if (this._$menuCtrl) return this._$menuCtrl;
      this._$menuCtrl = this.getToggle();
      return this._$menuCtrl;
    }
  }, {
    key: "getItemType",
    value: function getItemType() {
      if (this.props.menuRole === "listbox") {
        return "option";
      }
      return "menuitem";
    }
  }, {
    key: "getMenuItems",
    value: function getMenuItems() {
      var menuContainer = this.getMenu() || this.getContainer();
      return [].slice.call(menuContainer.querySelectorAll('[role="'.concat(this.getItemType(), '"]')));
    }
  }, {
    key: "addEvents",
    value: function addEvents() {
      var _this3 = this;
      ["click", "touchstart", "keyup"].forEach(function(event) {
        return document.addEventListener(event, _this3.handleDocumentClick, true);
      });
    }
  }, {
    key: "removeEvents",
    value: function removeEvents() {
      var _this4 = this;
      ["click", "touchstart", "keyup"].forEach(function(event) {
        return document.removeEventListener(event, _this4.handleDocumentClick, true);
      });
    }
  }, {
    key: "toggle",
    value: function toggle(e) {
      if (this.props.disabled) {
        return e && e.preventDefault();
      }
      return this.props.toggle(e);
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames, _this5 = this;
      var _omit = omit(this.props, ["toggle", "disabled", "inNavbar", "a11y"]), className = _omit.className, cssModule = _omit.cssModule, direction = _omit.direction, isOpen = _omit.isOpen, group = _omit.group, size = _omit.size, nav = _omit.nav, setActiveFromChild = _omit.setActiveFromChild, active = _omit.active, tag = _omit.tag;
      _omit.menuRole;
      var attrs = _objectWithoutProperties$1(_omit, _excluded$1);
      var Tag = tag || (nav ? "li" : "div");
      var subItemIsActive = false;
      if (setActiveFromChild) {
        React.Children.map(this.props.children[1].props.children, function(dropdownItem) {
          if (dropdownItem && dropdownItem.props.active) subItemIsActive = true;
        });
      }
      var classes = mapToCssModules(classNames(className, nav && active ? "active" : false, setActiveFromChild && subItemIsActive ? "active" : false, (_classNames = {
        "btn-group": group
      }, _defineProperty$1(_classNames, "btn-group-".concat(size), !!size), _defineProperty$1(_classNames, "dropdown", !group), _defineProperty$1(_classNames, "dropup", direction === "up"), _defineProperty$1(_classNames, "dropstart", direction === "start" || direction === "left"), _defineProperty$1(_classNames, "dropend", direction === "end" || direction === "right"), _defineProperty$1(_classNames, "show", isOpen), _defineProperty$1(_classNames, "nav-item", nav), _classNames)), cssModule);
      if (this.context.insideInputGroup) {
        return /* @__PURE__ */ React.createElement(DropdownContext.Provider, {
          value: this.getContextValue()
        }, /* @__PURE__ */ React.createElement(Manager, null, React.Children.map(this.props.children, function(child) {
          return /* @__PURE__ */ React.cloneElement(child, {
            onKeyDown: _this5.handleKeyDown
          });
        })));
      }
      return /* @__PURE__ */ React.createElement(DropdownContext.Provider, {
        value: this.getContextValue()
      }, /* @__PURE__ */ React.createElement(Manager, null, /* @__PURE__ */ React.createElement(Tag, _extends$1({}, attrs, _defineProperty$1({}, typeof Tag === "string" ? "ref" : "innerRef", this.containerRef), {
        onKeyDown: this.handleKeyDown,
        className: classes
      }))));
    }
  }]);
  return Dropdown2;
}(React.Component);
Dropdown.propTypes = propTypes$1;
Dropdown.defaultProps = defaultProps$1;
Dropdown.contextType = InputGroupContext;
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
var _excluded = ["className", "color", "cssModule", "caret", "split", "nav", "tag", "innerRef"];
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
var propTypes = {
  caret: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  "aria-haspopup": PropTypes.bool,
  split: PropTypes.bool,
  tag: tagPropType,
  nav: PropTypes.bool,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
};
var defaultProps = {
  color: "secondary",
  "aria-haspopup": true
};
var DropdownToggle = /* @__PURE__ */ function(_React$Component) {
  _inherits(DropdownToggle2, _React$Component);
  var _super = _createSuper(DropdownToggle2);
  function DropdownToggle2(props) {
    var _this;
    _classCallCheck(this, DropdownToggle2);
    _this = _super.call(this, props);
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(DropdownToggle2, [{
    key: "onClick",
    value: function onClick(e) {
      if (this.props.disabled || this.context.disabled) {
        e.preventDefault();
        return;
      }
      if (this.props.nav && !this.props.tag) {
        e.preventDefault();
      }
      if (this.props.onClick) {
        this.props.onClick(e);
      }
      this.context.toggle(e);
    }
  }, {
    key: "getRole",
    value: function getRole() {
      return this.context.menuRole || this.props["aria-haspopup"];
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props, className = _this$props.className, color = _this$props.color, cssModule = _this$props.cssModule, caret = _this$props.caret, split = _this$props.split, nav = _this$props.nav, tag = _this$props.tag, innerRef = _this$props.innerRef, props = _objectWithoutProperties(_this$props, _excluded);
      var ariaLabel = props["aria-label"] || "Toggle Dropdown";
      var classes = mapToCssModules(classNames(className, {
        "dropdown-toggle": caret || split,
        "dropdown-toggle-split": split,
        "nav-link": nav
      }), cssModule);
      var children = typeof props.children !== "undefined" ? props.children : /* @__PURE__ */ React.createElement("span", {
        className: "visually-hidden"
      }, ariaLabel);
      var Tag;
      if (nav && !tag) {
        Tag = "a";
        props.href = "#";
      } else if (!tag) {
        Tag = Button;
        props.color = color;
        props.cssModule = cssModule;
      } else {
        Tag = tag;
      }
      var returnFunction = function returnFunction2(_ref) {
        var ref = _ref.ref;
        var handleRef = function handleRef2(tagRef) {
          ref(tagRef);
          var onToggleRef = _this2.context.onToggleRef;
          if (onToggleRef) onToggleRef(tagRef);
        };
        return /* @__PURE__ */ React.createElement(Tag, _extends({}, props, _defineProperty({}, typeof Tag === "string" ? "ref" : "innerRef", handleRef), {
          className: classes,
          onClick: _this2.onClick,
          "aria-expanded": _this2.context.isOpen,
          "aria-haspopup": _this2.getRole(),
          children
        }));
      };
      if (this.context.inNavbar) {
        return /* @__PURE__ */ React.createElement(React.Fragment, null, returnFunction({
          ref: this.context.onToggleRef
        }));
      }
      return /* @__PURE__ */ React.createElement(Reference, {
        innerRef
      }, returnFunction);
    }
  }]);
  return DropdownToggle2;
}(React.Component);
DropdownToggle.propTypes = propTypes;
DropdownToggle.defaultProps = defaultProps;
DropdownToggle.contextType = DropdownContext;
export {
  Dropdown as D,
  DropdownToggle as a
};
