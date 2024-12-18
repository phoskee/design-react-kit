var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const { once: once$1 } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
const { FORCE_REMOUNT, STORY_RENDER_PHASE_CHANGED, SET_CURRENT_STORY } = __STORYBOOK_MODULE_CORE_EVENTS__;
const { addons } = __STORYBOOK_MODULE_PREVIEW_API__;
const { global: global$2 } = __STORYBOOK_MODULE_GLOBAL__;
var __require$1 = ((x2) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(x2, { get: (a2, b) => (typeof require < "u" ? require : a2)[b] }) : x2)(function(x2) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});
var f$1 = { reset: [0, 0], bold: [1, 22, "\x1B[22m\x1B[1m"], dim: [2, 22, "\x1B[22m\x1B[2m"], italic: [3, 23], underline: [4, 24], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29], black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], gray: [90, 39], bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], blackBright: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39], bgBlackBright: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] }, h$1 = Object.entries(f$1);
function a$1(n) {
  return String(n);
}
a$1.open = "";
a$1.close = "";
function C$1(n = false) {
  let e = typeof process < "u" ? process : void 0, i = (e == null ? void 0 : e.env) || {}, g3 = (e == null ? void 0 : e.argv) || [];
  return !("NO_COLOR" in i || g3.includes("--no-color")) && ("FORCE_COLOR" in i || g3.includes("--color") || (e == null ? void 0 : e.platform) === "win32" || n && i.TERM !== "dumb" || "CI" in i) || typeof window < "u" && !!window.chrome;
}
function p$1(n = false) {
  let e = C$1(n), i = (r, t, c, o) => {
    let l = "", s = 0;
    do
      l += r.substring(s, o) + c, s = o + t.length, o = r.indexOf(t, s);
    while (~o);
    return l + r.substring(s);
  }, g3 = (r, t, c = r) => {
    let o = (l) => {
      let s = String(l), b = s.indexOf(t, r.length);
      return ~b ? r + i(s, t, c, b) + t : r + s + t;
    };
    return o.open = r, o.close = t, o;
  }, u2 = { isColorSupported: e }, d2 = (r) => `\x1B[${r}m`;
  for (let [r, t] of h$1) u2[r] = e ? g3(d2(t[0]), d2(t[1]), t[2]) : a$1;
  return u2;
}
var f2$1 = p$1(false);
function getKeysOfEnumerableProperties$1(object, compareKeys) {
  let rawKeys = Object.keys(object), keys2 = compareKeys === null ? rawKeys : rawKeys.sort(compareKeys);
  if (Object.getOwnPropertySymbols) for (let symbol of Object.getOwnPropertySymbols(object)) Object.getOwnPropertyDescriptor(object, symbol).enumerable && keys2.push(symbol);
  return keys2;
}
function printIteratorEntries$1(iterator, config3, indentation, depth, refs, printer2, separator = ": ") {
  let result = "", width = 0, current = iterator.next();
  if (!current.done) {
    result += config3.spacingOuter;
    let indentationNext = indentation + config3.indent;
    for (; !current.done; ) {
      if (result += indentationNext, width++ === config3.maxWidth) {
        result += "…";
        break;
      }
      let name = printer2(current.value[0], config3, indentationNext, depth, refs), value = printer2(current.value[1], config3, indentationNext, depth, refs);
      result += name + separator + value, current = iterator.next(), current.done ? config3.min || (result += ",") : result += `,${config3.spacingInner}`;
    }
    result += config3.spacingOuter + indentation;
  }
  return result;
}
function printIteratorValues$1(iterator, config3, indentation, depth, refs, printer2) {
  let result = "", width = 0, current = iterator.next();
  if (!current.done) {
    result += config3.spacingOuter;
    let indentationNext = indentation + config3.indent;
    for (; !current.done; ) {
      if (result += indentationNext, width++ === config3.maxWidth) {
        result += "…";
        break;
      }
      result += printer2(current.value, config3, indentationNext, depth, refs), current = iterator.next(), current.done ? config3.min || (result += ",") : result += `,${config3.spacingInner}`;
    }
    result += config3.spacingOuter + indentation;
  }
  return result;
}
function printListItems$1(list, config3, indentation, depth, refs, printer2) {
  let result = "";
  list = list instanceof ArrayBuffer ? new DataView(list) : list;
  let isDataView = (l) => l instanceof DataView, length = isDataView(list) ? list.byteLength : list.length;
  if (length > 0) {
    result += config3.spacingOuter;
    let indentationNext = indentation + config3.indent;
    for (let i = 0; i < length; i++) {
      if (result += indentationNext, i === config3.maxWidth) {
        result += "…";
        break;
      }
      (isDataView(list) || i in list) && (result += printer2(isDataView(list) ? list.getInt8(i) : list[i], config3, indentationNext, depth, refs)), i < length - 1 ? result += `,${config3.spacingInner}` : config3.min || (result += ",");
    }
    result += config3.spacingOuter + indentation;
  }
  return result;
}
function printObjectProperties$1(val, config3, indentation, depth, refs, printer2) {
  let result = "", keys2 = getKeysOfEnumerableProperties$1(val, config3.compareKeys);
  if (keys2.length > 0) {
    result += config3.spacingOuter;
    let indentationNext = indentation + config3.indent;
    for (let i = 0; i < keys2.length; i++) {
      let key = keys2[i], name = printer2(key, config3, indentationNext, depth, refs), value = printer2(val[key], config3, indentationNext, depth, refs);
      result += `${indentationNext + name}: ${value}`, i < keys2.length - 1 ? result += `,${config3.spacingInner}` : config3.min || (result += ",");
    }
    result += config3.spacingOuter + indentation;
  }
  return result;
}
var asymmetricMatcher$1 = typeof Symbol == "function" && Symbol.for ? Symbol.for("jest.asymmetricMatcher") : 1267621, SPACE$2$1 = " ", serialize$5$1 = (val, config3, indentation, depth, refs, printer2) => {
  let stringedValue = val.toString();
  if (stringedValue === "ArrayContaining" || stringedValue === "ArrayNotContaining") return ++depth > config3.maxDepth ? `[${stringedValue}]` : `${stringedValue + SPACE$2$1}[${printListItems$1(val.sample, config3, indentation, depth, refs, printer2)}]`;
  if (stringedValue === "ObjectContaining" || stringedValue === "ObjectNotContaining") return ++depth > config3.maxDepth ? `[${stringedValue}]` : `${stringedValue + SPACE$2$1}{${printObjectProperties$1(val.sample, config3, indentation, depth, refs, printer2)}}`;
  if (stringedValue === "StringMatching" || stringedValue === "StringNotMatching" || stringedValue === "StringContaining" || stringedValue === "StringNotContaining") return stringedValue + SPACE$2$1 + printer2(val.sample, config3, indentation, depth, refs);
  if (typeof val.toAsymmetricMatcher != "function") throw new TypeError(`Asymmetric matcher ${val.constructor.name} does not implement toAsymmetricMatcher()`);
  return val.toAsymmetricMatcher();
}, test$5$1 = (val) => val && val.$$typeof === asymmetricMatcher$1, plugin$5$1 = { serialize: serialize$5$1, test: test$5$1 }, SPACE$1$1 = " ", OBJECT_NAMES$1 = /* @__PURE__ */ new Set(["DOMStringMap", "NamedNodeMap"]), ARRAY_REGEXP$1 = /^(?:HTML\w*Collection|NodeList)$/;
function testName$1(name) {
  return OBJECT_NAMES$1.has(name) || ARRAY_REGEXP$1.test(name);
}
var test$4$1 = (val) => val && val.constructor && !!val.constructor.name && testName$1(val.constructor.name);
function isNamedNodeMap$1(collection) {
  return collection.constructor.name === "NamedNodeMap";
}
var serialize$4$1 = (collection, config3, indentation, depth, refs, printer2) => {
  let name = collection.constructor.name;
  return ++depth > config3.maxDepth ? `[${name}]` : (config3.min ? "" : name + SPACE$1$1) + (OBJECT_NAMES$1.has(name) ? `{${printObjectProperties$1(isNamedNodeMap$1(collection) ? [...collection].reduce((props, attribute) => (props[attribute.name] = attribute.value, props), {}) : { ...collection }, config3, indentation, depth, refs, printer2)}}` : `[${printListItems$1([...collection], config3, indentation, depth, refs, printer2)}]`);
}, plugin$4$1 = { serialize: serialize$4$1, test: test$4$1 };
function escapeHTML$1(str) {
  return str.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function printProps$1(keys2, props, config3, indentation, depth, refs, printer2) {
  let indentationNext = indentation + config3.indent, colors = config3.colors;
  return keys2.map((key) => {
    let value = props[key], printed = printer2(value, config3, indentationNext, depth, refs);
    return typeof value != "string" && (printed.includes(`
`) && (printed = config3.spacingOuter + indentationNext + printed + config3.spacingOuter + indentation), printed = `{${printed}}`), `${config3.spacingInner + indentation + colors.prop.open + key + colors.prop.close}=${colors.value.open}${printed}${colors.value.close}`;
  }).join("");
}
function printChildren$1(children, config3, indentation, depth, refs, printer2) {
  return children.map((child) => config3.spacingOuter + indentation + (typeof child == "string" ? printText$1(child, config3) : printer2(child, config3, indentation, depth, refs))).join("");
}
function printText$1(text, config3) {
  let contentColor = config3.colors.content;
  return contentColor.open + escapeHTML$1(text) + contentColor.close;
}
function printComment$1(comment, config3) {
  let commentColor = config3.colors.comment;
  return `${commentColor.open}<!--${escapeHTML$1(comment)}-->${commentColor.close}`;
}
function printElement$1(type5, printedProps, printedChildren, config3, indentation) {
  let tagColor = config3.colors.tag;
  return `${tagColor.open}<${type5}${printedProps && tagColor.close + printedProps + config3.spacingOuter + indentation + tagColor.open}${printedChildren ? `>${tagColor.close}${printedChildren}${config3.spacingOuter}${indentation}${tagColor.open}</${type5}` : `${printedProps && !config3.min ? "" : " "}/`}>${tagColor.close}`;
}
function printElementAsLeaf$1(type5, config3) {
  let tagColor = config3.colors.tag;
  return `${tagColor.open}<${type5}${tagColor.close} …${tagColor.open} />${tagColor.close}`;
}
var ELEMENT_NODE$2 = 1, TEXT_NODE$2 = 3, COMMENT_NODE$2 = 8, FRAGMENT_NODE$1 = 11, ELEMENT_REGEXP$1 = /^(?:(?:HTML|SVG)\w*)?Element$/;
function testHasAttribute$1(val) {
  try {
    return typeof val.hasAttribute == "function" && val.hasAttribute("is");
  } catch {
    return false;
  }
}
function testNode$1(val) {
  let constructorName = val.constructor.name, { nodeType, tagName } = val, isCustomElement3 = typeof tagName == "string" && tagName.includes("-") || testHasAttribute$1(val);
  return nodeType === ELEMENT_NODE$2 && (ELEMENT_REGEXP$1.test(constructorName) || isCustomElement3) || nodeType === TEXT_NODE$2 && constructorName === "Text" || nodeType === COMMENT_NODE$2 && constructorName === "Comment" || nodeType === FRAGMENT_NODE$1 && constructorName === "DocumentFragment";
}
var test$3$1 = (val) => {
  var _a2;
  return ((_a2 = val == null ? void 0 : val.constructor) == null ? void 0 : _a2.name) && testNode$1(val);
};
function nodeIsText$1(node) {
  return node.nodeType === TEXT_NODE$2;
}
function nodeIsComment$1(node) {
  return node.nodeType === COMMENT_NODE$2;
}
function nodeIsFragment$1(node) {
  return node.nodeType === FRAGMENT_NODE$1;
}
var serialize$3$1 = (node, config3, indentation, depth, refs, printer2) => {
  if (nodeIsText$1(node)) return printText$1(node.data, config3);
  if (nodeIsComment$1(node)) return printComment$1(node.data, config3);
  let type5 = nodeIsFragment$1(node) ? "DocumentFragment" : node.tagName.toLowerCase();
  return ++depth > config3.maxDepth ? printElementAsLeaf$1(type5, config3) : printElement$1(type5, printProps$1(nodeIsFragment$1(node) ? [] : Array.from(node.attributes, (attr) => attr.name).sort(), nodeIsFragment$1(node) ? {} : [...node.attributes].reduce((props, attribute) => (props[attribute.name] = attribute.value, props), {}), config3, indentation + config3.indent, depth, refs, printer2), printChildren$1(Array.prototype.slice.call(node.childNodes || node.children), config3, indentation + config3.indent, depth, refs, printer2), config3, indentation);
}, plugin$3$1 = { serialize: serialize$3$1, test: test$3$1 }, IS_ITERABLE_SENTINEL$1 = "@@__IMMUTABLE_ITERABLE__@@", IS_LIST_SENTINEL$1 = "@@__IMMUTABLE_LIST__@@", IS_KEYED_SENTINEL$1 = "@@__IMMUTABLE_KEYED__@@", IS_MAP_SENTINEL$1 = "@@__IMMUTABLE_MAP__@@", IS_ORDERED_SENTINEL$1 = "@@__IMMUTABLE_ORDERED__@@", IS_RECORD_SENTINEL$1 = "@@__IMMUTABLE_RECORD__@@", IS_SEQ_SENTINEL$1 = "@@__IMMUTABLE_SEQ__@@", IS_SET_SENTINEL$1 = "@@__IMMUTABLE_SET__@@", IS_STACK_SENTINEL$1 = "@@__IMMUTABLE_STACK__@@", getImmutableName$1 = (name) => `Immutable.${name}`, printAsLeaf$1 = (name) => `[${name}]`, SPACE$3 = " ", LAZY$1 = "…";
function printImmutableEntries$1(val, config3, indentation, depth, refs, printer2, type5) {
  return ++depth > config3.maxDepth ? printAsLeaf$1(getImmutableName$1(type5)) : `${getImmutableName$1(type5) + SPACE$3}{${printIteratorEntries$1(val.entries(), config3, indentation, depth, refs, printer2)}}`;
}
function getRecordEntries$1(val) {
  let i = 0;
  return { next() {
    if (i < val._keys.length) {
      let key = val._keys[i++];
      return { done: false, value: [key, val.get(key)] };
    }
    return { done: true, value: void 0 };
  } };
}
function printImmutableRecord$1(val, config3, indentation, depth, refs, printer2) {
  let name = getImmutableName$1(val._name || "Record");
  return ++depth > config3.maxDepth ? printAsLeaf$1(name) : `${name + SPACE$3}{${printIteratorEntries$1(getRecordEntries$1(val), config3, indentation, depth, refs, printer2)}}`;
}
function printImmutableSeq$1(val, config3, indentation, depth, refs, printer2) {
  let name = getImmutableName$1("Seq");
  return ++depth > config3.maxDepth ? printAsLeaf$1(name) : val[IS_KEYED_SENTINEL$1] ? `${name + SPACE$3}{${val._iter || val._object ? printIteratorEntries$1(val.entries(), config3, indentation, depth, refs, printer2) : LAZY$1}}` : `${name + SPACE$3}[${val._iter || val._array || val._collection || val._iterable ? printIteratorValues$1(val.values(), config3, indentation, depth, refs, printer2) : LAZY$1}]`;
}
function printImmutableValues$1(val, config3, indentation, depth, refs, printer2, type5) {
  return ++depth > config3.maxDepth ? printAsLeaf$1(getImmutableName$1(type5)) : `${getImmutableName$1(type5) + SPACE$3}[${printIteratorValues$1(val.values(), config3, indentation, depth, refs, printer2)}]`;
}
var serialize$2$1 = (val, config3, indentation, depth, refs, printer2) => val[IS_MAP_SENTINEL$1] ? printImmutableEntries$1(val, config3, indentation, depth, refs, printer2, val[IS_ORDERED_SENTINEL$1] ? "OrderedMap" : "Map") : val[IS_LIST_SENTINEL$1] ? printImmutableValues$1(val, config3, indentation, depth, refs, printer2, "List") : val[IS_SET_SENTINEL$1] ? printImmutableValues$1(val, config3, indentation, depth, refs, printer2, val[IS_ORDERED_SENTINEL$1] ? "OrderedSet" : "Set") : val[IS_STACK_SENTINEL$1] ? printImmutableValues$1(val, config3, indentation, depth, refs, printer2, "Stack") : val[IS_SEQ_SENTINEL$1] ? printImmutableSeq$1(val, config3, indentation, depth, refs, printer2) : printImmutableRecord$1(val, config3, indentation, depth, refs, printer2), test$2$1 = (val) => val && (val[IS_ITERABLE_SENTINEL$1] === true || val[IS_RECORD_SENTINEL$1] === true), plugin$2$1 = { serialize: serialize$2$1, test: test$2$1 }, reactIs$1 = { exports: {} };
var reactIs_development$1 = {};
var hasRequiredReactIs_development$1;
function requireReactIs_development$1() {
  return hasRequiredReactIs_development$1 || (hasRequiredReactIs_development$1 = 1, function() {
    var REACT_ELEMENT_TYPE = Symbol.for("react.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_PROVIDER_TYPE = Symbol.for("react.provider"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_SERVER_CONTEXT_TYPE = Symbol.for("react.server_context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"), enableScopeAPI = false, enableCacheElement = false, enableTransitionTracing = false, enableLegacyHidden = false, enableDebugTracing = false, REACT_MODULE_REFERENCE;
    REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
    function isValidElementType(type5) {
      return !!(typeof type5 == "string" || typeof type5 == "function" || type5 === REACT_FRAGMENT_TYPE || type5 === REACT_PROFILER_TYPE || enableDebugTracing || type5 === REACT_STRICT_MODE_TYPE || type5 === REACT_SUSPENSE_TYPE || type5 === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type5 === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing || typeof type5 == "object" && type5 !== null && (type5.$$typeof === REACT_LAZY_TYPE || type5.$$typeof === REACT_MEMO_TYPE || type5.$$typeof === REACT_PROVIDER_TYPE || type5.$$typeof === REACT_CONTEXT_TYPE || type5.$$typeof === REACT_FORWARD_REF_TYPE || type5.$$typeof === REACT_MODULE_REFERENCE || type5.getModuleId !== void 0));
    }
    function typeOf(object) {
      if (typeof object == "object" && object !== null) {
        var $$typeof = object.$$typeof;
        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type5 = object.type;
            switch (type5) {
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
              case REACT_SUSPENSE_LIST_TYPE:
                return type5;
              default:
                var $$typeofType = type5 && type5.$$typeof;
                switch ($$typeofType) {
                  case REACT_SERVER_CONTEXT_TYPE:
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;
                  default:
                    return $$typeof;
                }
            }
          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }
    }
    var ContextConsumer = REACT_CONTEXT_TYPE, ContextProvider = REACT_PROVIDER_TYPE, Element2 = REACT_ELEMENT_TYPE, ForwardRef = REACT_FORWARD_REF_TYPE, Fragment = REACT_FRAGMENT_TYPE, Lazy = REACT_LAZY_TYPE, Memo = REACT_MEMO_TYPE, Portal = REACT_PORTAL_TYPE, Profiler = REACT_PROFILER_TYPE, StrictMode = REACT_STRICT_MODE_TYPE, Suspense = REACT_SUSPENSE_TYPE, SuspenseList = REACT_SUSPENSE_LIST_TYPE, hasWarnedAboutDeprecatedIsAsyncMode = false, hasWarnedAboutDeprecatedIsConcurrentMode = false;
    function isAsyncMode(object) {
      return hasWarnedAboutDeprecatedIsAsyncMode || (hasWarnedAboutDeprecatedIsAsyncMode = true, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), false;
    }
    function isConcurrentMode(object) {
      return hasWarnedAboutDeprecatedIsConcurrentMode || (hasWarnedAboutDeprecatedIsConcurrentMode = true, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), false;
    }
    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }
    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }
    function isElement5(object) {
      return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }
    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }
    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }
    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }
    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }
    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }
    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }
    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }
    function isSuspenseList(object) {
      return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
    }
    reactIs_development$1.ContextConsumer = ContextConsumer, reactIs_development$1.ContextProvider = ContextProvider, reactIs_development$1.Element = Element2, reactIs_development$1.ForwardRef = ForwardRef, reactIs_development$1.Fragment = Fragment, reactIs_development$1.Lazy = Lazy, reactIs_development$1.Memo = Memo, reactIs_development$1.Portal = Portal, reactIs_development$1.Profiler = Profiler, reactIs_development$1.StrictMode = StrictMode, reactIs_development$1.Suspense = Suspense, reactIs_development$1.SuspenseList = SuspenseList, reactIs_development$1.isAsyncMode = isAsyncMode, reactIs_development$1.isConcurrentMode = isConcurrentMode, reactIs_development$1.isContextConsumer = isContextConsumer, reactIs_development$1.isContextProvider = isContextProvider, reactIs_development$1.isElement = isElement5, reactIs_development$1.isForwardRef = isForwardRef, reactIs_development$1.isFragment = isFragment, reactIs_development$1.isLazy = isLazy, reactIs_development$1.isMemo = isMemo, reactIs_development$1.isPortal = isPortal, reactIs_development$1.isProfiler = isProfiler, reactIs_development$1.isStrictMode = isStrictMode, reactIs_development$1.isSuspense = isSuspense, reactIs_development$1.isSuspenseList = isSuspenseList, reactIs_development$1.isValidElementType = isValidElementType, reactIs_development$1.typeOf = typeOf;
  }()), reactIs_development$1;
}
var hasRequiredReactIs;
function requireReactIs() {
  return hasRequiredReactIs || (hasRequiredReactIs = 1, reactIs$1.exports = requireReactIs_development$1()), reactIs$1.exports;
}
var reactIsExports$1 = requireReactIs();
function getChildren$1(arg, children = []) {
  if (Array.isArray(arg)) for (let item of arg) getChildren$1(item, children);
  else arg != null && arg !== false && arg !== "" && children.push(arg);
  return children;
}
function getType$1(element) {
  let type5 = element.type;
  if (typeof type5 == "string") return type5;
  if (typeof type5 == "function") return type5.displayName || type5.name || "Unknown";
  if (reactIsExports$1.isFragment(element)) return "React.Fragment";
  if (reactIsExports$1.isSuspense(element)) return "React.Suspense";
  if (typeof type5 == "object" && type5 !== null) {
    if (reactIsExports$1.isContextProvider(element)) return "Context.Provider";
    if (reactIsExports$1.isContextConsumer(element)) return "Context.Consumer";
    if (reactIsExports$1.isForwardRef(element)) {
      if (type5.displayName) return type5.displayName;
      let functionName = type5.render.displayName || type5.render.name || "";
      return functionName === "" ? "ForwardRef" : `ForwardRef(${functionName})`;
    }
    if (reactIsExports$1.isMemo(element)) {
      let functionName = type5.displayName || type5.type.displayName || type5.type.name || "";
      return functionName === "" ? "Memo" : `Memo(${functionName})`;
    }
  }
  return "UNDEFINED";
}
function getPropKeys$1$1(element) {
  let { props } = element;
  return Object.keys(props).filter((key) => key !== "children" && props[key] !== void 0).sort();
}
var serialize$1$1 = (element, config3, indentation, depth, refs, printer2) => ++depth > config3.maxDepth ? printElementAsLeaf$1(getType$1(element), config3) : printElement$1(getType$1(element), printProps$1(getPropKeys$1$1(element), element.props, config3, indentation + config3.indent, depth, refs, printer2), printChildren$1(getChildren$1(element.props.children), config3, indentation + config3.indent, depth, refs, printer2), config3, indentation), test$1$1 = (val) => val != null && reactIsExports$1.isElement(val), plugin$1$1 = { serialize: serialize$1$1, test: test$1$1 }, testSymbol$1 = typeof Symbol == "function" && Symbol.for ? Symbol.for("react.test.json") : 245830487;
function getPropKeys$2(object) {
  let { props } = object;
  return props ? Object.keys(props).filter((key) => props[key] !== void 0).sort() : [];
}
var serialize$6 = (object, config3, indentation, depth, refs, printer2) => ++depth > config3.maxDepth ? printElementAsLeaf$1(object.type, config3) : printElement$1(object.type, object.props ? printProps$1(getPropKeys$2(object), object.props, config3, indentation + config3.indent, depth, refs, printer2) : "", object.children ? printChildren$1(object.children, config3, indentation + config3.indent, depth, refs, printer2) : "", config3, indentation), test$6 = (val) => val && val.$$typeof === testSymbol$1, plugin$6 = { serialize: serialize$6, test: test$6 }, toString$1 = Object.prototype.toString, toISOString$1 = Date.prototype.toISOString, errorToString$1 = Error.prototype.toString, regExpToString$1 = RegExp.prototype.toString;
function getConstructorName$1(val) {
  return typeof val.constructor == "function" && val.constructor.name || "Object";
}
function isWindow$1(val) {
  return typeof window < "u" && val === window;
}
var SYMBOL_REGEXP$1 = /^Symbol\((.*)\)(.*)$/, NEWLINE_REGEXP$1 = /\n/g, PrettyFormatPluginError$1 = class PrettyFormatPluginError extends Error {
  constructor(message, stack) {
    super(message), this.stack = stack, this.name = this.constructor.name;
  }
};
function isToStringedArrayType$1(toStringed) {
  return toStringed === "[object Array]" || toStringed === "[object ArrayBuffer]" || toStringed === "[object DataView]" || toStringed === "[object Float32Array]" || toStringed === "[object Float64Array]" || toStringed === "[object Int8Array]" || toStringed === "[object Int16Array]" || toStringed === "[object Int32Array]" || toStringed === "[object Uint8Array]" || toStringed === "[object Uint8ClampedArray]" || toStringed === "[object Uint16Array]" || toStringed === "[object Uint32Array]";
}
function printNumber$1(val) {
  return Object.is(val, -0) ? "-0" : String(val);
}
function printBigInt$1(val) {
  return `${val}n`;
}
function printFunction$1(val, printFunctionName) {
  return printFunctionName ? `[Function ${val.name || "anonymous"}]` : "[Function]";
}
function printSymbol$1(val) {
  return String(val).replace(SYMBOL_REGEXP$1, "Symbol($1)");
}
function printError$1(val) {
  return `[${errorToString$1.call(val)}]`;
}
function printBasicValue$1(val, printFunctionName, escapeRegex, escapeString) {
  if (val === true || val === false) return `${val}`;
  if (val === void 0) return "undefined";
  if (val === null) return "null";
  let typeOf = typeof val;
  if (typeOf === "number") return printNumber$1(val);
  if (typeOf === "bigint") return printBigInt$1(val);
  if (typeOf === "string") return escapeString ? `"${val.replaceAll(/"|\\/g, "\\$&")}"` : `"${val}"`;
  if (typeOf === "function") return printFunction$1(val, printFunctionName);
  if (typeOf === "symbol") return printSymbol$1(val);
  let toStringed = toString$1.call(val);
  return toStringed === "[object WeakMap]" ? "WeakMap {}" : toStringed === "[object WeakSet]" ? "WeakSet {}" : toStringed === "[object Function]" || toStringed === "[object GeneratorFunction]" ? printFunction$1(val, printFunctionName) : toStringed === "[object Symbol]" ? printSymbol$1(val) : toStringed === "[object Date]" ? Number.isNaN(+val) ? "Date { NaN }" : toISOString$1.call(val) : toStringed === "[object Error]" ? printError$1(val) : toStringed === "[object RegExp]" ? escapeRegex ? regExpToString$1.call(val).replaceAll(/[$()*+.?[\\\]^{|}]/g, "\\$&") : regExpToString$1.call(val) : val instanceof Error ? printError$1(val) : null;
}
function printComplexValue$1(val, config3, indentation, depth, refs, hasCalledToJSON) {
  if (refs.includes(val)) return "[Circular]";
  refs = [...refs], refs.push(val);
  let hitMaxDepth = ++depth > config3.maxDepth, min = config3.min;
  if (config3.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON == "function" && !hasCalledToJSON) return printer$1(val.toJSON(), config3, indentation, depth, refs, true);
  let toStringed = toString$1.call(val);
  return toStringed === "[object Arguments]" ? hitMaxDepth ? "[Arguments]" : `${min ? "" : "Arguments "}[${printListItems$1(val, config3, indentation, depth, refs, printer$1)}]` : isToStringedArrayType$1(toStringed) ? hitMaxDepth ? `[${val.constructor.name}]` : `${min || !config3.printBasicPrototype && val.constructor.name === "Array" ? "" : `${val.constructor.name} `}[${printListItems$1(val, config3, indentation, depth, refs, printer$1)}]` : toStringed === "[object Map]" ? hitMaxDepth ? "[Map]" : `Map {${printIteratorEntries$1(val.entries(), config3, indentation, depth, refs, printer$1, " => ")}}` : toStringed === "[object Set]" ? hitMaxDepth ? "[Set]" : `Set {${printIteratorValues$1(val.values(), config3, indentation, depth, refs, printer$1)}}` : hitMaxDepth || isWindow$1(val) ? `[${getConstructorName$1(val)}]` : `${min || !config3.printBasicPrototype && getConstructorName$1(val) === "Object" ? "" : `${getConstructorName$1(val)} `}{${printObjectProperties$1(val, config3, indentation, depth, refs, printer$1)}}`;
}
function isNewPlugin$1(plugin2) {
  return plugin2.serialize != null;
}
function printPlugin$1(plugin2, val, config3, indentation, depth, refs) {
  let printed;
  try {
    printed = isNewPlugin$1(plugin2) ? plugin2.serialize(val, config3, indentation, depth, refs, printer$1) : plugin2.print(val, (valChild) => printer$1(valChild, config3, indentation, depth, refs), (str) => {
      let indentationNext = indentation + config3.indent;
      return indentationNext + str.replaceAll(NEWLINE_REGEXP$1, `
${indentationNext}`);
    }, { edgeSpacing: config3.spacingOuter, min: config3.min, spacing: config3.spacingInner }, config3.colors);
  } catch (error) {
    throw new PrettyFormatPluginError$1(error.message, error.stack);
  }
  if (typeof printed != "string") throw new TypeError(`pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`);
  return printed;
}
function findPlugin$1(plugins2, val) {
  for (let plugin2 of plugins2) try {
    if (plugin2.test(val)) return plugin2;
  } catch (error) {
    throw new PrettyFormatPluginError$1(error.message, error.stack);
  }
  return null;
}
function printer$1(val, config3, indentation, depth, refs, hasCalledToJSON) {
  let plugin2 = findPlugin$1(config3.plugins, val);
  if (plugin2 !== null) return printPlugin$1(plugin2, val, config3, indentation, depth, refs);
  let basicResult = printBasicValue$1(val, config3.printFunctionName, config3.escapeRegex, config3.escapeString);
  return basicResult !== null ? basicResult : printComplexValue$1(val, config3, indentation, depth, refs, hasCalledToJSON);
}
var DEFAULT_THEME$1 = { comment: "gray", content: "reset", prop: "yellow", tag: "cyan", value: "green" }, DEFAULT_THEME_KEYS$1 = Object.keys(DEFAULT_THEME$1), DEFAULT_OPTIONS$1 = { callToJSON: true, compareKeys: void 0, escapeRegex: false, escapeString: true, highlight: false, indent: 2, maxDepth: Number.POSITIVE_INFINITY, maxWidth: Number.POSITIVE_INFINITY, min: false, plugins: [], printBasicPrototype: true, printFunctionName: true, theme: DEFAULT_THEME$1 };
function validateOptions$1(options) {
  for (let key of Object.keys(options)) if (!Object.prototype.hasOwnProperty.call(DEFAULT_OPTIONS$1, key)) throw new Error(`pretty-format: Unknown option "${key}".`);
  if (options.min && options.indent !== void 0 && options.indent !== 0) throw new Error('pretty-format: Options "min" and "indent" cannot be used together.');
}
function getColorsHighlight$1() {
  return DEFAULT_THEME_KEYS$1.reduce((colors, key) => {
    let value = DEFAULT_THEME$1[key], color = value && f2$1[value];
    if (color && typeof color.close == "string" && typeof color.open == "string") colors[key] = color;
    else throw new Error(`pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`);
    return colors;
  }, /* @__PURE__ */ Object.create(null));
}
function getColorsEmpty$1() {
  return DEFAULT_THEME_KEYS$1.reduce((colors, key) => (colors[key] = { close: "", open: "" }, colors), /* @__PURE__ */ Object.create(null));
}
function getPrintFunctionName$1(options) {
  return (options == null ? void 0 : options.printFunctionName) ?? DEFAULT_OPTIONS$1.printFunctionName;
}
function getEscapeRegex$1(options) {
  return (options == null ? void 0 : options.escapeRegex) ?? DEFAULT_OPTIONS$1.escapeRegex;
}
function getEscapeString$1(options) {
  return (options == null ? void 0 : options.escapeString) ?? DEFAULT_OPTIONS$1.escapeString;
}
function getConfig$1(options) {
  return { callToJSON: (options == null ? void 0 : options.callToJSON) ?? DEFAULT_OPTIONS$1.callToJSON, colors: (options == null ? void 0 : options.highlight) ? getColorsHighlight$1() : getColorsEmpty$1(), compareKeys: typeof (options == null ? void 0 : options.compareKeys) == "function" || (options == null ? void 0 : options.compareKeys) === null ? options.compareKeys : DEFAULT_OPTIONS$1.compareKeys, escapeRegex: getEscapeRegex$1(options), escapeString: getEscapeString$1(options), indent: (options == null ? void 0 : options.min) ? "" : createIndent$1((options == null ? void 0 : options.indent) ?? DEFAULT_OPTIONS$1.indent), maxDepth: (options == null ? void 0 : options.maxDepth) ?? DEFAULT_OPTIONS$1.maxDepth, maxWidth: (options == null ? void 0 : options.maxWidth) ?? DEFAULT_OPTIONS$1.maxWidth, min: (options == null ? void 0 : options.min) ?? DEFAULT_OPTIONS$1.min, plugins: (options == null ? void 0 : options.plugins) ?? DEFAULT_OPTIONS$1.plugins, printBasicPrototype: (options == null ? void 0 : options.printBasicPrototype) ?? true, printFunctionName: getPrintFunctionName$1(options), spacingInner: (options == null ? void 0 : options.min) ? " " : `
`, spacingOuter: (options == null ? void 0 : options.min) ? "" : `
` };
}
function createIndent$1(indent) {
  return Array.from({ length: indent + 1 }).join(" ");
}
function format$1(val, options) {
  if (options && (validateOptions$1(options), options.plugins)) {
    let plugin2 = findPlugin$1(options.plugins, val);
    if (plugin2 !== null) return printPlugin$1(plugin2, val, getConfig$1(options), "", 0, []);
  }
  let basicResult = printBasicValue$1(val, getPrintFunctionName$1(options), getEscapeRegex$1(options), getEscapeString$1(options));
  return basicResult !== null ? basicResult : printComplexValue$1(val, getConfig$1(options), "", 0, []);
}
var plugins$1 = { AsymmetricMatcher: plugin$5$1, DOMCollection: plugin$4$1, DOMElement: plugin$3$1, Immutable: plugin$2$1, ReactElement: plugin$1$1, ReactTestComponent: plugin$6 };
var ansiColors$1 = { bold: ["1", "22"], dim: ["2", "22"], italic: ["3", "23"], underline: ["4", "24"], inverse: ["7", "27"], hidden: ["8", "28"], strike: ["9", "29"], black: ["30", "39"], red: ["31", "39"], green: ["32", "39"], yellow: ["33", "39"], blue: ["34", "39"], magenta: ["35", "39"], cyan: ["36", "39"], white: ["37", "39"], brightblack: ["30;1", "39"], brightred: ["31;1", "39"], brightgreen: ["32;1", "39"], brightyellow: ["33;1", "39"], brightblue: ["34;1", "39"], brightmagenta: ["35;1", "39"], brightcyan: ["36;1", "39"], brightwhite: ["37;1", "39"], grey: ["90", "39"] }, styles$1 = { special: "cyan", number: "yellow", bigint: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", symbol: "green", date: "magenta", regexp: "red" }, truncator$1 = "…";
function colorise$1(value, styleType) {
  let color = ansiColors$1[styles$1[styleType]] || ansiColors$1[styleType] || "";
  return color ? `\x1B[${color[0]}m${String(value)}\x1B[${color[1]}m` : String(value);
}
function normaliseOptions$1({ showHidden = false, depth = 2, colors = false, customInspect = true, showProxy = false, maxArrayLength = 1 / 0, breakLength = 1 / 0, seen = [], truncate: truncate22 = 1 / 0, stylize = String } = {}, inspect32) {
  let options = { showHidden: !!showHidden, depth: Number(depth), colors: !!colors, customInspect: !!customInspect, showProxy: !!showProxy, maxArrayLength: Number(maxArrayLength), breakLength: Number(breakLength), truncate: Number(truncate22), seen, inspect: inspect32, stylize };
  return options.colors && (options.stylize = colorise$1), options;
}
function isHighSurrogate$1(char) {
  return char >= "\uD800" && char <= "\uDBFF";
}
function truncate$1(string, length, tail = truncator$1) {
  string = String(string);
  let tailLength = tail.length, stringLength = string.length;
  if (tailLength > length && stringLength > tailLength) return tail;
  if (stringLength > length && stringLength > tailLength) {
    let end = length - tailLength;
    return end > 0 && isHighSurrogate$1(string[end - 1]) && (end = end - 1), `${string.slice(0, end)}${tail}`;
  }
  return string;
}
function inspectList$1(list, options, inspectItem, separator = ", ") {
  inspectItem = inspectItem || options.inspect;
  let size = list.length;
  if (size === 0) return "";
  let originalLength = options.truncate, output = "", peek = "", truncated = "";
  for (let i = 0; i < size; i += 1) {
    let last = i + 1 === list.length, secondToLast = i + 2 === list.length;
    truncated = `${truncator$1}(${list.length - i})`;
    let value = list[i];
    options.truncate = originalLength - output.length - (last ? 0 : separator.length);
    let string = peek || inspectItem(value, options) + (last ? "" : separator), nextLength = output.length + string.length, truncatedLength = nextLength + truncated.length;
    if (last && nextLength > originalLength && output.length + truncated.length <= originalLength || !last && !secondToLast && truncatedLength > originalLength || (peek = last ? "" : inspectItem(list[i + 1], options) + (secondToLast ? "" : separator), !last && secondToLast && truncatedLength > originalLength && nextLength + peek.length > originalLength)) break;
    if (output += string, !last && !secondToLast && nextLength + peek.length >= originalLength) {
      truncated = `${truncator$1}(${list.length - i - 1})`;
      break;
    }
    truncated = "";
  }
  return `${output}${truncated}`;
}
function quoteComplexKey$1(key) {
  return key.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/) ? key : JSON.stringify(key).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
}
function inspectProperty$1([key, value], options) {
  return options.truncate -= 2, typeof key == "string" ? key = quoteComplexKey$1(key) : typeof key != "number" && (key = `[${options.inspect(key, options)}]`), options.truncate -= key.length, value = options.inspect(value, options), `${key}: ${value}`;
}
function inspectArray$1(array, options) {
  let nonIndexProperties = Object.keys(array).slice(array.length);
  if (!array.length && !nonIndexProperties.length) return "[]";
  options.truncate -= 4;
  let listContents = inspectList$1(array, options);
  options.truncate -= listContents.length;
  let propertyContents = "";
  return nonIndexProperties.length && (propertyContents = inspectList$1(nonIndexProperties.map((key) => [key, array[key]]), options, inspectProperty$1)), `[ ${listContents}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
var getArrayName$1 = (array) => typeof Buffer == "function" && array instanceof Buffer ? "Buffer" : array[Symbol.toStringTag] ? array[Symbol.toStringTag] : array.constructor.name;
function inspectTypedArray$1(array, options) {
  let name = getArrayName$1(array);
  options.truncate -= name.length + 4;
  let nonIndexProperties = Object.keys(array).slice(array.length);
  if (!array.length && !nonIndexProperties.length) return `${name}[]`;
  let output = "";
  for (let i = 0; i < array.length; i++) {
    let string = `${options.stylize(truncate$1(array[i], options.truncate), "number")}${i === array.length - 1 ? "" : ", "}`;
    if (options.truncate -= string.length, array[i] !== array.length && options.truncate <= 3) {
      output += `${truncator$1}(${array.length - array[i] + 1})`;
      break;
    }
    output += string;
  }
  let propertyContents = "";
  return nonIndexProperties.length && (propertyContents = inspectList$1(nonIndexProperties.map((key) => [key, array[key]]), options, inspectProperty$1)), `${name}[ ${output}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
function inspectDate$1(dateObject, options) {
  let stringRepresentation = dateObject.toJSON();
  if (stringRepresentation === null) return "Invalid Date";
  let split = stringRepresentation.split("T"), date = split[0];
  return options.stylize(`${date}T${truncate$1(split[1], options.truncate - date.length - 1)}`, "date");
}
function inspectFunction$1(func, options) {
  let functionType = func[Symbol.toStringTag] || "Function", name = func.name;
  return name ? options.stylize(`[${functionType} ${truncate$1(name, options.truncate - 11)}]`, "special") : options.stylize(`[${functionType}]`, "special");
}
function inspectMapEntry$1([key, value], options) {
  return options.truncate -= 4, key = options.inspect(key, options), options.truncate -= key.length, value = options.inspect(value, options), `${key} => ${value}`;
}
function mapToEntries$1(map) {
  let entries = [];
  return map.forEach((value, key) => {
    entries.push([key, value]);
  }), entries;
}
function inspectMap$1(map, options) {
  return map.size - 1 <= 0 ? "Map{}" : (options.truncate -= 7, `Map{ ${inspectList$1(mapToEntries$1(map), options, inspectMapEntry$1)} }`);
}
var isNaN$1 = Number.isNaN || ((i) => i !== i);
function inspectNumber$1(number, options) {
  return isNaN$1(number) ? options.stylize("NaN", "number") : number === 1 / 0 ? options.stylize("Infinity", "number") : number === -1 / 0 ? options.stylize("-Infinity", "number") : number === 0 ? options.stylize(1 / number === 1 / 0 ? "+0" : "-0", "number") : options.stylize(truncate$1(String(number), options.truncate), "number");
}
function inspectBigInt$1(number, options) {
  let nums = truncate$1(number.toString(), options.truncate - 1);
  return nums !== truncator$1 && (nums += "n"), options.stylize(nums, "bigint");
}
function inspectRegExp$1(value, options) {
  let flags = value.toString().split("/")[2], sourceLength = options.truncate - (2 + flags.length), source = value.source;
  return options.stylize(`/${truncate$1(source, sourceLength)}/${flags}`, "regexp");
}
function arrayFromSet$1(set) {
  let values = [];
  return set.forEach((value) => {
    values.push(value);
  }), values;
}
function inspectSet$1(set, options) {
  return set.size === 0 ? "Set{}" : (options.truncate -= 7, `Set{ ${inspectList$1(arrayFromSet$1(set), options)} }`);
}
var stringEscapeChars$1 = new RegExp("['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]", "g"), escapeCharacters$1 = { "\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "'": "\\'", "\\": "\\\\" }, hex$1 = 16, unicodeLength$1 = 4;
function escape$1(char) {
  return escapeCharacters$1[char] || `\\u${`0000${char.charCodeAt(0).toString(hex$1)}`.slice(-unicodeLength$1)}`;
}
function inspectString$1(string, options) {
  return stringEscapeChars$1.test(string) && (string = string.replace(stringEscapeChars$1, escape$1)), options.stylize(`'${truncate$1(string, options.truncate - 2)}'`, "string");
}
function inspectSymbol$1(value) {
  return "description" in Symbol.prototype ? value.description ? `Symbol(${value.description})` : "Symbol()" : value.toString();
}
var getPromiseValue$1 = () => "Promise{…}";
try {
  let { getPromiseDetails, kPending, kRejected } = process.binding("util");
  Array.isArray(getPromiseDetails(Promise.resolve())) && (getPromiseValue$1 = (value, options) => {
    let [state, innerValue] = getPromiseDetails(value);
    return state === kPending ? "Promise{<pending>}" : `Promise${state === kRejected ? "!" : ""}{${options.inspect(innerValue, options)}}`;
  });
} catch {
}
var promise_default$1 = getPromiseValue$1;
function inspectObject$1(object, options) {
  let properties = Object.getOwnPropertyNames(object), symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : [];
  if (properties.length === 0 && symbols.length === 0) return "{}";
  if (options.truncate -= 4, options.seen = options.seen || [], options.seen.indexOf(object) >= 0) return "[Circular]";
  options.seen.push(object);
  let propertyContents = inspectList$1(properties.map((key) => [key, object[key]]), options, inspectProperty$1), symbolContents = inspectList$1(symbols.map((key) => [key, object[key]]), options, inspectProperty$1);
  options.seen.pop();
  let sep = "";
  return propertyContents && symbolContents && (sep = ", "), `{ ${propertyContents}${sep}${symbolContents} }`;
}
var toStringTag$1 = typeof Symbol < "u" && Symbol.toStringTag ? Symbol.toStringTag : false;
function inspectClass$1(value, options) {
  let name = "";
  return toStringTag$1 && toStringTag$1 in value && (name = value[toStringTag$1]), name = name || value.constructor.name, (!name || name === "_class") && (name = "<Anonymous Class>"), options.truncate -= name.length, `${name}${inspectObject$1(value, options)}`;
}
function inspectArguments$1(args, options) {
  return args.length === 0 ? "Arguments[]" : (options.truncate -= 13, `Arguments[ ${inspectList$1(args, options)} ]`);
}
var errorKeys$1 = ["stack", "line", "column", "name", "message", "fileName", "lineNumber", "columnNumber", "number", "description"];
function inspectObject2$1(error, options) {
  let properties = Object.getOwnPropertyNames(error).filter((key) => errorKeys$1.indexOf(key) === -1), name = error.name;
  options.truncate -= name.length;
  let message = "";
  typeof error.message == "string" ? message = truncate$1(error.message, options.truncate) : properties.unshift("message"), message = message ? `: ${message}` : "", options.truncate -= message.length + 5;
  let propertyContents = inspectList$1(properties.map((key) => [key, error[key]]), options, inspectProperty$1);
  return `${name}${message}${propertyContents ? ` { ${propertyContents} }` : ""}`;
}
function inspectAttribute$1([key, value], options) {
  return options.truncate -= 3, value ? `${options.stylize(String(key), "yellow")}=${options.stylize(`"${value}"`, "string")}` : `${options.stylize(String(key), "yellow")}`;
}
function inspectHTMLCollection$1(collection, options) {
  return inspectList$1(collection, options, inspectHTML$1, `
`);
}
function inspectHTML$1(element, options) {
  let properties = element.getAttributeNames(), name = element.tagName.toLowerCase(), head = options.stylize(`<${name}`, "special"), headClose = options.stylize(">", "special"), tail = options.stylize(`</${name}>`, "special");
  options.truncate -= name.length * 2 + 5;
  let propertyContents = "";
  properties.length > 0 && (propertyContents += " ", propertyContents += inspectList$1(properties.map((key) => [key, element.getAttribute(key)]), options, inspectAttribute$1, " ")), options.truncate -= propertyContents.length;
  let truncate22 = options.truncate, children = inspectHTMLCollection$1(element.children, options);
  return children && children.length > truncate22 && (children = `${truncator$1}(${element.children.length})`), `${head}${propertyContents}${headClose}${children}${tail}`;
}
var symbolsSupported$1 = typeof Symbol == "function" && typeof Symbol.for == "function", chaiInspect$1 = symbolsSupported$1 ? Symbol.for("chai/inspect") : "@@chai/inspect", nodeInspect$1 = false;
try {
  let nodeUtil = __require$1("util");
  nodeInspect$1 = nodeUtil.inspect ? nodeUtil.inspect.custom : false;
} catch {
  nodeInspect$1 = false;
}
var constructorMap$1 = /* @__PURE__ */ new WeakMap(), stringTagMap$1 = {}, baseTypesMap$1 = { undefined: (value, options) => options.stylize("undefined", "undefined"), null: (value, options) => options.stylize("null", "null"), boolean: (value, options) => options.stylize(String(value), "boolean"), Boolean: (value, options) => options.stylize(String(value), "boolean"), number: inspectNumber$1, Number: inspectNumber$1, bigint: inspectBigInt$1, BigInt: inspectBigInt$1, string: inspectString$1, String: inspectString$1, function: inspectFunction$1, Function: inspectFunction$1, symbol: inspectSymbol$1, Symbol: inspectSymbol$1, Array: inspectArray$1, Date: inspectDate$1, Map: inspectMap$1, Set: inspectSet$1, RegExp: inspectRegExp$1, Promise: promise_default$1, WeakSet: (value, options) => options.stylize("WeakSet{…}", "special"), WeakMap: (value, options) => options.stylize("WeakMap{…}", "special"), Arguments: inspectArguments$1, Int8Array: inspectTypedArray$1, Uint8Array: inspectTypedArray$1, Uint8ClampedArray: inspectTypedArray$1, Int16Array: inspectTypedArray$1, Uint16Array: inspectTypedArray$1, Int32Array: inspectTypedArray$1, Uint32Array: inspectTypedArray$1, Float32Array: inspectTypedArray$1, Float64Array: inspectTypedArray$1, Generator: () => "", DataView: () => "", ArrayBuffer: () => "", Error: inspectObject2$1, HTMLCollection: inspectHTMLCollection$1, NodeList: inspectHTMLCollection$1 }, inspectCustom$1 = (value, options, type5) => chaiInspect$1 in value && typeof value[chaiInspect$1] == "function" ? value[chaiInspect$1](options) : nodeInspect$1 && nodeInspect$1 in value && typeof value[nodeInspect$1] == "function" ? value[nodeInspect$1](options.depth, options) : "inspect" in value && typeof value.inspect == "function" ? value.inspect(options.depth, options) : "constructor" in value && constructorMap$1.has(value.constructor) ? constructorMap$1.get(value.constructor)(value, options) : stringTagMap$1[type5] ? stringTagMap$1[type5](value, options) : "", toString2$1 = Object.prototype.toString;
function inspect$1(value, opts = {}) {
  let options = normaliseOptions$1(opts, inspect$1), { customInspect } = options, type5 = value === null ? "null" : typeof value;
  if (type5 === "object" && (type5 = toString2$1.call(value).slice(8, -1)), type5 in baseTypesMap$1) return baseTypesMap$1[type5](value, options);
  if (customInspect && value) {
    let output = inspectCustom$1(value, options, type5);
    if (output) return typeof output == "string" ? output : inspect$1(output, options);
  }
  let proto = value ? Object.getPrototypeOf(value) : false;
  return proto === Object.prototype || proto === null ? inspectObject$1(value, options) : value && typeof HTMLElement == "function" && value instanceof HTMLElement ? inspectHTML$1(value, options) : "constructor" in value ? value.constructor !== Object ? inspectClass$1(value, options) : inspectObject$1(value, options) : value === Object(value) ? inspectObject$1(value, options) : options.stylize(String(value), type5);
}
var { AsymmetricMatcher: AsymmetricMatcher$1, DOMCollection: DOMCollection$1, DOMElement: DOMElement$1, Immutable: Immutable$1, ReactElement: ReactElement$1, ReactTestComponent: ReactTestComponent$1 } = plugins$1, PLUGINS$1 = [ReactTestComponent$1, ReactElement$1, DOMElement$1, DOMCollection$1, Immutable$1, AsymmetricMatcher$1];
function stringify$1(object, maxDepth = 10, { maxLength, ...options } = {}) {
  let MAX_LENGTH = maxLength ?? 1e4, result;
  try {
    result = format$1(object, { maxDepth, escapeString: false, plugins: PLUGINS$1, ...options });
  } catch {
    result = format$1(object, { callToJSON: false, maxDepth, escapeString: false, plugins: PLUGINS$1, ...options });
  }
  return result.length >= MAX_LENGTH && maxDepth > 1 ? stringify$1(object, Math.floor(maxDepth / 2)) : result;
}
var formatRegExp$1 = /%[sdjifoOc%]/g;
function format2$1(...args) {
  if (typeof args[0] != "string") {
    let objects = [];
    for (let i2 = 0; i2 < args.length; i2++) objects.push(inspect2$1(args[i2], { depth: 0, colors: false }));
    return objects.join(" ");
  }
  let len = args.length, i = 1, template = args[0], str = String(template).replace(formatRegExp$1, (x2) => {
    if (x2 === "%%") return "%";
    if (i >= len) return x2;
    switch (x2) {
      case "%s": {
        let value = args[i++];
        return typeof value == "bigint" ? `${value.toString()}n` : typeof value == "number" && value === 0 && 1 / value < 0 ? "-0" : typeof value == "object" && value !== null ? inspect2$1(value, { depth: 0, colors: false }) : String(value);
      }
      case "%d": {
        let value = args[i++];
        return typeof value == "bigint" ? `${value.toString()}n` : Number(value).toString();
      }
      case "%i": {
        let value = args[i++];
        return typeof value == "bigint" ? `${value.toString()}n` : Number.parseInt(String(value)).toString();
      }
      case "%f":
        return Number.parseFloat(String(args[i++])).toString();
      case "%o":
        return inspect2$1(args[i++], { showHidden: true, showProxy: true });
      case "%O":
        return inspect2$1(args[i++]);
      case "%c":
        return i++, "";
      case "%j":
        try {
          return JSON.stringify(args[i++]);
        } catch (err) {
          let m2 = err.message;
          if (m2.includes("circular structure") || m2.includes("cyclic structures") || m2.includes("cyclic object")) return "[Circular]";
          throw err;
        }
      default:
        return x2;
    }
  });
  for (let x2 = args[i]; i < len; x2 = args[++i]) x2 === null || typeof x2 != "object" ? str += ` ${x2}` : str += ` ${inspect2$1(x2)}`;
  return str;
}
function inspect2$1(obj, options = {}) {
  return options.truncate === 0 && (options.truncate = Number.POSITIVE_INFINITY), inspect$1(obj, options);
}
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2.default : x2;
}
function isFinalObj$1(obj) {
  return obj === Object.prototype || obj === Function.prototype || obj === RegExp.prototype;
}
function getType2$1(value) {
  return Object.prototype.toString.apply(value).slice(8, -1);
}
function collectOwnProperties$1(obj, collector) {
  let collect = typeof collector == "function" ? collector : (key) => collector.add(key);
  Object.getOwnPropertyNames(obj).forEach(collect), Object.getOwnPropertySymbols(obj).forEach(collect);
}
function getOwnProperties$1(obj) {
  let ownProps = /* @__PURE__ */ new Set();
  return isFinalObj$1(obj) ? [] : (collectOwnProperties$1(obj, ownProps), Array.from(ownProps));
}
var defaultCloneOptions$1 = { forceWritable: false };
function deepClone$1(val, options = defaultCloneOptions$1) {
  return clone$1(val, /* @__PURE__ */ new WeakMap(), options);
}
function clone$1(val, seen, options = defaultCloneOptions$1) {
  let k2, out;
  if (seen.has(val)) return seen.get(val);
  if (Array.isArray(val)) {
    for (out = Array.from({ length: k2 = val.length }), seen.set(val, out); k2--; ) out[k2] = clone$1(val[k2], seen, options);
    return out;
  }
  if (Object.prototype.toString.call(val) === "[object Object]") {
    out = Object.create(Object.getPrototypeOf(val)), seen.set(val, out);
    let props = getOwnProperties$1(val);
    for (let k22 of props) {
      let descriptor = Object.getOwnPropertyDescriptor(val, k22);
      if (!descriptor) continue;
      let cloned = clone$1(val[k22], seen, options);
      options.forceWritable ? Object.defineProperty(out, k22, { enumerable: descriptor.enumerable, configurable: true, writable: true, value: cloned }) : "get" in descriptor ? Object.defineProperty(out, k22, { ...descriptor, get() {
        return cloned;
      } }) : Object.defineProperty(out, k22, { ...descriptor, value: cloned });
    }
    return out;
  }
  return val;
}
function getType3$1(value) {
  if (value === void 0) return "undefined";
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value == "boolean") return "boolean";
  if (typeof value == "function") return "function";
  if (typeof value == "number") return "number";
  if (typeof value == "string") return "string";
  if (typeof value == "bigint") return "bigint";
  if (typeof value == "object") {
    if (value != null) {
      if (value.constructor === RegExp) return "regexp";
      if (value.constructor === Map) return "map";
      if (value.constructor === Set) return "set";
      if (value.constructor === Date) return "date";
    }
    return "object";
  } else if (typeof value == "symbol") return "symbol";
  throw new Error(`value of unknown type: ${value}`);
}
var DIFF_DELETE$1 = -1, DIFF_INSERT$1 = 1, DIFF_EQUAL$1 = 0, Diff$1 = class Diff {
  constructor(op, text) {
    __publicField(this, 0);
    __publicField(this, 1);
    this[0] = op, this[1] = text;
  }
}, diff_commonPrefix$1 = function(text1, text2) {
  if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) return 0;
  let pointermin = 0, pointermax = Math.min(text1.length, text2.length), pointermid = pointermax, pointerstart = 0;
  for (; pointermin < pointermid; ) text1.substring(pointerstart, pointermid) === text2.substring(pointerstart, pointermid) ? (pointermin = pointermid, pointerstart = pointermin) : pointermax = pointermid, pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  return pointermid;
}, diff_commonSuffix$1 = function(text1, text2) {
  if (!text1 || !text2 || text1.charAt(text1.length - 1) !== text2.charAt(text2.length - 1)) return 0;
  let pointermin = 0, pointermax = Math.min(text1.length, text2.length), pointermid = pointermax, pointerend = 0;
  for (; pointermin < pointermid; ) text1.substring(text1.length - pointermid, text1.length - pointerend) === text2.substring(text2.length - pointermid, text2.length - pointerend) ? (pointermin = pointermid, pointerend = pointermin) : pointermax = pointermid, pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  return pointermid;
}, diff_commonOverlap_$1 = function(text1, text2) {
  let text1_length = text1.length, text2_length = text2.length;
  if (text1_length === 0 || text2_length === 0) return 0;
  text1_length > text2_length ? text1 = text1.substring(text1_length - text2_length) : text1_length < text2_length && (text2 = text2.substring(0, text1_length));
  let text_length = Math.min(text1_length, text2_length);
  if (text1 === text2) return text_length;
  let best = 0, length = 1;
  for (; ; ) {
    let pattern = text1.substring(text_length - length), found = text2.indexOf(pattern);
    if (found === -1) return best;
    length += found, (found === 0 || text1.substring(text_length - length) === text2.substring(0, length)) && (best = length, length++);
  }
}, diff_cleanupSemantic$1 = function(diffs) {
  let changes = false, equalities = [], equalitiesLength = 0, lastEquality = null, pointer3 = 0, length_insertions1 = 0, length_deletions1 = 0, length_insertions2 = 0, length_deletions2 = 0;
  for (; pointer3 < diffs.length; ) diffs[pointer3][0] === DIFF_EQUAL$1 ? (equalities[equalitiesLength++] = pointer3, length_insertions1 = length_insertions2, length_deletions1 = length_deletions2, length_insertions2 = 0, length_deletions2 = 0, lastEquality = diffs[pointer3][1]) : (diffs[pointer3][0] === DIFF_INSERT$1 ? length_insertions2 += diffs[pointer3][1].length : length_deletions2 += diffs[pointer3][1].length, lastEquality && lastEquality.length <= Math.max(length_insertions1, length_deletions1) && lastEquality.length <= Math.max(length_insertions2, length_deletions2) && (diffs.splice(equalities[equalitiesLength - 1], 0, new Diff$1(DIFF_DELETE$1, lastEquality)), diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT$1, equalitiesLength--, equalitiesLength--, pointer3 = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1, length_insertions1 = 0, length_deletions1 = 0, length_insertions2 = 0, length_deletions2 = 0, lastEquality = null, changes = true)), pointer3++;
  for (changes && diff_cleanupMerge$1(diffs), diff_cleanupSemanticLossless$1(diffs), pointer3 = 1; pointer3 < diffs.length; ) {
    if (diffs[pointer3 - 1][0] === DIFF_DELETE$1 && diffs[pointer3][0] === DIFF_INSERT$1) {
      let deletion = diffs[pointer3 - 1][1], insertion = diffs[pointer3][1], overlap_length1 = diff_commonOverlap_$1(deletion, insertion), overlap_length2 = diff_commonOverlap_$1(insertion, deletion);
      overlap_length1 >= overlap_length2 ? (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) && (diffs.splice(pointer3, 0, new Diff$1(DIFF_EQUAL$1, insertion.substring(0, overlap_length1))), diffs[pointer3 - 1][1] = deletion.substring(0, deletion.length - overlap_length1), diffs[pointer3 + 1][1] = insertion.substring(overlap_length1), pointer3++) : (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) && (diffs.splice(pointer3, 0, new Diff$1(DIFF_EQUAL$1, deletion.substring(0, overlap_length2))), diffs[pointer3 - 1][0] = DIFF_INSERT$1, diffs[pointer3 - 1][1] = insertion.substring(0, insertion.length - overlap_length2), diffs[pointer3 + 1][0] = DIFF_DELETE$1, diffs[pointer3 + 1][1] = deletion.substring(overlap_length2), pointer3++), pointer3++;
    }
    pointer3++;
  }
}, nonAlphaNumericRegex_$1 = /[^a-z0-9]/i, whitespaceRegex_$1 = /\s/, linebreakRegex_$1 = /[\r\n]/, blanklineEndRegex_$1 = /\n\r?\n$/, blanklineStartRegex_$1 = /^\r?\n\r?\n/;
function diff_cleanupSemanticLossless$1(diffs) {
  let pointer3 = 1;
  for (; pointer3 < diffs.length - 1; ) {
    if (diffs[pointer3 - 1][0] === DIFF_EQUAL$1 && diffs[pointer3 + 1][0] === DIFF_EQUAL$1) {
      let equality1 = diffs[pointer3 - 1][1], edit = diffs[pointer3][1], equality2 = diffs[pointer3 + 1][1], commonOffset = diff_commonSuffix$1(equality1, edit);
      if (commonOffset) {
        let commonString = edit.substring(edit.length - commonOffset);
        equality1 = equality1.substring(0, equality1.length - commonOffset), edit = commonString + edit.substring(0, edit.length - commonOffset), equality2 = commonString + equality2;
      }
      let bestEquality1 = equality1, bestEdit = edit, bestEquality2 = equality2, bestScore = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
      for (; edit.charAt(0) === equality2.charAt(0); ) {
        equality1 += edit.charAt(0), edit = edit.substring(1) + equality2.charAt(0), equality2 = equality2.substring(1);
        let score = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
        score >= bestScore && (bestScore = score, bestEquality1 = equality1, bestEdit = edit, bestEquality2 = equality2);
      }
      diffs[pointer3 - 1][1] !== bestEquality1 && (bestEquality1 ? diffs[pointer3 - 1][1] = bestEquality1 : (diffs.splice(pointer3 - 1, 1), pointer3--), diffs[pointer3][1] = bestEdit, bestEquality2 ? diffs[pointer3 + 1][1] = bestEquality2 : (diffs.splice(pointer3 + 1, 1), pointer3--));
    }
    pointer3++;
  }
}
function diff_cleanupMerge$1(diffs) {
  diffs.push(new Diff$1(DIFF_EQUAL$1, ""));
  let pointer3 = 0, count_delete = 0, count_insert = 0, text_delete = "", text_insert = "", commonlength;
  for (; pointer3 < diffs.length; ) switch (diffs[pointer3][0]) {
    case DIFF_INSERT$1:
      count_insert++, text_insert += diffs[pointer3][1], pointer3++;
      break;
    case DIFF_DELETE$1:
      count_delete++, text_delete += diffs[pointer3][1], pointer3++;
      break;
    case DIFF_EQUAL$1:
      count_delete + count_insert > 1 ? (count_delete !== 0 && count_insert !== 0 && (commonlength = diff_commonPrefix$1(text_insert, text_delete), commonlength !== 0 && (pointer3 - count_delete - count_insert > 0 && diffs[pointer3 - count_delete - count_insert - 1][0] === DIFF_EQUAL$1 ? diffs[pointer3 - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength) : (diffs.splice(0, 0, new Diff$1(DIFF_EQUAL$1, text_insert.substring(0, commonlength))), pointer3++), text_insert = text_insert.substring(commonlength), text_delete = text_delete.substring(commonlength)), commonlength = diff_commonSuffix$1(text_insert, text_delete), commonlength !== 0 && (diffs[pointer3][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer3][1], text_insert = text_insert.substring(0, text_insert.length - commonlength), text_delete = text_delete.substring(0, text_delete.length - commonlength))), pointer3 -= count_delete + count_insert, diffs.splice(pointer3, count_delete + count_insert), text_delete.length && (diffs.splice(pointer3, 0, new Diff$1(DIFF_DELETE$1, text_delete)), pointer3++), text_insert.length && (diffs.splice(pointer3, 0, new Diff$1(DIFF_INSERT$1, text_insert)), pointer3++), pointer3++) : pointer3 !== 0 && diffs[pointer3 - 1][0] === DIFF_EQUAL$1 ? (diffs[pointer3 - 1][1] += diffs[pointer3][1], diffs.splice(pointer3, 1)) : pointer3++, count_insert = 0, count_delete = 0, text_delete = "", text_insert = "";
      break;
  }
  diffs[diffs.length - 1][1] === "" && diffs.pop();
  let changes = false;
  for (pointer3 = 1; pointer3 < diffs.length - 1; ) diffs[pointer3 - 1][0] === DIFF_EQUAL$1 && diffs[pointer3 + 1][0] === DIFF_EQUAL$1 && (diffs[pointer3][1].substring(diffs[pointer3][1].length - diffs[pointer3 - 1][1].length) === diffs[pointer3 - 1][1] ? (diffs[pointer3][1] = diffs[pointer3 - 1][1] + diffs[pointer3][1].substring(0, diffs[pointer3][1].length - diffs[pointer3 - 1][1].length), diffs[pointer3 + 1][1] = diffs[pointer3 - 1][1] + diffs[pointer3 + 1][1], diffs.splice(pointer3 - 1, 1), changes = true) : diffs[pointer3][1].substring(0, diffs[pointer3 + 1][1].length) === diffs[pointer3 + 1][1] && (diffs[pointer3 - 1][1] += diffs[pointer3 + 1][1], diffs[pointer3][1] = diffs[pointer3][1].substring(diffs[pointer3 + 1][1].length) + diffs[pointer3 + 1][1], diffs.splice(pointer3 + 1, 1), changes = true)), pointer3++;
  changes && diff_cleanupMerge$1(diffs);
}
function diff_cleanupSemanticScore_(one, two) {
  if (!one || !two) return 6;
  let char1 = one.charAt(one.length - 1), char2 = two.charAt(0), nonAlphaNumeric1 = char1.match(nonAlphaNumericRegex_$1), nonAlphaNumeric2 = char2.match(nonAlphaNumericRegex_$1), whitespace1 = nonAlphaNumeric1 && char1.match(whitespaceRegex_$1), whitespace2 = nonAlphaNumeric2 && char2.match(whitespaceRegex_$1), lineBreak1 = whitespace1 && char1.match(linebreakRegex_$1), lineBreak2 = whitespace2 && char2.match(linebreakRegex_$1), blankLine1 = lineBreak1 && one.match(blanklineEndRegex_$1), blankLine2 = lineBreak2 && two.match(blanklineStartRegex_$1);
  return blankLine1 || blankLine2 ? 5 : lineBreak1 || lineBreak2 ? 4 : nonAlphaNumeric1 && !whitespace1 && whitespace2 ? 3 : whitespace1 || whitespace2 ? 2 : nonAlphaNumeric1 || nonAlphaNumeric2 ? 1 : 0;
}
var NO_DIFF_MESSAGE$1 = "Compared values have no visual difference.", SIMILAR_MESSAGE$1 = "Compared values serialize to the same structure.\nPrinting internal object structure without calling `toJSON` instead.", build$1 = {}, hasRequiredBuild;
function requireBuild() {
  if (hasRequiredBuild) return build$1;
  hasRequiredBuild = 1, Object.defineProperty(build$1, "__esModule", { value: true }), build$1.default = diffSequence2;
  let pkg2 = "diff-sequences", NOT_YET_SET2 = 0, countCommonItemsF2 = (aIndex, aEnd, bIndex, bEnd, isCommon) => {
    let nCommon = 0;
    for (; aIndex < aEnd && bIndex < bEnd && isCommon(aIndex, bIndex); ) aIndex += 1, bIndex += 1, nCommon += 1;
    return nCommon;
  }, countCommonItemsR2 = (aStart, aIndex, bStart, bIndex, isCommon) => {
    let nCommon = 0;
    for (; aStart <= aIndex && bStart <= bIndex && isCommon(aIndex, bIndex); ) aIndex -= 1, bIndex -= 1, nCommon += 1;
    return nCommon;
  }, extendPathsF2 = (d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF) => {
    let iF = 0, kF = -d2, aFirst = aIndexesF[iF], aIndexPrev1 = aFirst;
    aIndexesF[iF] += countCommonItemsF2(aFirst + 1, aEnd, bF + aFirst - kF + 1, bEnd, isCommon);
    let nF = d2 < iMaxF ? d2 : iMaxF;
    for (iF += 1, kF += 2; iF <= nF; iF += 1, kF += 2) {
      if (iF !== d2 && aIndexPrev1 < aIndexesF[iF]) aFirst = aIndexesF[iF];
      else if (aFirst = aIndexPrev1 + 1, aEnd <= aFirst) return iF - 1;
      aIndexPrev1 = aIndexesF[iF], aIndexesF[iF] = aFirst + countCommonItemsF2(aFirst + 1, aEnd, bF + aFirst - kF + 1, bEnd, isCommon);
    }
    return iMaxF;
  }, extendPathsR2 = (d2, aStart, bStart, bR, isCommon, aIndexesR, iMaxR) => {
    let iR = 0, kR = d2, aFirst = aIndexesR[iR], aIndexPrev1 = aFirst;
    aIndexesR[iR] -= countCommonItemsR2(aStart, aFirst - 1, bStart, bR + aFirst - kR - 1, isCommon);
    let nR = d2 < iMaxR ? d2 : iMaxR;
    for (iR += 1, kR -= 2; iR <= nR; iR += 1, kR -= 2) {
      if (iR !== d2 && aIndexesR[iR] < aIndexPrev1) aFirst = aIndexesR[iR];
      else if (aFirst = aIndexPrev1 - 1, aFirst < aStart) return iR - 1;
      aIndexPrev1 = aIndexesR[iR], aIndexesR[iR] = aFirst - countCommonItemsR2(aStart, aFirst - 1, bStart, bR + aFirst - kR - 1, isCommon);
    }
    return iMaxR;
  }, extendOverlappablePathsF2 = (d2, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division) => {
    let bF = bStart - aStart, aLength = aEnd - aStart, baDeltaLength = bEnd - bStart - aLength, kMinOverlapF = -baDeltaLength - (d2 - 1), kMaxOverlapF = -baDeltaLength + (d2 - 1), aIndexPrev1 = NOT_YET_SET2, nF = d2 < iMaxF ? d2 : iMaxF;
    for (let iF = 0, kF = -d2; iF <= nF; iF += 1, kF += 2) {
      let insert = iF === 0 || iF !== d2 && aIndexPrev1 < aIndexesF[iF], aLastPrev = insert ? aIndexesF[iF] : aIndexPrev1, aFirst = insert ? aLastPrev : aLastPrev + 1, bFirst = bF + aFirst - kF, nCommonF = countCommonItemsF2(aFirst + 1, aEnd, bFirst + 1, bEnd, isCommon), aLast = aFirst + nCommonF;
      if (aIndexPrev1 = aIndexesF[iF], aIndexesF[iF] = aLast, kMinOverlapF <= kF && kF <= kMaxOverlapF) {
        let iR = (d2 - 1 - (kF + baDeltaLength)) / 2;
        if (iR <= iMaxR && aIndexesR[iR] - 1 <= aLast) {
          let bLastPrev = bF + aLastPrev - (insert ? kF + 1 : kF - 1), nCommonR = countCommonItemsR2(aStart, aLastPrev, bStart, bLastPrev, isCommon), aIndexPrevFirst = aLastPrev - nCommonR, bIndexPrevFirst = bLastPrev - nCommonR, aEndPreceding = aIndexPrevFirst + 1, bEndPreceding = bIndexPrevFirst + 1;
          division.nChangePreceding = d2 - 1, d2 - 1 === aEndPreceding + bEndPreceding - aStart - bStart ? (division.aEndPreceding = aStart, division.bEndPreceding = bStart) : (division.aEndPreceding = aEndPreceding, division.bEndPreceding = bEndPreceding), division.nCommonPreceding = nCommonR, nCommonR !== 0 && (division.aCommonPreceding = aEndPreceding, division.bCommonPreceding = bEndPreceding), division.nCommonFollowing = nCommonF, nCommonF !== 0 && (division.aCommonFollowing = aFirst + 1, division.bCommonFollowing = bFirst + 1);
          let aStartFollowing = aLast + 1, bStartFollowing = bFirst + nCommonF + 1;
          return division.nChangeFollowing = d2 - 1, d2 - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing ? (division.aStartFollowing = aEnd, division.bStartFollowing = bEnd) : (division.aStartFollowing = aStartFollowing, division.bStartFollowing = bStartFollowing), true;
        }
      }
    }
    return false;
  }, extendOverlappablePathsR2 = (d2, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division) => {
    let bR = bEnd - aEnd, aLength = aEnd - aStart, baDeltaLength = bEnd - bStart - aLength, kMinOverlapR = baDeltaLength - d2, kMaxOverlapR = baDeltaLength + d2, aIndexPrev1 = NOT_YET_SET2, nR = d2 < iMaxR ? d2 : iMaxR;
    for (let iR = 0, kR = d2; iR <= nR; iR += 1, kR -= 2) {
      let insert = iR === 0 || iR !== d2 && aIndexesR[iR] < aIndexPrev1, aLastPrev = insert ? aIndexesR[iR] : aIndexPrev1, aFirst = insert ? aLastPrev : aLastPrev - 1, bFirst = bR + aFirst - kR, nCommonR = countCommonItemsR2(aStart, aFirst - 1, bStart, bFirst - 1, isCommon), aLast = aFirst - nCommonR;
      if (aIndexPrev1 = aIndexesR[iR], aIndexesR[iR] = aLast, kMinOverlapR <= kR && kR <= kMaxOverlapR) {
        let iF = (d2 + (kR - baDeltaLength)) / 2;
        if (iF <= iMaxF && aLast - 1 <= aIndexesF[iF]) {
          let bLast = bFirst - nCommonR;
          if (division.nChangePreceding = d2, d2 === aLast + bLast - aStart - bStart ? (division.aEndPreceding = aStart, division.bEndPreceding = bStart) : (division.aEndPreceding = aLast, division.bEndPreceding = bLast), division.nCommonPreceding = nCommonR, nCommonR !== 0 && (division.aCommonPreceding = aLast, division.bCommonPreceding = bLast), division.nChangeFollowing = d2 - 1, d2 === 1) division.nCommonFollowing = 0, division.aStartFollowing = aEnd, division.bStartFollowing = bEnd;
          else {
            let bLastPrev = bR + aLastPrev - (insert ? kR - 1 : kR + 1), nCommonF = countCommonItemsF2(aLastPrev, aEnd, bLastPrev, bEnd, isCommon);
            division.nCommonFollowing = nCommonF, nCommonF !== 0 && (division.aCommonFollowing = aLastPrev, division.bCommonFollowing = bLastPrev);
            let aStartFollowing = aLastPrev + nCommonF, bStartFollowing = bLastPrev + nCommonF;
            d2 - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing ? (division.aStartFollowing = aEnd, division.bStartFollowing = bEnd) : (division.aStartFollowing = aStartFollowing, division.bStartFollowing = bStartFollowing);
          }
          return true;
        }
      }
    }
    return false;
  }, divide2 = (nChange, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, aIndexesR, division) => {
    let bF = bStart - aStart, bR = bEnd - aEnd, aLength = aEnd - aStart, bLength = bEnd - bStart, baDeltaLength = bLength - aLength, iMaxF = aLength, iMaxR = aLength;
    if (aIndexesF[0] = aStart - 1, aIndexesR[0] = aEnd, baDeltaLength % 2 === 0) {
      let dMin = (nChange || baDeltaLength) / 2, dMax = (aLength + bLength) / 2;
      for (let d2 = 1; d2 <= dMax; d2 += 1) if (iMaxF = extendPathsF2(d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF), d2 < dMin) iMaxR = extendPathsR2(d2, aStart, bStart, bR, isCommon, aIndexesR, iMaxR);
      else if (extendOverlappablePathsR2(d2, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division)) return;
    } else {
      let dMin = ((nChange || baDeltaLength) + 1) / 2, dMax = (aLength + bLength + 1) / 2, d2 = 1;
      for (iMaxF = extendPathsF2(d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF), d2 += 1; d2 <= dMax; d2 += 1) if (iMaxR = extendPathsR2(d2 - 1, aStart, bStart, bR, isCommon, aIndexesR, iMaxR), d2 < dMin) iMaxF = extendPathsF2(d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
      else if (extendOverlappablePathsF2(d2, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division)) return;
    }
    throw new Error(`${pkg2}: no overlap aStart=${aStart} aEnd=${aEnd} bStart=${bStart} bEnd=${bEnd}`);
  }, findSubsequences2 = (nChange, aStart, aEnd, bStart, bEnd, transposed, callbacks, aIndexesF, aIndexesR, division) => {
    if (bEnd - bStart < aEnd - aStart) {
      if (transposed = !transposed, transposed && callbacks.length === 1) {
        let { foundSubsequence: foundSubsequence2, isCommon: isCommon2 } = callbacks[0];
        callbacks[1] = { foundSubsequence: (nCommon, bCommon, aCommon) => {
          foundSubsequence2(nCommon, aCommon, bCommon);
        }, isCommon: (bIndex, aIndex) => isCommon2(aIndex, bIndex) };
      }
      let tStart = aStart, tEnd = aEnd;
      aStart = bStart, aEnd = bEnd, bStart = tStart, bEnd = tEnd;
    }
    let { foundSubsequence, isCommon } = callbacks[transposed ? 1 : 0];
    divide2(nChange, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, aIndexesR, division);
    let { nChangePreceding, aEndPreceding, bEndPreceding, nCommonPreceding, aCommonPreceding, bCommonPreceding, nCommonFollowing, aCommonFollowing, bCommonFollowing, nChangeFollowing, aStartFollowing, bStartFollowing } = division;
    aStart < aEndPreceding && bStart < bEndPreceding && findSubsequences2(nChangePreceding, aStart, aEndPreceding, bStart, bEndPreceding, transposed, callbacks, aIndexesF, aIndexesR, division), nCommonPreceding !== 0 && foundSubsequence(nCommonPreceding, aCommonPreceding, bCommonPreceding), nCommonFollowing !== 0 && foundSubsequence(nCommonFollowing, aCommonFollowing, bCommonFollowing), aStartFollowing < aEnd && bStartFollowing < bEnd && findSubsequences2(nChangeFollowing, aStartFollowing, aEnd, bStartFollowing, bEnd, transposed, callbacks, aIndexesF, aIndexesR, division);
  }, validateLength2 = (name, arg) => {
    if (typeof arg != "number") throw new TypeError(`${pkg2}: ${name} typeof ${typeof arg} is not a number`);
    if (!Number.isSafeInteger(arg)) throw new RangeError(`${pkg2}: ${name} value ${arg} is not a safe integer`);
    if (arg < 0) throw new RangeError(`${pkg2}: ${name} value ${arg} is a negative integer`);
  }, validateCallback2 = (name, arg) => {
    let type5 = typeof arg;
    if (type5 !== "function") throw new TypeError(`${pkg2}: ${name} typeof ${type5} is not a function`);
  };
  function diffSequence2(aLength, bLength, isCommon, foundSubsequence) {
    validateLength2("aLength", aLength), validateLength2("bLength", bLength), validateCallback2("isCommon", isCommon), validateCallback2("foundSubsequence", foundSubsequence);
    let nCommonF = countCommonItemsF2(0, aLength, 0, bLength, isCommon);
    if (nCommonF !== 0 && foundSubsequence(nCommonF, 0, 0), aLength !== nCommonF || bLength !== nCommonF) {
      let aStart = nCommonF, bStart = nCommonF, nCommonR = countCommonItemsR2(aStart, aLength - 1, bStart, bLength - 1, isCommon), aEnd = aLength - nCommonR, bEnd = bLength - nCommonR, nCommonFR = nCommonF + nCommonR;
      aLength !== nCommonFR && bLength !== nCommonFR && findSubsequences2(0, aStart, aEnd, bStart, bEnd, false, [{ foundSubsequence, isCommon }], [NOT_YET_SET2], [NOT_YET_SET2], { aCommonFollowing: NOT_YET_SET2, aCommonPreceding: NOT_YET_SET2, aEndPreceding: NOT_YET_SET2, aStartFollowing: NOT_YET_SET2, bCommonFollowing: NOT_YET_SET2, bCommonPreceding: NOT_YET_SET2, bEndPreceding: NOT_YET_SET2, bStartFollowing: NOT_YET_SET2, nChangeFollowing: NOT_YET_SET2, nChangePreceding: NOT_YET_SET2, nCommonFollowing: NOT_YET_SET2, nCommonPreceding: NOT_YET_SET2 }), nCommonR !== 0 && foundSubsequence(nCommonR, aEnd, bEnd);
    }
  }
  return build$1;
}
var buildExports = requireBuild(), diffSequences = getDefaultExportFromCjs(buildExports);
function formatTrailingSpaces$1(line, trailingSpaceFormatter) {
  return line.replace(/\s+$/, (match) => trailingSpaceFormatter(match));
}
function printDiffLine$1(line, isFirstOrLast, color, indicator, trailingSpaceFormatter, emptyFirstOrLastLinePlaceholder) {
  return line.length !== 0 ? color(`${indicator} ${formatTrailingSpaces$1(line, trailingSpaceFormatter)}`) : indicator !== " " ? color(indicator) : isFirstOrLast && emptyFirstOrLastLinePlaceholder.length !== 0 ? color(`${indicator} ${emptyFirstOrLastLinePlaceholder}`) : "";
}
function printDeleteLine$1(line, isFirstOrLast, { aColor, aIndicator, changeLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder }) {
  return printDiffLine$1(line, isFirstOrLast, aColor, aIndicator, changeLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder);
}
function printInsertLine$1(line, isFirstOrLast, { bColor, bIndicator, changeLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder }) {
  return printDiffLine$1(line, isFirstOrLast, bColor, bIndicator, changeLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder);
}
function printCommonLine$1(line, isFirstOrLast, { commonColor, commonIndicator, commonLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder }) {
  return printDiffLine$1(line, isFirstOrLast, commonColor, commonIndicator, commonLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder);
}
function createPatchMark$1(aStart, aEnd, bStart, bEnd, { patchColor }) {
  return patchColor(`@@ -${aStart + 1},${aEnd - aStart} +${bStart + 1},${bEnd - bStart} @@`);
}
function joinAlignedDiffsNoExpand$1(diffs, options) {
  let iLength = diffs.length, nContextLines = options.contextLines, nContextLines2 = nContextLines + nContextLines, jLength = iLength, hasExcessAtStartOrEnd = false, nExcessesBetweenChanges = 0, i = 0;
  for (; i !== iLength; ) {
    let iStart = i;
    for (; i !== iLength && diffs[i][0] === DIFF_EQUAL$1; ) i += 1;
    if (iStart !== i) if (iStart === 0) i > nContextLines && (jLength -= i - nContextLines, hasExcessAtStartOrEnd = true);
    else if (i === iLength) {
      let n = i - iStart;
      n > nContextLines && (jLength -= n - nContextLines, hasExcessAtStartOrEnd = true);
    } else {
      let n = i - iStart;
      n > nContextLines2 && (jLength -= n - nContextLines2, nExcessesBetweenChanges += 1);
    }
    for (; i !== iLength && diffs[i][0] !== DIFF_EQUAL$1; ) i += 1;
  }
  let hasPatch = nExcessesBetweenChanges !== 0 || hasExcessAtStartOrEnd;
  nExcessesBetweenChanges !== 0 ? jLength += nExcessesBetweenChanges + 1 : hasExcessAtStartOrEnd && (jLength += 1);
  let jLast = jLength - 1, lines = [], jPatchMark = 0;
  hasPatch && lines.push("");
  let aStart = 0, bStart = 0, aEnd = 0, bEnd = 0, pushCommonLine = (line) => {
    let j = lines.length;
    lines.push(printCommonLine$1(line, j === 0 || j === jLast, options)), aEnd += 1, bEnd += 1;
  }, pushDeleteLine = (line) => {
    let j = lines.length;
    lines.push(printDeleteLine$1(line, j === 0 || j === jLast, options)), aEnd += 1;
  }, pushInsertLine = (line) => {
    let j = lines.length;
    lines.push(printInsertLine$1(line, j === 0 || j === jLast, options)), bEnd += 1;
  };
  for (i = 0; i !== iLength; ) {
    let iStart = i;
    for (; i !== iLength && diffs[i][0] === DIFF_EQUAL$1; ) i += 1;
    if (iStart !== i) if (iStart === 0) {
      i > nContextLines && (iStart = i - nContextLines, aStart = iStart, bStart = iStart, aEnd = aStart, bEnd = bStart);
      for (let iCommon = iStart; iCommon !== i; iCommon += 1) pushCommonLine(diffs[iCommon][1]);
    } else if (i === iLength) {
      let iEnd = i - iStart > nContextLines ? iStart + nContextLines : i;
      for (let iCommon = iStart; iCommon !== iEnd; iCommon += 1) pushCommonLine(diffs[iCommon][1]);
    } else {
      let nCommon = i - iStart;
      if (nCommon > nContextLines2) {
        let iEnd = iStart + nContextLines;
        for (let iCommon = iStart; iCommon !== iEnd; iCommon += 1) pushCommonLine(diffs[iCommon][1]);
        lines[jPatchMark] = createPatchMark$1(aStart, aEnd, bStart, bEnd, options), jPatchMark = lines.length, lines.push("");
        let nOmit = nCommon - nContextLines2;
        aStart = aEnd + nOmit, bStart = bEnd + nOmit, aEnd = aStart, bEnd = bStart;
        for (let iCommon = i - nContextLines; iCommon !== i; iCommon += 1) pushCommonLine(diffs[iCommon][1]);
      } else for (let iCommon = iStart; iCommon !== i; iCommon += 1) pushCommonLine(diffs[iCommon][1]);
    }
    for (; i !== iLength && diffs[i][0] === DIFF_DELETE$1; ) pushDeleteLine(diffs[i][1]), i += 1;
    for (; i !== iLength && diffs[i][0] === DIFF_INSERT$1; ) pushInsertLine(diffs[i][1]), i += 1;
  }
  return hasPatch && (lines[jPatchMark] = createPatchMark$1(aStart, aEnd, bStart, bEnd, options)), lines.join(`
`);
}
function joinAlignedDiffsExpand$1(diffs, options) {
  return diffs.map((diff2, i, diffs2) => {
    let line = diff2[1], isFirstOrLast = i === 0 || i === diffs2.length - 1;
    switch (diff2[0]) {
      case DIFF_DELETE$1:
        return printDeleteLine$1(line, isFirstOrLast, options);
      case DIFF_INSERT$1:
        return printInsertLine$1(line, isFirstOrLast, options);
      default:
        return printCommonLine$1(line, isFirstOrLast, options);
    }
  }).join(`
`);
}
var noColor$1 = (string) => string, DIFF_CONTEXT_DEFAULT$1 = 5, DIFF_TRUNCATE_THRESHOLD_DEFAULT$1 = 0;
function getDefaultOptions$1() {
  return { aAnnotation: "Expected", aColor: f2$1.green, aIndicator: "-", bAnnotation: "Received", bColor: f2$1.red, bIndicator: "+", changeColor: f2$1.inverse, changeLineTrailingSpaceColor: noColor$1, commonColor: f2$1.dim, commonIndicator: " ", commonLineTrailingSpaceColor: noColor$1, compareKeys: void 0, contextLines: DIFF_CONTEXT_DEFAULT$1, emptyFirstOrLastLinePlaceholder: "", expand: true, includeChangeCounts: false, omitAnnotationLines: false, patchColor: f2$1.yellow, truncateThreshold: DIFF_TRUNCATE_THRESHOLD_DEFAULT$1, truncateAnnotation: "... Diff result is truncated", truncateAnnotationColor: noColor$1 };
}
function getCompareKeys$1(compareKeys) {
  return compareKeys && typeof compareKeys == "function" ? compareKeys : void 0;
}
function getContextLines$1(contextLines) {
  return typeof contextLines == "number" && Number.isSafeInteger(contextLines) && contextLines >= 0 ? contextLines : DIFF_CONTEXT_DEFAULT$1;
}
function normalizeDiffOptions$1(options = {}) {
  return { ...getDefaultOptions$1(), ...options, compareKeys: getCompareKeys$1(options.compareKeys), contextLines: getContextLines$1(options.contextLines) };
}
function isEmptyString$1(lines) {
  return lines.length === 1 && lines[0].length === 0;
}
function countChanges$1(diffs) {
  let a2 = 0, b = 0;
  return diffs.forEach((diff2) => {
    switch (diff2[0]) {
      case DIFF_DELETE$1:
        a2 += 1;
        break;
      case DIFF_INSERT$1:
        b += 1;
        break;
    }
  }), { a: a2, b };
}
function printAnnotation$1({ aAnnotation, aColor, aIndicator, bAnnotation, bColor, bIndicator, includeChangeCounts, omitAnnotationLines }, changeCounts) {
  if (omitAnnotationLines) return "";
  let aRest = "", bRest = "";
  if (includeChangeCounts) {
    let aCount = String(changeCounts.a), bCount = String(changeCounts.b), baAnnotationLengthDiff = bAnnotation.length - aAnnotation.length, aAnnotationPadding = " ".repeat(Math.max(0, baAnnotationLengthDiff)), bAnnotationPadding = " ".repeat(Math.max(0, -baAnnotationLengthDiff)), baCountLengthDiff = bCount.length - aCount.length, aCountPadding = " ".repeat(Math.max(0, baCountLengthDiff)), bCountPadding = " ".repeat(Math.max(0, -baCountLengthDiff));
    aRest = `${aAnnotationPadding}  ${aIndicator} ${aCountPadding}${aCount}`, bRest = `${bAnnotationPadding}  ${bIndicator} ${bCountPadding}${bCount}`;
  }
  let a2 = `${aIndicator} ${aAnnotation}${aRest}`, b = `${bIndicator} ${bAnnotation}${bRest}`;
  return `${aColor(a2)}
${bColor(b)}

`;
}
function printDiffLines$1(diffs, truncated, options) {
  return printAnnotation$1(options, countChanges$1(diffs)) + (options.expand ? joinAlignedDiffsExpand$1(diffs, options) : joinAlignedDiffsNoExpand$1(diffs, options)) + (truncated ? options.truncateAnnotationColor(`
${options.truncateAnnotation}`) : "");
}
function diffLinesUnified$1(aLines, bLines, options) {
  let normalizedOptions = normalizeDiffOptions$1(options), [diffs, truncated] = diffLinesRaw$1(isEmptyString$1(aLines) ? [] : aLines, isEmptyString$1(bLines) ? [] : bLines, normalizedOptions);
  return printDiffLines$1(diffs, truncated, normalizedOptions);
}
function diffLinesUnified2$1(aLinesDisplay, bLinesDisplay, aLinesCompare, bLinesCompare, options) {
  if (isEmptyString$1(aLinesDisplay) && isEmptyString$1(aLinesCompare) && (aLinesDisplay = [], aLinesCompare = []), isEmptyString$1(bLinesDisplay) && isEmptyString$1(bLinesCompare) && (bLinesDisplay = [], bLinesCompare = []), aLinesDisplay.length !== aLinesCompare.length || bLinesDisplay.length !== bLinesCompare.length) return diffLinesUnified$1(aLinesDisplay, bLinesDisplay, options);
  let [diffs, truncated] = diffLinesRaw$1(aLinesCompare, bLinesCompare, options), aIndex = 0, bIndex = 0;
  return diffs.forEach((diff2) => {
    switch (diff2[0]) {
      case DIFF_DELETE$1:
        diff2[1] = aLinesDisplay[aIndex], aIndex += 1;
        break;
      case DIFF_INSERT$1:
        diff2[1] = bLinesDisplay[bIndex], bIndex += 1;
        break;
      default:
        diff2[1] = bLinesDisplay[bIndex], aIndex += 1, bIndex += 1;
    }
  }), printDiffLines$1(diffs, truncated, normalizeDiffOptions$1(options));
}
function diffLinesRaw$1(aLines, bLines, options) {
  let truncate22 = (options == null ? void 0 : options.truncateThreshold) ?? false, truncateThreshold = Math.max(Math.floor((options == null ? void 0 : options.truncateThreshold) ?? 0), 0), aLength = truncate22 ? Math.min(aLines.length, truncateThreshold) : aLines.length, bLength = truncate22 ? Math.min(bLines.length, truncateThreshold) : bLines.length, truncated = aLength !== aLines.length || bLength !== bLines.length, isCommon = (aIndex2, bIndex2) => aLines[aIndex2] === bLines[bIndex2], diffs = [], aIndex = 0, bIndex = 0;
  for (diffSequences(aLength, bLength, isCommon, (nCommon, aCommon, bCommon) => {
    for (; aIndex !== aCommon; aIndex += 1) diffs.push(new Diff$1(DIFF_DELETE$1, aLines[aIndex]));
    for (; bIndex !== bCommon; bIndex += 1) diffs.push(new Diff$1(DIFF_INSERT$1, bLines[bIndex]));
    for (; nCommon !== 0; nCommon -= 1, aIndex += 1, bIndex += 1) diffs.push(new Diff$1(DIFF_EQUAL$1, bLines[bIndex]));
  }); aIndex !== aLength; aIndex += 1) diffs.push(new Diff$1(DIFF_DELETE$1, aLines[aIndex]));
  for (; bIndex !== bLength; bIndex += 1) diffs.push(new Diff$1(DIFF_INSERT$1, bLines[bIndex]));
  return [diffs, truncated];
}
function getNewLineSymbol$1(string) {
  return string.includes(`\r
`) ? `\r
` : `
`;
}
function diffStrings$1(a2, b, options) {
  let truncate22 = (options == null ? void 0 : options.truncateThreshold) ?? false, truncateThreshold = Math.max(Math.floor((options == null ? void 0 : options.truncateThreshold) ?? 0), 0), aLength = a2.length, bLength = b.length;
  if (truncate22) {
    let aMultipleLines = a2.includes(`
`), bMultipleLines = b.includes(`
`), aNewLineSymbol = getNewLineSymbol$1(a2), bNewLineSymbol = getNewLineSymbol$1(b), _a2 = aMultipleLines ? `${a2.split(aNewLineSymbol, truncateThreshold).join(aNewLineSymbol)}
` : a2, _b = bMultipleLines ? `${b.split(bNewLineSymbol, truncateThreshold).join(bNewLineSymbol)}
` : b;
    aLength = _a2.length, bLength = _b.length;
  }
  let truncated = aLength !== a2.length || bLength !== b.length, isCommon = (aIndex2, bIndex2) => a2[aIndex2] === b[bIndex2], aIndex = 0, bIndex = 0, diffs = [];
  return diffSequences(aLength, bLength, isCommon, (nCommon, aCommon, bCommon) => {
    aIndex !== aCommon && diffs.push(new Diff$1(DIFF_DELETE$1, a2.slice(aIndex, aCommon))), bIndex !== bCommon && diffs.push(new Diff$1(DIFF_INSERT$1, b.slice(bIndex, bCommon))), aIndex = aCommon + nCommon, bIndex = bCommon + nCommon, diffs.push(new Diff$1(DIFF_EQUAL$1, b.slice(bCommon, bIndex)));
  }), aIndex !== aLength && diffs.push(new Diff$1(DIFF_DELETE$1, a2.slice(aIndex))), bIndex !== bLength && diffs.push(new Diff$1(DIFF_INSERT$1, b.slice(bIndex))), [diffs, truncated];
}
function concatenateRelevantDiffs$1(op, diffs, changeColor) {
  return diffs.reduce((reduced, diff2) => reduced + (diff2[0] === DIFF_EQUAL$1 ? diff2[1] : diff2[0] === op && diff2[1].length !== 0 ? changeColor(diff2[1]) : ""), "");
}
var ChangeBuffer$1 = class ChangeBuffer {
  constructor(op, changeColor) {
    __publicField(this, "op");
    __publicField(this, "line");
    __publicField(this, "lines");
    __publicField(this, "changeColor");
    this.op = op, this.line = [], this.lines = [], this.changeColor = changeColor;
  }
  pushSubstring(substring) {
    this.pushDiff(new Diff$1(this.op, substring));
  }
  pushLine() {
    this.lines.push(this.line.length !== 1 ? new Diff$1(this.op, concatenateRelevantDiffs$1(this.op, this.line, this.changeColor)) : this.line[0][0] === this.op ? this.line[0] : new Diff$1(this.op, this.line[0][1])), this.line.length = 0;
  }
  isLineEmpty() {
    return this.line.length === 0;
  }
  pushDiff(diff2) {
    this.line.push(diff2);
  }
  align(diff2) {
    let string = diff2[1];
    if (string.includes(`
`)) {
      let substrings = string.split(`
`), iLast = substrings.length - 1;
      substrings.forEach((substring, i) => {
        i < iLast ? (this.pushSubstring(substring), this.pushLine()) : substring.length !== 0 && this.pushSubstring(substring);
      });
    } else this.pushDiff(diff2);
  }
  moveLinesTo(lines) {
    this.isLineEmpty() || this.pushLine(), lines.push(...this.lines), this.lines.length = 0;
  }
}, CommonBuffer$1 = class CommonBuffer {
  constructor(deleteBuffer, insertBuffer) {
    __publicField(this, "deleteBuffer");
    __publicField(this, "insertBuffer");
    __publicField(this, "lines");
    this.deleteBuffer = deleteBuffer, this.insertBuffer = insertBuffer, this.lines = [];
  }
  pushDiffCommonLine(diff2) {
    this.lines.push(diff2);
  }
  pushDiffChangeLines(diff2) {
    let isDiffEmpty = diff2[1].length === 0;
    (!isDiffEmpty || this.deleteBuffer.isLineEmpty()) && this.deleteBuffer.pushDiff(diff2), (!isDiffEmpty || this.insertBuffer.isLineEmpty()) && this.insertBuffer.pushDiff(diff2);
  }
  flushChangeLines() {
    this.deleteBuffer.moveLinesTo(this.lines), this.insertBuffer.moveLinesTo(this.lines);
  }
  align(diff2) {
    let op = diff2[0], string = diff2[1];
    if (string.includes(`
`)) {
      let substrings = string.split(`
`), iLast = substrings.length - 1;
      substrings.forEach((substring, i) => {
        if (i === 0) {
          let subdiff = new Diff$1(op, substring);
          this.deleteBuffer.isLineEmpty() && this.insertBuffer.isLineEmpty() ? (this.flushChangeLines(), this.pushDiffCommonLine(subdiff)) : (this.pushDiffChangeLines(subdiff), this.flushChangeLines());
        } else i < iLast ? this.pushDiffCommonLine(new Diff$1(op, substring)) : substring.length !== 0 && this.pushDiffChangeLines(new Diff$1(op, substring));
      });
    } else this.pushDiffChangeLines(diff2);
  }
  getLines() {
    return this.flushChangeLines(), this.lines;
  }
};
function getAlignedDiffs$1(diffs, changeColor) {
  let deleteBuffer = new ChangeBuffer$1(DIFF_DELETE$1, changeColor), insertBuffer = new ChangeBuffer$1(DIFF_INSERT$1, changeColor), commonBuffer = new CommonBuffer$1(deleteBuffer, insertBuffer);
  return diffs.forEach((diff2) => {
    switch (diff2[0]) {
      case DIFF_DELETE$1:
        deleteBuffer.align(diff2);
        break;
      case DIFF_INSERT$1:
        insertBuffer.align(diff2);
        break;
      default:
        commonBuffer.align(diff2);
    }
  }), commonBuffer.getLines();
}
function hasCommonDiff$1(diffs, isMultiline) {
  if (isMultiline) {
    let iLast = diffs.length - 1;
    return diffs.some((diff2, i) => diff2[0] === DIFF_EQUAL$1 && (i !== iLast || diff2[1] !== `
`));
  }
  return diffs.some((diff2) => diff2[0] === DIFF_EQUAL$1);
}
function diffStringsUnified$1(a2, b, options) {
  if (a2 !== b && a2.length !== 0 && b.length !== 0) {
    let isMultiline = a2.includes(`
`) || b.includes(`
`), [diffs, truncated] = diffStringsRaw$1(isMultiline ? `${a2}
` : a2, isMultiline ? `${b}
` : b, true, options);
    if (hasCommonDiff$1(diffs, isMultiline)) {
      let optionsNormalized = normalizeDiffOptions$1(options), lines = getAlignedDiffs$1(diffs, optionsNormalized.changeColor);
      return printDiffLines$1(lines, truncated, optionsNormalized);
    }
  }
  return diffLinesUnified$1(a2.split(`
`), b.split(`
`), options);
}
function diffStringsRaw$1(a2, b, cleanup, options) {
  let [diffs, truncated] = diffStrings$1(a2, b, options);
  return diff_cleanupSemantic$1(diffs), [diffs, truncated];
}
function getCommonMessage$1(message, options) {
  let { commonColor } = normalizeDiffOptions$1(options);
  return commonColor(message);
}
var { AsymmetricMatcher: AsymmetricMatcher2$1, DOMCollection: DOMCollection2$1, DOMElement: DOMElement2$1, Immutable: Immutable2$1, ReactElement: ReactElement2$1, ReactTestComponent: ReactTestComponent2$1 } = plugins$1, PLUGINS2$1 = [ReactTestComponent2$1, ReactElement2$1, DOMElement2$1, DOMCollection2$1, Immutable2$1, AsymmetricMatcher2$1], FORMAT_OPTIONS$1 = { plugins: PLUGINS2$1 }, FALLBACK_FORMAT_OPTIONS$1 = { callToJSON: false, maxDepth: 10, plugins: PLUGINS2$1 };
function diff$1(a2, b, options) {
  if (Object.is(a2, b)) return "";
  let aType = getType3$1(a2), expectedType = aType, omitDifference = false;
  if (aType === "object" && typeof a2.asymmetricMatch == "function") {
    if (a2.$$typeof !== Symbol.for("jest.asymmetricMatcher") || typeof a2.getExpectedType != "function") return;
    expectedType = a2.getExpectedType(), omitDifference = expectedType === "string";
  }
  if (expectedType !== getType3$1(b)) {
    let { aAnnotation, aColor, aIndicator, bAnnotation, bColor, bIndicator } = normalizeDiffOptions$1(options), formatOptions = getFormatOptions$1(FALLBACK_FORMAT_OPTIONS$1, options), aDisplay = format$1(a2, formatOptions), bDisplay = format$1(b, formatOptions), aDiff = `${aColor(`${aIndicator} ${aAnnotation}:`)} 
${aDisplay}`, bDiff = `${bColor(`${bIndicator} ${bAnnotation}:`)} 
${bDisplay}`;
    return `${aDiff}

${bDiff}`;
  }
  if (!omitDifference) switch (aType) {
    case "string":
      return diffLinesUnified$1(a2.split(`
`), b.split(`
`), options);
    case "boolean":
    case "number":
      return comparePrimitive$1(a2, b, options);
    case "map":
      return compareObjects$1(sortMap$1(a2), sortMap$1(b), options);
    case "set":
      return compareObjects$1(sortSet$1(a2), sortSet$1(b), options);
    default:
      return compareObjects$1(a2, b, options);
  }
}
function comparePrimitive$1(a2, b, options) {
  let aFormat = format$1(a2, FORMAT_OPTIONS$1), bFormat = format$1(b, FORMAT_OPTIONS$1);
  return aFormat === bFormat ? "" : diffLinesUnified$1(aFormat.split(`
`), bFormat.split(`
`), options);
}
function sortMap$1(map) {
  return new Map(Array.from(map.entries()).sort());
}
function sortSet$1(set) {
  return new Set(Array.from(set.values()).sort());
}
function compareObjects$1(a2, b, options) {
  let difference, hasThrown = false;
  try {
    let formatOptions = getFormatOptions$1(FORMAT_OPTIONS$1, options);
    difference = getObjectsDifference$1(a2, b, formatOptions, options);
  } catch {
    hasThrown = true;
  }
  let noDiffMessage = getCommonMessage$1(NO_DIFF_MESSAGE$1, options);
  if (difference === void 0 || difference === noDiffMessage) {
    let formatOptions = getFormatOptions$1(FALLBACK_FORMAT_OPTIONS$1, options);
    difference = getObjectsDifference$1(a2, b, formatOptions, options), difference !== noDiffMessage && !hasThrown && (difference = `${getCommonMessage$1(SIMILAR_MESSAGE$1, options)}

${difference}`);
  }
  return difference;
}
function getFormatOptions$1(formatOptions, options) {
  let { compareKeys } = normalizeDiffOptions$1(options);
  return { ...formatOptions, compareKeys };
}
function getObjectsDifference$1(a2, b, formatOptions, options) {
  let formatOptionsZeroIndent = { ...formatOptions, indent: 0 }, aCompare = format$1(a2, formatOptionsZeroIndent), bCompare = format$1(b, formatOptionsZeroIndent);
  if (aCompare === bCompare) return getCommonMessage$1(NO_DIFF_MESSAGE$1, options);
  {
    let aDisplay = format$1(a2, formatOptions), bDisplay = format$1(b, formatOptions);
    return diffLinesUnified2$1(aDisplay.split(`
`), bDisplay.split(`
`), aCompare.split(`
`), bCompare.split(`
`), options);
  }
}
var MAX_DIFF_STRING_LENGTH$1 = 2e4;
function isAsymmetricMatcher$1(data) {
  return getType2$1(data) === "Object" && typeof data.asymmetricMatch == "function";
}
function isReplaceable$1(obj1, obj2) {
  let obj1Type = getType2$1(obj1), obj2Type = getType2$1(obj2);
  return obj1Type === obj2Type && (obj1Type === "Object" || obj1Type === "Array");
}
function printDiffOrStringify$1(expected, received, options) {
  let { aAnnotation, bAnnotation } = normalizeDiffOptions$1(options);
  if (typeof expected == "string" && typeof received == "string" && expected.length > 0 && received.length > 0 && expected.length <= MAX_DIFF_STRING_LENGTH$1 && received.length <= MAX_DIFF_STRING_LENGTH$1 && expected !== received) {
    if (expected.includes(`
`) || received.includes(`
`)) return diffStringsUnified$1(received, expected, options);
    let [diffs] = diffStringsRaw$1(received, expected), hasCommonDiff2 = diffs.some((diff2) => diff2[0] === DIFF_EQUAL$1), printLabel = getLabelPrinter$1(aAnnotation, bAnnotation), expectedLine = printLabel(aAnnotation) + printExpected$1(getCommonAndChangedSubstrings$1(diffs, DIFF_DELETE$1, hasCommonDiff2)), receivedLine = printLabel(bAnnotation) + printReceived$1(getCommonAndChangedSubstrings$1(diffs, DIFF_INSERT$1, hasCommonDiff2));
    return `${expectedLine}
${receivedLine}`;
  }
  let clonedExpected = deepClone$1(expected, { forceWritable: true }), clonedReceived = deepClone$1(received, { forceWritable: true }), { replacedExpected, replacedActual } = replaceAsymmetricMatcher$1(clonedExpected, clonedReceived);
  return diff$1(replacedExpected, replacedActual, options);
}
function replaceAsymmetricMatcher$1(actual, expected, actualReplaced = /* @__PURE__ */ new WeakSet(), expectedReplaced = /* @__PURE__ */ new WeakSet()) {
  return isReplaceable$1(actual, expected) ? actualReplaced.has(actual) || expectedReplaced.has(expected) ? { replacedActual: actual, replacedExpected: expected } : (actualReplaced.add(actual), expectedReplaced.add(expected), getOwnProperties$1(expected).forEach((key) => {
    let expectedValue = expected[key], actualValue = actual[key];
    if (isAsymmetricMatcher$1(expectedValue)) expectedValue.asymmetricMatch(actualValue) && (actual[key] = expectedValue);
    else if (isAsymmetricMatcher$1(actualValue)) actualValue.asymmetricMatch(expectedValue) && (expected[key] = actualValue);
    else if (isReplaceable$1(actualValue, expectedValue)) {
      let replaced = replaceAsymmetricMatcher$1(actualValue, expectedValue, actualReplaced, expectedReplaced);
      actual[key] = replaced.replacedActual, expected[key] = replaced.replacedExpected;
    }
  }), { replacedActual: actual, replacedExpected: expected }) : { replacedActual: actual, replacedExpected: expected };
}
function getLabelPrinter$1(...strings) {
  let maxLength = strings.reduce((max, string) => string.length > max ? string.length : max, 0);
  return (string) => `${string}: ${" ".repeat(maxLength - string.length)}`;
}
var SPACE_SYMBOL$1 = "·";
function replaceTrailingSpaces$1(text) {
  return text.replace(/\s+$/gm, (spaces) => SPACE_SYMBOL$1.repeat(spaces.length));
}
function printReceived$1(object) {
  return f2$1.red(replaceTrailingSpaces$1(stringify$1(object)));
}
function printExpected$1(value) {
  return f2$1.green(replaceTrailingSpaces$1(stringify$1(value)));
}
function getCommonAndChangedSubstrings$1(diffs, op, hasCommonDiff2) {
  return diffs.reduce((reduced, diff2) => reduced + (diff2[0] === DIFF_EQUAL$1 ? diff2[1] : diff2[0] === op ? hasCommonDiff2 ? f2$1.inverse(diff2[1]) : diff2[1] : ""), "");
}
var IS_RECORD_SYMBOL$1 = "@@__IMMUTABLE_RECORD__@@", IS_COLLECTION_SYMBOL$1 = "@@__IMMUTABLE_ITERABLE__@@";
function isImmutable$1(v) {
  return v && (v[IS_COLLECTION_SYMBOL$1] || v[IS_RECORD_SYMBOL$1]);
}
var OBJECT_PROTO$1 = Object.getPrototypeOf({});
function getUnserializableMessage$1(err) {
  return err instanceof Error ? `<unserializable>: ${err.message}` : typeof err == "string" ? `<unserializable>: ${err}` : "<unserializable>";
}
function serializeValue$1(val, seen = /* @__PURE__ */ new WeakMap()) {
  if (!val || typeof val == "string") return val;
  if (typeof val == "function") return `Function<${val.name || "anonymous"}>`;
  if (typeof val == "symbol") return val.toString();
  if (typeof val != "object") return val;
  if (isImmutable$1(val)) return serializeValue$1(val.toJSON(), seen);
  if (val instanceof Promise || val.constructor && val.constructor.prototype === "AsyncFunction") return "Promise";
  if (typeof Element < "u" && val instanceof Element) return val.tagName;
  if (typeof val.asymmetricMatch == "function") return `${val.toString()} ${format2$1(val.sample)}`;
  if (typeof val.toJSON == "function") return serializeValue$1(val.toJSON(), seen);
  if (seen.has(val)) return seen.get(val);
  if (Array.isArray(val)) {
    let clone2 = new Array(val.length);
    return seen.set(val, clone2), val.forEach((e, i) => {
      try {
        clone2[i] = serializeValue$1(e, seen);
      } catch (err) {
        clone2[i] = getUnserializableMessage$1(err);
      }
    }), clone2;
  } else {
    let clone2 = /* @__PURE__ */ Object.create(null);
    seen.set(val, clone2);
    let obj = val;
    for (; obj && obj !== OBJECT_PROTO$1; ) Object.getOwnPropertyNames(obj).forEach((key) => {
      if (!(key in clone2)) try {
        clone2[key] = serializeValue$1(val[key], seen);
      } catch (err) {
        delete clone2[key], clone2[key] = getUnserializableMessage$1(err);
      }
    }), obj = Object.getPrototypeOf(obj);
    return clone2;
  }
}
function normalizeErrorMessage$1(message) {
  return message.replace(/__(vite_ssr_import|vi_import)_\d+__\./g, "");
}
function processError$1(_err, diffOptions, seen = /* @__PURE__ */ new WeakSet()) {
  if (!_err || typeof _err != "object") return { message: String(_err) };
  let err = _err;
  err.stack && (err.stackStr = String(err.stack)), err.name && (err.nameStr = String(err.name)), (err.showDiff || err.showDiff === void 0 && err.expected !== void 0 && err.actual !== void 0) && (err.diff = printDiffOrStringify$1(err.actual, err.expected, { ...diffOptions, ...err.diffOptions })), typeof err.expected != "string" && (err.expected = stringify$1(err.expected, 10)), typeof err.actual != "string" && (err.actual = stringify$1(err.actual, 10));
  try {
    typeof err.message == "string" && (err.message = normalizeErrorMessage$1(err.message));
  } catch {
  }
  try {
    !seen.has(err) && typeof err.cause == "object" && (seen.add(err), err.cause = processError$1(err.cause, diffOptions, seen));
  } catch {
  }
  try {
    return serializeValue$1(err);
  } catch (e) {
    return serializeValue$1(new Error(`Failed to fully serialize error: ${e == null ? void 0 : e.message}
Inner error message: ${err == null ? void 0 : err.message}`));
  }
}
var CallStates = ((CallStates2) => (CallStates2.DONE = "done", CallStates2.ERROR = "error", CallStates2.ACTIVE = "active", CallStates2.WAITING = "waiting", CallStates2))(CallStates || {});
var EVENTS = { CALL: "storybook/instrumenter/call", SYNC: "storybook/instrumenter/sync", START: "storybook/instrumenter/start", BACK: "storybook/instrumenter/back", GOTO: "storybook/instrumenter/goto", NEXT: "storybook/instrumenter/next", END: "storybook/instrumenter/end" }, controlsDisabled = { start: false, back: false, goto: false, next: false, end: false }, alreadyCompletedException = new Error("This function ran after the play function completed. Did you forget to `await` it?"), isObject$1 = (o) => Object.prototype.toString.call(o) === "[object Object]", isModule = (o) => Object.prototype.toString.call(o) === "[object Module]", isInstrumentable = (o) => {
  if (!isObject$1(o) && !isModule(o)) return false;
  if (o.constructor === void 0) return true;
  let proto = o.constructor.prototype;
  return !!isObject$1(proto);
}, construct = (obj) => {
  try {
    return new obj.constructor();
  } catch {
    return {};
  }
}, getInitialState = () => ({ renderPhase: void 0, isDebugging: false, isPlaying: false, isLocked: false, cursor: 0, calls: [], shadowCalls: [], callRefsByResult: /* @__PURE__ */ new Map(), chainedCallIds: /* @__PURE__ */ new Set(), ancestors: [], playUntil: void 0, resolvers: {}, syncTimeout: void 0 }), getRetainedState = (state, isDebugging = false) => {
  let calls = (isDebugging ? state.shadowCalls : state.calls).filter((call2) => call2.retain);
  if (!calls.length) return;
  let callRefsByResult = new Map(Array.from(state.callRefsByResult.entries()).filter(([, ref]) => ref.retain));
  return { cursor: calls.length, calls, callRefsByResult };
}, Instrumenter = class {
  constructor() {
    var _a2;
    this.initialized = false;
    this.channel = addons.getChannel(), this.state = ((_a2 = global$2.window) == null ? void 0 : _a2.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__) || {};
    let resetState = ({ storyId, isPlaying = true, isDebugging = false }) => {
      let state = this.getState(storyId);
      this.setState(storyId, { ...getInitialState(), ...getRetainedState(state, isDebugging), shadowCalls: isDebugging ? state.shadowCalls : [], chainedCallIds: isDebugging ? state.chainedCallIds : /* @__PURE__ */ new Set(), playUntil: isDebugging ? state.playUntil : void 0, isPlaying, isDebugging }), this.sync(storyId);
    };
    this.channel.on(FORCE_REMOUNT, resetState), this.channel.on(STORY_RENDER_PHASE_CHANGED, ({ storyId, newPhase }) => {
      let { isDebugging } = this.getState(storyId);
      this.setState(storyId, { renderPhase: newPhase }), newPhase === "preparing" && isDebugging && resetState({ storyId }), newPhase === "playing" && resetState({ storyId, isDebugging }), newPhase === "played" && this.setState(storyId, { isLocked: false, isPlaying: false, isDebugging: false }), newPhase === "errored" && this.setState(storyId, { isLocked: false, isPlaying: false });
    }), this.channel.on(SET_CURRENT_STORY, () => {
      this.initialized ? this.cleanup() : this.initialized = true;
    });
    let start = ({ storyId, playUntil }) => {
      this.getState(storyId).isDebugging || this.setState(storyId, ({ calls }) => ({ calls: [], shadowCalls: calls.map((call2) => ({ ...call2, status: "waiting" })), isDebugging: true }));
      let log = this.getLog(storyId);
      this.setState(storyId, ({ shadowCalls }) => {
        var _a3;
        if (playUntil || !log.length) return { playUntil };
        let firstRowIndex = shadowCalls.findIndex((call2) => call2.id === log[0].callId);
        return { playUntil: (_a3 = shadowCalls.slice(0, firstRowIndex).filter((call2) => call2.interceptable && !call2.ancestors.length).slice(-1)[0]) == null ? void 0 : _a3.id };
      }), this.channel.emit(FORCE_REMOUNT, { storyId, isDebugging: true });
    }, back = ({ storyId }) => {
      var _a3;
      let log = this.getLog(storyId).filter((call2) => !call2.ancestors.length), last = log.reduceRight((res, item, index) => res >= 0 || item.status === "waiting" ? res : index, -1);
      start({ storyId, playUntil: (_a3 = log[last - 1]) == null ? void 0 : _a3.callId });
    }, goto = ({ storyId, callId }) => {
      var _a3;
      let { calls, shadowCalls, resolvers } = this.getState(storyId), call2 = calls.find(({ id }) => id === callId), shadowCall = shadowCalls.find(({ id }) => id === callId);
      if (!call2 && shadowCall && Object.values(resolvers).length > 0) {
        let nextId = (_a3 = this.getLog(storyId).find((c) => c.status === "waiting")) == null ? void 0 : _a3.callId;
        shadowCall.id !== nextId && this.setState(storyId, { playUntil: shadowCall.id }), Object.values(resolvers).forEach((resolve) => resolve());
      } else start({ storyId, playUntil: callId });
    }, next = ({ storyId }) => {
      var _a3;
      let { resolvers } = this.getState(storyId);
      if (Object.values(resolvers).length > 0) Object.values(resolvers).forEach((resolve) => resolve());
      else {
        let nextId = (_a3 = this.getLog(storyId).find((c) => c.status === "waiting")) == null ? void 0 : _a3.callId;
        nextId ? start({ storyId, playUntil: nextId }) : end({ storyId });
      }
    }, end = ({ storyId }) => {
      this.setState(storyId, { playUntil: void 0, isDebugging: false }), Object.values(this.getState(storyId).resolvers).forEach((resolve) => resolve());
    };
    this.channel.on(EVENTS.START, start), this.channel.on(EVENTS.BACK, back), this.channel.on(EVENTS.GOTO, goto), this.channel.on(EVENTS.NEXT, next), this.channel.on(EVENTS.END, end);
  }
  getState(storyId) {
    return this.state[storyId] || getInitialState();
  }
  setState(storyId, update) {
    var _a2;
    let state = this.getState(storyId), patch = typeof update == "function" ? update(state) : update;
    this.state = { ...this.state, [storyId]: { ...state, ...patch } }, ((_a2 = global$2.window) == null ? void 0 : _a2.parent) && (global$2.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__ = this.state);
  }
  cleanup() {
    var _a2;
    this.state = Object.entries(this.state).reduce((acc, [storyId, state]) => {
      let retainedState = getRetainedState(state);
      return retainedState && (acc[storyId] = Object.assign(getInitialState(), retainedState)), acc;
    }, {});
    let payload = { controlStates: controlsDisabled, logItems: [] };
    this.channel.emit(EVENTS.SYNC, payload), ((_a2 = global$2.window) == null ? void 0 : _a2.parent) && (global$2.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__ = this.state);
  }
  getLog(storyId) {
    let { calls, shadowCalls } = this.getState(storyId), merged = [...shadowCalls];
    calls.forEach((call2, index) => {
      merged[index] = call2;
    });
    let seen = /* @__PURE__ */ new Set();
    return merged.reduceRight((acc, call2) => (call2.args.forEach((arg) => {
      (arg == null ? void 0 : arg.__callId__) && seen.add(arg.__callId__);
    }), call2.path.forEach((node) => {
      node.__callId__ && seen.add(node.__callId__);
    }), (call2.interceptable || call2.exception) && !seen.has(call2.id) && (acc.unshift({ callId: call2.id, status: call2.status, ancestors: call2.ancestors }), seen.add(call2.id)), acc), []);
  }
  instrument(obj, options, depth = 0) {
    if (!isInstrumentable(obj)) return obj;
    let { mutate = false, path = [] } = options, keys2 = options.getKeys ? options.getKeys(obj, depth) : Object.keys(obj);
    return depth += 1, keys2.reduce((acc, key) => {
      let descriptor = getPropertyDescriptor(obj, key);
      if (typeof (descriptor == null ? void 0 : descriptor.get) == "function") {
        let getter = () => {
          var _a2, _b;
          return (_b = (_a2 = descriptor == null ? void 0 : descriptor.get) == null ? void 0 : _a2.bind(obj)) == null ? void 0 : _b();
        };
        return Object.defineProperty(acc, key, { get: () => this.instrument(getter(), { ...options, path: path.concat(key) }, depth) }), acc;
      }
      let value = obj[key];
      return typeof value != "function" ? (acc[key] = this.instrument(value, { ...options, path: path.concat(key) }, depth), acc) : "__originalFn__" in value && typeof value.__originalFn__ == "function" ? (acc[key] = value, acc) : (acc[key] = (...args) => this.track(key, value, obj, args, options), acc[key].__originalFn__ = value, Object.defineProperty(acc[key], "name", { value: key, writable: false }), Object.keys(value).length > 0 && Object.assign(acc[key], this.instrument({ ...value }, { ...options, path: path.concat(key) }, depth)), acc);
    }, mutate ? obj : construct(obj));
  }
  track(method, fn3, object, args, options) {
    var _a2, _b, _c, _d;
    let storyId = ((_a2 = args == null ? void 0 : args[0]) == null ? void 0 : _a2.__storyId__) || ((_d = (_c = (_b = global$2.__STORYBOOK_PREVIEW__) == null ? void 0 : _b.selectionStore) == null ? void 0 : _c.selection) == null ? void 0 : _d.storyId), { cursor, ancestors } = this.getState(storyId);
    this.setState(storyId, { cursor: cursor + 1 });
    let id = `${ancestors.slice(-1)[0] || storyId} [${cursor}] ${method}`, { path = [], intercept = false, retain = false } = options, interceptable = typeof intercept == "function" ? intercept(method, path) : intercept, call2 = { id, cursor, storyId, ancestors, path, method, args, interceptable, retain }, result = (interceptable && !ancestors.length ? this.intercept : this.invoke).call(this, fn3, object, call2, options);
    return this.instrument(result, { ...options, mutate: true, path: [{ __callId__: call2.id }] });
  }
  intercept(fn3, object, call2, options) {
    let { chainedCallIds, isDebugging, playUntil } = this.getState(call2.storyId), isChainedUpon = chainedCallIds.has(call2.id);
    return !isDebugging || isChainedUpon || playUntil ? (playUntil === call2.id && this.setState(call2.storyId, { playUntil: void 0 }), this.invoke(fn3, object, call2, options)) : new Promise((resolve) => {
      this.setState(call2.storyId, ({ resolvers }) => ({ isLocked: false, resolvers: { ...resolvers, [call2.id]: resolve } }));
    }).then(() => (this.setState(call2.storyId, (state) => {
      let { [call2.id]: _, ...resolvers } = state.resolvers;
      return { isLocked: true, resolvers };
    }), this.invoke(fn3, object, call2, options)));
  }
  invoke(fn3, object, call2, options) {
    let { callRefsByResult, renderPhase } = this.getState(call2.storyId), maximumDepth = 25, serializeValues = (value, depth, seen) => {
      var _a2, _b, _c;
      if (seen.includes(value)) return "[Circular]";
      if (seen = [...seen, value], depth > maximumDepth) return "...";
      if (callRefsByResult.has(value)) return callRefsByResult.get(value);
      if (value instanceof Array) return value.map((it) => serializeValues(it, ++depth, seen));
      if (value instanceof Date) return { __date__: { value: value.toISOString() } };
      if (value instanceof Error) {
        let { name, message, stack } = value;
        return { __error__: { name, message, stack } };
      }
      if (value instanceof RegExp) {
        let { flags, source } = value;
        return { __regexp__: { flags, source } };
      }
      if (value instanceof ((_a2 = global$2.window) == null ? void 0 : _a2.HTMLElement)) {
        let { prefix, localName, id, classList, innerText } = value, classNames = Array.from(classList);
        return { __element__: { prefix, localName, id, classNames, innerText } };
      }
      return typeof value == "function" ? { __function__: { name: "getMockName" in value ? value.getMockName() : value.name } } : typeof value == "symbol" ? { __symbol__: { description: value.description } } : typeof value == "object" && ((_b = value == null ? void 0 : value.constructor) == null ? void 0 : _b.name) && ((_c = value == null ? void 0 : value.constructor) == null ? void 0 : _c.name) !== "Object" ? { __class__: { name: value.constructor.name } } : Object.prototype.toString.call(value) === "[object Object]" ? Object.fromEntries(Object.entries(value).map(([key, val]) => [key, serializeValues(val, ++depth, seen)])) : value;
    }, info = { ...call2, args: call2.args.map((arg) => serializeValues(arg, 0, [])) };
    call2.path.forEach((ref) => {
      (ref == null ? void 0 : ref.__callId__) && this.setState(call2.storyId, ({ chainedCallIds }) => ({ chainedCallIds: new Set(Array.from(chainedCallIds).concat(ref.__callId__)) }));
    });
    let handleException = (e) => {
      if (e instanceof Error) {
        let { name, message, stack, callId = call2.id } = e, { showDiff = void 0, diff: diff2 = void 0, actual = void 0, expected = void 0 } = e.name === "AssertionError" ? processError$1(e) : e, exception = { name, message, stack, callId, showDiff, diff: diff2, actual, expected };
        if (this.update({ ...info, status: "error", exception }), this.setState(call2.storyId, (state) => ({ callRefsByResult: new Map([...Array.from(state.callRefsByResult.entries()), [e, { __callId__: call2.id, retain: call2.retain }]]) })), call2.ancestors.length) throw Object.prototype.hasOwnProperty.call(e, "callId") || Object.defineProperty(e, "callId", { value: call2.id }), e;
      }
      throw e;
    };
    try {
      if (renderPhase === "played" && !call2.retain) throw alreadyCompletedException;
      let finalArgs = (options.getArgs ? options.getArgs(call2, this.getState(call2.storyId)) : call2.args).map((arg) => typeof arg != "function" || Object.keys(arg).length ? arg : (...args) => {
        let { cursor, ancestors } = this.getState(call2.storyId);
        this.setState(call2.storyId, { cursor: 0, ancestors: [...ancestors, call2.id] });
        let restore = () => this.setState(call2.storyId, { cursor, ancestors }), willRestore = false;
        try {
          let res = arg(...args);
          return res instanceof Promise ? (willRestore = true, res.finally(restore)) : res;
        } finally {
          willRestore || restore();
        }
      }), result = fn3.apply(object, finalArgs);
      return result && ["object", "function", "symbol"].includes(typeof result) && this.setState(call2.storyId, (state) => ({ callRefsByResult: new Map([...Array.from(state.callRefsByResult.entries()), [result, { __callId__: call2.id, retain: call2.retain }]]) })), this.update({ ...info, status: result instanceof Promise ? "active" : "done" }), result instanceof Promise ? result.then((value) => (this.update({ ...info, status: "done" }), value), handleException) : result;
    } catch (e) {
      return handleException(e);
    }
  }
  update(call2) {
    this.channel.emit(EVENTS.CALL, call2), this.setState(call2.storyId, ({ calls }) => {
      let callsById = calls.concat(call2).reduce((a2, c) => Object.assign(a2, { [c.id]: c }), {});
      return { calls: Object.values(callsById).sort((a2, b) => a2.id.localeCompare(b.id, void 0, { numeric: true })) };
    }), this.sync(call2.storyId);
  }
  sync(storyId) {
    let synchronize = () => {
      var _a2;
      let { isLocked, isPlaying } = this.getState(storyId), logItems = this.getLog(storyId), pausedAt = (_a2 = logItems.filter(({ ancestors }) => !ancestors.length).find((item) => item.status === "waiting")) == null ? void 0 : _a2.callId, hasActive = logItems.some((item) => item.status === "active");
      if (isLocked || hasActive || logItems.length === 0) {
        let payload2 = { controlStates: controlsDisabled, logItems };
        this.channel.emit(EVENTS.SYNC, payload2);
        return;
      }
      let hasPrevious = logItems.some((item) => item.status === "done" || item.status === "error"), payload = { controlStates: { start: hasPrevious, back: hasPrevious, goto: true, next: isPlaying, end: isPlaying }, logItems, pausedAt };
      this.channel.emit(EVENTS.SYNC, payload);
    };
    this.setState(storyId, ({ syncTimeout }) => (clearTimeout(syncTimeout), { syncTimeout: setTimeout(synchronize, 0) }));
  }
};
function instrument(obj, options = {}) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  try {
    let forceInstrument = false, skipInstrument = false;
    return ((_c = (_b = (_a2 = global$2.window) == null ? void 0 : _a2.location) == null ? void 0 : _b.search) == null ? void 0 : _c.includes("instrument=true")) ? forceInstrument = true : ((_f = (_e = (_d = global$2.window) == null ? void 0 : _d.location) == null ? void 0 : _e.search) == null ? void 0 : _f.includes("instrument=false")) && (skipInstrument = true), ((_g = global$2.window) == null ? void 0 : _g.parent) === global$2.window && !forceInstrument || skipInstrument ? obj : (global$2.window && !global$2.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__ && (global$2.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__ = new Instrumenter()), ((_h = global$2.window) == null ? void 0 : _h.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__).instrument(obj, options));
  } catch (e) {
    return once$1.warn(e), obj;
  }
}
function getPropertyDescriptor(obj, propName) {
  let target = obj;
  for (; target != null; ) {
    let descriptor = Object.getOwnPropertyDescriptor(target, propName);
    if (descriptor) return descriptor;
    target = Object.getPrototypeOf(target);
  }
}
var define_process_env_default = {};
const { global: global$1 } = __STORYBOOK_MODULE_GLOBAL__;
const { once } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = ((x2) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(x2, { get: (a2, b) => (typeof require < "u" ? require : a2)[b] }) : x2)(function(x2) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all) __defProp2(target, name, { get: all[name], enumerable: true });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target, mod));
var require_min_indent = __commonJS({ "../../node_modules/min-indent/index.js"(exports, module2) {
  module2.exports = (string) => {
    let match = string.match(/^[ \t]*(?=\S)/gm);
    return match ? match.reduce((r, a2) => Math.min(r, a2.length), 1 / 0) : 0;
  };
} });
var require_strip_indent = __commonJS({ "../../node_modules/strip-indent/index.js"(exports, module2) {
  var minIndent = require_min_indent();
  module2.exports = (string) => {
    let indent = minIndent(string);
    if (indent === 0) return string;
    let regex = new RegExp(`^[ \\t]{${indent}}`, "gm");
    return string.replace(regex, "");
  };
} });
var require_indent_string = __commonJS({ "../../node_modules/indent-string/index.js"(exports, module2) {
  module2.exports = (string, count = 1, options) => {
    if (options = { indent: " ", includeEmptyLines: false, ...options }, typeof string != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof string}\``);
    if (typeof count != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof count}\``);
    if (typeof options.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof options.indent}\``);
    if (count === 0) return string;
    let regex = options.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
    return string.replace(regex, options.indent.repeat(count));
  };
} });
var require_redent = __commonJS({ "../../node_modules/redent/index.js"(exports, module2) {
  var stripIndent = require_strip_indent(), indentString = require_indent_string();
  module2.exports = (string, count = 0, options) => indentString(stripIndent(string), count, options);
} });
var require_iteratorProxy = __commonJS({ "../../node_modules/aria-query/lib/util/iteratorProxy.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  function iteratorProxy() {
    var values = this, index = 0, iter = { "@@iterator": function() {
      return iter;
    }, next: function() {
      if (index < values.length) {
        var value = values[index];
        return index = index + 1, { done: false, value };
      } else return { done: true };
    } };
    return iter;
  }
  var _default2 = iteratorProxy;
  exports.default = _default2;
} });
var require_iterationDecorator = __commonJS({ "../../node_modules/aria-query/lib/util/iterationDecorator.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = iterationDecorator;
  var _iteratorProxy = _interopRequireDefault(require_iteratorProxy());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof5(obj) {
    "@babel/helpers - typeof";
    return _typeof5 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof5(obj);
  }
  function iterationDecorator(collection, entries) {
    return typeof Symbol == "function" && _typeof5(Symbol.iterator) === "symbol" && Object.defineProperty(collection, Symbol.iterator, { value: _iteratorProxy.default.bind(entries) }), collection;
  }
} });
var require_ariaPropsMap = __commonJS({ "../../node_modules/aria-query/lib/ariaPropsMap.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol < "u" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i != null) {
      var _arr = [], _n = true, _d = false, _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = true) ;
      } catch (err) {
        _d = true, _e = err;
      } finally {
        try {
          !_n && _i.return != null && _i.return();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol < "u" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
        it && (o = it);
        var i = 0, F = function() {
        };
        return { s: F, n: function() {
          return i >= o.length ? { done: true } : { done: false, value: o[i++] };
        }, e: function(_e2) {
          throw _e2;
        }, f: F };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function() {
      it = it.call(o);
    }, n: function() {
      var step = it.next();
      return normalCompletion = step.done, step;
    }, e: function(_e3) {
      didErr = true, err = _e3;
    }, f: function() {
      try {
        !normalCompletion && it.return != null && it.return();
      } finally {
        if (didErr) throw err;
      }
    } };
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (o) {
      if (typeof o == "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
  }
  function _arrayLikeToArray(arr, len) {
    (len == null || len > arr.length) && (len = arr.length);
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  var properties = [["aria-activedescendant", { type: "id" }], ["aria-atomic", { type: "boolean" }], ["aria-autocomplete", { type: "token", values: ["inline", "list", "both", "none"] }], ["aria-braillelabel", { type: "string" }], ["aria-brailleroledescription", { type: "string" }], ["aria-busy", { type: "boolean" }], ["aria-checked", { type: "tristate" }], ["aria-colcount", { type: "integer" }], ["aria-colindex", { type: "integer" }], ["aria-colspan", { type: "integer" }], ["aria-controls", { type: "idlist" }], ["aria-current", { type: "token", values: ["page", "step", "location", "date", "time", true, false] }], ["aria-describedby", { type: "idlist" }], ["aria-description", { type: "string" }], ["aria-details", { type: "id" }], ["aria-disabled", { type: "boolean" }], ["aria-dropeffect", { type: "tokenlist", values: ["copy", "execute", "link", "move", "none", "popup"] }], ["aria-errormessage", { type: "id" }], ["aria-expanded", { type: "boolean", allowundefined: true }], ["aria-flowto", { type: "idlist" }], ["aria-grabbed", { type: "boolean", allowundefined: true }], ["aria-haspopup", { type: "token", values: [false, true, "menu", "listbox", "tree", "grid", "dialog"] }], ["aria-hidden", { type: "boolean", allowundefined: true }], ["aria-invalid", { type: "token", values: ["grammar", false, "spelling", true] }], ["aria-keyshortcuts", { type: "string" }], ["aria-label", { type: "string" }], ["aria-labelledby", { type: "idlist" }], ["aria-level", { type: "integer" }], ["aria-live", { type: "token", values: ["assertive", "off", "polite"] }], ["aria-modal", { type: "boolean" }], ["aria-multiline", { type: "boolean" }], ["aria-multiselectable", { type: "boolean" }], ["aria-orientation", { type: "token", values: ["vertical", "undefined", "horizontal"] }], ["aria-owns", { type: "idlist" }], ["aria-placeholder", { type: "string" }], ["aria-posinset", { type: "integer" }], ["aria-pressed", { type: "tristate" }], ["aria-readonly", { type: "boolean" }], ["aria-relevant", { type: "tokenlist", values: ["additions", "all", "removals", "text"] }], ["aria-required", { type: "boolean" }], ["aria-roledescription", { type: "string" }], ["aria-rowcount", { type: "integer" }], ["aria-rowindex", { type: "integer" }], ["aria-rowspan", { type: "integer" }], ["aria-selected", { type: "boolean", allowundefined: true }], ["aria-setsize", { type: "integer" }], ["aria-sort", { type: "token", values: ["ascending", "descending", "none", "other"] }], ["aria-valuemax", { type: "number" }], ["aria-valuemin", { type: "number" }], ["aria-valuenow", { type: "number" }], ["aria-valuetext", { type: "string" }]], ariaPropsMap = { entries: function() {
    return properties;
  }, forEach: function(fn3) {
    var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, _iterator = _createForOfIteratorHelper(properties), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], values = _step$value[1];
        fn3.call(thisArg, values, key, properties);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }, get: function(key) {
    var item = properties.find(function(tuple) {
      return tuple[0] === key;
    });
    return item && item[1];
  }, has: function(key) {
    return !!ariaPropsMap.get(key);
  }, keys: function() {
    return properties.map(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
      return key;
    });
  }, values: function() {
    return properties.map(function(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
      return values2;
    });
  } }, _default2 = (0, _iterationDecorator.default)(ariaPropsMap, ariaPropsMap.entries());
  exports.default = _default2;
} });
var require_domMap = __commonJS({ "../../node_modules/aria-query/lib/domMap.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol < "u" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i != null) {
      var _arr = [], _n = true, _d = false, _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = true) ;
      } catch (err) {
        _d = true, _e = err;
      } finally {
        try {
          !_n && _i.return != null && _i.return();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol < "u" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
        it && (o = it);
        var i = 0, F = function() {
        };
        return { s: F, n: function() {
          return i >= o.length ? { done: true } : { done: false, value: o[i++] };
        }, e: function(_e2) {
          throw _e2;
        }, f: F };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function() {
      it = it.call(o);
    }, n: function() {
      var step = it.next();
      return normalCompletion = step.done, step;
    }, e: function(_e3) {
      didErr = true, err = _e3;
    }, f: function() {
      try {
        !normalCompletion && it.return != null && it.return();
      } finally {
        if (didErr) throw err;
      }
    } };
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (o) {
      if (typeof o == "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
  }
  function _arrayLikeToArray(arr, len) {
    (len == null || len > arr.length) && (len = arr.length);
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  var dom = [["a", { reserved: false }], ["abbr", { reserved: false }], ["acronym", { reserved: false }], ["address", { reserved: false }], ["applet", { reserved: false }], ["area", { reserved: false }], ["article", { reserved: false }], ["aside", { reserved: false }], ["audio", { reserved: false }], ["b", { reserved: false }], ["base", { reserved: true }], ["bdi", { reserved: false }], ["bdo", { reserved: false }], ["big", { reserved: false }], ["blink", { reserved: false }], ["blockquote", { reserved: false }], ["body", { reserved: false }], ["br", { reserved: false }], ["button", { reserved: false }], ["canvas", { reserved: false }], ["caption", { reserved: false }], ["center", { reserved: false }], ["cite", { reserved: false }], ["code", { reserved: false }], ["col", { reserved: true }], ["colgroup", { reserved: true }], ["content", { reserved: false }], ["data", { reserved: false }], ["datalist", { reserved: false }], ["dd", { reserved: false }], ["del", { reserved: false }], ["details", { reserved: false }], ["dfn", { reserved: false }], ["dialog", { reserved: false }], ["dir", { reserved: false }], ["div", { reserved: false }], ["dl", { reserved: false }], ["dt", { reserved: false }], ["em", { reserved: false }], ["embed", { reserved: false }], ["fieldset", { reserved: false }], ["figcaption", { reserved: false }], ["figure", { reserved: false }], ["font", { reserved: false }], ["footer", { reserved: false }], ["form", { reserved: false }], ["frame", { reserved: false }], ["frameset", { reserved: false }], ["h1", { reserved: false }], ["h2", { reserved: false }], ["h3", { reserved: false }], ["h4", { reserved: false }], ["h5", { reserved: false }], ["h6", { reserved: false }], ["head", { reserved: true }], ["header", { reserved: false }], ["hgroup", { reserved: false }], ["hr", { reserved: false }], ["html", { reserved: true }], ["i", { reserved: false }], ["iframe", { reserved: false }], ["img", { reserved: false }], ["input", { reserved: false }], ["ins", { reserved: false }], ["kbd", { reserved: false }], ["keygen", { reserved: false }], ["label", { reserved: false }], ["legend", { reserved: false }], ["li", { reserved: false }], ["link", { reserved: true }], ["main", { reserved: false }], ["map", { reserved: false }], ["mark", { reserved: false }], ["marquee", { reserved: false }], ["menu", { reserved: false }], ["menuitem", { reserved: false }], ["meta", { reserved: true }], ["meter", { reserved: false }], ["nav", { reserved: false }], ["noembed", { reserved: true }], ["noscript", { reserved: true }], ["object", { reserved: false }], ["ol", { reserved: false }], ["optgroup", { reserved: false }], ["option", { reserved: false }], ["output", { reserved: false }], ["p", { reserved: false }], ["param", { reserved: true }], ["picture", { reserved: true }], ["pre", { reserved: false }], ["progress", { reserved: false }], ["q", { reserved: false }], ["rp", { reserved: false }], ["rt", { reserved: false }], ["rtc", { reserved: false }], ["ruby", { reserved: false }], ["s", { reserved: false }], ["samp", { reserved: false }], ["script", { reserved: true }], ["section", { reserved: false }], ["select", { reserved: false }], ["small", { reserved: false }], ["source", { reserved: true }], ["spacer", { reserved: false }], ["span", { reserved: false }], ["strike", { reserved: false }], ["strong", { reserved: false }], ["style", { reserved: true }], ["sub", { reserved: false }], ["summary", { reserved: false }], ["sup", { reserved: false }], ["table", { reserved: false }], ["tbody", { reserved: false }], ["td", { reserved: false }], ["textarea", { reserved: false }], ["tfoot", { reserved: false }], ["th", { reserved: false }], ["thead", { reserved: false }], ["time", { reserved: false }], ["title", { reserved: true }], ["tr", { reserved: false }], ["track", { reserved: true }], ["tt", { reserved: false }], ["u", { reserved: false }], ["ul", { reserved: false }], ["var", { reserved: false }], ["video", { reserved: false }], ["wbr", { reserved: false }], ["xmp", { reserved: false }]], domMap = { entries: function() {
    return dom;
  }, forEach: function(fn3) {
    var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, _iterator = _createForOfIteratorHelper(dom), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], values = _step$value[1];
        fn3.call(thisArg, values, key, dom);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }, get: function(key) {
    var item = dom.find(function(tuple) {
      return tuple[0] === key;
    });
    return item && item[1];
  }, has: function(key) {
    return !!domMap.get(key);
  }, keys: function() {
    return dom.map(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
      return key;
    });
  }, values: function() {
    return dom.map(function(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
      return values2;
    });
  } }, _default2 = (0, _iterationDecorator.default)(domMap, domMap.entries());
  exports.default = _default2;
} });
var require_commandRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/abstract/commandRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var commandRole = { abstract: true, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget"]] }, _default2 = commandRole;
  exports.default = _default2;
} });
var require_compositeRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/abstract/compositeRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var compositeRole = { abstract: true, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-activedescendant": null, "aria-disabled": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget"]] }, _default2 = compositeRole;
  exports.default = _default2;
} });
var require_inputRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/abstract/inputRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var inputRole = { abstract: true, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null }, relatedConcepts: [{ concept: { name: "input" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget"]] }, _default2 = inputRole;
  exports.default = _default2;
} });
var require_landmarkRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/abstract/landmarkRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var landmarkRole = { abstract: true, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = landmarkRole;
  exports.default = _default2;
} });
var require_rangeRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/abstract/rangeRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var rangeRole = { abstract: true, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-valuemax": null, "aria-valuemin": null, "aria-valuenow": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, _default2 = rangeRole;
  exports.default = _default2;
} });
var require_roletypeRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/abstract/roletypeRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var roletypeRole = { abstract: true, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: [], prohibitedProps: [], props: { "aria-atomic": null, "aria-busy": null, "aria-controls": null, "aria-current": null, "aria-describedby": null, "aria-details": null, "aria-dropeffect": null, "aria-flowto": null, "aria-grabbed": null, "aria-hidden": null, "aria-keyshortcuts": null, "aria-label": null, "aria-labelledby": null, "aria-live": null, "aria-owns": null, "aria-relevant": null, "aria-roledescription": null }, relatedConcepts: [{ concept: { name: "role" }, module: "XHTML" }, { concept: { name: "type" }, module: "Dublin Core" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [] }, _default2 = roletypeRole;
  exports.default = _default2;
} });
var require_sectionRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/abstract/sectionRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var sectionRole = { abstract: true, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: [], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "frontmatter" }, module: "DTB" }, { concept: { name: "level" }, module: "DTB" }, { concept: { name: "level" }, module: "SMIL" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, _default2 = sectionRole;
  exports.default = _default2;
} });
var require_sectionheadRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/abstract/sectionheadRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var sectionheadRole = { abstract: true, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, _default2 = sectionheadRole;
  exports.default = _default2;
} });
var require_selectRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/abstract/selectRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var selectRole = { abstract: true, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-orientation": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "group"]] }, _default2 = selectRole;
  exports.default = _default2;
} });
var require_structureRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/abstract/structureRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var structureRole = { abstract: true, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: [], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype"]] }, _default2 = structureRole;
  exports.default = _default2;
} });
var require_widgetRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/abstract/widgetRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var widgetRole = { abstract: true, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: [], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype"]] }, _default2 = widgetRole;
  exports.default = _default2;
} });
var require_windowRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/abstract/windowRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var windowRole = { abstract: true, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-modal": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype"]] }, _default2 = windowRole;
  exports.default = _default2;
} });
var require_ariaAbstractRoles = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/ariaAbstractRoles.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var _commandRole = _interopRequireDefault(require_commandRole()), _compositeRole = _interopRequireDefault(require_compositeRole()), _inputRole = _interopRequireDefault(require_inputRole()), _landmarkRole = _interopRequireDefault(require_landmarkRole()), _rangeRole = _interopRequireDefault(require_rangeRole()), _roletypeRole = _interopRequireDefault(require_roletypeRole()), _sectionRole = _interopRequireDefault(require_sectionRole()), _sectionheadRole = _interopRequireDefault(require_sectionheadRole()), _selectRole = _interopRequireDefault(require_selectRole()), _structureRole = _interopRequireDefault(require_structureRole()), _widgetRole = _interopRequireDefault(require_widgetRole()), _windowRole = _interopRequireDefault(require_windowRole());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ariaAbstractRoles = [["command", _commandRole.default], ["composite", _compositeRole.default], ["input", _inputRole.default], ["landmark", _landmarkRole.default], ["range", _rangeRole.default], ["roletype", _roletypeRole.default], ["section", _sectionRole.default], ["sectionhead", _sectionheadRole.default], ["select", _selectRole.default], ["structure", _structureRole.default], ["widget", _widgetRole.default], ["window", _windowRole.default]], _default2 = ariaAbstractRoles;
  exports.default = _default2;
} });
var require_alertRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/alertRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var alertRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-atomic": "true", "aria-live": "assertive" }, relatedConcepts: [{ concept: { name: "alert" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = alertRole;
  exports.default = _default2;
} });
var require_alertdialogRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/alertdialogRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var alertdialogRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "alert" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "alert"], ["roletype", "window", "dialog"]] }, _default2 = alertdialogRole;
  exports.default = _default2;
} });
var require_applicationRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/applicationRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var applicationRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-activedescendant": null, "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "Device Independence Delivery Unit" } }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, _default2 = applicationRole;
  exports.default = _default2;
} });
var require_articleRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/articleRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var articleRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-posinset": null, "aria-setsize": null }, relatedConcepts: [{ concept: { name: "article" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "document"]] }, _default2 = articleRole;
  exports.default = _default2;
} });
var require_bannerRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/bannerRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var bannerRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { constraints: ["scoped to the body element"], name: "header" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = bannerRole;
  exports.default = _default2;
} });
var require_blockquoteRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/blockquoteRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var blockquoteRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "blockquote" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = blockquoteRole;
  exports.default = _default2;
} });
var require_buttonRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/buttonRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var buttonRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: true, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-disabled": null, "aria-expanded": null, "aria-haspopup": null, "aria-pressed": null }, relatedConcepts: [{ concept: { attributes: [{ name: "type", value: "button" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ name: "type", value: "image" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ name: "type", value: "reset" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ name: "type", value: "submit" }], name: "input" }, module: "HTML" }, { concept: { name: "button" }, module: "HTML" }, { concept: { name: "trigger" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command"]] }, _default2 = buttonRole;
  exports.default = _default2;
} });
var require_captionRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/captionRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var captionRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "caption" }, module: "HTML" }], requireContextRole: ["figure", "grid", "table"], requiredContextRole: ["figure", "grid", "table"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = captionRole;
  exports.default = _default2;
} });
var require_cellRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/cellRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var cellRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-colindex": null, "aria-colspan": null, "aria-rowindex": null, "aria-rowspan": null }, relatedConcepts: [{ concept: { constraints: ["ancestor table element has table role"], name: "td" }, module: "HTML" }], requireContextRole: ["row"], requiredContextRole: ["row"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = cellRole;
  exports.default = _default2;
} });
var require_checkboxRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/checkboxRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var checkboxRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: true, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-checked": null, "aria-errormessage": null, "aria-expanded": null, "aria-invalid": null, "aria-readonly": null, "aria-required": null }, relatedConcepts: [{ concept: { attributes: [{ name: "type", value: "checkbox" }], name: "input" }, module: "HTML" }, { concept: { name: "option" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-checked": null }, superClass: [["roletype", "widget", "input"]] }, _default2 = checkboxRole;
  exports.default = _default2;
} });
var require_codeRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/codeRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var codeRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "code" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = codeRole;
  exports.default = _default2;
} });
var require_columnheaderRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/columnheaderRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var columnheaderRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-sort": null }, relatedConcepts: [{ concept: { name: "th" }, module: "HTML" }, { concept: { attributes: [{ name: "scope", value: "col" }], name: "th" }, module: "HTML" }, { concept: { attributes: [{ name: "scope", value: "colgroup" }], name: "th" }, module: "HTML" }], requireContextRole: ["row"], requiredContextRole: ["row"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]] }, _default2 = columnheaderRole;
  exports.default = _default2;
} });
var require_comboboxRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/comboboxRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var comboboxRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-activedescendant": null, "aria-autocomplete": null, "aria-errormessage": null, "aria-invalid": null, "aria-readonly": null, "aria-required": null, "aria-expanded": "false", "aria-haspopup": "listbox" }, relatedConcepts: [{ concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "email" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "search" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "tel" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "text" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "url" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "url" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "multiple" }, { constraints: ["undefined"], name: "size" }], constraints: ["the multiple attribute is not set and the size attribute does not have a value greater than 1"], name: "select" }, module: "HTML" }, { concept: { name: "select" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-controls": null, "aria-expanded": "false" }, superClass: [["roletype", "widget", "input"]] }, _default2 = comboboxRole;
  exports.default = _default2;
} });
var require_complementaryRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/complementaryRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var complementaryRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "aside" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "aria-label" }], constraints: ["scoped to a sectioning content element", "scoped to a sectioning root element other than body"], name: "aside" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "aria-labelledby" }], constraints: ["scoped to a sectioning content element", "scoped to a sectioning root element other than body"], name: "aside" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = complementaryRole;
  exports.default = _default2;
} });
var require_contentinfoRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/contentinfoRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var contentinfoRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { constraints: ["scoped to the body element"], name: "footer" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = contentinfoRole;
  exports.default = _default2;
} });
var require_definitionRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/definitionRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var definitionRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "dd" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = definitionRole;
  exports.default = _default2;
} });
var require_deletionRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/deletionRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var deletionRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "del" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = deletionRole;
  exports.default = _default2;
} });
var require_dialogRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/dialogRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var dialogRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "dialog" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "window"]] }, _default2 = dialogRole;
  exports.default = _default2;
} });
var require_directoryRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/directoryRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var directoryRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ module: "DAISY Guide" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "list"]] }, _default2 = directoryRole;
  exports.default = _default2;
} });
var require_documentRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/documentRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var documentRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "Device Independence Delivery Unit" } }, { concept: { name: "html" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, _default2 = documentRole;
  exports.default = _default2;
} });
var require_emphasisRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/emphasisRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var emphasisRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "em" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = emphasisRole;
  exports.default = _default2;
} });
var require_feedRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/feedRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var feedRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["article"]], requiredProps: {}, superClass: [["roletype", "structure", "section", "list"]] }, _default2 = feedRole;
  exports.default = _default2;
} });
var require_figureRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/figureRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var figureRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "figure" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = figureRole;
  exports.default = _default2;
} });
var require_formRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/formRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var formRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { attributes: [{ constraints: ["set"], name: "aria-label" }], name: "form" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "aria-labelledby" }], name: "form" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "name" }], name: "form" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = formRole;
  exports.default = _default2;
} });
var require_genericRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/genericRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var genericRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "a" }, module: "HTML" }, { concept: { name: "area" }, module: "HTML" }, { concept: { name: "aside" }, module: "HTML" }, { concept: { name: "b" }, module: "HTML" }, { concept: { name: "bdo" }, module: "HTML" }, { concept: { name: "body" }, module: "HTML" }, { concept: { name: "data" }, module: "HTML" }, { concept: { name: "div" }, module: "HTML" }, { concept: { constraints: ["scoped to the main element", "scoped to a sectioning content element", "scoped to a sectioning root element other than body"], name: "footer" }, module: "HTML" }, { concept: { constraints: ["scoped to the main element", "scoped to a sectioning content element", "scoped to a sectioning root element other than body"], name: "header" }, module: "HTML" }, { concept: { name: "hgroup" }, module: "HTML" }, { concept: { name: "i" }, module: "HTML" }, { concept: { name: "pre" }, module: "HTML" }, { concept: { name: "q" }, module: "HTML" }, { concept: { name: "samp" }, module: "HTML" }, { concept: { name: "section" }, module: "HTML" }, { concept: { name: "small" }, module: "HTML" }, { concept: { name: "span" }, module: "HTML" }, { concept: { name: "u" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, _default2 = genericRole;
  exports.default = _default2;
} });
var require_gridRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/gridRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var gridRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-multiselectable": null, "aria-readonly": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["row"], ["row", "rowgroup"]], requiredProps: {}, superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "table"]] }, _default2 = gridRole;
  exports.default = _default2;
} });
var require_gridcellRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/gridcellRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var gridcellRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null, "aria-readonly": null, "aria-required": null, "aria-selected": null }, relatedConcepts: [{ concept: { constraints: ["ancestor table element has grid role", "ancestor table element has treegrid role"], name: "td" }, module: "HTML" }], requireContextRole: ["row"], requiredContextRole: ["row"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "cell"], ["roletype", "widget"]] }, _default2 = gridcellRole;
  exports.default = _default2;
} });
var require_groupRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/groupRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var groupRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-activedescendant": null, "aria-disabled": null }, relatedConcepts: [{ concept: { name: "details" }, module: "HTML" }, { concept: { name: "fieldset" }, module: "HTML" }, { concept: { name: "optgroup" }, module: "HTML" }, { concept: { name: "address" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = groupRole;
  exports.default = _default2;
} });
var require_headingRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/headingRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var headingRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-level": "2" }, relatedConcepts: [{ concept: { name: "h1" }, module: "HTML" }, { concept: { name: "h2" }, module: "HTML" }, { concept: { name: "h3" }, module: "HTML" }, { concept: { name: "h4" }, module: "HTML" }, { concept: { name: "h5" }, module: "HTML" }, { concept: { name: "h6" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-level": "2" }, superClass: [["roletype", "structure", "sectionhead"]] }, _default2 = headingRole;
  exports.default = _default2;
} });
var require_imgRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/imgRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var imgRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: true, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { attributes: [{ constraints: ["set"], name: "alt" }], name: "img" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "alt" }], name: "img" }, module: "HTML" }, { concept: { name: "imggroup" }, module: "DTB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = imgRole;
  exports.default = _default2;
} });
var require_insertionRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/insertionRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var insertionRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "ins" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = insertionRole;
  exports.default = _default2;
} });
var require_linkRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/linkRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var linkRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-disabled": null, "aria-expanded": null, "aria-haspopup": null }, relatedConcepts: [{ concept: { attributes: [{ constraints: ["set"], name: "href" }], name: "a" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "href" }], name: "area" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command"]] }, _default2 = linkRole;
  exports.default = _default2;
} });
var require_listRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/listRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var listRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "menu" }, module: "HTML" }, { concept: { name: "ol" }, module: "HTML" }, { concept: { name: "ul" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["listitem"]], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = listRole;
  exports.default = _default2;
} });
var require_listboxRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/listboxRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var listboxRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-expanded": null, "aria-invalid": null, "aria-multiselectable": null, "aria-readonly": null, "aria-required": null, "aria-orientation": "vertical" }, relatedConcepts: [{ concept: { attributes: [{ constraints: [">1"], name: "size" }], constraints: ["the size attribute value is greater than 1"], name: "select" }, module: "HTML" }, { concept: { attributes: [{ name: "multiple" }], name: "select" }, module: "HTML" }, { concept: { name: "datalist" }, module: "HTML" }, { concept: { name: "list" }, module: "ARIA" }, { concept: { name: "select" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["option", "group"], ["option"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]] }, _default2 = listboxRole;
  exports.default = _default2;
} });
var require_listitemRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/listitemRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var listitemRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-level": null, "aria-posinset": null, "aria-setsize": null }, relatedConcepts: [{ concept: { constraints: ["direct descendant of ol", "direct descendant of ul", "direct descendant of menu"], name: "li" }, module: "HTML" }, { concept: { name: "item" }, module: "XForms" }], requireContextRole: ["directory", "list"], requiredContextRole: ["directory", "list"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = listitemRole;
  exports.default = _default2;
} });
var require_logRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/logRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var logRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-live": "polite" }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = logRole;
  exports.default = _default2;
} });
var require_mainRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/mainRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var mainRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "main" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = mainRole;
  exports.default = _default2;
} });
var require_markRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/markRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var markRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["prohibited"], prohibitedProps: [], props: { "aria-braillelabel": null, "aria-brailleroledescription": null, "aria-description": null }, relatedConcepts: [{ concept: { name: "mark" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = markRole;
  exports.default = _default2;
} });
var require_marqueeRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/marqueeRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var marqueeRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = marqueeRole;
  exports.default = _default2;
} });
var require_mathRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/mathRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var mathRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "math" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = mathRole;
  exports.default = _default2;
} });
var require_menuRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/menuRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var menuRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-orientation": "vertical" }, relatedConcepts: [{ concept: { name: "MENU" }, module: "JAPI" }, { concept: { name: "list" }, module: "ARIA" }, { concept: { name: "select" }, module: "XForms" }, { concept: { name: "sidebar" }, module: "DTB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]] }, _default2 = menuRole;
  exports.default = _default2;
} });
var require_menubarRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/menubarRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var menubarRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-orientation": "horizontal" }, relatedConcepts: [{ concept: { name: "toolbar" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "select", "menu"], ["roletype", "structure", "section", "group", "select", "menu"]] }, _default2 = menubarRole;
  exports.default = _default2;
} });
var require_menuitemRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/menuitemRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var menuitemRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-disabled": null, "aria-expanded": null, "aria-haspopup": null, "aria-posinset": null, "aria-setsize": null }, relatedConcepts: [{ concept: { name: "MENU_ITEM" }, module: "JAPI" }, { concept: { name: "listitem" }, module: "ARIA" }, { concept: { name: "option" }, module: "ARIA" }], requireContextRole: ["group", "menu", "menubar"], requiredContextRole: ["group", "menu", "menubar"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command"]] }, _default2 = menuitemRole;
  exports.default = _default2;
} });
var require_menuitemcheckboxRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/menuitemcheckboxRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var menuitemcheckboxRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: true, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "menuitem" }, module: "ARIA" }], requireContextRole: ["group", "menu", "menubar"], requiredContextRole: ["group", "menu", "menubar"], requiredOwnedElements: [], requiredProps: { "aria-checked": null }, superClass: [["roletype", "widget", "input", "checkbox"], ["roletype", "widget", "command", "menuitem"]] }, _default2 = menuitemcheckboxRole;
  exports.default = _default2;
} });
var require_menuitemradioRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/menuitemradioRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var menuitemradioRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: true, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "menuitem" }, module: "ARIA" }], requireContextRole: ["group", "menu", "menubar"], requiredContextRole: ["group", "menu", "menubar"], requiredOwnedElements: [], requiredProps: { "aria-checked": null }, superClass: [["roletype", "widget", "input", "checkbox", "menuitemcheckbox"], ["roletype", "widget", "command", "menuitem", "menuitemcheckbox"], ["roletype", "widget", "input", "radio"]] }, _default2 = menuitemradioRole;
  exports.default = _default2;
} });
var require_meterRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/meterRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var meterRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: true, nameFrom: ["author"], prohibitedProps: [], props: { "aria-valuetext": null, "aria-valuemax": "100", "aria-valuemin": "0" }, relatedConcepts: [{ concept: { name: "meter" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-valuenow": null }, superClass: [["roletype", "structure", "range"]] }, _default2 = meterRole;
  exports.default = _default2;
} });
var require_navigationRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/navigationRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var navigationRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "nav" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = navigationRole;
  exports.default = _default2;
} });
var require_noneRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/noneRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var noneRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: [], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [] }, _default2 = noneRole;
  exports.default = _default2;
} });
var require_noteRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/noteRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var noteRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = noteRole;
  exports.default = _default2;
} });
var require_optionRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/optionRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var optionRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: true, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-checked": null, "aria-posinset": null, "aria-setsize": null, "aria-selected": "false" }, relatedConcepts: [{ concept: { name: "item" }, module: "XForms" }, { concept: { name: "listitem" }, module: "ARIA" }, { concept: { name: "option" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-selected": "false" }, superClass: [["roletype", "widget", "input"]] }, _default2 = optionRole;
  exports.default = _default2;
} });
var require_paragraphRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/paragraphRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var paragraphRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "p" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = paragraphRole;
  exports.default = _default2;
} });
var require_presentationRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/presentationRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var presentationRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { attributes: [{ name: "alt", value: "" }], name: "img" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, _default2 = presentationRole;
  exports.default = _default2;
} });
var require_progressbarRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/progressbarRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var progressbarRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: true, nameFrom: ["author"], prohibitedProps: [], props: { "aria-valuetext": null }, relatedConcepts: [{ concept: { name: "progress" }, module: "HTML" }, { concept: { name: "status" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "range"], ["roletype", "widget"]] }, _default2 = progressbarRole;
  exports.default = _default2;
} });
var require_radioRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/radioRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var radioRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: true, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-checked": null, "aria-posinset": null, "aria-setsize": null }, relatedConcepts: [{ concept: { attributes: [{ name: "type", value: "radio" }], name: "input" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-checked": null }, superClass: [["roletype", "widget", "input"]] }, _default2 = radioRole;
  exports.default = _default2;
} });
var require_radiogroupRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/radiogroupRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var radiogroupRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null, "aria-readonly": null, "aria-required": null }, relatedConcepts: [{ concept: { name: "list" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["radio"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]] }, _default2 = radiogroupRole;
  exports.default = _default2;
} });
var require_regionRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/regionRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var regionRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { attributes: [{ constraints: ["set"], name: "aria-label" }], name: "section" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "aria-labelledby" }], name: "section" }, module: "HTML" }, { concept: { name: "Device Independence Glossart perceivable unit" } }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = regionRole;
  exports.default = _default2;
} });
var require_rowRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/rowRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var rowRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-colindex": null, "aria-expanded": null, "aria-level": null, "aria-posinset": null, "aria-rowindex": null, "aria-selected": null, "aria-setsize": null }, relatedConcepts: [{ concept: { name: "tr" }, module: "HTML" }], requireContextRole: ["grid", "rowgroup", "table", "treegrid"], requiredContextRole: ["grid", "rowgroup", "table", "treegrid"], requiredOwnedElements: [["cell"], ["columnheader"], ["gridcell"], ["rowheader"]], requiredProps: {}, superClass: [["roletype", "structure", "section", "group"], ["roletype", "widget"]] }, _default2 = rowRole;
  exports.default = _default2;
} });
var require_rowgroupRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/rowgroupRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var rowgroupRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "tbody" }, module: "HTML" }, { concept: { name: "tfoot" }, module: "HTML" }, { concept: { name: "thead" }, module: "HTML" }], requireContextRole: ["grid", "table", "treegrid"], requiredContextRole: ["grid", "table", "treegrid"], requiredOwnedElements: [["row"]], requiredProps: {}, superClass: [["roletype", "structure"]] }, _default2 = rowgroupRole;
  exports.default = _default2;
} });
var require_rowheaderRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/rowheaderRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var rowheaderRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-sort": null }, relatedConcepts: [{ concept: { attributes: [{ name: "scope", value: "row" }], name: "th" }, module: "HTML" }, { concept: { attributes: [{ name: "scope", value: "rowgroup" }], name: "th" }, module: "HTML" }], requireContextRole: ["row", "rowgroup"], requiredContextRole: ["row", "rowgroup"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]] }, _default2 = rowheaderRole;
  exports.default = _default2;
} });
var require_scrollbarRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/scrollbarRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var scrollbarRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: true, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-valuetext": null, "aria-orientation": "vertical", "aria-valuemax": "100", "aria-valuemin": "0" }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-controls": null, "aria-valuenow": null }, superClass: [["roletype", "structure", "range"], ["roletype", "widget"]] }, _default2 = scrollbarRole;
  exports.default = _default2;
} });
var require_searchRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/searchRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var searchRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = searchRole;
  exports.default = _default2;
} });
var require_searchboxRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/searchboxRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var searchboxRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { attributes: [{ constraints: ["undefined"], name: "list" }, { name: "type", value: "search" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "input", "textbox"]] }, _default2 = searchboxRole;
  exports.default = _default2;
} });
var require_separatorRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/separatorRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var separatorRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: true, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-orientation": "horizontal", "aria-valuemax": "100", "aria-valuemin": "0", "aria-valuenow": null, "aria-valuetext": null }, relatedConcepts: [{ concept: { name: "hr" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, _default2 = separatorRole;
  exports.default = _default2;
} });
var require_sliderRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/sliderRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var sliderRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: true, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-haspopup": null, "aria-invalid": null, "aria-readonly": null, "aria-valuetext": null, "aria-orientation": "horizontal", "aria-valuemax": "100", "aria-valuemin": "0" }, relatedConcepts: [{ concept: { attributes: [{ name: "type", value: "range" }], name: "input" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-valuenow": null }, superClass: [["roletype", "widget", "input"], ["roletype", "structure", "range"]] }, _default2 = sliderRole;
  exports.default = _default2;
} });
var require_spinbuttonRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/spinbuttonRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var spinbuttonRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null, "aria-readonly": null, "aria-required": null, "aria-valuetext": null, "aria-valuenow": "0" }, relatedConcepts: [{ concept: { attributes: [{ name: "type", value: "number" }], name: "input" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "composite"], ["roletype", "widget", "input"], ["roletype", "structure", "range"]] }, _default2 = spinbuttonRole;
  exports.default = _default2;
} });
var require_statusRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/statusRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var statusRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-atomic": "true", "aria-live": "polite" }, relatedConcepts: [{ concept: { name: "output" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = statusRole;
  exports.default = _default2;
} });
var require_strongRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/strongRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var strongRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "strong" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = strongRole;
  exports.default = _default2;
} });
var require_subscriptRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/subscriptRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var subscriptRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "sub" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = subscriptRole;
  exports.default = _default2;
} });
var require_superscriptRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/superscriptRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var superscriptRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "sup" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = superscriptRole;
  exports.default = _default2;
} });
var require_switchRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/switchRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var switchRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: true, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "button" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-checked": null }, superClass: [["roletype", "widget", "input", "checkbox"]] }, _default2 = switchRole;
  exports.default = _default2;
} });
var require_tabRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/tabRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var tabRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: true, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-disabled": null, "aria-expanded": null, "aria-haspopup": null, "aria-posinset": null, "aria-setsize": null, "aria-selected": "false" }, relatedConcepts: [], requireContextRole: ["tablist"], requiredContextRole: ["tablist"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "sectionhead"], ["roletype", "widget"]] }, _default2 = tabRole;
  exports.default = _default2;
} });
var require_tableRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/tableRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var tableRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-colcount": null, "aria-rowcount": null }, relatedConcepts: [{ concept: { name: "table" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["row"], ["row", "rowgroup"]], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = tableRole;
  exports.default = _default2;
} });
var require_tablistRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/tablistRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var tablistRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-level": null, "aria-multiselectable": null, "aria-orientation": "horizontal" }, relatedConcepts: [{ module: "DAISY", concept: { name: "guide" } }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["tab"]], requiredProps: {}, superClass: [["roletype", "widget", "composite"]] }, _default2 = tablistRole;
  exports.default = _default2;
} });
var require_tabpanelRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/tabpanelRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var tabpanelRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = tabpanelRole;
  exports.default = _default2;
} });
var require_termRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/termRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var termRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "dfn" }, module: "HTML" }, { concept: { name: "dt" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = termRole;
  exports.default = _default2;
} });
var require_textboxRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/textboxRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var textboxRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-activedescendant": null, "aria-autocomplete": null, "aria-errormessage": null, "aria-haspopup": null, "aria-invalid": null, "aria-multiline": null, "aria-placeholder": null, "aria-readonly": null, "aria-required": null }, relatedConcepts: [{ concept: { attributes: [{ constraints: ["undefined"], name: "type" }, { constraints: ["undefined"], name: "list" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "list" }, { name: "type", value: "email" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "list" }, { name: "type", value: "tel" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "list" }, { name: "type", value: "text" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "list" }, { name: "type", value: "url" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }, { concept: { name: "input" }, module: "XForms" }, { concept: { name: "textarea" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "input"]] }, _default2 = textboxRole;
  exports.default = _default2;
} });
var require_timeRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/timeRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var timeRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "time" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = timeRole;
  exports.default = _default2;
} });
var require_timerRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/timerRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var timerRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "status"]] }, _default2 = timerRole;
  exports.default = _default2;
} });
var require_toolbarRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/toolbarRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var toolbarRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-orientation": "horizontal" }, relatedConcepts: [{ concept: { name: "menubar" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "group"]] }, _default2 = toolbarRole;
  exports.default = _default2;
} });
var require_tooltipRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/tooltipRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var tooltipRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = tooltipRole;
  exports.default = _default2;
} });
var require_treeRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/treeRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var treeRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null, "aria-multiselectable": null, "aria-required": null, "aria-orientation": "vertical" }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["treeitem", "group"], ["treeitem"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]] }, _default2 = treeRole;
  exports.default = _default2;
} });
var require_treegridRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/treegridRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var treegridRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["row"], ["row", "rowgroup"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "grid"], ["roletype", "structure", "section", "table", "grid"], ["roletype", "widget", "composite", "select", "tree"], ["roletype", "structure", "section", "group", "select", "tree"]] }, _default2 = treegridRole;
  exports.default = _default2;
} });
var require_treeitemRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/literal/treeitemRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var treeitemRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-expanded": null, "aria-haspopup": null }, relatedConcepts: [], requireContextRole: ["group", "tree"], requiredContextRole: ["group", "tree"], requiredOwnedElements: [], requiredProps: { "aria-selected": null }, superClass: [["roletype", "structure", "section", "listitem"], ["roletype", "widget", "input", "option"]] }, _default2 = treeitemRole;
  exports.default = _default2;
} });
var require_ariaLiteralRoles = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/ariaLiteralRoles.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var _alertRole = _interopRequireDefault(require_alertRole()), _alertdialogRole = _interopRequireDefault(require_alertdialogRole()), _applicationRole = _interopRequireDefault(require_applicationRole()), _articleRole = _interopRequireDefault(require_articleRole()), _bannerRole = _interopRequireDefault(require_bannerRole()), _blockquoteRole = _interopRequireDefault(require_blockquoteRole()), _buttonRole = _interopRequireDefault(require_buttonRole()), _captionRole = _interopRequireDefault(require_captionRole()), _cellRole = _interopRequireDefault(require_cellRole()), _checkboxRole = _interopRequireDefault(require_checkboxRole()), _codeRole = _interopRequireDefault(require_codeRole()), _columnheaderRole = _interopRequireDefault(require_columnheaderRole()), _comboboxRole = _interopRequireDefault(require_comboboxRole()), _complementaryRole = _interopRequireDefault(require_complementaryRole()), _contentinfoRole = _interopRequireDefault(require_contentinfoRole()), _definitionRole = _interopRequireDefault(require_definitionRole()), _deletionRole = _interopRequireDefault(require_deletionRole()), _dialogRole = _interopRequireDefault(require_dialogRole()), _directoryRole = _interopRequireDefault(require_directoryRole()), _documentRole = _interopRequireDefault(require_documentRole()), _emphasisRole = _interopRequireDefault(require_emphasisRole()), _feedRole = _interopRequireDefault(require_feedRole()), _figureRole = _interopRequireDefault(require_figureRole()), _formRole = _interopRequireDefault(require_formRole()), _genericRole = _interopRequireDefault(require_genericRole()), _gridRole = _interopRequireDefault(require_gridRole()), _gridcellRole = _interopRequireDefault(require_gridcellRole()), _groupRole = _interopRequireDefault(require_groupRole()), _headingRole = _interopRequireDefault(require_headingRole()), _imgRole = _interopRequireDefault(require_imgRole()), _insertionRole = _interopRequireDefault(require_insertionRole()), _linkRole = _interopRequireDefault(require_linkRole()), _listRole = _interopRequireDefault(require_listRole()), _listboxRole = _interopRequireDefault(require_listboxRole()), _listitemRole = _interopRequireDefault(require_listitemRole()), _logRole = _interopRequireDefault(require_logRole()), _mainRole = _interopRequireDefault(require_mainRole()), _markRole = _interopRequireDefault(require_markRole()), _marqueeRole = _interopRequireDefault(require_marqueeRole()), _mathRole = _interopRequireDefault(require_mathRole()), _menuRole = _interopRequireDefault(require_menuRole()), _menubarRole = _interopRequireDefault(require_menubarRole()), _menuitemRole = _interopRequireDefault(require_menuitemRole()), _menuitemcheckboxRole = _interopRequireDefault(require_menuitemcheckboxRole()), _menuitemradioRole = _interopRequireDefault(require_menuitemradioRole()), _meterRole = _interopRequireDefault(require_meterRole()), _navigationRole = _interopRequireDefault(require_navigationRole()), _noneRole = _interopRequireDefault(require_noneRole()), _noteRole = _interopRequireDefault(require_noteRole()), _optionRole = _interopRequireDefault(require_optionRole()), _paragraphRole = _interopRequireDefault(require_paragraphRole()), _presentationRole = _interopRequireDefault(require_presentationRole()), _progressbarRole = _interopRequireDefault(require_progressbarRole()), _radioRole = _interopRequireDefault(require_radioRole()), _radiogroupRole = _interopRequireDefault(require_radiogroupRole()), _regionRole = _interopRequireDefault(require_regionRole()), _rowRole = _interopRequireDefault(require_rowRole()), _rowgroupRole = _interopRequireDefault(require_rowgroupRole()), _rowheaderRole = _interopRequireDefault(require_rowheaderRole()), _scrollbarRole = _interopRequireDefault(require_scrollbarRole()), _searchRole = _interopRequireDefault(require_searchRole()), _searchboxRole = _interopRequireDefault(require_searchboxRole()), _separatorRole = _interopRequireDefault(require_separatorRole()), _sliderRole = _interopRequireDefault(require_sliderRole()), _spinbuttonRole = _interopRequireDefault(require_spinbuttonRole()), _statusRole = _interopRequireDefault(require_statusRole()), _strongRole = _interopRequireDefault(require_strongRole()), _subscriptRole = _interopRequireDefault(require_subscriptRole()), _superscriptRole = _interopRequireDefault(require_superscriptRole()), _switchRole = _interopRequireDefault(require_switchRole()), _tabRole = _interopRequireDefault(require_tabRole()), _tableRole = _interopRequireDefault(require_tableRole()), _tablistRole = _interopRequireDefault(require_tablistRole()), _tabpanelRole = _interopRequireDefault(require_tabpanelRole()), _termRole = _interopRequireDefault(require_termRole()), _textboxRole = _interopRequireDefault(require_textboxRole()), _timeRole = _interopRequireDefault(require_timeRole()), _timerRole = _interopRequireDefault(require_timerRole()), _toolbarRole = _interopRequireDefault(require_toolbarRole()), _tooltipRole = _interopRequireDefault(require_tooltipRole()), _treeRole = _interopRequireDefault(require_treeRole()), _treegridRole = _interopRequireDefault(require_treegridRole()), _treeitemRole = _interopRequireDefault(require_treeitemRole());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ariaLiteralRoles = [["alert", _alertRole.default], ["alertdialog", _alertdialogRole.default], ["application", _applicationRole.default], ["article", _articleRole.default], ["banner", _bannerRole.default], ["blockquote", _blockquoteRole.default], ["button", _buttonRole.default], ["caption", _captionRole.default], ["cell", _cellRole.default], ["checkbox", _checkboxRole.default], ["code", _codeRole.default], ["columnheader", _columnheaderRole.default], ["combobox", _comboboxRole.default], ["complementary", _complementaryRole.default], ["contentinfo", _contentinfoRole.default], ["definition", _definitionRole.default], ["deletion", _deletionRole.default], ["dialog", _dialogRole.default], ["directory", _directoryRole.default], ["document", _documentRole.default], ["emphasis", _emphasisRole.default], ["feed", _feedRole.default], ["figure", _figureRole.default], ["form", _formRole.default], ["generic", _genericRole.default], ["grid", _gridRole.default], ["gridcell", _gridcellRole.default], ["group", _groupRole.default], ["heading", _headingRole.default], ["img", _imgRole.default], ["insertion", _insertionRole.default], ["link", _linkRole.default], ["list", _listRole.default], ["listbox", _listboxRole.default], ["listitem", _listitemRole.default], ["log", _logRole.default], ["main", _mainRole.default], ["mark", _markRole.default], ["marquee", _marqueeRole.default], ["math", _mathRole.default], ["menu", _menuRole.default], ["menubar", _menubarRole.default], ["menuitem", _menuitemRole.default], ["menuitemcheckbox", _menuitemcheckboxRole.default], ["menuitemradio", _menuitemradioRole.default], ["meter", _meterRole.default], ["navigation", _navigationRole.default], ["none", _noneRole.default], ["note", _noteRole.default], ["option", _optionRole.default], ["paragraph", _paragraphRole.default], ["presentation", _presentationRole.default], ["progressbar", _progressbarRole.default], ["radio", _radioRole.default], ["radiogroup", _radiogroupRole.default], ["region", _regionRole.default], ["row", _rowRole.default], ["rowgroup", _rowgroupRole.default], ["rowheader", _rowheaderRole.default], ["scrollbar", _scrollbarRole.default], ["search", _searchRole.default], ["searchbox", _searchboxRole.default], ["separator", _separatorRole.default], ["slider", _sliderRole.default], ["spinbutton", _spinbuttonRole.default], ["status", _statusRole.default], ["strong", _strongRole.default], ["subscript", _subscriptRole.default], ["superscript", _superscriptRole.default], ["switch", _switchRole.default], ["tab", _tabRole.default], ["table", _tableRole.default], ["tablist", _tablistRole.default], ["tabpanel", _tabpanelRole.default], ["term", _termRole.default], ["textbox", _textboxRole.default], ["time", _timeRole.default], ["timer", _timerRole.default], ["toolbar", _toolbarRole.default], ["tooltip", _tooltipRole.default], ["tree", _treeRole.default], ["treegrid", _treegridRole.default], ["treeitem", _treeitemRole.default]], _default2 = ariaLiteralRoles;
  exports.default = _default2;
} });
var require_docAbstractRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docAbstractRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docAbstractRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "abstract [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = docAbstractRole;
  exports.default = _default2;
} });
var require_docAcknowledgmentsRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docAcknowledgmentsRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docAcknowledgmentsRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "acknowledgments [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docAcknowledgmentsRole;
  exports.default = _default2;
} });
var require_docAfterwordRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docAfterwordRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docAfterwordRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "afterword [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docAfterwordRole;
  exports.default = _default2;
} });
var require_docAppendixRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docAppendixRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docAppendixRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "appendix [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docAppendixRole;
  exports.default = _default2;
} });
var require_docBacklinkRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docBacklinkRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docBacklinkRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "referrer [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command", "link"]] }, _default2 = docBacklinkRole;
  exports.default = _default2;
} });
var require_docBiblioentryRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docBiblioentryRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docBiblioentryRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "EPUB biblioentry [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: ["doc-bibliography"], requiredContextRole: ["doc-bibliography"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "listitem"]] }, _default2 = docBiblioentryRole;
  exports.default = _default2;
} });
var require_docBibliographyRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docBibliographyRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docBibliographyRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "bibliography [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["doc-biblioentry"]], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docBibliographyRole;
  exports.default = _default2;
} });
var require_docBibliorefRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docBibliorefRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docBibliorefRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "biblioref [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command", "link"]] }, _default2 = docBibliorefRole;
  exports.default = _default2;
} });
var require_docChapterRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docChapterRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docChapterRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "chapter [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docChapterRole;
  exports.default = _default2;
} });
var require_docColophonRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docColophonRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docColophonRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "colophon [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = docColophonRole;
  exports.default = _default2;
} });
var require_docConclusionRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docConclusionRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docConclusionRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "conclusion [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docConclusionRole;
  exports.default = _default2;
} });
var require_docCoverRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docCoverRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docCoverRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "cover [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "img"]] }, _default2 = docCoverRole;
  exports.default = _default2;
} });
var require_docCreditRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docCreditRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docCreditRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "credit [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = docCreditRole;
  exports.default = _default2;
} });
var require_docCreditsRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docCreditsRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docCreditsRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "credits [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docCreditsRole;
  exports.default = _default2;
} });
var require_docDedicationRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docDedicationRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docDedicationRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "dedication [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = docDedicationRole;
  exports.default = _default2;
} });
var require_docEndnoteRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docEndnoteRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docEndnoteRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "rearnote [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: ["doc-endnotes"], requiredContextRole: ["doc-endnotes"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "listitem"]] }, _default2 = docEndnoteRole;
  exports.default = _default2;
} });
var require_docEndnotesRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docEndnotesRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docEndnotesRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "rearnotes [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["doc-endnote"]], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docEndnotesRole;
  exports.default = _default2;
} });
var require_docEpigraphRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docEpigraphRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docEpigraphRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "epigraph [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = docEpigraphRole;
  exports.default = _default2;
} });
var require_docEpilogueRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docEpilogueRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docEpilogueRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "epilogue [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docEpilogueRole;
  exports.default = _default2;
} });
var require_docErrataRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docErrataRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docErrataRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "errata [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docErrataRole;
  exports.default = _default2;
} });
var require_docExampleRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docExampleRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docExampleRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = docExampleRole;
  exports.default = _default2;
} });
var require_docFootnoteRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docFootnoteRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docFootnoteRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "footnote [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = docFootnoteRole;
  exports.default = _default2;
} });
var require_docForewordRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docForewordRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docForewordRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "foreword [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docForewordRole;
  exports.default = _default2;
} });
var require_docGlossaryRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docGlossaryRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docGlossaryRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "glossary [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["definition"], ["term"]], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docGlossaryRole;
  exports.default = _default2;
} });
var require_docGlossrefRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docGlossrefRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docGlossrefRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "glossref [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command", "link"]] }, _default2 = docGlossrefRole;
  exports.default = _default2;
} });
var require_docIndexRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docIndexRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docIndexRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "index [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark", "navigation"]] }, _default2 = docIndexRole;
  exports.default = _default2;
} });
var require_docIntroductionRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docIntroductionRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docIntroductionRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "introduction [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docIntroductionRole;
  exports.default = _default2;
} });
var require_docNoterefRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docNoterefRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docNoterefRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "noteref [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command", "link"]] }, _default2 = docNoterefRole;
  exports.default = _default2;
} });
var require_docNoticeRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docNoticeRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docNoticeRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "notice [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "note"]] }, _default2 = docNoticeRole;
  exports.default = _default2;
} });
var require_docPagebreakRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docPagebreakRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docPagebreakRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: true, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "pagebreak [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "separator"]] }, _default2 = docPagebreakRole;
  exports.default = _default2;
} });
var require_docPagelistRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docPagelistRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docPagelistRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "page-list [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark", "navigation"]] }, _default2 = docPagelistRole;
  exports.default = _default2;
} });
var require_docPartRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docPartRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docPartRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "part [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docPartRole;
  exports.default = _default2;
} });
var require_docPrefaceRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docPrefaceRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docPrefaceRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "preface [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docPrefaceRole;
  exports.default = _default2;
} });
var require_docPrologueRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docPrologueRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docPrologueRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "prologue [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, _default2 = docPrologueRole;
  exports.default = _default2;
} });
var require_docPullquoteRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docPullquoteRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docPullquoteRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "pullquote [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["none"]] }, _default2 = docPullquoteRole;
  exports.default = _default2;
} });
var require_docQnaRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docQnaRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docQnaRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "qna [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, _default2 = docQnaRole;
  exports.default = _default2;
} });
var require_docSubtitleRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docSubtitleRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docSubtitleRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "subtitle [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "sectionhead"]] }, _default2 = docSubtitleRole;
  exports.default = _default2;
} });
var require_docTipRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docTipRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docTipRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "help [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "note"]] }, _default2 = docTipRole;
  exports.default = _default2;
} });
var require_docTocRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/dpub/docTocRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var docTocRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "toc [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark", "navigation"]] }, _default2 = docTocRole;
  exports.default = _default2;
} });
var require_ariaDpubRoles = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/ariaDpubRoles.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var _docAbstractRole = _interopRequireDefault(require_docAbstractRole()), _docAcknowledgmentsRole = _interopRequireDefault(require_docAcknowledgmentsRole()), _docAfterwordRole = _interopRequireDefault(require_docAfterwordRole()), _docAppendixRole = _interopRequireDefault(require_docAppendixRole()), _docBacklinkRole = _interopRequireDefault(require_docBacklinkRole()), _docBiblioentryRole = _interopRequireDefault(require_docBiblioentryRole()), _docBibliographyRole = _interopRequireDefault(require_docBibliographyRole()), _docBibliorefRole = _interopRequireDefault(require_docBibliorefRole()), _docChapterRole = _interopRequireDefault(require_docChapterRole()), _docColophonRole = _interopRequireDefault(require_docColophonRole()), _docConclusionRole = _interopRequireDefault(require_docConclusionRole()), _docCoverRole = _interopRequireDefault(require_docCoverRole()), _docCreditRole = _interopRequireDefault(require_docCreditRole()), _docCreditsRole = _interopRequireDefault(require_docCreditsRole()), _docDedicationRole = _interopRequireDefault(require_docDedicationRole()), _docEndnoteRole = _interopRequireDefault(require_docEndnoteRole()), _docEndnotesRole = _interopRequireDefault(require_docEndnotesRole()), _docEpigraphRole = _interopRequireDefault(require_docEpigraphRole()), _docEpilogueRole = _interopRequireDefault(require_docEpilogueRole()), _docErrataRole = _interopRequireDefault(require_docErrataRole()), _docExampleRole = _interopRequireDefault(require_docExampleRole()), _docFootnoteRole = _interopRequireDefault(require_docFootnoteRole()), _docForewordRole = _interopRequireDefault(require_docForewordRole()), _docGlossaryRole = _interopRequireDefault(require_docGlossaryRole()), _docGlossrefRole = _interopRequireDefault(require_docGlossrefRole()), _docIndexRole = _interopRequireDefault(require_docIndexRole()), _docIntroductionRole = _interopRequireDefault(require_docIntroductionRole()), _docNoterefRole = _interopRequireDefault(require_docNoterefRole()), _docNoticeRole = _interopRequireDefault(require_docNoticeRole()), _docPagebreakRole = _interopRequireDefault(require_docPagebreakRole()), _docPagelistRole = _interopRequireDefault(require_docPagelistRole()), _docPartRole = _interopRequireDefault(require_docPartRole()), _docPrefaceRole = _interopRequireDefault(require_docPrefaceRole()), _docPrologueRole = _interopRequireDefault(require_docPrologueRole()), _docPullquoteRole = _interopRequireDefault(require_docPullquoteRole()), _docQnaRole = _interopRequireDefault(require_docQnaRole()), _docSubtitleRole = _interopRequireDefault(require_docSubtitleRole()), _docTipRole = _interopRequireDefault(require_docTipRole()), _docTocRole = _interopRequireDefault(require_docTocRole());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ariaDpubRoles = [["doc-abstract", _docAbstractRole.default], ["doc-acknowledgments", _docAcknowledgmentsRole.default], ["doc-afterword", _docAfterwordRole.default], ["doc-appendix", _docAppendixRole.default], ["doc-backlink", _docBacklinkRole.default], ["doc-biblioentry", _docBiblioentryRole.default], ["doc-bibliography", _docBibliographyRole.default], ["doc-biblioref", _docBibliorefRole.default], ["doc-chapter", _docChapterRole.default], ["doc-colophon", _docColophonRole.default], ["doc-conclusion", _docConclusionRole.default], ["doc-cover", _docCoverRole.default], ["doc-credit", _docCreditRole.default], ["doc-credits", _docCreditsRole.default], ["doc-dedication", _docDedicationRole.default], ["doc-endnote", _docEndnoteRole.default], ["doc-endnotes", _docEndnotesRole.default], ["doc-epigraph", _docEpigraphRole.default], ["doc-epilogue", _docEpilogueRole.default], ["doc-errata", _docErrataRole.default], ["doc-example", _docExampleRole.default], ["doc-footnote", _docFootnoteRole.default], ["doc-foreword", _docForewordRole.default], ["doc-glossary", _docGlossaryRole.default], ["doc-glossref", _docGlossrefRole.default], ["doc-index", _docIndexRole.default], ["doc-introduction", _docIntroductionRole.default], ["doc-noteref", _docNoterefRole.default], ["doc-notice", _docNoticeRole.default], ["doc-pagebreak", _docPagebreakRole.default], ["doc-pagelist", _docPagelistRole.default], ["doc-part", _docPartRole.default], ["doc-preface", _docPrefaceRole.default], ["doc-prologue", _docPrologueRole.default], ["doc-pullquote", _docPullquoteRole.default], ["doc-qna", _docQnaRole.default], ["doc-subtitle", _docSubtitleRole.default], ["doc-tip", _docTipRole.default], ["doc-toc", _docTocRole.default]], _default2 = ariaDpubRoles;
  exports.default = _default2;
} });
var require_graphicsDocumentRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/graphics/graphicsDocumentRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var graphicsDocumentRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: false, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ module: "GRAPHICS", concept: { name: "graphics-object" } }, { module: "ARIA", concept: { name: "img" } }, { module: "ARIA", concept: { name: "article" } }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "document"]] }, _default2 = graphicsDocumentRole;
  exports.default = _default2;
} });
var require_graphicsObjectRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/graphics/graphicsObjectRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var graphicsObjectRole = { abstract: false, accessibleNameRequired: false, baseConcepts: [], childrenPresentational: false, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ module: "GRAPHICS", concept: { name: "graphics-document" } }, { module: "ARIA", concept: { name: "group" } }, { module: "ARIA", concept: { name: "img" } }, { module: "GRAPHICS", concept: { name: "graphics-symbol" } }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "group"]] }, _default2 = graphicsObjectRole;
  exports.default = _default2;
} });
var require_graphicsSymbolRole = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/graphics/graphicsSymbolRole.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var graphicsSymbolRole = { abstract: false, accessibleNameRequired: true, baseConcepts: [], childrenPresentational: true, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "img"]] }, _default2 = graphicsSymbolRole;
  exports.default = _default2;
} });
var require_ariaGraphicsRoles = __commonJS({ "../../node_modules/aria-query/lib/etc/roles/ariaGraphicsRoles.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var _graphicsDocumentRole = _interopRequireDefault(require_graphicsDocumentRole()), _graphicsObjectRole = _interopRequireDefault(require_graphicsObjectRole()), _graphicsSymbolRole = _interopRequireDefault(require_graphicsSymbolRole());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ariaGraphicsRoles = [["graphics-document", _graphicsDocumentRole.default], ["graphics-object", _graphicsObjectRole.default], ["graphics-symbol", _graphicsSymbolRole.default]], _default2 = ariaGraphicsRoles;
  exports.default = _default2;
} });
var require_rolesMap = __commonJS({ "../../node_modules/aria-query/lib/rolesMap.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var _ariaAbstractRoles = _interopRequireDefault(require_ariaAbstractRoles()), _ariaLiteralRoles = _interopRequireDefault(require_ariaLiteralRoles()), _ariaDpubRoles = _interopRequireDefault(require_ariaDpubRoles()), _ariaGraphicsRoles = _interopRequireDefault(require_ariaGraphicsRoles()), _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _defineProperty5(obj, key, value) {
    return key in obj ? Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) : obj[key] = value, obj;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol < "u" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
        it && (o = it);
        var i = 0, F = function() {
        };
        return { s: F, n: function() {
          return i >= o.length ? { done: true } : { done: false, value: o[i++] };
        }, e: function(_e2) {
          throw _e2;
        }, f: F };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function() {
      it = it.call(o);
    }, n: function() {
      var step = it.next();
      return normalCompletion = step.done, step;
    }, e: function(_e3) {
      didErr = true, err = _e3;
    }, f: function() {
      try {
        !normalCompletion && it.return != null && it.return();
      } finally {
        if (didErr) throw err;
      }
    } };
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (o) {
      if (typeof o == "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
  }
  function _arrayLikeToArray(arr, len) {
    (len == null || len > arr.length) && (len = arr.length);
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol < "u" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i != null) {
      var _arr = [], _n = true, _d = false, _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = true) ;
      } catch (err) {
        _d = true, _e = err;
      } finally {
        try {
          !_n && _i.return != null && _i.return();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  var roles3 = [].concat(_ariaAbstractRoles.default, _ariaLiteralRoles.default, _ariaDpubRoles.default, _ariaGraphicsRoles.default);
  roles3.forEach(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 2), roleDefinition = _ref2[1], _iterator = _createForOfIteratorHelper(roleDefinition.superClass), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var superClassIter = _step.value, _iterator2 = _createForOfIteratorHelper(superClassIter), _step2;
        try {
          var _loop = function() {
            var superClassName = _step2.value, superClassRoleTuple = roles3.find(function(_ref3) {
              var _ref4 = _slicedToArray(_ref3, 1), name = _ref4[0];
              return name === superClassName;
            });
            if (superClassRoleTuple) for (var superClassDefinition = superClassRoleTuple[1], _i2 = 0, _Object$keys = Object.keys(superClassDefinition.props); _i2 < _Object$keys.length; _i2++) {
              var prop = _Object$keys[_i2];
              Object.prototype.hasOwnProperty.call(roleDefinition.props, prop) || Object.assign(roleDefinition.props, _defineProperty5({}, prop, superClassDefinition.props[prop]));
            }
          };
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) _loop();
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  var rolesMap = { entries: function() {
    return roles3;
  }, forEach: function(fn3) {
    var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, _iterator3 = _createForOfIteratorHelper(roles3), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var _step3$value = _slicedToArray(_step3.value, 2), key = _step3$value[0], values = _step3$value[1];
        fn3.call(thisArg, values, key, roles3);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }, get: function(key) {
    var item = roles3.find(function(tuple) {
      return tuple[0] === key;
    });
    return item && item[1];
  }, has: function(key) {
    return !!rolesMap.get(key);
  }, keys: function() {
    return roles3.map(function(_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1), key = _ref6[0];
      return key;
    });
  }, values: function() {
    return roles3.map(function(_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2), values2 = _ref8[1];
      return values2;
    });
  } }, _default2 = (0, _iterationDecorator.default)(rolesMap, rolesMap.entries());
  exports.default = _default2;
} });
var require_lite = __commonJS({ "../../node_modules/dequal/lite/index.js"(exports) {
  var has = Object.prototype.hasOwnProperty;
  function dequal(foo, bar) {
    var ctor, len;
    if (foo === bar) return true;
    if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
      if (ctor === Date) return foo.getTime() === bar.getTime();
      if (ctor === RegExp) return foo.toString() === bar.toString();
      if (ctor === Array) {
        if ((len = foo.length) === bar.length) for (; len-- && dequal(foo[len], bar[len]); ) ;
        return len === -1;
      }
      if (!ctor || typeof foo == "object") {
        len = 0;
        for (ctor in foo) if (has.call(foo, ctor) && ++len && !has.call(bar, ctor) || !(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
        return Object.keys(bar).length === len;
      }
    }
    return foo !== foo && bar !== bar;
  }
  exports.dequal = dequal;
} });
var require_elementRoleMap = __commonJS({ "../../node_modules/aria-query/lib/elementRoleMap.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var _lite = require_lite(), _iterationDecorator = _interopRequireDefault(require_iterationDecorator()), _rolesMap = _interopRequireDefault(require_rolesMap());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _slicedToArray(arr, i2) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function _iterableToArrayLimit(arr, i2) {
    var _i = arr == null ? null : typeof Symbol < "u" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i != null) {
      var _arr = [], _n = true, _d = false, _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i2 && _arr.length === i2)); _n = true) ;
      } catch (err) {
        _d = true, _e = err;
      } finally {
        try {
          !_n && _i.return != null && _i.return();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol < "u" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
        it && (o = it);
        var i2 = 0, F = function() {
        };
        return { s: F, n: function() {
          return i2 >= o.length ? { done: true } : { done: false, value: o[i2++] };
        }, e: function(_e2) {
          throw _e2;
        }, f: F };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function() {
      it = it.call(o);
    }, n: function() {
      var step = it.next();
      return normalCompletion = step.done, step;
    }, e: function(_e3) {
      didErr = true, err = _e3;
    }, f: function() {
      try {
        !normalCompletion && it.return != null && it.return();
      } finally {
        if (didErr) throw err;
      }
    } };
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (o) {
      if (typeof o == "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
  }
  function _arrayLikeToArray(arr, len) {
    (len == null || len > arr.length) && (len = arr.length);
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) arr2[i2] = arr[i2];
    return arr2;
  }
  var elementRoles3 = [], keys2 = _rolesMap.default.keys();
  for (i = 0; i < keys2.length; i++) if (key = keys2[i], role = _rolesMap.default.get(key), role) for (concepts = [].concat(role.baseConcepts, role.relatedConcepts), k2 = 0; k2 < concepts.length; k2++) relation = concepts[k2], relation.module === "HTML" && function() {
    var concept = relation.concept;
    if (concept) {
      var elementRoleRelation = elementRoles3.find(function(relation2) {
        return (0, _lite.dequal)(relation2, concept);
      }), roles3;
      elementRoleRelation ? roles3 = elementRoleRelation[1] : roles3 = [];
      for (var isUnique = true, _i = 0; _i < roles3.length; _i++) if (roles3[_i] === key) {
        isUnique = false;
        break;
      }
      isUnique && roles3.push(key), elementRoles3.push([concept, roles3]);
    }
  }();
  var key, role, concepts, relation, k2, i, elementRoleMap = { entries: function() {
    return elementRoles3;
  }, forEach: function(fn3) {
    var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, _iterator = _createForOfIteratorHelper(elementRoles3), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var _step$value = _slicedToArray(_step.value, 2), _key = _step$value[0], values = _step$value[1];
        fn3.call(thisArg, values, _key, elementRoles3);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }, get: function(key2) {
    var item = elementRoles3.find(function(tuple) {
      return key2.name === tuple[0].name && (0, _lite.dequal)(key2.attributes, tuple[0].attributes);
    });
    return item && item[1];
  }, has: function(key2) {
    return !!elementRoleMap.get(key2);
  }, keys: function() {
    return elementRoles3.map(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 1), key2 = _ref2[0];
      return key2;
    });
  }, values: function() {
    return elementRoles3.map(function(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
      return values2;
    });
  } }, _default2 = (0, _iterationDecorator.default)(elementRoleMap, elementRoleMap.entries());
  exports.default = _default2;
} });
var require_roleElementMap = __commonJS({ "../../node_modules/aria-query/lib/roleElementMap.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = void 0;
  var _iterationDecorator = _interopRequireDefault(require_iterationDecorator()), _rolesMap = _interopRequireDefault(require_rolesMap());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _slicedToArray(arr, i2) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function _iterableToArrayLimit(arr, i2) {
    var _i = arr == null ? null : typeof Symbol < "u" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i != null) {
      var _arr = [], _n = true, _d = false, _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i2 && _arr.length === i2)); _n = true) ;
      } catch (err) {
        _d = true, _e = err;
      } finally {
        try {
          !_n && _i.return != null && _i.return();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol < "u" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
        it && (o = it);
        var i2 = 0, F = function() {
        };
        return { s: F, n: function() {
          return i2 >= o.length ? { done: true } : { done: false, value: o[i2++] };
        }, e: function(_e2) {
          throw _e2;
        }, f: F };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function() {
      it = it.call(o);
    }, n: function() {
      var step = it.next();
      return normalCompletion = step.done, step;
    }, e: function(_e3) {
      didErr = true, err = _e3;
    }, f: function() {
      try {
        !normalCompletion && it.return != null && it.return();
      } finally {
        if (didErr) throw err;
      }
    } };
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (o) {
      if (typeof o == "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
  }
  function _arrayLikeToArray(arr, len) {
    (len == null || len > arr.length) && (len = arr.length);
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) arr2[i2] = arr[i2];
    return arr2;
  }
  var roleElement = [], keys2 = _rolesMap.default.keys();
  for (i = 0; i < keys2.length; i++) if (key = keys2[i], role = _rolesMap.default.get(key), relationConcepts = [], role) {
    for (concepts = [].concat(role.baseConcepts, role.relatedConcepts), k2 = 0; k2 < concepts.length; k2++) relation = concepts[k2], relation.module === "HTML" && (concept = relation.concept, concept != null && relationConcepts.push(concept));
    relationConcepts.length > 0 && roleElement.push([key, relationConcepts]);
  }
  var key, role, relationConcepts, concepts, relation, concept, k2, i, roleElementMap = { entries: function() {
    return roleElement;
  }, forEach: function(fn3) {
    var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, _iterator = _createForOfIteratorHelper(roleElement), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var _step$value = _slicedToArray(_step.value, 2), _key = _step$value[0], values = _step$value[1];
        fn3.call(thisArg, values, _key, roleElement);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }, get: function(key2) {
    var item = roleElement.find(function(tuple) {
      return tuple[0] === key2;
    });
    return item && item[1];
  }, has: function(key2) {
    return !!roleElementMap.get(key2);
  }, keys: function() {
    return roleElement.map(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 1), key2 = _ref2[0];
      return key2;
    });
  }, values: function() {
    return roleElement.map(function(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
      return values2;
    });
  } }, _default2 = (0, _iterationDecorator.default)(roleElementMap, roleElementMap.entries());
  exports.default = _default2;
} });
var require_lib = __commonJS({ "../../node_modules/aria-query/lib/index.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.roles = exports.roleElements = exports.elementRoles = exports.dom = exports.aria = void 0;
  var _ariaPropsMap = _interopRequireDefault(require_ariaPropsMap()), _domMap = _interopRequireDefault(require_domMap()), _rolesMap = _interopRequireDefault(require_rolesMap()), _elementRoleMap = _interopRequireDefault(require_elementRoleMap()), _roleElementMap = _interopRequireDefault(require_roleElementMap());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var aria = _ariaPropsMap.default;
  exports.aria = aria;
  var dom = _domMap.default;
  exports.dom = dom;
  var roles3 = _rolesMap.default;
  exports.roles = roles3;
  var elementRoles3 = _elementRoleMap.default;
  exports.elementRoles = elementRoles3;
  var roleElements2 = _roleElementMap.default;
  exports.roleElements = roleElements2;
} });
var require_color_name = __commonJS({ "../../node_modules/color-name/index.js"(exports, module2) {
  module2.exports = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] };
} });
var require_conversions = __commonJS({ "../../node_modules/color-convert/conversions.js"(exports, module2) {
  var cssKeywords = require_color_name(), reverseKeywords = {};
  for (let key of Object.keys(cssKeywords)) reverseKeywords[cssKeywords[key]] = key;
  var convert = { rgb: { channels: 3, labels: "rgb" }, hsl: { channels: 3, labels: "hsl" }, hsv: { channels: 3, labels: "hsv" }, hwb: { channels: 3, labels: "hwb" }, cmyk: { channels: 4, labels: "cmyk" }, xyz: { channels: 3, labels: "xyz" }, lab: { channels: 3, labels: "lab" }, lch: { channels: 3, labels: "lch" }, hex: { channels: 1, labels: ["hex"] }, keyword: { channels: 1, labels: ["keyword"] }, ansi16: { channels: 1, labels: ["ansi16"] }, ansi256: { channels: 1, labels: ["ansi256"] }, hcg: { channels: 3, labels: ["h", "c", "g"] }, apple: { channels: 3, labels: ["r16", "g16", "b16"] }, gray: { channels: 1, labels: ["gray"] } };
  module2.exports = convert;
  for (let model of Object.keys(convert)) {
    if (!("channels" in convert[model])) throw new Error("missing channels property: " + model);
    if (!("labels" in convert[model])) throw new Error("missing channel labels property: " + model);
    if (convert[model].labels.length !== convert[model].channels) throw new Error("channel and label counts mismatch: " + model);
    let { channels, labels } = convert[model];
    delete convert[model].channels, delete convert[model].labels, Object.defineProperty(convert[model], "channels", { value: channels }), Object.defineProperty(convert[model], "labels", { value: labels });
  }
  convert.rgb.hsl = function(rgb) {
    let r = rgb[0] / 255, g3 = rgb[1] / 255, b = rgb[2] / 255, min = Math.min(r, g3, b), max = Math.max(r, g3, b), delta = max - min, h2, s;
    max === min ? h2 = 0 : r === max ? h2 = (g3 - b) / delta : g3 === max ? h2 = 2 + (b - r) / delta : b === max && (h2 = 4 + (r - g3) / delta), h2 = Math.min(h2 * 60, 360), h2 < 0 && (h2 += 360);
    let l = (min + max) / 2;
    return max === min ? s = 0 : l <= 0.5 ? s = delta / (max + min) : s = delta / (2 - max - min), [h2, s * 100, l * 100];
  };
  convert.rgb.hsv = function(rgb) {
    let rdif, gdif, bdif, h2, s, r = rgb[0] / 255, g3 = rgb[1] / 255, b = rgb[2] / 255, v = Math.max(r, g3, b), diff2 = v - Math.min(r, g3, b), diffc = function(c) {
      return (v - c) / 6 / diff2 + 1 / 2;
    };
    return diff2 === 0 ? (h2 = 0, s = 0) : (s = diff2 / v, rdif = diffc(r), gdif = diffc(g3), bdif = diffc(b), r === v ? h2 = bdif - gdif : g3 === v ? h2 = 1 / 3 + rdif - bdif : b === v && (h2 = 2 / 3 + gdif - rdif), h2 < 0 ? h2 += 1 : h2 > 1 && (h2 -= 1)), [h2 * 360, s * 100, v * 100];
  };
  convert.rgb.hwb = function(rgb) {
    let r = rgb[0], g3 = rgb[1], b = rgb[2], h2 = convert.rgb.hsl(rgb)[0], w2 = 1 / 255 * Math.min(r, Math.min(g3, b));
    return b = 1 - 1 / 255 * Math.max(r, Math.max(g3, b)), [h2, w2 * 100, b * 100];
  };
  convert.rgb.cmyk = function(rgb) {
    let r = rgb[0] / 255, g3 = rgb[1] / 255, b = rgb[2] / 255, k2 = Math.min(1 - r, 1 - g3, 1 - b), c = (1 - r - k2) / (1 - k2) || 0, m2 = (1 - g3 - k2) / (1 - k2) || 0, y2 = (1 - b - k2) / (1 - k2) || 0;
    return [c * 100, m2 * 100, y2 * 100, k2 * 100];
  };
  function comparativeDistance(x2, y2) {
    return (x2[0] - y2[0]) ** 2 + (x2[1] - y2[1]) ** 2 + (x2[2] - y2[2]) ** 2;
  }
  convert.rgb.keyword = function(rgb) {
    let reversed = reverseKeywords[rgb];
    if (reversed) return reversed;
    let currentClosestDistance = 1 / 0, currentClosestKeyword;
    for (let keyword of Object.keys(cssKeywords)) {
      let value = cssKeywords[keyword], distance = comparativeDistance(rgb, value);
      distance < currentClosestDistance && (currentClosestDistance = distance, currentClosestKeyword = keyword);
    }
    return currentClosestKeyword;
  };
  convert.keyword.rgb = function(keyword) {
    return cssKeywords[keyword];
  };
  convert.rgb.xyz = function(rgb) {
    let r = rgb[0] / 255, g3 = rgb[1] / 255, b = rgb[2] / 255;
    r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92, g3 = g3 > 0.04045 ? ((g3 + 0.055) / 1.055) ** 2.4 : g3 / 12.92, b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
    let x2 = r * 0.4124 + g3 * 0.3576 + b * 0.1805, y2 = r * 0.2126 + g3 * 0.7152 + b * 0.0722, z = r * 0.0193 + g3 * 0.1192 + b * 0.9505;
    return [x2 * 100, y2 * 100, z * 100];
  };
  convert.rgb.lab = function(rgb) {
    let xyz = convert.rgb.xyz(rgb), x2 = xyz[0], y2 = xyz[1], z = xyz[2];
    x2 /= 95.047, y2 /= 100, z /= 108.883, x2 = x2 > 8856e-6 ? x2 ** (1 / 3) : 7.787 * x2 + 16 / 116, y2 = y2 > 8856e-6 ? y2 ** (1 / 3) : 7.787 * y2 + 16 / 116, z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    let l = 116 * y2 - 16, a2 = 500 * (x2 - y2), b = 200 * (y2 - z);
    return [l, a2, b];
  };
  convert.hsl.rgb = function(hsl) {
    let h2 = hsl[0] / 360, s = hsl[1] / 100, l = hsl[2] / 100, t2, t3, val;
    if (s === 0) return val = l * 255, [val, val, val];
    l < 0.5 ? t2 = l * (1 + s) : t2 = l + s - l * s;
    let t1 = 2 * l - t2, rgb = [0, 0, 0];
    for (let i = 0; i < 3; i++) t3 = h2 + 1 / 3 * -(i - 1), t3 < 0 && t3++, t3 > 1 && t3--, 6 * t3 < 1 ? val = t1 + (t2 - t1) * 6 * t3 : 2 * t3 < 1 ? val = t2 : 3 * t3 < 2 ? val = t1 + (t2 - t1) * (2 / 3 - t3) * 6 : val = t1, rgb[i] = val * 255;
    return rgb;
  };
  convert.hsl.hsv = function(hsl) {
    let h2 = hsl[0], s = hsl[1] / 100, l = hsl[2] / 100, smin = s, lmin = Math.max(l, 0.01);
    l *= 2, s *= l <= 1 ? l : 2 - l, smin *= lmin <= 1 ? lmin : 2 - lmin;
    let v = (l + s) / 2, sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
    return [h2, sv * 100, v * 100];
  };
  convert.hsv.rgb = function(hsv) {
    let h2 = hsv[0] / 60, s = hsv[1] / 100, v = hsv[2] / 100, hi = Math.floor(h2) % 6, f4 = h2 - Math.floor(h2), p3 = 255 * v * (1 - s), q = 255 * v * (1 - s * f4), t = 255 * v * (1 - s * (1 - f4));
    switch (v *= 255, hi) {
      case 0:
        return [v, t, p3];
      case 1:
        return [q, v, p3];
      case 2:
        return [p3, v, t];
      case 3:
        return [p3, q, v];
      case 4:
        return [t, p3, v];
      case 5:
        return [v, p3, q];
    }
  };
  convert.hsv.hsl = function(hsv) {
    let h2 = hsv[0], s = hsv[1] / 100, v = hsv[2] / 100, vmin = Math.max(v, 0.01), sl, l;
    l = (2 - s) * v;
    let lmin = (2 - s) * vmin;
    return sl = s * vmin, sl /= lmin <= 1 ? lmin : 2 - lmin, sl = sl || 0, l /= 2, [h2, sl * 100, l * 100];
  };
  convert.hwb.rgb = function(hwb) {
    let h2 = hwb[0] / 360, wh = hwb[1] / 100, bl = hwb[2] / 100, ratio = wh + bl, f4;
    ratio > 1 && (wh /= ratio, bl /= ratio);
    let i = Math.floor(6 * h2), v = 1 - bl;
    f4 = 6 * h2 - i, i & 1 && (f4 = 1 - f4);
    let n = wh + f4 * (v - wh), r, g3, b;
    switch (i) {
      default:
      case 6:
      case 0:
        r = v, g3 = n, b = wh;
        break;
      case 1:
        r = n, g3 = v, b = wh;
        break;
      case 2:
        r = wh, g3 = v, b = n;
        break;
      case 3:
        r = wh, g3 = n, b = v;
        break;
      case 4:
        r = n, g3 = wh, b = v;
        break;
      case 5:
        r = v, g3 = wh, b = n;
        break;
    }
    return [r * 255, g3 * 255, b * 255];
  };
  convert.cmyk.rgb = function(cmyk) {
    let c = cmyk[0] / 100, m2 = cmyk[1] / 100, y2 = cmyk[2] / 100, k2 = cmyk[3] / 100, r = 1 - Math.min(1, c * (1 - k2) + k2), g3 = 1 - Math.min(1, m2 * (1 - k2) + k2), b = 1 - Math.min(1, y2 * (1 - k2) + k2);
    return [r * 255, g3 * 255, b * 255];
  };
  convert.xyz.rgb = function(xyz) {
    let x2 = xyz[0] / 100, y2 = xyz[1] / 100, z = xyz[2] / 100, r, g3, b;
    return r = x2 * 3.2406 + y2 * -1.5372 + z * -0.4986, g3 = x2 * -0.9689 + y2 * 1.8758 + z * 0.0415, b = x2 * 0.0557 + y2 * -0.204 + z * 1.057, r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92, g3 = g3 > 31308e-7 ? 1.055 * g3 ** (1 / 2.4) - 0.055 : g3 * 12.92, b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92, r = Math.min(Math.max(0, r), 1), g3 = Math.min(Math.max(0, g3), 1), b = Math.min(Math.max(0, b), 1), [r * 255, g3 * 255, b * 255];
  };
  convert.xyz.lab = function(xyz) {
    let x2 = xyz[0], y2 = xyz[1], z = xyz[2];
    x2 /= 95.047, y2 /= 100, z /= 108.883, x2 = x2 > 8856e-6 ? x2 ** (1 / 3) : 7.787 * x2 + 16 / 116, y2 = y2 > 8856e-6 ? y2 ** (1 / 3) : 7.787 * y2 + 16 / 116, z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    let l = 116 * y2 - 16, a2 = 500 * (x2 - y2), b = 200 * (y2 - z);
    return [l, a2, b];
  };
  convert.lab.xyz = function(lab) {
    let l = lab[0], a2 = lab[1], b = lab[2], x2, y2, z;
    y2 = (l + 16) / 116, x2 = a2 / 500 + y2, z = y2 - b / 200;
    let y22 = y2 ** 3, x22 = x2 ** 3, z2 = z ** 3;
    return y2 = y22 > 8856e-6 ? y22 : (y2 - 16 / 116) / 7.787, x2 = x22 > 8856e-6 ? x22 : (x2 - 16 / 116) / 7.787, z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787, x2 *= 95.047, y2 *= 100, z *= 108.883, [x2, y2, z];
  };
  convert.lab.lch = function(lab) {
    let l = lab[0], a2 = lab[1], b = lab[2], h2;
    h2 = Math.atan2(b, a2) * 360 / 2 / Math.PI, h2 < 0 && (h2 += 360);
    let c = Math.sqrt(a2 * a2 + b * b);
    return [l, c, h2];
  };
  convert.lch.lab = function(lch) {
    let l = lch[0], c = lch[1], hr = lch[2] / 360 * 2 * Math.PI, a2 = c * Math.cos(hr), b = c * Math.sin(hr);
    return [l, a2, b];
  };
  convert.rgb.ansi16 = function(args, saturation = null) {
    let [r, g3, b] = args, value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
    if (value = Math.round(value / 50), value === 0) return 30;
    let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g3 / 255) << 1 | Math.round(r / 255));
    return value === 2 && (ansi += 60), ansi;
  };
  convert.hsv.ansi16 = function(args) {
    return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
  };
  convert.rgb.ansi256 = function(args) {
    let r = args[0], g3 = args[1], b = args[2];
    return r === g3 && g3 === b ? r < 8 ? 16 : r > 248 ? 231 : Math.round((r - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g3 / 255 * 5) + Math.round(b / 255 * 5);
  };
  convert.ansi16.rgb = function(args) {
    let color = args % 10;
    if (color === 0 || color === 7) return args > 50 && (color += 3.5), color = color / 10.5 * 255, [color, color, color];
    let mult = (~~(args > 50) + 1) * 0.5, r = (color & 1) * mult * 255, g3 = (color >> 1 & 1) * mult * 255, b = (color >> 2 & 1) * mult * 255;
    return [r, g3, b];
  };
  convert.ansi256.rgb = function(args) {
    if (args >= 232) {
      let c = (args - 232) * 10 + 8;
      return [c, c, c];
    }
    args -= 16;
    let rem, r = Math.floor(args / 36) / 5 * 255, g3 = Math.floor((rem = args % 36) / 6) / 5 * 255, b = rem % 6 / 5 * 255;
    return [r, g3, b];
  };
  convert.rgb.hex = function(args) {
    let string = (((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255)).toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.hex.rgb = function(args) {
    let match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) return [0, 0, 0];
    let colorString = match[0];
    match[0].length === 3 && (colorString = colorString.split("").map((char) => char + char).join(""));
    let integer = parseInt(colorString, 16), r = integer >> 16 & 255, g3 = integer >> 8 & 255, b = integer & 255;
    return [r, g3, b];
  };
  convert.rgb.hcg = function(rgb) {
    let r = rgb[0] / 255, g3 = rgb[1] / 255, b = rgb[2] / 255, max = Math.max(Math.max(r, g3), b), min = Math.min(Math.min(r, g3), b), chroma = max - min, grayscale, hue;
    return chroma < 1 ? grayscale = min / (1 - chroma) : grayscale = 0, chroma <= 0 ? hue = 0 : max === r ? hue = (g3 - b) / chroma % 6 : max === g3 ? hue = 2 + (b - r) / chroma : hue = 4 + (r - g3) / chroma, hue /= 6, hue %= 1, [hue * 360, chroma * 100, grayscale * 100];
  };
  convert.hsl.hcg = function(hsl) {
    let s = hsl[1] / 100, l = hsl[2] / 100, c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l), f4 = 0;
    return c < 1 && (f4 = (l - 0.5 * c) / (1 - c)), [hsl[0], c * 100, f4 * 100];
  };
  convert.hsv.hcg = function(hsv) {
    let s = hsv[1] / 100, v = hsv[2] / 100, c = s * v, f4 = 0;
    return c < 1 && (f4 = (v - c) / (1 - c)), [hsv[0], c * 100, f4 * 100];
  };
  convert.hcg.rgb = function(hcg) {
    let h2 = hcg[0] / 360, c = hcg[1] / 100, g3 = hcg[2] / 100;
    if (c === 0) return [g3 * 255, g3 * 255, g3 * 255];
    let pure = [0, 0, 0], hi = h2 % 1 * 6, v = hi % 1, w2 = 1 - v, mg = 0;
    switch (Math.floor(hi)) {
      case 0:
        pure[0] = 1, pure[1] = v, pure[2] = 0;
        break;
      case 1:
        pure[0] = w2, pure[1] = 1, pure[2] = 0;
        break;
      case 2:
        pure[0] = 0, pure[1] = 1, pure[2] = v;
        break;
      case 3:
        pure[0] = 0, pure[1] = w2, pure[2] = 1;
        break;
      case 4:
        pure[0] = v, pure[1] = 0, pure[2] = 1;
        break;
      default:
        pure[0] = 1, pure[1] = 0, pure[2] = w2;
    }
    return mg = (1 - c) * g3, [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255];
  };
  convert.hcg.hsv = function(hcg) {
    let c = hcg[1] / 100, g3 = hcg[2] / 100, v = c + g3 * (1 - c), f4 = 0;
    return v > 0 && (f4 = c / v), [hcg[0], f4 * 100, v * 100];
  };
  convert.hcg.hsl = function(hcg) {
    let c = hcg[1] / 100, l = hcg[2] / 100 * (1 - c) + 0.5 * c, s = 0;
    return l > 0 && l < 0.5 ? s = c / (2 * l) : l >= 0.5 && l < 1 && (s = c / (2 * (1 - l))), [hcg[0], s * 100, l * 100];
  };
  convert.hcg.hwb = function(hcg) {
    let c = hcg[1] / 100, g3 = hcg[2] / 100, v = c + g3 * (1 - c);
    return [hcg[0], (v - c) * 100, (1 - v) * 100];
  };
  convert.hwb.hcg = function(hwb) {
    let w2 = hwb[1] / 100, v = 1 - hwb[2] / 100, c = v - w2, g3 = 0;
    return c < 1 && (g3 = (v - c) / (1 - c)), [hwb[0], c * 100, g3 * 100];
  };
  convert.apple.rgb = function(apple) {
    return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
  };
  convert.rgb.apple = function(rgb) {
    return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
  };
  convert.gray.rgb = function(args) {
    return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
  };
  convert.gray.hsl = function(args) {
    return [0, 0, args[0]];
  };
  convert.gray.hsv = convert.gray.hsl;
  convert.gray.hwb = function(gray) {
    return [0, 100, gray[0]];
  };
  convert.gray.cmyk = function(gray) {
    return [0, 0, 0, gray[0]];
  };
  convert.gray.lab = function(gray) {
    return [gray[0], 0, 0];
  };
  convert.gray.hex = function(gray) {
    let val = Math.round(gray[0] / 100 * 255) & 255, string = ((val << 16) + (val << 8) + val).toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.rgb.gray = function(rgb) {
    return [(rgb[0] + rgb[1] + rgb[2]) / 3 / 255 * 100];
  };
} });
var require_route = __commonJS({ "../../node_modules/color-convert/route.js"(exports, module2) {
  var conversions = require_conversions();
  function buildGraph() {
    let graph = {}, models = Object.keys(conversions);
    for (let len = models.length, i = 0; i < len; i++) graph[models[i]] = { distance: -1, parent: null };
    return graph;
  }
  function deriveBFS(fromModel) {
    let graph = buildGraph(), queue = [fromModel];
    for (graph[fromModel].distance = 0; queue.length; ) {
      let current = queue.pop(), adjacents = Object.keys(conversions[current]);
      for (let len = adjacents.length, i = 0; i < len; i++) {
        let adjacent = adjacents[i], node = graph[adjacent];
        node.distance === -1 && (node.distance = graph[current].distance + 1, node.parent = current, queue.unshift(adjacent));
      }
    }
    return graph;
  }
  function link(from, to) {
    return function(args) {
      return to(from(args));
    };
  }
  function wrapConversion(toModel, graph) {
    let path = [graph[toModel].parent, toModel], fn3 = conversions[graph[toModel].parent][toModel], cur = graph[toModel].parent;
    for (; graph[cur].parent; ) path.unshift(graph[cur].parent), fn3 = link(conversions[graph[cur].parent][cur], fn3), cur = graph[cur].parent;
    return fn3.conversion = path, fn3;
  }
  module2.exports = function(fromModel) {
    let graph = deriveBFS(fromModel), conversion = {}, models = Object.keys(graph);
    for (let len = models.length, i = 0; i < len; i++) {
      let toModel = models[i];
      graph[toModel].parent !== null && (conversion[toModel] = wrapConversion(toModel, graph));
    }
    return conversion;
  };
} });
var require_color_convert = __commonJS({ "../../node_modules/color-convert/index.js"(exports, module2) {
  var conversions = require_conversions(), route = require_route(), convert = {}, models = Object.keys(conversions);
  function wrapRaw(fn3) {
    let wrappedFn = function(...args) {
      let arg0 = args[0];
      return arg0 == null ? arg0 : (arg0.length > 1 && (args = arg0), fn3(args));
    };
    return "conversion" in fn3 && (wrappedFn.conversion = fn3.conversion), wrappedFn;
  }
  function wrapRounded(fn3) {
    let wrappedFn = function(...args) {
      let arg0 = args[0];
      if (arg0 == null) return arg0;
      arg0.length > 1 && (args = arg0);
      let result = fn3(args);
      if (typeof result == "object") for (let len = result.length, i = 0; i < len; i++) result[i] = Math.round(result[i]);
      return result;
    };
    return "conversion" in fn3 && (wrappedFn.conversion = fn3.conversion), wrappedFn;
  }
  models.forEach((fromModel) => {
    convert[fromModel] = {}, Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels }), Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
    let routes = route(fromModel);
    Object.keys(routes).forEach((toModel) => {
      let fn3 = routes[toModel];
      convert[fromModel][toModel] = wrapRounded(fn3), convert[fromModel][toModel].raw = wrapRaw(fn3);
    });
  });
  module2.exports = convert;
} });
var require_ansi_styles = __commonJS({ "../../node_modules/ansi-styles/index.js"(exports, module2) {
  var wrapAnsi16 = (fn3, offset) => (...args) => `\x1B[${fn3(...args) + offset}m`, wrapAnsi256 = (fn3, offset) => (...args) => {
    let code = fn3(...args);
    return `\x1B[${38 + offset};5;${code}m`;
  }, wrapAnsi16m = (fn3, offset) => (...args) => {
    let rgb = fn3(...args);
    return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
  }, ansi2ansi = (n) => n, rgb2rgb = (r, g3, b) => [r, g3, b], setLazyProperty = (object, property, get2) => {
    Object.defineProperty(object, property, { get: () => {
      let value = get2();
      return Object.defineProperty(object, property, { value, enumerable: true, configurable: true }), value;
    }, enumerable: true, configurable: true });
  }, colorConvert, makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
    colorConvert === void 0 && (colorConvert = require_color_convert());
    let offset = isBackground ? 10 : 0, styles3 = {};
    for (let [sourceSpace, suite] of Object.entries(colorConvert)) {
      let name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
      sourceSpace === targetSpace ? styles3[name] = wrap(identity, offset) : typeof suite == "object" && (styles3[name] = wrap(suite[targetSpace], offset));
    }
    return styles3;
  };
  function assembleStyles() {
    let codes = /* @__PURE__ */ new Map(), styles3 = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
    styles3.color.gray = styles3.color.blackBright, styles3.bgColor.bgGray = styles3.bgColor.bgBlackBright, styles3.color.grey = styles3.color.blackBright, styles3.bgColor.bgGrey = styles3.bgColor.bgBlackBright;
    for (let [groupName, group] of Object.entries(styles3)) {
      for (let [styleName, style] of Object.entries(group)) styles3[styleName] = { open: `\x1B[${style[0]}m`, close: `\x1B[${style[1]}m` }, group[styleName] = styles3[styleName], codes.set(style[0], style[1]);
      Object.defineProperty(styles3, groupName, { value: group, enumerable: false });
    }
    return Object.defineProperty(styles3, "codes", { value: codes, enumerable: false }), styles3.color.close = "\x1B[39m", styles3.bgColor.close = "\x1B[49m", setLazyProperty(styles3.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false)), setLazyProperty(styles3.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false)), setLazyProperty(styles3.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false)), setLazyProperty(styles3.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true)), setLazyProperty(styles3.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true)), setLazyProperty(styles3.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true)), styles3;
  }
  Object.defineProperty(module2, "exports", { enumerable: true, get: assembleStyles });
} });
var require_browser = __commonJS({ "../../node_modules/supports-color/browser.js"(exports, module2) {
  module2.exports = { stdout: false, stderr: false };
} });
var require_util2 = __commonJS({ "../../node_modules/@testing-library/jest-dom/node_modules/chalk/source/util.js"(exports, module2) {
  var stringReplaceAll = (string, substring, replacer) => {
    let index = string.indexOf(substring);
    if (index === -1) return string;
    let substringLength = substring.length, endIndex = 0, returnValue = "";
    do
      returnValue += string.substr(endIndex, index - endIndex) + substring + replacer, endIndex = index + substringLength, index = string.indexOf(substring, endIndex);
    while (index !== -1);
    return returnValue += string.substr(endIndex), returnValue;
  }, stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
    let endIndex = 0, returnValue = "";
    do {
      let gotCR = string[index - 1] === "\r";
      returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? `\r
` : `
`) + postfix, endIndex = index + 1, index = string.indexOf(`
`, endIndex);
    } while (index !== -1);
    return returnValue += string.substr(endIndex), returnValue;
  };
  module2.exports = { stringReplaceAll, stringEncaseCRLFWithFirstIndex };
} });
var require_templates = __commonJS({ "../../node_modules/@testing-library/jest-dom/node_modules/chalk/source/templates.js"(exports, module2) {
  var TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi, STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g, STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/, ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.)|([^\\])/gi, ESCAPES = /* @__PURE__ */ new Map([["n", `
`], ["r", "\r"], ["t", "	"], ["b", "\b"], ["f", "\f"], ["v", "\v"], ["0", "\0"], ["\\", "\\"], ["e", "\x1B"], ["a", "\x07"]]);
  function unescape(c) {
    let u2 = c[0] === "u", bracket = c[1] === "{";
    return u2 && !bracket && c.length === 5 || c[0] === "x" && c.length === 3 ? String.fromCharCode(parseInt(c.slice(1), 16)) : u2 && bracket ? String.fromCodePoint(parseInt(c.slice(2, -1), 16)) : ESCAPES.get(c) || c;
  }
  function parseArguments(name, arguments_) {
    let results = [], chunks = arguments_.trim().split(/\s*,\s*/g), matches3;
    for (let chunk of chunks) {
      let number = Number(chunk);
      if (!Number.isNaN(number)) results.push(number);
      else if (matches3 = chunk.match(STRING_REGEX)) results.push(matches3[2].replace(ESCAPE_REGEX, (m2, escape4, character) => escape4 ? unescape(escape4) : character));
      else throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
    }
    return results;
  }
  function parseStyle(style) {
    STYLE_REGEX.lastIndex = 0;
    let results = [], matches3;
    for (; (matches3 = STYLE_REGEX.exec(style)) !== null; ) {
      let name = matches3[1];
      if (matches3[2]) {
        let args = parseArguments(name, matches3[2]);
        results.push([name].concat(args));
      } else results.push([name]);
    }
    return results;
  }
  function buildStyle(chalk3, styles3) {
    let enabled = {};
    for (let layer of styles3) for (let style of layer.styles) enabled[style[0]] = layer.inverse ? null : style.slice(1);
    let current = chalk3;
    for (let [styleName, styles4] of Object.entries(enabled)) if (Array.isArray(styles4)) {
      if (!(styleName in current)) throw new Error(`Unknown Chalk style: ${styleName}`);
      current = styles4.length > 0 ? current[styleName](...styles4) : current[styleName];
    }
    return current;
  }
  module2.exports = (chalk3, temporary) => {
    let styles3 = [], chunks = [], chunk = [];
    if (temporary.replace(TEMPLATE_REGEX, (m2, escapeCharacter, inverse, style, close, character) => {
      if (escapeCharacter) chunk.push(unescape(escapeCharacter));
      else if (style) {
        let string = chunk.join("");
        chunk = [], chunks.push(styles3.length === 0 ? string : buildStyle(chalk3, styles3)(string)), styles3.push({ inverse, styles: parseStyle(style) });
      } else if (close) {
        if (styles3.length === 0) throw new Error("Found extraneous } in Chalk template literal");
        chunks.push(buildStyle(chalk3, styles3)(chunk.join(""))), chunk = [], styles3.pop();
      } else chunk.push(character);
    }), chunks.push(chunk.join("")), styles3.length > 0) {
      let errMsg = `Chalk template literal is missing ${styles3.length} closing bracket${styles3.length === 1 ? "" : "s"} (\`}\`)`;
      throw new Error(errMsg);
    }
    return chunks.join("");
  };
} });
var require_source = __commonJS({ "../../node_modules/@testing-library/jest-dom/node_modules/chalk/source/index.js"(exports, module2) {
  var ansiStyles = require_ansi_styles(), { stdout: stdoutColor, stderr: stderrColor } = require_browser(), { stringReplaceAll, stringEncaseCRLFWithFirstIndex } = require_util2(), levelMapping = ["ansi", "ansi", "ansi256", "ansi16m"], styles3 = /* @__PURE__ */ Object.create(null), applyOptions = (object, options = {}) => {
    if (options.level > 3 || options.level < 0) throw new Error("The `level` option should be an integer from 0 to 3");
    let colorLevel = stdoutColor ? stdoutColor.level : 0;
    object.level = options.level === void 0 ? colorLevel : options.level;
  }, ChalkClass = class {
    constructor(options) {
      return chalkFactory(options);
    }
  }, chalkFactory = (options) => {
    let chalk4 = {};
    return applyOptions(chalk4, options), chalk4.template = (...arguments_) => chalkTag(chalk4.template, ...arguments_), Object.setPrototypeOf(chalk4, Chalk.prototype), Object.setPrototypeOf(chalk4.template, chalk4), chalk4.template.constructor = () => {
      throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
    }, chalk4.template.Instance = ChalkClass, chalk4.template;
  };
  function Chalk(options) {
    return chalkFactory(options);
  }
  for (let [styleName, style] of Object.entries(ansiStyles)) styles3[styleName] = { get() {
    let builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
    return Object.defineProperty(this, styleName, { value: builder }), builder;
  } };
  styles3.visible = { get() {
    let builder = createBuilder(this, this._styler, true);
    return Object.defineProperty(this, "visible", { value: builder }), builder;
  } };
  var usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
  for (let model of usedModels) styles3[model] = { get() {
    let { level } = this;
    return function(...arguments_) {
      let styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
      return createBuilder(this, styler, this._isEmpty);
    };
  } };
  for (let model of usedModels) {
    let bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
    styles3[bgModel] = { get() {
      let { level } = this;
      return function(...arguments_) {
        let styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
        return createBuilder(this, styler, this._isEmpty);
      };
    } };
  }
  var proto = Object.defineProperties(() => {
  }, { ...styles3, level: { enumerable: true, get() {
    return this._generator.level;
  }, set(level) {
    this._generator.level = level;
  } } }), createStyler = (open, close, parent) => {
    let openAll, closeAll;
    return parent === void 0 ? (openAll = open, closeAll = close) : (openAll = parent.openAll + open, closeAll = close + parent.closeAll), { open, close, openAll, closeAll, parent };
  }, createBuilder = (self2, _styler, _isEmpty) => {
    let builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
    return builder.__proto__ = proto, builder._generator = self2, builder._styler = _styler, builder._isEmpty = _isEmpty, builder;
  }, applyStyle = (self2, string) => {
    if (self2.level <= 0 || !string) return self2._isEmpty ? "" : string;
    let styler = self2._styler;
    if (styler === void 0) return string;
    let { openAll, closeAll } = styler;
    if (string.indexOf("\x1B") !== -1) for (; styler !== void 0; ) string = stringReplaceAll(string, styler.close, styler.open), styler = styler.parent;
    let lfIndex = string.indexOf(`
`);
    return lfIndex !== -1 && (string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex)), openAll + string + closeAll;
  }, template, chalkTag = (chalk4, ...strings) => {
    let [firstString] = strings;
    if (!Array.isArray(firstString)) return strings.join(" ");
    let arguments_ = strings.slice(1), parts = [firstString.raw[0]];
    for (let i = 1; i < firstString.length; i++) parts.push(String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"), String(firstString.raw[i]));
    return template === void 0 && (template = require_templates()), template(chalk4, parts.join(""));
  };
  Object.defineProperties(Chalk.prototype, styles3);
  var chalk3 = Chalk();
  chalk3.supportsColor = stdoutColor;
  chalk3.stderr = Chalk({ level: stderrColor ? stderrColor.level : 0 });
  chalk3.stderr.supportsColor = stderrColor;
  chalk3.Level = { None: 0, Basic: 1, Ansi256: 2, TrueColor: 3, 0: "None", 1: "Basic", 2: "Ansi256", 3: "TrueColor" };
  module2.exports = chalk3;
} });
var require_listCacheClear = __commonJS({ "../../node_modules/lodash/_listCacheClear.js"(exports, module2) {
  function listCacheClear() {
    this.__data__ = [], this.size = 0;
  }
  module2.exports = listCacheClear;
} });
var require_eq = __commonJS({ "../../node_modules/lodash/eq.js"(exports, module2) {
  function eq2(value, other) {
    return value === other || value !== value && other !== other;
  }
  module2.exports = eq2;
} });
var require_assocIndexOf = __commonJS({ "../../node_modules/lodash/_assocIndexOf.js"(exports, module2) {
  var eq2 = require_eq();
  function assocIndexOf(array, key) {
    for (var length = array.length; length--; ) if (eq2(array[length][0], key)) return length;
    return -1;
  }
  module2.exports = assocIndexOf;
} });
var require_listCacheDelete = __commonJS({ "../../node_modules/lodash/_listCacheDelete.js"(exports, module2) {
  var assocIndexOf = require_assocIndexOf(), arrayProto = Array.prototype, splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) return false;
    var lastIndex = data.length - 1;
    return index == lastIndex ? data.pop() : splice.call(data, index, 1), --this.size, true;
  }
  module2.exports = listCacheDelete;
} });
var require_listCacheGet = __commonJS({ "../../node_modules/lodash/_listCacheGet.js"(exports, module2) {
  var assocIndexOf = require_assocIndexOf();
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  module2.exports = listCacheGet;
} });
var require_listCacheHas = __commonJS({ "../../node_modules/lodash/_listCacheHas.js"(exports, module2) {
  var assocIndexOf = require_assocIndexOf();
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  module2.exports = listCacheHas;
} });
var require_listCacheSet = __commonJS({ "../../node_modules/lodash/_listCacheSet.js"(exports, module2) {
  var assocIndexOf = require_assocIndexOf();
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? (++this.size, data.push([key, value])) : data[index][1] = value, this;
  }
  module2.exports = listCacheSet;
} });
var require_ListCache = __commonJS({ "../../node_modules/lodash/_ListCache.js"(exports, module2) {
  var listCacheClear = require_listCacheClear(), listCacheDelete = require_listCacheDelete(), listCacheGet = require_listCacheGet(), listCacheHas = require_listCacheHas(), listCacheSet = require_listCacheSet();
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    for (this.clear(); ++index < length; ) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype.delete = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  module2.exports = ListCache;
} });
var require_stackClear = __commonJS({ "../../node_modules/lodash/_stackClear.js"(exports, module2) {
  var ListCache = require_ListCache();
  function stackClear() {
    this.__data__ = new ListCache(), this.size = 0;
  }
  module2.exports = stackClear;
} });
var require_stackDelete = __commonJS({ "../../node_modules/lodash/_stackDelete.js"(exports, module2) {
  function stackDelete(key) {
    var data = this.__data__, result = data.delete(key);
    return this.size = data.size, result;
  }
  module2.exports = stackDelete;
} });
var require_stackGet = __commonJS({ "../../node_modules/lodash/_stackGet.js"(exports, module2) {
  function stackGet(key) {
    return this.__data__.get(key);
  }
  module2.exports = stackGet;
} });
var require_stackHas = __commonJS({ "../../node_modules/lodash/_stackHas.js"(exports, module2) {
  function stackHas(key) {
    return this.__data__.has(key);
  }
  module2.exports = stackHas;
} });
var require_freeGlobal = __commonJS({ "../../node_modules/lodash/_freeGlobal.js"(exports, module2) {
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  module2.exports = freeGlobal;
} });
var require_root = __commonJS({ "../../node_modules/lodash/_root.js"(exports, module2) {
  var freeGlobal = require_freeGlobal(), freeSelf = typeof self == "object" && self && self.Object === Object && self, root = freeGlobal || freeSelf || Function("return this")();
  module2.exports = root;
} });
var require_Symbol = __commonJS({ "../../node_modules/lodash/_Symbol.js"(exports, module2) {
  var root = require_root(), Symbol2 = root.Symbol;
  module2.exports = Symbol2;
} });
var require_getRawTag = __commonJS({ "../../node_modules/lodash/_getRawTag.js"(exports, module2) {
  var Symbol2 = require_Symbol(), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, nativeObjectToString = objectProto.toString, symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch {
    }
    var result = nativeObjectToString.call(value);
    return unmasked && (isOwn ? value[symToStringTag] = tag : delete value[symToStringTag]), result;
  }
  module2.exports = getRawTag;
} });
var require_objectToString = __commonJS({ "../../node_modules/lodash/_objectToString.js"(exports, module2) {
  var objectProto = Object.prototype, nativeObjectToString = objectProto.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  module2.exports = objectToString;
} });
var require_baseGetTag = __commonJS({ "../../node_modules/lodash/_baseGetTag.js"(exports, module2) {
  var Symbol2 = require_Symbol(), getRawTag = require_getRawTag(), objectToString = require_objectToString(), nullTag = "[object Null]", undefinedTag = "[object Undefined]", symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
  function baseGetTag(value) {
    return value == null ? value === void 0 ? undefinedTag : nullTag : symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  module2.exports = baseGetTag;
} });
var require_isObject = __commonJS({ "../../node_modules/lodash/isObject.js"(exports, module2) {
  function isObject2(value) {
    var type5 = typeof value;
    return value != null && (type5 == "object" || type5 == "function");
  }
  module2.exports = isObject2;
} });
var require_isFunction = __commonJS({ "../../node_modules/lodash/isFunction.js"(exports, module2) {
  var baseGetTag = require_baseGetTag(), isObject2 = require_isObject(), asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction(value) {
    if (!isObject2(value)) return false;
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  module2.exports = isFunction;
} });
var require_coreJsData = __commonJS({ "../../node_modules/lodash/_coreJsData.js"(exports, module2) {
  var root = require_root(), coreJsData = root["__core-js_shared__"];
  module2.exports = coreJsData;
} });
var require_isMasked = __commonJS({ "../../node_modules/lodash/_isMasked.js"(exports, module2) {
  var coreJsData = require_coreJsData(), maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  module2.exports = isMasked;
} });
var require_toSource = __commonJS({ "../../node_modules/lodash/_toSource.js"(exports, module2) {
  var funcProto = Function.prototype, funcToString = funcProto.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch {
      }
      try {
        return func + "";
      } catch {
      }
    }
    return "";
  }
  module2.exports = toSource;
} });
var require_baseIsNative = __commonJS({ "../../node_modules/lodash/_baseIsNative.js"(exports, module2) {
  var isFunction = require_isFunction(), isMasked = require_isMasked(), isObject2 = require_isObject(), toSource = require_toSource(), reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reIsHostCtor = /^\[object .+?Constructor\]$/, funcProto = Function.prototype, objectProto = Object.prototype, funcToString = funcProto.toString, hasOwnProperty = objectProto.hasOwnProperty, reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function baseIsNative(value) {
    if (!isObject2(value) || isMasked(value)) return false;
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  module2.exports = baseIsNative;
} });
var require_getValue = __commonJS({ "../../node_modules/lodash/_getValue.js"(exports, module2) {
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  module2.exports = getValue;
} });
var require_getNative = __commonJS({ "../../node_modules/lodash/_getNative.js"(exports, module2) {
  var baseIsNative = require_baseIsNative(), getValue = require_getValue();
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  module2.exports = getNative;
} });
var require_Map = __commonJS({ "../../node_modules/lodash/_Map.js"(exports, module2) {
  var getNative = require_getNative(), root = require_root(), Map2 = getNative(root, "Map");
  module2.exports = Map2;
} });
var require_nativeCreate = __commonJS({ "../../node_modules/lodash/_nativeCreate.js"(exports, module2) {
  var getNative = require_getNative(), nativeCreate = getNative(Object, "create");
  module2.exports = nativeCreate;
} });
var require_hashClear = __commonJS({ "../../node_modules/lodash/_hashClear.js"(exports, module2) {
  var nativeCreate = require_nativeCreate();
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {}, this.size = 0;
  }
  module2.exports = hashClear;
} });
var require_hashDelete = __commonJS({ "../../node_modules/lodash/_hashDelete.js"(exports, module2) {
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    return this.size -= result ? 1 : 0, result;
  }
  module2.exports = hashDelete;
} });
var require_hashGet = __commonJS({ "../../node_modules/lodash/_hashGet.js"(exports, module2) {
  var nativeCreate = require_nativeCreate(), HASH_UNDEFINED = "__lodash_hash_undefined__", objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : void 0;
  }
  module2.exports = hashGet;
} });
var require_hashHas = __commonJS({ "../../node_modules/lodash/_hashHas.js"(exports, module2) {
  var nativeCreate = require_nativeCreate(), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
  }
  module2.exports = hashHas;
} });
var require_hashSet = __commonJS({ "../../node_modules/lodash/_hashSet.js"(exports, module2) {
  var nativeCreate = require_nativeCreate(), HASH_UNDEFINED = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    return this.size += this.has(key) ? 0 : 1, data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value, this;
  }
  module2.exports = hashSet;
} });
var require_Hash = __commonJS({ "../../node_modules/lodash/_Hash.js"(exports, module2) {
  var hashClear = require_hashClear(), hashDelete = require_hashDelete(), hashGet = require_hashGet(), hashHas = require_hashHas(), hashSet = require_hashSet();
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    for (this.clear(); ++index < length; ) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype.delete = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  module2.exports = Hash;
} });
var require_mapCacheClear = __commonJS({ "../../node_modules/lodash/_mapCacheClear.js"(exports, module2) {
  var Hash = require_Hash(), ListCache = require_ListCache(), Map2 = require_Map();
  function mapCacheClear() {
    this.size = 0, this.__data__ = { hash: new Hash(), map: new (Map2 || ListCache)(), string: new Hash() };
  }
  module2.exports = mapCacheClear;
} });
var require_isKeyable = __commonJS({ "../../node_modules/lodash/_isKeyable.js"(exports, module2) {
  function isKeyable(value) {
    var type5 = typeof value;
    return type5 == "string" || type5 == "number" || type5 == "symbol" || type5 == "boolean" ? value !== "__proto__" : value === null;
  }
  module2.exports = isKeyable;
} });
var require_getMapData = __commonJS({ "../../node_modules/lodash/_getMapData.js"(exports, module2) {
  var isKeyable = require_isKeyable();
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  module2.exports = getMapData;
} });
var require_mapCacheDelete = __commonJS({ "../../node_modules/lodash/_mapCacheDelete.js"(exports, module2) {
  var getMapData = require_getMapData();
  function mapCacheDelete(key) {
    var result = getMapData(this, key).delete(key);
    return this.size -= result ? 1 : 0, result;
  }
  module2.exports = mapCacheDelete;
} });
var require_mapCacheGet = __commonJS({ "../../node_modules/lodash/_mapCacheGet.js"(exports, module2) {
  var getMapData = require_getMapData();
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  module2.exports = mapCacheGet;
} });
var require_mapCacheHas = __commonJS({ "../../node_modules/lodash/_mapCacheHas.js"(exports, module2) {
  var getMapData = require_getMapData();
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  module2.exports = mapCacheHas;
} });
var require_mapCacheSet = __commonJS({ "../../node_modules/lodash/_mapCacheSet.js"(exports, module2) {
  var getMapData = require_getMapData();
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    return data.set(key, value), this.size += data.size == size ? 0 : 1, this;
  }
  module2.exports = mapCacheSet;
} });
var require_MapCache = __commonJS({ "../../node_modules/lodash/_MapCache.js"(exports, module2) {
  var mapCacheClear = require_mapCacheClear(), mapCacheDelete = require_mapCacheDelete(), mapCacheGet = require_mapCacheGet(), mapCacheHas = require_mapCacheHas(), mapCacheSet = require_mapCacheSet();
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    for (this.clear(); ++index < length; ) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype.delete = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  module2.exports = MapCache;
} });
var require_stackSet = __commonJS({ "../../node_modules/lodash/_stackSet.js"(exports, module2) {
  var ListCache = require_ListCache(), Map2 = require_Map(), MapCache = require_MapCache(), LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) return pairs.push([key, value]), this.size = ++data.size, this;
      data = this.__data__ = new MapCache(pairs);
    }
    return data.set(key, value), this.size = data.size, this;
  }
  module2.exports = stackSet;
} });
var require_Stack = __commonJS({ "../../node_modules/lodash/_Stack.js"(exports, module2) {
  var ListCache = require_ListCache(), stackClear = require_stackClear(), stackDelete = require_stackDelete(), stackGet = require_stackGet(), stackHas = require_stackHas(), stackSet = require_stackSet();
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype.delete = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  module2.exports = Stack;
} });
var require_setCacheAdd = __commonJS({ "../../node_modules/lodash/_setCacheAdd.js"(exports, module2) {
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function setCacheAdd(value) {
    return this.__data__.set(value, HASH_UNDEFINED), this;
  }
  module2.exports = setCacheAdd;
} });
var require_setCacheHas = __commonJS({ "../../node_modules/lodash/_setCacheHas.js"(exports, module2) {
  function setCacheHas(value) {
    return this.__data__.has(value);
  }
  module2.exports = setCacheHas;
} });
var require_SetCache = __commonJS({ "../../node_modules/lodash/_SetCache.js"(exports, module2) {
  var MapCache = require_MapCache(), setCacheAdd = require_setCacheAdd(), setCacheHas = require_setCacheHas();
  function SetCache(values) {
    var index = -1, length = values == null ? 0 : values.length;
    for (this.__data__ = new MapCache(); ++index < length; ) this.add(values[index]);
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;
  module2.exports = SetCache;
} });
var require_arraySome = __commonJS({ "../../node_modules/lodash/_arraySome.js"(exports, module2) {
  function arraySome(array, predicate) {
    for (var index = -1, length = array == null ? 0 : array.length; ++index < length; ) if (predicate(array[index], index, array)) return true;
    return false;
  }
  module2.exports = arraySome;
} });
var require_cacheHas = __commonJS({ "../../node_modules/lodash/_cacheHas.js"(exports, module2) {
  function cacheHas(cache, key) {
    return cache.has(key);
  }
  module2.exports = cacheHas;
} });
var require_equalArrays = __commonJS({ "../../node_modules/lodash/_equalArrays.js"(exports, module2) {
  var SetCache = require_SetCache(), arraySome = require_arraySome(), cacheHas = require_cacheHas(), COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) return false;
    var arrStacked = stack.get(array), othStacked = stack.get(other);
    if (arrStacked && othStacked) return arrStacked == other && othStacked == array;
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
    for (stack.set(array, other), stack.set(other, array); ++index < arrLength; ) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      if (compared !== void 0) {
        if (compared) continue;
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome(other, function(othValue2, othIndex) {
          if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) return seen.push(othIndex);
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    return stack.delete(array), stack.delete(other), result;
  }
  module2.exports = equalArrays;
} });
var require_Uint8Array = __commonJS({ "../../node_modules/lodash/_Uint8Array.js"(exports, module2) {
  var root = require_root(), Uint8Array2 = root.Uint8Array;
  module2.exports = Uint8Array2;
} });
var require_mapToArray = __commonJS({ "../../node_modules/lodash/_mapToArray.js"(exports, module2) {
  function mapToArray(map) {
    var index = -1, result = Array(map.size);
    return map.forEach(function(value, key) {
      result[++index] = [key, value];
    }), result;
  }
  module2.exports = mapToArray;
} });
var require_setToArray = __commonJS({ "../../node_modules/lodash/_setToArray.js"(exports, module2) {
  function setToArray(set2) {
    var index = -1, result = Array(set2.size);
    return set2.forEach(function(value) {
      result[++index] = value;
    }), result;
  }
  module2.exports = setToArray;
} });
var require_equalByTag = __commonJS({ "../../node_modules/lodash/_equalByTag.js"(exports, module2) {
  var Symbol2 = require_Symbol(), Uint8Array2 = require_Uint8Array(), eq2 = require_eq(), equalArrays = require_equalArrays(), mapToArray = require_mapToArray(), setToArray = require_setToArray(), COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2, boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return false;
        object = object.buffer, other = other.buffer;
      case arrayBufferTag:
        return !(object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other)));
      case boolTag:
      case dateTag:
      case numberTag:
        return eq2(+object, +other);
      case errorTag:
        return object.name == other.name && object.message == other.message;
      case regexpTag:
      case stringTag:
        return object == other + "";
      case mapTag:
        var convert = mapToArray;
      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
        if (convert || (convert = setToArray), object.size != other.size && !isPartial) return false;
        var stacked = stack.get(object);
        if (stacked) return stacked == other;
        bitmask |= COMPARE_UNORDERED_FLAG, stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        return stack.delete(object), result;
      case symbolTag:
        if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
    }
    return false;
  }
  module2.exports = equalByTag;
} });
var require_arrayPush = __commonJS({ "../../node_modules/lodash/_arrayPush.js"(exports, module2) {
  function arrayPush(array, values) {
    for (var index = -1, length = values.length, offset = array.length; ++index < length; ) array[offset + index] = values[index];
    return array;
  }
  module2.exports = arrayPush;
} });
var require_isArray = __commonJS({ "../../node_modules/lodash/isArray.js"(exports, module2) {
  var isArray = Array.isArray;
  module2.exports = isArray;
} });
var require_baseGetAllKeys = __commonJS({ "../../node_modules/lodash/_baseGetAllKeys.js"(exports, module2) {
  var arrayPush = require_arrayPush(), isArray = require_isArray();
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  module2.exports = baseGetAllKeys;
} });
var require_arrayFilter = __commonJS({ "../../node_modules/lodash/_arrayFilter.js"(exports, module2) {
  function arrayFilter(array, predicate) {
    for (var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = []; ++index < length; ) {
      var value = array[index];
      predicate(value, index, array) && (result[resIndex++] = value);
    }
    return result;
  }
  module2.exports = arrayFilter;
} });
var require_stubArray = __commonJS({ "../../node_modules/lodash/stubArray.js"(exports, module2) {
  function stubArray() {
    return [];
  }
  module2.exports = stubArray;
} });
var require_getSymbols = __commonJS({ "../../node_modules/lodash/_getSymbols.js"(exports, module2) {
  var arrayFilter = require_arrayFilter(), stubArray = require_stubArray(), objectProto = Object.prototype, propertyIsEnumerable = objectProto.propertyIsEnumerable, nativeGetSymbols = Object.getOwnPropertySymbols, getSymbols = nativeGetSymbols ? function(object) {
    return object == null ? [] : (object = Object(object), arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    }));
  } : stubArray;
  module2.exports = getSymbols;
} });
var require_baseTimes = __commonJS({ "../../node_modules/lodash/_baseTimes.js"(exports, module2) {
  function baseTimes(n, iteratee) {
    for (var index = -1, result = Array(n); ++index < n; ) result[index] = iteratee(index);
    return result;
  }
  module2.exports = baseTimes;
} });
var require_isObjectLike = __commonJS({ "../../node_modules/lodash/isObjectLike.js"(exports, module2) {
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  module2.exports = isObjectLike;
} });
var require_baseIsArguments = __commonJS({ "../../node_modules/lodash/_baseIsArguments.js"(exports, module2) {
  var baseGetTag = require_baseGetTag(), isObjectLike = require_isObjectLike(), argsTag = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
  }
  module2.exports = baseIsArguments;
} });
var require_isArguments = __commonJS({ "../../node_modules/lodash/isArguments.js"(exports, module2) {
  var baseIsArguments = require_baseIsArguments(), isObjectLike = require_isObjectLike(), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, propertyIsEnumerable = objectProto.propertyIsEnumerable, isArguments = baseIsArguments(/* @__PURE__ */ function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  module2.exports = isArguments;
} });
var require_stubFalse = __commonJS({ "../../node_modules/lodash/stubFalse.js"(exports, module2) {
  function stubFalse() {
    return false;
  }
  module2.exports = stubFalse;
} });
var require_isBuffer = __commonJS({ "../../node_modules/lodash/isBuffer.js"(exports, module2) {
  var root = require_root(), stubFalse = require_stubFalse(), freeExports = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2, moduleExports = freeModule && freeModule.exports === freeExports, Buffer2 = moduleExports ? root.Buffer : void 0, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0, isBuffer = nativeIsBuffer || stubFalse;
  module2.exports = isBuffer;
} });
var require_isIndex = __commonJS({ "../../node_modules/lodash/_isIndex.js"(exports, module2) {
  var MAX_SAFE_INTEGER = 9007199254740991, reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type5 = typeof value;
    return length = length ?? MAX_SAFE_INTEGER, !!length && (type5 == "number" || type5 != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
  }
  module2.exports = isIndex;
} });
var require_isLength = __commonJS({ "../../node_modules/lodash/isLength.js"(exports, module2) {
  var MAX_SAFE_INTEGER = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  module2.exports = isLength;
} });
var require_baseIsTypedArray = __commonJS({ "../../node_modules/lodash/_baseIsTypedArray.js"(exports, module2) {
  var baseGetTag = require_baseGetTag(), isLength = require_isLength(), isObjectLike = require_isObjectLike(), argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]", arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]", typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  module2.exports = baseIsTypedArray;
} });
var require_baseUnary = __commonJS({ "../../node_modules/lodash/_baseUnary.js"(exports, module2) {
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  module2.exports = baseUnary;
} });
var require_nodeUtil = __commonJS({ "../../node_modules/lodash/_nodeUtil.js"(exports, module2) {
  var freeGlobal = require_freeGlobal(), freeExports = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2, moduleExports = freeModule && freeModule.exports === freeExports, freeProcess = moduleExports && freeGlobal.process, nodeUtil = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      return types || freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch {
    }
  }();
  module2.exports = nodeUtil;
} });
var require_isTypedArray = __commonJS({ "../../node_modules/lodash/isTypedArray.js"(exports, module2) {
  var baseIsTypedArray = require_baseIsTypedArray(), baseUnary = require_baseUnary(), nodeUtil = require_nodeUtil(), nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray, isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  module2.exports = isTypedArray;
} });
var require_arrayLikeKeys = __commonJS({ "../../node_modules/lodash/_arrayLikeKeys.js"(exports, module2) {
  var baseTimes = require_baseTimes(), isArguments = require_isArguments(), isArray = require_isArray(), isBuffer = require_isBuffer(), isIndex = require_isIndex(), isTypedArray = require_isTypedArray(), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) (inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length))) && result.push(key);
    return result;
  }
  module2.exports = arrayLikeKeys;
} });
var require_isPrototype = __commonJS({ "../../node_modules/lodash/_isPrototype.js"(exports, module2) {
  var objectProto = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto;
  }
  module2.exports = isPrototype;
} });
var require_overArg = __commonJS({ "../../node_modules/lodash/_overArg.js"(exports, module2) {
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  module2.exports = overArg;
} });
var require_nativeKeys = __commonJS({ "../../node_modules/lodash/_nativeKeys.js"(exports, module2) {
  var overArg = require_overArg(), nativeKeys = overArg(Object.keys, Object);
  module2.exports = nativeKeys;
} });
var require_baseKeys = __commonJS({ "../../node_modules/lodash/_baseKeys.js"(exports, module2) {
  var isPrototype = require_isPrototype(), nativeKeys = require_nativeKeys(), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty;
  function baseKeys(object) {
    if (!isPrototype(object)) return nativeKeys(object);
    var result = [];
    for (var key in Object(object)) hasOwnProperty.call(object, key) && key != "constructor" && result.push(key);
    return result;
  }
  module2.exports = baseKeys;
} });
var require_isArrayLike = __commonJS({ "../../node_modules/lodash/isArrayLike.js"(exports, module2) {
  var isFunction = require_isFunction(), isLength = require_isLength();
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  module2.exports = isArrayLike;
} });
var require_keys = __commonJS({ "../../node_modules/lodash/keys.js"(exports, module2) {
  var arrayLikeKeys = require_arrayLikeKeys(), baseKeys = require_baseKeys(), isArrayLike = require_isArrayLike();
  function keys2(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  module2.exports = keys2;
} });
var require_getAllKeys = __commonJS({ "../../node_modules/lodash/_getAllKeys.js"(exports, module2) {
  var baseGetAllKeys = require_baseGetAllKeys(), getSymbols = require_getSymbols(), keys2 = require_keys();
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys2, getSymbols);
  }
  module2.exports = getAllKeys;
} });
var require_equalObjects = __commonJS({ "../../node_modules/lodash/_equalObjects.js"(exports, module2) {
  var getAllKeys = require_getAllKeys(), COMPARE_PARTIAL_FLAG = 1, objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty;
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) return false;
    for (var index = objLength; index--; ) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) return false;
    }
    var objStacked = stack.get(object), othStacked = stack.get(other);
    if (objStacked && othStacked) return objStacked == other && othStacked == object;
    var result = true;
    stack.set(object, other), stack.set(other, object);
    for (var skipCtor = isPartial; ++index < objLength; ) {
      key = objProps[index];
      var objValue = object[key], othValue = other[key];
      if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor) && (result = false);
    }
    return stack.delete(object), stack.delete(other), result;
  }
  module2.exports = equalObjects;
} });
var require_DataView = __commonJS({ "../../node_modules/lodash/_DataView.js"(exports, module2) {
  var getNative = require_getNative(), root = require_root(), DataView2 = getNative(root, "DataView");
  module2.exports = DataView2;
} });
var require_Promise = __commonJS({ "../../node_modules/lodash/_Promise.js"(exports, module2) {
  var getNative = require_getNative(), root = require_root(), Promise2 = getNative(root, "Promise");
  module2.exports = Promise2;
} });
var require_Set = __commonJS({ "../../node_modules/lodash/_Set.js"(exports, module2) {
  var getNative = require_getNative(), root = require_root(), Set2 = getNative(root, "Set");
  module2.exports = Set2;
} });
var require_WeakMap = __commonJS({ "../../node_modules/lodash/_WeakMap.js"(exports, module2) {
  var getNative = require_getNative(), root = require_root(), WeakMap2 = getNative(root, "WeakMap");
  module2.exports = WeakMap2;
} });
var require_getTag = __commonJS({ "../../node_modules/lodash/_getTag.js"(exports, module2) {
  var DataView2 = require_DataView(), Map2 = require_Map(), Promise2 = require_Promise(), Set2 = require_Set(), WeakMap2 = require_WeakMap(), baseGetTag = require_baseGetTag(), toSource = require_toSource(), mapTag = "[object Map]", objectTag = "[object Object]", promiseTag = "[object Promise]", setTag = "[object Set]", weakMapTag = "[object WeakMap]", dataViewTag = "[object DataView]", dataViewCtorString = toSource(DataView2), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2), getTag2 = baseGetTag;
  (DataView2 && getTag2(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag2(new Map2()) != mapTag || Promise2 && getTag2(Promise2.resolve()) != promiseTag || Set2 && getTag2(new Set2()) != setTag || WeakMap2 && getTag2(new WeakMap2()) != weakMapTag) && (getTag2 = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) switch (ctorString) {
      case dataViewCtorString:
        return dataViewTag;
      case mapCtorString:
        return mapTag;
      case promiseCtorString:
        return promiseTag;
      case setCtorString:
        return setTag;
      case weakMapCtorString:
        return weakMapTag;
    }
    return result;
  });
  module2.exports = getTag2;
} });
var require_baseIsEqualDeep = __commonJS({ "../../node_modules/lodash/_baseIsEqualDeep.js"(exports, module2) {
  var Stack = require_Stack(), equalArrays = require_equalArrays(), equalByTag = require_equalByTag(), equalObjects = require_equalObjects(), getTag2 = require_getTag(), isArray = require_isArray(), isBuffer = require_isBuffer(), isTypedArray = require_isTypedArray(), COMPARE_PARTIAL_FLAG = 1, argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]", objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty;
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag2(object), othTag = othIsArr ? arrayTag : getTag2(other);
    objTag = objTag == argsTag ? objectTag : objTag, othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer(object)) {
      if (!isBuffer(other)) return false;
      objIsArr = true, objIsObj = false;
    }
    if (isSameTag && !objIsObj) return stack || (stack = new Stack()), objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        return stack || (stack = new Stack()), equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    return isSameTag ? (stack || (stack = new Stack()), equalObjects(object, other, bitmask, customizer, equalFunc, stack)) : false;
  }
  module2.exports = baseIsEqualDeep;
} });
var require_baseIsEqual = __commonJS({ "../../node_modules/lodash/_baseIsEqual.js"(exports, module2) {
  var baseIsEqualDeep = require_baseIsEqualDeep(), isObjectLike = require_isObjectLike();
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    return value === other ? true : value == null || other == null || !isObjectLike(value) && !isObjectLike(other) ? value !== value && other !== other : baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }
  module2.exports = baseIsEqual;
} });
var require_isEqualWith = __commonJS({ "../../node_modules/lodash/isEqualWith.js"(exports, module2) {
  var baseIsEqual = require_baseIsEqual();
  function isEqualWith2(value, other, customizer) {
    customizer = typeof customizer == "function" ? customizer : void 0;
    var result = customizer ? customizer(value, other) : void 0;
    return result === void 0 ? baseIsEqual(value, other, void 0, customizer) : !!result;
  }
  module2.exports = isEqualWith2;
} });
var require_css_escape = __commonJS({ "../../node_modules/css.escape/css.escape.js"(exports, module2) {
  (function(root, factory) {
    typeof exports == "object" ? module2.exports = factory(root) : typeof define == "function" && define.amd ? define([], factory.bind(root, root)) : factory(root);
  })(typeof global < "u" ? global : exports, function(root) {
    if (root.CSS && root.CSS.escape) return root.CSS.escape;
    var cssEscape = function(value) {
      if (arguments.length == 0) throw new TypeError("`CSS.escape` requires an argument.");
      for (var string = String(value), length = string.length, index = -1, codeUnit, result = "", firstCodeUnit = string.charCodeAt(0); ++index < length; ) {
        if (codeUnit = string.charCodeAt(index), codeUnit == 0) {
          result += "�";
          continue;
        }
        if (codeUnit >= 1 && codeUnit <= 31 || codeUnit == 127 || index == 0 && codeUnit >= 48 && codeUnit <= 57 || index == 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit == 45) {
          result += "\\" + codeUnit.toString(16) + " ";
          continue;
        }
        if (index == 0 && length == 1 && codeUnit == 45) {
          result += "\\" + string.charAt(index);
          continue;
        }
        if (codeUnit >= 128 || codeUnit == 45 || codeUnit == 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
          result += string.charAt(index);
          continue;
        }
        result += "\\" + string.charAt(index);
      }
      return result;
    };
    return root.CSS || (root.CSS = {}), root.CSS.escape = cssEscape, cssEscape;
  });
} });
var require_ansi_styles2 = __commonJS({ "../../node_modules/pretty-format/node_modules/ansi-styles/index.js"(exports, module2) {
  var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`, wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
  function assembleStyles() {
    let codes = /* @__PURE__ */ new Map(), styles3 = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], overline: [53, 55], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
    styles3.color.gray = styles3.color.blackBright, styles3.bgColor.bgGray = styles3.bgColor.bgBlackBright, styles3.color.grey = styles3.color.blackBright, styles3.bgColor.bgGrey = styles3.bgColor.bgBlackBright;
    for (let [groupName, group] of Object.entries(styles3)) {
      for (let [styleName, style] of Object.entries(group)) styles3[styleName] = { open: `\x1B[${style[0]}m`, close: `\x1B[${style[1]}m` }, group[styleName] = styles3[styleName], codes.set(style[0], style[1]);
      Object.defineProperty(styles3, groupName, { value: group, enumerable: false });
    }
    return Object.defineProperty(styles3, "codes", { value: codes, enumerable: false }), styles3.color.close = "\x1B[39m", styles3.bgColor.close = "\x1B[49m", styles3.color.ansi256 = wrapAnsi256(), styles3.color.ansi16m = wrapAnsi16m(), styles3.bgColor.ansi256 = wrapAnsi256(10), styles3.bgColor.ansi16m = wrapAnsi16m(10), Object.defineProperties(styles3, { rgbToAnsi256: { value: (red, green, blue) => red === green && green === blue ? red < 8 ? 16 : red > 248 ? 231 : Math.round((red - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5), enumerable: false }, hexToRgb: { value: (hex3) => {
      let matches3 = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex3.toString(16));
      if (!matches3) return [0, 0, 0];
      let { colorString } = matches3.groups;
      colorString.length === 3 && (colorString = colorString.split("").map((character) => character + character).join(""));
      let integer = Number.parseInt(colorString, 16);
      return [integer >> 16 & 255, integer >> 8 & 255, integer & 255];
    }, enumerable: false }, hexToAnsi256: { value: (hex3) => styles3.rgbToAnsi256(...styles3.hexToRgb(hex3)), enumerable: false } }), styles3;
  }
  Object.defineProperty(module2, "exports", { enumerable: true, get: assembleStyles });
} });
var require_collections = __commonJS({ "../../node_modules/pretty-format/build/collections.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.printIteratorEntries = printIteratorEntries2;
  exports.printIteratorValues = printIteratorValues2;
  exports.printListItems = printListItems2;
  exports.printObjectProperties = printObjectProperties2;
  var getKeysOfEnumerableProperties2 = (object, compareKeys) => {
    let keys2 = Object.keys(object).sort(compareKeys);
    return Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(object).forEach((symbol) => {
      Object.getOwnPropertyDescriptor(object, symbol).enumerable && keys2.push(symbol);
    }), keys2;
  };
  function printIteratorEntries2(iterator, config3, indentation, depth, refs, printer2, separator = ": ") {
    let result = "", current = iterator.next();
    if (!current.done) {
      result += config3.spacingOuter;
      let indentationNext = indentation + config3.indent;
      for (; !current.done; ) {
        let name = printer2(current.value[0], config3, indentationNext, depth, refs), value = printer2(current.value[1], config3, indentationNext, depth, refs);
        result += indentationNext + name + separator + value, current = iterator.next(), current.done ? config3.min || (result += ",") : result += "," + config3.spacingInner;
      }
      result += config3.spacingOuter + indentation;
    }
    return result;
  }
  function printIteratorValues2(iterator, config3, indentation, depth, refs, printer2) {
    let result = "", current = iterator.next();
    if (!current.done) {
      result += config3.spacingOuter;
      let indentationNext = indentation + config3.indent;
      for (; !current.done; ) result += indentationNext + printer2(current.value, config3, indentationNext, depth, refs), current = iterator.next(), current.done ? config3.min || (result += ",") : result += "," + config3.spacingInner;
      result += config3.spacingOuter + indentation;
    }
    return result;
  }
  function printListItems2(list, config3, indentation, depth, refs, printer2) {
    let result = "";
    if (list.length) {
      result += config3.spacingOuter;
      let indentationNext = indentation + config3.indent;
      for (let i = 0; i < list.length; i++) result += indentationNext, i in list && (result += printer2(list[i], config3, indentationNext, depth, refs)), i < list.length - 1 ? result += "," + config3.spacingInner : config3.min || (result += ",");
      result += config3.spacingOuter + indentation;
    }
    return result;
  }
  function printObjectProperties2(val, config3, indentation, depth, refs, printer2) {
    let result = "", keys2 = getKeysOfEnumerableProperties2(val, config3.compareKeys);
    if (keys2.length) {
      result += config3.spacingOuter;
      let indentationNext = indentation + config3.indent;
      for (let i = 0; i < keys2.length; i++) {
        let key = keys2[i], name = printer2(key, config3, indentationNext, depth, refs), value = printer2(val[key], config3, indentationNext, depth, refs);
        result += indentationNext + name + ": " + value, i < keys2.length - 1 ? result += "," + config3.spacingInner : config3.min || (result += ",");
      }
      result += config3.spacingOuter + indentation;
    }
    return result;
  }
} });
var require_AsymmetricMatcher = __commonJS({ "../../node_modules/pretty-format/build/plugins/AsymmetricMatcher.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.test = exports.serialize = exports.default = void 0;
  var _collections = require_collections(), global3 = function() {
    return typeof globalThis < "u" ? globalThis : typeof global3 < "u" ? global3 : typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")();
  }(), Symbol2 = global3["jest-symbol-do-not-touch"] || global3.Symbol, asymmetricMatcher2 = typeof Symbol2 == "function" && Symbol2.for ? Symbol2.for("jest.asymmetricMatcher") : 1267621, SPACE2 = " ", serialize2 = (val, config3, indentation, depth, refs, printer2) => {
    let stringedValue = val.toString();
    return stringedValue === "ArrayContaining" || stringedValue === "ArrayNotContaining" ? ++depth > config3.maxDepth ? "[" + stringedValue + "]" : stringedValue + SPACE2 + "[" + (0, _collections.printListItems)(val.sample, config3, indentation, depth, refs, printer2) + "]" : stringedValue === "ObjectContaining" || stringedValue === "ObjectNotContaining" ? ++depth > config3.maxDepth ? "[" + stringedValue + "]" : stringedValue + SPACE2 + "{" + (0, _collections.printObjectProperties)(val.sample, config3, indentation, depth, refs, printer2) + "}" : stringedValue === "StringMatching" || stringedValue === "StringNotMatching" || stringedValue === "StringContaining" || stringedValue === "StringNotContaining" ? stringedValue + SPACE2 + printer2(val.sample, config3, indentation, depth, refs) : val.toAsymmetricMatcher();
  };
  exports.serialize = serialize2;
  var test3 = (val) => val && val.$$typeof === asymmetricMatcher2;
  exports.test = test3;
  var plugin2 = { serialize: serialize2, test: test3 }, _default2 = plugin2;
  exports.default = _default2;
} });
var require_ansi_regex = __commonJS({ "../../node_modules/pretty-format/node_modules/ansi-regex/index.js"(exports, module2) {
  module2.exports = ({ onlyFirst = false } = {}) => {
    let pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
    return new RegExp(pattern, onlyFirst ? void 0 : "g");
  };
} });
var require_ConvertAnsi = __commonJS({ "../../node_modules/pretty-format/build/plugins/ConvertAnsi.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.test = exports.serialize = exports.default = void 0;
  var _ansiRegex = _interopRequireDefault(require_ansi_regex()), _ansiStyles = _interopRequireDefault(require_ansi_styles2());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var toHumanReadableAnsi = (text) => text.replace((0, _ansiRegex.default)(), (match) => {
    switch (match) {
      case _ansiStyles.default.red.close:
      case _ansiStyles.default.green.close:
      case _ansiStyles.default.cyan.close:
      case _ansiStyles.default.gray.close:
      case _ansiStyles.default.white.close:
      case _ansiStyles.default.yellow.close:
      case _ansiStyles.default.bgRed.close:
      case _ansiStyles.default.bgGreen.close:
      case _ansiStyles.default.bgYellow.close:
      case _ansiStyles.default.inverse.close:
      case _ansiStyles.default.dim.close:
      case _ansiStyles.default.bold.close:
      case _ansiStyles.default.reset.open:
      case _ansiStyles.default.reset.close:
        return "</>";
      case _ansiStyles.default.red.open:
        return "<red>";
      case _ansiStyles.default.green.open:
        return "<green>";
      case _ansiStyles.default.cyan.open:
        return "<cyan>";
      case _ansiStyles.default.gray.open:
        return "<gray>";
      case _ansiStyles.default.white.open:
        return "<white>";
      case _ansiStyles.default.yellow.open:
        return "<yellow>";
      case _ansiStyles.default.bgRed.open:
        return "<bgRed>";
      case _ansiStyles.default.bgGreen.open:
        return "<bgGreen>";
      case _ansiStyles.default.bgYellow.open:
        return "<bgYellow>";
      case _ansiStyles.default.inverse.open:
        return "<inverse>";
      case _ansiStyles.default.dim.open:
        return "<dim>";
      case _ansiStyles.default.bold.open:
        return "<bold>";
      default:
        return "";
    }
  }), test3 = (val) => typeof val == "string" && !!val.match((0, _ansiRegex.default)());
  exports.test = test3;
  var serialize2 = (val, config3, indentation, depth, refs, printer2) => printer2(toHumanReadableAnsi(val), config3, indentation, depth, refs);
  exports.serialize = serialize2;
  var plugin2 = { serialize: serialize2, test: test3 }, _default2 = plugin2;
  exports.default = _default2;
} });
var require_DOMCollection = __commonJS({ "../../node_modules/pretty-format/build/plugins/DOMCollection.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.test = exports.serialize = exports.default = void 0;
  var _collections = require_collections(), SPACE2 = " ", OBJECT_NAMES2 = ["DOMStringMap", "NamedNodeMap"], ARRAY_REGEXP2 = /^(HTML\w*Collection|NodeList)$/, testName2 = (name) => OBJECT_NAMES2.indexOf(name) !== -1 || ARRAY_REGEXP2.test(name), test3 = (val) => val && val.constructor && !!val.constructor.name && testName2(val.constructor.name);
  exports.test = test3;
  var isNamedNodeMap2 = (collection) => collection.constructor.name === "NamedNodeMap", serialize2 = (collection, config3, indentation, depth, refs, printer2) => {
    let name = collection.constructor.name;
    return ++depth > config3.maxDepth ? "[" + name + "]" : (config3.min ? "" : name + SPACE2) + (OBJECT_NAMES2.indexOf(name) !== -1 ? "{" + (0, _collections.printObjectProperties)(isNamedNodeMap2(collection) ? Array.from(collection).reduce((props, attribute) => (props[attribute.name] = attribute.value, props), {}) : { ...collection }, config3, indentation, depth, refs, printer2) + "}" : "[" + (0, _collections.printListItems)(Array.from(collection), config3, indentation, depth, refs, printer2) + "]");
  };
  exports.serialize = serialize2;
  var plugin2 = { serialize: serialize2, test: test3 }, _default2 = plugin2;
  exports.default = _default2;
} });
var require_escapeHTML = __commonJS({ "../../node_modules/pretty-format/build/plugins/lib/escapeHTML.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = escapeHTML3;
  function escapeHTML3(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
} });
var require_markup = __commonJS({ "../../node_modules/pretty-format/build/plugins/lib/markup.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.printText = exports.printProps = exports.printElementAsLeaf = exports.printElement = exports.printComment = exports.printChildren = void 0;
  var _escapeHTML = _interopRequireDefault(require_escapeHTML());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var printProps3 = (keys2, props, config3, indentation, depth, refs, printer2) => {
    let indentationNext = indentation + config3.indent, colors = config3.colors;
    return keys2.map((key) => {
      let value = props[key], printed = printer2(value, config3, indentationNext, depth, refs);
      return typeof value != "string" && (printed.indexOf(`
`) !== -1 && (printed = config3.spacingOuter + indentationNext + printed + config3.spacingOuter + indentation), printed = "{" + printed + "}"), config3.spacingInner + indentation + colors.prop.open + key + colors.prop.close + "=" + colors.value.open + printed + colors.value.close;
    }).join("");
  };
  exports.printProps = printProps3;
  var printChildren3 = (children, config3, indentation, depth, refs, printer2) => children.map((child) => config3.spacingOuter + indentation + (typeof child == "string" ? printText3(child, config3) : printer2(child, config3, indentation, depth, refs))).join("");
  exports.printChildren = printChildren3;
  var printText3 = (text, config3) => {
    let contentColor = config3.colors.content;
    return contentColor.open + (0, _escapeHTML.default)(text) + contentColor.close;
  };
  exports.printText = printText3;
  var printComment3 = (comment, config3) => {
    let commentColor = config3.colors.comment;
    return commentColor.open + "<!--" + (0, _escapeHTML.default)(comment) + "-->" + commentColor.close;
  };
  exports.printComment = printComment3;
  var printElement3 = (type5, printedProps, printedChildren, config3, indentation) => {
    let tagColor = config3.colors.tag;
    return tagColor.open + "<" + type5 + (printedProps && tagColor.close + printedProps + config3.spacingOuter + indentation + tagColor.open) + (printedChildren ? ">" + tagColor.close + printedChildren + config3.spacingOuter + indentation + tagColor.open + "</" + type5 : (printedProps && !config3.min ? "" : " ") + "/") + ">" + tagColor.close;
  };
  exports.printElement = printElement3;
  var printElementAsLeaf3 = (type5, config3) => {
    let tagColor = config3.colors.tag;
    return tagColor.open + "<" + type5 + tagColor.close + " …" + tagColor.open + " />" + tagColor.close;
  };
  exports.printElementAsLeaf = printElementAsLeaf3;
} });
var require_DOMElement = __commonJS({ "../../node_modules/pretty-format/build/plugins/DOMElement.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.test = exports.serialize = exports.default = void 0;
  var _markup = require_markup(), ELEMENT_NODE3 = 1, TEXT_NODE3 = 3, COMMENT_NODE3 = 8, FRAGMENT_NODE3 = 11, ELEMENT_REGEXP3 = /^((HTML|SVG)\w*)?Element$/, testHasAttribute2 = (val) => {
    try {
      return typeof val.hasAttribute == "function" && val.hasAttribute("is");
    } catch {
      return false;
    }
  }, testNode3 = (val) => {
    let constructorName = val.constructor.name, { nodeType, tagName } = val, isCustomElement3 = typeof tagName == "string" && tagName.includes("-") || testHasAttribute2(val);
    return nodeType === ELEMENT_NODE3 && (ELEMENT_REGEXP3.test(constructorName) || isCustomElement3) || nodeType === TEXT_NODE3 && constructorName === "Text" || nodeType === COMMENT_NODE3 && constructorName === "Comment" || nodeType === FRAGMENT_NODE3 && constructorName === "DocumentFragment";
  }, test3 = (val) => {
    var _val$constructor;
    return (val == null || (_val$constructor = val.constructor) === null || _val$constructor === void 0 ? void 0 : _val$constructor.name) && testNode3(val);
  };
  exports.test = test3;
  function nodeIsText3(node) {
    return node.nodeType === TEXT_NODE3;
  }
  function nodeIsComment3(node) {
    return node.nodeType === COMMENT_NODE3;
  }
  function nodeIsFragment3(node) {
    return node.nodeType === FRAGMENT_NODE3;
  }
  var serialize2 = (node, config3, indentation, depth, refs, printer2) => {
    if (nodeIsText3(node)) return (0, _markup.printText)(node.data, config3);
    if (nodeIsComment3(node)) return (0, _markup.printComment)(node.data, config3);
    let type5 = nodeIsFragment3(node) ? "DocumentFragment" : node.tagName.toLowerCase();
    return ++depth > config3.maxDepth ? (0, _markup.printElementAsLeaf)(type5, config3) : (0, _markup.printElement)(type5, (0, _markup.printProps)(nodeIsFragment3(node) ? [] : Array.from(node.attributes).map((attr) => attr.name).sort(), nodeIsFragment3(node) ? {} : Array.from(node.attributes).reduce((props, attribute) => (props[attribute.name] = attribute.value, props), {}), config3, indentation + config3.indent, depth, refs, printer2), (0, _markup.printChildren)(Array.prototype.slice.call(node.childNodes || node.children), config3, indentation + config3.indent, depth, refs, printer2), config3, indentation);
  };
  exports.serialize = serialize2;
  var plugin2 = { serialize: serialize2, test: test3 }, _default2 = plugin2;
  exports.default = _default2;
} });
var require_Immutable = __commonJS({ "../../node_modules/pretty-format/build/plugins/Immutable.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.test = exports.serialize = exports.default = void 0;
  var _collections = require_collections(), IS_ITERABLE_SENTINEL2 = "@@__IMMUTABLE_ITERABLE__@@", IS_LIST_SENTINEL3 = "@@__IMMUTABLE_LIST__@@", IS_KEYED_SENTINEL3 = "@@__IMMUTABLE_KEYED__@@", IS_MAP_SENTINEL2 = "@@__IMMUTABLE_MAP__@@", IS_ORDERED_SENTINEL3 = "@@__IMMUTABLE_ORDERED__@@", IS_RECORD_SENTINEL2 = "@@__IMMUTABLE_RECORD__@@", IS_SEQ_SENTINEL2 = "@@__IMMUTABLE_SEQ__@@", IS_SET_SENTINEL3 = "@@__IMMUTABLE_SET__@@", IS_STACK_SENTINEL2 = "@@__IMMUTABLE_STACK__@@", getImmutableName2 = (name) => "Immutable." + name, printAsLeaf2 = (name) => "[" + name + "]", SPACE2 = " ", LAZY2 = "…", printImmutableEntries2 = (val, config3, indentation, depth, refs, printer2, type5) => ++depth > config3.maxDepth ? printAsLeaf2(getImmutableName2(type5)) : getImmutableName2(type5) + SPACE2 + "{" + (0, _collections.printIteratorEntries)(val.entries(), config3, indentation, depth, refs, printer2) + "}";
  function getRecordEntries2(val) {
    let i = 0;
    return { next() {
      if (i < val._keys.length) {
        let key = val._keys[i++];
        return { done: false, value: [key, val.get(key)] };
      }
      return { done: true, value: void 0 };
    } };
  }
  var printImmutableRecord2 = (val, config3, indentation, depth, refs, printer2) => {
    let name = getImmutableName2(val._name || "Record");
    return ++depth > config3.maxDepth ? printAsLeaf2(name) : name + SPACE2 + "{" + (0, _collections.printIteratorEntries)(getRecordEntries2(val), config3, indentation, depth, refs, printer2) + "}";
  }, printImmutableSeq2 = (val, config3, indentation, depth, refs, printer2) => {
    let name = getImmutableName2("Seq");
    return ++depth > config3.maxDepth ? printAsLeaf2(name) : val[IS_KEYED_SENTINEL3] ? name + SPACE2 + "{" + (val._iter || val._object ? (0, _collections.printIteratorEntries)(val.entries(), config3, indentation, depth, refs, printer2) : LAZY2) + "}" : name + SPACE2 + "[" + (val._iter || val._array || val._collection || val._iterable ? (0, _collections.printIteratorValues)(val.values(), config3, indentation, depth, refs, printer2) : LAZY2) + "]";
  }, printImmutableValues2 = (val, config3, indentation, depth, refs, printer2, type5) => ++depth > config3.maxDepth ? printAsLeaf2(getImmutableName2(type5)) : getImmutableName2(type5) + SPACE2 + "[" + (0, _collections.printIteratorValues)(val.values(), config3, indentation, depth, refs, printer2) + "]", serialize2 = (val, config3, indentation, depth, refs, printer2) => val[IS_MAP_SENTINEL2] ? printImmutableEntries2(val, config3, indentation, depth, refs, printer2, val[IS_ORDERED_SENTINEL3] ? "OrderedMap" : "Map") : val[IS_LIST_SENTINEL3] ? printImmutableValues2(val, config3, indentation, depth, refs, printer2, "List") : val[IS_SET_SENTINEL3] ? printImmutableValues2(val, config3, indentation, depth, refs, printer2, val[IS_ORDERED_SENTINEL3] ? "OrderedSet" : "Set") : val[IS_STACK_SENTINEL2] ? printImmutableValues2(val, config3, indentation, depth, refs, printer2, "Stack") : val[IS_SEQ_SENTINEL2] ? printImmutableSeq2(val, config3, indentation, depth, refs, printer2) : printImmutableRecord2(val, config3, indentation, depth, refs, printer2);
  exports.serialize = serialize2;
  var test3 = (val) => val && (val[IS_ITERABLE_SENTINEL2] === true || val[IS_RECORD_SENTINEL2] === true);
  exports.test = test3;
  var plugin2 = { serialize: serialize2, test: test3 }, _default2 = plugin2;
  exports.default = _default2;
} });
var require_react_is_development = __commonJS({ "../../node_modules/pretty-format/node_modules/react-is/cjs/react-is.development.js"(exports) {
  (function() {
    var REACT_ELEMENT_TYPE = 60103, REACT_PORTAL_TYPE = 60106, REACT_FRAGMENT_TYPE = 60107, REACT_STRICT_MODE_TYPE = 60108, REACT_PROFILER_TYPE = 60114, REACT_PROVIDER_TYPE = 60109, REACT_CONTEXT_TYPE = 60110, REACT_FORWARD_REF_TYPE = 60112, REACT_SUSPENSE_TYPE = 60113, REACT_SUSPENSE_LIST_TYPE = 60120, REACT_MEMO_TYPE = 60115, REACT_LAZY_TYPE = 60116, REACT_BLOCK_TYPE = 60121, REACT_SERVER_BLOCK_TYPE = 60122, REACT_FUNDAMENTAL_TYPE = 60117, REACT_DEBUG_TRACING_MODE_TYPE = 60129, REACT_LEGACY_HIDDEN_TYPE = 60131;
    if (typeof Symbol == "function" && Symbol.for) {
      var symbolFor = Symbol.for;
      REACT_ELEMENT_TYPE = symbolFor("react.element"), REACT_PORTAL_TYPE = symbolFor("react.portal"), REACT_FRAGMENT_TYPE = symbolFor("react.fragment"), REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode"), REACT_PROFILER_TYPE = symbolFor("react.profiler"), REACT_PROVIDER_TYPE = symbolFor("react.provider"), REACT_CONTEXT_TYPE = symbolFor("react.context"), REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref"), REACT_SUSPENSE_TYPE = symbolFor("react.suspense"), REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list"), REACT_MEMO_TYPE = symbolFor("react.memo"), REACT_LAZY_TYPE = symbolFor("react.lazy"), REACT_BLOCK_TYPE = symbolFor("react.block"), REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block"), REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental"), symbolFor("react.scope"), symbolFor("react.opaque.id"), REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode"), symbolFor("react.offscreen"), REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
    }
    var enableScopeAPI = false;
    function isValidElementType(type5) {
      return !!(typeof type5 == "string" || typeof type5 == "function" || type5 === REACT_FRAGMENT_TYPE || type5 === REACT_PROFILER_TYPE || type5 === REACT_DEBUG_TRACING_MODE_TYPE || type5 === REACT_STRICT_MODE_TYPE || type5 === REACT_SUSPENSE_TYPE || type5 === REACT_SUSPENSE_LIST_TYPE || type5 === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI || typeof type5 == "object" && type5 !== null && (type5.$$typeof === REACT_LAZY_TYPE || type5.$$typeof === REACT_MEMO_TYPE || type5.$$typeof === REACT_PROVIDER_TYPE || type5.$$typeof === REACT_CONTEXT_TYPE || type5.$$typeof === REACT_FORWARD_REF_TYPE || type5.$$typeof === REACT_FUNDAMENTAL_TYPE || type5.$$typeof === REACT_BLOCK_TYPE || type5[0] === REACT_SERVER_BLOCK_TYPE));
    }
    function typeOf(object) {
      if (typeof object == "object" && object !== null) {
        var $$typeof = object.$$typeof;
        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type5 = object.type;
            switch (type5) {
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
              case REACT_SUSPENSE_LIST_TYPE:
                return type5;
              default:
                var $$typeofType = type5 && type5.$$typeof;
                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;
                  default:
                    return $$typeof;
                }
            }
          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }
    }
    var ContextConsumer = REACT_CONTEXT_TYPE, ContextProvider = REACT_PROVIDER_TYPE, Element2 = REACT_ELEMENT_TYPE, ForwardRef = REACT_FORWARD_REF_TYPE, Fragment = REACT_FRAGMENT_TYPE, Lazy = REACT_LAZY_TYPE, Memo = REACT_MEMO_TYPE, Portal = REACT_PORTAL_TYPE, Profiler = REACT_PROFILER_TYPE, StrictMode = REACT_STRICT_MODE_TYPE, Suspense = REACT_SUSPENSE_TYPE, hasWarnedAboutDeprecatedIsAsyncMode = false, hasWarnedAboutDeprecatedIsConcurrentMode = false;
    function isAsyncMode(object) {
      return hasWarnedAboutDeprecatedIsAsyncMode || (hasWarnedAboutDeprecatedIsAsyncMode = true, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), false;
    }
    function isConcurrentMode(object) {
      return hasWarnedAboutDeprecatedIsConcurrentMode || (hasWarnedAboutDeprecatedIsConcurrentMode = true, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), false;
    }
    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }
    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }
    function isElement5(object) {
      return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }
    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }
    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }
    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }
    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }
    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }
    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }
    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }
    exports.ContextConsumer = ContextConsumer, exports.ContextProvider = ContextProvider, exports.Element = Element2, exports.ForwardRef = ForwardRef, exports.Fragment = Fragment, exports.Lazy = Lazy, exports.Memo = Memo, exports.Portal = Portal, exports.Profiler = Profiler, exports.StrictMode = StrictMode, exports.Suspense = Suspense, exports.isAsyncMode = isAsyncMode, exports.isConcurrentMode = isConcurrentMode, exports.isContextConsumer = isContextConsumer, exports.isContextProvider = isContextProvider, exports.isElement = isElement5, exports.isForwardRef = isForwardRef, exports.isFragment = isFragment, exports.isLazy = isLazy, exports.isMemo = isMemo, exports.isPortal = isPortal, exports.isProfiler = isProfiler, exports.isStrictMode = isStrictMode, exports.isSuspense = isSuspense, exports.isValidElementType = isValidElementType, exports.typeOf = typeOf;
  })();
} });
var require_react_is = __commonJS({ "../../node_modules/pretty-format/node_modules/react-is/index.js"(exports, module2) {
  module2.exports = require_react_is_development();
} });
var require_ReactElement = __commonJS({ "../../node_modules/pretty-format/build/plugins/ReactElement.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.test = exports.serialize = exports.default = void 0;
  var ReactIs = _interopRequireWildcard(require_react_is()), _markup = require_markup();
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap != "function") return null;
    var cacheBabelInterop = /* @__PURE__ */ new WeakMap(), cacheNodeInterop = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (obj && obj.__esModule) return obj;
    if (obj === null || typeof obj != "object" && typeof obj != "function") return { default: obj };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    return newObj.default = obj, cache && cache.set(obj, newObj), newObj;
  }
  var getChildren2 = (arg, children = []) => (Array.isArray(arg) ? arg.forEach((item) => {
    getChildren2(item, children);
  }) : arg != null && arg !== false && children.push(arg), children), getType4 = (element) => {
    let type5 = element.type;
    if (typeof type5 == "string") return type5;
    if (typeof type5 == "function") return type5.displayName || type5.name || "Unknown";
    if (ReactIs.isFragment(element)) return "React.Fragment";
    if (ReactIs.isSuspense(element)) return "React.Suspense";
    if (typeof type5 == "object" && type5 !== null) {
      if (ReactIs.isContextProvider(element)) return "Context.Provider";
      if (ReactIs.isContextConsumer(element)) return "Context.Consumer";
      if (ReactIs.isForwardRef(element)) {
        if (type5.displayName) return type5.displayName;
        let functionName = type5.render.displayName || type5.render.name || "";
        return functionName !== "" ? "ForwardRef(" + functionName + ")" : "ForwardRef";
      }
      if (ReactIs.isMemo(element)) {
        let functionName = type5.displayName || type5.type.displayName || type5.type.name || "";
        return functionName !== "" ? "Memo(" + functionName + ")" : "Memo";
      }
    }
    return "UNDEFINED";
  }, getPropKeys2 = (element) => {
    let { props } = element;
    return Object.keys(props).filter((key) => key !== "children" && props[key] !== void 0).sort();
  }, serialize2 = (element, config3, indentation, depth, refs, printer2) => ++depth > config3.maxDepth ? (0, _markup.printElementAsLeaf)(getType4(element), config3) : (0, _markup.printElement)(getType4(element), (0, _markup.printProps)(getPropKeys2(element), element.props, config3, indentation + config3.indent, depth, refs, printer2), (0, _markup.printChildren)(getChildren2(element.props.children), config3, indentation + config3.indent, depth, refs, printer2), config3, indentation);
  exports.serialize = serialize2;
  var test3 = (val) => val != null && ReactIs.isElement(val);
  exports.test = test3;
  var plugin2 = { serialize: serialize2, test: test3 }, _default2 = plugin2;
  exports.default = _default2;
} });
var require_ReactTestComponent = __commonJS({ "../../node_modules/pretty-format/build/plugins/ReactTestComponent.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.test = exports.serialize = exports.default = void 0;
  var _markup = require_markup(), global3 = function() {
    return typeof globalThis < "u" ? globalThis : typeof global3 < "u" ? global3 : typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")();
  }(), Symbol2 = global3["jest-symbol-do-not-touch"] || global3.Symbol, testSymbol2 = typeof Symbol2 == "function" && Symbol2.for ? Symbol2.for("react.test.json") : 245830487, getPropKeys2 = (object) => {
    let { props } = object;
    return props ? Object.keys(props).filter((key) => props[key] !== void 0).sort() : [];
  }, serialize2 = (object, config3, indentation, depth, refs, printer2) => ++depth > config3.maxDepth ? (0, _markup.printElementAsLeaf)(object.type, config3) : (0, _markup.printElement)(object.type, object.props ? (0, _markup.printProps)(getPropKeys2(object), object.props, config3, indentation + config3.indent, depth, refs, printer2) : "", object.children ? (0, _markup.printChildren)(object.children, config3, indentation + config3.indent, depth, refs, printer2) : "", config3, indentation);
  exports.serialize = serialize2;
  var test3 = (val) => val && val.$$typeof === testSymbol2;
  exports.test = test3;
  var plugin2 = { serialize: serialize2, test: test3 }, _default2 = plugin2;
  exports.default = _default2;
} });
var require_build = __commonJS({ "../../node_modules/pretty-format/build/index.js"(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = exports.DEFAULT_OPTIONS = void 0;
  exports.format = format4;
  exports.plugins = void 0;
  var _ansiStyles = _interopRequireDefault(require_ansi_styles2()), _collections = require_collections(), _AsymmetricMatcher = _interopRequireDefault(require_AsymmetricMatcher()), _ConvertAnsi = _interopRequireDefault(require_ConvertAnsi()), _DOMCollection = _interopRequireDefault(require_DOMCollection()), _DOMElement = _interopRequireDefault(require_DOMElement()), _Immutable = _interopRequireDefault(require_Immutable()), _ReactElement = _interopRequireDefault(require_ReactElement()), _ReactTestComponent = _interopRequireDefault(require_ReactTestComponent());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var toString4 = Object.prototype.toString, toISOString2 = Date.prototype.toISOString, errorToString2 = Error.prototype.toString, regExpToString2 = RegExp.prototype.toString, getConstructorName3 = (val) => typeof val.constructor == "function" && val.constructor.name || "Object", isWindow2 = (val) => typeof window < "u" && val === window, SYMBOL_REGEXP2 = /^Symbol\((.*)\)(.*)$/, NEWLINE_REGEXP2 = /\n/gi, PrettyFormatPluginError22 = class extends Error {
    constructor(message, stack) {
      super(message), this.stack = stack, this.name = this.constructor.name;
    }
  };
  function isToStringedArrayType2(toStringed) {
    return toStringed === "[object Array]" || toStringed === "[object ArrayBuffer]" || toStringed === "[object DataView]" || toStringed === "[object Float32Array]" || toStringed === "[object Float64Array]" || toStringed === "[object Int8Array]" || toStringed === "[object Int16Array]" || toStringed === "[object Int32Array]" || toStringed === "[object Uint8Array]" || toStringed === "[object Uint8ClampedArray]" || toStringed === "[object Uint16Array]" || toStringed === "[object Uint32Array]";
  }
  function printNumber2(val) {
    return Object.is(val, -0) ? "-0" : String(val);
  }
  function printBigInt2(val) {
    return `${val}n`;
  }
  function printFunction2(val, printFunctionName) {
    return printFunctionName ? "[Function " + (val.name || "anonymous") + "]" : "[Function]";
  }
  function printSymbol2(val) {
    return String(val).replace(SYMBOL_REGEXP2, "Symbol($1)");
  }
  function printError2(val) {
    return "[" + errorToString2.call(val) + "]";
  }
  function printBasicValue2(val, printFunctionName, escapeRegex, escapeString) {
    if (val === true || val === false) return "" + val;
    if (val === void 0) return "undefined";
    if (val === null) return "null";
    let typeOf = typeof val;
    if (typeOf === "number") return printNumber2(val);
    if (typeOf === "bigint") return printBigInt2(val);
    if (typeOf === "string") return escapeString ? '"' + val.replace(/"|\\/g, "\\$&") + '"' : '"' + val + '"';
    if (typeOf === "function") return printFunction2(val, printFunctionName);
    if (typeOf === "symbol") return printSymbol2(val);
    let toStringed = toString4.call(val);
    return toStringed === "[object WeakMap]" ? "WeakMap {}" : toStringed === "[object WeakSet]" ? "WeakSet {}" : toStringed === "[object Function]" || toStringed === "[object GeneratorFunction]" ? printFunction2(val, printFunctionName) : toStringed === "[object Symbol]" ? printSymbol2(val) : toStringed === "[object Date]" ? isNaN(+val) ? "Date { NaN }" : toISOString2.call(val) : toStringed === "[object Error]" ? printError2(val) : toStringed === "[object RegExp]" ? escapeRegex ? regExpToString2.call(val).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&") : regExpToString2.call(val) : val instanceof Error ? printError2(val) : null;
  }
  function printComplexValue2(val, config3, indentation, depth, refs, hasCalledToJSON) {
    if (refs.indexOf(val) !== -1) return "[Circular]";
    refs = refs.slice(), refs.push(val);
    let hitMaxDepth = ++depth > config3.maxDepth, min = config3.min;
    if (config3.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON == "function" && !hasCalledToJSON) return printer2(val.toJSON(), config3, indentation, depth, refs, true);
    let toStringed = toString4.call(val);
    return toStringed === "[object Arguments]" ? hitMaxDepth ? "[Arguments]" : (min ? "" : "Arguments ") + "[" + (0, _collections.printListItems)(val, config3, indentation, depth, refs, printer2) + "]" : isToStringedArrayType2(toStringed) ? hitMaxDepth ? "[" + val.constructor.name + "]" : (min || !config3.printBasicPrototype && val.constructor.name === "Array" ? "" : val.constructor.name + " ") + "[" + (0, _collections.printListItems)(val, config3, indentation, depth, refs, printer2) + "]" : toStringed === "[object Map]" ? hitMaxDepth ? "[Map]" : "Map {" + (0, _collections.printIteratorEntries)(val.entries(), config3, indentation, depth, refs, printer2, " => ") + "}" : toStringed === "[object Set]" ? hitMaxDepth ? "[Set]" : "Set {" + (0, _collections.printIteratorValues)(val.values(), config3, indentation, depth, refs, printer2) + "}" : hitMaxDepth || isWindow2(val) ? "[" + getConstructorName3(val) + "]" : (min || !config3.printBasicPrototype && getConstructorName3(val) === "Object" ? "" : getConstructorName3(val) + " ") + "{" + (0, _collections.printObjectProperties)(val, config3, indentation, depth, refs, printer2) + "}";
  }
  function isNewPlugin2(plugin2) {
    return plugin2.serialize != null;
  }
  function printPlugin2(plugin2, val, config3, indentation, depth, refs) {
    let printed;
    try {
      printed = isNewPlugin2(plugin2) ? plugin2.serialize(val, config3, indentation, depth, refs, printer2) : plugin2.print(val, (valChild) => printer2(valChild, config3, indentation, depth, refs), (str) => {
        let indentationNext = indentation + config3.indent;
        return indentationNext + str.replace(NEWLINE_REGEXP2, `
` + indentationNext);
      }, { edgeSpacing: config3.spacingOuter, min: config3.min, spacing: config3.spacingInner }, config3.colors);
    } catch (error) {
      throw new PrettyFormatPluginError22(error.message, error.stack);
    }
    if (typeof printed != "string") throw new Error(`pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`);
    return printed;
  }
  function findPlugin2(plugins4, val) {
    for (let p3 = 0; p3 < plugins4.length; p3++) try {
      if (plugins4[p3].test(val)) return plugins4[p3];
    } catch (error) {
      throw new PrettyFormatPluginError22(error.message, error.stack);
    }
    return null;
  }
  function printer2(val, config3, indentation, depth, refs, hasCalledToJSON) {
    let plugin2 = findPlugin2(config3.plugins, val);
    if (plugin2 !== null) return printPlugin2(plugin2, val, config3, indentation, depth, refs);
    let basicResult = printBasicValue2(val, config3.printFunctionName, config3.escapeRegex, config3.escapeString);
    return basicResult !== null ? basicResult : printComplexValue2(val, config3, indentation, depth, refs, hasCalledToJSON);
  }
  var DEFAULT_THEME2 = { comment: "gray", content: "reset", prop: "yellow", tag: "cyan", value: "green" }, DEFAULT_THEME_KEYS2 = Object.keys(DEFAULT_THEME2), DEFAULT_OPTIONS2 = { callToJSON: true, compareKeys: void 0, escapeRegex: false, escapeString: true, highlight: false, indent: 2, maxDepth: 1 / 0, min: false, plugins: [], printBasicPrototype: true, printFunctionName: true, theme: DEFAULT_THEME2 };
  exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS2;
  function validateOptions2(options) {
    if (Object.keys(options).forEach((key) => {
      if (!DEFAULT_OPTIONS2.hasOwnProperty(key)) throw new Error(`pretty-format: Unknown option "${key}".`);
    }), options.min && options.indent !== void 0 && options.indent !== 0) throw new Error('pretty-format: Options "min" and "indent" cannot be used together.');
    if (options.theme !== void 0) {
      if (options.theme === null) throw new Error('pretty-format: Option "theme" must not be null.');
      if (typeof options.theme != "object") throw new Error(`pretty-format: Option "theme" must be of type "object" but instead received "${typeof options.theme}".`);
    }
  }
  var getColorsHighlight2 = (options) => DEFAULT_THEME_KEYS2.reduce((colors, key) => {
    let value = options.theme && options.theme[key] !== void 0 ? options.theme[key] : DEFAULT_THEME2[key], color = value && _ansiStyles.default[value];
    if (color && typeof color.close == "string" && typeof color.open == "string") colors[key] = color;
    else throw new Error(`pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`);
    return colors;
  }, /* @__PURE__ */ Object.create(null)), getColorsEmpty2 = () => DEFAULT_THEME_KEYS2.reduce((colors, key) => (colors[key] = { close: "", open: "" }, colors), /* @__PURE__ */ Object.create(null)), getPrintFunctionName2 = (options) => options && options.printFunctionName !== void 0 ? options.printFunctionName : DEFAULT_OPTIONS2.printFunctionName, getEscapeRegex2 = (options) => options && options.escapeRegex !== void 0 ? options.escapeRegex : DEFAULT_OPTIONS2.escapeRegex, getEscapeString2 = (options) => options && options.escapeString !== void 0 ? options.escapeString : DEFAULT_OPTIONS2.escapeString, getConfig4 = (options) => {
    var _options$printBasicPr;
    return { callToJSON: options && options.callToJSON !== void 0 ? options.callToJSON : DEFAULT_OPTIONS2.callToJSON, colors: options && options.highlight ? getColorsHighlight2(options) : getColorsEmpty2(), compareKeys: options && typeof options.compareKeys == "function" ? options.compareKeys : DEFAULT_OPTIONS2.compareKeys, escapeRegex: getEscapeRegex2(options), escapeString: getEscapeString2(options), indent: options && options.min ? "" : createIndent2(options && options.indent !== void 0 ? options.indent : DEFAULT_OPTIONS2.indent), maxDepth: options && options.maxDepth !== void 0 ? options.maxDepth : DEFAULT_OPTIONS2.maxDepth, min: options && options.min !== void 0 ? options.min : DEFAULT_OPTIONS2.min, plugins: options && options.plugins !== void 0 ? options.plugins : DEFAULT_OPTIONS2.plugins, printBasicPrototype: (_options$printBasicPr = options == null ? void 0 : options.printBasicPrototype) !== null && _options$printBasicPr !== void 0 ? _options$printBasicPr : true, printFunctionName: getPrintFunctionName2(options), spacingInner: options && options.min ? " " : `
`, spacingOuter: options && options.min ? "" : `
` };
  };
  function createIndent2(indent) {
    return new Array(indent + 1).join(" ");
  }
  function format4(val, options) {
    if (options && (validateOptions2(options), options.plugins)) {
      let plugin2 = findPlugin2(options.plugins, val);
      if (plugin2 !== null) return printPlugin2(plugin2, val, getConfig4(options), "", 0, []);
    }
    let basicResult = printBasicValue2(val, getPrintFunctionName2(options), getEscapeRegex2(options), getEscapeString2(options));
    return basicResult !== null ? basicResult : printComplexValue2(val, getConfig4(options), "", 0, []);
  }
  var plugins3 = { AsymmetricMatcher: _AsymmetricMatcher.default, ConvertAnsi: _ConvertAnsi.default, DOMCollection: _DOMCollection.default, DOMElement: _DOMElement.default, Immutable: _Immutable.default, ReactElement: _ReactElement.default, ReactTestComponent: _ReactTestComponent.default };
  exports.plugins = plugins3;
  var _default2 = format4;
  exports.default = _default2;
} });
var require_lz_string = __commonJS({ "../../node_modules/lz-string/libs/lz-string.js"(exports, module2) {
  var LZString = function() {
    var f4 = String.fromCharCode, keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", baseReverseDic = {};
    function getBaseValue(alphabet, character) {
      if (!baseReverseDic[alphabet]) {
        baseReverseDic[alphabet] = {};
        for (var i = 0; i < alphabet.length; i++) baseReverseDic[alphabet][alphabet.charAt(i)] = i;
      }
      return baseReverseDic[alphabet][character];
    }
    var LZString2 = { compressToBase64: function(input2) {
      if (input2 == null) return "";
      var res = LZString2._compress(input2, 6, function(a2) {
        return keyStrBase64.charAt(a2);
      });
      switch (res.length % 4) {
        default:
        case 0:
          return res;
        case 1:
          return res + "===";
        case 2:
          return res + "==";
        case 3:
          return res + "=";
      }
    }, decompressFromBase64: function(input2) {
      return input2 == null ? "" : input2 == "" ? null : LZString2._decompress(input2.length, 32, function(index) {
        return getBaseValue(keyStrBase64, input2.charAt(index));
      });
    }, compressToUTF16: function(input2) {
      return input2 == null ? "" : LZString2._compress(input2, 15, function(a2) {
        return f4(a2 + 32);
      }) + " ";
    }, decompressFromUTF16: function(compressed) {
      return compressed == null ? "" : compressed == "" ? null : LZString2._decompress(compressed.length, 16384, function(index) {
        return compressed.charCodeAt(index) - 32;
      });
    }, compressToUint8Array: function(uncompressed) {
      for (var compressed = LZString2.compress(uncompressed), buf = new Uint8Array(compressed.length * 2), i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
        var current_value = compressed.charCodeAt(i);
        buf[i * 2] = current_value >>> 8, buf[i * 2 + 1] = current_value % 256;
      }
      return buf;
    }, decompressFromUint8Array: function(compressed) {
      if (compressed == null) return LZString2.decompress(compressed);
      for (var buf = new Array(compressed.length / 2), i = 0, TotalLen = buf.length; i < TotalLen; i++) buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
      var result = [];
      return buf.forEach(function(c) {
        result.push(f4(c));
      }), LZString2.decompress(result.join(""));
    }, compressToEncodedURIComponent: function(input2) {
      return input2 == null ? "" : LZString2._compress(input2, 6, function(a2) {
        return keyStrUriSafe.charAt(a2);
      });
    }, decompressFromEncodedURIComponent: function(input2) {
      return input2 == null ? "" : input2 == "" ? null : (input2 = input2.replace(/ /g, "+"), LZString2._decompress(input2.length, 32, function(index) {
        return getBaseValue(keyStrUriSafe, input2.charAt(index));
      }));
    }, compress: function(uncompressed) {
      return LZString2._compress(uncompressed, 16, function(a2) {
        return f4(a2);
      });
    }, _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
      if (uncompressed == null) return "";
      var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
      for (ii = 0; ii < uncompressed.length; ii += 1) if (context_c = uncompressed.charAt(ii), Object.prototype.hasOwnProperty.call(context_dictionary, context_c) || (context_dictionary[context_c] = context_dictSize++, context_dictionaryToCreate[context_c] = true), context_wc = context_w + context_c, Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) context_w = context_wc;
      else {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
          if (context_w.charCodeAt(0) < 256) {
            for (i = 0; i < context_numBits; i++) context_data_val = context_data_val << 1, context_data_position == bitsPerChar - 1 ? (context_data_position = 0, context_data.push(getCharFromInt(context_data_val)), context_data_val = 0) : context_data_position++;
            for (value = context_w.charCodeAt(0), i = 0; i < 8; i++) context_data_val = context_data_val << 1 | value & 1, context_data_position == bitsPerChar - 1 ? (context_data_position = 0, context_data.push(getCharFromInt(context_data_val)), context_data_val = 0) : context_data_position++, value = value >> 1;
          } else {
            for (value = 1, i = 0; i < context_numBits; i++) context_data_val = context_data_val << 1 | value, context_data_position == bitsPerChar - 1 ? (context_data_position = 0, context_data.push(getCharFromInt(context_data_val)), context_data_val = 0) : context_data_position++, value = 0;
            for (value = context_w.charCodeAt(0), i = 0; i < 16; i++) context_data_val = context_data_val << 1 | value & 1, context_data_position == bitsPerChar - 1 ? (context_data_position = 0, context_data.push(getCharFromInt(context_data_val)), context_data_val = 0) : context_data_position++, value = value >> 1;
          }
          context_enlargeIn--, context_enlargeIn == 0 && (context_enlargeIn = Math.pow(2, context_numBits), context_numBits++), delete context_dictionaryToCreate[context_w];
        } else for (value = context_dictionary[context_w], i = 0; i < context_numBits; i++) context_data_val = context_data_val << 1 | value & 1, context_data_position == bitsPerChar - 1 ? (context_data_position = 0, context_data.push(getCharFromInt(context_data_val)), context_data_val = 0) : context_data_position++, value = value >> 1;
        context_enlargeIn--, context_enlargeIn == 0 && (context_enlargeIn = Math.pow(2, context_numBits), context_numBits++), context_dictionary[context_wc] = context_dictSize++, context_w = String(context_c);
      }
      if (context_w !== "") {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
          if (context_w.charCodeAt(0) < 256) {
            for (i = 0; i < context_numBits; i++) context_data_val = context_data_val << 1, context_data_position == bitsPerChar - 1 ? (context_data_position = 0, context_data.push(getCharFromInt(context_data_val)), context_data_val = 0) : context_data_position++;
            for (value = context_w.charCodeAt(0), i = 0; i < 8; i++) context_data_val = context_data_val << 1 | value & 1, context_data_position == bitsPerChar - 1 ? (context_data_position = 0, context_data.push(getCharFromInt(context_data_val)), context_data_val = 0) : context_data_position++, value = value >> 1;
          } else {
            for (value = 1, i = 0; i < context_numBits; i++) context_data_val = context_data_val << 1 | value, context_data_position == bitsPerChar - 1 ? (context_data_position = 0, context_data.push(getCharFromInt(context_data_val)), context_data_val = 0) : context_data_position++, value = 0;
            for (value = context_w.charCodeAt(0), i = 0; i < 16; i++) context_data_val = context_data_val << 1 | value & 1, context_data_position == bitsPerChar - 1 ? (context_data_position = 0, context_data.push(getCharFromInt(context_data_val)), context_data_val = 0) : context_data_position++, value = value >> 1;
          }
          context_enlargeIn--, context_enlargeIn == 0 && (context_enlargeIn = Math.pow(2, context_numBits), context_numBits++), delete context_dictionaryToCreate[context_w];
        } else for (value = context_dictionary[context_w], i = 0; i < context_numBits; i++) context_data_val = context_data_val << 1 | value & 1, context_data_position == bitsPerChar - 1 ? (context_data_position = 0, context_data.push(getCharFromInt(context_data_val)), context_data_val = 0) : context_data_position++, value = value >> 1;
        context_enlargeIn--, context_enlargeIn == 0 && (context_enlargeIn = Math.pow(2, context_numBits), context_numBits++);
      }
      for (value = 2, i = 0; i < context_numBits; i++) context_data_val = context_data_val << 1 | value & 1, context_data_position == bitsPerChar - 1 ? (context_data_position = 0, context_data.push(getCharFromInt(context_data_val)), context_data_val = 0) : context_data_position++, value = value >> 1;
      for (; ; ) if (context_data_val = context_data_val << 1, context_data_position == bitsPerChar - 1) {
        context_data.push(getCharFromInt(context_data_val));
        break;
      } else context_data_position++;
      return context_data.join("");
    }, decompress: function(compressed) {
      return compressed == null ? "" : compressed == "" ? null : LZString2._decompress(compressed.length, 32768, function(index) {
        return compressed.charCodeAt(index);
      });
    }, _decompress: function(length, resetValue, getNextValue) {
      var dictionary = [], enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w2, bits, resb, maxpower, power, c, data = { val: getNextValue(0), position: resetValue, index: 1 };
      for (i = 0; i < 3; i += 1) dictionary[i] = i;
      for (bits = 0, maxpower = Math.pow(2, 2), power = 1; power != maxpower; ) resb = data.val & data.position, data.position >>= 1, data.position == 0 && (data.position = resetValue, data.val = getNextValue(data.index++)), bits |= (resb > 0 ? 1 : 0) * power, power <<= 1;
      switch (bits) {
        case 0:
          for (bits = 0, maxpower = Math.pow(2, 8), power = 1; power != maxpower; ) resb = data.val & data.position, data.position >>= 1, data.position == 0 && (data.position = resetValue, data.val = getNextValue(data.index++)), bits |= (resb > 0 ? 1 : 0) * power, power <<= 1;
          c = f4(bits);
          break;
        case 1:
          for (bits = 0, maxpower = Math.pow(2, 16), power = 1; power != maxpower; ) resb = data.val & data.position, data.position >>= 1, data.position == 0 && (data.position = resetValue, data.val = getNextValue(data.index++)), bits |= (resb > 0 ? 1 : 0) * power, power <<= 1;
          c = f4(bits);
          break;
        case 2:
          return "";
      }
      for (dictionary[3] = c, w2 = c, result.push(c); ; ) {
        if (data.index > length) return "";
        for (bits = 0, maxpower = Math.pow(2, numBits), power = 1; power != maxpower; ) resb = data.val & data.position, data.position >>= 1, data.position == 0 && (data.position = resetValue, data.val = getNextValue(data.index++)), bits |= (resb > 0 ? 1 : 0) * power, power <<= 1;
        switch (c = bits) {
          case 0:
            for (bits = 0, maxpower = Math.pow(2, 8), power = 1; power != maxpower; ) resb = data.val & data.position, data.position >>= 1, data.position == 0 && (data.position = resetValue, data.val = getNextValue(data.index++)), bits |= (resb > 0 ? 1 : 0) * power, power <<= 1;
            dictionary[dictSize++] = f4(bits), c = dictSize - 1, enlargeIn--;
            break;
          case 1:
            for (bits = 0, maxpower = Math.pow(2, 16), power = 1; power != maxpower; ) resb = data.val & data.position, data.position >>= 1, data.position == 0 && (data.position = resetValue, data.val = getNextValue(data.index++)), bits |= (resb > 0 ? 1 : 0) * power, power <<= 1;
            dictionary[dictSize++] = f4(bits), c = dictSize - 1, enlargeIn--;
            break;
          case 2:
            return result.join("");
        }
        if (enlargeIn == 0 && (enlargeIn = Math.pow(2, numBits), numBits++), dictionary[c]) entry = dictionary[c];
        else if (c === dictSize) entry = w2 + w2.charAt(0);
        else return null;
        result.push(entry), dictionary[dictSize++] = w2 + entry.charAt(0), enlargeIn--, w2 = entry, enlargeIn == 0 && (enlargeIn = Math.pow(2, numBits), numBits++);
      }
    } };
    return LZString2;
  }();
  typeof define == "function" && define.amd ? define(function() {
    return LZString;
  }) : typeof module2 < "u" && module2 != null ? module2.exports = LZString : typeof angular < "u" && angular != null && angular.module("LZString", []).factory("LZString", function() {
    return LZString;
  });
} });
var __defProp22 = Object.defineProperty, __getOwnPropNames2 = Object.getOwnPropertyNames, __name = (target, value) => __defProp22(target, "name", { value, configurable: true }), __commonJS2 = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
}, __export2 = (target, all) => {
  for (var name in all) __defProp22(target, name, { get: all[name], enumerable: true });
}, require_util = __commonJS2({ "(disabled):util"() {
} }), utils_exports = {};
__export2(utils_exports, { addChainableMethod: () => addChainableMethod, addLengthGuard: () => addLengthGuard, addMethod: () => addMethod, addProperty: () => addProperty, checkError: () => check_error_exports, compareByInspect: () => compareByInspect, eql: () => deep_eql_default, expectTypes: () => expectTypes, flag: () => flag, getActual: () => getActual, getMessage: () => getMessage2, getName: () => getName, getOperator: () => getOperator, getOwnEnumerableProperties: () => getOwnEnumerableProperties, getOwnEnumerablePropertySymbols: () => getOwnEnumerablePropertySymbols, getPathInfo: () => getPathInfo, hasProperty: () => hasProperty, inspect: () => inspect2, isNaN: () => isNaN22, isProxyEnabled: () => isProxyEnabled, isRegExp: () => isRegExp2, objDisplay: () => objDisplay, overwriteChainableMethod: () => overwriteChainableMethod, overwriteMethod: () => overwriteMethod, overwriteProperty: () => overwriteProperty, proxify: () => proxify, test: () => test, transferFlags: () => transferFlags, type: () => type });
var check_error_exports = {};
__export2(check_error_exports, { compatibleConstructor: () => compatibleConstructor, compatibleInstance: () => compatibleInstance, compatibleMessage: () => compatibleMessage, getConstructorName: () => getConstructorName, getMessage: () => getMessage });
function isErrorInstance(obj) {
  return obj instanceof Error || Object.prototype.toString.call(obj) === "[object Error]";
}
__name(isErrorInstance, "isErrorInstance");
function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === "[object RegExp]";
}
__name(isRegExp, "isRegExp");
function compatibleInstance(thrown, errorLike) {
  return isErrorInstance(errorLike) && thrown === errorLike;
}
__name(compatibleInstance, "compatibleInstance");
function compatibleConstructor(thrown, errorLike) {
  return isErrorInstance(errorLike) ? thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor : (typeof errorLike == "object" || typeof errorLike == "function") && errorLike.prototype ? thrown.constructor === errorLike || thrown instanceof errorLike : false;
}
__name(compatibleConstructor, "compatibleConstructor");
function compatibleMessage(thrown, errMatcher) {
  let comparisonString = typeof thrown == "string" ? thrown : thrown.message;
  return isRegExp(errMatcher) ? errMatcher.test(comparisonString) : typeof errMatcher == "string" ? comparisonString.indexOf(errMatcher) !== -1 : false;
}
__name(compatibleMessage, "compatibleMessage");
function getConstructorName(errorLike) {
  let constructorName = errorLike;
  return isErrorInstance(errorLike) ? constructorName = errorLike.constructor.name : typeof errorLike == "function" && (constructorName = errorLike.name, constructorName === "" && (constructorName = new errorLike().name || constructorName)), constructorName;
}
__name(getConstructorName, "getConstructorName");
function getMessage(errorLike) {
  let msg = "";
  return errorLike && errorLike.message ? msg = errorLike.message : typeof errorLike == "string" && (msg = errorLike), msg;
}
__name(getMessage, "getMessage");
function flag(obj, key, value) {
  var flags = obj.__flags || (obj.__flags = /* @__PURE__ */ Object.create(null));
  if (arguments.length === 3) flags[key] = value;
  else return flags[key];
}
__name(flag, "flag");
function test(obj, args) {
  var negate = flag(obj, "negate"), expr = args[0];
  return negate ? !expr : expr;
}
__name(test, "test");
function type(obj) {
  if (typeof obj > "u") return "undefined";
  if (obj === null) return "null";
  let stringTag = obj[Symbol.toStringTag];
  return typeof stringTag == "string" ? stringTag : Object.prototype.toString.call(obj).slice(8, -1);
}
__name(type, "type");
var canElideFrames = "captureStackTrace" in Error, _a, AssertionError = (_a = class extends Error {
  constructor(message = "Unspecified AssertionError", props, ssf) {
    super(message);
    __publicField(this, "message");
    this.message = message, canElideFrames && Error.captureStackTrace(this, ssf || _a);
    for (let key in props) key in this || (this[key] = props[key]);
  }
  get name() {
    return "AssertionError";
  }
  get ok() {
    return false;
  }
  toJSON(stack) {
    return { ...this, name: this.name, message: this.message, ok: false, stack: stack !== false ? this.stack : void 0 };
  }
}, __name(_a, "AssertionError"), _a);
function expectTypes(obj, types) {
  var flagMsg = flag(obj, "message"), ssfi = flag(obj, "ssfi");
  flagMsg = flagMsg ? flagMsg + ": " : "", obj = flag(obj, "object"), types = types.map(function(t) {
    return t.toLowerCase();
  }), types.sort();
  var str = types.map(function(t, index) {
    var art = ~["a", "e", "i", "o", "u"].indexOf(t.charAt(0)) ? "an" : "a", or = types.length > 1 && index === types.length - 1 ? "or " : "";
    return or + art + " " + t;
  }).join(", "), objType = type(obj).toLowerCase();
  if (!types.some(function(expected) {
    return objType === expected;
  })) throw new AssertionError(flagMsg + "object tested must be " + str + ", but " + objType + " given", void 0, ssfi);
}
__name(expectTypes, "expectTypes");
function getActual(obj, args) {
  return args.length > 4 ? args[4] : obj._obj;
}
__name(getActual, "getActual");
var ansiColors = { bold: ["1", "22"], dim: ["2", "22"], italic: ["3", "23"], underline: ["4", "24"], inverse: ["7", "27"], hidden: ["8", "28"], strike: ["9", "29"], black: ["30", "39"], red: ["31", "39"], green: ["32", "39"], yellow: ["33", "39"], blue: ["34", "39"], magenta: ["35", "39"], cyan: ["36", "39"], white: ["37", "39"], brightblack: ["30;1", "39"], brightred: ["31;1", "39"], brightgreen: ["32;1", "39"], brightyellow: ["33;1", "39"], brightblue: ["34;1", "39"], brightmagenta: ["35;1", "39"], brightcyan: ["36;1", "39"], brightwhite: ["37;1", "39"], grey: ["90", "39"] }, styles = { special: "cyan", number: "yellow", bigint: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", symbol: "green", date: "magenta", regexp: "red" }, truncator = "…";
function colorise(value, styleType) {
  let color = ansiColors[styles[styleType]] || ansiColors[styleType] || "";
  return color ? `\x1B[${color[0]}m${String(value)}\x1B[${color[1]}m` : String(value);
}
__name(colorise, "colorise");
function normaliseOptions({ showHidden = false, depth = 2, colors = false, customInspect = true, showProxy = false, maxArrayLength = 1 / 0, breakLength = 1 / 0, seen = [], truncate: truncate22 = 1 / 0, stylize = String } = {}, inspect32) {
  let options = { showHidden: !!showHidden, depth: Number(depth), colors: !!colors, customInspect: !!customInspect, showProxy: !!showProxy, maxArrayLength: Number(maxArrayLength), breakLength: Number(breakLength), truncate: Number(truncate22), seen, inspect: inspect32, stylize };
  return options.colors && (options.stylize = colorise), options;
}
__name(normaliseOptions, "normaliseOptions");
function truncate(string, length, tail = truncator) {
  string = String(string);
  let tailLength = tail.length, stringLength = string.length;
  return tailLength > length && stringLength > tailLength ? tail : stringLength > length && stringLength > tailLength ? `${string.slice(0, length - tailLength)}${tail}` : string;
}
__name(truncate, "truncate");
function inspectList(list, options, inspectItem, separator = ", ") {
  inspectItem = inspectItem || options.inspect;
  let size = list.length;
  if (size === 0) return "";
  let originalLength = options.truncate, output = "", peek = "", truncated = "";
  for (let i = 0; i < size; i += 1) {
    let last = i + 1 === list.length, secondToLast = i + 2 === list.length;
    truncated = `${truncator}(${list.length - i})`;
    let value = list[i];
    options.truncate = originalLength - output.length - (last ? 0 : separator.length);
    let string = peek || inspectItem(value, options) + (last ? "" : separator), nextLength = output.length + string.length, truncatedLength = nextLength + truncated.length;
    if (last && nextLength > originalLength && output.length + truncated.length <= originalLength || !last && !secondToLast && truncatedLength > originalLength || (peek = last ? "" : inspectItem(list[i + 1], options) + (secondToLast ? "" : separator), !last && secondToLast && truncatedLength > originalLength && nextLength + peek.length > originalLength)) break;
    if (output += string, !last && !secondToLast && nextLength + peek.length >= originalLength) {
      truncated = `${truncator}(${list.length - i - 1})`;
      break;
    }
    truncated = "";
  }
  return `${output}${truncated}`;
}
__name(inspectList, "inspectList");
function quoteComplexKey(key) {
  return key.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/) ? key : JSON.stringify(key).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
}
__name(quoteComplexKey, "quoteComplexKey");
function inspectProperty([key, value], options) {
  return options.truncate -= 2, typeof key == "string" ? key = quoteComplexKey(key) : typeof key != "number" && (key = `[${options.inspect(key, options)}]`), options.truncate -= key.length, value = options.inspect(value, options), `${key}: ${value}`;
}
__name(inspectProperty, "inspectProperty");
function inspectArray(array, options) {
  let nonIndexProperties = Object.keys(array).slice(array.length);
  if (!array.length && !nonIndexProperties.length) return "[]";
  options.truncate -= 4;
  let listContents = inspectList(array, options);
  options.truncate -= listContents.length;
  let propertyContents = "";
  return nonIndexProperties.length && (propertyContents = inspectList(nonIndexProperties.map((key) => [key, array[key]]), options, inspectProperty)), `[ ${listContents}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
__name(inspectArray, "inspectArray");
var getArrayName = __name((array) => typeof Buffer == "function" && array instanceof Buffer ? "Buffer" : array[Symbol.toStringTag] ? array[Symbol.toStringTag] : array.constructor.name, "getArrayName");
function inspectTypedArray(array, options) {
  let name = getArrayName(array);
  options.truncate -= name.length + 4;
  let nonIndexProperties = Object.keys(array).slice(array.length);
  if (!array.length && !nonIndexProperties.length) return `${name}[]`;
  let output = "";
  for (let i = 0; i < array.length; i++) {
    let string = `${options.stylize(truncate(array[i], options.truncate), "number")}${i === array.length - 1 ? "" : ", "}`;
    if (options.truncate -= string.length, array[i] !== array.length && options.truncate <= 3) {
      output += `${truncator}(${array.length - array[i] + 1})`;
      break;
    }
    output += string;
  }
  let propertyContents = "";
  return nonIndexProperties.length && (propertyContents = inspectList(nonIndexProperties.map((key) => [key, array[key]]), options, inspectProperty)), `${name}[ ${output}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
__name(inspectTypedArray, "inspectTypedArray");
function inspectDate(dateObject, options) {
  let stringRepresentation = dateObject.toJSON();
  if (stringRepresentation === null) return "Invalid Date";
  let split = stringRepresentation.split("T"), date = split[0];
  return options.stylize(`${date}T${truncate(split[1], options.truncate - date.length - 1)}`, "date");
}
__name(inspectDate, "inspectDate");
function inspectFunction(func, options) {
  let functionType = func[Symbol.toStringTag] || "Function", name = func.name;
  return name ? options.stylize(`[${functionType} ${truncate(name, options.truncate - 11)}]`, "special") : options.stylize(`[${functionType}]`, "special");
}
__name(inspectFunction, "inspectFunction");
function inspectMapEntry([key, value], options) {
  return options.truncate -= 4, key = options.inspect(key, options), options.truncate -= key.length, value = options.inspect(value, options), `${key} => ${value}`;
}
__name(inspectMapEntry, "inspectMapEntry");
function mapToEntries(map) {
  let entries = [];
  return map.forEach((value, key) => {
    entries.push([key, value]);
  }), entries;
}
__name(mapToEntries, "mapToEntries");
function inspectMap(map, options) {
  return map.size - 1 <= 0 ? "Map{}" : (options.truncate -= 7, `Map{ ${inspectList(mapToEntries(map), options, inspectMapEntry)} }`);
}
__name(inspectMap, "inspectMap");
var isNaN2 = Number.isNaN || ((i) => i !== i);
function inspectNumber(number, options) {
  return isNaN2(number) ? options.stylize("NaN", "number") : number === 1 / 0 ? options.stylize("Infinity", "number") : number === -1 / 0 ? options.stylize("-Infinity", "number") : number === 0 ? options.stylize(1 / number === 1 / 0 ? "+0" : "-0", "number") : options.stylize(truncate(String(number), options.truncate), "number");
}
__name(inspectNumber, "inspectNumber");
function inspectBigInt(number, options) {
  let nums = truncate(number.toString(), options.truncate - 1);
  return nums !== truncator && (nums += "n"), options.stylize(nums, "bigint");
}
__name(inspectBigInt, "inspectBigInt");
function inspectRegExp(value, options) {
  let flags = value.toString().split("/")[2], sourceLength = options.truncate - (2 + flags.length), source = value.source;
  return options.stylize(`/${truncate(source, sourceLength)}/${flags}`, "regexp");
}
__name(inspectRegExp, "inspectRegExp");
function arrayFromSet(set2) {
  let values = [];
  return set2.forEach((value) => {
    values.push(value);
  }), values;
}
__name(arrayFromSet, "arrayFromSet");
function inspectSet(set2, options) {
  return set2.size === 0 ? "Set{}" : (options.truncate -= 7, `Set{ ${inspectList(arrayFromSet(set2), options)} }`);
}
__name(inspectSet, "inspectSet");
var stringEscapeChars = new RegExp("['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]", "g"), escapeCharacters = { "\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "'": "\\'", "\\": "\\\\" }, hex = 16, unicodeLength = 4;
function escape(char) {
  return escapeCharacters[char] || `\\u${`0000${char.charCodeAt(0).toString(hex)}`.slice(-unicodeLength)}`;
}
__name(escape, "escape");
function inspectString(string, options) {
  return stringEscapeChars.test(string) && (string = string.replace(stringEscapeChars, escape)), options.stylize(`'${truncate(string, options.truncate - 2)}'`, "string");
}
__name(inspectString, "inspectString");
function inspectSymbol(value) {
  return "description" in Symbol.prototype ? value.description ? `Symbol(${value.description})` : "Symbol()" : value.toString();
}
__name(inspectSymbol, "inspectSymbol");
var getPromiseValue = __name(() => "Promise{…}", "getPromiseValue");
try {
  let { getPromiseDetails, kPending, kRejected } = process.binding("util");
  Array.isArray(getPromiseDetails(Promise.resolve())) && (getPromiseValue = __name((value, options) => {
    let [state, innerValue] = getPromiseDetails(value);
    return state === kPending ? "Promise{<pending>}" : `Promise${state === kRejected ? "!" : ""}{${options.inspect(innerValue, options)}}`;
  }, "getPromiseValue"));
} catch {
}
var promise_default = getPromiseValue;
function inspectObject(object, options) {
  let properties = Object.getOwnPropertyNames(object), symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : [];
  if (properties.length === 0 && symbols.length === 0) return "{}";
  if (options.truncate -= 4, options.seen = options.seen || [], options.seen.indexOf(object) >= 0) return "[Circular]";
  options.seen.push(object);
  let propertyContents = inspectList(properties.map((key) => [key, object[key]]), options, inspectProperty), symbolContents = inspectList(symbols.map((key) => [key, object[key]]), options, inspectProperty);
  options.seen.pop();
  let sep = "";
  return propertyContents && symbolContents && (sep = ", "), `{ ${propertyContents}${sep}${symbolContents} }`;
}
__name(inspectObject, "inspectObject");
var toStringTag = typeof Symbol < "u" && Symbol.toStringTag ? Symbol.toStringTag : false;
function inspectClass(value, options) {
  let name = "";
  return toStringTag && toStringTag in value && (name = value[toStringTag]), name = name || value.constructor.name, (!name || name === "_class") && (name = "<Anonymous Class>"), options.truncate -= name.length, `${name}${inspectObject(value, options)}`;
}
__name(inspectClass, "inspectClass");
function inspectArguments(args, options) {
  return args.length === 0 ? "Arguments[]" : (options.truncate -= 13, `Arguments[ ${inspectList(args, options)} ]`);
}
__name(inspectArguments, "inspectArguments");
var errorKeys = ["stack", "line", "column", "name", "message", "fileName", "lineNumber", "columnNumber", "number", "description"];
function inspectObject2(error, options) {
  let properties = Object.getOwnPropertyNames(error).filter((key) => errorKeys.indexOf(key) === -1), name = error.name;
  options.truncate -= name.length;
  let message = "";
  typeof error.message == "string" ? message = truncate(error.message, options.truncate) : properties.unshift("message"), message = message ? `: ${message}` : "", options.truncate -= message.length + 5;
  let propertyContents = inspectList(properties.map((key) => [key, error[key]]), options, inspectProperty);
  return `${name}${message}${propertyContents ? ` { ${propertyContents} }` : ""}`;
}
__name(inspectObject2, "inspectObject");
function inspectAttribute([key, value], options) {
  return options.truncate -= 3, value ? `${options.stylize(String(key), "yellow")}=${options.stylize(`"${value}"`, "string")}` : `${options.stylize(String(key), "yellow")}`;
}
__name(inspectAttribute, "inspectAttribute");
function inspectHTMLCollection(collection, options) {
  return inspectList(collection, options, inspectHTML, `
`);
}
__name(inspectHTMLCollection, "inspectHTMLCollection");
function inspectHTML(element, options) {
  let properties = element.getAttributeNames(), name = element.tagName.toLowerCase(), head = options.stylize(`<${name}`, "special"), headClose = options.stylize(">", "special"), tail = options.stylize(`</${name}>`, "special");
  options.truncate -= name.length * 2 + 5;
  let propertyContents = "";
  properties.length > 0 && (propertyContents += " ", propertyContents += inspectList(properties.map((key) => [key, element.getAttribute(key)]), options, inspectAttribute, " ")), options.truncate -= propertyContents.length;
  let truncate22 = options.truncate, children = inspectHTMLCollection(element.children, options);
  return children && children.length > truncate22 && (children = `${truncator}(${element.children.length})`), `${head}${propertyContents}${headClose}${children}${tail}`;
}
__name(inspectHTML, "inspectHTML");
var symbolsSupported = typeof Symbol == "function" && typeof Symbol.for == "function", chaiInspect = symbolsSupported ? Symbol.for("chai/inspect") : "@@chai/inspect", nodeInspect = false;
try {
  let nodeUtil = require_util();
  nodeInspect = nodeUtil.inspect ? nodeUtil.inspect.custom : false;
} catch {
  nodeInspect = false;
}
var constructorMap = /* @__PURE__ */ new WeakMap(), stringTagMap = {}, baseTypesMap = { undefined: (value, options) => options.stylize("undefined", "undefined"), null: (value, options) => options.stylize("null", "null"), boolean: (value, options) => options.stylize(String(value), "boolean"), Boolean: (value, options) => options.stylize(String(value), "boolean"), number: inspectNumber, Number: inspectNumber, bigint: inspectBigInt, BigInt: inspectBigInt, string: inspectString, String: inspectString, function: inspectFunction, Function: inspectFunction, symbol: inspectSymbol, Symbol: inspectSymbol, Array: inspectArray, Date: inspectDate, Map: inspectMap, Set: inspectSet, RegExp: inspectRegExp, Promise: promise_default, WeakSet: (value, options) => options.stylize("WeakSet{…}", "special"), WeakMap: (value, options) => options.stylize("WeakMap{…}", "special"), Arguments: inspectArguments, Int8Array: inspectTypedArray, Uint8Array: inspectTypedArray, Uint8ClampedArray: inspectTypedArray, Int16Array: inspectTypedArray, Uint16Array: inspectTypedArray, Int32Array: inspectTypedArray, Uint32Array: inspectTypedArray, Float32Array: inspectTypedArray, Float64Array: inspectTypedArray, Generator: () => "", DataView: () => "", ArrayBuffer: () => "", Error: inspectObject2, HTMLCollection: inspectHTMLCollection, NodeList: inspectHTMLCollection }, inspectCustom = __name((value, options, type32) => chaiInspect in value && typeof value[chaiInspect] == "function" ? value[chaiInspect](options) : nodeInspect && nodeInspect in value && typeof value[nodeInspect] == "function" ? value[nodeInspect](options.depth, options) : "inspect" in value && typeof value.inspect == "function" ? value.inspect(options.depth, options) : "constructor" in value && constructorMap.has(value.constructor) ? constructorMap.get(value.constructor)(value, options) : stringTagMap[type32] ? stringTagMap[type32](value, options) : "", "inspectCustom"), toString = Object.prototype.toString;
function inspect(value, opts = {}) {
  let options = normaliseOptions(opts, inspect), { customInspect } = options, type32 = value === null ? "null" : typeof value;
  if (type32 === "object" && (type32 = toString.call(value).slice(8, -1)), type32 in baseTypesMap) return baseTypesMap[type32](value, options);
  if (customInspect && value) {
    let output = inspectCustom(value, options, type32);
    if (output) return typeof output == "string" ? output : inspect(output, options);
  }
  let proto = value ? Object.getPrototypeOf(value) : false;
  return proto === Object.prototype || proto === null ? inspectObject(value, options) : value && typeof HTMLElement == "function" && value instanceof HTMLElement ? inspectHTML(value, options) : "constructor" in value ? value.constructor !== Object ? inspectClass(value, options) : inspectObject(value, options) : value === Object(value) ? inspectObject(value, options) : options.stylize(String(value), type32);
}
__name(inspect, "inspect");
var config = { includeStack: false, showDiff: true, truncateThreshold: 40, useProxy: true, proxyExcludedKeys: ["then", "catch", "inspect", "toJSON"], deepEqual: null };
function inspect2(obj, showHidden, depth, colors) {
  var options = { colors, depth: typeof depth > "u" ? 2 : depth, showHidden, truncate: config.truncateThreshold ? config.truncateThreshold : 1 / 0 };
  return inspect(obj, options);
}
__name(inspect2, "inspect");
function objDisplay(obj) {
  var str = inspect2(obj), type32 = Object.prototype.toString.call(obj);
  if (config.truncateThreshold && str.length >= config.truncateThreshold) {
    if (type32 === "[object Function]") return !obj.name || obj.name === "" ? "[Function]" : "[Function: " + obj.name + "]";
    if (type32 === "[object Array]") return "[ Array(" + obj.length + ") ]";
    if (type32 === "[object Object]") {
      var keys2 = Object.keys(obj), kstr = keys2.length > 2 ? keys2.splice(0, 2).join(", ") + ", ..." : keys2.join(", ");
      return "{ Object (" + kstr + ") }";
    } else return str;
  } else return str;
}
__name(objDisplay, "objDisplay");
function getMessage2(obj, args) {
  var negate = flag(obj, "negate"), val = flag(obj, "object"), expected = args[3], actual = getActual(obj, args), msg = negate ? args[2] : args[1], flagMsg = flag(obj, "message");
  return typeof msg == "function" && (msg = msg()), msg = msg || "", msg = msg.replace(/#\{this\}/g, function() {
    return objDisplay(val);
  }).replace(/#\{act\}/g, function() {
    return objDisplay(actual);
  }).replace(/#\{exp\}/g, function() {
    return objDisplay(expected);
  }), flagMsg ? flagMsg + ": " + msg : msg;
}
__name(getMessage2, "getMessage");
function transferFlags(assertion, object, includeAll) {
  var flags = assertion.__flags || (assertion.__flags = /* @__PURE__ */ Object.create(null));
  object.__flags || (object.__flags = /* @__PURE__ */ Object.create(null)), includeAll = arguments.length === 3 ? includeAll : true;
  for (var flag3 in flags) (includeAll || flag3 !== "object" && flag3 !== "ssfi" && flag3 !== "lockSsfi" && flag3 != "message") && (object.__flags[flag3] = flags[flag3]);
}
__name(transferFlags, "transferFlags");
function type2(obj) {
  if (typeof obj > "u") return "undefined";
  if (obj === null) return "null";
  let stringTag = obj[Symbol.toStringTag];
  return typeof stringTag == "string" ? stringTag : Object.prototype.toString.call(obj).slice(8, -1);
}
__name(type2, "type");
function FakeMap() {
  this._key = "chai/deep-eql__" + Math.random() + Date.now();
}
__name(FakeMap, "FakeMap");
FakeMap.prototype = { get: __name(function(key) {
  return key[this._key];
}, "get"), set: __name(function(key, value) {
  Object.isExtensible(key) && Object.defineProperty(key, this._key, { value, configurable: true });
}, "set") };
var MemoizeMap = typeof WeakMap == "function" ? WeakMap : FakeMap;
function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) return null;
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    var result = leftHandMap.get(rightHandOperand);
    if (typeof result == "boolean") return result;
  }
  return null;
}
__name(memoizeCompare, "memoizeCompare");
function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
  if (!(!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand))) {
    var leftHandMap = memoizeMap.get(leftHandOperand);
    leftHandMap ? leftHandMap.set(rightHandOperand, result) : (leftHandMap = new MemoizeMap(), leftHandMap.set(rightHandOperand, result), memoizeMap.set(leftHandOperand, leftHandMap));
  }
}
__name(memoizeSet, "memoizeSet");
var deep_eql_default = deepEqual;
function deepEqual(leftHandOperand, rightHandOperand, options) {
  if (options && options.comparator) return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
  var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
  return simpleResult !== null ? simpleResult : extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}
__name(deepEqual, "deepEqual");
function simpleEqual(leftHandOperand, rightHandOperand) {
  return leftHandOperand === rightHandOperand ? leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand : leftHandOperand !== leftHandOperand && rightHandOperand !== rightHandOperand ? true : isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand) ? false : null;
}
__name(simpleEqual, "simpleEqual");
function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
  options = options || {}, options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
  var comparator = options && options.comparator, memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
  if (memoizeResultLeft !== null) return memoizeResultLeft;
  var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
  if (memoizeResultRight !== null) return memoizeResultRight;
  if (comparator) {
    var comparatorResult = comparator(leftHandOperand, rightHandOperand);
    if (comparatorResult === false || comparatorResult === true) return memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult), comparatorResult;
    var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
    if (simpleResult !== null) return simpleResult;
  }
  var leftHandType = type2(leftHandOperand);
  if (leftHandType !== type2(rightHandOperand)) return memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false), false;
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);
  var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
  return memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result), result;
}
__name(extensiveDeepEqual, "extensiveDeepEqual");
function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
  switch (leftHandType) {
    case "String":
    case "Number":
    case "Boolean":
    case "Date":
      return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
    case "Promise":
    case "Symbol":
    case "function":
    case "WeakMap":
    case "WeakSet":
      return leftHandOperand === rightHandOperand;
    case "Error":
      return keysEqual(leftHandOperand, rightHandOperand, ["name", "message", "code"], options);
    case "Arguments":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "Array":
      return iterableEqual(leftHandOperand, rightHandOperand, options);
    case "RegExp":
      return regexpEqual(leftHandOperand, rightHandOperand);
    case "Generator":
      return generatorEqual(leftHandOperand, rightHandOperand, options);
    case "DataView":
      return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
    case "ArrayBuffer":
      return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
    case "Set":
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    case "Map":
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    case "Temporal.PlainDate":
    case "Temporal.PlainTime":
    case "Temporal.PlainDateTime":
    case "Temporal.Instant":
    case "Temporal.ZonedDateTime":
    case "Temporal.PlainYearMonth":
    case "Temporal.PlainMonthDay":
      return leftHandOperand.equals(rightHandOperand);
    case "Temporal.Duration":
      return leftHandOperand.total("nanoseconds") === rightHandOperand.total("nanoseconds");
    case "Temporal.TimeZone":
    case "Temporal.Calendar":
      return leftHandOperand.toString() === rightHandOperand.toString();
    default:
      return objectEqual(leftHandOperand, rightHandOperand, options);
  }
}
__name(extensiveDeepEqualByType, "extensiveDeepEqualByType");
function regexpEqual(leftHandOperand, rightHandOperand) {
  return leftHandOperand.toString() === rightHandOperand.toString();
}
__name(regexpEqual, "regexpEqual");
function entriesEqual(leftHandOperand, rightHandOperand, options) {
  if (leftHandOperand.size !== rightHandOperand.size) return false;
  if (leftHandOperand.size === 0) return true;
  var leftHandItems = [], rightHandItems = [];
  return leftHandOperand.forEach(__name(function(key, value) {
    leftHandItems.push([key, value]);
  }, "gatherEntries")), rightHandOperand.forEach(__name(function(key, value) {
    rightHandItems.push([key, value]);
  }, "gatherEntries")), iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
}
__name(entriesEqual, "entriesEqual");
function iterableEqual(leftHandOperand, rightHandOperand, options) {
  var length = leftHandOperand.length;
  if (length !== rightHandOperand.length) return false;
  if (length === 0) return true;
  for (var index = -1; ++index < length; ) if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) return false;
  return true;
}
__name(iterableEqual, "iterableEqual");
function generatorEqual(leftHandOperand, rightHandOperand, options) {
  return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
}
__name(generatorEqual, "generatorEqual");
function hasIteratorFunction(target) {
  return typeof Symbol < "u" && typeof target == "object" && typeof Symbol.iterator < "u" && typeof target[Symbol.iterator] == "function";
}
__name(hasIteratorFunction, "hasIteratorFunction");
function getIteratorEntries(target) {
  if (hasIteratorFunction(target)) try {
    return getGeneratorEntries(target[Symbol.iterator]());
  } catch {
    return [];
  }
  return [];
}
__name(getIteratorEntries, "getIteratorEntries");
function getGeneratorEntries(generator) {
  for (var generatorResult = generator.next(), accumulator = [generatorResult.value]; generatorResult.done === false; ) generatorResult = generator.next(), accumulator.push(generatorResult.value);
  return accumulator;
}
__name(getGeneratorEntries, "getGeneratorEntries");
function getEnumerableKeys(target) {
  var keys2 = [];
  for (var key in target) keys2.push(key);
  return keys2;
}
__name(getEnumerableKeys, "getEnumerableKeys");
function getEnumerableSymbols(target) {
  for (var keys2 = [], allKeys = Object.getOwnPropertySymbols(target), i = 0; i < allKeys.length; i += 1) {
    var key = allKeys[i];
    Object.getOwnPropertyDescriptor(target, key).enumerable && keys2.push(key);
  }
  return keys2;
}
__name(getEnumerableSymbols, "getEnumerableSymbols");
function keysEqual(leftHandOperand, rightHandOperand, keys2, options) {
  var length = keys2.length;
  if (length === 0) return true;
  for (var i = 0; i < length; i += 1) if (deepEqual(leftHandOperand[keys2[i]], rightHandOperand[keys2[i]], options) === false) return false;
  return true;
}
__name(keysEqual, "keysEqual");
function objectEqual(leftHandOperand, rightHandOperand, options) {
  var leftHandKeys = getEnumerableKeys(leftHandOperand), rightHandKeys = getEnumerableKeys(rightHandOperand), leftHandSymbols = getEnumerableSymbols(leftHandOperand), rightHandSymbols = getEnumerableSymbols(rightHandOperand);
  if (leftHandKeys = leftHandKeys.concat(leftHandSymbols), rightHandKeys = rightHandKeys.concat(rightHandSymbols), leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) return iterableEqual(mapSymbols(leftHandKeys).sort(), mapSymbols(rightHandKeys).sort()) === false ? false : keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
  var leftHandEntries = getIteratorEntries(leftHandOperand), rightHandEntries = getIteratorEntries(rightHandOperand);
  return leftHandEntries.length && leftHandEntries.length === rightHandEntries.length ? (leftHandEntries.sort(), rightHandEntries.sort(), iterableEqual(leftHandEntries, rightHandEntries, options)) : leftHandKeys.length === 0 && leftHandEntries.length === 0 && rightHandKeys.length === 0 && rightHandEntries.length === 0;
}
__name(objectEqual, "objectEqual");
function isPrimitive(value) {
  return value === null || typeof value != "object";
}
__name(isPrimitive, "isPrimitive");
function mapSymbols(arr) {
  return arr.map(__name(function(entry) {
    return typeof entry == "symbol" ? entry.toString() : entry;
  }, "mapSymbol"));
}
__name(mapSymbols, "mapSymbols");
function hasProperty(obj, name) {
  return typeof obj > "u" || obj === null ? false : name in Object(obj);
}
__name(hasProperty, "hasProperty");
function parsePath(path) {
  return path.replace(/([^\\])\[/g, "$1.[").match(/(\\\.|[^.]+?)+/g).map((value) => {
    if (value === "constructor" || value === "__proto__" || value === "prototype") return {};
    let mArr = /^\[(\d+)\]$/.exec(value), parsed = null;
    return mArr ? parsed = { i: parseFloat(mArr[1]) } : parsed = { p: value.replace(/\\([.[\]])/g, "$1") }, parsed;
  });
}
__name(parsePath, "parsePath");
function internalGetPathValue(obj, parsed, pathDepth) {
  let temporaryValue = obj, res = null;
  pathDepth = typeof pathDepth > "u" ? parsed.length : pathDepth;
  for (let i = 0; i < pathDepth; i++) {
    let part = parsed[i];
    temporaryValue && (typeof part.p > "u" ? temporaryValue = temporaryValue[part.i] : temporaryValue = temporaryValue[part.p], i === pathDepth - 1 && (res = temporaryValue));
  }
  return res;
}
__name(internalGetPathValue, "internalGetPathValue");
function getPathInfo(obj, path) {
  let parsed = parsePath(path), last = parsed[parsed.length - 1], info = { parent: parsed.length > 1 ? internalGetPathValue(obj, parsed, parsed.length - 1) : obj, name: last.p || last.i, value: internalGetPathValue(obj, parsed) };
  return info.exists = hasProperty(info.parent, info.name), info;
}
__name(getPathInfo, "getPathInfo");
function Assertion(obj, msg, ssfi, lockSsfi) {
  return flag(this, "ssfi", ssfi || Assertion), flag(this, "lockSsfi", lockSsfi), flag(this, "object", obj), flag(this, "message", msg), flag(this, "eql", config.deepEqual || deep_eql_default), proxify(this);
}
__name(Assertion, "Assertion");
Object.defineProperty(Assertion, "includeStack", { get: function() {
  return console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."), config.includeStack;
}, set: function(value) {
  console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."), config.includeStack = value;
} });
Object.defineProperty(Assertion, "showDiff", { get: function() {
  return console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."), config.showDiff;
}, set: function(value) {
  console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."), config.showDiff = value;
} });
Assertion.addProperty = function(name, fn3) {
  addProperty(this.prototype, name, fn3);
};
Assertion.addMethod = function(name, fn3) {
  addMethod(this.prototype, name, fn3);
};
Assertion.addChainableMethod = function(name, fn3, chainingBehavior) {
  addChainableMethod(this.prototype, name, fn3, chainingBehavior);
};
Assertion.overwriteProperty = function(name, fn3) {
  overwriteProperty(this.prototype, name, fn3);
};
Assertion.overwriteMethod = function(name, fn3) {
  overwriteMethod(this.prototype, name, fn3);
};
Assertion.overwriteChainableMethod = function(name, fn3, chainingBehavior) {
  overwriteChainableMethod(this.prototype, name, fn3, chainingBehavior);
};
Assertion.prototype.assert = function(expr, msg, negateMsg, expected, _actual, showDiff) {
  var ok = test(this, arguments);
  if (showDiff !== false && (showDiff = true), expected === void 0 && _actual === void 0 && (showDiff = false), config.showDiff !== true && (showDiff = false), !ok) {
    msg = getMessage2(this, arguments);
    var actual = getActual(this, arguments), assertionErrorObjectProperties = { actual, expected, showDiff }, operator = getOperator(this, arguments);
    throw operator && (assertionErrorObjectProperties.operator = operator), new AssertionError(msg, assertionErrorObjectProperties, config.includeStack ? this.assert : flag(this, "ssfi"));
  }
};
Object.defineProperty(Assertion.prototype, "_obj", { get: function() {
  return flag(this, "object");
}, set: function(val) {
  flag(this, "object", val);
} });
function isProxyEnabled() {
  return config.useProxy && typeof Proxy < "u" && typeof Reflect < "u";
}
__name(isProxyEnabled, "isProxyEnabled");
function addProperty(ctx, name, getter) {
  getter = getter === void 0 ? function() {
  } : getter, Object.defineProperty(ctx, name, { get: __name(function propertyGetter() {
    !isProxyEnabled() && !flag(this, "lockSsfi") && flag(this, "ssfi", propertyGetter);
    var result = getter.call(this);
    if (result !== void 0) return result;
    var newAssertion = new Assertion();
    return transferFlags(this, newAssertion), newAssertion;
  }, "propertyGetter"), configurable: true });
}
__name(addProperty, "addProperty");
var fnLengthDesc = Object.getOwnPropertyDescriptor(function() {
}, "length");
function addLengthGuard(fn3, assertionName, isChainable) {
  return fnLengthDesc.configurable && Object.defineProperty(fn3, "length", { get: function() {
    throw Error(isChainable ? "Invalid Chai property: " + assertionName + '.length. Due to a compatibility issue, "length" cannot directly follow "' + assertionName + '". Use "' + assertionName + '.lengthOf" instead.' : "Invalid Chai property: " + assertionName + '.length. See docs for proper usage of "' + assertionName + '".');
  } }), fn3;
}
__name(addLengthGuard, "addLengthGuard");
function getProperties(object) {
  var result = Object.getOwnPropertyNames(object);
  function addProperty2(property) {
    result.indexOf(property) === -1 && result.push(property);
  }
  __name(addProperty2, "addProperty");
  for (var proto = Object.getPrototypeOf(object); proto !== null; ) Object.getOwnPropertyNames(proto).forEach(addProperty2), proto = Object.getPrototypeOf(proto);
  return result;
}
__name(getProperties, "getProperties");
var builtins = ["__flags", "__methods", "_obj", "assert"];
function proxify(obj, nonChainableMethodName) {
  return isProxyEnabled() ? new Proxy(obj, { get: __name(function proxyGetter(target, property) {
    if (typeof property == "string" && config.proxyExcludedKeys.indexOf(property) === -1 && !Reflect.has(target, property)) {
      if (nonChainableMethodName) throw Error("Invalid Chai property: " + nonChainableMethodName + "." + property + '. See docs for proper usage of "' + nonChainableMethodName + '".');
      var suggestion = null, suggestionDistance = 4;
      throw getProperties(target).forEach(function(prop) {
        if (!Object.prototype.hasOwnProperty(prop) && builtins.indexOf(prop) === -1) {
          var dist = stringDistanceCapped(property, prop, suggestionDistance);
          dist < suggestionDistance && (suggestion = prop, suggestionDistance = dist);
        }
      }), Error(suggestion !== null ? "Invalid Chai property: " + property + '. Did you mean "' + suggestion + '"?' : "Invalid Chai property: " + property);
    }
    return builtins.indexOf(property) === -1 && !flag(target, "lockSsfi") && flag(target, "ssfi", proxyGetter), Reflect.get(target, property);
  }, "proxyGetter") }) : obj;
}
__name(proxify, "proxify");
function stringDistanceCapped(strA, strB, cap) {
  if (Math.abs(strA.length - strB.length) >= cap) return cap;
  for (var memo = [], i = 0; i <= strA.length; i++) memo[i] = Array(strB.length + 1).fill(0), memo[i][0] = i;
  for (var j = 0; j < strB.length; j++) memo[0][j] = j;
  for (var i = 1; i <= strA.length; i++) for (var ch = strA.charCodeAt(i - 1), j = 1; j <= strB.length; j++) {
    if (Math.abs(i - j) >= cap) {
      memo[i][j] = cap;
      continue;
    }
    memo[i][j] = Math.min(memo[i - 1][j] + 1, memo[i][j - 1] + 1, memo[i - 1][j - 1] + (ch === strB.charCodeAt(j - 1) ? 0 : 1));
  }
  return memo[strA.length][strB.length];
}
__name(stringDistanceCapped, "stringDistanceCapped");
function addMethod(ctx, name, method) {
  var methodWrapper = __name(function() {
    flag(this, "lockSsfi") || flag(this, "ssfi", methodWrapper);
    var result = method.apply(this, arguments);
    if (result !== void 0) return result;
    var newAssertion = new Assertion();
    return transferFlags(this, newAssertion), newAssertion;
  }, "methodWrapper");
  addLengthGuard(methodWrapper, name, false), ctx[name] = proxify(methodWrapper, name);
}
__name(addMethod, "addMethod");
function overwriteProperty(ctx, name, getter) {
  var _get = Object.getOwnPropertyDescriptor(ctx, name), _super = __name(function() {
  }, "_super");
  _get && typeof _get.get == "function" && (_super = _get.get), Object.defineProperty(ctx, name, { get: __name(function overwritingPropertyGetter() {
    !isProxyEnabled() && !flag(this, "lockSsfi") && flag(this, "ssfi", overwritingPropertyGetter);
    var origLockSsfi = flag(this, "lockSsfi");
    flag(this, "lockSsfi", true);
    var result = getter(_super).call(this);
    if (flag(this, "lockSsfi", origLockSsfi), result !== void 0) return result;
    var newAssertion = new Assertion();
    return transferFlags(this, newAssertion), newAssertion;
  }, "overwritingPropertyGetter"), configurable: true });
}
__name(overwriteProperty, "overwriteProperty");
function overwriteMethod(ctx, name, method) {
  var _method = ctx[name], _super = __name(function() {
    throw new Error(name + " is not a function");
  }, "_super");
  _method && typeof _method == "function" && (_super = _method);
  var overwritingMethodWrapper = __name(function() {
    flag(this, "lockSsfi") || flag(this, "ssfi", overwritingMethodWrapper);
    var origLockSsfi = flag(this, "lockSsfi");
    flag(this, "lockSsfi", true);
    var result = method(_super).apply(this, arguments);
    if (flag(this, "lockSsfi", origLockSsfi), result !== void 0) return result;
    var newAssertion = new Assertion();
    return transferFlags(this, newAssertion), newAssertion;
  }, "overwritingMethodWrapper");
  addLengthGuard(overwritingMethodWrapper, name, false), ctx[name] = proxify(overwritingMethodWrapper, name);
}
__name(overwriteMethod, "overwriteMethod");
var canSetPrototype = typeof Object.setPrototypeOf == "function", testFn = __name(function() {
}, "testFn"), excludeNames = Object.getOwnPropertyNames(testFn).filter(function(name) {
  var propDesc = Object.getOwnPropertyDescriptor(testFn, name);
  return typeof propDesc != "object" ? true : !propDesc.configurable;
}), call = Function.prototype.call, apply = Function.prototype.apply;
function addChainableMethod(ctx, name, method, chainingBehavior) {
  typeof chainingBehavior != "function" && (chainingBehavior = __name(function() {
  }, "chainingBehavior"));
  var chainableBehavior = { method, chainingBehavior };
  ctx.__methods || (ctx.__methods = {}), ctx.__methods[name] = chainableBehavior, Object.defineProperty(ctx, name, { get: __name(function() {
    chainableBehavior.chainingBehavior.call(this);
    var chainableMethodWrapper = __name(function() {
      flag(this, "lockSsfi") || flag(this, "ssfi", chainableMethodWrapper);
      var result = chainableBehavior.method.apply(this, arguments);
      if (result !== void 0) return result;
      var newAssertion = new Assertion();
      return transferFlags(this, newAssertion), newAssertion;
    }, "chainableMethodWrapper");
    if (addLengthGuard(chainableMethodWrapper, name, true), canSetPrototype) {
      var prototype = Object.create(this);
      prototype.call = call, prototype.apply = apply, Object.setPrototypeOf(chainableMethodWrapper, prototype);
    } else {
      var asserterNames = Object.getOwnPropertyNames(ctx);
      asserterNames.forEach(function(asserterName) {
        if (excludeNames.indexOf(asserterName) === -1) {
          var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
          Object.defineProperty(chainableMethodWrapper, asserterName, pd);
        }
      });
    }
    return transferFlags(this, chainableMethodWrapper), proxify(chainableMethodWrapper);
  }, "chainableMethodGetter"), configurable: true });
}
__name(addChainableMethod, "addChainableMethod");
function overwriteChainableMethod(ctx, name, method, chainingBehavior) {
  var chainableBehavior = ctx.__methods[name], _chainingBehavior = chainableBehavior.chainingBehavior;
  chainableBehavior.chainingBehavior = __name(function() {
    var result = chainingBehavior(_chainingBehavior).call(this);
    if (result !== void 0) return result;
    var newAssertion = new Assertion();
    return transferFlags(this, newAssertion), newAssertion;
  }, "overwritingChainableMethodGetter");
  var _method = chainableBehavior.method;
  chainableBehavior.method = __name(function() {
    var result = method(_method).apply(this, arguments);
    if (result !== void 0) return result;
    var newAssertion = new Assertion();
    return transferFlags(this, newAssertion), newAssertion;
  }, "overwritingChainableMethodWrapper");
}
__name(overwriteChainableMethod, "overwriteChainableMethod");
function compareByInspect(a2, b) {
  return inspect2(a2) < inspect2(b) ? -1 : 1;
}
__name(compareByInspect, "compareByInspect");
function getOwnEnumerablePropertySymbols(obj) {
  return typeof Object.getOwnPropertySymbols != "function" ? [] : Object.getOwnPropertySymbols(obj).filter(function(sym) {
    return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
  });
}
__name(getOwnEnumerablePropertySymbols, "getOwnEnumerablePropertySymbols");
function getOwnEnumerableProperties(obj) {
  return Object.keys(obj).concat(getOwnEnumerablePropertySymbols(obj));
}
__name(getOwnEnumerableProperties, "getOwnEnumerableProperties");
function _isNaN(value) {
  return value !== value;
}
__name(_isNaN, "_isNaN");
var isNaN22 = Number.isNaN || _isNaN;
function isObjectType(obj) {
  var objectType = type(obj), objectTypes = ["Array", "Object", "Function"];
  return objectTypes.indexOf(objectType) !== -1;
}
__name(isObjectType, "isObjectType");
function getOperator(obj, args) {
  var operator = flag(obj, "operator"), negate = flag(obj, "negate"), expected = args[3], msg = negate ? args[2] : args[1];
  if (operator) return operator;
  if (typeof msg == "function" && (msg = msg()), msg = msg || "", !!msg && !/\shave\s/.test(msg)) {
    var isObject2 = isObjectType(expected);
    return /\snot\s/.test(msg) ? isObject2 ? "notDeepStrictEqual" : "notStrictEqual" : isObject2 ? "deepStrictEqual" : "strictEqual";
  }
}
__name(getOperator, "getOperator");
function getName(fn3) {
  return fn3.name;
}
__name(getName, "getName");
function isRegExp2(obj) {
  return Object.prototype.toString.call(obj) === "[object RegExp]";
}
__name(isRegExp2, "isRegExp");
var { flag: flag2 } = utils_exports;
["to", "be", "been", "is", "and", "has", "have", "with", "that", "which", "at", "of", "same", "but", "does", "still", "also"].forEach(function(chain) {
  Assertion.addProperty(chain);
});
Assertion.addProperty("not", function() {
  flag2(this, "negate", true);
});
Assertion.addProperty("deep", function() {
  flag2(this, "deep", true);
});
Assertion.addProperty("nested", function() {
  flag2(this, "nested", true);
});
Assertion.addProperty("own", function() {
  flag2(this, "own", true);
});
Assertion.addProperty("ordered", function() {
  flag2(this, "ordered", true);
});
Assertion.addProperty("any", function() {
  flag2(this, "any", true), flag2(this, "all", false);
});
Assertion.addProperty("all", function() {
  flag2(this, "all", true), flag2(this, "any", false);
});
var functionTypes = { function: ["function", "asyncfunction", "generatorfunction", "asyncgeneratorfunction"], asyncfunction: ["asyncfunction", "asyncgeneratorfunction"], generatorfunction: ["generatorfunction", "asyncgeneratorfunction"], asyncgeneratorfunction: ["asyncgeneratorfunction"] };
function an(type32, msg) {
  msg && flag2(this, "message", msg), type32 = type32.toLowerCase();
  var obj = flag2(this, "object"), article = ~["a", "e", "i", "o", "u"].indexOf(type32.charAt(0)) ? "an " : "a ";
  let detectedType = type(obj).toLowerCase();
  functionTypes.function.includes(type32) ? this.assert(functionTypes[type32].includes(detectedType), "expected #{this} to be " + article + type32, "expected #{this} not to be " + article + type32) : this.assert(type32 === detectedType, "expected #{this} to be " + article + type32, "expected #{this} not to be " + article + type32);
}
__name(an, "an");
Assertion.addChainableMethod("an", an);
Assertion.addChainableMethod("a", an);
function SameValueZero(a2, b) {
  return isNaN22(a2) && isNaN22(b) || a2 === b;
}
__name(SameValueZero, "SameValueZero");
function includeChainingBehavior() {
  flag2(this, "contains", true);
}
__name(includeChainingBehavior, "includeChainingBehavior");
function include(val, msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object"), objType = type(obj).toLowerCase(), flagMsg = flag2(this, "message"), negate = flag2(this, "negate"), ssfi = flag2(this, "ssfi"), isDeep = flag2(this, "deep"), descriptor = isDeep ? "deep " : "", isEql = isDeep ? flag2(this, "eql") : SameValueZero;
  flagMsg = flagMsg ? flagMsg + ": " : "";
  var included = false;
  switch (objType) {
    case "string":
      included = obj.indexOf(val) !== -1;
      break;
    case "weakset":
      if (isDeep) throw new AssertionError(flagMsg + "unable to use .deep.include with WeakSet", void 0, ssfi);
      included = obj.has(val);
      break;
    case "map":
      obj.forEach(function(item) {
        included = included || isEql(item, val);
      });
      break;
    case "set":
      isDeep ? obj.forEach(function(item) {
        included = included || isEql(item, val);
      }) : included = obj.has(val);
      break;
    case "array":
      isDeep ? included = obj.some(function(item) {
        return isEql(item, val);
      }) : included = obj.indexOf(val) !== -1;
      break;
    default:
      if (val !== Object(val)) throw new AssertionError(flagMsg + "the given combination of arguments (" + objType + " and " + type(val).toLowerCase() + ") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a " + type(val).toLowerCase(), void 0, ssfi);
      var props = Object.keys(val), firstErr = null, numErrs = 0;
      if (props.forEach(function(prop) {
        var propAssertion = new Assertion(obj);
        if (transferFlags(this, propAssertion, true), flag2(propAssertion, "lockSsfi", true), !negate || props.length === 1) {
          propAssertion.property(prop, val[prop]);
          return;
        }
        try {
          propAssertion.property(prop, val[prop]);
        } catch (err) {
          if (!check_error_exports.compatibleConstructor(err, AssertionError)) throw err;
          firstErr === null && (firstErr = err), numErrs++;
        }
      }, this), negate && props.length > 1 && numErrs === props.length) throw firstErr;
      return;
  }
  this.assert(included, "expected #{this} to " + descriptor + "include " + inspect2(val), "expected #{this} to not " + descriptor + "include " + inspect2(val));
}
__name(include, "include");
Assertion.addChainableMethod("include", include, includeChainingBehavior);
Assertion.addChainableMethod("contain", include, includeChainingBehavior);
Assertion.addChainableMethod("contains", include, includeChainingBehavior);
Assertion.addChainableMethod("includes", include, includeChainingBehavior);
Assertion.addProperty("ok", function() {
  this.assert(flag2(this, "object"), "expected #{this} to be truthy", "expected #{this} to be falsy");
});
Assertion.addProperty("true", function() {
  this.assert(flag2(this, "object") === true, "expected #{this} to be true", "expected #{this} to be false", !flag2(this, "negate"));
});
Assertion.addProperty("callable", function() {
  let val = flag2(this, "object"), ssfi = flag2(this, "ssfi"), message = flag2(this, "message"), msg = message ? `${message}: ` : "", negate = flag2(this, "negate"), assertionMessage = negate ? `${msg}expected ${inspect2(val)} not to be a callable function` : `${msg}expected ${inspect2(val)} to be a callable function`, isCallable3 = ["Function", "AsyncFunction", "GeneratorFunction", "AsyncGeneratorFunction"].includes(type(val));
  if (isCallable3 && negate || !isCallable3 && !negate) throw new AssertionError(assertionMessage, void 0, ssfi);
});
Assertion.addProperty("false", function() {
  this.assert(flag2(this, "object") === false, "expected #{this} to be false", "expected #{this} to be true", !!flag2(this, "negate"));
});
Assertion.addProperty("null", function() {
  this.assert(flag2(this, "object") === null, "expected #{this} to be null", "expected #{this} not to be null");
});
Assertion.addProperty("undefined", function() {
  this.assert(flag2(this, "object") === void 0, "expected #{this} to be undefined", "expected #{this} not to be undefined");
});
Assertion.addProperty("NaN", function() {
  this.assert(isNaN22(flag2(this, "object")), "expected #{this} to be NaN", "expected #{this} not to be NaN");
});
function assertExist() {
  var val = flag2(this, "object");
  this.assert(val != null, "expected #{this} to exist", "expected #{this} to not exist");
}
__name(assertExist, "assertExist");
Assertion.addProperty("exist", assertExist);
Assertion.addProperty("exists", assertExist);
Assertion.addProperty("empty", function() {
  var val = flag2(this, "object"), ssfi = flag2(this, "ssfi"), flagMsg = flag2(this, "message"), itemsCount;
  switch (flagMsg = flagMsg ? flagMsg + ": " : "", type(val).toLowerCase()) {
    case "array":
    case "string":
      itemsCount = val.length;
      break;
    case "map":
    case "set":
      itemsCount = val.size;
      break;
    case "weakmap":
    case "weakset":
      throw new AssertionError(flagMsg + ".empty was passed a weak collection", void 0, ssfi);
    case "function":
      var msg = flagMsg + ".empty was passed a function " + getName(val);
      throw new AssertionError(msg.trim(), void 0, ssfi);
    default:
      if (val !== Object(val)) throw new AssertionError(flagMsg + ".empty was passed non-string primitive " + inspect2(val), void 0, ssfi);
      itemsCount = Object.keys(val).length;
  }
  this.assert(itemsCount === 0, "expected #{this} to be empty", "expected #{this} not to be empty");
});
function checkArguments() {
  var obj = flag2(this, "object"), type32 = type(obj);
  this.assert(type32 === "Arguments", "expected #{this} to be arguments but got " + type32, "expected #{this} to not be arguments");
}
__name(checkArguments, "checkArguments");
Assertion.addProperty("arguments", checkArguments);
Assertion.addProperty("Arguments", checkArguments);
function assertEqual(val, msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object");
  if (flag2(this, "deep")) {
    var prevLockSsfi = flag2(this, "lockSsfi");
    flag2(this, "lockSsfi", true), this.eql(val), flag2(this, "lockSsfi", prevLockSsfi);
  } else this.assert(val === obj, "expected #{this} to equal #{exp}", "expected #{this} to not equal #{exp}", val, this._obj, true);
}
__name(assertEqual, "assertEqual");
Assertion.addMethod("equal", assertEqual);
Assertion.addMethod("equals", assertEqual);
Assertion.addMethod("eq", assertEqual);
function assertEql(obj, msg) {
  msg && flag2(this, "message", msg);
  var eql = flag2(this, "eql");
  this.assert(eql(obj, flag2(this, "object")), "expected #{this} to deeply equal #{exp}", "expected #{this} to not deeply equal #{exp}", obj, this._obj, true);
}
__name(assertEql, "assertEql");
Assertion.addMethod("eql", assertEql);
Assertion.addMethod("eqls", assertEql);
function assertAbove(n, msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = type(obj).toLowerCase(), nType = type(n).toLowerCase(), errorMessage, shouldThrow = true;
  if (doLength && objType !== "map" && objType !== "set" && new Assertion(obj, flagMsg, ssfi, true).to.have.property("length"), !doLength && objType === "date" && nType !== "date") errorMessage = msgPrefix + "the argument to above must be a date";
  else if (nType !== "number" && (doLength || objType === "number")) errorMessage = msgPrefix + "the argument to above must be a number";
  else if (!doLength && objType !== "date" && objType !== "number") {
    var printObj = objType === "string" ? "'" + obj + "'" : obj;
    errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
  } else shouldThrow = false;
  if (shouldThrow) throw new AssertionError(errorMessage, void 0, ssfi);
  if (doLength) {
    var descriptor = "length", itemsCount;
    objType === "map" || objType === "set" ? (descriptor = "size", itemsCount = obj.size) : itemsCount = obj.length, this.assert(itemsCount > n, "expected #{this} to have a " + descriptor + " above #{exp} but got #{act}", "expected #{this} to not have a " + descriptor + " above #{exp}", n, itemsCount);
  } else this.assert(obj > n, "expected #{this} to be above #{exp}", "expected #{this} to be at most #{exp}", n);
}
__name(assertAbove, "assertAbove");
Assertion.addMethod("above", assertAbove);
Assertion.addMethod("gt", assertAbove);
Assertion.addMethod("greaterThan", assertAbove);
function assertLeast(n, msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = type(obj).toLowerCase(), nType = type(n).toLowerCase(), errorMessage, shouldThrow = true;
  if (doLength && objType !== "map" && objType !== "set" && new Assertion(obj, flagMsg, ssfi, true).to.have.property("length"), !doLength && objType === "date" && nType !== "date") errorMessage = msgPrefix + "the argument to least must be a date";
  else if (nType !== "number" && (doLength || objType === "number")) errorMessage = msgPrefix + "the argument to least must be a number";
  else if (!doLength && objType !== "date" && objType !== "number") {
    var printObj = objType === "string" ? "'" + obj + "'" : obj;
    errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
  } else shouldThrow = false;
  if (shouldThrow) throw new AssertionError(errorMessage, void 0, ssfi);
  if (doLength) {
    var descriptor = "length", itemsCount;
    objType === "map" || objType === "set" ? (descriptor = "size", itemsCount = obj.size) : itemsCount = obj.length, this.assert(itemsCount >= n, "expected #{this} to have a " + descriptor + " at least #{exp} but got #{act}", "expected #{this} to have a " + descriptor + " below #{exp}", n, itemsCount);
  } else this.assert(obj >= n, "expected #{this} to be at least #{exp}", "expected #{this} to be below #{exp}", n);
}
__name(assertLeast, "assertLeast");
Assertion.addMethod("least", assertLeast);
Assertion.addMethod("gte", assertLeast);
Assertion.addMethod("greaterThanOrEqual", assertLeast);
function assertBelow(n, msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = type(obj).toLowerCase(), nType = type(n).toLowerCase(), errorMessage, shouldThrow = true;
  if (doLength && objType !== "map" && objType !== "set" && new Assertion(obj, flagMsg, ssfi, true).to.have.property("length"), !doLength && objType === "date" && nType !== "date") errorMessage = msgPrefix + "the argument to below must be a date";
  else if (nType !== "number" && (doLength || objType === "number")) errorMessage = msgPrefix + "the argument to below must be a number";
  else if (!doLength && objType !== "date" && objType !== "number") {
    var printObj = objType === "string" ? "'" + obj + "'" : obj;
    errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
  } else shouldThrow = false;
  if (shouldThrow) throw new AssertionError(errorMessage, void 0, ssfi);
  if (doLength) {
    var descriptor = "length", itemsCount;
    objType === "map" || objType === "set" ? (descriptor = "size", itemsCount = obj.size) : itemsCount = obj.length, this.assert(itemsCount < n, "expected #{this} to have a " + descriptor + " below #{exp} but got #{act}", "expected #{this} to not have a " + descriptor + " below #{exp}", n, itemsCount);
  } else this.assert(obj < n, "expected #{this} to be below #{exp}", "expected #{this} to be at least #{exp}", n);
}
__name(assertBelow, "assertBelow");
Assertion.addMethod("below", assertBelow);
Assertion.addMethod("lt", assertBelow);
Assertion.addMethod("lessThan", assertBelow);
function assertMost(n, msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = type(obj).toLowerCase(), nType = type(n).toLowerCase(), errorMessage, shouldThrow = true;
  if (doLength && objType !== "map" && objType !== "set" && new Assertion(obj, flagMsg, ssfi, true).to.have.property("length"), !doLength && objType === "date" && nType !== "date") errorMessage = msgPrefix + "the argument to most must be a date";
  else if (nType !== "number" && (doLength || objType === "number")) errorMessage = msgPrefix + "the argument to most must be a number";
  else if (!doLength && objType !== "date" && objType !== "number") {
    var printObj = objType === "string" ? "'" + obj + "'" : obj;
    errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
  } else shouldThrow = false;
  if (shouldThrow) throw new AssertionError(errorMessage, void 0, ssfi);
  if (doLength) {
    var descriptor = "length", itemsCount;
    objType === "map" || objType === "set" ? (descriptor = "size", itemsCount = obj.size) : itemsCount = obj.length, this.assert(itemsCount <= n, "expected #{this} to have a " + descriptor + " at most #{exp} but got #{act}", "expected #{this} to have a " + descriptor + " above #{exp}", n, itemsCount);
  } else this.assert(obj <= n, "expected #{this} to be at most #{exp}", "expected #{this} to be above #{exp}", n);
}
__name(assertMost, "assertMost");
Assertion.addMethod("most", assertMost);
Assertion.addMethod("lte", assertMost);
Assertion.addMethod("lessThanOrEqual", assertMost);
Assertion.addMethod("within", function(start, finish, msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = type(obj).toLowerCase(), startType = type(start).toLowerCase(), finishType = type(finish).toLowerCase(), errorMessage, shouldThrow = true, range = startType === "date" && finishType === "date" ? start.toISOString() + ".." + finish.toISOString() : start + ".." + finish;
  if (doLength && objType !== "map" && objType !== "set" && new Assertion(obj, flagMsg, ssfi, true).to.have.property("length"), !doLength && objType === "date" && (startType !== "date" || finishType !== "date")) errorMessage = msgPrefix + "the arguments to within must be dates";
  else if ((startType !== "number" || finishType !== "number") && (doLength || objType === "number")) errorMessage = msgPrefix + "the arguments to within must be numbers";
  else if (!doLength && objType !== "date" && objType !== "number") {
    var printObj = objType === "string" ? "'" + obj + "'" : obj;
    errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
  } else shouldThrow = false;
  if (shouldThrow) throw new AssertionError(errorMessage, void 0, ssfi);
  if (doLength) {
    var descriptor = "length", itemsCount;
    objType === "map" || objType === "set" ? (descriptor = "size", itemsCount = obj.size) : itemsCount = obj.length, this.assert(itemsCount >= start && itemsCount <= finish, "expected #{this} to have a " + descriptor + " within " + range, "expected #{this} to not have a " + descriptor + " within " + range);
  } else this.assert(obj >= start && obj <= finish, "expected #{this} to be within " + range, "expected #{this} to not be within " + range);
});
function assertInstanceOf(constructor, msg) {
  msg && flag2(this, "message", msg);
  var target = flag2(this, "object"), ssfi = flag2(this, "ssfi"), flagMsg = flag2(this, "message");
  try {
    var isInstanceOf = target instanceof constructor;
  } catch (err) {
    throw err instanceof TypeError ? (flagMsg = flagMsg ? flagMsg + ": " : "", new AssertionError(flagMsg + "The instanceof assertion needs a constructor but " + type(constructor) + " was given.", void 0, ssfi)) : err;
  }
  var name = getName(constructor);
  name == null && (name = "an unnamed constructor"), this.assert(isInstanceOf, "expected #{this} to be an instance of " + name, "expected #{this} to not be an instance of " + name);
}
__name(assertInstanceOf, "assertInstanceOf");
Assertion.addMethod("instanceof", assertInstanceOf);
Assertion.addMethod("instanceOf", assertInstanceOf);
function assertProperty(name, val, msg) {
  msg && flag2(this, "message", msg);
  var isNested = flag2(this, "nested"), isOwn = flag2(this, "own"), flagMsg = flag2(this, "message"), obj = flag2(this, "object"), ssfi = flag2(this, "ssfi"), nameType = typeof name;
  if (flagMsg = flagMsg ? flagMsg + ": " : "", isNested) {
    if (nameType !== "string") throw new AssertionError(flagMsg + "the argument to property must be a string when using nested syntax", void 0, ssfi);
  } else if (nameType !== "string" && nameType !== "number" && nameType !== "symbol") throw new AssertionError(flagMsg + "the argument to property must be a string, number, or symbol", void 0, ssfi);
  if (isNested && isOwn) throw new AssertionError(flagMsg + 'The "nested" and "own" flags cannot be combined.', void 0, ssfi);
  if (obj == null) throw new AssertionError(flagMsg + "Target cannot be null or undefined.", void 0, ssfi);
  var isDeep = flag2(this, "deep"), negate = flag2(this, "negate"), pathInfo = isNested ? getPathInfo(obj, name) : null, value = isNested ? pathInfo.value : obj[name], isEql = isDeep ? flag2(this, "eql") : (val1, val2) => val1 === val2, descriptor = "";
  isDeep && (descriptor += "deep "), isOwn && (descriptor += "own "), isNested && (descriptor += "nested "), descriptor += "property ";
  var hasProperty2;
  isOwn ? hasProperty2 = Object.prototype.hasOwnProperty.call(obj, name) : isNested ? hasProperty2 = pathInfo.exists : hasProperty2 = hasProperty(obj, name), (!negate || arguments.length === 1) && this.assert(hasProperty2, "expected #{this} to have " + descriptor + inspect2(name), "expected #{this} to not have " + descriptor + inspect2(name)), arguments.length > 1 && this.assert(hasProperty2 && isEql(val, value), "expected #{this} to have " + descriptor + inspect2(name) + " of #{exp}, but got #{act}", "expected #{this} to not have " + descriptor + inspect2(name) + " of #{act}", val, value), flag2(this, "object", value);
}
__name(assertProperty, "assertProperty");
Assertion.addMethod("property", assertProperty);
function assertOwnProperty(name, value, msg) {
  flag2(this, "own", true), assertProperty.apply(this, arguments);
}
__name(assertOwnProperty, "assertOwnProperty");
Assertion.addMethod("ownProperty", assertOwnProperty);
Assertion.addMethod("haveOwnProperty", assertOwnProperty);
function assertOwnPropertyDescriptor(name, descriptor, msg) {
  typeof descriptor == "string" && (msg = descriptor, descriptor = null), msg && flag2(this, "message", msg);
  var obj = flag2(this, "object"), actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name), eql = flag2(this, "eql");
  actualDescriptor && descriptor ? this.assert(eql(descriptor, actualDescriptor), "expected the own property descriptor for " + inspect2(name) + " on #{this} to match " + inspect2(descriptor) + ", got " + inspect2(actualDescriptor), "expected the own property descriptor for " + inspect2(name) + " on #{this} to not match " + inspect2(descriptor), descriptor, actualDescriptor, true) : this.assert(actualDescriptor, "expected #{this} to have an own property descriptor for " + inspect2(name), "expected #{this} to not have an own property descriptor for " + inspect2(name)), flag2(this, "object", actualDescriptor);
}
__name(assertOwnPropertyDescriptor, "assertOwnPropertyDescriptor");
Assertion.addMethod("ownPropertyDescriptor", assertOwnPropertyDescriptor);
Assertion.addMethod("haveOwnPropertyDescriptor", assertOwnPropertyDescriptor);
function assertLengthChain() {
  flag2(this, "doLength", true);
}
__name(assertLengthChain, "assertLengthChain");
function assertLength(n, msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object"), objType = type(obj).toLowerCase(), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi"), descriptor = "length", itemsCount;
  switch (objType) {
    case "map":
    case "set":
      descriptor = "size", itemsCount = obj.size;
      break;
    default:
      new Assertion(obj, flagMsg, ssfi, true).to.have.property("length"), itemsCount = obj.length;
  }
  this.assert(itemsCount == n, "expected #{this} to have a " + descriptor + " of #{exp} but got #{act}", "expected #{this} to not have a " + descriptor + " of #{act}", n, itemsCount);
}
__name(assertLength, "assertLength");
Assertion.addChainableMethod("length", assertLength, assertLengthChain);
Assertion.addChainableMethod("lengthOf", assertLength, assertLengthChain);
function assertMatch(re, msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object");
  this.assert(re.exec(obj), "expected #{this} to match " + re, "expected #{this} not to match " + re);
}
__name(assertMatch, "assertMatch");
Assertion.addMethod("match", assertMatch);
Assertion.addMethod("matches", assertMatch);
Assertion.addMethod("string", function(str, msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
  new Assertion(obj, flagMsg, ssfi, true).is.a("string"), this.assert(~obj.indexOf(str), "expected #{this} to contain " + inspect2(str), "expected #{this} to not contain " + inspect2(str));
});
function assertKeys(keys2) {
  var obj = flag2(this, "object"), objType = type(obj), keysType = type(keys2), ssfi = flag2(this, "ssfi"), isDeep = flag2(this, "deep"), str, deepStr = "", actual, ok = true, flagMsg = flag2(this, "message");
  flagMsg = flagMsg ? flagMsg + ": " : "";
  var mixedArgsMsg = flagMsg + "when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";
  if (objType === "Map" || objType === "Set") deepStr = isDeep ? "deeply " : "", actual = [], obj.forEach(function(val, key) {
    actual.push(key);
  }), keysType !== "Array" && (keys2 = Array.prototype.slice.call(arguments));
  else {
    switch (actual = getOwnEnumerableProperties(obj), keysType) {
      case "Array":
        if (arguments.length > 1) throw new AssertionError(mixedArgsMsg, void 0, ssfi);
        break;
      case "Object":
        if (arguments.length > 1) throw new AssertionError(mixedArgsMsg, void 0, ssfi);
        keys2 = Object.keys(keys2);
        break;
      default:
        keys2 = Array.prototype.slice.call(arguments);
    }
    keys2 = keys2.map(function(val) {
      return typeof val == "symbol" ? val : String(val);
    });
  }
  if (!keys2.length) throw new AssertionError(flagMsg + "keys required", void 0, ssfi);
  var len = keys2.length, any = flag2(this, "any"), all = flag2(this, "all"), expected = keys2, isEql = isDeep ? flag2(this, "eql") : (val1, val2) => val1 === val2;
  if (!any && !all && (all = true), any && (ok = expected.some(function(expectedKey) {
    return actual.some(function(actualKey) {
      return isEql(expectedKey, actualKey);
    });
  })), all && (ok = expected.every(function(expectedKey) {
    return actual.some(function(actualKey) {
      return isEql(expectedKey, actualKey);
    });
  }), flag2(this, "contains") || (ok = ok && keys2.length == actual.length)), len > 1) {
    keys2 = keys2.map(function(key) {
      return inspect2(key);
    });
    var last = keys2.pop();
    all && (str = keys2.join(", ") + ", and " + last), any && (str = keys2.join(", ") + ", or " + last);
  } else str = inspect2(keys2[0]);
  str = (len > 1 ? "keys " : "key ") + str, str = (flag2(this, "contains") ? "contain " : "have ") + str, this.assert(ok, "expected #{this} to " + deepStr + str, "expected #{this} to not " + deepStr + str, expected.slice(0).sort(compareByInspect), actual.sort(compareByInspect), true);
}
__name(assertKeys, "assertKeys");
Assertion.addMethod("keys", assertKeys);
Assertion.addMethod("key", assertKeys);
function assertThrows(errorLike, errMsgMatcher, msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object"), ssfi = flag2(this, "ssfi"), flagMsg = flag2(this, "message"), negate = flag2(this, "negate") || false;
  new Assertion(obj, flagMsg, ssfi, true).is.a("function"), (isRegExp2(errorLike) || typeof errorLike == "string") && (errMsgMatcher = errorLike, errorLike = null);
  let caughtErr, errorWasThrown = false;
  try {
    obj();
  } catch (err) {
    errorWasThrown = true, caughtErr = err;
  }
  var everyArgIsUndefined = errorLike === void 0 && errMsgMatcher === void 0, everyArgIsDefined = !!(errorLike && errMsgMatcher), errorLikeFail = false, errMsgMatcherFail = false;
  if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
    var errorLikeString = "an error";
    errorLike instanceof Error ? errorLikeString = "#{exp}" : errorLike && (errorLikeString = check_error_exports.getConstructorName(errorLike));
    let actual = caughtErr;
    if (caughtErr instanceof Error) actual = caughtErr.toString();
    else if (typeof caughtErr == "string") actual = caughtErr;
    else if (caughtErr && (typeof caughtErr == "object" || typeof caughtErr == "function")) try {
      actual = check_error_exports.getConstructorName(caughtErr);
    } catch {
    }
    this.assert(errorWasThrown, "expected #{this} to throw " + errorLikeString, "expected #{this} to not throw an error but #{act} was thrown", errorLike && errorLike.toString(), actual);
  }
  if (errorLike && caughtErr) {
    if (errorLike instanceof Error) {
      var isCompatibleInstance = check_error_exports.compatibleInstance(caughtErr, errorLike);
      isCompatibleInstance === negate && (everyArgIsDefined && negate ? errorLikeFail = true : this.assert(negate, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (caughtErr && !negate ? " but #{act} was thrown" : ""), errorLike.toString(), caughtErr.toString()));
    }
    var isCompatibleConstructor = check_error_exports.compatibleConstructor(caughtErr, errorLike);
    isCompatibleConstructor === negate && (everyArgIsDefined && negate ? errorLikeFail = true : this.assert(negate, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""), errorLike instanceof Error ? errorLike.toString() : errorLike && check_error_exports.getConstructorName(errorLike), caughtErr instanceof Error ? caughtErr.toString() : caughtErr && check_error_exports.getConstructorName(caughtErr)));
  }
  if (caughtErr && errMsgMatcher !== void 0 && errMsgMatcher !== null) {
    var placeholder = "including";
    isRegExp2(errMsgMatcher) && (placeholder = "matching");
    var isCompatibleMessage = check_error_exports.compatibleMessage(caughtErr, errMsgMatcher);
    isCompatibleMessage === negate && (everyArgIsDefined && negate ? errMsgMatcherFail = true : this.assert(negate, "expected #{this} to throw error " + placeholder + " #{exp} but got #{act}", "expected #{this} to throw error not " + placeholder + " #{exp}", errMsgMatcher, check_error_exports.getMessage(caughtErr)));
  }
  errorLikeFail && errMsgMatcherFail && this.assert(negate, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""), errorLike instanceof Error ? errorLike.toString() : errorLike && check_error_exports.getConstructorName(errorLike), caughtErr instanceof Error ? caughtErr.toString() : caughtErr && check_error_exports.getConstructorName(caughtErr)), flag2(this, "object", caughtErr);
}
__name(assertThrows, "assertThrows");
Assertion.addMethod("throw", assertThrows);
Assertion.addMethod("throws", assertThrows);
Assertion.addMethod("Throw", assertThrows);
function respondTo(method, msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object"), itself = flag2(this, "itself"), context = typeof obj == "function" && !itself ? obj.prototype[method] : obj[method];
  this.assert(typeof context == "function", "expected #{this} to respond to " + inspect2(method), "expected #{this} to not respond to " + inspect2(method));
}
__name(respondTo, "respondTo");
Assertion.addMethod("respondTo", respondTo);
Assertion.addMethod("respondsTo", respondTo);
Assertion.addProperty("itself", function() {
  flag2(this, "itself", true);
});
function satisfy(matcher, msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object"), result = matcher(obj);
  this.assert(result, "expected #{this} to satisfy " + objDisplay(matcher), "expected #{this} to not satisfy" + objDisplay(matcher), !flag2(this, "negate"), result);
}
__name(satisfy, "satisfy");
Assertion.addMethod("satisfy", satisfy);
Assertion.addMethod("satisfies", satisfy);
function closeTo(expected, delta, msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
  if (new Assertion(obj, flagMsg, ssfi, true).is.a("number"), typeof expected != "number" || typeof delta != "number") {
    flagMsg = flagMsg ? flagMsg + ": " : "";
    var deltaMessage = delta === void 0 ? ", and a delta is required" : "";
    throw new AssertionError(flagMsg + "the arguments to closeTo or approximately must be numbers" + deltaMessage, void 0, ssfi);
  }
  this.assert(Math.abs(obj - expected) <= delta, "expected #{this} to be close to " + expected + " +/- " + delta, "expected #{this} not to be close to " + expected + " +/- " + delta);
}
__name(closeTo, "closeTo");
Assertion.addMethod("closeTo", closeTo);
Assertion.addMethod("approximately", closeTo);
function isSubsetOf(_subset, _superset, cmp, contains, ordered) {
  let superset = Array.from(_superset), subset = Array.from(_subset);
  if (!contains) {
    if (subset.length !== superset.length) return false;
    superset = superset.slice();
  }
  return subset.every(function(elem, idx) {
    if (ordered) return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];
    if (!cmp) {
      var matchIdx = superset.indexOf(elem);
      return matchIdx === -1 ? false : (contains || superset.splice(matchIdx, 1), true);
    }
    return superset.some(function(elem2, matchIdx2) {
      return cmp(elem, elem2) ? (contains || superset.splice(matchIdx2, 1), true) : false;
    });
  });
}
__name(isSubsetOf, "isSubsetOf");
Assertion.addMethod("members", function(subset, msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
  new Assertion(obj, flagMsg, ssfi, true).to.be.iterable, new Assertion(subset, flagMsg, ssfi, true).to.be.iterable;
  var contains = flag2(this, "contains"), ordered = flag2(this, "ordered"), subject, failMsg, failNegateMsg;
  contains ? (subject = ordered ? "an ordered superset" : "a superset", failMsg = "expected #{this} to be " + subject + " of #{exp}", failNegateMsg = "expected #{this} to not be " + subject + " of #{exp}") : (subject = ordered ? "ordered members" : "members", failMsg = "expected #{this} to have the same " + subject + " as #{exp}", failNegateMsg = "expected #{this} to not have the same " + subject + " as #{exp}");
  var cmp = flag2(this, "deep") ? flag2(this, "eql") : void 0;
  this.assert(isSubsetOf(subset, obj, cmp, contains, ordered), failMsg, failNegateMsg, subset, obj, true);
});
Assertion.addProperty("iterable", function(msg) {
  msg && flag2(this, "message", msg);
  var obj = flag2(this, "object");
  this.assert(obj != null && obj[Symbol.iterator], "expected #{this} to be an iterable", "expected #{this} to not be an iterable", obj);
});
function oneOf(list, msg) {
  msg && flag2(this, "message", msg);
  var expected = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi"), contains = flag2(this, "contains"), isDeep = flag2(this, "deep"), eql = flag2(this, "eql");
  new Assertion(list, flagMsg, ssfi, true).to.be.an("array"), contains ? this.assert(list.some(function(possibility) {
    return expected.indexOf(possibility) > -1;
  }), "expected #{this} to contain one of #{exp}", "expected #{this} to not contain one of #{exp}", list, expected) : isDeep ? this.assert(list.some(function(possibility) {
    return eql(expected, possibility);
  }), "expected #{this} to deeply equal one of #{exp}", "expected #{this} to deeply equal one of #{exp}", list, expected) : this.assert(list.indexOf(expected) > -1, "expected #{this} to be one of #{exp}", "expected #{this} to not be one of #{exp}", list, expected);
}
__name(oneOf, "oneOf");
Assertion.addMethod("oneOf", oneOf);
function assertChanges(subject, prop, msg) {
  msg && flag2(this, "message", msg);
  var fn3 = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
  new Assertion(fn3, flagMsg, ssfi, true).is.a("function");
  var initial;
  prop ? (new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop), initial = subject[prop]) : (new Assertion(subject, flagMsg, ssfi, true).is.a("function"), initial = subject()), fn3();
  var final = prop == null ? subject() : subject[prop], msgObj = prop == null ? initial : "." + prop;
  flag2(this, "deltaMsgObj", msgObj), flag2(this, "initialDeltaValue", initial), flag2(this, "finalDeltaValue", final), flag2(this, "deltaBehavior", "change"), flag2(this, "realDelta", final !== initial), this.assert(initial !== final, "expected " + msgObj + " to change", "expected " + msgObj + " to not change");
}
__name(assertChanges, "assertChanges");
Assertion.addMethod("change", assertChanges);
Assertion.addMethod("changes", assertChanges);
function assertIncreases(subject, prop, msg) {
  msg && flag2(this, "message", msg);
  var fn3 = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
  new Assertion(fn3, flagMsg, ssfi, true).is.a("function");
  var initial;
  prop ? (new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop), initial = subject[prop]) : (new Assertion(subject, flagMsg, ssfi, true).is.a("function"), initial = subject()), new Assertion(initial, flagMsg, ssfi, true).is.a("number"), fn3();
  var final = prop == null ? subject() : subject[prop], msgObj = prop == null ? initial : "." + prop;
  flag2(this, "deltaMsgObj", msgObj), flag2(this, "initialDeltaValue", initial), flag2(this, "finalDeltaValue", final), flag2(this, "deltaBehavior", "increase"), flag2(this, "realDelta", final - initial), this.assert(final - initial > 0, "expected " + msgObj + " to increase", "expected " + msgObj + " to not increase");
}
__name(assertIncreases, "assertIncreases");
Assertion.addMethod("increase", assertIncreases);
Assertion.addMethod("increases", assertIncreases);
function assertDecreases(subject, prop, msg) {
  msg && flag2(this, "message", msg);
  var fn3 = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
  new Assertion(fn3, flagMsg, ssfi, true).is.a("function");
  var initial;
  prop ? (new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop), initial = subject[prop]) : (new Assertion(subject, flagMsg, ssfi, true).is.a("function"), initial = subject()), new Assertion(initial, flagMsg, ssfi, true).is.a("number"), fn3();
  var final = prop == null ? subject() : subject[prop], msgObj = prop == null ? initial : "." + prop;
  flag2(this, "deltaMsgObj", msgObj), flag2(this, "initialDeltaValue", initial), flag2(this, "finalDeltaValue", final), flag2(this, "deltaBehavior", "decrease"), flag2(this, "realDelta", initial - final), this.assert(final - initial < 0, "expected " + msgObj + " to decrease", "expected " + msgObj + " to not decrease");
}
__name(assertDecreases, "assertDecreases");
Assertion.addMethod("decrease", assertDecreases);
Assertion.addMethod("decreases", assertDecreases);
function assertDelta(delta, msg) {
  msg && flag2(this, "message", msg);
  var msgObj = flag2(this, "deltaMsgObj"), initial = flag2(this, "initialDeltaValue"), final = flag2(this, "finalDeltaValue"), behavior2 = flag2(this, "deltaBehavior"), realDelta = flag2(this, "realDelta"), expression;
  behavior2 === "change" ? expression = Math.abs(final - initial) === Math.abs(delta) : expression = realDelta === Math.abs(delta), this.assert(expression, "expected " + msgObj + " to " + behavior2 + " by " + delta, "expected " + msgObj + " to not " + behavior2 + " by " + delta);
}
__name(assertDelta, "assertDelta");
Assertion.addMethod("by", assertDelta);
Assertion.addProperty("extensible", function() {
  var obj = flag2(this, "object"), isExtensible = obj === Object(obj) && Object.isExtensible(obj);
  this.assert(isExtensible, "expected #{this} to be extensible", "expected #{this} to not be extensible");
});
Assertion.addProperty("sealed", function() {
  var obj = flag2(this, "object"), isSealed = obj === Object(obj) ? Object.isSealed(obj) : true;
  this.assert(isSealed, "expected #{this} to be sealed", "expected #{this} to not be sealed");
});
Assertion.addProperty("frozen", function() {
  var obj = flag2(this, "object"), isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : true;
  this.assert(isFrozen, "expected #{this} to be frozen", "expected #{this} to not be frozen");
});
Assertion.addProperty("finite", function(msg) {
  var obj = flag2(this, "object");
  this.assert(typeof obj == "number" && isFinite(obj), "expected #{this} to be a finite number", "expected #{this} to not be a finite number");
});
function expect(val, message) {
  return new Assertion(val, message);
}
__name(expect, "expect");
expect.fail = function(actual, expected, message, operator) {
  throw arguments.length < 2 && (message = actual, actual = void 0), message = message || "expect.fail()", new AssertionError(message, { actual, expected, operator }, expect.fail);
};
var should_exports = {};
__export2(should_exports, { Should: () => Should, should: () => should });
function loadShould() {
  function shouldGetter() {
    return this instanceof String || this instanceof Number || this instanceof Boolean || typeof Symbol == "function" && this instanceof Symbol || typeof BigInt == "function" && this instanceof BigInt ? new Assertion(this.valueOf(), null, shouldGetter) : new Assertion(this, null, shouldGetter);
  }
  __name(shouldGetter, "shouldGetter");
  function shouldSetter(value) {
    Object.defineProperty(this, "should", { value, enumerable: true, configurable: true, writable: true });
  }
  __name(shouldSetter, "shouldSetter"), Object.defineProperty(Object.prototype, "should", { set: shouldSetter, get: shouldGetter, configurable: true });
  var should2 = {};
  return should2.fail = function(actual, expected, message, operator) {
    throw arguments.length < 2 && (message = actual, actual = void 0), message = message || "should.fail()", new AssertionError(message, { actual, expected, operator }, should2.fail);
  }, should2.equal = function(actual, expected, message) {
    new Assertion(actual, message).to.equal(expected);
  }, should2.Throw = function(fn3, errt, errs, msg) {
    new Assertion(fn3, msg).to.Throw(errt, errs);
  }, should2.exist = function(val, msg) {
    new Assertion(val, msg).to.exist;
  }, should2.not = {}, should2.not.equal = function(actual, expected, msg) {
    new Assertion(actual, msg).to.not.equal(expected);
  }, should2.not.Throw = function(fn3, errt, errs, msg) {
    new Assertion(fn3, msg).to.not.Throw(errt, errs);
  }, should2.not.exist = function(val, msg) {
    new Assertion(val, msg).to.not.exist;
  }, should2.throw = should2.Throw, should2.not.throw = should2.not.Throw, should2;
}
__name(loadShould, "loadShould");
var should = loadShould, Should = loadShould;
function assert(express, errmsg) {
  var test22 = new Assertion(null, null, assert, true);
  test22.assert(express, errmsg, "[ negation message unavailable ]");
}
__name(assert, "assert");
assert.fail = function(actual, expected, message, operator) {
  throw arguments.length < 2 && (message = actual, actual = void 0), message = message || "assert.fail()", new AssertionError(message, { actual, expected, operator }, assert.fail);
};
assert.isOk = function(val, msg) {
  new Assertion(val, msg, assert.isOk, true).is.ok;
};
assert.isNotOk = function(val, msg) {
  new Assertion(val, msg, assert.isNotOk, true).is.not.ok;
};
assert.equal = function(act, exp, msg) {
  var test22 = new Assertion(act, msg, assert.equal, true);
  test22.assert(exp == flag(test22, "object"), "expected #{this} to equal #{exp}", "expected #{this} to not equal #{act}", exp, act, true);
};
assert.notEqual = function(act, exp, msg) {
  var test22 = new Assertion(act, msg, assert.notEqual, true);
  test22.assert(exp != flag(test22, "object"), "expected #{this} to not equal #{exp}", "expected #{this} to equal #{act}", exp, act, true);
};
assert.strictEqual = function(act, exp, msg) {
  new Assertion(act, msg, assert.strictEqual, true).to.equal(exp);
};
assert.notStrictEqual = function(act, exp, msg) {
  new Assertion(act, msg, assert.notStrictEqual, true).to.not.equal(exp);
};
assert.deepEqual = assert.deepStrictEqual = function(act, exp, msg) {
  new Assertion(act, msg, assert.deepEqual, true).to.eql(exp);
};
assert.notDeepEqual = function(act, exp, msg) {
  new Assertion(act, msg, assert.notDeepEqual, true).to.not.eql(exp);
};
assert.isAbove = function(val, abv, msg) {
  new Assertion(val, msg, assert.isAbove, true).to.be.above(abv);
};
assert.isAtLeast = function(val, atlst, msg) {
  new Assertion(val, msg, assert.isAtLeast, true).to.be.least(atlst);
};
assert.isBelow = function(val, blw, msg) {
  new Assertion(val, msg, assert.isBelow, true).to.be.below(blw);
};
assert.isAtMost = function(val, atmst, msg) {
  new Assertion(val, msg, assert.isAtMost, true).to.be.most(atmst);
};
assert.isTrue = function(val, msg) {
  new Assertion(val, msg, assert.isTrue, true).is.true;
};
assert.isNotTrue = function(val, msg) {
  new Assertion(val, msg, assert.isNotTrue, true).to.not.equal(true);
};
assert.isFalse = function(val, msg) {
  new Assertion(val, msg, assert.isFalse, true).is.false;
};
assert.isNotFalse = function(val, msg) {
  new Assertion(val, msg, assert.isNotFalse, true).to.not.equal(false);
};
assert.isNull = function(val, msg) {
  new Assertion(val, msg, assert.isNull, true).to.equal(null);
};
assert.isNotNull = function(val, msg) {
  new Assertion(val, msg, assert.isNotNull, true).to.not.equal(null);
};
assert.isNaN = function(val, msg) {
  new Assertion(val, msg, assert.isNaN, true).to.be.NaN;
};
assert.isNotNaN = function(value, message) {
  new Assertion(value, message, assert.isNotNaN, true).not.to.be.NaN;
};
assert.exists = function(val, msg) {
  new Assertion(val, msg, assert.exists, true).to.exist;
};
assert.notExists = function(val, msg) {
  new Assertion(val, msg, assert.notExists, true).to.not.exist;
};
assert.isUndefined = function(val, msg) {
  new Assertion(val, msg, assert.isUndefined, true).to.equal(void 0);
};
assert.isDefined = function(val, msg) {
  new Assertion(val, msg, assert.isDefined, true).to.not.equal(void 0);
};
assert.isCallable = function(value, message) {
  new Assertion(value, message, assert.isCallable, true).is.callable;
};
assert.isNotCallable = function(value, message) {
  new Assertion(value, message, assert.isNotCallable, true).is.not.callable;
};
assert.isObject = function(val, msg) {
  new Assertion(val, msg, assert.isObject, true).to.be.a("object");
};
assert.isNotObject = function(val, msg) {
  new Assertion(val, msg, assert.isNotObject, true).to.not.be.a("object");
};
assert.isArray = function(val, msg) {
  new Assertion(val, msg, assert.isArray, true).to.be.an("array");
};
assert.isNotArray = function(val, msg) {
  new Assertion(val, msg, assert.isNotArray, true).to.not.be.an("array");
};
assert.isString = function(val, msg) {
  new Assertion(val, msg, assert.isString, true).to.be.a("string");
};
assert.isNotString = function(val, msg) {
  new Assertion(val, msg, assert.isNotString, true).to.not.be.a("string");
};
assert.isNumber = function(val, msg) {
  new Assertion(val, msg, assert.isNumber, true).to.be.a("number");
};
assert.isNotNumber = function(val, msg) {
  new Assertion(val, msg, assert.isNotNumber, true).to.not.be.a("number");
};
assert.isFinite = function(val, msg) {
  new Assertion(val, msg, assert.isFinite, true).to.be.finite;
};
assert.isBoolean = function(val, msg) {
  new Assertion(val, msg, assert.isBoolean, true).to.be.a("boolean");
};
assert.isNotBoolean = function(val, msg) {
  new Assertion(val, msg, assert.isNotBoolean, true).to.not.be.a("boolean");
};
assert.typeOf = function(val, type32, msg) {
  new Assertion(val, msg, assert.typeOf, true).to.be.a(type32);
};
assert.notTypeOf = function(value, type32, message) {
  new Assertion(value, message, assert.notTypeOf, true).to.not.be.a(type32);
};
assert.instanceOf = function(val, type32, msg) {
  new Assertion(val, msg, assert.instanceOf, true).to.be.instanceOf(type32);
};
assert.notInstanceOf = function(val, type32, msg) {
  new Assertion(val, msg, assert.notInstanceOf, true).to.not.be.instanceOf(type32);
};
assert.include = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.include, true).include(inc);
};
assert.notInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.notInclude, true).not.include(inc);
};
assert.deepInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.deepInclude, true).deep.include(inc);
};
assert.notDeepInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.notDeepInclude, true).not.deep.include(inc);
};
assert.nestedInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.nestedInclude, true).nested.include(inc);
};
assert.notNestedInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.notNestedInclude, true).not.nested.include(inc);
};
assert.deepNestedInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.deepNestedInclude, true).deep.nested.include(inc);
};
assert.notDeepNestedInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.notDeepNestedInclude, true).not.deep.nested.include(inc);
};
assert.ownInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.ownInclude, true).own.include(inc);
};
assert.notOwnInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.notOwnInclude, true).not.own.include(inc);
};
assert.deepOwnInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.deepOwnInclude, true).deep.own.include(inc);
};
assert.notDeepOwnInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.notDeepOwnInclude, true).not.deep.own.include(inc);
};
assert.match = function(exp, re, msg) {
  new Assertion(exp, msg, assert.match, true).to.match(re);
};
assert.notMatch = function(exp, re, msg) {
  new Assertion(exp, msg, assert.notMatch, true).to.not.match(re);
};
assert.property = function(obj, prop, msg) {
  new Assertion(obj, msg, assert.property, true).to.have.property(prop);
};
assert.notProperty = function(obj, prop, msg) {
  new Assertion(obj, msg, assert.notProperty, true).to.not.have.property(prop);
};
assert.propertyVal = function(obj, prop, val, msg) {
  new Assertion(obj, msg, assert.propertyVal, true).to.have.property(prop, val);
};
assert.notPropertyVal = function(obj, prop, val, msg) {
  new Assertion(obj, msg, assert.notPropertyVal, true).to.not.have.property(prop, val);
};
assert.deepPropertyVal = function(obj, prop, val, msg) {
  new Assertion(obj, msg, assert.deepPropertyVal, true).to.have.deep.property(prop, val);
};
assert.notDeepPropertyVal = function(obj, prop, val, msg) {
  new Assertion(obj, msg, assert.notDeepPropertyVal, true).to.not.have.deep.property(prop, val);
};
assert.ownProperty = function(obj, prop, msg) {
  new Assertion(obj, msg, assert.ownProperty, true).to.have.own.property(prop);
};
assert.notOwnProperty = function(obj, prop, msg) {
  new Assertion(obj, msg, assert.notOwnProperty, true).to.not.have.own.property(prop);
};
assert.ownPropertyVal = function(obj, prop, value, msg) {
  new Assertion(obj, msg, assert.ownPropertyVal, true).to.have.own.property(prop, value);
};
assert.notOwnPropertyVal = function(obj, prop, value, msg) {
  new Assertion(obj, msg, assert.notOwnPropertyVal, true).to.not.have.own.property(prop, value);
};
assert.deepOwnPropertyVal = function(obj, prop, value, msg) {
  new Assertion(obj, msg, assert.deepOwnPropertyVal, true).to.have.deep.own.property(prop, value);
};
assert.notDeepOwnPropertyVal = function(obj, prop, value, msg) {
  new Assertion(obj, msg, assert.notDeepOwnPropertyVal, true).to.not.have.deep.own.property(prop, value);
};
assert.nestedProperty = function(obj, prop, msg) {
  new Assertion(obj, msg, assert.nestedProperty, true).to.have.nested.property(prop);
};
assert.notNestedProperty = function(obj, prop, msg) {
  new Assertion(obj, msg, assert.notNestedProperty, true).to.not.have.nested.property(prop);
};
assert.nestedPropertyVal = function(obj, prop, val, msg) {
  new Assertion(obj, msg, assert.nestedPropertyVal, true).to.have.nested.property(prop, val);
};
assert.notNestedPropertyVal = function(obj, prop, val, msg) {
  new Assertion(obj, msg, assert.notNestedPropertyVal, true).to.not.have.nested.property(prop, val);
};
assert.deepNestedPropertyVal = function(obj, prop, val, msg) {
  new Assertion(obj, msg, assert.deepNestedPropertyVal, true).to.have.deep.nested.property(prop, val);
};
assert.notDeepNestedPropertyVal = function(obj, prop, val, msg) {
  new Assertion(obj, msg, assert.notDeepNestedPropertyVal, true).to.not.have.deep.nested.property(prop, val);
};
assert.lengthOf = function(exp, len, msg) {
  new Assertion(exp, msg, assert.lengthOf, true).to.have.lengthOf(len);
};
assert.hasAnyKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.hasAnyKeys, true).to.have.any.keys(keys2);
};
assert.hasAllKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.hasAllKeys, true).to.have.all.keys(keys2);
};
assert.containsAllKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.containsAllKeys, true).to.contain.all.keys(keys2);
};
assert.doesNotHaveAnyKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.doesNotHaveAnyKeys, true).to.not.have.any.keys(keys2);
};
assert.doesNotHaveAllKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.doesNotHaveAllKeys, true).to.not.have.all.keys(keys2);
};
assert.hasAnyDeepKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.hasAnyDeepKeys, true).to.have.any.deep.keys(keys2);
};
assert.hasAllDeepKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.hasAllDeepKeys, true).to.have.all.deep.keys(keys2);
};
assert.containsAllDeepKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.containsAllDeepKeys, true).to.contain.all.deep.keys(keys2);
};
assert.doesNotHaveAnyDeepKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.doesNotHaveAnyDeepKeys, true).to.not.have.any.deep.keys(keys2);
};
assert.doesNotHaveAllDeepKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.doesNotHaveAllDeepKeys, true).to.not.have.all.deep.keys(keys2);
};
assert.throws = function(fn3, errorLike, errMsgMatcher, msg) {
  (typeof errorLike == "string" || errorLike instanceof RegExp) && (errMsgMatcher = errorLike, errorLike = null);
  var assertErr = new Assertion(fn3, msg, assert.throws, true).to.throw(errorLike, errMsgMatcher);
  return flag(assertErr, "object");
};
assert.doesNotThrow = function(fn3, errorLike, errMsgMatcher, message) {
  (typeof errorLike == "string" || errorLike instanceof RegExp) && (errMsgMatcher = errorLike, errorLike = null), new Assertion(fn3, message, assert.doesNotThrow, true).to.not.throw(errorLike, errMsgMatcher);
};
assert.operator = function(val, operator, val2, msg) {
  var ok;
  switch (operator) {
    case "==":
      ok = val == val2;
      break;
    case "===":
      ok = val === val2;
      break;
    case ">":
      ok = val > val2;
      break;
    case ">=":
      ok = val >= val2;
      break;
    case "<":
      ok = val < val2;
      break;
    case "<=":
      ok = val <= val2;
      break;
    case "!=":
      ok = val != val2;
      break;
    case "!==":
      ok = val !== val2;
      break;
    default:
      throw msg = msg && msg + ": ", new AssertionError(msg + 'Invalid operator "' + operator + '"', void 0, assert.operator);
  }
  var test22 = new Assertion(ok, msg, assert.operator, true);
  test22.assert(flag(test22, "object") === true, "expected " + inspect2(val) + " to be " + operator + " " + inspect2(val2), "expected " + inspect2(val) + " to not be " + operator + " " + inspect2(val2));
};
assert.closeTo = function(act, exp, delta, msg) {
  new Assertion(act, msg, assert.closeTo, true).to.be.closeTo(exp, delta);
};
assert.approximately = function(act, exp, delta, msg) {
  new Assertion(act, msg, assert.approximately, true).to.be.approximately(exp, delta);
};
assert.sameMembers = function(set1, set2, msg) {
  new Assertion(set1, msg, assert.sameMembers, true).to.have.same.members(set2);
};
assert.notSameMembers = function(set1, set2, msg) {
  new Assertion(set1, msg, assert.notSameMembers, true).to.not.have.same.members(set2);
};
assert.sameDeepMembers = function(set1, set2, msg) {
  new Assertion(set1, msg, assert.sameDeepMembers, true).to.have.same.deep.members(set2);
};
assert.notSameDeepMembers = function(set1, set2, msg) {
  new Assertion(set1, msg, assert.notSameDeepMembers, true).to.not.have.same.deep.members(set2);
};
assert.sameOrderedMembers = function(set1, set2, msg) {
  new Assertion(set1, msg, assert.sameOrderedMembers, true).to.have.same.ordered.members(set2);
};
assert.notSameOrderedMembers = function(set1, set2, msg) {
  new Assertion(set1, msg, assert.notSameOrderedMembers, true).to.not.have.same.ordered.members(set2);
};
assert.sameDeepOrderedMembers = function(set1, set2, msg) {
  new Assertion(set1, msg, assert.sameDeepOrderedMembers, true).to.have.same.deep.ordered.members(set2);
};
assert.notSameDeepOrderedMembers = function(set1, set2, msg) {
  new Assertion(set1, msg, assert.notSameDeepOrderedMembers, true).to.not.have.same.deep.ordered.members(set2);
};
assert.includeMembers = function(superset, subset, msg) {
  new Assertion(superset, msg, assert.includeMembers, true).to.include.members(subset);
};
assert.notIncludeMembers = function(superset, subset, msg) {
  new Assertion(superset, msg, assert.notIncludeMembers, true).to.not.include.members(subset);
};
assert.includeDeepMembers = function(superset, subset, msg) {
  new Assertion(superset, msg, assert.includeDeepMembers, true).to.include.deep.members(subset);
};
assert.notIncludeDeepMembers = function(superset, subset, msg) {
  new Assertion(superset, msg, assert.notIncludeDeepMembers, true).to.not.include.deep.members(subset);
};
assert.includeOrderedMembers = function(superset, subset, msg) {
  new Assertion(superset, msg, assert.includeOrderedMembers, true).to.include.ordered.members(subset);
};
assert.notIncludeOrderedMembers = function(superset, subset, msg) {
  new Assertion(superset, msg, assert.notIncludeOrderedMembers, true).to.not.include.ordered.members(subset);
};
assert.includeDeepOrderedMembers = function(superset, subset, msg) {
  new Assertion(superset, msg, assert.includeDeepOrderedMembers, true).to.include.deep.ordered.members(subset);
};
assert.notIncludeDeepOrderedMembers = function(superset, subset, msg) {
  new Assertion(superset, msg, assert.notIncludeDeepOrderedMembers, true).to.not.include.deep.ordered.members(subset);
};
assert.oneOf = function(inList, list, msg) {
  new Assertion(inList, msg, assert.oneOf, true).to.be.oneOf(list);
};
assert.isIterable = function(obj, msg) {
  if (obj == null || !obj[Symbol.iterator]) throw msg = msg ? `${msg} expected ${inspect2(obj)} to be an iterable` : `expected ${inspect2(obj)} to be an iterable`, new AssertionError(msg, void 0, assert.isIterable);
};
assert.changes = function(fn3, obj, prop, msg) {
  arguments.length === 3 && typeof obj == "function" && (msg = prop, prop = null), new Assertion(fn3, msg, assert.changes, true).to.change(obj, prop);
};
assert.changesBy = function(fn3, obj, prop, delta, msg) {
  if (arguments.length === 4 && typeof obj == "function") {
    var tmpMsg = delta;
    delta = prop, msg = tmpMsg;
  } else arguments.length === 3 && (delta = prop, prop = null);
  new Assertion(fn3, msg, assert.changesBy, true).to.change(obj, prop).by(delta);
};
assert.doesNotChange = function(fn3, obj, prop, msg) {
  return arguments.length === 3 && typeof obj == "function" && (msg = prop, prop = null), new Assertion(fn3, msg, assert.doesNotChange, true).to.not.change(obj, prop);
};
assert.changesButNotBy = function(fn3, obj, prop, delta, msg) {
  if (arguments.length === 4 && typeof obj == "function") {
    var tmpMsg = delta;
    delta = prop, msg = tmpMsg;
  } else arguments.length === 3 && (delta = prop, prop = null);
  new Assertion(fn3, msg, assert.changesButNotBy, true).to.change(obj, prop).but.not.by(delta);
};
assert.increases = function(fn3, obj, prop, msg) {
  return arguments.length === 3 && typeof obj == "function" && (msg = prop, prop = null), new Assertion(fn3, msg, assert.increases, true).to.increase(obj, prop);
};
assert.increasesBy = function(fn3, obj, prop, delta, msg) {
  if (arguments.length === 4 && typeof obj == "function") {
    var tmpMsg = delta;
    delta = prop, msg = tmpMsg;
  } else arguments.length === 3 && (delta = prop, prop = null);
  new Assertion(fn3, msg, assert.increasesBy, true).to.increase(obj, prop).by(delta);
};
assert.doesNotIncrease = function(fn3, obj, prop, msg) {
  return arguments.length === 3 && typeof obj == "function" && (msg = prop, prop = null), new Assertion(fn3, msg, assert.doesNotIncrease, true).to.not.increase(obj, prop);
};
assert.increasesButNotBy = function(fn3, obj, prop, delta, msg) {
  if (arguments.length === 4 && typeof obj == "function") {
    var tmpMsg = delta;
    delta = prop, msg = tmpMsg;
  } else arguments.length === 3 && (delta = prop, prop = null);
  new Assertion(fn3, msg, assert.increasesButNotBy, true).to.increase(obj, prop).but.not.by(delta);
};
assert.decreases = function(fn3, obj, prop, msg) {
  return arguments.length === 3 && typeof obj == "function" && (msg = prop, prop = null), new Assertion(fn3, msg, assert.decreases, true).to.decrease(obj, prop);
};
assert.decreasesBy = function(fn3, obj, prop, delta, msg) {
  if (arguments.length === 4 && typeof obj == "function") {
    var tmpMsg = delta;
    delta = prop, msg = tmpMsg;
  } else arguments.length === 3 && (delta = prop, prop = null);
  new Assertion(fn3, msg, assert.decreasesBy, true).to.decrease(obj, prop).by(delta);
};
assert.doesNotDecrease = function(fn3, obj, prop, msg) {
  return arguments.length === 3 && typeof obj == "function" && (msg = prop, prop = null), new Assertion(fn3, msg, assert.doesNotDecrease, true).to.not.decrease(obj, prop);
};
assert.doesNotDecreaseBy = function(fn3, obj, prop, delta, msg) {
  if (arguments.length === 4 && typeof obj == "function") {
    var tmpMsg = delta;
    delta = prop, msg = tmpMsg;
  } else arguments.length === 3 && (delta = prop, prop = null);
  return new Assertion(fn3, msg, assert.doesNotDecreaseBy, true).to.not.decrease(obj, prop).by(delta);
};
assert.decreasesButNotBy = function(fn3, obj, prop, delta, msg) {
  if (arguments.length === 4 && typeof obj == "function") {
    var tmpMsg = delta;
    delta = prop, msg = tmpMsg;
  } else arguments.length === 3 && (delta = prop, prop = null);
  new Assertion(fn3, msg, assert.decreasesButNotBy, true).to.decrease(obj, prop).but.not.by(delta);
};
assert.ifError = function(val) {
  if (val) throw val;
};
assert.isExtensible = function(obj, msg) {
  new Assertion(obj, msg, assert.isExtensible, true).to.be.extensible;
};
assert.isNotExtensible = function(obj, msg) {
  new Assertion(obj, msg, assert.isNotExtensible, true).to.not.be.extensible;
};
assert.isSealed = function(obj, msg) {
  new Assertion(obj, msg, assert.isSealed, true).to.be.sealed;
};
assert.isNotSealed = function(obj, msg) {
  new Assertion(obj, msg, assert.isNotSealed, true).to.not.be.sealed;
};
assert.isFrozen = function(obj, msg) {
  new Assertion(obj, msg, assert.isFrozen, true).to.be.frozen;
};
assert.isNotFrozen = function(obj, msg) {
  new Assertion(obj, msg, assert.isNotFrozen, true).to.not.be.frozen;
};
assert.isEmpty = function(val, msg) {
  new Assertion(val, msg, assert.isEmpty, true).to.be.empty;
};
assert.isNotEmpty = function(val, msg) {
  new Assertion(val, msg, assert.isNotEmpty, true).to.not.be.empty;
};
__name(function alias(name, as) {
  return assert[as] = assert[name], alias;
}, "alias")("isOk", "ok")("isNotOk", "notOk")("throws", "throw")("throws", "Throw")("isExtensible", "extensible")("isNotExtensible", "notExtensible")("isSealed", "sealed")("isNotSealed", "notSealed")("isFrozen", "frozen")("isNotFrozen", "notFrozen")("isEmpty", "empty")("isNotEmpty", "notEmpty")("isCallable", "isFunction")("isNotCallable", "isNotFunction");
var used = [];
function use(fn3) {
  let exports = { AssertionError, util: utils_exports, config, expect, assert, Assertion, ...should_exports };
  return ~used.indexOf(fn3) || (fn3(exports, utils_exports), used.push(fn3)), exports;
}
__name(use, "use");
var matchers_exports = {};
__export(matchers_exports, { toBeChecked: () => toBeChecked, toBeDisabled: () => toBeDisabled, toBeEmpty: () => toBeEmpty, toBeEmptyDOMElement: () => toBeEmptyDOMElement, toBeEnabled: () => toBeEnabled, toBeInTheDOM: () => toBeInTheDOM, toBeInTheDocument: () => toBeInTheDocument, toBeInvalid: () => toBeInvalid, toBePartiallyChecked: () => toBePartiallyChecked, toBeRequired: () => toBeRequired, toBeValid: () => toBeValid, toBeVisible: () => toBeVisible, toContainElement: () => toContainElement, toContainHTML: () => toContainHTML, toHaveAccessibleDescription: () => toHaveAccessibleDescription, toHaveAccessibleErrorMessage: () => toHaveAccessibleErrorMessage, toHaveAccessibleName: () => toHaveAccessibleName, toHaveAttribute: () => toHaveAttribute, toHaveClass: () => toHaveClass, toHaveDescription: () => toHaveDescription, toHaveDisplayValue: () => toHaveDisplayValue, toHaveErrorMessage: () => toHaveErrorMessage, toHaveFocus: () => toHaveFocus, toHaveFormValues: () => toHaveFormValues, toHaveRole: () => toHaveRole, toHaveStyle: () => toHaveStyle, toHaveTextContent: () => toHaveTextContent, toHaveValue: () => toHaveValue });
var import_redent = __toESM(require_redent(), 1);
function $parcel$defineInteropFlag(a2) {
  Object.defineProperty(a2, "__esModule", { value: true, configurable: true });
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
}
var $009ddb00d3ec72b8$exports = {};
$parcel$defineInteropFlag($009ddb00d3ec72b8$exports);
$parcel$export($009ddb00d3ec72b8$exports, "default", () => $009ddb00d3ec72b8$export$2e2bcd8739ae039);
var $009ddb00d3ec72b8$export$2e2bcd8739ae039 = class extends Error {
  constructor(filename, msg, lineno, column, css) {
    super(filename + ":" + lineno + ":" + column + ": " + msg), this.reason = msg, this.filename = filename, this.line = lineno, this.column = column, this.source = css;
  }
}, $0865a9fb4cc365fe$exports = {};
$parcel$defineInteropFlag($0865a9fb4cc365fe$exports);
$parcel$export($0865a9fb4cc365fe$exports, "default", () => $0865a9fb4cc365fe$export$2e2bcd8739ae039);
var $0865a9fb4cc365fe$export$2e2bcd8739ae039 = class {
  constructor(start, end, source) {
    this.start = start, this.end = end, this.source = source;
  }
}, $b2e137848b48cf4f$exports = {};
$parcel$export($b2e137848b48cf4f$exports, "CssTypes", () => $b2e137848b48cf4f$export$9be5dd6e61d5d73a);
var $b2e137848b48cf4f$export$9be5dd6e61d5d73a;
(function(CssTypes) {
  CssTypes.stylesheet = "stylesheet", CssTypes.rule = "rule", CssTypes.declaration = "declaration", CssTypes.comment = "comment", CssTypes.container = "container", CssTypes.charset = "charset", CssTypes.document = "document", CssTypes.customMedia = "custom-media", CssTypes.fontFace = "font-face", CssTypes.host = "host", CssTypes.import = "import", CssTypes.keyframes = "keyframes", CssTypes.keyframe = "keyframe", CssTypes.layer = "layer", CssTypes.media = "media", CssTypes.namespace = "namespace", CssTypes.page = "page", CssTypes.startingStyle = "starting-style", CssTypes.supports = "supports";
})($b2e137848b48cf4f$export$9be5dd6e61d5d73a || ($b2e137848b48cf4f$export$9be5dd6e61d5d73a = {}));
var $d708735ed1303b43$var$commentre = /\/\*[^]*?(?:\*\/|$)/g, $d708735ed1303b43$export$98e6a39c04603d36 = (css, options) => {
  options = options || {};
  let lineno = 1, column = 1;
  function updatePosition(str) {
    let lines = str.match(/\n/g);
    lines && (lineno += lines.length);
    let i = str.lastIndexOf(`
`);
    column = ~i ? str.length - i : column + str.length;
  }
  function position() {
    let start = { line: lineno, column };
    return function(node) {
      return node.position = new $0865a9fb4cc365fe$export$2e2bcd8739ae039(start, { line: lineno, column }, (options == null ? void 0 : options.source) || ""), whitespace(), node;
    };
  }
  let errorsList = [];
  function error(msg) {
    let err = new $009ddb00d3ec72b8$export$2e2bcd8739ae039((options == null ? void 0 : options.source) || "", msg, lineno, column, css);
    if (options == null ? void 0 : options.silent) errorsList.push(err);
    else throw err;
  }
  function stylesheet() {
    let rulesList = rules();
    return { type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.stylesheet, stylesheet: { source: options == null ? void 0 : options.source, rules: rulesList, parsingErrors: errorsList } };
  }
  function open() {
    return match(/^{\s*/);
  }
  function close() {
    return match(/^}/);
  }
  function rules() {
    let node, rules2 = [];
    for (whitespace(), comments(rules2); css.length && css.charAt(0) !== "}" && (node = atrule() || rule()); ) node && (rules2.push(node), comments(rules2));
    return rules2;
  }
  function match(re) {
    let m2 = re.exec(css);
    if (!m2) return;
    let str = m2[0];
    return updatePosition(str), css = css.slice(str.length), m2;
  }
  function whitespace() {
    match(/^\s*/);
  }
  function comments(rules2) {
    let c;
    for (rules2 = rules2 || []; c = comment(); ) c && rules2.push(c);
    return rules2;
  }
  function comment() {
    let pos = position();
    if (css.charAt(0) !== "/" || css.charAt(1) !== "*") return;
    let m2 = match(/^\/\*[^]*?\*\//);
    return m2 ? pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.comment, comment: m2[0].slice(2, -2) }) : error("End of comment missing");
  }
  function findClosingParenthese(str, start, depth) {
    let ptr = start + 1, found = false, closeParentheses = str.indexOf(")", ptr);
    for (; !found && closeParentheses !== -1; ) {
      let nextParentheses = str.indexOf("(", ptr);
      nextParentheses !== -1 && nextParentheses < closeParentheses ? (ptr = findClosingParenthese(str, nextParentheses + 1) + 1, closeParentheses = str.indexOf(")", ptr)) : found = true;
    }
    return found && closeParentheses !== -1 ? closeParentheses : -1;
  }
  function selector() {
    let m2 = match(/^([^{]+)/);
    if (!m2) return;
    let res = $d708735ed1303b43$var$trim(m2[0]).replace($d708735ed1303b43$var$commentre, "");
    if (res.indexOf(",") === -1) return [res];
    let ptr = 0, startParentheses = res.indexOf("(", ptr);
    for (; startParentheses !== -1; ) {
      let closeParentheses = findClosingParenthese(res, startParentheses);
      if (closeParentheses === -1) break;
      ptr = closeParentheses + 1, res = res.substring(0, startParentheses) + res.substring(startParentheses, closeParentheses).replace(/,/g, "‌") + res.substring(closeParentheses), startParentheses = res.indexOf("(", ptr);
    }
    return res = res.replace(/("|')(?:\\\1|.)*?\1/g, (m3) => m3.replace(/,/g, "‌")), res.split(",").map((s) => $d708735ed1303b43$var$trim(s.replace(/\u200C/g, ",")));
  }
  function declaration() {
    let pos = position(), propMatch = match(/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
    if (!propMatch) return;
    let propValue = $d708735ed1303b43$var$trim(propMatch[0]);
    if (!match(/^:\s*/)) return error("property missing ':'");
    let val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/), ret = pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.declaration, property: propValue.replace($d708735ed1303b43$var$commentre, ""), value: val ? $d708735ed1303b43$var$trim(val[0]).replace($d708735ed1303b43$var$commentre, "") : "" });
    return match(/^[;\s]*/), ret;
  }
  function declarations() {
    let decls = [];
    if (!open()) return error("missing '{'");
    comments(decls);
    let decl;
    for (; decl = declaration(); ) decl && (decls.push(decl), comments(decls));
    return close() ? decls : error("missing '}'");
  }
  function keyframe() {
    let m2, vals = [], pos = position();
    for (; m2 = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/); ) vals.push(m2[1]), match(/^,\s*/);
    if (vals.length) return pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.keyframe, values: vals, declarations: declarations() || [] });
  }
  function atkeyframes() {
    let pos = position(), m1 = match(/^@([-\w]+)?keyframes\s*/);
    if (!m1) return;
    let vendor = m1[1], m2 = match(/^([-\w]+)\s*/);
    if (!m2) return error("@keyframes missing name");
    let name = m2[1];
    if (!open()) return error("@keyframes missing '{'");
    let frame, frames = comments();
    for (; frame = keyframe(); ) frames.push(frame), frames = frames.concat(comments());
    return close() ? pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.keyframes, name, vendor, keyframes: frames }) : error("@keyframes missing '}'");
  }
  function atsupports() {
    let pos = position(), m2 = match(/^@supports *([^{]+)/);
    if (!m2) return;
    let supports = $d708735ed1303b43$var$trim(m2[1]);
    if (!open()) return error("@supports missing '{'");
    let style = comments().concat(rules());
    return close() ? pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.supports, supports, rules: style }) : error("@supports missing '}'");
  }
  function athost() {
    let pos = position();
    if (!match(/^@host\s*/)) return;
    if (!open()) return error("@host missing '{'");
    let style = comments().concat(rules());
    return close() ? pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.host, rules: style }) : error("@host missing '}'");
  }
  function atcontainer() {
    let pos = position(), m2 = match(/^@container *([^{]+)/);
    if (!m2) return;
    let container = $d708735ed1303b43$var$trim(m2[1]);
    if (!open()) return error("@container missing '{'");
    let style = comments().concat(rules());
    return close() ? pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.container, container, rules: style }) : error("@container missing '}'");
  }
  function atlayer() {
    let pos = position(), m2 = match(/^@layer *([^{;@]+)/);
    if (!m2) return;
    let layer = $d708735ed1303b43$var$trim(m2[1]);
    if (!open()) return match(/^[;\s]*/), pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.layer, layer });
    let style = comments().concat(rules());
    return close() ? pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.layer, layer, rules: style }) : error("@layer missing '}'");
  }
  function atmedia() {
    let pos = position(), m2 = match(/^@media *([^{]+)/);
    if (!m2) return;
    let media = $d708735ed1303b43$var$trim(m2[1]);
    if (!open()) return error("@media missing '{'");
    let style = comments().concat(rules());
    return close() ? pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.media, media, rules: style }) : error("@media missing '}'");
  }
  function atcustommedia() {
    let pos = position(), m2 = match(/^@custom-media\s+(--\S+)\s*([^{;\s][^{;]*);/);
    if (m2) return pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.customMedia, name: $d708735ed1303b43$var$trim(m2[1]), media: $d708735ed1303b43$var$trim(m2[2]) });
  }
  function atpage() {
    let pos = position();
    if (!match(/^@page */)) return;
    let sel = selector() || [];
    if (!open()) return error("@page missing '{'");
    let decls = comments(), decl;
    for (; decl = declaration(); ) decls.push(decl), decls = decls.concat(comments());
    return close() ? pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.page, selectors: sel, declarations: decls }) : error("@page missing '}'");
  }
  function atdocument() {
    let pos = position(), m2 = match(/^@([-\w]+)?document *([^{]+)/);
    if (!m2) return;
    let vendor = $d708735ed1303b43$var$trim(m2[1]), doc = $d708735ed1303b43$var$trim(m2[2]);
    if (!open()) return error("@document missing '{'");
    let style = comments().concat(rules());
    return close() ? pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.document, document: doc, vendor, rules: style }) : error("@document missing '}'");
  }
  function atfontface() {
    let pos = position();
    if (!match(/^@font-face\s*/)) return;
    if (!open()) return error("@font-face missing '{'");
    let decls = comments(), decl;
    for (; decl = declaration(); ) decls.push(decl), decls = decls.concat(comments());
    return close() ? pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.fontFace, declarations: decls }) : error("@font-face missing '}'");
  }
  function atstartingstyle() {
    let pos = position();
    if (!match(/^@starting-style\s*/)) return;
    if (!open()) return error("@starting-style missing '{'");
    let style = comments().concat(rules());
    return close() ? pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.startingStyle, rules: style }) : error("@starting-style missing '}'");
  }
  let atimport = _compileAtrule("import"), atcharset = _compileAtrule("charset"), atnamespace = _compileAtrule("namespace");
  function _compileAtrule(name) {
    let re = new RegExp("^@" + name + `\\s*((?::?[^;'"]|"(?:\\\\"|[^"])*?"|'(?:\\\\'|[^'])*?')+)(?:;|$)`);
    return function() {
      let pos = position(), m2 = match(re);
      if (!m2) return;
      let ret = { type: name };
      return ret[name] = m2[1].trim(), pos(ret);
    };
  }
  function atrule() {
    if (css[0] === "@") return atkeyframes() || atmedia() || atcustommedia() || atsupports() || atimport() || atcharset() || atnamespace() || atdocument() || atpage() || athost() || atfontface() || atcontainer() || atstartingstyle() || atlayer();
  }
  function rule() {
    let pos = position(), sel = selector();
    return sel ? (comments(), pos({ type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.rule, selectors: sel, declarations: declarations() || [] })) : error("selector missing");
  }
  return $d708735ed1303b43$var$addParent(stylesheet());
};
function $d708735ed1303b43$var$trim(str) {
  return str ? str.trim() : "";
}
function $d708735ed1303b43$var$addParent(obj, parent) {
  let isNode = obj && typeof obj.type == "string", childParent = isNode ? obj : parent;
  for (let k2 in obj) {
    let value = obj[k2];
    Array.isArray(value) ? value.forEach((v) => {
      $d708735ed1303b43$var$addParent(v, childParent);
    }) : value && typeof value == "object" && $d708735ed1303b43$var$addParent(value, childParent);
  }
  return isNode && Object.defineProperty(obj, "parent", { configurable: true, writable: true, enumerable: false, value: parent || null }), obj;
}
var $d708735ed1303b43$export$2e2bcd8739ae039 = $d708735ed1303b43$export$98e6a39c04603d36;
var $149c1bd638913645$export$98e6a39c04603d36 = $d708735ed1303b43$export$2e2bcd8739ae039;
var toStr = Object.prototype.toString;
function isCallable(fn3) {
  return typeof fn3 == "function" || toStr.call(fn3) === "[object Function]";
}
function toInteger(value) {
  var number = Number(value);
  return isNaN(number) ? 0 : number === 0 || !isFinite(number) ? number : (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
}
var maxSafeInteger = Math.pow(2, 53) - 1;
function toLength(value) {
  var len = toInteger(value);
  return Math.min(Math.max(len, 0), maxSafeInteger);
}
function arrayFrom(arrayLike, mapFn) {
  var C3 = Array, items = Object(arrayLike);
  if (arrayLike == null) throw new TypeError("Array.from requires an array-like object - not null or undefined");
  for (var len = toLength(items.length), A = isCallable(C3) ? Object(new C3(len)) : new Array(len), k2 = 0, kValue; k2 < len; ) kValue = items[k2], A[k2] = kValue, k2 += 1;
  return A.length = len, A;
}
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && typeof Symbol == "function" && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false, descriptor.configurable = true, "value" in descriptor && (descriptor.writable = true), Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties(Constructor.prototype, protoProps), Object.defineProperty(Constructor, "prototype", { writable: false }), Constructor;
}
function _defineProperty(obj, key, value) {
  return key = _toPropertyKey(key), key in obj ? Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) : obj[key] = value, obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input2, hint) {
  if (_typeof(input2) !== "object" || input2 === null) return input2;
  var prim = input2[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input2, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input2);
}
var SetLike = function() {
  function SetLike3() {
    var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    _classCallCheck(this, SetLike3), _defineProperty(this, "items", void 0), this.items = items;
  }
  return _createClass(SetLike3, [{ key: "add", value: function(value) {
    return this.has(value) === false && this.items.push(value), this;
  } }, { key: "clear", value: function() {
    this.items = [];
  } }, { key: "delete", value: function(value) {
    var previousLength = this.items.length;
    return this.items = this.items.filter(function(item) {
      return item !== value;
    }), previousLength !== this.items.length;
  } }, { key: "forEach", value: function(callbackfn) {
    var _this = this;
    this.items.forEach(function(item) {
      callbackfn(item, item, _this);
    });
  } }, { key: "has", value: function(value) {
    return this.items.indexOf(value) !== -1;
  } }, { key: "size", get: function() {
    return this.items.length;
  } }]), SetLike3;
}(), SetLike_default = typeof Set > "u" ? Set : SetLike;
function getLocalName(element) {
  var _element$localName;
  return (_element$localName = element.localName) !== null && _element$localName !== void 0 ? _element$localName : element.tagName.toLowerCase();
}
var localNameToRoleMappings = { article: "article", aside: "complementary", button: "button", datalist: "listbox", dd: "definition", details: "group", dialog: "dialog", dt: "term", fieldset: "group", figure: "figure", form: "form", footer: "contentinfo", h1: "heading", h2: "heading", h3: "heading", h4: "heading", h5: "heading", h6: "heading", header: "banner", hr: "separator", html: "document", legend: "legend", li: "listitem", math: "math", main: "main", menu: "list", nav: "navigation", ol: "list", optgroup: "group", option: "option", output: "status", progress: "progressbar", section: "region", summary: "button", table: "table", tbody: "rowgroup", textarea: "textbox", tfoot: "rowgroup", td: "cell", th: "columnheader", thead: "rowgroup", tr: "row", ul: "list" }, prohibitedAttributes = { caption: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), code: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), deletion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), emphasis: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), generic: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby", "aria-roledescription"]), insertion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), none: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), paragraph: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), presentation: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), strong: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), subscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), superscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]) };
function hasGlobalAriaAttributes(element, role) {
  return ["aria-atomic", "aria-busy", "aria-controls", "aria-current", "aria-description", "aria-describedby", "aria-details", "aria-dropeffect", "aria-flowto", "aria-grabbed", "aria-hidden", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-live", "aria-owns", "aria-relevant", "aria-roledescription"].some(function(attributeName) {
    var _prohibitedAttributes;
    return element.hasAttribute(attributeName) && !((_prohibitedAttributes = prohibitedAttributes[role]) !== null && _prohibitedAttributes !== void 0 && _prohibitedAttributes.has(attributeName));
  });
}
function ignorePresentationalRole(element, implicitRole) {
  return hasGlobalAriaAttributes(element, implicitRole);
}
function getRole(element) {
  var explicitRole = getExplicitRole(element);
  if (explicitRole === null || presentationRoles.indexOf(explicitRole) !== -1) {
    var implicitRole = getImplicitRole(element);
    if (presentationRoles.indexOf(explicitRole || "") === -1 || ignorePresentationalRole(element, implicitRole || "")) return implicitRole;
  }
  return explicitRole;
}
function getImplicitRole(element) {
  var mappedByTag = localNameToRoleMappings[getLocalName(element)];
  if (mappedByTag !== void 0) return mappedByTag;
  switch (getLocalName(element)) {
    case "a":
    case "area":
    case "link":
      if (element.hasAttribute("href")) return "link";
      break;
    case "img":
      return element.getAttribute("alt") === "" && !ignorePresentationalRole(element, "img") ? "presentation" : "img";
    case "input": {
      var _ref = element, type5 = _ref.type;
      switch (type5) {
        case "button":
        case "image":
        case "reset":
        case "submit":
          return "button";
        case "checkbox":
        case "radio":
          return type5;
        case "range":
          return "slider";
        case "email":
        case "tel":
        case "text":
        case "url":
          return element.hasAttribute("list") ? "combobox" : "textbox";
        case "search":
          return element.hasAttribute("list") ? "combobox" : "searchbox";
        case "number":
          return "spinbutton";
        default:
          return null;
      }
    }
    case "select":
      return element.hasAttribute("multiple") || element.size > 1 ? "listbox" : "combobox";
  }
  return null;
}
function getExplicitRole(element) {
  var role = element.getAttribute("role");
  if (role !== null) {
    var explicitRole = role.trim().split(" ")[0];
    if (explicitRole.length > 0) return explicitRole;
  }
  return null;
}
var presentationRoles = ["presentation", "none"];
function isElement(node) {
  return node !== null && node.nodeType === node.ELEMENT_NODE;
}
function isHTMLTableCaptionElement(node) {
  return isElement(node) && getLocalName(node) === "caption";
}
function isHTMLInputElement(node) {
  return isElement(node) && getLocalName(node) === "input";
}
function isHTMLOptGroupElement(node) {
  return isElement(node) && getLocalName(node) === "optgroup";
}
function isHTMLSelectElement(node) {
  return isElement(node) && getLocalName(node) === "select";
}
function isHTMLTableElement(node) {
  return isElement(node) && getLocalName(node) === "table";
}
function isHTMLTextAreaElement(node) {
  return isElement(node) && getLocalName(node) === "textarea";
}
function safeWindow(node) {
  var _ref = node.ownerDocument === null ? node : node.ownerDocument, defaultView = _ref.defaultView;
  if (defaultView === null) throw new TypeError("no window available");
  return defaultView;
}
function isHTMLFieldSetElement(node) {
  return isElement(node) && getLocalName(node) === "fieldset";
}
function isHTMLLegendElement(node) {
  return isElement(node) && getLocalName(node) === "legend";
}
function isHTMLSlotElement(node) {
  return isElement(node) && getLocalName(node) === "slot";
}
function isSVGElement(node) {
  return isElement(node) && node.ownerSVGElement !== void 0;
}
function isSVGSVGElement(node) {
  return isElement(node) && getLocalName(node) === "svg";
}
function isSVGTitleElement(node) {
  return isSVGElement(node) && getLocalName(node) === "title";
}
function queryIdRefs(node, attributeName) {
  if (isElement(node) && node.hasAttribute(attributeName)) {
    var ids = node.getAttribute(attributeName).split(" "), root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    return ids.map(function(id) {
      return root.getElementById(id);
    }).filter(function(element) {
      return element !== null;
    });
  }
  return [];
}
function hasAnyConcreteRoles(node, roles3) {
  return isElement(node) ? roles3.indexOf(getRole(node)) !== -1 : false;
}
function asFlatString(s) {
  return s.trim().replace(/\s\s+/g, " ");
}
function isHidden(node, getComputedStyleImplementation) {
  if (!isElement(node)) return false;
  if (node.hasAttribute("hidden") || node.getAttribute("aria-hidden") === "true") return true;
  var style = getComputedStyleImplementation(node);
  return style.getPropertyValue("display") === "none" || style.getPropertyValue("visibility") === "hidden";
}
function isControl(node) {
  return hasAnyConcreteRoles(node, ["button", "combobox", "listbox", "textbox"]) || hasAbstractRole(node, "range");
}
function hasAbstractRole(node, role) {
  if (!isElement(node)) return false;
  switch (role) {
    case "range":
      return hasAnyConcreteRoles(node, ["meter", "progressbar", "scrollbar", "slider", "spinbutton"]);
    default:
      throw new TypeError("No knowledge about abstract role '".concat(role, "'. This is likely a bug :("));
  }
}
function querySelectorAllSubtree(element, selectors) {
  var elements = arrayFrom(element.querySelectorAll(selectors));
  return queryIdRefs(element, "aria-owns").forEach(function(root) {
    elements.push.apply(elements, arrayFrom(root.querySelectorAll(selectors)));
  }), elements;
}
function querySelectedOptions(listbox) {
  return isHTMLSelectElement(listbox) ? listbox.selectedOptions || querySelectorAllSubtree(listbox, "[selected]") : querySelectorAllSubtree(listbox, '[aria-selected="true"]');
}
function isMarkedPresentational(node) {
  return hasAnyConcreteRoles(node, presentationRoles);
}
function isNativeHostLanguageTextAlternativeElement(node) {
  return isHTMLTableCaptionElement(node);
}
function allowsNameFromContent(node) {
  return hasAnyConcreteRoles(node, ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "label", "legend", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowheader", "switch", "tab", "tooltip", "treeitem"]);
}
function isDescendantOfNativeHostLanguageTextAlternativeElement(node) {
  return false;
}
function getValueOfTextbox(element) {
  return isHTMLInputElement(element) || isHTMLTextAreaElement(element) ? element.value : element.textContent || "";
}
function getTextualContent(declaration) {
  var content = declaration.getPropertyValue("content");
  return /^["'].*["']$/.test(content) ? content.slice(1, -1) : "";
}
function isLabelableElement(element) {
  var localName = getLocalName(element);
  return localName === "button" || localName === "input" && element.getAttribute("type") !== "hidden" || localName === "meter" || localName === "output" || localName === "progress" || localName === "select" || localName === "textarea";
}
function findLabelableElement(element) {
  if (isLabelableElement(element)) return element;
  var labelableElement = null;
  return element.childNodes.forEach(function(childNode) {
    if (labelableElement === null && isElement(childNode)) {
      var descendantLabelableElement = findLabelableElement(childNode);
      descendantLabelableElement !== null && (labelableElement = descendantLabelableElement);
    }
  }), labelableElement;
}
function getControlOfLabel(label) {
  if (label.control !== void 0) return label.control;
  var htmlFor = label.getAttribute("for");
  return htmlFor !== null ? label.ownerDocument.getElementById(htmlFor) : findLabelableElement(label);
}
function getLabels(element) {
  var labelsProperty = element.labels;
  if (labelsProperty === null) return labelsProperty;
  if (labelsProperty !== void 0) return arrayFrom(labelsProperty);
  if (!isLabelableElement(element)) return null;
  var document2 = element.ownerDocument;
  return arrayFrom(document2.querySelectorAll("label")).filter(function(label) {
    return getControlOfLabel(label) === element;
  });
}
function getSlotContents(slot) {
  var assignedNodes = slot.assignedNodes();
  return assignedNodes.length === 0 ? arrayFrom(slot.childNodes) : assignedNodes;
}
function computeTextAlternative(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, consultedNodes = new SetLike_default(), window2 = safeWindow(root), _options$compute = options.compute, compute = _options$compute === void 0 ? "name" : _options$compute, _options$computedStyl = options.computedStyleSupportsPseudoElements, computedStyleSupportsPseudoElements = _options$computedStyl === void 0 ? options.getComputedStyle !== void 0 : _options$computedStyl, _options$getComputedS = options.getComputedStyle, getComputedStyle = _options$getComputedS === void 0 ? window2.getComputedStyle.bind(window2) : _options$getComputedS, _options$hidden = options.hidden, hidden = _options$hidden === void 0 ? false : _options$hidden;
  function computeMiscTextAlternative(node, context) {
    var accumulatedText = "";
    if (isElement(node) && computedStyleSupportsPseudoElements) {
      var pseudoBefore = getComputedStyle(node, "::before"), beforeContent = getTextualContent(pseudoBefore);
      accumulatedText = "".concat(beforeContent, " ").concat(accumulatedText);
    }
    var childNodes = isHTMLSlotElement(node) ? getSlotContents(node) : arrayFrom(node.childNodes).concat(queryIdRefs(node, "aria-owns"));
    if (childNodes.forEach(function(child) {
      var result = computeTextAlternative3(child, { isEmbeddedInLabel: context.isEmbeddedInLabel, isReferenced: false, recursion: true }), display2 = isElement(child) ? getComputedStyle(child).getPropertyValue("display") : "inline", separator = display2 !== "inline" ? " " : "";
      accumulatedText += "".concat(separator).concat(result).concat(separator);
    }), isElement(node) && computedStyleSupportsPseudoElements) {
      var pseudoAfter = getComputedStyle(node, "::after"), afterContent = getTextualContent(pseudoAfter);
      accumulatedText = "".concat(accumulatedText, " ").concat(afterContent);
    }
    return accumulatedText.trim();
  }
  function useAttribute(element, attributeName) {
    var attribute = element.getAttributeNode(attributeName);
    return attribute !== null && !consultedNodes.has(attribute) && attribute.value.trim() !== "" ? (consultedNodes.add(attribute), attribute.value) : null;
  }
  function computeTooltipAttributeValue(node) {
    return isElement(node) ? useAttribute(node, "title") : null;
  }
  function computeElementTextAlternative(node) {
    if (!isElement(node)) return null;
    if (isHTMLFieldSetElement(node)) {
      consultedNodes.add(node);
      for (var children = arrayFrom(node.childNodes), i = 0; i < children.length; i += 1) {
        var child = children[i];
        if (isHTMLLegendElement(child)) return computeTextAlternative3(child, { isEmbeddedInLabel: false, isReferenced: false, recursion: false });
      }
    } else if (isHTMLTableElement(node)) {
      consultedNodes.add(node);
      for (var _children = arrayFrom(node.childNodes), _i = 0; _i < _children.length; _i += 1) {
        var _child = _children[_i];
        if (isHTMLTableCaptionElement(_child)) return computeTextAlternative3(_child, { isEmbeddedInLabel: false, isReferenced: false, recursion: false });
      }
    } else if (isSVGSVGElement(node)) {
      consultedNodes.add(node);
      for (var _children2 = arrayFrom(node.childNodes), _i2 = 0; _i2 < _children2.length; _i2 += 1) {
        var _child2 = _children2[_i2];
        if (isSVGTitleElement(_child2)) return _child2.textContent;
      }
      return null;
    } else if (getLocalName(node) === "img" || getLocalName(node) === "area") {
      var nameFromAlt = useAttribute(node, "alt");
      if (nameFromAlt !== null) return nameFromAlt;
    } else if (isHTMLOptGroupElement(node)) {
      var nameFromLabel = useAttribute(node, "label");
      if (nameFromLabel !== null) return nameFromLabel;
    }
    if (isHTMLInputElement(node) && (node.type === "button" || node.type === "submit" || node.type === "reset")) {
      var nameFromValue = useAttribute(node, "value");
      if (nameFromValue !== null) return nameFromValue;
      if (node.type === "submit") return "Submit";
      if (node.type === "reset") return "Reset";
    }
    var labels = getLabels(node);
    if (labels !== null && labels.length !== 0) return consultedNodes.add(node), arrayFrom(labels).map(function(element) {
      return computeTextAlternative3(element, { isEmbeddedInLabel: true, isReferenced: false, recursion: true });
    }).filter(function(label) {
      return label.length > 0;
    }).join(" ");
    if (isHTMLInputElement(node) && node.type === "image") {
      var _nameFromAlt = useAttribute(node, "alt");
      if (_nameFromAlt !== null) return _nameFromAlt;
      var nameFromTitle = useAttribute(node, "title");
      return nameFromTitle !== null ? nameFromTitle : "Submit Query";
    }
    if (hasAnyConcreteRoles(node, ["button"])) {
      var nameFromSubTree = computeMiscTextAlternative(node, { isEmbeddedInLabel: false, isReferenced: false });
      if (nameFromSubTree !== "") return nameFromSubTree;
    }
    return null;
  }
  function computeTextAlternative3(current, context) {
    if (consultedNodes.has(current)) return "";
    if (!hidden && isHidden(current, getComputedStyle) && !context.isReferenced) return consultedNodes.add(current), "";
    var labelAttributeNode = isElement(current) ? current.getAttributeNode("aria-labelledby") : null, labelElements = labelAttributeNode !== null && !consultedNodes.has(labelAttributeNode) ? queryIdRefs(current, "aria-labelledby") : [];
    if (compute === "name" && !context.isReferenced && labelElements.length > 0) return consultedNodes.add(labelAttributeNode), labelElements.map(function(element) {
      return computeTextAlternative3(element, { isEmbeddedInLabel: context.isEmbeddedInLabel, isReferenced: true, recursion: false });
    }).join(" ");
    var skipToStep2E = context.recursion && isControl(current) && compute === "name";
    if (!skipToStep2E) {
      var ariaLabel = (isElement(current) && current.getAttribute("aria-label") || "").trim();
      if (ariaLabel !== "" && compute === "name") return consultedNodes.add(current), ariaLabel;
      if (!isMarkedPresentational(current)) {
        var elementTextAlternative = computeElementTextAlternative(current);
        if (elementTextAlternative !== null) return consultedNodes.add(current), elementTextAlternative;
      }
    }
    if (hasAnyConcreteRoles(current, ["menu"])) return consultedNodes.add(current), "";
    if (skipToStep2E || context.isEmbeddedInLabel || context.isReferenced) {
      if (hasAnyConcreteRoles(current, ["combobox", "listbox"])) {
        consultedNodes.add(current);
        var selectedOptions = querySelectedOptions(current);
        return selectedOptions.length === 0 ? isHTMLInputElement(current) ? current.value : "" : arrayFrom(selectedOptions).map(function(selectedOption) {
          return computeTextAlternative3(selectedOption, { isEmbeddedInLabel: context.isEmbeddedInLabel, isReferenced: false, recursion: true });
        }).join(" ");
      }
      if (hasAbstractRole(current, "range")) return consultedNodes.add(current), current.hasAttribute("aria-valuetext") ? current.getAttribute("aria-valuetext") : current.hasAttribute("aria-valuenow") ? current.getAttribute("aria-valuenow") : current.getAttribute("value") || "";
      if (hasAnyConcreteRoles(current, ["textbox"])) return consultedNodes.add(current), getValueOfTextbox(current);
    }
    if (allowsNameFromContent(current) || isElement(current) && context.isReferenced || isNativeHostLanguageTextAlternativeElement(current) || isDescendantOfNativeHostLanguageTextAlternativeElement()) {
      var accumulatedText2F = computeMiscTextAlternative(current, { isEmbeddedInLabel: context.isEmbeddedInLabel, isReferenced: false });
      if (accumulatedText2F !== "") return consultedNodes.add(current), accumulatedText2F;
    }
    if (current.nodeType === current.TEXT_NODE) return consultedNodes.add(current), current.textContent || "";
    if (context.recursion) return consultedNodes.add(current), computeMiscTextAlternative(current, { isEmbeddedInLabel: context.isEmbeddedInLabel, isReferenced: false });
    var tooltipAttributeValue = computeTooltipAttributeValue(current);
    return tooltipAttributeValue !== null ? (consultedNodes.add(current), tooltipAttributeValue) : (consultedNodes.add(current), "");
  }
  return asFlatString(computeTextAlternative3(root, { isEmbeddedInLabel: false, isReferenced: compute === "description", recursion: false }));
}
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && typeof Symbol == "function" && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof2(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty2(obj, key, value) {
  return key = _toPropertyKey2(key), key in obj ? Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) : obj[key] = value, obj;
}
function _toPropertyKey2(arg) {
  var key = _toPrimitive2(arg, "string");
  return _typeof2(key) === "symbol" ? key : String(key);
}
function _toPrimitive2(input2, hint) {
  if (_typeof2(input2) !== "object" || input2 === null) return input2;
  var prim = input2[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input2, hint || "default");
    if (_typeof2(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input2);
}
function computeAccessibleDescription(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, description = queryIdRefs(root, "aria-describedby").map(function(element) {
    return computeTextAlternative(element, _objectSpread(_objectSpread({}, options), {}, { compute: "description" }));
  }).join(" ");
  if (description === "") {
    var ariaDescription = root.getAttribute("aria-description");
    description = ariaDescription === null ? "" : ariaDescription;
  }
  if (description === "") {
    var title = root.getAttribute("title");
    description = title === null ? "" : title;
  }
  return description;
}
function prohibitsNaming(node) {
  return hasAnyConcreteRoles(node, ["caption", "code", "deletion", "emphasis", "generic", "insertion", "none", "paragraph", "presentation", "strong", "subscript", "superscript"]);
}
function computeAccessibleName(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return prohibitsNaming(root) ? "" : computeTextAlternative(root, options);
}
var import_aria_query = __toESM(require_lib(), 1), import_chalk = __toESM(require_source(), 1), import_isEqualWith = __toESM(require_isEqualWith(), 1), import_css = __toESM(require_css_escape(), 1), GenericTypeError = class extends Error {
  constructor(expectedString, received, matcherFn, context) {
    super(), Error.captureStackTrace && Error.captureStackTrace(this, matcherFn);
    let withType = "";
    try {
      withType = context.utils.printWithType("Received", received, context.utils.printReceived);
    } catch {
    }
    this.message = [context.utils.matcherHint(`${context.isNot ? ".not" : ""}.${matcherFn.name}`, "received", ""), "", `${context.utils.RECEIVED_COLOR("received")} value must ${expectedString}.`, withType].join(`
`);
  }
}, HtmlElementTypeError = class extends GenericTypeError {
  constructor(...args) {
    super("be an HTMLElement or an SVGElement", ...args);
  }
}, NodeTypeError = class extends GenericTypeError {
  constructor(...args) {
    super("be a Node", ...args);
  }
};
function checkHasWindow(htmlElement, ErrorClass, ...args) {
  if (!htmlElement || !htmlElement.ownerDocument || !htmlElement.ownerDocument.defaultView) throw new ErrorClass(htmlElement, ...args);
}
function checkNode(node, ...args) {
  checkHasWindow(node, NodeTypeError, ...args);
  let window2 = node.ownerDocument.defaultView;
  if (!(node instanceof window2.Node)) throw new NodeTypeError(node, ...args);
}
function checkHtmlElement(htmlElement, ...args) {
  checkHasWindow(htmlElement, HtmlElementTypeError, ...args);
  let window2 = htmlElement.ownerDocument.defaultView;
  if (!(htmlElement instanceof window2.HTMLElement) && !(htmlElement instanceof window2.SVGElement)) throw new HtmlElementTypeError(htmlElement, ...args);
}
var InvalidCSSError = class extends Error {
  constructor(received, matcherFn, context) {
    super(), Error.captureStackTrace && Error.captureStackTrace(this, matcherFn), this.message = [received.message, "", context.utils.RECEIVED_COLOR("Failing css:"), context.utils.RECEIVED_COLOR(`${received.css}`)].join(`
`);
  }
};
function parseCSS(css, ...args) {
  let ast = $149c1bd638913645$export$98e6a39c04603d36(`selector { ${css} }`, { silent: true }).stylesheet;
  if (ast.parsingErrors && ast.parsingErrors.length > 0) {
    let { reason, line } = ast.parsingErrors[0];
    throw new InvalidCSSError({ css, message: `Syntax error parsing expected css: ${reason} on line: ${line}` }, ...args);
  }
  return ast.rules[0].declarations.filter((d2) => d2.type === "declaration").reduce((obj, { property, value }) => Object.assign(obj, { [property]: value }), {});
}
function display(context, value) {
  return typeof value == "string" ? value : context.utils.stringify(value);
}
function getMessage3(context, matcher, expectedLabel, expectedValue, receivedLabel, receivedValue) {
  return [`${matcher}
`, `${expectedLabel}:
${context.utils.EXPECTED_COLOR((0, import_redent.default)(display(context, expectedValue), 2))}`, `${receivedLabel}:
${context.utils.RECEIVED_COLOR((0, import_redent.default)(display(context, receivedValue), 2))}`].join(`
`);
}
function matches(textToMatch, matcher) {
  return matcher instanceof RegExp ? matcher.test(textToMatch) : textToMatch.includes(String(matcher));
}
function deprecate(name, replacementText) {
  console.warn(`Warning: ${name} has been deprecated and will be removed in future updates.`, replacementText);
}
function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}
function getTag(element) {
  return element.tagName && element.tagName.toLowerCase();
}
function getSelectValue({ multiple, options }) {
  let selectedOptions = [...options].filter((option) => option.selected);
  if (multiple) return [...selectedOptions].map((opt) => opt.value);
  if (selectedOptions.length !== 0) return selectedOptions[0].value;
}
function getInputValue(inputElement) {
  switch (inputElement.type) {
    case "number":
      return inputElement.value === "" ? null : Number(inputElement.value);
    case "checkbox":
      return inputElement.checked;
    default:
      return inputElement.value;
  }
}
var rolesSupportingValues = ["meter", "progressbar", "slider", "spinbutton"];
function getAccessibleValue(element) {
  if (rolesSupportingValues.includes(element.getAttribute("role"))) return Number(element.getAttribute("aria-valuenow"));
}
function getSingleElementValue(element) {
  if (element) switch (element.tagName.toLowerCase()) {
    case "input":
      return getInputValue(element);
    case "select":
      return getSelectValue(element);
    default:
      return element.value ?? getAccessibleValue(element);
  }
}
function toSentence(array, { wordConnector = ", ", lastWordConnector = " and " } = {}) {
  return [array.slice(0, -1).join(wordConnector), array[array.length - 1]].join(array.length > 1 ? lastWordConnector : "");
}
function compareArraysAsSet(arr1, arr2) {
  if (Array.isArray(arr1) && Array.isArray(arr2)) return [...new Set(arr1)].every((v) => new Set(arr2).has(v));
}
function toBeInTheDOM(element, container) {
  return deprecate("toBeInTheDOM", "Please use toBeInTheDocument for searching the entire document and toContainElement for searching a specific container."), element && checkHtmlElement(element, toBeInTheDOM, this), container && checkHtmlElement(container, toBeInTheDOM, this), { pass: container ? container.contains(element) : !!element, message: () => [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeInTheDOM`, "element", ""), "", "Received:", `  ${this.utils.printReceived(element && element.cloneNode(false))}`].join(`
`) };
}
function toBeInTheDocument(element) {
  (element !== null || !this.isNot) && checkHtmlElement(element, toBeInTheDocument, this);
  let pass = element === null ? false : element.ownerDocument === element.getRootNode({ composed: true }), errorFound = () => `expected document not to contain element, found ${this.utils.stringify(element.cloneNode(true))} instead`, errorNotFound = () => "element could not be found in the document";
  return { pass, message: () => [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeInTheDocument`, "element", ""), "", this.utils.RECEIVED_COLOR(this.isNot ? errorFound() : errorNotFound())].join(`
`) };
}
function toBeEmpty(element) {
  return deprecate("toBeEmpty", "Please use instead toBeEmptyDOMElement for finding empty nodes in the DOM."), checkHtmlElement(element, toBeEmpty, this), { pass: element.innerHTML === "", message: () => [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeEmpty`, "element", ""), "", "Received:", `  ${this.utils.printReceived(element.innerHTML)}`].join(`
`) };
}
function toBeEmptyDOMElement(element) {
  return checkHtmlElement(element, toBeEmptyDOMElement, this), { pass: isEmptyElement(element), message: () => [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeEmptyDOMElement`, "element", ""), "", "Received:", `  ${this.utils.printReceived(element.innerHTML)}`].join(`
`) };
}
function isEmptyElement(element) {
  return [...element.childNodes].filter((node) => node.nodeType !== 8).length === 0;
}
function toContainElement(container, element) {
  return checkHtmlElement(container, toContainElement, this), element !== null && checkHtmlElement(element, toContainElement, this), { pass: container.contains(element), message: () => [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toContainElement`, "element", "element"), "", this.utils.RECEIVED_COLOR(`${this.utils.stringify(container.cloneNode(false))} ${this.isNot ? "contains:" : "does not contain:"} ${this.utils.stringify(element && element.cloneNode(false))}
        `)].join(`
`) };
}
function getNormalizedHtml(container, htmlText) {
  let div = container.ownerDocument.createElement("div");
  return div.innerHTML = htmlText, div.innerHTML;
}
function toContainHTML(container, htmlText) {
  if (checkHtmlElement(container, toContainHTML, this), typeof htmlText != "string") throw new Error(`.toContainHTML() expects a string value, got ${htmlText}`);
  return { pass: container.outerHTML.includes(getNormalizedHtml(container, htmlText)), message: () => [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toContainHTML`, "element", ""), "Expected:", `  ${this.utils.EXPECTED_COLOR(htmlText)}`, "Received:", `  ${this.utils.printReceived(container.cloneNode(true))}`].join(`
`) };
}
function toHaveTextContent(node, checkWith, options = { normalizeWhitespace: true }) {
  checkNode(node, toHaveTextContent, this);
  let textContent = options.normalizeWhitespace ? normalize(node.textContent) : node.textContent.replace(/\u00a0/g, " "), checkingWithEmptyString = textContent !== "" && checkWith === "";
  return { pass: !checkingWithEmptyString && matches(textContent, checkWith), message: () => {
    let to = this.isNot ? "not to" : "to";
    return getMessage3(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveTextContent`, "element", ""), checkingWithEmptyString ? "Checking with empty string will always match, use .toBeEmptyDOMElement() instead" : `Expected element ${to} have text content`, checkWith, "Received", textContent);
  } };
}
function toHaveAccessibleDescription(htmlElement, expectedAccessibleDescription) {
  checkHtmlElement(htmlElement, toHaveAccessibleDescription, this);
  let actualAccessibleDescription = computeAccessibleDescription(htmlElement), missingExpectedValue = arguments.length === 1, pass = false;
  return missingExpectedValue ? pass = actualAccessibleDescription !== "" : pass = expectedAccessibleDescription instanceof RegExp ? expectedAccessibleDescription.test(actualAccessibleDescription) : this.equals(actualAccessibleDescription, expectedAccessibleDescription), { pass, message: () => {
    let to = this.isNot ? "not to" : "to";
    return getMessage3(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.${toHaveAccessibleDescription.name}`, "element", ""), `Expected element ${to} have accessible description`, expectedAccessibleDescription, "Received", actualAccessibleDescription);
  } };
}
var ariaInvalidName = "aria-invalid", validStates = ["false"];
function toHaveAccessibleErrorMessage(htmlElement, expectedAccessibleErrorMessage) {
  var _a2;
  checkHtmlElement(htmlElement, toHaveAccessibleErrorMessage, this);
  let to = this.isNot ? "not to" : "to", method = this.isNot ? ".not.toHaveAccessibleErrorMessage" : ".toHaveAccessibleErrorMessage", errormessageId = htmlElement.getAttribute("aria-errormessage");
  if (!!errormessageId && /\s+/.test(errormessageId)) return { pass: false, message: () => getMessage3(this, this.utils.matcherHint(method, "element"), "Expected element's `aria-errormessage` attribute to be empty or a single, valid ID", "", "Received", `aria-errormessage="${errormessageId}"`) };
  let ariaInvalidVal = htmlElement.getAttribute(ariaInvalidName);
  if (!htmlElement.hasAttribute(ariaInvalidName) || validStates.includes(ariaInvalidVal)) return { pass: false, message: () => getMessage3(this, this.utils.matcherHint(method, "element"), "Expected element to be marked as invalid with attribute", `${ariaInvalidName}="${String(true)}"`, "Received", htmlElement.hasAttribute("aria-invalid") ? `${ariaInvalidName}="${htmlElement.getAttribute(ariaInvalidName)}` : null) };
  let error = normalize(((_a2 = htmlElement.ownerDocument.getElementById(errormessageId)) == null ? void 0 : _a2.textContent) ?? "");
  return { pass: expectedAccessibleErrorMessage === void 0 ? !!error : expectedAccessibleErrorMessage instanceof RegExp ? expectedAccessibleErrorMessage.test(error) : this.equals(error, expectedAccessibleErrorMessage), message: () => getMessage3(this, this.utils.matcherHint(method, "element"), `Expected element ${to} have accessible error message`, expectedAccessibleErrorMessage ?? "", "Received", error) };
}
var elementRoleList = buildElementRoleList(import_aria_query.elementRoles);
function toHaveRole(htmlElement, expectedRole) {
  checkHtmlElement(htmlElement, toHaveRole, this);
  let actualRoles = getExplicitOrImplicitRoles(htmlElement);
  return { pass: actualRoles.some((el) => el === expectedRole), message: () => {
    let to = this.isNot ? "not to" : "to";
    return getMessage3(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.${toHaveRole.name}`, "element", ""), `Expected element ${to} have role`, expectedRole, "Received", actualRoles.join(", "));
  } };
}
function getExplicitOrImplicitRoles(htmlElement) {
  return htmlElement.hasAttribute("role") ? htmlElement.getAttribute("role").split(" ").filter(Boolean) : getImplicitAriaRoles(htmlElement);
}
function getImplicitAriaRoles(currentNode) {
  for (let { match, roles: roles3 } of elementRoleList) if (match(currentNode)) return [...roles3];
  return [];
}
function buildElementRoleList(elementRolesMap) {
  function makeElementSelector({ name, attributes }) {
    return `${name}${attributes.map(({ name: attributeName, value, constraints = [] }) => constraints.indexOf("undefined") !== -1 ? `:not([${attributeName}])` : value ? `[${attributeName}="${value}"]` : `[${attributeName}]`).join("")}`;
  }
  function getSelectorSpecificity({ attributes = [] }) {
    return attributes.length;
  }
  function bySelectorSpecificity({ specificity: leftSpecificity }, { specificity: rightSpecificity }) {
    return rightSpecificity - leftSpecificity;
  }
  function match(element) {
    let { attributes = [] } = element, typeTextIndex = attributes.findIndex((attribute) => attribute.value && attribute.name === "type" && attribute.value === "text");
    typeTextIndex >= 0 && (attributes = [...attributes.slice(0, typeTextIndex), ...attributes.slice(typeTextIndex + 1)]);
    let selector = makeElementSelector({ ...element, attributes });
    return (node) => typeTextIndex >= 0 && node.type !== "text" ? false : node.matches(selector);
  }
  let result = [];
  for (let [element, roles3] of elementRolesMap.entries()) result = [...result, { match: match(element), roles: Array.from(roles3), specificity: getSelectorSpecificity(element) }];
  return result.sort(bySelectorSpecificity);
}
function toHaveAccessibleName(htmlElement, expectedAccessibleName) {
  checkHtmlElement(htmlElement, toHaveAccessibleName, this);
  let actualAccessibleName = computeAccessibleName(htmlElement), missingExpectedValue = arguments.length === 1, pass = false;
  return missingExpectedValue ? pass = actualAccessibleName !== "" : pass = expectedAccessibleName instanceof RegExp ? expectedAccessibleName.test(actualAccessibleName) : this.equals(actualAccessibleName, expectedAccessibleName), { pass, message: () => {
    let to = this.isNot ? "not to" : "to";
    return getMessage3(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.${toHaveAccessibleName.name}`, "element", ""), `Expected element ${to} have accessible name`, expectedAccessibleName, "Received", actualAccessibleName);
  } };
}
function printAttribute(stringify2, name, value) {
  return value === void 0 ? name : `${name}=${stringify2(value)}`;
}
function getAttributeComment(stringify2, name, value) {
  return value === void 0 ? `element.hasAttribute(${stringify2(name)})` : `element.getAttribute(${stringify2(name)}) === ${stringify2(value)}`;
}
function toHaveAttribute(htmlElement, name, expectedValue) {
  checkHtmlElement(htmlElement, toHaveAttribute, this);
  let isExpectedValuePresent = expectedValue !== void 0, hasAttribute = htmlElement.hasAttribute(name), receivedValue = htmlElement.getAttribute(name);
  return { pass: isExpectedValuePresent ? hasAttribute && this.equals(receivedValue, expectedValue) : hasAttribute, message: () => {
    let to = this.isNot ? "not to" : "to", receivedAttribute = hasAttribute ? printAttribute(this.utils.stringify, name, receivedValue) : null, matcher = this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveAttribute`, "element", this.utils.printExpected(name), { secondArgument: isExpectedValuePresent ? this.utils.printExpected(expectedValue) : void 0, comment: getAttributeComment(this.utils.stringify, name, expectedValue) });
    return getMessage3(this, matcher, `Expected the element ${to} have attribute`, printAttribute(this.utils.stringify, name, expectedValue), "Received", receivedAttribute);
  } };
}
function getExpectedClassNamesAndOptions(params) {
  let lastParam = params.pop(), expectedClassNames, options;
  return typeof lastParam == "object" && !(lastParam instanceof RegExp) ? (expectedClassNames = params, options = lastParam) : (expectedClassNames = params.concat(lastParam), options = { exact: false }), { expectedClassNames, options };
}
function splitClassNames(str) {
  return str ? str.split(/\s+/).filter((s) => s.length > 0) : [];
}
function isSubset$1(subset, superset) {
  return subset.every((strOrRegexp) => typeof strOrRegexp == "string" ? superset.includes(strOrRegexp) : superset.some((className) => strOrRegexp.test(className)));
}
function toHaveClass(htmlElement, ...params) {
  checkHtmlElement(htmlElement, toHaveClass, this);
  let { expectedClassNames, options } = getExpectedClassNamesAndOptions(params), received = splitClassNames(htmlElement.getAttribute("class")), expected = expectedClassNames.reduce((acc, className) => acc.concat(typeof className == "string" || !className ? splitClassNames(className) : className), []), hasRegExp = expected.some((className) => className instanceof RegExp);
  if (options.exact && hasRegExp) throw new Error("Exact option does not support RegExp expected class names");
  return options.exact ? { pass: isSubset$1(expected, received) && expected.length === received.length, message: () => {
    let to = this.isNot ? "not to" : "to";
    return getMessage3(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveClass`, "element", this.utils.printExpected(expected.join(" "))), `Expected the element ${to} have EXACTLY defined classes`, expected.join(" "), "Received", received.join(" "));
  } } : expected.length > 0 ? { pass: isSubset$1(expected, received), message: () => {
    let to = this.isNot ? "not to" : "to";
    return getMessage3(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveClass`, "element", this.utils.printExpected(expected.join(" "))), `Expected the element ${to} have class`, expected.join(" "), "Received", received.join(" "));
  } } : { pass: this.isNot ? received.length > 0 : false, message: () => this.isNot ? getMessage3(this, this.utils.matcherHint(".not.toHaveClass", "element", ""), "Expected the element to have classes", "(none)", "Received", received.join(" ")) : [this.utils.matcherHint(".toHaveClass", "element"), "At least one expected class must be provided."].join(`
`) };
}
function getStyleDeclaration(document2, css) {
  let styles3 = {}, copy3 = document2.createElement("div");
  return Object.keys(css).forEach((property) => {
    copy3.style[property] = css[property], styles3[property] = copy3.style[property];
  }), styles3;
}
function isSubset(styles3, computedStyle) {
  return !!Object.keys(styles3).length && Object.entries(styles3).every(([prop, value]) => {
    let isCustomProperty = prop.startsWith("--"), spellingVariants = [prop];
    return isCustomProperty || spellingVariants.push(prop.toLowerCase()), spellingVariants.some((name) => computedStyle[name] === value || computedStyle.getPropertyValue(name) === value);
  });
}
function printoutStyles(styles3) {
  return Object.keys(styles3).sort().map((prop) => `${prop}: ${styles3[prop]};`).join(`
`);
}
function expectedDiff(diffFn, expected, computedStyles) {
  let received = Array.from(computedStyles).filter((prop) => expected[prop] !== void 0).reduce((obj, prop) => Object.assign(obj, { [prop]: computedStyles.getPropertyValue(prop) }), {});
  return diffFn(printoutStyles(expected), printoutStyles(received)).replace(`${import_chalk.default.red("+ Received")}
`, "");
}
function toHaveStyle(htmlElement, css) {
  checkHtmlElement(htmlElement, toHaveStyle, this);
  let parsedCSS = typeof css == "object" ? css : parseCSS(css, toHaveStyle, this), { getComputedStyle } = htmlElement.ownerDocument.defaultView, expected = getStyleDeclaration(htmlElement.ownerDocument, parsedCSS), received = getComputedStyle(htmlElement);
  return { pass: isSubset(expected, received), message: () => {
    let matcher = `${this.isNot ? ".not" : ""}.toHaveStyle`;
    return [this.utils.matcherHint(matcher, "element", ""), expectedDiff(this.utils.diff, expected, received)].join(`

`);
  } };
}
function toHaveFocus(element) {
  return checkHtmlElement(element, toHaveFocus, this), { pass: element.ownerDocument.activeElement === element, message: () => [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveFocus`, "element", ""), "", ...this.isNot ? ["Received element is focused:", `  ${this.utils.printReceived(element)}`] : ["Expected element with focus:", `  ${this.utils.printExpected(element)}`, "Received element with focus:", `  ${this.utils.printReceived(element.ownerDocument.activeElement)}`]].join(`
`) };
}
function getMultiElementValue(elements) {
  let types = [...new Set(elements.map((element) => element.type))];
  if (types.length !== 1) throw new Error("Multiple form elements with the same name must be of the same type");
  switch (types[0]) {
    case "radio": {
      let theChosenOne = elements.find((radio) => radio.checked);
      return theChosenOne ? theChosenOne.value : void 0;
    }
    case "checkbox":
      return elements.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
    default:
      return elements.map((element) => element.value);
  }
}
function getFormValue(container, name) {
  let elements = [...container.querySelectorAll(`[name="${(0, import_css.default)(name)}"]`)];
  if (elements.length !== 0) switch (elements.length) {
    case 1:
      return getSingleElementValue(elements[0]);
    default:
      return getMultiElementValue(elements);
  }
}
function getPureName(name) {
  return /\[\]$/.test(name) ? name.slice(0, -2) : name;
}
function getAllFormValues(container) {
  return Array.from(container.elements).map((element) => element.name).reduce((obj, name) => ({ ...obj, [getPureName(name)]: getFormValue(container, name) }), {});
}
function toHaveFormValues(formElement, expectedValues) {
  if (checkHtmlElement(formElement, toHaveFormValues, this), !formElement.elements) throw new Error("toHaveFormValues must be called on a form or a fieldset");
  let formValues = getAllFormValues(formElement);
  return { pass: Object.entries(expectedValues).every(([name, expectedValue]) => (0, import_isEqualWith.default)(formValues[name], expectedValue, compareArraysAsSet)), message: () => {
    let to = this.isNot ? "not to" : "to", matcher = `${this.isNot ? ".not" : ""}.toHaveFormValues`, commonKeyValues = Object.keys(formValues).filter((key) => expectedValues.hasOwnProperty(key)).reduce((obj, key) => ({ ...obj, [key]: formValues[key] }), {});
    return [this.utils.matcherHint(matcher, "element", ""), `Expected the element ${to} have form values`, this.utils.diff(expectedValues, commonKeyValues)].join(`

`);
  } };
}
function isStyleVisible(element) {
  let { getComputedStyle } = element.ownerDocument.defaultView, { display: display2, visibility, opacity } = getComputedStyle(element);
  return display2 !== "none" && visibility !== "hidden" && visibility !== "collapse" && opacity !== "0" && opacity !== 0;
}
function isAttributeVisible(element, previousElement) {
  let detailsVisibility;
  return previousElement ? detailsVisibility = element.nodeName === "DETAILS" && previousElement.nodeName !== "SUMMARY" ? element.hasAttribute("open") : true : detailsVisibility = element.nodeName === "DETAILS" ? element.hasAttribute("open") : true, !element.hasAttribute("hidden") && detailsVisibility;
}
function isElementVisible(element, previousElement) {
  return isStyleVisible(element) && isAttributeVisible(element, previousElement) && (!element.parentElement || isElementVisible(element.parentElement, element));
}
function toBeVisible(element) {
  checkHtmlElement(element, toBeVisible, this);
  let isInDocument = element.ownerDocument === element.getRootNode({ composed: true }), isVisible2 = isInDocument && isElementVisible(element);
  return { pass: isVisible2, message: () => {
    let is = isVisible2 ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeVisible`, "element", ""), "", `Received element ${is} visible${isInDocument ? "" : " (element is not in the document)"}:`, `  ${this.utils.printReceived(element.cloneNode(false))}`].join(`
`);
  } };
}
var FORM_TAGS$2 = ["fieldset", "input", "select", "optgroup", "option", "button", "textarea"];
function isFirstLegendChildOfFieldset(element, parent) {
  return getTag(element) === "legend" && getTag(parent) === "fieldset" && element.isSameNode(Array.from(parent.children).find((child) => getTag(child) === "legend"));
}
function isElementDisabledByParent(element, parent) {
  return isElementDisabled(parent) && !isFirstLegendChildOfFieldset(element, parent);
}
function isCustomElement(tag) {
  return tag.includes("-");
}
function canElementBeDisabled(element) {
  let tag = getTag(element);
  return FORM_TAGS$2.includes(tag) || isCustomElement(tag);
}
function isElementDisabled(element) {
  return canElementBeDisabled(element) && element.hasAttribute("disabled");
}
function isAncestorDisabled(element) {
  let parent = element.parentElement;
  return !!parent && (isElementDisabledByParent(element, parent) || isAncestorDisabled(parent));
}
function isElementOrAncestorDisabled(element) {
  return canElementBeDisabled(element) && (isElementDisabled(element) || isAncestorDisabled(element));
}
function toBeDisabled(element) {
  checkHtmlElement(element, toBeDisabled, this);
  let isDisabled3 = isElementOrAncestorDisabled(element);
  return { pass: isDisabled3, message: () => {
    let is = isDisabled3 ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeDisabled`, "element", ""), "", `Received element ${is} disabled:`, `  ${this.utils.printReceived(element.cloneNode(false))}`].join(`
`);
  } };
}
function toBeEnabled(element) {
  checkHtmlElement(element, toBeEnabled, this);
  let isEnabled = !isElementOrAncestorDisabled(element);
  return { pass: isEnabled, message: () => {
    let is = isEnabled ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeEnabled`, "element", ""), "", `Received element ${is} enabled:`, `  ${this.utils.printReceived(element.cloneNode(false))}`].join(`
`);
  } };
}
var FORM_TAGS$1 = ["select", "textarea"], ARIA_FORM_TAGS = ["input", "select", "textarea"], UNSUPPORTED_INPUT_TYPES = ["color", "hidden", "range", "submit", "image", "reset"], SUPPORTED_ARIA_ROLES = ["checkbox", "combobox", "gridcell", "listbox", "radiogroup", "spinbutton", "textbox", "tree"];
function isRequiredOnFormTagsExceptInput(element) {
  return FORM_TAGS$1.includes(getTag(element)) && element.hasAttribute("required");
}
function isRequiredOnSupportedInput(element) {
  return getTag(element) === "input" && element.hasAttribute("required") && (element.hasAttribute("type") && !UNSUPPORTED_INPUT_TYPES.includes(element.getAttribute("type")) || !element.hasAttribute("type"));
}
function isElementRequiredByARIA(element) {
  return element.hasAttribute("aria-required") && element.getAttribute("aria-required") === "true" && (ARIA_FORM_TAGS.includes(getTag(element)) || element.hasAttribute("role") && SUPPORTED_ARIA_ROLES.includes(element.getAttribute("role")));
}
function toBeRequired(element) {
  checkHtmlElement(element, toBeRequired, this);
  let isRequired = isRequiredOnFormTagsExceptInput(element) || isRequiredOnSupportedInput(element) || isElementRequiredByARIA(element);
  return { pass: isRequired, message: () => {
    let is = isRequired ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeRequired`, "element", ""), "", `Received element ${is} required:`, `  ${this.utils.printReceived(element.cloneNode(false))}`].join(`
`);
  } };
}
var FORM_TAGS = ["form", "input", "select", "textarea"];
function isElementHavingAriaInvalid(element) {
  return element.hasAttribute("aria-invalid") && element.getAttribute("aria-invalid") !== "false";
}
function isSupportsValidityMethod(element) {
  return FORM_TAGS.includes(getTag(element));
}
function isElementInvalid(element) {
  let isHaveAriaInvalid = isElementHavingAriaInvalid(element);
  return isSupportsValidityMethod(element) ? isHaveAriaInvalid || !element.checkValidity() : isHaveAriaInvalid;
}
function toBeInvalid(element) {
  checkHtmlElement(element, toBeInvalid, this);
  let isInvalid = isElementInvalid(element);
  return { pass: isInvalid, message: () => {
    let is = isInvalid ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeInvalid`, "element", ""), "", `Received element ${is} currently invalid:`, `  ${this.utils.printReceived(element.cloneNode(false))}`].join(`
`);
  } };
}
function toBeValid(element) {
  checkHtmlElement(element, toBeValid, this);
  let isValid = !isElementInvalid(element);
  return { pass: isValid, message: () => {
    let is = isValid ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeValid`, "element", ""), "", `Received element ${is} currently valid:`, `  ${this.utils.printReceived(element.cloneNode(false))}`].join(`
`);
  } };
}
function toHaveValue(htmlElement, expectedValue) {
  if (checkHtmlElement(htmlElement, toHaveValue, this), htmlElement.tagName.toLowerCase() === "input" && ["checkbox", "radio"].includes(htmlElement.type)) throw new Error("input with type=checkbox or type=radio cannot be used with .toHaveValue(). Use .toBeChecked() for type=checkbox or .toHaveFormValues() instead");
  let receivedValue = getSingleElementValue(htmlElement), expectsValue = expectedValue !== void 0, expectedTypedValue = expectedValue, receivedTypedValue = receivedValue;
  return expectedValue == receivedValue && expectedValue !== receivedValue && (expectedTypedValue = `${expectedValue} (${typeof expectedValue})`, receivedTypedValue = `${receivedValue} (${typeof receivedValue})`), { pass: expectsValue ? (0, import_isEqualWith.default)(receivedValue, expectedValue, compareArraysAsSet) : !!receivedValue, message: () => {
    let to = this.isNot ? "not to" : "to", matcher = this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveValue`, "element", expectedValue);
    return getMessage3(this, matcher, `Expected the element ${to} have value`, expectsValue ? expectedTypedValue : "(any)", "Received", receivedTypedValue);
  } };
}
function toHaveDisplayValue(htmlElement, expectedValue) {
  checkHtmlElement(htmlElement, toHaveDisplayValue, this);
  let tagName = htmlElement.tagName.toLowerCase();
  if (!["select", "input", "textarea"].includes(tagName)) throw new Error(".toHaveDisplayValue() currently supports only input, textarea or select elements, try with another matcher instead.");
  if (tagName === "input" && ["radio", "checkbox"].includes(htmlElement.type)) throw new Error(`.toHaveDisplayValue() currently does not support input[type="${htmlElement.type}"], try with another matcher instead.`);
  let values = getValues(tagName, htmlElement), expectedValues = getExpectedValues(expectedValue), numberOfMatchesWithValues = expectedValues.filter((expected) => values.some((value) => expected instanceof RegExp ? expected.test(value) : this.equals(value, String(expected)))).length, matchedWithAllValues = numberOfMatchesWithValues === values.length, matchedWithAllExpectedValues = numberOfMatchesWithValues === expectedValues.length;
  return { pass: matchedWithAllValues && matchedWithAllExpectedValues, message: () => getMessage3(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveDisplayValue`, "element", ""), `Expected element ${this.isNot ? "not " : ""}to have display value`, expectedValue, "Received", values) };
}
function getValues(tagName, htmlElement) {
  return tagName === "select" ? Array.from(htmlElement).filter((option) => option.selected).map((option) => option.textContent) : [htmlElement.value];
}
function getExpectedValues(expectedValue) {
  return expectedValue instanceof Array ? expectedValue : [expectedValue];
}
function toBeChecked(element) {
  checkHtmlElement(element, toBeChecked, this);
  let isValidInput = () => element.tagName.toLowerCase() === "input" && ["checkbox", "radio"].includes(element.type), isValidAriaElement = () => roleSupportsChecked(element.getAttribute("role")) && ["true", "false"].includes(element.getAttribute("aria-checked"));
  if (!isValidInput() && !isValidAriaElement()) return { pass: false, message: () => `only inputs with type="checkbox" or type="radio" or elements with ${supportedRolesSentence()} and a valid aria-checked attribute can be used with .toBeChecked(). Use .toHaveValue() instead` };
  let isChecked = () => isValidInput() ? element.checked : element.getAttribute("aria-checked") === "true";
  return { pass: isChecked(), message: () => {
    let is = isChecked() ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeChecked`, "element", ""), "", `Received element ${is} checked:`, `  ${this.utils.printReceived(element.cloneNode(false))}`].join(`
`);
  } };
}
function supportedRolesSentence() {
  return toSentence(supportedRoles().map((role) => `role="${role}"`), { lastWordConnector: " or " });
}
function supportedRoles() {
  return import_aria_query.roles.keys().filter(roleSupportsChecked);
}
function roleSupportsChecked(role) {
  var _a2;
  return ((_a2 = import_aria_query.roles.get(role)) == null ? void 0 : _a2.props["aria-checked"]) !== void 0;
}
function toBePartiallyChecked(element) {
  checkHtmlElement(element, toBePartiallyChecked, this);
  let isValidInput = () => element.tagName.toLowerCase() === "input" && element.type === "checkbox", isValidAriaElement = () => element.getAttribute("role") === "checkbox";
  if (!isValidInput() && !isValidAriaElement()) return { pass: false, message: () => 'only inputs with type="checkbox" or elements with role="checkbox" and a valid aria-checked attribute can be used with .toBePartiallyChecked(). Use .toHaveValue() instead' };
  let isPartiallyChecked = () => {
    let isAriaMixed = element.getAttribute("aria-checked") === "mixed";
    return isValidInput() && element.indeterminate || isAriaMixed;
  };
  return { pass: isPartiallyChecked(), message: () => {
    let is = isPartiallyChecked() ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBePartiallyChecked`, "element", ""), "", `Received element ${is} partially checked:`, `  ${this.utils.printReceived(element.cloneNode(false))}`].join(`
`);
  } };
}
function toHaveDescription(htmlElement, checkWith) {
  deprecate("toHaveDescription", "Please use toHaveAccessibleDescription."), checkHtmlElement(htmlElement, toHaveDescription, this);
  let expectsDescription = checkWith !== void 0, descriptionIDs = (htmlElement.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean), description = "";
  if (descriptionIDs.length > 0) {
    let document2 = htmlElement.ownerDocument, descriptionEls = descriptionIDs.map((descriptionID) => document2.getElementById(descriptionID)).filter(Boolean);
    description = normalize(descriptionEls.map((el) => el.textContent).join(" "));
  }
  return { pass: expectsDescription ? checkWith instanceof RegExp ? checkWith.test(description) : this.equals(description, checkWith) : !!description, message: () => {
    let to = this.isNot ? "not to" : "to";
    return getMessage3(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveDescription`, "element", ""), `Expected the element ${to} have description`, this.utils.printExpected(checkWith), "Received", this.utils.printReceived(description));
  } };
}
function toHaveErrorMessage(htmlElement, checkWith) {
  if (deprecate("toHaveErrorMessage", "Please use toHaveAccessibleErrorMessage."), checkHtmlElement(htmlElement, toHaveErrorMessage, this), !htmlElement.hasAttribute("aria-invalid") || htmlElement.getAttribute("aria-invalid") === "false") {
    let not = this.isNot ? ".not" : "";
    return { pass: false, message: () => getMessage3(this, this.utils.matcherHint(`${not}.toHaveErrorMessage`, "element", ""), "Expected the element to have invalid state indicated by", 'aria-invalid="true"', "Received", htmlElement.hasAttribute("aria-invalid") ? `aria-invalid="${htmlElement.getAttribute("aria-invalid")}"` : this.utils.printReceived("")) };
  }
  let expectsErrorMessage = checkWith !== void 0, errormessageIDs = (htmlElement.getAttribute("aria-errormessage") || "").split(/\s+/).filter(Boolean), errormessage = "";
  if (errormessageIDs.length > 0) {
    let document2 = htmlElement.ownerDocument, errormessageEls = errormessageIDs.map((errormessageID) => document2.getElementById(errormessageID)).filter(Boolean);
    errormessage = normalize(errormessageEls.map((el) => el.textContent).join(" "));
  }
  return { pass: expectsErrorMessage ? checkWith instanceof RegExp ? checkWith.test(errormessage) : this.equals(errormessage, checkWith) : !!errormessage, message: () => {
    let to = this.isNot ? "not to" : "to";
    return getMessage3(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveErrorMessage`, "element", ""), `Expected the element ${to} have error message`, this.utils.printExpected(checkWith), "Received", this.utils.printReceived(errormessage));
  } };
}
__toESM(require_redent(), 1);
__toESM(require_lib(), 1);
__toESM(require_source(), 1);
__toESM(require_isEqualWith(), 1);
__toESM(require_css_escape(), 1);
function assertTypes(value, name, types) {
  let receivedType = typeof value;
  if (!types.includes(receivedType)) throw new TypeError(`${name} value must be ${types.join(" or ")}, received "${receivedType}"`);
}
function isObject(item) {
  return item != null && typeof item == "object" && !Array.isArray(item);
}
function isFinalObj(obj) {
  return obj === Object.prototype || obj === Function.prototype || obj === RegExp.prototype;
}
function getType(value) {
  return Object.prototype.toString.apply(value).slice(8, -1);
}
function collectOwnProperties(obj, collector) {
  let collect = typeof collector == "function" ? collector : (key) => collector.add(key);
  Object.getOwnPropertyNames(obj).forEach(collect), Object.getOwnPropertySymbols(obj).forEach(collect);
}
function getOwnProperties(obj) {
  let ownProps = /* @__PURE__ */ new Set();
  return isFinalObj(obj) ? [] : (collectOwnProperties(obj, ownProps), Array.from(ownProps));
}
var defaultCloneOptions = { forceWritable: false };
function deepClone(val, options = defaultCloneOptions) {
  return clone(val, /* @__PURE__ */ new WeakMap(), options);
}
function clone(val, seen, options = defaultCloneOptions) {
  let k2, out;
  if (seen.has(val)) return seen.get(val);
  if (Array.isArray(val)) {
    for (out = Array(k2 = val.length), seen.set(val, out); k2--; ) out[k2] = clone(val[k2], seen, options);
    return out;
  }
  if (Object.prototype.toString.call(val) === "[object Object]") {
    out = Object.create(Object.getPrototypeOf(val)), seen.set(val, out);
    let props = getOwnProperties(val);
    for (let k22 of props) {
      let descriptor = Object.getOwnPropertyDescriptor(val, k22);
      if (!descriptor) continue;
      let cloned = clone(val[k22], seen, options);
      options.forceWritable ? Object.defineProperty(out, k22, { enumerable: descriptor.enumerable, configurable: true, writable: true, value: cloned }) : "get" in descriptor ? Object.defineProperty(out, k22, { ...descriptor, get() {
        return cloned;
      } }) : Object.defineProperty(out, k22, { ...descriptor, value: cloned });
    }
    return out;
  }
  return val;
}
var ansiColors2 = { bold: ["1", "22"], dim: ["2", "22"], italic: ["3", "23"], underline: ["4", "24"], inverse: ["7", "27"], hidden: ["8", "28"], strike: ["9", "29"], black: ["30", "39"], red: ["31", "39"], green: ["32", "39"], yellow: ["33", "39"], blue: ["34", "39"], magenta: ["35", "39"], cyan: ["36", "39"], white: ["37", "39"], brightblack: ["30;1", "39"], brightred: ["31;1", "39"], brightgreen: ["32;1", "39"], brightyellow: ["33;1", "39"], brightblue: ["34;1", "39"], brightmagenta: ["35;1", "39"], brightcyan: ["36;1", "39"], brightwhite: ["37;1", "39"], grey: ["90", "39"] }, styles2 = { special: "cyan", number: "yellow", bigint: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", symbol: "green", date: "magenta", regexp: "red" }, truncator2 = "…";
function colorise2(value, styleType) {
  let color = ansiColors2[styles2[styleType]] || ansiColors2[styleType] || "";
  return color ? `\x1B[${color[0]}m${String(value)}\x1B[${color[1]}m` : String(value);
}
function normaliseOptions2({ showHidden = false, depth = 2, colors = false, customInspect = true, showProxy = false, maxArrayLength = 1 / 0, breakLength = 1 / 0, seen = [], truncate: truncate3 = 1 / 0, stylize = String } = {}, inspect5) {
  let options = { showHidden: !!showHidden, depth: Number(depth), colors: !!colors, customInspect: !!customInspect, showProxy: !!showProxy, maxArrayLength: Number(maxArrayLength), breakLength: Number(breakLength), truncate: Number(truncate3), seen, inspect: inspect5, stylize };
  return options.colors && (options.stylize = colorise2), options;
}
function isHighSurrogate(char) {
  return char >= "\uD800" && char <= "\uDBFF";
}
function truncate2(string, length, tail = truncator2) {
  string = String(string);
  let tailLength = tail.length, stringLength = string.length;
  if (tailLength > length && stringLength > tailLength) return tail;
  if (stringLength > length && stringLength > tailLength) {
    let end = length - tailLength;
    return end > 0 && isHighSurrogate(string[end - 1]) && (end = end - 1), `${string.slice(0, end)}${tail}`;
  }
  return string;
}
function inspectList2(list, options, inspectItem, separator = ", ") {
  inspectItem = inspectItem || options.inspect;
  let size = list.length;
  if (size === 0) return "";
  let originalLength = options.truncate, output = "", peek = "", truncated = "";
  for (let i = 0; i < size; i += 1) {
    let last = i + 1 === list.length, secondToLast = i + 2 === list.length;
    truncated = `${truncator2}(${list.length - i})`;
    let value = list[i];
    options.truncate = originalLength - output.length - (last ? 0 : separator.length);
    let string = peek || inspectItem(value, options) + (last ? "" : separator), nextLength = output.length + string.length, truncatedLength = nextLength + truncated.length;
    if (last && nextLength > originalLength && output.length + truncated.length <= originalLength || !last && !secondToLast && truncatedLength > originalLength || (peek = last ? "" : inspectItem(list[i + 1], options) + (secondToLast ? "" : separator), !last && secondToLast && truncatedLength > originalLength && nextLength + peek.length > originalLength)) break;
    if (output += string, !last && !secondToLast && nextLength + peek.length >= originalLength) {
      truncated = `${truncator2}(${list.length - i - 1})`;
      break;
    }
    truncated = "";
  }
  return `${output}${truncated}`;
}
function quoteComplexKey2(key) {
  return key.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/) ? key : JSON.stringify(key).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
}
function inspectProperty2([key, value], options) {
  return options.truncate -= 2, typeof key == "string" ? key = quoteComplexKey2(key) : typeof key != "number" && (key = `[${options.inspect(key, options)}]`), options.truncate -= key.length, value = options.inspect(value, options), `${key}: ${value}`;
}
function inspectArray2(array, options) {
  let nonIndexProperties = Object.keys(array).slice(array.length);
  if (!array.length && !nonIndexProperties.length) return "[]";
  options.truncate -= 4;
  let listContents = inspectList2(array, options);
  options.truncate -= listContents.length;
  let propertyContents = "";
  return nonIndexProperties.length && (propertyContents = inspectList2(nonIndexProperties.map((key) => [key, array[key]]), options, inspectProperty2)), `[ ${listContents}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
var getArrayName2 = (array) => typeof Buffer == "function" && array instanceof Buffer ? "Buffer" : array[Symbol.toStringTag] ? array[Symbol.toStringTag] : array.constructor.name;
function inspectTypedArray2(array, options) {
  let name = getArrayName2(array);
  options.truncate -= name.length + 4;
  let nonIndexProperties = Object.keys(array).slice(array.length);
  if (!array.length && !nonIndexProperties.length) return `${name}[]`;
  let output = "";
  for (let i = 0; i < array.length; i++) {
    let string = `${options.stylize(truncate2(array[i], options.truncate), "number")}${i === array.length - 1 ? "" : ", "}`;
    if (options.truncate -= string.length, array[i] !== array.length && options.truncate <= 3) {
      output += `${truncator2}(${array.length - array[i] + 1})`;
      break;
    }
    output += string;
  }
  let propertyContents = "";
  return nonIndexProperties.length && (propertyContents = inspectList2(nonIndexProperties.map((key) => [key, array[key]]), options, inspectProperty2)), `${name}[ ${output}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
function inspectDate2(dateObject, options) {
  let stringRepresentation = dateObject.toJSON();
  if (stringRepresentation === null) return "Invalid Date";
  let split = stringRepresentation.split("T"), date = split[0];
  return options.stylize(`${date}T${truncate2(split[1], options.truncate - date.length - 1)}`, "date");
}
function inspectFunction2(func, options) {
  let functionType = func[Symbol.toStringTag] || "Function", name = func.name;
  return name ? options.stylize(`[${functionType} ${truncate2(name, options.truncate - 11)}]`, "special") : options.stylize(`[${functionType}]`, "special");
}
function inspectMapEntry2([key, value], options) {
  return options.truncate -= 4, key = options.inspect(key, options), options.truncate -= key.length, value = options.inspect(value, options), `${key} => ${value}`;
}
function mapToEntries2(map) {
  let entries = [];
  return map.forEach((value, key) => {
    entries.push([key, value]);
  }), entries;
}
function inspectMap2(map, options) {
  return map.size - 1 <= 0 ? "Map{}" : (options.truncate -= 7, `Map{ ${inspectList2(mapToEntries2(map), options, inspectMapEntry2)} }`);
}
var isNaN3 = Number.isNaN || ((i) => i !== i);
function inspectNumber2(number, options) {
  return isNaN3(number) ? options.stylize("NaN", "number") : number === 1 / 0 ? options.stylize("Infinity", "number") : number === -1 / 0 ? options.stylize("-Infinity", "number") : number === 0 ? options.stylize(1 / number === 1 / 0 ? "+0" : "-0", "number") : options.stylize(truncate2(String(number), options.truncate), "number");
}
function inspectBigInt2(number, options) {
  let nums = truncate2(number.toString(), options.truncate - 1);
  return nums !== truncator2 && (nums += "n"), options.stylize(nums, "bigint");
}
function inspectRegExp2(value, options) {
  let flags = value.toString().split("/")[2], sourceLength = options.truncate - (2 + flags.length), source = value.source;
  return options.stylize(`/${truncate2(source, sourceLength)}/${flags}`, "regexp");
}
function arrayFromSet2(set2) {
  let values = [];
  return set2.forEach((value) => {
    values.push(value);
  }), values;
}
function inspectSet2(set2, options) {
  return set2.size === 0 ? "Set{}" : (options.truncate -= 7, `Set{ ${inspectList2(arrayFromSet2(set2), options)} }`);
}
var stringEscapeChars2 = new RegExp("['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]", "g"), escapeCharacters2 = { "\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "'": "\\'", "\\": "\\\\" }, hex2 = 16, unicodeLength2 = 4;
function escape3(char) {
  return escapeCharacters2[char] || `\\u${`0000${char.charCodeAt(0).toString(hex2)}`.slice(-unicodeLength2)}`;
}
function inspectString2(string, options) {
  return stringEscapeChars2.test(string) && (string = string.replace(stringEscapeChars2, escape3)), options.stylize(`'${truncate2(string, options.truncate - 2)}'`, "string");
}
function inspectSymbol2(value) {
  return "description" in Symbol.prototype ? value.description ? `Symbol(${value.description})` : "Symbol()" : value.toString();
}
var getPromiseValue2 = () => "Promise{…}";
try {
  let { getPromiseDetails, kPending, kRejected } = process.binding("util");
  Array.isArray(getPromiseDetails(Promise.resolve())) && (getPromiseValue2 = (value, options) => {
    let [state, innerValue] = getPromiseDetails(value);
    return state === kPending ? "Promise{<pending>}" : `Promise${state === kRejected ? "!" : ""}{${options.inspect(innerValue, options)}}`;
  });
} catch {
}
var promise_default2 = getPromiseValue2;
function inspectObject3(object, options) {
  let properties = Object.getOwnPropertyNames(object), symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : [];
  if (properties.length === 0 && symbols.length === 0) return "{}";
  if (options.truncate -= 4, options.seen = options.seen || [], options.seen.indexOf(object) >= 0) return "[Circular]";
  options.seen.push(object);
  let propertyContents = inspectList2(properties.map((key) => [key, object[key]]), options, inspectProperty2), symbolContents = inspectList2(symbols.map((key) => [key, object[key]]), options, inspectProperty2);
  options.seen.pop();
  let sep = "";
  return propertyContents && symbolContents && (sep = ", "), `{ ${propertyContents}${sep}${symbolContents} }`;
}
var toStringTag2 = typeof Symbol < "u" && Symbol.toStringTag ? Symbol.toStringTag : false;
function inspectClass2(value, options) {
  let name = "";
  return toStringTag2 && toStringTag2 in value && (name = value[toStringTag2]), name = name || value.constructor.name, (!name || name === "_class") && (name = "<Anonymous Class>"), options.truncate -= name.length, `${name}${inspectObject3(value, options)}`;
}
function inspectArguments2(args, options) {
  return args.length === 0 ? "Arguments[]" : (options.truncate -= 13, `Arguments[ ${inspectList2(args, options)} ]`);
}
var errorKeys2 = ["stack", "line", "column", "name", "message", "fileName", "lineNumber", "columnNumber", "number", "description"];
function inspectObject4(error, options) {
  let properties = Object.getOwnPropertyNames(error).filter((key) => errorKeys2.indexOf(key) === -1), name = error.name;
  options.truncate -= name.length;
  let message = "";
  typeof error.message == "string" ? message = truncate2(error.message, options.truncate) : properties.unshift("message"), message = message ? `: ${message}` : "", options.truncate -= message.length + 5;
  let propertyContents = inspectList2(properties.map((key) => [key, error[key]]), options, inspectProperty2);
  return `${name}${message}${propertyContents ? ` { ${propertyContents} }` : ""}`;
}
function inspectAttribute2([key, value], options) {
  return options.truncate -= 3, value ? `${options.stylize(String(key), "yellow")}=${options.stylize(`"${value}"`, "string")}` : `${options.stylize(String(key), "yellow")}`;
}
function inspectHTMLCollection2(collection, options) {
  return inspectList2(collection, options, inspectHTML2, `
`);
}
function inspectHTML2(element, options) {
  let properties = element.getAttributeNames(), name = element.tagName.toLowerCase(), head = options.stylize(`<${name}`, "special"), headClose = options.stylize(">", "special"), tail = options.stylize(`</${name}>`, "special");
  options.truncate -= name.length * 2 + 5;
  let propertyContents = "";
  properties.length > 0 && (propertyContents += " ", propertyContents += inspectList2(properties.map((key) => [key, element.getAttribute(key)]), options, inspectAttribute2, " ")), options.truncate -= propertyContents.length;
  let truncate3 = options.truncate, children = inspectHTMLCollection2(element.children, options);
  return children && children.length > truncate3 && (children = `${truncator2}(${element.children.length})`), `${head}${propertyContents}${headClose}${children}${tail}`;
}
var symbolsSupported2 = typeof Symbol == "function" && typeof Symbol.for == "function", chaiInspect2 = symbolsSupported2 ? Symbol.for("chai/inspect") : "@@chai/inspect", nodeInspect2 = false;
try {
  let nodeUtil = __require("util");
  nodeInspect2 = nodeUtil.inspect ? nodeUtil.inspect.custom : false;
} catch {
  nodeInspect2 = false;
}
var constructorMap2 = /* @__PURE__ */ new WeakMap(), stringTagMap2 = {}, baseTypesMap2 = { undefined: (value, options) => options.stylize("undefined", "undefined"), null: (value, options) => options.stylize("null", "null"), boolean: (value, options) => options.stylize(String(value), "boolean"), Boolean: (value, options) => options.stylize(String(value), "boolean"), number: inspectNumber2, Number: inspectNumber2, bigint: inspectBigInt2, BigInt: inspectBigInt2, string: inspectString2, String: inspectString2, function: inspectFunction2, Function: inspectFunction2, symbol: inspectSymbol2, Symbol: inspectSymbol2, Array: inspectArray2, Date: inspectDate2, Map: inspectMap2, Set: inspectSet2, RegExp: inspectRegExp2, Promise: promise_default2, WeakSet: (value, options) => options.stylize("WeakSet{…}", "special"), WeakMap: (value, options) => options.stylize("WeakMap{…}", "special"), Arguments: inspectArguments2, Int8Array: inspectTypedArray2, Uint8Array: inspectTypedArray2, Uint8ClampedArray: inspectTypedArray2, Int16Array: inspectTypedArray2, Uint16Array: inspectTypedArray2, Int32Array: inspectTypedArray2, Uint32Array: inspectTypedArray2, Float32Array: inspectTypedArray2, Float64Array: inspectTypedArray2, Generator: () => "", DataView: () => "", ArrayBuffer: () => "", Error: inspectObject4, HTMLCollection: inspectHTMLCollection2, NodeList: inspectHTMLCollection2 }, inspectCustom2 = (value, options, type5) => chaiInspect2 in value && typeof value[chaiInspect2] == "function" ? value[chaiInspect2](options) : nodeInspect2 && nodeInspect2 in value && typeof value[nodeInspect2] == "function" ? value[nodeInspect2](options.depth, options) : "inspect" in value && typeof value.inspect == "function" ? value.inspect(options.depth, options) : "constructor" in value && constructorMap2.has(value.constructor) ? constructorMap2.get(value.constructor)(value, options) : stringTagMap2[type5] ? stringTagMap2[type5](value, options) : "", toString2 = Object.prototype.toString;
function inspect3(value, opts = {}) {
  let options = normaliseOptions2(opts, inspect3), { customInspect } = options, type5 = value === null ? "null" : typeof value;
  if (type5 === "object" && (type5 = toString2.call(value).slice(8, -1)), type5 in baseTypesMap2) return baseTypesMap2[type5](value, options);
  if (customInspect && value) {
    let output = inspectCustom2(value, options, type5);
    if (output) return typeof output == "string" ? output : inspect3(output, options);
  }
  let proto = value ? Object.getPrototypeOf(value) : false;
  return proto === Object.prototype || proto === null ? inspectObject3(value, options) : value && typeof HTMLElement == "function" && value instanceof HTMLElement ? inspectHTML2(value, options) : "constructor" in value ? value.constructor !== Object ? inspectClass2(value, options) : inspectObject3(value, options) : value === Object(value) ? inspectObject3(value, options) : options.stylize(String(value), type5);
}
var f = { reset: [0, 0], bold: [1, 22, "\x1B[22m\x1B[1m"], dim: [2, 22, "\x1B[22m\x1B[2m"], italic: [3, 23], underline: [4, 24], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29], black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], gray: [90, 39], bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], blackBright: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39], bgBlackBright: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] }, h = Object.entries(f);
function a(n) {
  return String(n);
}
a.open = "";
a.close = "";
function C(n = false) {
  let e = typeof process < "u" ? process : void 0, i = (e == null ? void 0 : e.env) || {}, g3 = (e == null ? void 0 : e.argv) || [];
  return !("NO_COLOR" in i || g3.includes("--no-color")) && ("FORCE_COLOR" in i || g3.includes("--color") || (e == null ? void 0 : e.platform) === "win32" || n && i.TERM !== "dumb" || "CI" in i) || typeof window < "u" && !!window.chrome;
}
function p(n = false) {
  let e = C(n), i = (r, t, c, o) => {
    let l = "", s = 0;
    do
      l += r.substring(s, o) + c, s = o + t.length, o = r.indexOf(t, s);
    while (~o);
    return l + r.substring(s);
  }, g3 = (r, t, c = r) => {
    let o = (l) => {
      let s = String(l), b = s.indexOf(t, r.length);
      return ~b ? r + i(s, t, c, b) + t : r + s + t;
    };
    return o.open = r, o.close = t, o;
  }, u2 = { isColorSupported: e }, d2 = (r) => `\x1B[${r}m`;
  for (let [r, t] of h) u2[r] = e ? g3(d2(t[0]), d2(t[1]), t[2]) : a;
  return u2;
}
var f2 = p(false);
function getKeysOfEnumerableProperties(object, compareKeys) {
  let rawKeys = Object.keys(object), keys2 = compareKeys === null ? rawKeys : rawKeys.sort(compareKeys);
  if (Object.getOwnPropertySymbols) for (let symbol of Object.getOwnPropertySymbols(object)) Object.getOwnPropertyDescriptor(object, symbol).enumerable && keys2.push(symbol);
  return keys2;
}
function printIteratorEntries(iterator, config3, indentation, depth, refs, printer2, separator = ": ") {
  let result = "", width = 0, current = iterator.next();
  if (!current.done) {
    result += config3.spacingOuter;
    let indentationNext = indentation + config3.indent;
    for (; !current.done; ) {
      if (result += indentationNext, width++ === config3.maxWidth) {
        result += "…";
        break;
      }
      let name = printer2(current.value[0], config3, indentationNext, depth, refs), value = printer2(current.value[1], config3, indentationNext, depth, refs);
      result += name + separator + value, current = iterator.next(), current.done ? config3.min || (result += ",") : result += `,${config3.spacingInner}`;
    }
    result += config3.spacingOuter + indentation;
  }
  return result;
}
function printIteratorValues(iterator, config3, indentation, depth, refs, printer2) {
  let result = "", width = 0, current = iterator.next();
  if (!current.done) {
    result += config3.spacingOuter;
    let indentationNext = indentation + config3.indent;
    for (; !current.done; ) {
      if (result += indentationNext, width++ === config3.maxWidth) {
        result += "…";
        break;
      }
      result += printer2(current.value, config3, indentationNext, depth, refs), current = iterator.next(), current.done ? config3.min || (result += ",") : result += `,${config3.spacingInner}`;
    }
    result += config3.spacingOuter + indentation;
  }
  return result;
}
function printListItems(list, config3, indentation, depth, refs, printer2) {
  let result = "";
  list = list instanceof ArrayBuffer ? new DataView(list) : list;
  let isDataView = (l) => l instanceof DataView, length = isDataView(list) ? list.byteLength : list.length;
  if (length > 0) {
    result += config3.spacingOuter;
    let indentationNext = indentation + config3.indent;
    for (let i = 0; i < length; i++) {
      if (result += indentationNext, i === config3.maxWidth) {
        result += "…";
        break;
      }
      (isDataView(list) || i in list) && (result += printer2(isDataView(list) ? list.getInt8(i) : list[i], config3, indentationNext, depth, refs)), i < length - 1 ? result += `,${config3.spacingInner}` : config3.min || (result += ",");
    }
    result += config3.spacingOuter + indentation;
  }
  return result;
}
function printObjectProperties(val, config3, indentation, depth, refs, printer2) {
  let result = "", keys2 = getKeysOfEnumerableProperties(val, config3.compareKeys);
  if (keys2.length > 0) {
    result += config3.spacingOuter;
    let indentationNext = indentation + config3.indent;
    for (let i = 0; i < keys2.length; i++) {
      let key = keys2[i], name = printer2(key, config3, indentationNext, depth, refs), value = printer2(val[key], config3, indentationNext, depth, refs);
      result += `${indentationNext + name}: ${value}`, i < keys2.length - 1 ? result += `,${config3.spacingInner}` : config3.min || (result += ",");
    }
    result += config3.spacingOuter + indentation;
  }
  return result;
}
var asymmetricMatcher = typeof Symbol == "function" && Symbol.for ? Symbol.for("jest.asymmetricMatcher") : 1267621, SPACE$2 = " ", serialize$5 = (val, config3, indentation, depth, refs, printer2) => {
  let stringedValue = val.toString();
  if (stringedValue === "ArrayContaining" || stringedValue === "ArrayNotContaining") return ++depth > config3.maxDepth ? `[${stringedValue}]` : `${stringedValue + SPACE$2}[${printListItems(val.sample, config3, indentation, depth, refs, printer2)}]`;
  if (stringedValue === "ObjectContaining" || stringedValue === "ObjectNotContaining") return ++depth > config3.maxDepth ? `[${stringedValue}]` : `${stringedValue + SPACE$2}{${printObjectProperties(val.sample, config3, indentation, depth, refs, printer2)}}`;
  if (stringedValue === "StringMatching" || stringedValue === "StringNotMatching" || stringedValue === "StringContaining" || stringedValue === "StringNotContaining") return stringedValue + SPACE$2 + printer2(val.sample, config3, indentation, depth, refs);
  if (typeof val.toAsymmetricMatcher != "function") throw new TypeError(`Asymmetric matcher ${val.constructor.name} does not implement toAsymmetricMatcher()`);
  return val.toAsymmetricMatcher();
}, test$5 = (val) => val && val.$$typeof === asymmetricMatcher, plugin$5 = { serialize: serialize$5, test: test$5 }, SPACE$1 = " ", OBJECT_NAMES = /* @__PURE__ */ new Set(["DOMStringMap", "NamedNodeMap"]), ARRAY_REGEXP = /^(?:HTML\w*Collection|NodeList)$/;
function testName(name) {
  return OBJECT_NAMES.has(name) || ARRAY_REGEXP.test(name);
}
var test$4 = (val) => val && val.constructor && !!val.constructor.name && testName(val.constructor.name);
function isNamedNodeMap(collection) {
  return collection.constructor.name === "NamedNodeMap";
}
var serialize$4 = (collection, config3, indentation, depth, refs, printer2) => {
  let name = collection.constructor.name;
  return ++depth > config3.maxDepth ? `[${name}]` : (config3.min ? "" : name + SPACE$1) + (OBJECT_NAMES.has(name) ? `{${printObjectProperties(isNamedNodeMap(collection) ? [...collection].reduce((props, attribute) => (props[attribute.name] = attribute.value, props), {}) : { ...collection }, config3, indentation, depth, refs, printer2)}}` : `[${printListItems([...collection], config3, indentation, depth, refs, printer2)}]`);
}, plugin$4 = { serialize: serialize$4, test: test$4 };
function escapeHTML(str) {
  return str.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function printProps(keys2, props, config3, indentation, depth, refs, printer2) {
  let indentationNext = indentation + config3.indent, colors = config3.colors;
  return keys2.map((key) => {
    let value = props[key], printed = printer2(value, config3, indentationNext, depth, refs);
    return typeof value != "string" && (printed.includes(`
`) && (printed = config3.spacingOuter + indentationNext + printed + config3.spacingOuter + indentation), printed = `{${printed}}`), `${config3.spacingInner + indentation + colors.prop.open + key + colors.prop.close}=${colors.value.open}${printed}${colors.value.close}`;
  }).join("");
}
function printChildren(children, config3, indentation, depth, refs, printer2) {
  return children.map((child) => config3.spacingOuter + indentation + (typeof child == "string" ? printText(child, config3) : printer2(child, config3, indentation, depth, refs))).join("");
}
function printText(text, config3) {
  let contentColor = config3.colors.content;
  return contentColor.open + escapeHTML(text) + contentColor.close;
}
function printComment(comment, config3) {
  let commentColor = config3.colors.comment;
  return `${commentColor.open}<!--${escapeHTML(comment)}-->${commentColor.close}`;
}
function printElement(type5, printedProps, printedChildren, config3, indentation) {
  let tagColor = config3.colors.tag;
  return `${tagColor.open}<${type5}${printedProps && tagColor.close + printedProps + config3.spacingOuter + indentation + tagColor.open}${printedChildren ? `>${tagColor.close}${printedChildren}${config3.spacingOuter}${indentation}${tagColor.open}</${type5}` : `${printedProps && !config3.min ? "" : " "}/`}>${tagColor.close}`;
}
function printElementAsLeaf(type5, config3) {
  let tagColor = config3.colors.tag;
  return `${tagColor.open}<${type5}${tagColor.close} …${tagColor.open} />${tagColor.close}`;
}
var ELEMENT_NODE = 1, TEXT_NODE = 3, COMMENT_NODE = 8, FRAGMENT_NODE = 11, ELEMENT_REGEXP = /^(?:(?:HTML|SVG)\w*)?Element$/;
function testHasAttribute(val) {
  try {
    return typeof val.hasAttribute == "function" && val.hasAttribute("is");
  } catch {
    return false;
  }
}
function testNode(val) {
  let constructorName = val.constructor.name, { nodeType, tagName } = val, isCustomElement3 = typeof tagName == "string" && tagName.includes("-") || testHasAttribute(val);
  return nodeType === ELEMENT_NODE && (ELEMENT_REGEXP.test(constructorName) || isCustomElement3) || nodeType === TEXT_NODE && constructorName === "Text" || nodeType === COMMENT_NODE && constructorName === "Comment" || nodeType === FRAGMENT_NODE && constructorName === "DocumentFragment";
}
var test$3 = (val) => {
  var _a2;
  return ((_a2 = val == null ? void 0 : val.constructor) == null ? void 0 : _a2.name) && testNode(val);
};
function nodeIsText(node) {
  return node.nodeType === TEXT_NODE;
}
function nodeIsComment(node) {
  return node.nodeType === COMMENT_NODE;
}
function nodeIsFragment(node) {
  return node.nodeType === FRAGMENT_NODE;
}
var serialize$3 = (node, config3, indentation, depth, refs, printer2) => {
  if (nodeIsText(node)) return printText(node.data, config3);
  if (nodeIsComment(node)) return printComment(node.data, config3);
  let type5 = nodeIsFragment(node) ? "DocumentFragment" : node.tagName.toLowerCase();
  return ++depth > config3.maxDepth ? printElementAsLeaf(type5, config3) : printElement(type5, printProps(nodeIsFragment(node) ? [] : Array.from(node.attributes, (attr) => attr.name).sort(), nodeIsFragment(node) ? {} : [...node.attributes].reduce((props, attribute) => (props[attribute.name] = attribute.value, props), {}), config3, indentation + config3.indent, depth, refs, printer2), printChildren(Array.prototype.slice.call(node.childNodes || node.children), config3, indentation + config3.indent, depth, refs, printer2), config3, indentation);
}, plugin$3 = { serialize: serialize$3, test: test$3 }, IS_ITERABLE_SENTINEL = "@@__IMMUTABLE_ITERABLE__@@", IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@", IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@", IS_MAP_SENTINEL = "@@__IMMUTABLE_MAP__@@", IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@", IS_RECORD_SENTINEL = "@@__IMMUTABLE_RECORD__@@", IS_SEQ_SENTINEL = "@@__IMMUTABLE_SEQ__@@", IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@", IS_STACK_SENTINEL = "@@__IMMUTABLE_STACK__@@", getImmutableName = (name) => `Immutable.${name}`, printAsLeaf = (name) => `[${name}]`, SPACE = " ", LAZY = "…";
function printImmutableEntries(val, config3, indentation, depth, refs, printer2, type5) {
  return ++depth > config3.maxDepth ? printAsLeaf(getImmutableName(type5)) : `${getImmutableName(type5) + SPACE}{${printIteratorEntries(val.entries(), config3, indentation, depth, refs, printer2)}}`;
}
function getRecordEntries(val) {
  let i = 0;
  return { next() {
    if (i < val._keys.length) {
      let key = val._keys[i++];
      return { done: false, value: [key, val.get(key)] };
    }
    return { done: true, value: void 0 };
  } };
}
function printImmutableRecord(val, config3, indentation, depth, refs, printer2) {
  let name = getImmutableName(val._name || "Record");
  return ++depth > config3.maxDepth ? printAsLeaf(name) : `${name + SPACE}{${printIteratorEntries(getRecordEntries(val), config3, indentation, depth, refs, printer2)}}`;
}
function printImmutableSeq(val, config3, indentation, depth, refs, printer2) {
  let name = getImmutableName("Seq");
  return ++depth > config3.maxDepth ? printAsLeaf(name) : val[IS_KEYED_SENTINEL] ? `${name + SPACE}{${val._iter || val._object ? printIteratorEntries(val.entries(), config3, indentation, depth, refs, printer2) : LAZY}}` : `${name + SPACE}[${val._iter || val._array || val._collection || val._iterable ? printIteratorValues(val.values(), config3, indentation, depth, refs, printer2) : LAZY}]`;
}
function printImmutableValues(val, config3, indentation, depth, refs, printer2, type5) {
  return ++depth > config3.maxDepth ? printAsLeaf(getImmutableName(type5)) : `${getImmutableName(type5) + SPACE}[${printIteratorValues(val.values(), config3, indentation, depth, refs, printer2)}]`;
}
var serialize$2 = (val, config3, indentation, depth, refs, printer2) => val[IS_MAP_SENTINEL] ? printImmutableEntries(val, config3, indentation, depth, refs, printer2, val[IS_ORDERED_SENTINEL] ? "OrderedMap" : "Map") : val[IS_LIST_SENTINEL] ? printImmutableValues(val, config3, indentation, depth, refs, printer2, "List") : val[IS_SET_SENTINEL] ? printImmutableValues(val, config3, indentation, depth, refs, printer2, val[IS_ORDERED_SENTINEL] ? "OrderedSet" : "Set") : val[IS_STACK_SENTINEL] ? printImmutableValues(val, config3, indentation, depth, refs, printer2, "Stack") : val[IS_SEQ_SENTINEL] ? printImmutableSeq(val, config3, indentation, depth, refs, printer2) : printImmutableRecord(val, config3, indentation, depth, refs, printer2), test$2 = (val) => val && (val[IS_ITERABLE_SENTINEL] === true || val[IS_RECORD_SENTINEL] === true), plugin$2 = { serialize: serialize$2, test: test$2 }, reactIs = { exports: {} };
var reactIs_development = {};
var hasRequiredReactIs_development;
function requireReactIs_development() {
  return hasRequiredReactIs_development || (hasRequiredReactIs_development = 1, function() {
    var REACT_ELEMENT_TYPE = Symbol.for("react.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_PROVIDER_TYPE = Symbol.for("react.provider"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_SERVER_CONTEXT_TYPE = Symbol.for("react.server_context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"), enableScopeAPI = false, enableCacheElement = false, enableTransitionTracing = false, enableLegacyHidden = false, enableDebugTracing = false, REACT_MODULE_REFERENCE;
    REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
    function isValidElementType(type5) {
      return !!(typeof type5 == "string" || typeof type5 == "function" || type5 === REACT_FRAGMENT_TYPE || type5 === REACT_PROFILER_TYPE || enableDebugTracing || type5 === REACT_STRICT_MODE_TYPE || type5 === REACT_SUSPENSE_TYPE || type5 === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type5 === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing || typeof type5 == "object" && type5 !== null && (type5.$$typeof === REACT_LAZY_TYPE || type5.$$typeof === REACT_MEMO_TYPE || type5.$$typeof === REACT_PROVIDER_TYPE || type5.$$typeof === REACT_CONTEXT_TYPE || type5.$$typeof === REACT_FORWARD_REF_TYPE || type5.$$typeof === REACT_MODULE_REFERENCE || type5.getModuleId !== void 0));
    }
    function typeOf(object) {
      if (typeof object == "object" && object !== null) {
        var $$typeof = object.$$typeof;
        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type5 = object.type;
            switch (type5) {
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
              case REACT_SUSPENSE_LIST_TYPE:
                return type5;
              default:
                var $$typeofType = type5 && type5.$$typeof;
                switch ($$typeofType) {
                  case REACT_SERVER_CONTEXT_TYPE:
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;
                  default:
                    return $$typeof;
                }
            }
          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }
    }
    var ContextConsumer = REACT_CONTEXT_TYPE, ContextProvider = REACT_PROVIDER_TYPE, Element2 = REACT_ELEMENT_TYPE, ForwardRef = REACT_FORWARD_REF_TYPE, Fragment = REACT_FRAGMENT_TYPE, Lazy = REACT_LAZY_TYPE, Memo = REACT_MEMO_TYPE, Portal = REACT_PORTAL_TYPE, Profiler = REACT_PROFILER_TYPE, StrictMode = REACT_STRICT_MODE_TYPE, Suspense = REACT_SUSPENSE_TYPE, SuspenseList = REACT_SUSPENSE_LIST_TYPE, hasWarnedAboutDeprecatedIsAsyncMode = false, hasWarnedAboutDeprecatedIsConcurrentMode = false;
    function isAsyncMode(object) {
      return hasWarnedAboutDeprecatedIsAsyncMode || (hasWarnedAboutDeprecatedIsAsyncMode = true, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), false;
    }
    function isConcurrentMode(object) {
      return hasWarnedAboutDeprecatedIsConcurrentMode || (hasWarnedAboutDeprecatedIsConcurrentMode = true, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), false;
    }
    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }
    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }
    function isElement5(object) {
      return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }
    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }
    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }
    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }
    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }
    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }
    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }
    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }
    function isSuspenseList(object) {
      return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
    }
    reactIs_development.ContextConsumer = ContextConsumer, reactIs_development.ContextProvider = ContextProvider, reactIs_development.Element = Element2, reactIs_development.ForwardRef = ForwardRef, reactIs_development.Fragment = Fragment, reactIs_development.Lazy = Lazy, reactIs_development.Memo = Memo, reactIs_development.Portal = Portal, reactIs_development.Profiler = Profiler, reactIs_development.StrictMode = StrictMode, reactIs_development.Suspense = Suspense, reactIs_development.SuspenseList = SuspenseList, reactIs_development.isAsyncMode = isAsyncMode, reactIs_development.isConcurrentMode = isConcurrentMode, reactIs_development.isContextConsumer = isContextConsumer, reactIs_development.isContextProvider = isContextProvider, reactIs_development.isElement = isElement5, reactIs_development.isForwardRef = isForwardRef, reactIs_development.isFragment = isFragment, reactIs_development.isLazy = isLazy, reactIs_development.isMemo = isMemo, reactIs_development.isPortal = isPortal, reactIs_development.isProfiler = isProfiler, reactIs_development.isStrictMode = isStrictMode, reactIs_development.isSuspense = isSuspense, reactIs_development.isSuspenseList = isSuspenseList, reactIs_development.isValidElementType = isValidElementType, reactIs_development.typeOf = typeOf;
  }()), reactIs_development;
}
reactIs.exports = requireReactIs_development();
var reactIsExports = reactIs.exports;
function getChildren(arg, children = []) {
  if (Array.isArray(arg)) for (let item of arg) getChildren(item, children);
  else arg != null && arg !== false && arg !== "" && children.push(arg);
  return children;
}
function getType2(element) {
  let type5 = element.type;
  if (typeof type5 == "string") return type5;
  if (typeof type5 == "function") return type5.displayName || type5.name || "Unknown";
  if (reactIsExports.isFragment(element)) return "React.Fragment";
  if (reactIsExports.isSuspense(element)) return "React.Suspense";
  if (typeof type5 == "object" && type5 !== null) {
    if (reactIsExports.isContextProvider(element)) return "Context.Provider";
    if (reactIsExports.isContextConsumer(element)) return "Context.Consumer";
    if (reactIsExports.isForwardRef(element)) {
      if (type5.displayName) return type5.displayName;
      let functionName = type5.render.displayName || type5.render.name || "";
      return functionName === "" ? "ForwardRef" : `ForwardRef(${functionName})`;
    }
    if (reactIsExports.isMemo(element)) {
      let functionName = type5.displayName || type5.type.displayName || type5.type.name || "";
      return functionName === "" ? "Memo" : `Memo(${functionName})`;
    }
  }
  return "UNDEFINED";
}
function getPropKeys$1(element) {
  let { props } = element;
  return Object.keys(props).filter((key) => key !== "children" && props[key] !== void 0).sort();
}
var serialize$1 = (element, config3, indentation, depth, refs, printer2) => ++depth > config3.maxDepth ? printElementAsLeaf(getType2(element), config3) : printElement(getType2(element), printProps(getPropKeys$1(element), element.props, config3, indentation + config3.indent, depth, refs, printer2), printChildren(getChildren(element.props.children), config3, indentation + config3.indent, depth, refs, printer2), config3, indentation), test$1 = (val) => val != null && reactIsExports.isElement(val), plugin$1 = { serialize: serialize$1, test: test$1 }, testSymbol = typeof Symbol == "function" && Symbol.for ? Symbol.for("react.test.json") : 245830487;
function getPropKeys(object) {
  let { props } = object;
  return props ? Object.keys(props).filter((key) => props[key] !== void 0).sort() : [];
}
var serialize = (object, config3, indentation, depth, refs, printer2) => ++depth > config3.maxDepth ? printElementAsLeaf(object.type, config3) : printElement(object.type, object.props ? printProps(getPropKeys(object), object.props, config3, indentation + config3.indent, depth, refs, printer2) : "", object.children ? printChildren(object.children, config3, indentation + config3.indent, depth, refs, printer2) : "", config3, indentation), test2 = (val) => val && val.$$typeof === testSymbol, plugin = { serialize, test: test2 }, toString3 = Object.prototype.toString, toISOString = Date.prototype.toISOString, errorToString = Error.prototype.toString, regExpToString = RegExp.prototype.toString;
function getConstructorName2(val) {
  return typeof val.constructor == "function" && val.constructor.name || "Object";
}
function isWindow(val) {
  return typeof window < "u" && val === window;
}
var SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/, NEWLINE_REGEXP = /\n/g, PrettyFormatPluginError2 = class extends Error {
  constructor(message, stack) {
    super(message), this.stack = stack, this.name = this.constructor.name;
  }
};
function isToStringedArrayType(toStringed) {
  return toStringed === "[object Array]" || toStringed === "[object ArrayBuffer]" || toStringed === "[object DataView]" || toStringed === "[object Float32Array]" || toStringed === "[object Float64Array]" || toStringed === "[object Int8Array]" || toStringed === "[object Int16Array]" || toStringed === "[object Int32Array]" || toStringed === "[object Uint8Array]" || toStringed === "[object Uint8ClampedArray]" || toStringed === "[object Uint16Array]" || toStringed === "[object Uint32Array]";
}
function printNumber(val) {
  return Object.is(val, -0) ? "-0" : String(val);
}
function printBigInt(val) {
  return `${val}n`;
}
function printFunction(val, printFunctionName) {
  return printFunctionName ? `[Function ${val.name || "anonymous"}]` : "[Function]";
}
function printSymbol(val) {
  return String(val).replace(SYMBOL_REGEXP, "Symbol($1)");
}
function printError(val) {
  return `[${errorToString.call(val)}]`;
}
function printBasicValue(val, printFunctionName, escapeRegex, escapeString) {
  if (val === true || val === false) return `${val}`;
  if (val === void 0) return "undefined";
  if (val === null) return "null";
  let typeOf = typeof val;
  if (typeOf === "number") return printNumber(val);
  if (typeOf === "bigint") return printBigInt(val);
  if (typeOf === "string") return escapeString ? `"${val.replaceAll(/"|\\/g, "\\$&")}"` : `"${val}"`;
  if (typeOf === "function") return printFunction(val, printFunctionName);
  if (typeOf === "symbol") return printSymbol(val);
  let toStringed = toString3.call(val);
  return toStringed === "[object WeakMap]" ? "WeakMap {}" : toStringed === "[object WeakSet]" ? "WeakSet {}" : toStringed === "[object Function]" || toStringed === "[object GeneratorFunction]" ? printFunction(val, printFunctionName) : toStringed === "[object Symbol]" ? printSymbol(val) : toStringed === "[object Date]" ? Number.isNaN(+val) ? "Date { NaN }" : toISOString.call(val) : toStringed === "[object Error]" ? printError(val) : toStringed === "[object RegExp]" ? escapeRegex ? regExpToString.call(val).replaceAll(/[$()*+.?[\\\]^{|}]/g, "\\$&") : regExpToString.call(val) : val instanceof Error ? printError(val) : null;
}
function printComplexValue(val, config3, indentation, depth, refs, hasCalledToJSON) {
  if (refs.includes(val)) return "[Circular]";
  refs = [...refs], refs.push(val);
  let hitMaxDepth = ++depth > config3.maxDepth, min = config3.min;
  if (config3.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON == "function" && !hasCalledToJSON) return printer(val.toJSON(), config3, indentation, depth, refs, true);
  let toStringed = toString3.call(val);
  return toStringed === "[object Arguments]" ? hitMaxDepth ? "[Arguments]" : `${min ? "" : "Arguments "}[${printListItems(val, config3, indentation, depth, refs, printer)}]` : isToStringedArrayType(toStringed) ? hitMaxDepth ? `[${val.constructor.name}]` : `${min || !config3.printBasicPrototype && val.constructor.name === "Array" ? "" : `${val.constructor.name} `}[${printListItems(val, config3, indentation, depth, refs, printer)}]` : toStringed === "[object Map]" ? hitMaxDepth ? "[Map]" : `Map {${printIteratorEntries(val.entries(), config3, indentation, depth, refs, printer, " => ")}}` : toStringed === "[object Set]" ? hitMaxDepth ? "[Set]" : `Set {${printIteratorValues(val.values(), config3, indentation, depth, refs, printer)}}` : hitMaxDepth || isWindow(val) ? `[${getConstructorName2(val)}]` : `${min || !config3.printBasicPrototype && getConstructorName2(val) === "Object" ? "" : `${getConstructorName2(val)} `}{${printObjectProperties(val, config3, indentation, depth, refs, printer)}}`;
}
function isNewPlugin(plugin2) {
  return plugin2.serialize != null;
}
function printPlugin(plugin2, val, config3, indentation, depth, refs) {
  let printed;
  try {
    printed = isNewPlugin(plugin2) ? plugin2.serialize(val, config3, indentation, depth, refs, printer) : plugin2.print(val, (valChild) => printer(valChild, config3, indentation, depth, refs), (str) => {
      let indentationNext = indentation + config3.indent;
      return indentationNext + str.replaceAll(NEWLINE_REGEXP, `
${indentationNext}`);
    }, { edgeSpacing: config3.spacingOuter, min: config3.min, spacing: config3.spacingInner }, config3.colors);
  } catch (error) {
    throw new PrettyFormatPluginError2(error.message, error.stack);
  }
  if (typeof printed != "string") throw new TypeError(`pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`);
  return printed;
}
function findPlugin(plugins22, val) {
  for (let plugin2 of plugins22) try {
    if (plugin2.test(val)) return plugin2;
  } catch (error) {
    throw new PrettyFormatPluginError2(error.message, error.stack);
  }
  return null;
}
function printer(val, config3, indentation, depth, refs, hasCalledToJSON) {
  let plugin2 = findPlugin(config3.plugins, val);
  if (plugin2 !== null) return printPlugin(plugin2, val, config3, indentation, depth, refs);
  let basicResult = printBasicValue(val, config3.printFunctionName, config3.escapeRegex, config3.escapeString);
  return basicResult !== null ? basicResult : printComplexValue(val, config3, indentation, depth, refs, hasCalledToJSON);
}
var DEFAULT_THEME = { comment: "gray", content: "reset", prop: "yellow", tag: "cyan", value: "green" }, DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME), DEFAULT_OPTIONS = { callToJSON: true, compareKeys: void 0, escapeRegex: false, escapeString: true, highlight: false, indent: 2, maxDepth: Number.POSITIVE_INFINITY, maxWidth: Number.POSITIVE_INFINITY, min: false, plugins: [], printBasicPrototype: true, printFunctionName: true, theme: DEFAULT_THEME };
function validateOptions(options) {
  for (let key of Object.keys(options)) if (!Object.prototype.hasOwnProperty.call(DEFAULT_OPTIONS, key)) throw new Error(`pretty-format: Unknown option "${key}".`);
  if (options.min && options.indent !== void 0 && options.indent !== 0) throw new Error('pretty-format: Options "min" and "indent" cannot be used together.');
}
function getColorsHighlight() {
  return DEFAULT_THEME_KEYS.reduce((colors, key) => {
    let value = DEFAULT_THEME[key], color = value && f2[value];
    if (color && typeof color.close == "string" && typeof color.open == "string") colors[key] = color;
    else throw new Error(`pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`);
    return colors;
  }, /* @__PURE__ */ Object.create(null));
}
function getColorsEmpty() {
  return DEFAULT_THEME_KEYS.reduce((colors, key) => (colors[key] = { close: "", open: "" }, colors), /* @__PURE__ */ Object.create(null));
}
function getPrintFunctionName(options) {
  return (options == null ? void 0 : options.printFunctionName) ?? DEFAULT_OPTIONS.printFunctionName;
}
function getEscapeRegex(options) {
  return (options == null ? void 0 : options.escapeRegex) ?? DEFAULT_OPTIONS.escapeRegex;
}
function getEscapeString(options) {
  return (options == null ? void 0 : options.escapeString) ?? DEFAULT_OPTIONS.escapeString;
}
function getConfig(options) {
  return { callToJSON: (options == null ? void 0 : options.callToJSON) ?? DEFAULT_OPTIONS.callToJSON, colors: (options == null ? void 0 : options.highlight) ? getColorsHighlight() : getColorsEmpty(), compareKeys: typeof (options == null ? void 0 : options.compareKeys) == "function" || (options == null ? void 0 : options.compareKeys) === null ? options.compareKeys : DEFAULT_OPTIONS.compareKeys, escapeRegex: getEscapeRegex(options), escapeString: getEscapeString(options), indent: (options == null ? void 0 : options.min) ? "" : createIndent((options == null ? void 0 : options.indent) ?? DEFAULT_OPTIONS.indent), maxDepth: (options == null ? void 0 : options.maxDepth) ?? DEFAULT_OPTIONS.maxDepth, maxWidth: (options == null ? void 0 : options.maxWidth) ?? DEFAULT_OPTIONS.maxWidth, min: (options == null ? void 0 : options.min) ?? DEFAULT_OPTIONS.min, plugins: (options == null ? void 0 : options.plugins) ?? DEFAULT_OPTIONS.plugins, printBasicPrototype: (options == null ? void 0 : options.printBasicPrototype) ?? true, printFunctionName: getPrintFunctionName(options), spacingInner: (options == null ? void 0 : options.min) ? " " : `
`, spacingOuter: (options == null ? void 0 : options.min) ? "" : `
` };
}
function createIndent(indent) {
  return Array.from({ length: indent + 1 }).join(" ");
}
function format(val, options) {
  if (options && (validateOptions(options), options.plugins)) {
    let plugin2 = findPlugin(options.plugins, val);
    if (plugin2 !== null) return printPlugin(plugin2, val, getConfig(options), "", 0, []);
  }
  let basicResult = printBasicValue(val, getPrintFunctionName(options), getEscapeRegex(options), getEscapeString(options));
  return basicResult !== null ? basicResult : printComplexValue(val, getConfig(options), "", 0, []);
}
var plugins = { AsymmetricMatcher: plugin$5, DOMCollection: plugin$4, DOMElement: plugin$3, Immutable: plugin$2, ReactElement: plugin$1, ReactTestComponent: plugin };
var { AsymmetricMatcher, DOMCollection, DOMElement, Immutable, ReactElement, ReactTestComponent } = plugins, PLUGINS = [ReactTestComponent, ReactElement, DOMElement, DOMCollection, Immutable, AsymmetricMatcher];
function stringify(object, maxDepth = 10, { maxLength, ...options } = {}) {
  let MAX_LENGTH = maxLength ?? 1e4, result;
  try {
    result = format(object, { maxDepth, escapeString: false, plugins: PLUGINS, ...options });
  } catch {
    result = format(object, { callToJSON: false, maxDepth, escapeString: false, plugins: PLUGINS, ...options });
  }
  return result.length >= MAX_LENGTH && maxDepth > 1 ? stringify(object, Math.floor(maxDepth / 2)) : result;
}
var formatRegExp = /%[sdjifoOc%]/g;
function format2(...args) {
  if (typeof args[0] != "string") {
    let objects = [];
    for (let i2 = 0; i2 < args.length; i2++) objects.push(inspect4(args[i2], { depth: 0, colors: false }));
    return objects.join(" ");
  }
  let len = args.length, i = 1, template = args[0], str = String(template).replace(formatRegExp, (x2) => {
    if (x2 === "%%") return "%";
    if (i >= len) return x2;
    switch (x2) {
      case "%s": {
        let value = args[i++];
        return typeof value == "bigint" ? `${value.toString()}n` : typeof value == "number" && value === 0 && 1 / value < 0 ? "-0" : typeof value == "object" && value !== null ? inspect4(value, { depth: 0, colors: false }) : String(value);
      }
      case "%d": {
        let value = args[i++];
        return typeof value == "bigint" ? `${value.toString()}n` : Number(value).toString();
      }
      case "%i": {
        let value = args[i++];
        return typeof value == "bigint" ? `${value.toString()}n` : Number.parseInt(String(value)).toString();
      }
      case "%f":
        return Number.parseFloat(String(args[i++])).toString();
      case "%o":
        return inspect4(args[i++], { showHidden: true, showProxy: true });
      case "%O":
        return inspect4(args[i++]);
      case "%c":
        return i++, "";
      case "%j":
        try {
          return JSON.stringify(args[i++]);
        } catch (err) {
          let m2 = err.message;
          if (m2.includes("circular structure") || m2.includes("cyclic structures") || m2.includes("cyclic object")) return "[Circular]";
          throw err;
        }
      default:
        return x2;
    }
  });
  for (let x2 = args[i]; i < len; x2 = args[++i]) x2 === null || typeof x2 != "object" ? str += ` ${x2}` : str += ` ${inspect4(x2)}`;
  return str;
}
function inspect4(obj, options = {}) {
  return options.truncate === 0 && (options.truncate = Number.POSITIVE_INFINITY), inspect3(obj, options);
}
var LineTerminatorSequence;
LineTerminatorSequence = /\r?\n|[\r\u2028\u2029]/y;
RegExp(LineTerminatorSequence.source);
var reservedWords = { keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"], strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"] };
new Set(reservedWords.keyword);
new Set(reservedWords.strict);
function getType3(value) {
  if (value === void 0) return "undefined";
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value == "boolean") return "boolean";
  if (typeof value == "function") return "function";
  if (typeof value == "number") return "number";
  if (typeof value == "string") return "string";
  if (typeof value == "bigint") return "bigint";
  if (typeof value == "object") {
    if (value != null) {
      if (value.constructor === RegExp) return "regexp";
      if (value.constructor === Map) return "map";
      if (value.constructor === Set) return "set";
      if (value.constructor === Date) return "date";
    }
    return "object";
  } else if (typeof value == "symbol") return "symbol";
  throw new Error(`value of unknown type: ${value}`);
}
var DIFF_DELETE = -1, DIFF_INSERT = 1, DIFF_EQUAL = 0, Diff2 = class {
  constructor(op, text) {
    __publicField(this, 0);
    __publicField(this, 1);
    this[0] = op, this[1] = text;
  }
}, diff_commonPrefix = function(text1, text2) {
  if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) return 0;
  let pointermin = 0, pointermax = Math.min(text1.length, text2.length), pointermid = pointermax, pointerstart = 0;
  for (; pointermin < pointermid; ) text1.substring(pointerstart, pointermid) === text2.substring(pointerstart, pointermid) ? (pointermin = pointermid, pointerstart = pointermin) : pointermax = pointermid, pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  return pointermid;
}, diff_commonSuffix = function(text1, text2) {
  if (!text1 || !text2 || text1.charAt(text1.length - 1) !== text2.charAt(text2.length - 1)) return 0;
  let pointermin = 0, pointermax = Math.min(text1.length, text2.length), pointermid = pointermax, pointerend = 0;
  for (; pointermin < pointermid; ) text1.substring(text1.length - pointermid, text1.length - pointerend) === text2.substring(text2.length - pointermid, text2.length - pointerend) ? (pointermin = pointermid, pointerend = pointermin) : pointermax = pointermid, pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  return pointermid;
}, diff_commonOverlap_ = function(text1, text2) {
  let text1_length = text1.length, text2_length = text2.length;
  if (text1_length === 0 || text2_length === 0) return 0;
  text1_length > text2_length ? text1 = text1.substring(text1_length - text2_length) : text1_length < text2_length && (text2 = text2.substring(0, text1_length));
  let text_length = Math.min(text1_length, text2_length);
  if (text1 === text2) return text_length;
  let best = 0, length = 1;
  for (; ; ) {
    let pattern = text1.substring(text_length - length), found = text2.indexOf(pattern);
    if (found === -1) return best;
    length += found, (found === 0 || text1.substring(text_length - length) === text2.substring(0, length)) && (best = length, length++);
  }
}, diff_cleanupSemantic = function(diffs) {
  let changes = false, equalities = [], equalitiesLength = 0, lastEquality = null, pointer3 = 0, length_insertions1 = 0, length_deletions1 = 0, length_insertions2 = 0, length_deletions2 = 0;
  for (; pointer3 < diffs.length; ) diffs[pointer3][0] === DIFF_EQUAL ? (equalities[equalitiesLength++] = pointer3, length_insertions1 = length_insertions2, length_deletions1 = length_deletions2, length_insertions2 = 0, length_deletions2 = 0, lastEquality = diffs[pointer3][1]) : (diffs[pointer3][0] === DIFF_INSERT ? length_insertions2 += diffs[pointer3][1].length : length_deletions2 += diffs[pointer3][1].length, lastEquality && lastEquality.length <= Math.max(length_insertions1, length_deletions1) && lastEquality.length <= Math.max(length_insertions2, length_deletions2) && (diffs.splice(equalities[equalitiesLength - 1], 0, new Diff2(DIFF_DELETE, lastEquality)), diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT, equalitiesLength--, equalitiesLength--, pointer3 = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1, length_insertions1 = 0, length_deletions1 = 0, length_insertions2 = 0, length_deletions2 = 0, lastEquality = null, changes = true)), pointer3++;
  for (changes && diff_cleanupMerge(diffs), diff_cleanupSemanticLossless(diffs), pointer3 = 1; pointer3 < diffs.length; ) {
    if (diffs[pointer3 - 1][0] === DIFF_DELETE && diffs[pointer3][0] === DIFF_INSERT) {
      let deletion = diffs[pointer3 - 1][1], insertion = diffs[pointer3][1], overlap_length1 = diff_commonOverlap_(deletion, insertion), overlap_length2 = diff_commonOverlap_(insertion, deletion);
      overlap_length1 >= overlap_length2 ? (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) && (diffs.splice(pointer3, 0, new Diff2(DIFF_EQUAL, insertion.substring(0, overlap_length1))), diffs[pointer3 - 1][1] = deletion.substring(0, deletion.length - overlap_length1), diffs[pointer3 + 1][1] = insertion.substring(overlap_length1), pointer3++) : (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) && (diffs.splice(pointer3, 0, new Diff2(DIFF_EQUAL, deletion.substring(0, overlap_length2))), diffs[pointer3 - 1][0] = DIFF_INSERT, diffs[pointer3 - 1][1] = insertion.substring(0, insertion.length - overlap_length2), diffs[pointer3 + 1][0] = DIFF_DELETE, diffs[pointer3 + 1][1] = deletion.substring(overlap_length2), pointer3++), pointer3++;
    }
    pointer3++;
  }
}, nonAlphaNumericRegex_ = /[^a-z0-9]/i, whitespaceRegex_ = /\s/, linebreakRegex_ = /[\r\n]/, blanklineEndRegex_ = /\n\r?\n$/, blanklineStartRegex_ = /^\r?\n\r?\n/;
function diff_cleanupSemanticLossless(diffs) {
  function diff_cleanupSemanticScore_2(one, two) {
    if (!one || !two) return 6;
    let char1 = one.charAt(one.length - 1), char2 = two.charAt(0), nonAlphaNumeric1 = char1.match(nonAlphaNumericRegex_), nonAlphaNumeric2 = char2.match(nonAlphaNumericRegex_), whitespace1 = nonAlphaNumeric1 && char1.match(whitespaceRegex_), whitespace2 = nonAlphaNumeric2 && char2.match(whitespaceRegex_), lineBreak1 = whitespace1 && char1.match(linebreakRegex_), lineBreak2 = whitespace2 && char2.match(linebreakRegex_), blankLine1 = lineBreak1 && one.match(blanklineEndRegex_), blankLine2 = lineBreak2 && two.match(blanklineStartRegex_);
    return blankLine1 || blankLine2 ? 5 : lineBreak1 || lineBreak2 ? 4 : nonAlphaNumeric1 && !whitespace1 && whitespace2 ? 3 : whitespace1 || whitespace2 ? 2 : nonAlphaNumeric1 || nonAlphaNumeric2 ? 1 : 0;
  }
  let pointer3 = 1;
  for (; pointer3 < diffs.length - 1; ) {
    if (diffs[pointer3 - 1][0] === DIFF_EQUAL && diffs[pointer3 + 1][0] === DIFF_EQUAL) {
      let equality1 = diffs[pointer3 - 1][1], edit = diffs[pointer3][1], equality2 = diffs[pointer3 + 1][1], commonOffset = diff_commonSuffix(equality1, edit);
      if (commonOffset) {
        let commonString = edit.substring(edit.length - commonOffset);
        equality1 = equality1.substring(0, equality1.length - commonOffset), edit = commonString + edit.substring(0, edit.length - commonOffset), equality2 = commonString + equality2;
      }
      let bestEquality1 = equality1, bestEdit = edit, bestEquality2 = equality2, bestScore = diff_cleanupSemanticScore_2(equality1, edit) + diff_cleanupSemanticScore_2(edit, equality2);
      for (; edit.charAt(0) === equality2.charAt(0); ) {
        equality1 += edit.charAt(0), edit = edit.substring(1) + equality2.charAt(0), equality2 = equality2.substring(1);
        let score = diff_cleanupSemanticScore_2(equality1, edit) + diff_cleanupSemanticScore_2(edit, equality2);
        score >= bestScore && (bestScore = score, bestEquality1 = equality1, bestEdit = edit, bestEquality2 = equality2);
      }
      diffs[pointer3 - 1][1] !== bestEquality1 && (bestEquality1 ? diffs[pointer3 - 1][1] = bestEquality1 : (diffs.splice(pointer3 - 1, 1), pointer3--), diffs[pointer3][1] = bestEdit, bestEquality2 ? diffs[pointer3 + 1][1] = bestEquality2 : (diffs.splice(pointer3 + 1, 1), pointer3--));
    }
    pointer3++;
  }
}
function diff_cleanupMerge(diffs) {
  diffs.push(new Diff2(DIFF_EQUAL, ""));
  let pointer3 = 0, count_delete = 0, count_insert = 0, text_delete = "", text_insert = "", commonlength;
  for (; pointer3 < diffs.length; ) switch (diffs[pointer3][0]) {
    case DIFF_INSERT:
      count_insert++, text_insert += diffs[pointer3][1], pointer3++;
      break;
    case DIFF_DELETE:
      count_delete++, text_delete += diffs[pointer3][1], pointer3++;
      break;
    case DIFF_EQUAL:
      count_delete + count_insert > 1 ? (count_delete !== 0 && count_insert !== 0 && (commonlength = diff_commonPrefix(text_insert, text_delete), commonlength !== 0 && (pointer3 - count_delete - count_insert > 0 && diffs[pointer3 - count_delete - count_insert - 1][0] === DIFF_EQUAL ? diffs[pointer3 - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength) : (diffs.splice(0, 0, new Diff2(DIFF_EQUAL, text_insert.substring(0, commonlength))), pointer3++), text_insert = text_insert.substring(commonlength), text_delete = text_delete.substring(commonlength)), commonlength = diff_commonSuffix(text_insert, text_delete), commonlength !== 0 && (diffs[pointer3][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer3][1], text_insert = text_insert.substring(0, text_insert.length - commonlength), text_delete = text_delete.substring(0, text_delete.length - commonlength))), pointer3 -= count_delete + count_insert, diffs.splice(pointer3, count_delete + count_insert), text_delete.length && (diffs.splice(pointer3, 0, new Diff2(DIFF_DELETE, text_delete)), pointer3++), text_insert.length && (diffs.splice(pointer3, 0, new Diff2(DIFF_INSERT, text_insert)), pointer3++), pointer3++) : pointer3 !== 0 && diffs[pointer3 - 1][0] === DIFF_EQUAL ? (diffs[pointer3 - 1][1] += diffs[pointer3][1], diffs.splice(pointer3, 1)) : pointer3++, count_insert = 0, count_delete = 0, text_delete = "", text_insert = "";
      break;
  }
  diffs[diffs.length - 1][1] === "" && diffs.pop();
  let changes = false;
  for (pointer3 = 1; pointer3 < diffs.length - 1; ) diffs[pointer3 - 1][0] === DIFF_EQUAL && diffs[pointer3 + 1][0] === DIFF_EQUAL && (diffs[pointer3][1].substring(diffs[pointer3][1].length - diffs[pointer3 - 1][1].length) === diffs[pointer3 - 1][1] ? (diffs[pointer3][1] = diffs[pointer3 - 1][1] + diffs[pointer3][1].substring(0, diffs[pointer3][1].length - diffs[pointer3 - 1][1].length), diffs[pointer3 + 1][1] = diffs[pointer3 - 1][1] + diffs[pointer3 + 1][1], diffs.splice(pointer3 - 1, 1), changes = true) : diffs[pointer3][1].substring(0, diffs[pointer3 + 1][1].length) === diffs[pointer3 + 1][1] && (diffs[pointer3 - 1][1] += diffs[pointer3 + 1][1], diffs[pointer3][1] = diffs[pointer3][1].substring(diffs[pointer3 + 1][1].length) + diffs[pointer3 + 1][1], diffs.splice(pointer3 + 1, 1), changes = true)), pointer3++;
  changes && diff_cleanupMerge(diffs);
}
var NO_DIFF_MESSAGE = "Compared values have no visual difference.", SIMILAR_MESSAGE = "Compared values serialize to the same structure.\nPrinting internal object structure without calling `toJSON` instead.", build = {};
Object.defineProperty(build, "__esModule", { value: true });
var _default = build.default = diffSequence, pkg = "diff-sequences", NOT_YET_SET = 0, countCommonItemsF = (aIndex, aEnd, bIndex, bEnd, isCommon) => {
  let nCommon = 0;
  for (; aIndex < aEnd && bIndex < bEnd && isCommon(aIndex, bIndex); ) aIndex += 1, bIndex += 1, nCommon += 1;
  return nCommon;
}, countCommonItemsR = (aStart, aIndex, bStart, bIndex, isCommon) => {
  let nCommon = 0;
  for (; aStart <= aIndex && bStart <= bIndex && isCommon(aIndex, bIndex); ) aIndex -= 1, bIndex -= 1, nCommon += 1;
  return nCommon;
}, extendPathsF = (d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF) => {
  let iF = 0, kF = -d2, aFirst = aIndexesF[iF], aIndexPrev1 = aFirst;
  aIndexesF[iF] += countCommonItemsF(aFirst + 1, aEnd, bF + aFirst - kF + 1, bEnd, isCommon);
  let nF = d2 < iMaxF ? d2 : iMaxF;
  for (iF += 1, kF += 2; iF <= nF; iF += 1, kF += 2) {
    if (iF !== d2 && aIndexPrev1 < aIndexesF[iF]) aFirst = aIndexesF[iF];
    else if (aFirst = aIndexPrev1 + 1, aEnd <= aFirst) return iF - 1;
    aIndexPrev1 = aIndexesF[iF], aIndexesF[iF] = aFirst + countCommonItemsF(aFirst + 1, aEnd, bF + aFirst - kF + 1, bEnd, isCommon);
  }
  return iMaxF;
}, extendPathsR = (d2, aStart, bStart, bR, isCommon, aIndexesR, iMaxR) => {
  let iR = 0, kR = d2, aFirst = aIndexesR[iR], aIndexPrev1 = aFirst;
  aIndexesR[iR] -= countCommonItemsR(aStart, aFirst - 1, bStart, bR + aFirst - kR - 1, isCommon);
  let nR = d2 < iMaxR ? d2 : iMaxR;
  for (iR += 1, kR -= 2; iR <= nR; iR += 1, kR -= 2) {
    if (iR !== d2 && aIndexesR[iR] < aIndexPrev1) aFirst = aIndexesR[iR];
    else if (aFirst = aIndexPrev1 - 1, aFirst < aStart) return iR - 1;
    aIndexPrev1 = aIndexesR[iR], aIndexesR[iR] = aFirst - countCommonItemsR(aStart, aFirst - 1, bStart, bR + aFirst - kR - 1, isCommon);
  }
  return iMaxR;
}, extendOverlappablePathsF = (d2, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division) => {
  let bF = bStart - aStart, aLength = aEnd - aStart, baDeltaLength = bEnd - bStart - aLength, kMinOverlapF = -baDeltaLength - (d2 - 1), kMaxOverlapF = -baDeltaLength + (d2 - 1), aIndexPrev1 = NOT_YET_SET, nF = d2 < iMaxF ? d2 : iMaxF;
  for (let iF = 0, kF = -d2; iF <= nF; iF += 1, kF += 2) {
    let insert = iF === 0 || iF !== d2 && aIndexPrev1 < aIndexesF[iF], aLastPrev = insert ? aIndexesF[iF] : aIndexPrev1, aFirst = insert ? aLastPrev : aLastPrev + 1, bFirst = bF + aFirst - kF, nCommonF = countCommonItemsF(aFirst + 1, aEnd, bFirst + 1, bEnd, isCommon), aLast = aFirst + nCommonF;
    if (aIndexPrev1 = aIndexesF[iF], aIndexesF[iF] = aLast, kMinOverlapF <= kF && kF <= kMaxOverlapF) {
      let iR = (d2 - 1 - (kF + baDeltaLength)) / 2;
      if (iR <= iMaxR && aIndexesR[iR] - 1 <= aLast) {
        let bLastPrev = bF + aLastPrev - (insert ? kF + 1 : kF - 1), nCommonR = countCommonItemsR(aStart, aLastPrev, bStart, bLastPrev, isCommon), aIndexPrevFirst = aLastPrev - nCommonR, bIndexPrevFirst = bLastPrev - nCommonR, aEndPreceding = aIndexPrevFirst + 1, bEndPreceding = bIndexPrevFirst + 1;
        division.nChangePreceding = d2 - 1, d2 - 1 === aEndPreceding + bEndPreceding - aStart - bStart ? (division.aEndPreceding = aStart, division.bEndPreceding = bStart) : (division.aEndPreceding = aEndPreceding, division.bEndPreceding = bEndPreceding), division.nCommonPreceding = nCommonR, nCommonR !== 0 && (division.aCommonPreceding = aEndPreceding, division.bCommonPreceding = bEndPreceding), division.nCommonFollowing = nCommonF, nCommonF !== 0 && (division.aCommonFollowing = aFirst + 1, division.bCommonFollowing = bFirst + 1);
        let aStartFollowing = aLast + 1, bStartFollowing = bFirst + nCommonF + 1;
        return division.nChangeFollowing = d2 - 1, d2 - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing ? (division.aStartFollowing = aEnd, division.bStartFollowing = bEnd) : (division.aStartFollowing = aStartFollowing, division.bStartFollowing = bStartFollowing), true;
      }
    }
  }
  return false;
}, extendOverlappablePathsR = (d2, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division) => {
  let bR = bEnd - aEnd, aLength = aEnd - aStart, baDeltaLength = bEnd - bStart - aLength, kMinOverlapR = baDeltaLength - d2, kMaxOverlapR = baDeltaLength + d2, aIndexPrev1 = NOT_YET_SET, nR = d2 < iMaxR ? d2 : iMaxR;
  for (let iR = 0, kR = d2; iR <= nR; iR += 1, kR -= 2) {
    let insert = iR === 0 || iR !== d2 && aIndexesR[iR] < aIndexPrev1, aLastPrev = insert ? aIndexesR[iR] : aIndexPrev1, aFirst = insert ? aLastPrev : aLastPrev - 1, bFirst = bR + aFirst - kR, nCommonR = countCommonItemsR(aStart, aFirst - 1, bStart, bFirst - 1, isCommon), aLast = aFirst - nCommonR;
    if (aIndexPrev1 = aIndexesR[iR], aIndexesR[iR] = aLast, kMinOverlapR <= kR && kR <= kMaxOverlapR) {
      let iF = (d2 + (kR - baDeltaLength)) / 2;
      if (iF <= iMaxF && aLast - 1 <= aIndexesF[iF]) {
        let bLast = bFirst - nCommonR;
        if (division.nChangePreceding = d2, d2 === aLast + bLast - aStart - bStart ? (division.aEndPreceding = aStart, division.bEndPreceding = bStart) : (division.aEndPreceding = aLast, division.bEndPreceding = bLast), division.nCommonPreceding = nCommonR, nCommonR !== 0 && (division.aCommonPreceding = aLast, division.bCommonPreceding = bLast), division.nChangeFollowing = d2 - 1, d2 === 1) division.nCommonFollowing = 0, division.aStartFollowing = aEnd, division.bStartFollowing = bEnd;
        else {
          let bLastPrev = bR + aLastPrev - (insert ? kR - 1 : kR + 1), nCommonF = countCommonItemsF(aLastPrev, aEnd, bLastPrev, bEnd, isCommon);
          division.nCommonFollowing = nCommonF, nCommonF !== 0 && (division.aCommonFollowing = aLastPrev, division.bCommonFollowing = bLastPrev);
          let aStartFollowing = aLastPrev + nCommonF, bStartFollowing = bLastPrev + nCommonF;
          d2 - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing ? (division.aStartFollowing = aEnd, division.bStartFollowing = bEnd) : (division.aStartFollowing = aStartFollowing, division.bStartFollowing = bStartFollowing);
        }
        return true;
      }
    }
  }
  return false;
}, divide = (nChange, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, aIndexesR, division) => {
  let bF = bStart - aStart, bR = bEnd - aEnd, aLength = aEnd - aStart, bLength = bEnd - bStart, baDeltaLength = bLength - aLength, iMaxF = aLength, iMaxR = aLength;
  if (aIndexesF[0] = aStart - 1, aIndexesR[0] = aEnd, baDeltaLength % 2 === 0) {
    let dMin = (nChange || baDeltaLength) / 2, dMax = (aLength + bLength) / 2;
    for (let d2 = 1; d2 <= dMax; d2 += 1) if (iMaxF = extendPathsF(d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF), d2 < dMin) iMaxR = extendPathsR(d2, aStart, bStart, bR, isCommon, aIndexesR, iMaxR);
    else if (extendOverlappablePathsR(d2, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division)) return;
  } else {
    let dMin = ((nChange || baDeltaLength) + 1) / 2, dMax = (aLength + bLength + 1) / 2, d2 = 1;
    for (iMaxF = extendPathsF(d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF), d2 += 1; d2 <= dMax; d2 += 1) if (iMaxR = extendPathsR(d2 - 1, aStart, bStart, bR, isCommon, aIndexesR, iMaxR), d2 < dMin) iMaxF = extendPathsF(d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
    else if (extendOverlappablePathsF(d2, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division)) return;
  }
  throw new Error(`${pkg}: no overlap aStart=${aStart} aEnd=${aEnd} bStart=${bStart} bEnd=${bEnd}`);
}, findSubsequences = (nChange, aStart, aEnd, bStart, bEnd, transposed, callbacks, aIndexesF, aIndexesR, division) => {
  if (bEnd - bStart < aEnd - aStart) {
    if (transposed = !transposed, transposed && callbacks.length === 1) {
      let { foundSubsequence: foundSubsequence2, isCommon: isCommon2 } = callbacks[0];
      callbacks[1] = { foundSubsequence: (nCommon, bCommon, aCommon) => {
        foundSubsequence2(nCommon, aCommon, bCommon);
      }, isCommon: (bIndex, aIndex) => isCommon2(aIndex, bIndex) };
    }
    let tStart = aStart, tEnd = aEnd;
    aStart = bStart, aEnd = bEnd, bStart = tStart, bEnd = tEnd;
  }
  let { foundSubsequence, isCommon } = callbacks[transposed ? 1 : 0];
  divide(nChange, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, aIndexesR, division);
  let { nChangePreceding, aEndPreceding, bEndPreceding, nCommonPreceding, aCommonPreceding, bCommonPreceding, nCommonFollowing, aCommonFollowing, bCommonFollowing, nChangeFollowing, aStartFollowing, bStartFollowing } = division;
  aStart < aEndPreceding && bStart < bEndPreceding && findSubsequences(nChangePreceding, aStart, aEndPreceding, bStart, bEndPreceding, transposed, callbacks, aIndexesF, aIndexesR, division), nCommonPreceding !== 0 && foundSubsequence(nCommonPreceding, aCommonPreceding, bCommonPreceding), nCommonFollowing !== 0 && foundSubsequence(nCommonFollowing, aCommonFollowing, bCommonFollowing), aStartFollowing < aEnd && bStartFollowing < bEnd && findSubsequences(nChangeFollowing, aStartFollowing, aEnd, bStartFollowing, bEnd, transposed, callbacks, aIndexesF, aIndexesR, division);
}, validateLength = (name, arg) => {
  if (typeof arg != "number") throw new TypeError(`${pkg}: ${name} typeof ${typeof arg} is not a number`);
  if (!Number.isSafeInteger(arg)) throw new RangeError(`${pkg}: ${name} value ${arg} is not a safe integer`);
  if (arg < 0) throw new RangeError(`${pkg}: ${name} value ${arg} is a negative integer`);
}, validateCallback = (name, arg) => {
  let type5 = typeof arg;
  if (type5 !== "function") throw new TypeError(`${pkg}: ${name} typeof ${type5} is not a function`);
};
function diffSequence(aLength, bLength, isCommon, foundSubsequence) {
  validateLength("aLength", aLength), validateLength("bLength", bLength), validateCallback("isCommon", isCommon), validateCallback("foundSubsequence", foundSubsequence);
  let nCommonF = countCommonItemsF(0, aLength, 0, bLength, isCommon);
  if (nCommonF !== 0 && foundSubsequence(nCommonF, 0, 0), aLength !== nCommonF || bLength !== nCommonF) {
    let aStart = nCommonF, bStart = nCommonF, nCommonR = countCommonItemsR(aStart, aLength - 1, bStart, bLength - 1, isCommon), aEnd = aLength - nCommonR, bEnd = bLength - nCommonR, nCommonFR = nCommonF + nCommonR;
    aLength !== nCommonFR && bLength !== nCommonFR && findSubsequences(0, aStart, aEnd, bStart, bEnd, false, [{ foundSubsequence, isCommon }], [NOT_YET_SET], [NOT_YET_SET], { aCommonFollowing: NOT_YET_SET, aCommonPreceding: NOT_YET_SET, aEndPreceding: NOT_YET_SET, aStartFollowing: NOT_YET_SET, bCommonFollowing: NOT_YET_SET, bCommonPreceding: NOT_YET_SET, bEndPreceding: NOT_YET_SET, bStartFollowing: NOT_YET_SET, nChangeFollowing: NOT_YET_SET, nChangePreceding: NOT_YET_SET, nCommonFollowing: NOT_YET_SET, nCommonPreceding: NOT_YET_SET }), nCommonR !== 0 && foundSubsequence(nCommonR, aEnd, bEnd);
  }
}
function formatTrailingSpaces(line, trailingSpaceFormatter) {
  return line.replace(/\s+$/, (match) => trailingSpaceFormatter(match));
}
function printDiffLine(line, isFirstOrLast, color, indicator, trailingSpaceFormatter, emptyFirstOrLastLinePlaceholder) {
  return line.length !== 0 ? color(`${indicator} ${formatTrailingSpaces(line, trailingSpaceFormatter)}`) : indicator !== " " ? color(indicator) : isFirstOrLast && emptyFirstOrLastLinePlaceholder.length !== 0 ? color(`${indicator} ${emptyFirstOrLastLinePlaceholder}`) : "";
}
function printDeleteLine(line, isFirstOrLast, { aColor, aIndicator, changeLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder }) {
  return printDiffLine(line, isFirstOrLast, aColor, aIndicator, changeLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder);
}
function printInsertLine(line, isFirstOrLast, { bColor, bIndicator, changeLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder }) {
  return printDiffLine(line, isFirstOrLast, bColor, bIndicator, changeLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder);
}
function printCommonLine(line, isFirstOrLast, { commonColor, commonIndicator, commonLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder }) {
  return printDiffLine(line, isFirstOrLast, commonColor, commonIndicator, commonLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder);
}
function createPatchMark(aStart, aEnd, bStart, bEnd, { patchColor }) {
  return patchColor(`@@ -${aStart + 1},${aEnd - aStart} +${bStart + 1},${bEnd - bStart} @@`);
}
function joinAlignedDiffsNoExpand(diffs, options) {
  let iLength = diffs.length, nContextLines = options.contextLines, nContextLines2 = nContextLines + nContextLines, jLength = iLength, hasExcessAtStartOrEnd = false, nExcessesBetweenChanges = 0, i = 0;
  for (; i !== iLength; ) {
    let iStart = i;
    for (; i !== iLength && diffs[i][0] === DIFF_EQUAL; ) i += 1;
    if (iStart !== i) if (iStart === 0) i > nContextLines && (jLength -= i - nContextLines, hasExcessAtStartOrEnd = true);
    else if (i === iLength) {
      let n = i - iStart;
      n > nContextLines && (jLength -= n - nContextLines, hasExcessAtStartOrEnd = true);
    } else {
      let n = i - iStart;
      n > nContextLines2 && (jLength -= n - nContextLines2, nExcessesBetweenChanges += 1);
    }
    for (; i !== iLength && diffs[i][0] !== DIFF_EQUAL; ) i += 1;
  }
  let hasPatch = nExcessesBetweenChanges !== 0 || hasExcessAtStartOrEnd;
  nExcessesBetweenChanges !== 0 ? jLength += nExcessesBetweenChanges + 1 : hasExcessAtStartOrEnd && (jLength += 1);
  let jLast = jLength - 1, lines = [], jPatchMark = 0;
  hasPatch && lines.push("");
  let aStart = 0, bStart = 0, aEnd = 0, bEnd = 0, pushCommonLine = (line) => {
    let j = lines.length;
    lines.push(printCommonLine(line, j === 0 || j === jLast, options)), aEnd += 1, bEnd += 1;
  }, pushDeleteLine = (line) => {
    let j = lines.length;
    lines.push(printDeleteLine(line, j === 0 || j === jLast, options)), aEnd += 1;
  }, pushInsertLine = (line) => {
    let j = lines.length;
    lines.push(printInsertLine(line, j === 0 || j === jLast, options)), bEnd += 1;
  };
  for (i = 0; i !== iLength; ) {
    let iStart = i;
    for (; i !== iLength && diffs[i][0] === DIFF_EQUAL; ) i += 1;
    if (iStart !== i) if (iStart === 0) {
      i > nContextLines && (iStart = i - nContextLines, aStart = iStart, bStart = iStart, aEnd = aStart, bEnd = bStart);
      for (let iCommon = iStart; iCommon !== i; iCommon += 1) pushCommonLine(diffs[iCommon][1]);
    } else if (i === iLength) {
      let iEnd = i - iStart > nContextLines ? iStart + nContextLines : i;
      for (let iCommon = iStart; iCommon !== iEnd; iCommon += 1) pushCommonLine(diffs[iCommon][1]);
    } else {
      let nCommon = i - iStart;
      if (nCommon > nContextLines2) {
        let iEnd = iStart + nContextLines;
        for (let iCommon = iStart; iCommon !== iEnd; iCommon += 1) pushCommonLine(diffs[iCommon][1]);
        lines[jPatchMark] = createPatchMark(aStart, aEnd, bStart, bEnd, options), jPatchMark = lines.length, lines.push("");
        let nOmit = nCommon - nContextLines2;
        aStart = aEnd + nOmit, bStart = bEnd + nOmit, aEnd = aStart, bEnd = bStart;
        for (let iCommon = i - nContextLines; iCommon !== i; iCommon += 1) pushCommonLine(diffs[iCommon][1]);
      } else for (let iCommon = iStart; iCommon !== i; iCommon += 1) pushCommonLine(diffs[iCommon][1]);
    }
    for (; i !== iLength && diffs[i][0] === DIFF_DELETE; ) pushDeleteLine(diffs[i][1]), i += 1;
    for (; i !== iLength && diffs[i][0] === DIFF_INSERT; ) pushInsertLine(diffs[i][1]), i += 1;
  }
  return hasPatch && (lines[jPatchMark] = createPatchMark(aStart, aEnd, bStart, bEnd, options)), lines.join(`
`);
}
function joinAlignedDiffsExpand(diffs, options) {
  return diffs.map((diff2, i, diffs2) => {
    let line = diff2[1], isFirstOrLast = i === 0 || i === diffs2.length - 1;
    switch (diff2[0]) {
      case DIFF_DELETE:
        return printDeleteLine(line, isFirstOrLast, options);
      case DIFF_INSERT:
        return printInsertLine(line, isFirstOrLast, options);
      default:
        return printCommonLine(line, isFirstOrLast, options);
    }
  }).join(`
`);
}
var noColor = (string) => string, DIFF_CONTEXT_DEFAULT = 5, DIFF_TRUNCATE_THRESHOLD_DEFAULT = 0;
function getDefaultOptions() {
  return { aAnnotation: "Expected", aColor: f2.green, aIndicator: "-", bAnnotation: "Received", bColor: f2.red, bIndicator: "+", changeColor: f2.inverse, changeLineTrailingSpaceColor: noColor, commonColor: f2.dim, commonIndicator: " ", commonLineTrailingSpaceColor: noColor, compareKeys: void 0, contextLines: DIFF_CONTEXT_DEFAULT, emptyFirstOrLastLinePlaceholder: "", expand: true, includeChangeCounts: false, omitAnnotationLines: false, patchColor: f2.yellow, truncateThreshold: DIFF_TRUNCATE_THRESHOLD_DEFAULT, truncateAnnotation: "... Diff result is truncated", truncateAnnotationColor: noColor };
}
function getCompareKeys(compareKeys) {
  return compareKeys && typeof compareKeys == "function" ? compareKeys : void 0;
}
function getContextLines(contextLines) {
  return typeof contextLines == "number" && Number.isSafeInteger(contextLines) && contextLines >= 0 ? contextLines : DIFF_CONTEXT_DEFAULT;
}
function normalizeDiffOptions(options = {}) {
  return { ...getDefaultOptions(), ...options, compareKeys: getCompareKeys(options.compareKeys), contextLines: getContextLines(options.contextLines) };
}
function isEmptyString(lines) {
  return lines.length === 1 && lines[0].length === 0;
}
function countChanges(diffs) {
  let a2 = 0, b = 0;
  return diffs.forEach((diff2) => {
    switch (diff2[0]) {
      case DIFF_DELETE:
        a2 += 1;
        break;
      case DIFF_INSERT:
        b += 1;
        break;
    }
  }), { a: a2, b };
}
function printAnnotation({ aAnnotation, aColor, aIndicator, bAnnotation, bColor, bIndicator, includeChangeCounts, omitAnnotationLines }, changeCounts) {
  if (omitAnnotationLines) return "";
  let aRest = "", bRest = "";
  if (includeChangeCounts) {
    let aCount = String(changeCounts.a), bCount = String(changeCounts.b), baAnnotationLengthDiff = bAnnotation.length - aAnnotation.length, aAnnotationPadding = " ".repeat(Math.max(0, baAnnotationLengthDiff)), bAnnotationPadding = " ".repeat(Math.max(0, -baAnnotationLengthDiff)), baCountLengthDiff = bCount.length - aCount.length, aCountPadding = " ".repeat(Math.max(0, baCountLengthDiff)), bCountPadding = " ".repeat(Math.max(0, -baCountLengthDiff));
    aRest = `${aAnnotationPadding}  ${aIndicator} ${aCountPadding}${aCount}`, bRest = `${bAnnotationPadding}  ${bIndicator} ${bCountPadding}${bCount}`;
  }
  let a2 = `${aIndicator} ${aAnnotation}${aRest}`, b = `${bIndicator} ${bAnnotation}${bRest}`;
  return `${aColor(a2)}
${bColor(b)}

`;
}
function printDiffLines(diffs, truncated, options) {
  return printAnnotation(options, countChanges(diffs)) + (options.expand ? joinAlignedDiffsExpand(diffs, options) : joinAlignedDiffsNoExpand(diffs, options)) + (truncated ? options.truncateAnnotationColor(`
${options.truncateAnnotation}`) : "");
}
function diffLinesUnified(aLines, bLines, options) {
  let normalizedOptions = normalizeDiffOptions(options), [diffs, truncated] = diffLinesRaw(isEmptyString(aLines) ? [] : aLines, isEmptyString(bLines) ? [] : bLines, normalizedOptions);
  return printDiffLines(diffs, truncated, normalizedOptions);
}
function diffLinesUnified2(aLinesDisplay, bLinesDisplay, aLinesCompare, bLinesCompare, options) {
  if (isEmptyString(aLinesDisplay) && isEmptyString(aLinesCompare) && (aLinesDisplay = [], aLinesCompare = []), isEmptyString(bLinesDisplay) && isEmptyString(bLinesCompare) && (bLinesDisplay = [], bLinesCompare = []), aLinesDisplay.length !== aLinesCompare.length || bLinesDisplay.length !== bLinesCompare.length) return diffLinesUnified(aLinesDisplay, bLinesDisplay, options);
  let [diffs, truncated] = diffLinesRaw(aLinesCompare, bLinesCompare, options), aIndex = 0, bIndex = 0;
  return diffs.forEach((diff2) => {
    switch (diff2[0]) {
      case DIFF_DELETE:
        diff2[1] = aLinesDisplay[aIndex], aIndex += 1;
        break;
      case DIFF_INSERT:
        diff2[1] = bLinesDisplay[bIndex], bIndex += 1;
        break;
      default:
        diff2[1] = bLinesDisplay[bIndex], aIndex += 1, bIndex += 1;
    }
  }), printDiffLines(diffs, truncated, normalizeDiffOptions(options));
}
function diffLinesRaw(aLines, bLines, options) {
  let truncate3 = (options == null ? void 0 : options.truncateThreshold) ?? false, truncateThreshold = Math.max(Math.floor((options == null ? void 0 : options.truncateThreshold) ?? 0), 0), aLength = truncate3 ? Math.min(aLines.length, truncateThreshold) : aLines.length, bLength = truncate3 ? Math.min(bLines.length, truncateThreshold) : bLines.length, truncated = aLength !== aLines.length || bLength !== bLines.length, isCommon = (aIndex2, bIndex2) => aLines[aIndex2] === bLines[bIndex2], diffs = [], aIndex = 0, bIndex = 0;
  for (_default(aLength, bLength, isCommon, (nCommon, aCommon, bCommon) => {
    for (; aIndex !== aCommon; aIndex += 1) diffs.push(new Diff2(DIFF_DELETE, aLines[aIndex]));
    for (; bIndex !== bCommon; bIndex += 1) diffs.push(new Diff2(DIFF_INSERT, bLines[bIndex]));
    for (; nCommon !== 0; nCommon -= 1, aIndex += 1, bIndex += 1) diffs.push(new Diff2(DIFF_EQUAL, bLines[bIndex]));
  }); aIndex !== aLength; aIndex += 1) diffs.push(new Diff2(DIFF_DELETE, aLines[aIndex]));
  for (; bIndex !== bLength; bIndex += 1) diffs.push(new Diff2(DIFF_INSERT, bLines[bIndex]));
  return [diffs, truncated];
}
function getNewLineSymbol(string) {
  return string.includes(`\r
`) ? `\r
` : `
`;
}
function diffStrings(a2, b, options) {
  let truncate3 = (options == null ? void 0 : options.truncateThreshold) ?? false, truncateThreshold = Math.max(Math.floor((options == null ? void 0 : options.truncateThreshold) ?? 0), 0), aLength = a2.length, bLength = b.length;
  if (truncate3) {
    let aMultipleLines = a2.includes(`
`), bMultipleLines = b.includes(`
`), aNewLineSymbol = getNewLineSymbol(a2), bNewLineSymbol = getNewLineSymbol(b), _a2 = aMultipleLines ? `${a2.split(aNewLineSymbol, truncateThreshold).join(aNewLineSymbol)}
` : a2, _b = bMultipleLines ? `${b.split(bNewLineSymbol, truncateThreshold).join(bNewLineSymbol)}
` : b;
    aLength = _a2.length, bLength = _b.length;
  }
  let truncated = aLength !== a2.length || bLength !== b.length, isCommon = (aIndex2, bIndex2) => a2[aIndex2] === b[bIndex2], aIndex = 0, bIndex = 0, diffs = [];
  return _default(aLength, bLength, isCommon, (nCommon, aCommon, bCommon) => {
    aIndex !== aCommon && diffs.push(new Diff2(DIFF_DELETE, a2.slice(aIndex, aCommon))), bIndex !== bCommon && diffs.push(new Diff2(DIFF_INSERT, b.slice(bIndex, bCommon))), aIndex = aCommon + nCommon, bIndex = bCommon + nCommon, diffs.push(new Diff2(DIFF_EQUAL, b.slice(bCommon, bIndex)));
  }), aIndex !== aLength && diffs.push(new Diff2(DIFF_DELETE, a2.slice(aIndex))), bIndex !== bLength && diffs.push(new Diff2(DIFF_INSERT, b.slice(bIndex))), [diffs, truncated];
}
function concatenateRelevantDiffs(op, diffs, changeColor) {
  return diffs.reduce((reduced, diff2) => reduced + (diff2[0] === DIFF_EQUAL ? diff2[1] : diff2[0] === op && diff2[1].length !== 0 ? changeColor(diff2[1]) : ""), "");
}
var ChangeBuffer2 = class {
  constructor(op, changeColor) {
    __publicField(this, "op");
    __publicField(this, "line");
    __publicField(this, "lines");
    __publicField(this, "changeColor");
    this.op = op, this.line = [], this.lines = [], this.changeColor = changeColor;
  }
  pushSubstring(substring) {
    this.pushDiff(new Diff2(this.op, substring));
  }
  pushLine() {
    this.lines.push(this.line.length !== 1 ? new Diff2(this.op, concatenateRelevantDiffs(this.op, this.line, this.changeColor)) : this.line[0][0] === this.op ? this.line[0] : new Diff2(this.op, this.line[0][1])), this.line.length = 0;
  }
  isLineEmpty() {
    return this.line.length === 0;
  }
  pushDiff(diff2) {
    this.line.push(diff2);
  }
  align(diff2) {
    let string = diff2[1];
    if (string.includes(`
`)) {
      let substrings = string.split(`
`), iLast = substrings.length - 1;
      substrings.forEach((substring, i) => {
        i < iLast ? (this.pushSubstring(substring), this.pushLine()) : substring.length !== 0 && this.pushSubstring(substring);
      });
    } else this.pushDiff(diff2);
  }
  moveLinesTo(lines) {
    this.isLineEmpty() || this.pushLine(), lines.push(...this.lines), this.lines.length = 0;
  }
}, CommonBuffer2 = class {
  constructor(deleteBuffer, insertBuffer) {
    __publicField(this, "deleteBuffer");
    __publicField(this, "insertBuffer");
    __publicField(this, "lines");
    this.deleteBuffer = deleteBuffer, this.insertBuffer = insertBuffer, this.lines = [];
  }
  pushDiffCommonLine(diff2) {
    this.lines.push(diff2);
  }
  pushDiffChangeLines(diff2) {
    let isDiffEmpty = diff2[1].length === 0;
    (!isDiffEmpty || this.deleteBuffer.isLineEmpty()) && this.deleteBuffer.pushDiff(diff2), (!isDiffEmpty || this.insertBuffer.isLineEmpty()) && this.insertBuffer.pushDiff(diff2);
  }
  flushChangeLines() {
    this.deleteBuffer.moveLinesTo(this.lines), this.insertBuffer.moveLinesTo(this.lines);
  }
  align(diff2) {
    let op = diff2[0], string = diff2[1];
    if (string.includes(`
`)) {
      let substrings = string.split(`
`), iLast = substrings.length - 1;
      substrings.forEach((substring, i) => {
        if (i === 0) {
          let subdiff = new Diff2(op, substring);
          this.deleteBuffer.isLineEmpty() && this.insertBuffer.isLineEmpty() ? (this.flushChangeLines(), this.pushDiffCommonLine(subdiff)) : (this.pushDiffChangeLines(subdiff), this.flushChangeLines());
        } else i < iLast ? this.pushDiffCommonLine(new Diff2(op, substring)) : substring.length !== 0 && this.pushDiffChangeLines(new Diff2(op, substring));
      });
    } else this.pushDiffChangeLines(diff2);
  }
  getLines() {
    return this.flushChangeLines(), this.lines;
  }
};
function getAlignedDiffs(diffs, changeColor) {
  let deleteBuffer = new ChangeBuffer2(DIFF_DELETE, changeColor), insertBuffer = new ChangeBuffer2(DIFF_INSERT, changeColor), commonBuffer = new CommonBuffer2(deleteBuffer, insertBuffer);
  return diffs.forEach((diff2) => {
    switch (diff2[0]) {
      case DIFF_DELETE:
        deleteBuffer.align(diff2);
        break;
      case DIFF_INSERT:
        insertBuffer.align(diff2);
        break;
      default:
        commonBuffer.align(diff2);
    }
  }), commonBuffer.getLines();
}
function hasCommonDiff(diffs, isMultiline) {
  if (isMultiline) {
    let iLast = diffs.length - 1;
    return diffs.some((diff2, i) => diff2[0] === DIFF_EQUAL && (i !== iLast || diff2[1] !== `
`));
  }
  return diffs.some((diff2) => diff2[0] === DIFF_EQUAL);
}
function diffStringsUnified(a2, b, options) {
  if (a2 !== b && a2.length !== 0 && b.length !== 0) {
    let isMultiline = a2.includes(`
`) || b.includes(`
`), [diffs, truncated] = diffStringsRaw(isMultiline ? `${a2}
` : a2, isMultiline ? `${b}
` : b, true, options);
    if (hasCommonDiff(diffs, isMultiline)) {
      let optionsNormalized = normalizeDiffOptions(options), lines = getAlignedDiffs(diffs, optionsNormalized.changeColor);
      return printDiffLines(lines, truncated, optionsNormalized);
    }
  }
  return diffLinesUnified(a2.split(`
`), b.split(`
`), options);
}
function diffStringsRaw(a2, b, cleanup, options) {
  let [diffs, truncated] = diffStrings(a2, b, options);
  return diff_cleanupSemantic(diffs), [diffs, truncated];
}
function getCommonMessage(message, options) {
  let { commonColor } = normalizeDiffOptions(options);
  return commonColor(message);
}
var { AsymmetricMatcher: AsymmetricMatcher2, DOMCollection: DOMCollection2, DOMElement: DOMElement2, Immutable: Immutable2, ReactElement: ReactElement2, ReactTestComponent: ReactTestComponent2 } = plugins, PLUGINS2 = [ReactTestComponent2, ReactElement2, DOMElement2, DOMCollection2, Immutable2, AsymmetricMatcher2], FORMAT_OPTIONS = { plugins: PLUGINS2 }, FALLBACK_FORMAT_OPTIONS = { callToJSON: false, maxDepth: 10, plugins: PLUGINS2 };
function diff(a2, b, options) {
  if (Object.is(a2, b)) return "";
  let aType = getType3(a2), expectedType = aType, omitDifference = false;
  if (aType === "object" && typeof a2.asymmetricMatch == "function") {
    if (a2.$$typeof !== Symbol.for("jest.asymmetricMatcher") || typeof a2.getExpectedType != "function") return;
    expectedType = a2.getExpectedType(), omitDifference = expectedType === "string";
  }
  if (expectedType !== getType3(b)) {
    let { aAnnotation, aColor, aIndicator, bAnnotation, bColor, bIndicator } = normalizeDiffOptions(options), formatOptions = getFormatOptions(FALLBACK_FORMAT_OPTIONS, options), aDisplay = format(a2, formatOptions), bDisplay = format(b, formatOptions), aDiff = `${aColor(`${aIndicator} ${aAnnotation}:`)} 
${aDisplay}`, bDiff = `${bColor(`${bIndicator} ${bAnnotation}:`)} 
${bDisplay}`;
    return `${aDiff}

${bDiff}`;
  }
  if (!omitDifference) switch (aType) {
    case "string":
      return diffLinesUnified(a2.split(`
`), b.split(`
`), options);
    case "boolean":
    case "number":
      return comparePrimitive(a2, b, options);
    case "map":
      return compareObjects(sortMap(a2), sortMap(b), options);
    case "set":
      return compareObjects(sortSet(a2), sortSet(b), options);
    default:
      return compareObjects(a2, b, options);
  }
}
function comparePrimitive(a2, b, options) {
  let aFormat = format(a2, FORMAT_OPTIONS), bFormat = format(b, FORMAT_OPTIONS);
  return aFormat === bFormat ? "" : diffLinesUnified(aFormat.split(`
`), bFormat.split(`
`), options);
}
function sortMap(map) {
  return new Map(Array.from(map.entries()).sort());
}
function sortSet(set2) {
  return new Set(Array.from(set2.values()).sort());
}
function compareObjects(a2, b, options) {
  let difference, hasThrown = false;
  try {
    let formatOptions = getFormatOptions(FORMAT_OPTIONS, options);
    difference = getObjectsDifference(a2, b, formatOptions, options);
  } catch {
    hasThrown = true;
  }
  let noDiffMessage = getCommonMessage(NO_DIFF_MESSAGE, options);
  if (difference === void 0 || difference === noDiffMessage) {
    let formatOptions = getFormatOptions(FALLBACK_FORMAT_OPTIONS, options);
    difference = getObjectsDifference(a2, b, formatOptions, options), difference !== noDiffMessage && !hasThrown && (difference = `${getCommonMessage(SIMILAR_MESSAGE, options)}

${difference}`);
  }
  return difference;
}
function getFormatOptions(formatOptions, options) {
  let { compareKeys } = normalizeDiffOptions(options);
  return { ...formatOptions, compareKeys };
}
function getObjectsDifference(a2, b, formatOptions, options) {
  let formatOptionsZeroIndent = { ...formatOptions, indent: 0 }, aCompare = format(a2, formatOptionsZeroIndent), bCompare = format(b, formatOptionsZeroIndent);
  if (aCompare === bCompare) return getCommonMessage(NO_DIFF_MESSAGE, options);
  {
    let aDisplay = format(a2, formatOptions), bDisplay = format(b, formatOptions);
    return diffLinesUnified2(aDisplay.split(`
`), bDisplay.split(`
`), aCompare.split(`
`), bCompare.split(`
`), options);
  }
}
var MAX_DIFF_STRING_LENGTH = 2e4;
function isAsymmetricMatcher(data) {
  return getType(data) === "Object" && typeof data.asymmetricMatch == "function";
}
function isReplaceable(obj1, obj2) {
  let obj1Type = getType(obj1), obj2Type = getType(obj2);
  return obj1Type === obj2Type && (obj1Type === "Object" || obj1Type === "Array");
}
function printDiffOrStringify(expected, received, options) {
  let { aAnnotation, bAnnotation } = normalizeDiffOptions(options);
  if (typeof expected == "string" && typeof received == "string" && expected.length > 0 && received.length > 0 && expected.length <= MAX_DIFF_STRING_LENGTH && received.length <= MAX_DIFF_STRING_LENGTH && expected !== received) {
    if (expected.includes(`
`) || received.includes(`
`)) return diffStringsUnified(received, expected, options);
    let [diffs] = diffStringsRaw(received, expected), hasCommonDiff2 = diffs.some((diff2) => diff2[0] === DIFF_EQUAL), printLabel = getLabelPrinter(aAnnotation, bAnnotation), expectedLine = printLabel(aAnnotation) + printExpected(getCommonAndChangedSubstrings(diffs, DIFF_DELETE, hasCommonDiff2)), receivedLine = printLabel(bAnnotation) + printReceived(getCommonAndChangedSubstrings(diffs, DIFF_INSERT, hasCommonDiff2));
    return `${expectedLine}
${receivedLine}`;
  }
  let clonedExpected = deepClone(expected, { forceWritable: true }), clonedReceived = deepClone(received, { forceWritable: true }), { replacedExpected, replacedActual } = replaceAsymmetricMatcher(clonedExpected, clonedReceived);
  return diff(replacedExpected, replacedActual, options);
}
function replaceAsymmetricMatcher(actual, expected, actualReplaced = /* @__PURE__ */ new WeakSet(), expectedReplaced = /* @__PURE__ */ new WeakSet()) {
  return isReplaceable(actual, expected) ? actualReplaced.has(actual) || expectedReplaced.has(expected) ? { replacedActual: actual, replacedExpected: expected } : (actualReplaced.add(actual), expectedReplaced.add(expected), getOwnProperties(expected).forEach((key) => {
    let expectedValue = expected[key], actualValue = actual[key];
    if (isAsymmetricMatcher(expectedValue)) expectedValue.asymmetricMatch(actualValue) && (actual[key] = expectedValue);
    else if (isAsymmetricMatcher(actualValue)) actualValue.asymmetricMatch(expectedValue) && (expected[key] = actualValue);
    else if (isReplaceable(actualValue, expectedValue)) {
      let replaced = replaceAsymmetricMatcher(actualValue, expectedValue, actualReplaced, expectedReplaced);
      actual[key] = replaced.replacedActual, expected[key] = replaced.replacedExpected;
    }
  }), { replacedActual: actual, replacedExpected: expected }) : { replacedActual: actual, replacedExpected: expected };
}
function getLabelPrinter(...strings) {
  let maxLength = strings.reduce((max, string) => string.length > max ? string.length : max, 0);
  return (string) => `${string}: ${" ".repeat(maxLength - string.length)}`;
}
var SPACE_SYMBOL = "·";
function replaceTrailingSpaces(text) {
  return text.replace(/\s+$/gm, (spaces) => SPACE_SYMBOL.repeat(spaces.length));
}
function printReceived(object) {
  return f2.red(replaceTrailingSpaces(stringify(object)));
}
function printExpected(value) {
  return f2.green(replaceTrailingSpaces(stringify(value)));
}
function getCommonAndChangedSubstrings(diffs, op, hasCommonDiff2) {
  return diffs.reduce((reduced, diff2) => reduced + (diff2[0] === DIFF_EQUAL ? diff2[1] : diff2[0] === op ? hasCommonDiff2 ? f2.inverse(diff2[1]) : diff2[1] : ""), "");
}
function d(e, t) {
  if (!e) throw new Error(t);
}
function y(e, t) {
  return typeof t === e;
}
function w(e) {
  return e instanceof Promise;
}
function f3(e, t, n) {
  Object.defineProperty(e, t, n);
}
function p2(e, t, n) {
  Object.defineProperty(e, t, { value: n });
}
var u = Symbol.for("tinyspy:spy"), x = /* @__PURE__ */ new Set(), P = (e) => {
  e.called = false, e.callCount = 0, e.calls = [], e.results = [], e.resolves = [], e.next = [];
}, K = (e) => (f3(e, u, { value: { reset: () => P(e[u]) } }), e[u]), I = (e) => e[u] || K(e);
function g(e) {
  d(y("function", e) || y("undefined", e), "cannot spy on a non-function value");
  let t = function(...s) {
    let r = I(t);
    r.called = true, r.callCount++, r.calls.push(s);
    let R = r.next.shift();
    if (R) {
      r.results.push(R);
      let [o, l] = R;
      if (o === "ok") return l;
      throw l;
    }
    let i, c = "ok", a2 = r.results.length;
    if (r.impl) try {
      new.target ? i = Reflect.construct(r.impl, s, new.target) : i = r.impl.apply(this, s), c = "ok";
    } catch (o) {
      throw i = o, c = "error", r.results.push([c, o]), o;
    }
    let S = [c, i];
    return w(i) && i.then((o) => r.resolves[a2] = ["ok", o], (o) => r.resolves[a2] = ["error", o]), r.results.push(S), i;
  };
  p2(t, "_isMockFunction", true), p2(t, "length", e ? e.length : 0), p2(t, "name", e && e.name || "spy");
  let n = I(t);
  return n.reset(), n.impl = e, t;
}
var k = (e, t) => Object.getOwnPropertyDescriptor(e, t), O = (e, t) => {
  t != null && typeof t == "function" && t.prototype != null && Object.setPrototypeOf(e.prototype, t.prototype);
};
function C2(e, t, n) {
  d(!y("undefined", e), "spyOn could not find an object to spy upon"), d(y("object", e) || y("function", e), "cannot spyOn on a primitive value");
  let [s, r] = (() => {
    if (!y("object", t)) return [t, "value"];
    if ("getter" in t && "setter" in t) throw new Error("cannot spy on both getter and setter");
    if ("getter" in t) return [t.getter, "get"];
    if ("setter" in t) return [t.setter, "set"];
    throw new Error("specify getter or setter to spy on");
  })(), R = k(e, s), i = Object.getPrototypeOf(e), c = i && k(i, s), a2 = R || c;
  d(a2 || s in e, `${String(s)} does not exist`);
  let S = false;
  r === "value" && a2 && !a2.value && a2.get && (r = "get", S = true, n = a2.get());
  let o;
  a2 ? o = a2[r] : r !== "value" ? o = () => e[s] : o = e[s], n || (n = o);
  let l = g(n);
  r === "value" && O(l, o);
  let h2 = (A) => {
    let { value: M, ...v } = a2 || { configurable: true, writable: true };
    r !== "value" && delete v.writable, v[r] = A, f3(e, s, v);
  }, b = () => a2 ? f3(e, s, a2) : h2(o), m2 = l[u];
  return p2(m2, "restore", b), p2(m2, "getOriginal", () => S ? o() : o), p2(m2, "willCall", (A) => (m2.impl = A, l)), h2(S ? () => (O(l, n), l) : l), x.add(l), l;
}
var mocks = /* @__PURE__ */ new Set();
function isMockFunction(fn22) {
  return typeof fn22 == "function" && "_isMockFunction" in fn22 && fn22._isMockFunction;
}
var callOrder = 0;
function enhanceSpy(spy) {
  let stub = spy, implementation, instances = [], contexts = [], invocations = [], state = I(spy), mockContext = { get calls() {
    return state.calls;
  }, get contexts() {
    return contexts;
  }, get instances() {
    return instances;
  }, get invocationCallOrder() {
    return invocations;
  }, get results() {
    return state.results.map(([callType, value]) => ({ type: callType === "error" ? "throw" : "return", value }));
  }, get settledResults() {
    return state.resolves.map(([callType, value]) => ({ type: callType === "error" ? "rejected" : "fulfilled", value }));
  }, get lastCall() {
    return state.calls[state.calls.length - 1];
  } }, onceImplementations = [], implementationChangedTemporarily = false;
  function mockCall(...args) {
    return instances.push(this), contexts.push(this), invocations.push(++callOrder), (implementationChangedTemporarily ? implementation : onceImplementations.shift() || implementation || state.getOriginal() || (() => {
    })).apply(this, args);
  }
  let name = stub.name;
  stub.getMockName = () => name || "vi.fn()", stub.mockName = (n) => (name = n, stub), stub.mockClear = () => (state.reset(), instances = [], contexts = [], invocations = [], stub), stub.mockReset = () => (stub.mockClear(), implementation = () => {
  }, onceImplementations = [], stub), stub.mockRestore = () => (stub.mockReset(), state.restore(), implementation = void 0, stub), stub.getMockImplementation = () => implementation, stub.mockImplementation = (fn22) => (implementation = fn22, state.willCall(mockCall), stub), stub.mockImplementationOnce = (fn22) => (onceImplementations.push(fn22), stub);
  function withImplementation(fn22, cb) {
    let originalImplementation = implementation;
    implementation = fn22, state.willCall(mockCall), implementationChangedTemporarily = true;
    let reset = () => {
      implementation = originalImplementation, implementationChangedTemporarily = false;
    }, result = cb();
    return result instanceof Promise ? result.then(() => (reset(), stub)) : (reset(), stub);
  }
  return stub.withImplementation = withImplementation, stub.mockReturnThis = () => stub.mockImplementation(function() {
    return this;
  }), stub.mockReturnValue = (val) => stub.mockImplementation(() => val), stub.mockReturnValueOnce = (val) => stub.mockImplementationOnce(() => val), stub.mockResolvedValue = (val) => stub.mockImplementation(() => Promise.resolve(val)), stub.mockResolvedValueOnce = (val) => stub.mockImplementationOnce(() => Promise.resolve(val)), stub.mockRejectedValue = (val) => stub.mockImplementation(() => Promise.reject(val)), stub.mockRejectedValueOnce = (val) => stub.mockImplementationOnce(() => Promise.reject(val)), Object.defineProperty(stub, "mock", { get: () => mockContext }), state.willCall(mockCall), mocks.add(stub), stub;
}
function fn(implementation) {
  let enhancedSpy = enhanceSpy(C2({ spy: implementation || function() {
  } }, "spy"));
  return implementation && enhancedSpy.mockImplementation(implementation), enhancedSpy;
}
var IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@", IS_COLLECTION_SYMBOL = "@@__IMMUTABLE_ITERABLE__@@";
function isImmutable(v) {
  return v && (v[IS_COLLECTION_SYMBOL] || v[IS_RECORD_SYMBOL]);
}
var OBJECT_PROTO = Object.getPrototypeOf({});
function getUnserializableMessage(err) {
  return err instanceof Error ? `<unserializable>: ${err.message}` : typeof err == "string" ? `<unserializable>: ${err}` : "<unserializable>";
}
function serializeValue(val, seen = /* @__PURE__ */ new WeakMap()) {
  if (!val || typeof val == "string") return val;
  if (typeof val == "function") return `Function<${val.name || "anonymous"}>`;
  if (typeof val == "symbol") return val.toString();
  if (typeof val != "object") return val;
  if (isImmutable(val)) return serializeValue(val.toJSON(), seen);
  if (val instanceof Promise || val.constructor && val.constructor.prototype === "AsyncFunction") return "Promise";
  if (typeof Element < "u" && val instanceof Element) return val.tagName;
  if (typeof val.asymmetricMatch == "function") return `${val.toString()} ${format2(val.sample)}`;
  if (typeof val.toJSON == "function") return serializeValue(val.toJSON(), seen);
  if (seen.has(val)) return seen.get(val);
  if (Array.isArray(val)) {
    let clone2 = new Array(val.length);
    return seen.set(val, clone2), val.forEach((e, i) => {
      try {
        clone2[i] = serializeValue(e, seen);
      } catch (err) {
        clone2[i] = getUnserializableMessage(err);
      }
    }), clone2;
  } else {
    let clone2 = /* @__PURE__ */ Object.create(null);
    seen.set(val, clone2);
    let obj = val;
    for (; obj && obj !== OBJECT_PROTO; ) Object.getOwnPropertyNames(obj).forEach((key) => {
      if (!(key in clone2)) try {
        clone2[key] = serializeValue(val[key], seen);
      } catch (err) {
        delete clone2[key], clone2[key] = getUnserializableMessage(err);
      }
    }), obj = Object.getPrototypeOf(obj);
    return clone2;
  }
}
function normalizeErrorMessage(message) {
  return message.replace(/__(vite_ssr_import|vi_import)_\d+__\./g, "");
}
function processError(_err, diffOptions, seen = /* @__PURE__ */ new WeakSet()) {
  if (!_err || typeof _err != "object") return { message: String(_err) };
  let err = _err;
  err.stack && (err.stackStr = String(err.stack)), err.name && (err.nameStr = String(err.name)), (err.showDiff || err.showDiff === void 0 && err.expected !== void 0 && err.actual !== void 0) && (err.diff = printDiffOrStringify(err.actual, err.expected, { ...diffOptions, ...err.diffOptions })), typeof err.expected != "string" && (err.expected = stringify(err.expected, 10)), typeof err.actual != "string" && (err.actual = stringify(err.actual, 10));
  try {
    typeof err.message == "string" && (err.message = normalizeErrorMessage(err.message));
  } catch {
  }
  try {
    !seen.has(err) && typeof err.cause == "object" && (seen.add(err), err.cause = processError(err.cause, diffOptions, seen));
  } catch {
  }
  try {
    return serializeValue(err);
  } catch (e) {
    return serializeValue(new Error(`Failed to fully serialize error: ${e == null ? void 0 : e.message}
Inner error message: ${err == null ? void 0 : err.message}`));
  }
}
var MATCHERS_OBJECT = Symbol.for("matchers-object"), JEST_MATCHERS_OBJECT = Symbol.for("$$jest-matchers-object-storybook"), GLOBAL_EXPECT = Symbol.for("expect-global"), ASYMMETRIC_MATCHERS_OBJECT = Symbol.for("asymmetric-matchers-object");
if (!Object.prototype.hasOwnProperty.call(globalThis, MATCHERS_OBJECT)) {
  let globalState = /* @__PURE__ */ new WeakMap();
  Object.defineProperty(globalThis, MATCHERS_OBJECT, { get: () => globalState });
}
if (!Object.prototype.hasOwnProperty.call(globalThis, JEST_MATCHERS_OBJECT)) {
  let matchers = /* @__PURE__ */ Object.create(null), customEqualityTesters = [];
  Object.defineProperty(globalThis, JEST_MATCHERS_OBJECT, { configurable: true, get: () => ({ state: globalThis[MATCHERS_OBJECT].get(globalThis[GLOBAL_EXPECT]), matchers, customEqualityTesters }) });
}
if (!Object.prototype.hasOwnProperty.call(globalThis, ASYMMETRIC_MATCHERS_OBJECT)) {
  let assymetricMatchers = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(globalThis, ASYMMETRIC_MATCHERS_OBJECT, { get: () => assymetricMatchers });
}
function getState(expect4) {
  return globalThis[MATCHERS_OBJECT].get(expect4);
}
function setState(state, expect4) {
  let map = globalThis[MATCHERS_OBJECT], current = map.get(expect4) || {};
  Object.assign(current, state), map.set(expect4, current);
}
var EXPECTED_COLOR = f2.green, RECEIVED_COLOR = f2.red, INVERTED_COLOR = f2.inverse, BOLD_WEIGHT = f2.bold, DIM_COLOR = f2.dim;
function matcherHint(matcherName, received = "received", expected = "expected", options = {}) {
  let { comment = "", isDirectExpectCall = false, isNot = false, promise = "", secondArgument = "", expectedColor = EXPECTED_COLOR, receivedColor = RECEIVED_COLOR, secondArgumentColor = EXPECTED_COLOR } = options, hint = "", dimString = "expect";
  return !isDirectExpectCall && received !== "" && (hint += DIM_COLOR(`${dimString}(`) + receivedColor(received), dimString = ")"), promise !== "" && (hint += DIM_COLOR(`${dimString}.`) + promise, dimString = ""), isNot && (hint += `${DIM_COLOR(`${dimString}.`)}not`, dimString = ""), matcherName.includes(".") ? dimString += matcherName : (hint += DIM_COLOR(`${dimString}.`) + matcherName, dimString = ""), expected === "" ? dimString += "()" : (hint += DIM_COLOR(`${dimString}(`) + expectedColor(expected), secondArgument && (hint += DIM_COLOR(", ") + secondArgumentColor(secondArgument)), dimString = ")"), comment !== "" && (dimString += ` // ${comment}`), dimString !== "" && (hint += DIM_COLOR(dimString)), hint;
}
var SPACE_SYMBOL2 = "·";
function replaceTrailingSpaces2(text) {
  return text.replace(/\s+$/gm, (spaces) => SPACE_SYMBOL2.repeat(spaces.length));
}
function printReceived2(object) {
  return RECEIVED_COLOR(replaceTrailingSpaces2(stringify(object)));
}
function printExpected2(value) {
  return EXPECTED_COLOR(replaceTrailingSpaces2(stringify(value)));
}
function getMatcherUtils() {
  return { EXPECTED_COLOR, RECEIVED_COLOR, INVERTED_COLOR, BOLD_WEIGHT, DIM_COLOR, diff, matcherHint, printReceived: printReceived2, printExpected: printExpected2, printDiffOrStringify };
}
function getCustomEqualityTesters() {
  return globalThis[JEST_MATCHERS_OBJECT].customEqualityTesters;
}
function equals(a2, b, customTesters, strictCheck) {
  return customTesters = customTesters || [], eq(a2, b, [], [], customTesters, strictCheck ? hasKey : hasDefinedKey);
}
function isAsymmetric(obj) {
  return !!obj && typeof obj == "object" && "asymmetricMatch" in obj && isA("Function", obj.asymmetricMatch);
}
function asymmetricMatch(a2, b) {
  let asymmetricA = isAsymmetric(a2), asymmetricB = isAsymmetric(b);
  if (!(asymmetricA && asymmetricB)) {
    if (asymmetricA) return a2.asymmetricMatch(b);
    if (asymmetricB) return b.asymmetricMatch(a2);
  }
}
function eq(a2, b, aStack, bStack, customTesters, hasKey2) {
  let result = true, asymmetricResult = asymmetricMatch(a2, b);
  if (asymmetricResult !== void 0) return asymmetricResult;
  let testerContext = { equals };
  for (let i = 0; i < customTesters.length; i++) {
    let customTesterResult = customTesters[i].call(testerContext, a2, b, customTesters);
    if (customTesterResult !== void 0) return customTesterResult;
  }
  if (a2 instanceof Error && b instanceof Error) return a2.message === b.message;
  if (typeof URL == "function" && a2 instanceof URL && b instanceof URL) return a2.href === b.href;
  if (Object.is(a2, b)) return true;
  if (a2 === null || b === null) return a2 === b;
  let className = Object.prototype.toString.call(a2);
  if (className !== Object.prototype.toString.call(b)) return false;
  switch (className) {
    case "[object Boolean]":
    case "[object String]":
    case "[object Number]":
      return typeof a2 != typeof b ? false : typeof a2 != "object" && typeof b != "object" ? Object.is(a2, b) : Object.is(a2.valueOf(), b.valueOf());
    case "[object Date]": {
      let numA = +a2, numB = +b;
      return numA === numB || Number.isNaN(numA) && Number.isNaN(numB);
    }
    case "[object RegExp]":
      return a2.source === b.source && a2.flags === b.flags;
  }
  if (typeof a2 != "object" || typeof b != "object") return false;
  if (isDomNode(a2) && isDomNode(b)) return a2.isEqualNode(b);
  let length = aStack.length;
  for (; length--; ) {
    if (aStack[length] === a2) return bStack[length] === b;
    if (bStack[length] === b) return false;
  }
  if (aStack.push(a2), bStack.push(b), className === "[object Array]" && a2.length !== b.length) return false;
  let aKeys = keys(a2, hasKey2), key, size = aKeys.length;
  if (keys(b, hasKey2).length !== size) return false;
  for (; size--; ) if (key = aKeys[size], result = hasKey2(b, key) && eq(a2[key], b[key], aStack, bStack, customTesters, hasKey2), !result) return false;
  return aStack.pop(), bStack.pop(), result;
}
function keys(obj, hasKey2) {
  let keys2 = [];
  for (let key in obj) hasKey2(obj, key) && keys2.push(key);
  return keys2.concat(Object.getOwnPropertySymbols(obj).filter((symbol) => Object.getOwnPropertyDescriptor(obj, symbol).enumerable));
}
function hasDefinedKey(obj, key) {
  return hasKey(obj, key) && obj[key] !== void 0;
}
function hasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function isA(typeName, value) {
  return Object.prototype.toString.apply(value) === `[object ${typeName}]`;
}
function isDomNode(obj) {
  return obj !== null && typeof obj == "object" && "nodeType" in obj && typeof obj.nodeType == "number" && "nodeName" in obj && typeof obj.nodeName == "string" && "isEqualNode" in obj && typeof obj.isEqualNode == "function";
}
var IS_KEYED_SENTINEL2 = "@@__IMMUTABLE_KEYED__@@", IS_SET_SENTINEL2 = "@@__IMMUTABLE_SET__@@", IS_LIST_SENTINEL2 = "@@__IMMUTABLE_LIST__@@", IS_ORDERED_SENTINEL2 = "@@__IMMUTABLE_ORDERED__@@", IS_RECORD_SYMBOL2 = "@@__IMMUTABLE_RECORD__@@";
function isImmutableUnorderedKeyed(maybeKeyed) {
  return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL2] && !maybeKeyed[IS_ORDERED_SENTINEL2]);
}
function isImmutableUnorderedSet(maybeSet) {
  return !!(maybeSet && maybeSet[IS_SET_SENTINEL2] && !maybeSet[IS_ORDERED_SENTINEL2]);
}
function isObjectLiteral(source) {
  return source != null && typeof source == "object" && !Array.isArray(source);
}
function isImmutableList(source) {
  return !!(source && isObjectLiteral(source) && source[IS_LIST_SENTINEL2]);
}
function isImmutableOrderedKeyed(source) {
  return !!(source && isObjectLiteral(source) && source[IS_KEYED_SENTINEL2] && source[IS_ORDERED_SENTINEL2]);
}
function isImmutableOrderedSet(source) {
  return !!(source && isObjectLiteral(source) && source[IS_SET_SENTINEL2] && source[IS_ORDERED_SENTINEL2]);
}
function isImmutableRecord(source) {
  return !!(source && isObjectLiteral(source) && source[IS_RECORD_SYMBOL2]);
}
var IteratorSymbol = Symbol.iterator;
function hasIterator(object) {
  return !!(object != null && object[IteratorSymbol]);
}
function iterableEquality(a2, b, customTesters = [], aStack = [], bStack = []) {
  if (typeof a2 != "object" || typeof b != "object" || Array.isArray(a2) || Array.isArray(b) || !hasIterator(a2) || !hasIterator(b)) return;
  if (a2.constructor !== b.constructor) return false;
  let length = aStack.length;
  for (; length--; ) if (aStack[length] === a2) return bStack[length] === b;
  aStack.push(a2), bStack.push(b);
  let filteredCustomTesters = [...customTesters.filter((t) => t !== iterableEquality), iterableEqualityWithStack];
  function iterableEqualityWithStack(a22, b2) {
    return iterableEquality(a22, b2, [...customTesters], [...aStack], [...bStack]);
  }
  if (a2.size !== void 0) {
    if (a2.size !== b.size) return false;
    if (isA("Set", a2) || isImmutableUnorderedSet(a2)) {
      let allFound = true;
      for (let aValue of a2) if (!b.has(aValue)) {
        let has = false;
        for (let bValue of b) equals(aValue, bValue, filteredCustomTesters) === true && (has = true);
        if (has === false) {
          allFound = false;
          break;
        }
      }
      return aStack.pop(), bStack.pop(), allFound;
    } else if (isA("Map", a2) || isImmutableUnorderedKeyed(a2)) {
      let allFound = true;
      for (let aEntry of a2) if (!b.has(aEntry[0]) || !equals(aEntry[1], b.get(aEntry[0]), filteredCustomTesters)) {
        let has = false;
        for (let bEntry of b) {
          let matchedKey = equals(aEntry[0], bEntry[0], filteredCustomTesters), matchedValue = false;
          matchedKey === true && (matchedValue = equals(aEntry[1], bEntry[1], filteredCustomTesters)), matchedValue === true && (has = true);
        }
        if (has === false) {
          allFound = false;
          break;
        }
      }
      return aStack.pop(), bStack.pop(), allFound;
    }
  }
  let bIterator = b[IteratorSymbol]();
  for (let aValue of a2) {
    let nextB = bIterator.next();
    if (nextB.done || !equals(aValue, nextB.value, filteredCustomTesters)) return false;
  }
  if (!bIterator.next().done) return false;
  if (!isImmutableList(a2) && !isImmutableOrderedKeyed(a2) && !isImmutableOrderedSet(a2) && !isImmutableRecord(a2)) {
    let aEntries = Object.entries(a2), bEntries = Object.entries(b);
    if (!equals(aEntries, bEntries)) return false;
  }
  return aStack.pop(), bStack.pop(), true;
}
function hasPropertyInObject(object, key) {
  return !object || typeof object != "object" || object === Object.prototype ? false : Object.prototype.hasOwnProperty.call(object, key) || hasPropertyInObject(Object.getPrototypeOf(object), key);
}
function isObjectWithKeys(a2) {
  return isObject(a2) && !(a2 instanceof Error) && !Array.isArray(a2) && !(a2 instanceof Date);
}
function subsetEquality(object, subset, customTesters = []) {
  let filteredCustomTesters = customTesters.filter((t) => t !== subsetEquality), subsetEqualityWithContext = (seenReferences = /* @__PURE__ */ new WeakMap()) => (object2, subset2) => {
    if (isObjectWithKeys(subset2)) return Object.keys(subset2).every((key) => {
      if (subset2[key] != null && typeof subset2[key] == "object") {
        if (seenReferences.has(subset2[key])) return equals(object2[key], subset2[key], filteredCustomTesters);
        seenReferences.set(subset2[key], true);
      }
      let result = object2 != null && hasPropertyInObject(object2, key) && equals(object2[key], subset2[key], [...filteredCustomTesters, subsetEqualityWithContext(seenReferences)]);
      return seenReferences.delete(subset2[key]), result;
    });
  };
  return subsetEqualityWithContext()(object, subset);
}
function typeEquality(a2, b) {
  if (!(a2 == null || b == null || a2.constructor === b.constructor)) return false;
}
function arrayBufferEquality(a2, b) {
  let dataViewA = a2, dataViewB = b;
  if (!(a2 instanceof DataView && b instanceof DataView)) {
    if (!(a2 instanceof ArrayBuffer) || !(b instanceof ArrayBuffer)) return;
    try {
      dataViewA = new DataView(a2), dataViewB = new DataView(b);
    } catch {
      return;
    }
  }
  if (dataViewA.byteLength !== dataViewB.byteLength) return false;
  for (let i = 0; i < dataViewA.byteLength; i++) if (dataViewA.getUint8(i) !== dataViewB.getUint8(i)) return false;
  return true;
}
function sparseArrayEquality(a2, b, customTesters = []) {
  if (!Array.isArray(a2) || !Array.isArray(b)) return;
  let aKeys = Object.keys(a2), bKeys = Object.keys(b), filteredCustomTesters = customTesters.filter((t) => t !== sparseArrayEquality);
  return equals(a2, b, filteredCustomTesters, true) && equals(aKeys, bKeys);
}
function generateToBeMessage(deepEqualityName, expected = "#{this}", actual = "#{exp}") {
  let toBeMessage = `expected ${expected} to be ${actual} // Object.is equality`;
  return ["toStrictEqual", "toEqual"].includes(deepEqualityName) ? `${toBeMessage}

If it should pass with deep equality, replace "toBe" with "${deepEqualityName}"

Expected: ${expected}
Received: serializes to the same string
` : toBeMessage;
}
function pluralize(word, count) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}
function getObjectKeys(object) {
  return [...Object.keys(object), ...Object.getOwnPropertySymbols(object).filter((s) => {
    var _a2;
    return (_a2 = Object.getOwnPropertyDescriptor(object, s)) == null ? void 0 : _a2.enumerable;
  })];
}
function getObjectSubset(object, subset, customTesters = []) {
  let stripped = 0, getObjectSubsetWithContext = (seenReferences = /* @__PURE__ */ new WeakMap()) => (object2, subset2) => {
    if (Array.isArray(object2)) {
      if (Array.isArray(subset2) && subset2.length === object2.length) return subset2.map((sub, i) => getObjectSubsetWithContext(seenReferences)(object2[i], sub));
    } else {
      if (object2 instanceof Date) return object2;
      if (isObject(object2) && isObject(subset2)) {
        if (equals(object2, subset2, [...customTesters, iterableEquality, subsetEquality])) return subset2;
        let trimmed = {};
        seenReferences.set(object2, trimmed);
        for (let key of getObjectKeys(object2)) hasPropertyInObject(subset2, key) ? trimmed[key] = seenReferences.has(object2[key]) ? seenReferences.get(object2[key]) : getObjectSubsetWithContext(seenReferences)(object2[key], subset2[key]) : seenReferences.has(object2[key]) || (stripped += 1, isObject(object2[key]) && (stripped += getObjectKeys(object2[key]).length), getObjectSubsetWithContext(seenReferences)(object2[key], subset2[key]));
        if (getObjectKeys(trimmed).length > 0) return trimmed;
      }
    }
    return object2;
  };
  return { subset: getObjectSubsetWithContext()(object, subset), stripped };
}
var AsymmetricMatcher3 = class {
  constructor(sample, inverse = false) {
    __publicField(this, "$$typeof", Symbol.for("jest.asymmetricMatcher"));
    this.sample = sample, this.inverse = inverse;
  }
  getMatcherContext(expect4) {
    return { ...getState(expect4 || globalThis[GLOBAL_EXPECT]), equals, isNot: this.inverse, customTesters: getCustomEqualityTesters(), utils: { ...getMatcherUtils(), diff, stringify, iterableEquality, subsetEquality } };
  }
  [Symbol.for("chai/inspect")](options) {
    let result = stringify(this, options.depth, { min: true });
    return result.length <= options.truncate ? result : `${this.toString()}{…}`;
  }
}, StringContaining = class extends AsymmetricMatcher3 {
  constructor(sample, inverse = false) {
    if (!isA("String", sample)) throw new Error("Expected is not a string");
    super(sample, inverse);
  }
  asymmetricMatch(other) {
    let result = isA("String", other) && other.includes(this.sample);
    return this.inverse ? !result : result;
  }
  toString() {
    return `String${this.inverse ? "Not" : ""}Containing`;
  }
  getExpectedType() {
    return "string";
  }
}, Anything = class extends AsymmetricMatcher3 {
  asymmetricMatch(other) {
    return other != null;
  }
  toString() {
    return "Anything";
  }
  toAsymmetricMatcher() {
    return "Anything";
  }
}, ObjectContaining = class extends AsymmetricMatcher3 {
  constructor(sample, inverse = false) {
    super(sample, inverse);
  }
  getPrototype(obj) {
    return Object.getPrototypeOf ? Object.getPrototypeOf(obj) : obj.constructor.prototype === obj ? null : obj.constructor.prototype;
  }
  hasProperty(obj, property) {
    return obj ? Object.prototype.hasOwnProperty.call(obj, property) ? true : this.hasProperty(this.getPrototype(obj), property) : false;
  }
  asymmetricMatch(other) {
    if (typeof this.sample != "object") throw new TypeError(`You must provide an object to ${this.toString()}, not '${typeof this.sample}'.`);
    let result = true, matcherContext = this.getMatcherContext();
    for (let property in this.sample) if (!this.hasProperty(other, property) || !equals(this.sample[property], other[property], matcherContext.customTesters)) {
      result = false;
      break;
    }
    return this.inverse ? !result : result;
  }
  toString() {
    return `Object${this.inverse ? "Not" : ""}Containing`;
  }
  getExpectedType() {
    return "object";
  }
}, ArrayContaining = class extends AsymmetricMatcher3 {
  constructor(sample, inverse = false) {
    super(sample, inverse);
  }
  asymmetricMatch(other) {
    if (!Array.isArray(this.sample)) throw new TypeError(`You must provide an array to ${this.toString()}, not '${typeof this.sample}'.`);
    let matcherContext = this.getMatcherContext(), result = this.sample.length === 0 || Array.isArray(other) && this.sample.every((item) => other.some((another) => equals(item, another, matcherContext.customTesters)));
    return this.inverse ? !result : result;
  }
  toString() {
    return `Array${this.inverse ? "Not" : ""}Containing`;
  }
  getExpectedType() {
    return "array";
  }
}, Any = class extends AsymmetricMatcher3 {
  constructor(sample) {
    if (typeof sample > "u") throw new TypeError("any() expects to be passed a constructor function. Please pass one or use anything() to match any object.");
    super(sample);
  }
  fnNameFor(func) {
    if (func.name) return func.name;
    let matches3 = Function.prototype.toString.call(func).match(/^(?:async)?\s*function\s*(?:\*\s*)?([\w$]+)\s*\(/);
    return matches3 ? matches3[1] : "<anonymous>";
  }
  asymmetricMatch(other) {
    return this.sample === String ? typeof other == "string" || other instanceof String : this.sample === Number ? typeof other == "number" || other instanceof Number : this.sample === Function ? typeof other == "function" || other instanceof Function : this.sample === Boolean ? typeof other == "boolean" || other instanceof Boolean : this.sample === BigInt ? typeof other == "bigint" || other instanceof BigInt : this.sample === Symbol ? typeof other == "symbol" || other instanceof Symbol : this.sample === Object ? typeof other == "object" : other instanceof this.sample;
  }
  toString() {
    return "Any";
  }
  getExpectedType() {
    return this.sample === String ? "string" : this.sample === Number ? "number" : this.sample === Function ? "function" : this.sample === Object ? "object" : this.sample === Boolean ? "boolean" : this.fnNameFor(this.sample);
  }
  toAsymmetricMatcher() {
    return `Any<${this.fnNameFor(this.sample)}>`;
  }
}, StringMatching = class extends AsymmetricMatcher3 {
  constructor(sample, inverse = false) {
    if (!isA("String", sample) && !isA("RegExp", sample)) throw new Error("Expected is not a String or a RegExp");
    super(new RegExp(sample), inverse);
  }
  asymmetricMatch(other) {
    let result = isA("String", other) && this.sample.test(other);
    return this.inverse ? !result : result;
  }
  toString() {
    return `String${this.inverse ? "Not" : ""}Matching`;
  }
  getExpectedType() {
    return "string";
  }
}, CloseTo = class extends AsymmetricMatcher3 {
  constructor(sample, precision = 2, inverse = false) {
    if (!isA("Number", sample)) throw new Error("Expected is not a Number");
    if (!isA("Number", precision)) throw new Error("Precision is not a Number");
    super(sample);
    __publicField(this, "precision");
    this.inverse = inverse, this.precision = precision;
  }
  asymmetricMatch(other) {
    if (!isA("Number", other)) return false;
    let result = false;
    return other === Number.POSITIVE_INFINITY && this.sample === Number.POSITIVE_INFINITY || other === Number.NEGATIVE_INFINITY && this.sample === Number.NEGATIVE_INFINITY ? result = true : result = Math.abs(this.sample - other) < 10 ** -this.precision / 2, this.inverse ? !result : result;
  }
  toString() {
    return `Number${this.inverse ? "Not" : ""}CloseTo`;
  }
  getExpectedType() {
    return "number";
  }
  toAsymmetricMatcher() {
    return [this.toString(), this.sample, `(${pluralize("digit", this.precision)})`].join(" ");
  }
}, JestAsymmetricMatchers = (chai, utils) => {
  utils.addMethod(chai.expect, "anything", () => new Anything()), utils.addMethod(chai.expect, "any", (expected) => new Any(expected)), utils.addMethod(chai.expect, "stringContaining", (expected) => new StringContaining(expected)), utils.addMethod(chai.expect, "objectContaining", (expected) => new ObjectContaining(expected)), utils.addMethod(chai.expect, "arrayContaining", (expected) => new ArrayContaining(expected)), utils.addMethod(chai.expect, "stringMatching", (expected) => new StringMatching(expected)), utils.addMethod(chai.expect, "closeTo", (expected, precision) => new CloseTo(expected, precision)), chai.expect.not = { stringContaining: (expected) => new StringContaining(expected, true), objectContaining: (expected) => new ObjectContaining(expected, true), arrayContaining: (expected) => new ArrayContaining(expected, true), stringMatching: (expected) => new StringMatching(expected, true), closeTo: (expected, precision) => new CloseTo(expected, precision, true) };
};
function recordAsyncExpect(test3, promise) {
  return test3 && promise instanceof Promise && (promise = promise.finally(() => {
    let index = test3.promises.indexOf(promise);
    index !== -1 && test3.promises.splice(index, 1);
  }), test3.promises || (test3.promises = []), test3.promises.push(promise)), promise;
}
function wrapSoft(utils, fn3) {
  return function(...args) {
    var _a2;
    if (!utils.flag(this, "soft")) return fn3.apply(this, args);
    let test3 = utils.flag(this, "vitest-test");
    if (!test3) throw new Error("expect.soft() can only be used inside a test");
    try {
      return fn3.apply(this, args);
    } catch (err) {
      test3.result || (test3.result = { state: "fail" }), test3.result.state = "fail", (_a2 = test3.result).errors || (_a2.errors = []), test3.result.errors.push(processError(err));
    }
  };
}
var JestChaiExpect = (chai, utils) => {
  let { AssertionError: AssertionError2 } = chai, customTesters = getCustomEqualityTesters();
  function def(name, fn3) {
    let addMethod2 = (n) => {
      let softWrapper = wrapSoft(utils, fn3);
      utils.addMethod(chai.Assertion.prototype, n, softWrapper), utils.addMethod(globalThis[JEST_MATCHERS_OBJECT].matchers, n, softWrapper);
    };
    Array.isArray(name) ? name.forEach((n) => addMethod2(n)) : addMethod2(name);
  }
  ["throw", "throws", "Throw"].forEach((m2) => {
    utils.overwriteMethod(chai.Assertion.prototype, m2, (_super) => function(...args) {
      let promise = utils.flag(this, "promise"), object = utils.flag(this, "object"), isNot = utils.flag(this, "negate");
      if (promise === "rejects") utils.flag(this, "object", () => {
        throw object;
      });
      else if (promise === "resolves" && typeof object != "function") {
        if (isNot) return;
        {
          let message = utils.flag(this, "message") || "expected promise to throw an error, but it didn't", error = { showDiff: false };
          throw new AssertionError2(message, error, utils.flag(this, "ssfi"));
        }
      }
      _super.apply(this, args);
    });
  }), def("withTest", function(test3) {
    return utils.flag(this, "vitest-test", test3), this;
  }), def("toEqual", function(expected) {
    let actual = utils.flag(this, "object"), equal = equals(actual, expected, [...customTesters, iterableEquality]);
    return this.assert(equal, "expected #{this} to deeply equal #{exp}", "expected #{this} to not deeply equal #{exp}", expected, actual);
  }), def("toStrictEqual", function(expected) {
    let obj = utils.flag(this, "object"), equal = equals(obj, expected, [...customTesters, iterableEquality, typeEquality, sparseArrayEquality, arrayBufferEquality], true);
    return this.assert(equal, "expected #{this} to strictly equal #{exp}", "expected #{this} to not strictly equal #{exp}", expected, obj);
  }), def("toBe", function(expected) {
    let actual = this._obj, pass = Object.is(actual, expected), deepEqualityName = "";
    return pass || (equals(actual, expected, [...customTesters, iterableEquality, typeEquality, sparseArrayEquality, arrayBufferEquality], true) ? deepEqualityName = "toStrictEqual" : equals(actual, expected, [...customTesters, iterableEquality]) && (deepEqualityName = "toEqual")), this.assert(pass, generateToBeMessage(deepEqualityName), "expected #{this} not to be #{exp} // Object.is equality", expected, actual);
  }), def("toMatchObject", function(expected) {
    let actual = this._obj, pass = equals(actual, expected, [...customTesters, iterableEquality, subsetEquality]), isNot = utils.flag(this, "negate"), { subset: actualSubset, stripped } = getObjectSubset(actual, expected);
    if (pass && isNot || !pass && !isNot) {
      let msg = utils.getMessage(this, [pass, "expected #{this} to match object #{exp}", "expected #{this} to not match object #{exp}", expected, actualSubset, false]), message = stripped === 0 ? msg : `${msg}
(${stripped} matching ${stripped === 1 ? "property" : "properties"} omitted from actual)`;
      throw new AssertionError2(message, { showDiff: true, expected, actual: actualSubset });
    }
  }), def("toMatch", function(expected) {
    let actual = this._obj;
    if (typeof actual != "string") throw new TypeError(`.toMatch() expects to receive a string, but got ${typeof actual}`);
    return this.assert(typeof expected == "string" ? actual.includes(expected) : actual.match(expected), "expected #{this} to match #{exp}", "expected #{this} not to match #{exp}", expected, actual);
  }), def("toContain", function(item) {
    let actual = this._obj;
    if (typeof Node < "u" && actual instanceof Node) {
      if (!(item instanceof Node)) throw new TypeError(`toContain() expected a DOM node as the argument, but got ${typeof item}`);
      return this.assert(actual.contains(item), "expected #{this} to contain element #{exp}", "expected #{this} not to contain element #{exp}", item, actual);
    }
    if (typeof DOMTokenList < "u" && actual instanceof DOMTokenList) {
      assertTypes(item, "class name", ["string"]);
      let expectedClassList = utils.flag(this, "negate") ? actual.value.replace(item, "").trim() : `${actual.value} ${item}`;
      return this.assert(actual.contains(item), `expected "${actual.value}" to contain "${item}"`, `expected "${actual.value}" not to contain "${item}"`, expectedClassList, actual.value);
    }
    return typeof actual == "string" && typeof item == "string" ? this.assert(actual.includes(item), "expected #{this} to contain #{exp}", "expected #{this} not to contain #{exp}", item, actual) : (actual != null && typeof actual != "string" && utils.flag(this, "object", Array.from(actual)), this.contain(item));
  }), def("toContainEqual", function(expected) {
    let obj = utils.flag(this, "object"), index = Array.from(obj).findIndex((item) => equals(item, expected, customTesters));
    this.assert(index !== -1, "expected #{this} to deep equally contain #{exp}", "expected #{this} to not deep equally contain #{exp}", expected);
  }), def("toBeTruthy", function() {
    let obj = utils.flag(this, "object");
    this.assert(!!obj, "expected #{this} to be truthy", "expected #{this} to not be truthy", obj, false);
  }), def("toBeFalsy", function() {
    let obj = utils.flag(this, "object");
    this.assert(!obj, "expected #{this} to be falsy", "expected #{this} to not be falsy", obj, false);
  }), def("toBeGreaterThan", function(expected) {
    let actual = this._obj;
    return assertTypes(actual, "actual", ["number", "bigint"]), assertTypes(expected, "expected", ["number", "bigint"]), this.assert(actual > expected, `expected ${actual} to be greater than ${expected}`, `expected ${actual} to be not greater than ${expected}`, actual, expected, false);
  }), def("toBeGreaterThanOrEqual", function(expected) {
    let actual = this._obj;
    return assertTypes(actual, "actual", ["number", "bigint"]), assertTypes(expected, "expected", ["number", "bigint"]), this.assert(actual >= expected, `expected ${actual} to be greater than or equal to ${expected}`, `expected ${actual} to be not greater than or equal to ${expected}`, actual, expected, false);
  }), def("toBeLessThan", function(expected) {
    let actual = this._obj;
    return assertTypes(actual, "actual", ["number", "bigint"]), assertTypes(expected, "expected", ["number", "bigint"]), this.assert(actual < expected, `expected ${actual} to be less than ${expected}`, `expected ${actual} to be not less than ${expected}`, actual, expected, false);
  }), def("toBeLessThanOrEqual", function(expected) {
    let actual = this._obj;
    return assertTypes(actual, "actual", ["number", "bigint"]), assertTypes(expected, "expected", ["number", "bigint"]), this.assert(actual <= expected, `expected ${actual} to be less than or equal to ${expected}`, `expected ${actual} to be not less than or equal to ${expected}`, actual, expected, false);
  }), def("toBeNaN", function() {
    return this.be.NaN;
  }), def("toBeUndefined", function() {
    return this.be.undefined;
  }), def("toBeNull", function() {
    return this.be.null;
  }), def("toBeDefined", function() {
    let negate = utils.flag(this, "negate");
    return utils.flag(this, "negate", false), negate ? this.be.undefined : this.not.be.undefined;
  }), def("toBeTypeOf", function(expected) {
    let actual = typeof this._obj, equal = expected === actual;
    return this.assert(equal, "expected #{this} to be type of #{exp}", "expected #{this} not to be type of #{exp}", expected, actual);
  }), def("toBeInstanceOf", function(obj) {
    return this.instanceOf(obj);
  }), def("toHaveLength", function(length) {
    return this.have.length(length);
  }), def("toHaveProperty", function(...args) {
    Array.isArray(args[0]) && (args[0] = args[0].map((key) => String(key).replace(/([.[\]])/g, "\\$1")).join("."));
    let actual = this._obj, [propertyName, expected] = args, getValue = () => Object.prototype.hasOwnProperty.call(actual, propertyName) ? { value: actual[propertyName], exists: true } : utils.getPathInfo(actual, propertyName), { value, exists } = getValue(), pass = exists && (args.length === 1 || equals(expected, value, customTesters)), valueString = args.length === 1 ? "" : ` with value ${utils.objDisplay(expected)}`;
    return this.assert(pass, `expected #{this} to have property "${propertyName}"${valueString}`, `expected #{this} to not have property "${propertyName}"${valueString}`, expected, exists ? value : void 0);
  }), def("toBeCloseTo", function(received, precision = 2) {
    let expected = this._obj, pass = false, expectedDiff2 = 0, receivedDiff = 0;
    return received === Number.POSITIVE_INFINITY && expected === Number.POSITIVE_INFINITY || received === Number.NEGATIVE_INFINITY && expected === Number.NEGATIVE_INFINITY ? pass = true : (expectedDiff2 = 10 ** -precision / 2, receivedDiff = Math.abs(expected - received), pass = receivedDiff < expectedDiff2), this.assert(pass, `expected #{this} to be close to #{exp}, received difference is ${receivedDiff}, but expected ${expectedDiff2}`, `expected #{this} to not be close to #{exp}, received difference is ${receivedDiff}, but expected ${expectedDiff2}`, received, expected, false);
  });
  let assertIsMock = (assertion) => {
    if (!isMockFunction(assertion._obj)) throw new TypeError(`${utils.inspect(assertion._obj)} is not a spy or a call to a spy!`);
  }, getSpy = (assertion) => (assertIsMock(assertion), assertion._obj), ordinalOf = (i) => {
    let j = i % 10, k2 = i % 100;
    return j === 1 && k2 !== 11 ? `${i}st` : j === 2 && k2 !== 12 ? `${i}nd` : j === 3 && k2 !== 13 ? `${i}rd` : `${i}th`;
  }, formatCalls = (spy, msg, showActualCall) => (spy.mock.calls && (msg += f2.gray(`

Received: 

${spy.mock.calls.map((callArg, i) => {
    let methodCall = f2.bold(`  ${ordinalOf(i + 1)} ${spy.getMockName()} call:

`);
    return showActualCall ? methodCall += diff(showActualCall, callArg, { omitAnnotationLines: true }) : methodCall += stringify(callArg).split(`
`).map((line) => `    ${line}`).join(`
`), methodCall += `
`, methodCall;
  }).join(`
`)}`)), msg += f2.gray(`

Number of calls: ${f2.bold(spy.mock.calls.length)}
`), msg), formatReturns = (spy, results, msg, showActualReturn) => (msg += f2.gray(`

Received: 

${results.map((callReturn, i) => {
    let methodCall = f2.bold(`  ${ordinalOf(i + 1)} ${spy.getMockName()} call return:

`);
    return showActualReturn ? methodCall += diff(showActualReturn, callReturn.value, { omitAnnotationLines: true }) : methodCall += stringify(callReturn).split(`
`).map((line) => `    ${line}`).join(`
`), methodCall += `
`, methodCall;
  }).join(`
`)}`), msg += f2.gray(`

Number of calls: ${f2.bold(spy.mock.calls.length)}
`), msg);
  def(["toHaveBeenCalledTimes", "toBeCalledTimes"], function(number) {
    let spy = getSpy(this), spyName = spy.getMockName(), callCount = spy.mock.calls.length;
    return this.assert(callCount === number, `expected "${spyName}" to be called #{exp} times, but got ${callCount} times`, `expected "${spyName}" to not be called #{exp} times`, number, callCount, false);
  }), def("toHaveBeenCalledOnce", function() {
    let spy = getSpy(this), spyName = spy.getMockName(), callCount = spy.mock.calls.length;
    return this.assert(callCount === 1, `expected "${spyName}" to be called once, but got ${callCount} times`, `expected "${spyName}" to not be called once`, 1, callCount, false);
  }), def(["toHaveBeenCalled", "toBeCalled"], function() {
    let spy = getSpy(this), spyName = spy.getMockName(), callCount = spy.mock.calls.length, called = callCount > 0, isNot = utils.flag(this, "negate"), msg = utils.getMessage(this, [called, `expected "${spyName}" to be called at least once`, `expected "${spyName}" to not be called at all, but actually been called ${callCount} times`, true, called]);
    if (called && isNot && (msg = formatCalls(spy, msg)), called && isNot || !called && !isNot) throw new AssertionError2(msg);
  }), def(["toHaveBeenCalledWith", "toBeCalledWith"], function(...args) {
    let spy = getSpy(this), spyName = spy.getMockName(), pass = spy.mock.calls.some((callArg) => equals(callArg, args, [...customTesters, iterableEquality])), isNot = utils.flag(this, "negate"), msg = utils.getMessage(this, [pass, `expected "${spyName}" to be called with arguments: #{exp}`, `expected "${spyName}" to not be called with arguments: #{exp}`, args]);
    if (pass && isNot || !pass && !isNot) throw new AssertionError2(formatCalls(spy, msg, args));
  }), def(["toHaveBeenNthCalledWith", "nthCalledWith"], function(times, ...args) {
    let spy = getSpy(this), spyName = spy.getMockName(), nthCall = spy.mock.calls[times - 1], callCount = spy.mock.calls.length, isCalled = times <= callCount;
    this.assert(equals(nthCall, args, [...customTesters, iterableEquality]), `expected ${ordinalOf(times)} "${spyName}" call to have been called with #{exp}${isCalled ? "" : `, but called only ${callCount} times`}`, `expected ${ordinalOf(times)} "${spyName}" call to not have been called with #{exp}`, args, nthCall, isCalled);
  }), def(["toHaveBeenLastCalledWith", "lastCalledWith"], function(...args) {
    let spy = getSpy(this), spyName = spy.getMockName(), lastCall = spy.mock.calls[spy.mock.calls.length - 1];
    this.assert(equals(lastCall, args, [...customTesters, iterableEquality]), `expected last "${spyName}" call to have been called with #{exp}`, `expected last "${spyName}" call to not have been called with #{exp}`, args, lastCall);
  }), def(["toThrow", "toThrowError"], function(expected) {
    if (typeof expected == "string" || typeof expected > "u" || expected instanceof RegExp) return this.throws(expected);
    let obj = this._obj, promise = utils.flag(this, "promise"), isNot = utils.flag(this, "negate"), thrown = null;
    if (promise === "rejects") thrown = obj;
    else if (promise === "resolves" && typeof obj != "function") {
      if (isNot) return;
      {
        let message = utils.flag(this, "message") || "expected promise to throw an error, but it didn't", error = { showDiff: false };
        throw new AssertionError2(message, error, utils.flag(this, "ssfi"));
      }
    } else {
      let isThrow = false;
      try {
        obj();
      } catch (err) {
        isThrow = true, thrown = err;
      }
      if (!isThrow && !isNot) {
        let message = utils.flag(this, "message") || "expected function to throw an error, but it didn't", error = { showDiff: false };
        throw new AssertionError2(message, error, utils.flag(this, "ssfi"));
      }
    }
    if (typeof expected == "function") {
      let name = expected.name || expected.prototype.constructor.name;
      return this.assert(thrown && thrown instanceof expected, `expected error to be instance of ${name}`, `expected error not to be instance of ${name}`, expected, thrown);
    }
    if (expected instanceof Error) return this.assert(thrown && expected.message === thrown.message, `expected error to have message: ${expected.message}`, `expected error not to have message: ${expected.message}`, expected.message, thrown && thrown.message);
    if (typeof expected == "object" && "asymmetricMatch" in expected && typeof expected.asymmetricMatch == "function") {
      let matcher = expected;
      return this.assert(thrown && matcher.asymmetricMatch(thrown), "expected error to match asymmetric matcher", "expected error not to match asymmetric matcher", matcher, thrown);
    }
    throw new Error(`"toThrow" expects string, RegExp, function, Error instance or asymmetric matcher, got "${typeof expected}"`);
  }), [{ name: "toHaveResolved", condition: (spy) => spy.mock.settledResults.length > 0 && spy.mock.settledResults.some(({ type: type5 }) => type5 === "fulfilled"), action: "resolved" }, { name: ["toHaveReturned", "toReturn"], condition: (spy) => spy.mock.calls.length > 0 && spy.mock.results.some(({ type: type5 }) => type5 !== "throw"), action: "called" }].forEach(({ name, condition, action }) => {
    def(name, function() {
      let spy = getSpy(this), spyName = spy.getMockName(), pass = condition(spy);
      this.assert(pass, `expected "${spyName}" to be successfully ${action} at least once`, `expected "${spyName}" to not be successfully ${action}`, pass, !pass, false);
    });
  }), [{ name: "toHaveResolvedTimes", condition: (spy, times) => spy.mock.settledResults.reduce((s, { type: type5 }) => type5 === "fulfilled" ? ++s : s, 0) === times, action: "resolved" }, { name: ["toHaveReturnedTimes", "toReturnTimes"], condition: (spy, times) => spy.mock.results.reduce((s, { type: type5 }) => type5 === "throw" ? s : ++s, 0) === times, action: "called" }].forEach(({ name, condition, action }) => {
    def(name, function(times) {
      let spy = getSpy(this), spyName = spy.getMockName(), pass = condition(spy, times);
      this.assert(pass, `expected "${spyName}" to be successfully ${action} ${times} times`, `expected "${spyName}" to not be successfully ${action} ${times} times`, `expected resolved times: ${times}`, `received resolved times: ${pass}`, false);
    });
  }), [{ name: "toHaveResolvedWith", condition: (spy, value) => spy.mock.settledResults.some(({ type: type5, value: result }) => type5 === "fulfilled" && equals(value, result)), action: "resolve" }, { name: ["toHaveReturnedWith", "toReturnWith"], condition: (spy, value) => spy.mock.results.some(({ type: type5, value: result }) => type5 === "return" && equals(value, result)), action: "return" }].forEach(({ name, condition, action }) => {
    def(name, function(value) {
      let spy = getSpy(this), pass = condition(spy, value), isNot = utils.flag(this, "negate");
      if (pass && isNot || !pass && !isNot) {
        let spyName = spy.getMockName(), msg = utils.getMessage(this, [pass, `expected "${spyName}" to ${action} with: #{exp} at least once`, `expected "${spyName}" to not ${action} with: #{exp}`, value]), results = action === "return" ? spy.mock.results : spy.mock.settledResults;
        throw new AssertionError2(formatReturns(spy, results, msg, value));
      }
    });
  }), [{ name: "toHaveLastResolvedWith", condition: (spy, value) => {
    let result = spy.mock.settledResults[spy.mock.settledResults.length - 1];
    return result && result.type === "fulfilled" && equals(result.value, value);
  }, action: "resolve" }, { name: ["toHaveLastReturnedWith", "lastReturnedWith"], condition: (spy, value) => {
    let result = spy.mock.results[spy.mock.results.length - 1];
    return result && result.type === "return" && equals(result.value, value);
  }, action: "return" }].forEach(({ name, condition, action }) => {
    def(name, function(value) {
      let spy = getSpy(this), results = action === "return" ? spy.mock.results : spy.mock.settledResults, result = results[results.length - 1], spyName = spy.getMockName();
      this.assert(condition(spy, value), `expected last "${spyName}" call to ${action} #{exp}`, `expected last "${spyName}" call to not ${action} #{exp}`, value, result == null ? void 0 : result.value);
    });
  }), [{ name: "toHaveNthResolvedWith", condition: (spy, index, value) => {
    let result = spy.mock.settledResults[index - 1];
    return result && result.type === "fulfilled" && equals(result.value, value);
  }, action: "resolve" }, { name: ["toHaveNthReturnedWith", "nthReturnedWith"], condition: (spy, index, value) => {
    let result = spy.mock.results[index - 1];
    return result && result.type === "return" && equals(result.value, value);
  }, action: "return" }].forEach(({ name, condition, action }) => {
    def(name, function(nthCall, value) {
      let spy = getSpy(this), spyName = spy.getMockName(), result = (action === "return" ? spy.mock.results : spy.mock.settledResults)[nthCall - 1], ordinalCall = `${ordinalOf(nthCall)} call`;
      this.assert(condition(spy, nthCall, value), `expected ${ordinalCall} "${spyName}" call to ${action} #{exp}`, `expected ${ordinalCall} "${spyName}" call to not ${action} #{exp}`, value, result == null ? void 0 : result.value);
    });
  }), def("toSatisfy", function(matcher, message) {
    return this.be.satisfy(matcher, message);
  }), def("withContext", function(context) {
    for (let key in context) utils.flag(this, key, context[key]);
    return this;
  }), utils.addProperty(chai.Assertion.prototype, "resolves", function() {
    let error = new Error("resolves");
    utils.flag(this, "promise", "resolves"), utils.flag(this, "error", error);
    let test3 = utils.flag(this, "vitest-test"), obj = utils.flag(this, "object");
    if (utils.flag(this, "poll")) throw new SyntaxError("expect.poll() is not supported in combination with .resolves");
    if (typeof (obj == null ? void 0 : obj.then) != "function") throw new TypeError(`You must provide a Promise to expect() when using .resolves, not '${typeof obj}'.`);
    let proxy = new Proxy(this, { get: (target, key, receiver) => {
      let result = Reflect.get(target, key, receiver);
      return typeof result != "function" ? result instanceof chai.Assertion ? proxy : result : async (...args) => {
        let promise = obj.then((value) => (utils.flag(this, "object", value), result.call(this, ...args)), (err) => {
          let _error = new AssertionError2(`promise rejected "${utils.inspect(err)}" instead of resolving`, { showDiff: false });
          throw _error.cause = err, _error.stack = error.stack.replace(error.message, _error.message), _error;
        });
        return recordAsyncExpect(test3, promise);
      };
    } });
    return proxy;
  }), utils.addProperty(chai.Assertion.prototype, "rejects", function() {
    let error = new Error("rejects");
    utils.flag(this, "promise", "rejects"), utils.flag(this, "error", error);
    let test3 = utils.flag(this, "vitest-test"), obj = utils.flag(this, "object"), wrapper = typeof obj == "function" ? obj() : obj;
    if (utils.flag(this, "poll")) throw new SyntaxError("expect.poll() is not supported in combination with .rejects");
    if (typeof (wrapper == null ? void 0 : wrapper.then) != "function") throw new TypeError(`You must provide a Promise to expect() when using .rejects, not '${typeof wrapper}'.`);
    let proxy = new Proxy(this, { get: (target, key, receiver) => {
      let result = Reflect.get(target, key, receiver);
      return typeof result != "function" ? result instanceof chai.Assertion ? proxy : result : async (...args) => {
        let promise = wrapper.then((value) => {
          let _error = new AssertionError2(`promise resolved "${utils.inspect(value)}" instead of rejecting`, { showDiff: true, expected: new Error("rejected promise"), actual: value });
          throw _error.stack = error.stack.replace(error.message, _error.message), _error;
        }, (err) => (utils.flag(this, "object", err), result.call(this, ...args)));
        return recordAsyncExpect(test3, promise);
      };
    } });
    return proxy;
  });
};
function getMatcherState(assertion, expect4) {
  let obj = assertion._obj, isNot = utils_exports.flag(assertion, "negate"), promise = utils_exports.flag(assertion, "promise") || "", jestUtils = { ...getMatcherUtils(), diff, stringify, iterableEquality, subsetEquality };
  return { state: { ...getState(expect4), customTesters: getCustomEqualityTesters(), isNot, utils: jestUtils, promise, equals, suppressedErrors: [], soft: utils_exports.flag(assertion, "soft"), poll: utils_exports.flag(assertion, "poll") }, isNot, obj };
}
var JestExtendError = class extends Error {
  constructor(message, actual, expected) {
    super(message), this.actual = actual, this.expected = expected;
  }
};
function JestExtendPlugin(c, expect4, matchers) {
  return (_, utils) => {
    Object.entries(matchers).forEach(([expectAssertionName, expectAssertion]) => {
      function expectWrapper(...args) {
        let { state, isNot, obj } = getMatcherState(this, expect4), result = expectAssertion.call(state, obj, ...args);
        if (result && typeof result == "object" && result instanceof Promise) return result.then(({ pass: pass2, message: message2, actual: actual2, expected: expected2 }) => {
          if (pass2 && isNot || !pass2 && !isNot) throw new JestExtendError(message2(), actual2, expected2);
        });
        let { pass, message, actual, expected } = result;
        if (pass && isNot || !pass && !isNot) throw new JestExtendError(message(), actual, expected);
      }
      let softWrapper = wrapSoft(utils, expectWrapper);
      utils.addMethod(globalThis[JEST_MATCHERS_OBJECT].matchers, expectAssertionName, softWrapper), utils.addMethod(c.Assertion.prototype, expectAssertionName, softWrapper);
      class CustomMatcher extends AsymmetricMatcher3 {
        constructor(inverse = false, ...sample) {
          super(sample, inverse);
        }
        asymmetricMatch(other) {
          let { pass } = expectAssertion.call(this.getMatcherContext(expect4), other, ...this.sample);
          return this.inverse ? !pass : pass;
        }
        toString() {
          return `${this.inverse ? "not." : ""}${expectAssertionName}`;
        }
        getExpectedType() {
          return "any";
        }
        toAsymmetricMatcher() {
          return `${this.toString()}<${this.sample.map(String).join(", ")}>`;
        }
      }
      let customMatcher = (...sample) => new CustomMatcher(false, ...sample);
      Object.defineProperty(expect4, expectAssertionName, { configurable: true, enumerable: true, value: customMatcher, writable: true }), Object.defineProperty(expect4.not, expectAssertionName, { configurable: true, enumerable: true, value: (...sample) => new CustomMatcher(true, ...sample), writable: true }), Object.defineProperty(globalThis[ASYMMETRIC_MATCHERS_OBJECT], expectAssertionName, { configurable: true, enumerable: true, value: customMatcher, writable: true });
    });
  };
}
var JestExtend = (chai, utils) => {
  utils.addMethod(chai.expect, "extend", (expect4, expects) => {
    use(JestExtendPlugin(chai, expect4, expects));
  });
};
function createExpect() {
  use(JestExtend), use(JestChaiExpect), use(JestAsymmetricMatchers);
  let expect4 = (value, message) => {
    let { assertionCalls } = getState(expect4);
    return setState({ assertionCalls: assertionCalls + 1, soft: false }, expect4), expect(value, message);
  };
  Object.assign(expect4, expect), expect4.getState = () => getState(expect4), expect4.setState = (state) => setState(state, expect4), expect4.extend = (expects) => expect.extend(expect4, expects), expect4.soft = (...args) => {
    let assert2 = expect4(...args);
    return expect4.setState({ soft: true }), assert2;
  }, expect4.unreachable = (message) => {
    assert.fail(`expected${message ? ` "${message}" ` : " "}not to be reached`);
  };
  function assertions(expected) {
    let errorGen = () => new Error(`expected number of assertions to be ${expected}, but got ${expect4.getState().assertionCalls}`);
    "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(errorGen(), assertions), expect4.setState({ expectedAssertionsNumber: expected, expectedAssertionsNumberErrorGen: errorGen });
  }
  function hasAssertions() {
    let error = new Error("expected any number of assertion, but got none");
    "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(error, hasAssertions), expect4.setState({ isExpectingAssertions: true, isExpectingAssertionsError: error });
  }
  return setState({ assertionCalls: 0, isExpectingAssertions: false, isExpectingAssertionsError: null, expectedAssertionsNumber: null, expectedAssertionsNumberErrorGen: null }, expect4), utils_exports.addMethod(expect4, "assertions", assertions), utils_exports.addMethod(expect4, "hasAssertions", hasAssertions), expect4.extend(matchers_exports), expect4;
}
var expect2 = createExpect();
Object.defineProperty(globalThis, GLOBAL_EXPECT, { value: expect2, writable: true, configurable: true });
var listeners = /* @__PURE__ */ new Set();
function onMockCall(callback) {
  return listeners.add(callback), () => void listeners.delete(callback);
}
function fn2(implementation) {
  let mock = implementation ? fn(implementation) : fn();
  return reactiveMock(mock);
}
function reactiveMock(mock) {
  let reactive = listenWhenCalled(mock), originalMockImplementation = reactive.mockImplementation.bind(null);
  return reactive.mockImplementation = (fn3) => listenWhenCalled(originalMockImplementation(fn3)), reactive;
}
function listenWhenCalled(mock) {
  let state = I(mock), impl = state.impl;
  return state.willCall(function(...args) {
    return listeners.forEach((listener) => listener(mock, args)), impl == null ? void 0 : impl.apply(this, args);
  }), mock;
}
function clearAllMocks() {
  mocks.forEach((spy) => spy.mockClear());
}
function resetAllMocks() {
  mocks.forEach((spy) => spy.mockReset());
}
function restoreAllMocks() {
  mocks.forEach((spy) => spy.mockRestore());
}
var dom_esm_exports = {};
__export(dom_esm_exports, { buildQueries: () => buildQueries, configure: () => configure, createEvent: () => createEvent, findAllByAltText: () => findAllByAltText, findAllByDisplayValue: () => findAllByDisplayValue, findAllByLabelText: () => findAllByLabelText, findAllByPlaceholderText: () => findAllByPlaceholderText, findAllByRole: () => findAllByRole, findAllByTestId: () => findAllByTestId, findAllByText: () => findAllByText, findAllByTitle: () => findAllByTitle, findByAltText: () => findByAltText, findByDisplayValue: () => findByDisplayValue, findByLabelText: () => findByLabelText, findByPlaceholderText: () => findByPlaceholderText, findByRole: () => findByRole, findByTestId: () => findByTestId, findByText: () => findByText, findByTitle: () => findByTitle, fireEvent: () => fireEvent, getAllByAltText: () => getAllByAltText, getAllByDisplayValue: () => getAllByDisplayValue, getAllByLabelText: () => getAllByLabelTextWithSuggestions, getAllByPlaceholderText: () => getAllByPlaceholderText, getAllByRole: () => getAllByRole, getAllByTestId: () => getAllByTestId, getAllByText: () => getAllByText, getAllByTitle: () => getAllByTitle, getByAltText: () => getByAltText, getByDisplayValue: () => getByDisplayValue, getByLabelText: () => getByLabelTextWithSuggestions, getByPlaceholderText: () => getByPlaceholderText, getByRole: () => getByRole, getByTestId: () => getByTestId, getByText: () => getByText, getByTitle: () => getByTitle, getConfig: () => getConfig2, getDefaultNormalizer: () => getDefaultNormalizer, getElementError: () => getElementError, getMultipleElementsFoundError: () => getMultipleElementsFoundError, getNodeText: () => getNodeText, getQueriesForElement: () => getQueriesForElement, getRoles: () => getRoles, getSuggestedQuery: () => getSuggestedQuery, isInaccessible: () => isInaccessible, logDOM: () => logDOM, logRoles: () => logRoles, makeFindQuery: () => makeFindQuery, makeGetAllQuery: () => makeGetAllQuery, makeSingleQuery: () => makeSingleQuery, prettyDOM: () => prettyDOM, prettyFormat: () => prettyFormat, queries: () => queries, queryAllByAltText: () => queryAllByAltTextWithSuggestions, queryAllByAttribute: () => queryAllByAttribute, queryAllByDisplayValue: () => queryAllByDisplayValueWithSuggestions, queryAllByLabelText: () => queryAllByLabelTextWithSuggestions, queryAllByPlaceholderText: () => queryAllByPlaceholderTextWithSuggestions, queryAllByRole: () => queryAllByRoleWithSuggestions, queryAllByTestId: () => queryAllByTestIdWithSuggestions, queryAllByText: () => queryAllByTextWithSuggestions, queryAllByTitle: () => queryAllByTitleWithSuggestions, queryByAltText: () => queryByAltText, queryByAttribute: () => queryByAttribute, queryByDisplayValue: () => queryByDisplayValue, queryByLabelText: () => queryByLabelText, queryByPlaceholderText: () => queryByPlaceholderText, queryByRole: () => queryByRole, queryByTestId: () => queryByTestId, queryByText: () => queryByText, queryByTitle: () => queryByTitle, queryHelpers: () => queryHelpers, screen: () => screen, waitFor: () => waitForWrapper, waitForElementToBeRemoved: () => waitForElementToBeRemoved, within: () => getQueriesForElement, wrapAllByQueryWithSuggestion: () => wrapAllByQueryWithSuggestion, wrapSingleQueryWithSuggestion: () => wrapSingleQueryWithSuggestion });
var prettyFormat = __toESM(require_build());
var toStr2 = Object.prototype.toString;
function isCallable2(fn3) {
  return typeof fn3 == "function" || toStr2.call(fn3) === "[object Function]";
}
function toInteger2(value) {
  var number = Number(value);
  return isNaN(number) ? 0 : number === 0 || !isFinite(number) ? number : (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
}
var maxSafeInteger2 = Math.pow(2, 53) - 1;
function toLength2(value) {
  var len = toInteger2(value);
  return Math.min(Math.max(len, 0), maxSafeInteger2);
}
function arrayFrom2(arrayLike, mapFn) {
  var C3 = Array, items = Object(arrayLike);
  if (arrayLike == null) throw new TypeError("Array.from requires an array-like object - not null or undefined");
  for (var len = toLength2(items.length), A = isCallable2(C3) ? Object(new C3(len)) : new Array(len), k2 = 0, kValue; k2 < len; ) kValue = items[k2], A[k2] = kValue, k2 += 1;
  return A.length = len, A;
}
function _typeof3(obj) {
  "@babel/helpers - typeof";
  return _typeof3 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof3(obj);
}
function _classCallCheck2(instance, Constructor) {
  if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false, descriptor.configurable = true, "value" in descriptor && (descriptor.writable = true), Object.defineProperty(target, _toPropertyKey3(descriptor.key), descriptor);
  }
}
function _createClass2(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties2(Constructor.prototype, protoProps), Object.defineProperty(Constructor, "prototype", { writable: false }), Constructor;
}
function _defineProperty3(obj, key, value) {
  return key = _toPropertyKey3(key), key in obj ? Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) : obj[key] = value, obj;
}
function _toPropertyKey3(arg) {
  var key = _toPrimitive3(arg, "string");
  return _typeof3(key) === "symbol" ? key : String(key);
}
function _toPrimitive3(input2, hint) {
  if (_typeof3(input2) !== "object" || input2 === null) return input2;
  var prim = input2[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input2, hint || "default");
    if (_typeof3(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input2);
}
var SetLike2 = function() {
  function SetLike3() {
    var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    _classCallCheck2(this, SetLike3), _defineProperty3(this, "items", void 0), this.items = items;
  }
  return _createClass2(SetLike3, [{ key: "add", value: function(value) {
    return this.has(value) === false && this.items.push(value), this;
  } }, { key: "clear", value: function() {
    this.items = [];
  } }, { key: "delete", value: function(value) {
    var previousLength = this.items.length;
    return this.items = this.items.filter(function(item) {
      return item !== value;
    }), previousLength !== this.items.length;
  } }, { key: "forEach", value: function(callbackfn) {
    var _this = this;
    this.items.forEach(function(item) {
      callbackfn(item, item, _this);
    });
  } }, { key: "has", value: function(value) {
    return this.items.indexOf(value) !== -1;
  } }, { key: "size", get: function() {
    return this.items.length;
  } }]), SetLike3;
}(), SetLike_default2 = typeof Set > "u" ? Set : SetLike2;
function getLocalName2(element) {
  var _element$localName;
  return (_element$localName = element.localName) !== null && _element$localName !== void 0 ? _element$localName : element.tagName.toLowerCase();
}
var localNameToRoleMappings2 = { article: "article", aside: "complementary", button: "button", datalist: "listbox", dd: "definition", details: "group", dialog: "dialog", dt: "term", fieldset: "group", figure: "figure", form: "form", footer: "contentinfo", h1: "heading", h2: "heading", h3: "heading", h4: "heading", h5: "heading", h6: "heading", header: "banner", hr: "separator", html: "document", legend: "legend", li: "listitem", math: "math", main: "main", menu: "list", nav: "navigation", ol: "list", optgroup: "group", option: "option", output: "status", progress: "progressbar", section: "region", summary: "button", table: "table", tbody: "rowgroup", textarea: "textbox", tfoot: "rowgroup", td: "cell", th: "columnheader", thead: "rowgroup", tr: "row", ul: "list" }, prohibitedAttributes2 = { caption: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), code: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), deletion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), emphasis: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), generic: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby", "aria-roledescription"]), insertion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), paragraph: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), presentation: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), strong: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), subscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), superscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]) };
function hasGlobalAriaAttributes2(element, role) {
  return ["aria-atomic", "aria-busy", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-dropeffect", "aria-flowto", "aria-grabbed", "aria-hidden", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-live", "aria-owns", "aria-relevant", "aria-roledescription"].some(function(attributeName) {
    var _prohibitedAttributes;
    return element.hasAttribute(attributeName) && !((_prohibitedAttributes = prohibitedAttributes2[role]) !== null && _prohibitedAttributes !== void 0 && _prohibitedAttributes.has(attributeName));
  });
}
function ignorePresentationalRole2(element, implicitRole) {
  return hasGlobalAriaAttributes2(element, implicitRole);
}
function getRole2(element) {
  var explicitRole = getExplicitRole2(element);
  if (explicitRole === null || explicitRole === "presentation") {
    var implicitRole = getImplicitRole2(element);
    if (explicitRole !== "presentation" || ignorePresentationalRole2(element, implicitRole || "")) return implicitRole;
  }
  return explicitRole;
}
function getImplicitRole2(element) {
  var mappedByTag = localNameToRoleMappings2[getLocalName2(element)];
  if (mappedByTag !== void 0) return mappedByTag;
  switch (getLocalName2(element)) {
    case "a":
    case "area":
    case "link":
      if (element.hasAttribute("href")) return "link";
      break;
    case "img":
      return element.getAttribute("alt") === "" && !ignorePresentationalRole2(element, "img") ? "presentation" : "img";
    case "input": {
      var _ref = element, type5 = _ref.type;
      switch (type5) {
        case "button":
        case "image":
        case "reset":
        case "submit":
          return "button";
        case "checkbox":
        case "radio":
          return type5;
        case "range":
          return "slider";
        case "email":
        case "tel":
        case "text":
        case "url":
          return element.hasAttribute("list") ? "combobox" : "textbox";
        case "search":
          return element.hasAttribute("list") ? "combobox" : "searchbox";
        case "number":
          return "spinbutton";
        default:
          return null;
      }
    }
    case "select":
      return element.hasAttribute("multiple") || element.size > 1 ? "listbox" : "combobox";
  }
  return null;
}
function getExplicitRole2(element) {
  var role = element.getAttribute("role");
  if (role !== null) {
    var explicitRole = role.trim().split(" ")[0];
    if (explicitRole.length > 0) return explicitRole;
  }
  return null;
}
function isElement2(node) {
  return node !== null && node.nodeType === node.ELEMENT_NODE;
}
function isHTMLTableCaptionElement2(node) {
  return isElement2(node) && getLocalName2(node) === "caption";
}
function isHTMLInputElement2(node) {
  return isElement2(node) && getLocalName2(node) === "input";
}
function isHTMLOptGroupElement2(node) {
  return isElement2(node) && getLocalName2(node) === "optgroup";
}
function isHTMLSelectElement2(node) {
  return isElement2(node) && getLocalName2(node) === "select";
}
function isHTMLTableElement2(node) {
  return isElement2(node) && getLocalName2(node) === "table";
}
function isHTMLTextAreaElement2(node) {
  return isElement2(node) && getLocalName2(node) === "textarea";
}
function safeWindow2(node) {
  var _ref = node.ownerDocument === null ? node : node.ownerDocument, defaultView = _ref.defaultView;
  if (defaultView === null) throw new TypeError("no window available");
  return defaultView;
}
function isHTMLFieldSetElement2(node) {
  return isElement2(node) && getLocalName2(node) === "fieldset";
}
function isHTMLLegendElement2(node) {
  return isElement2(node) && getLocalName2(node) === "legend";
}
function isHTMLSlotElement2(node) {
  return isElement2(node) && getLocalName2(node) === "slot";
}
function isSVGElement2(node) {
  return isElement2(node) && node.ownerSVGElement !== void 0;
}
function isSVGSVGElement2(node) {
  return isElement2(node) && getLocalName2(node) === "svg";
}
function isSVGTitleElement2(node) {
  return isSVGElement2(node) && getLocalName2(node) === "title";
}
function queryIdRefs2(node, attributeName) {
  if (isElement2(node) && node.hasAttribute(attributeName)) {
    var ids = node.getAttribute(attributeName).split(" "), root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    return ids.map(function(id) {
      return root.getElementById(id);
    }).filter(function(element) {
      return element !== null;
    });
  }
  return [];
}
function hasAnyConcreteRoles2(node, roles3) {
  return isElement2(node) ? roles3.indexOf(getRole2(node)) !== -1 : false;
}
function asFlatString2(s) {
  return s.trim().replace(/\s\s+/g, " ");
}
function isHidden2(node, getComputedStyleImplementation) {
  if (!isElement2(node)) return false;
  if (node.hasAttribute("hidden") || node.getAttribute("aria-hidden") === "true") return true;
  var style = getComputedStyleImplementation(node);
  return style.getPropertyValue("display") === "none" || style.getPropertyValue("visibility") === "hidden";
}
function isControl2(node) {
  return hasAnyConcreteRoles2(node, ["button", "combobox", "listbox", "textbox"]) || hasAbstractRole2(node, "range");
}
function hasAbstractRole2(node, role) {
  if (!isElement2(node)) return false;
  switch (role) {
    case "range":
      return hasAnyConcreteRoles2(node, ["meter", "progressbar", "scrollbar", "slider", "spinbutton"]);
    default:
      throw new TypeError("No knowledge about abstract role '".concat(role, "'. This is likely a bug :("));
  }
}
function querySelectorAllSubtree2(element, selectors) {
  var elements = arrayFrom2(element.querySelectorAll(selectors));
  return queryIdRefs2(element, "aria-owns").forEach(function(root) {
    elements.push.apply(elements, arrayFrom2(root.querySelectorAll(selectors)));
  }), elements;
}
function querySelectedOptions2(listbox) {
  return isHTMLSelectElement2(listbox) ? listbox.selectedOptions || querySelectorAllSubtree2(listbox, "[selected]") : querySelectorAllSubtree2(listbox, '[aria-selected="true"]');
}
function isMarkedPresentational2(node) {
  return hasAnyConcreteRoles2(node, ["none", "presentation"]);
}
function isNativeHostLanguageTextAlternativeElement2(node) {
  return isHTMLTableCaptionElement2(node);
}
function allowsNameFromContent2(node) {
  return hasAnyConcreteRoles2(node, ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "label", "legend", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowheader", "switch", "tab", "tooltip", "treeitem"]);
}
function isDescendantOfNativeHostLanguageTextAlternativeElement2(node) {
  return false;
}
function getValueOfTextbox2(element) {
  return isHTMLInputElement2(element) || isHTMLTextAreaElement2(element) ? element.value : element.textContent || "";
}
function getTextualContent2(declaration) {
  var content = declaration.getPropertyValue("content");
  return /^["'].*["']$/.test(content) ? content.slice(1, -1) : "";
}
function isLabelableElement2(element) {
  var localName = getLocalName2(element);
  return localName === "button" || localName === "input" && element.getAttribute("type") !== "hidden" || localName === "meter" || localName === "output" || localName === "progress" || localName === "select" || localName === "textarea";
}
function findLabelableElement2(element) {
  if (isLabelableElement2(element)) return element;
  var labelableElement = null;
  return element.childNodes.forEach(function(childNode) {
    if (labelableElement === null && isElement2(childNode)) {
      var descendantLabelableElement = findLabelableElement2(childNode);
      descendantLabelableElement !== null && (labelableElement = descendantLabelableElement);
    }
  }), labelableElement;
}
function getControlOfLabel2(label) {
  if (label.control !== void 0) return label.control;
  var htmlFor = label.getAttribute("for");
  return htmlFor !== null ? label.ownerDocument.getElementById(htmlFor) : findLabelableElement2(label);
}
function getLabels2(element) {
  var labelsProperty = element.labels;
  if (labelsProperty === null) return labelsProperty;
  if (labelsProperty !== void 0) return arrayFrom2(labelsProperty);
  if (!isLabelableElement2(element)) return null;
  var document2 = element.ownerDocument;
  return arrayFrom2(document2.querySelectorAll("label")).filter(function(label) {
    return getControlOfLabel2(label) === element;
  });
}
function getSlotContents2(slot) {
  var assignedNodes = slot.assignedNodes();
  return assignedNodes.length === 0 ? arrayFrom2(slot.childNodes) : assignedNodes;
}
function computeTextAlternative2(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, consultedNodes = new SetLike_default2(), window2 = safeWindow2(root), _options$compute = options.compute, compute = _options$compute === void 0 ? "name" : _options$compute, _options$computedStyl = options.computedStyleSupportsPseudoElements, computedStyleSupportsPseudoElements = _options$computedStyl === void 0 ? options.getComputedStyle !== void 0 : _options$computedStyl, _options$getComputedS = options.getComputedStyle, getComputedStyle = _options$getComputedS === void 0 ? window2.getComputedStyle.bind(window2) : _options$getComputedS, _options$hidden = options.hidden, hidden = _options$hidden === void 0 ? false : _options$hidden;
  function computeMiscTextAlternative(node, context) {
    var accumulatedText = "";
    if (isElement2(node) && computedStyleSupportsPseudoElements) {
      var pseudoBefore = getComputedStyle(node, "::before"), beforeContent = getTextualContent2(pseudoBefore);
      accumulatedText = "".concat(beforeContent, " ").concat(accumulatedText);
    }
    var childNodes = isHTMLSlotElement2(node) ? getSlotContents2(node) : arrayFrom2(node.childNodes).concat(queryIdRefs2(node, "aria-owns"));
    if (childNodes.forEach(function(child) {
      var result = computeTextAlternative3(child, { isEmbeddedInLabel: context.isEmbeddedInLabel, isReferenced: false, recursion: true }), display2 = isElement2(child) ? getComputedStyle(child).getPropertyValue("display") : "inline", separator = display2 !== "inline" ? " " : "";
      accumulatedText += "".concat(separator).concat(result).concat(separator);
    }), isElement2(node) && computedStyleSupportsPseudoElements) {
      var pseudoAfter = getComputedStyle(node, "::after"), afterContent = getTextualContent2(pseudoAfter);
      accumulatedText = "".concat(accumulatedText, " ").concat(afterContent);
    }
    return accumulatedText.trim();
  }
  function useAttribute(element, attributeName) {
    var attribute = element.getAttributeNode(attributeName);
    return attribute !== null && !consultedNodes.has(attribute) && attribute.value.trim() !== "" ? (consultedNodes.add(attribute), attribute.value) : null;
  }
  function computeTooltipAttributeValue(node) {
    return isElement2(node) ? useAttribute(node, "title") : null;
  }
  function computeElementTextAlternative(node) {
    if (!isElement2(node)) return null;
    if (isHTMLFieldSetElement2(node)) {
      consultedNodes.add(node);
      for (var children = arrayFrom2(node.childNodes), i = 0; i < children.length; i += 1) {
        var child = children[i];
        if (isHTMLLegendElement2(child)) return computeTextAlternative3(child, { isEmbeddedInLabel: false, isReferenced: false, recursion: false });
      }
    } else if (isHTMLTableElement2(node)) {
      consultedNodes.add(node);
      for (var _children = arrayFrom2(node.childNodes), _i = 0; _i < _children.length; _i += 1) {
        var _child = _children[_i];
        if (isHTMLTableCaptionElement2(_child)) return computeTextAlternative3(_child, { isEmbeddedInLabel: false, isReferenced: false, recursion: false });
      }
    } else if (isSVGSVGElement2(node)) {
      consultedNodes.add(node);
      for (var _children2 = arrayFrom2(node.childNodes), _i2 = 0; _i2 < _children2.length; _i2 += 1) {
        var _child2 = _children2[_i2];
        if (isSVGTitleElement2(_child2)) return _child2.textContent;
      }
      return null;
    } else if (getLocalName2(node) === "img" || getLocalName2(node) === "area") {
      var nameFromAlt = useAttribute(node, "alt");
      if (nameFromAlt !== null) return nameFromAlt;
    } else if (isHTMLOptGroupElement2(node)) {
      var nameFromLabel = useAttribute(node, "label");
      if (nameFromLabel !== null) return nameFromLabel;
    }
    if (isHTMLInputElement2(node) && (node.type === "button" || node.type === "submit" || node.type === "reset")) {
      var nameFromValue = useAttribute(node, "value");
      if (nameFromValue !== null) return nameFromValue;
      if (node.type === "submit") return "Submit";
      if (node.type === "reset") return "Reset";
    }
    var labels = getLabels2(node);
    if (labels !== null && labels.length !== 0) return consultedNodes.add(node), arrayFrom2(labels).map(function(element) {
      return computeTextAlternative3(element, { isEmbeddedInLabel: true, isReferenced: false, recursion: true });
    }).filter(function(label) {
      return label.length > 0;
    }).join(" ");
    if (isHTMLInputElement2(node) && node.type === "image") {
      var _nameFromAlt = useAttribute(node, "alt");
      if (_nameFromAlt !== null) return _nameFromAlt;
      var nameFromTitle = useAttribute(node, "title");
      return nameFromTitle !== null ? nameFromTitle : "Submit Query";
    }
    if (hasAnyConcreteRoles2(node, ["button"])) {
      var nameFromSubTree = computeMiscTextAlternative(node, { isEmbeddedInLabel: false, isReferenced: false });
      if (nameFromSubTree !== "") return nameFromSubTree;
    }
    return null;
  }
  function computeTextAlternative3(current, context) {
    if (consultedNodes.has(current)) return "";
    if (!hidden && isHidden2(current, getComputedStyle) && !context.isReferenced) return consultedNodes.add(current), "";
    var labelAttributeNode = isElement2(current) ? current.getAttributeNode("aria-labelledby") : null, labelElements = labelAttributeNode !== null && !consultedNodes.has(labelAttributeNode) ? queryIdRefs2(current, "aria-labelledby") : [];
    if (compute === "name" && !context.isReferenced && labelElements.length > 0) return consultedNodes.add(labelAttributeNode), labelElements.map(function(element) {
      return computeTextAlternative3(element, { isEmbeddedInLabel: context.isEmbeddedInLabel, isReferenced: true, recursion: false });
    }).join(" ");
    var skipToStep2E = context.recursion && isControl2(current) && compute === "name";
    if (!skipToStep2E) {
      var ariaLabel = (isElement2(current) && current.getAttribute("aria-label") || "").trim();
      if (ariaLabel !== "" && compute === "name") return consultedNodes.add(current), ariaLabel;
      if (!isMarkedPresentational2(current)) {
        var elementTextAlternative = computeElementTextAlternative(current);
        if (elementTextAlternative !== null) return consultedNodes.add(current), elementTextAlternative;
      }
    }
    if (hasAnyConcreteRoles2(current, ["menu"])) return consultedNodes.add(current), "";
    if (skipToStep2E || context.isEmbeddedInLabel || context.isReferenced) {
      if (hasAnyConcreteRoles2(current, ["combobox", "listbox"])) {
        consultedNodes.add(current);
        var selectedOptions = querySelectedOptions2(current);
        return selectedOptions.length === 0 ? isHTMLInputElement2(current) ? current.value : "" : arrayFrom2(selectedOptions).map(function(selectedOption) {
          return computeTextAlternative3(selectedOption, { isEmbeddedInLabel: context.isEmbeddedInLabel, isReferenced: false, recursion: true });
        }).join(" ");
      }
      if (hasAbstractRole2(current, "range")) return consultedNodes.add(current), current.hasAttribute("aria-valuetext") ? current.getAttribute("aria-valuetext") : current.hasAttribute("aria-valuenow") ? current.getAttribute("aria-valuenow") : current.getAttribute("value") || "";
      if (hasAnyConcreteRoles2(current, ["textbox"])) return consultedNodes.add(current), getValueOfTextbox2(current);
    }
    if (allowsNameFromContent2(current) || isElement2(current) && context.isReferenced || isNativeHostLanguageTextAlternativeElement2(current) || isDescendantOfNativeHostLanguageTextAlternativeElement2()) {
      var accumulatedText2F = computeMiscTextAlternative(current, { isEmbeddedInLabel: context.isEmbeddedInLabel, isReferenced: false });
      if (accumulatedText2F !== "") return consultedNodes.add(current), accumulatedText2F;
    }
    if (current.nodeType === current.TEXT_NODE) return consultedNodes.add(current), current.textContent || "";
    if (context.recursion) return consultedNodes.add(current), computeMiscTextAlternative(current, { isEmbeddedInLabel: context.isEmbeddedInLabel, isReferenced: false });
    var tooltipAttributeValue = computeTooltipAttributeValue(current);
    return tooltipAttributeValue !== null ? (consultedNodes.add(current), tooltipAttributeValue) : (consultedNodes.add(current), "");
  }
  return asFlatString2(computeTextAlternative3(root, { isEmbeddedInLabel: false, isReferenced: compute === "description", recursion: false }));
}
function _typeof4(obj) {
  "@babel/helpers - typeof";
  return _typeof4 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof4(obj);
}
function ownKeys2(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
      _defineProperty4(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty4(obj, key, value) {
  return key = _toPropertyKey4(key), key in obj ? Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) : obj[key] = value, obj;
}
function _toPropertyKey4(arg) {
  var key = _toPrimitive4(arg, "string");
  return _typeof4(key) === "symbol" ? key : String(key);
}
function _toPrimitive4(input2, hint) {
  if (_typeof4(input2) !== "object" || input2 === null) return input2;
  var prim = input2[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input2, hint || "default");
    if (_typeof4(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input2);
}
function computeAccessibleDescription2(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, description = queryIdRefs2(root, "aria-describedby").map(function(element) {
    return computeTextAlternative2(element, _objectSpread2(_objectSpread2({}, options), {}, { compute: "description" }));
  }).join(" ");
  if (description === "") {
    var title = root.getAttribute("title");
    description = title === null ? "" : title;
  }
  return description;
}
function prohibitsNaming2(node) {
  return hasAnyConcreteRoles2(node, ["caption", "code", "deletion", "emphasis", "generic", "insertion", "paragraph", "presentation", "strong", "subscript", "superscript"]);
}
function computeAccessibleName2(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return prohibitsNaming2(root) ? "" : computeTextAlternative2(root, options);
}
var import_aria_query3 = __toESM(require_lib()), import_lz_string = __toESM(require_lz_string());
function escapeHTML2(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var printProps2 = (keys2, props, config3, indentation, depth, refs, printer2) => {
  let indentationNext = indentation + config3.indent, colors = config3.colors;
  return keys2.map((key) => {
    let value = props[key], printed = printer2(value, config3, indentationNext, depth, refs);
    return typeof value != "string" && (printed.indexOf(`
`) !== -1 && (printed = config3.spacingOuter + indentationNext + printed + config3.spacingOuter + indentation), printed = "{" + printed + "}"), config3.spacingInner + indentation + colors.prop.open + key + colors.prop.close + "=" + colors.value.open + printed + colors.value.close;
  }).join("");
}, NodeTypeTextNode = 3, printChildren2 = (children, config3, indentation, depth, refs, printer2) => children.map((child) => {
  let printedChild = typeof child == "string" ? printText2(child, config3) : printer2(child, config3, indentation, depth, refs);
  return printedChild === "" && typeof child == "object" && child !== null && child.nodeType !== NodeTypeTextNode ? "" : config3.spacingOuter + indentation + printedChild;
}).join(""), printText2 = (text, config3) => {
  let contentColor = config3.colors.content;
  return contentColor.open + escapeHTML2(text) + contentColor.close;
}, printComment2 = (comment, config3) => {
  let commentColor = config3.colors.comment;
  return commentColor.open + "<!--" + escapeHTML2(comment) + "-->" + commentColor.close;
}, printElement2 = (type5, printedProps, printedChildren, config3, indentation) => {
  let tagColor = config3.colors.tag;
  return tagColor.open + "<" + type5 + (printedProps && tagColor.close + printedProps + config3.spacingOuter + indentation + tagColor.open) + (printedChildren ? ">" + tagColor.close + printedChildren + config3.spacingOuter + indentation + tagColor.open + "</" + type5 : (printedProps && !config3.min ? "" : " ") + "/") + ">" + tagColor.close;
}, printElementAsLeaf2 = (type5, config3) => {
  let tagColor = config3.colors.tag;
  return tagColor.open + "<" + type5 + tagColor.close + " …" + tagColor.open + " />" + tagColor.close;
}, ELEMENT_NODE$1 = 1, TEXT_NODE$1 = 3, COMMENT_NODE$1 = 8, FRAGMENT_NODE2 = 11, ELEMENT_REGEXP2 = /^((HTML|SVG)\w*)?Element$/, isCustomElement2 = (val) => {
  let { tagName } = val;
  return !!(typeof tagName == "string" && tagName.includes("-") || typeof val.hasAttribute == "function" && val.hasAttribute("is"));
}, testNode2 = (val) => {
  let constructorName = val.constructor.name, { nodeType } = val;
  return nodeType === ELEMENT_NODE$1 && (ELEMENT_REGEXP2.test(constructorName) || isCustomElement2(val)) || nodeType === TEXT_NODE$1 && constructorName === "Text" || nodeType === COMMENT_NODE$1 && constructorName === "Comment" || nodeType === FRAGMENT_NODE2 && constructorName === "DocumentFragment";
};
function nodeIsText2(node) {
  return node.nodeType === TEXT_NODE$1;
}
function nodeIsComment2(node) {
  return node.nodeType === COMMENT_NODE$1;
}
function nodeIsFragment2(node) {
  return node.nodeType === FRAGMENT_NODE2;
}
function createDOMElementFilter(filterNode) {
  return { test: (val) => {
    var _val$constructor2;
    return ((val == null || (_val$constructor2 = val.constructor) == null ? void 0 : _val$constructor2.name) || isCustomElement2(val)) && testNode2(val);
  }, serialize: (node, config3, indentation, depth, refs, printer2) => {
    if (nodeIsText2(node)) return printText2(node.data, config3);
    if (nodeIsComment2(node)) return printComment2(node.data, config3);
    let type5 = nodeIsFragment2(node) ? "DocumentFragment" : node.tagName.toLowerCase();
    return ++depth > config3.maxDepth ? printElementAsLeaf2(type5, config3) : printElement2(type5, printProps2(nodeIsFragment2(node) ? [] : Array.from(node.attributes).map((attr) => attr.name).sort(), nodeIsFragment2(node) ? {} : Array.from(node.attributes).reduce((props, attribute) => (props[attribute.name] = attribute.value, props), {}), config3, indentation + config3.indent, depth, refs, printer2), printChildren2(Array.prototype.slice.call(node.childNodes || node.children).filter(filterNode), config3, indentation + config3.indent, depth, refs, printer2), config3, indentation);
  } };
}
var chalk2 = null, readFileSync = null, codeFrameColumns = null;
try {
  let nodeRequire = module && module.require;
  readFileSync = nodeRequire.call(module, "fs").readFileSync, codeFrameColumns = nodeRequire.call(module, "@babel/code-frame").codeFrameColumns, chalk2 = nodeRequire.call(module, "chalk");
} catch {
}
function getCodeFrame(frame) {
  let locationStart = frame.indexOf("(") + 1, locationEnd = frame.indexOf(")"), frameLocation = frame.slice(locationStart, locationEnd), frameLocationElements = frameLocation.split(":"), [filename, line, column] = [frameLocationElements[0], parseInt(frameLocationElements[1], 10), parseInt(frameLocationElements[2], 10)], rawFileContents = "";
  try {
    rawFileContents = readFileSync(filename, "utf-8");
  } catch {
    return "";
  }
  let codeFrame = codeFrameColumns(rawFileContents, { start: { line, column } }, { highlightCode: true, linesBelow: 0 });
  return chalk2.dim(frameLocation) + `
` + codeFrame + `
`;
}
function getUserCodeFrame() {
  if (!readFileSync || !codeFrameColumns) return "";
  let firstClientCodeFrame = new Error().stack.split(`
`).slice(1).find((frame) => !frame.includes("node_modules/"));
  return getCodeFrame(firstClientCodeFrame);
}
var TEXT_NODE2 = 3;
function jestFakeTimersAreEnabled() {
  return typeof jest < "u" && jest !== null ? setTimeout._isMockFunction === true || Object.prototype.hasOwnProperty.call(setTimeout, "clock") : false;
}
function getDocument() {
  if (typeof window > "u") throw new Error("Could not find default container");
  return window.document;
}
function getWindowFromNode(node) {
  if (node.defaultView) return node.defaultView;
  if (node.ownerDocument && node.ownerDocument.defaultView) return node.ownerDocument.defaultView;
  if (node.window) return node.window;
  throw node.ownerDocument && node.ownerDocument.defaultView === null ? new Error("It looks like the window object is not available for the provided node.") : node.then instanceof Function ? new Error("It looks like you passed a Promise object instead of a DOM node. Did you do something like `fireEvent.click(screen.findBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`, or await the findBy query `fireEvent.click(await screen.findBy...`?") : Array.isArray(node) ? new Error("It looks like you passed an Array instead of a DOM node. Did you do something like `fireEvent.click(screen.getAllBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`?") : typeof node.debug == "function" && typeof node.logTestingPlaygroundURL == "function" ? new Error("It looks like you passed a `screen` object. Did you do something like `fireEvent.click(screen, ...` when you meant to use a query, e.g. `fireEvent.click(screen.getBy..., `?") : new Error("The given node is not an Element, the node type is: " + typeof node + ".");
}
function checkContainerType(container) {
  if (!container || typeof container.querySelector != "function" || typeof container.querySelectorAll != "function") throw new TypeError("Expected container to be an Element, a Document or a DocumentFragment but got " + getTypeName(container) + ".");
  function getTypeName(object) {
    return typeof object == "object" ? object === null ? "null" : object.constructor.name : typeof object;
  }
}
var shouldHighlight = () => {
  if (typeof process > "u") return false;
  let colors;
  try {
    var _process$env;
    let colorsJSON = (_process$env = define_process_env_default) == null ? void 0 : _process$env.COLORS;
    colorsJSON && (colors = JSON.parse(colorsJSON));
  } catch {
  }
  return typeof colors == "boolean" ? colors : process.versions !== void 0 && process.versions.node !== void 0;
}, { DOMCollection: DOMCollection3 } = prettyFormat.plugins, ELEMENT_NODE2 = 1, COMMENT_NODE2 = 8;
function filterCommentsAndDefaultIgnoreTagsTags(value) {
  return value.nodeType !== COMMENT_NODE2 && (value.nodeType !== ELEMENT_NODE2 || !value.matches(getConfig2().defaultIgnore));
}
function prettyDOM(dom, maxLength, options) {
  if (options === void 0 && (options = {}), dom || (dom = getDocument().body), typeof maxLength != "number" && (maxLength = typeof process < "u" && typeof define_process_env_default < "u" && define_process_env_default.DEBUG_PRINT_LIMIT || 7e3), maxLength === 0) return "";
  dom.documentElement && (dom = dom.documentElement);
  let domTypeName = typeof dom;
  if (domTypeName === "object" ? domTypeName = dom.constructor.name : dom = {}, !("outerHTML" in dom)) throw new TypeError("Expected an element or document but got " + domTypeName);
  let { filterNode = filterCommentsAndDefaultIgnoreTagsTags, ...prettyFormatOptions } = options, debugContent = prettyFormat.format(dom, { plugins: [createDOMElementFilter(filterNode), DOMCollection3], printFunctionName: false, highlight: shouldHighlight(), ...prettyFormatOptions });
  return maxLength !== void 0 && dom.outerHTML.length > maxLength ? debugContent.slice(0, maxLength) + "..." : debugContent;
}
var logDOM = function() {
  let userCodeFrame = getUserCodeFrame();
  console.log(userCodeFrame ? prettyDOM(...arguments) + `

` + userCodeFrame : prettyDOM(...arguments));
}, config2 = { testIdAttribute: "data-testid", asyncUtilTimeout: 1e3, asyncWrapper: (cb) => cb(), unstable_advanceTimersWrapper: (cb) => cb(), eventWrapper: (cb) => cb(), defaultHidden: false, defaultIgnore: "script, style", showOriginalStackTrace: false, throwSuggestions: false, getElementError(message, container) {
  let prettifiedDOM = prettyDOM(container), error = new Error([message, "Ignored nodes: comments, " + config2.defaultIgnore + `
` + prettifiedDOM].filter(Boolean).join(`

`));
  return error.name = "TestingLibraryElementError", error;
}, _disableExpensiveErrorDiagnostics: false, computedStyleSupportsPseudoElements: false };
function runWithExpensiveErrorDiagnosticsDisabled(callback) {
  try {
    return config2._disableExpensiveErrorDiagnostics = true, callback();
  } finally {
    config2._disableExpensiveErrorDiagnostics = false;
  }
}
function configure(newConfig) {
  typeof newConfig == "function" && (newConfig = newConfig(config2)), config2 = { ...config2, ...newConfig };
}
function getConfig2() {
  return config2;
}
var labelledNodeNames = ["button", "meter", "output", "progress", "select", "textarea", "input"];
function getTextContent(node) {
  return labelledNodeNames.includes(node.nodeName.toLowerCase()) ? "" : node.nodeType === TEXT_NODE2 ? node.textContent : Array.from(node.childNodes).map((childNode) => getTextContent(childNode)).join("");
}
function getLabelContent(element) {
  let textContent;
  return element.tagName.toLowerCase() === "label" ? textContent = getTextContent(element) : textContent = element.value || element.textContent, textContent;
}
function getRealLabels(element) {
  if (element.labels !== void 0) {
    var _labels;
    return (_labels = element.labels) != null ? _labels : [];
  }
  if (!isLabelable(element)) return [];
  let labels = element.ownerDocument.querySelectorAll("label");
  return Array.from(labels).filter((label) => label.control === element);
}
function isLabelable(element) {
  return /BUTTON|METER|OUTPUT|PROGRESS|SELECT|TEXTAREA/.test(element.tagName) || element.tagName === "INPUT" && element.getAttribute("type") !== "hidden";
}
function getLabels3(container, element, _temp) {
  let { selector = "*" } = _temp === void 0 ? {} : _temp, ariaLabelledBy = element.getAttribute("aria-labelledby"), labelsId = ariaLabelledBy ? ariaLabelledBy.split(" ") : [];
  return labelsId.length ? labelsId.map((labelId) => {
    let labellingElement = container.querySelector('[id="' + labelId + '"]');
    return labellingElement ? { content: getLabelContent(labellingElement), formControl: null } : { content: "", formControl: null };
  }) : Array.from(getRealLabels(element)).map((label) => {
    let textToMatch = getLabelContent(label), labelledFormControl = Array.from(label.querySelectorAll("button, input, meter, output, progress, select, textarea")).filter((formControlElement) => formControlElement.matches(selector))[0];
    return { content: textToMatch, formControl: labelledFormControl };
  });
}
function assertNotNullOrUndefined(matcher) {
  if (matcher == null) throw new Error("It looks like " + matcher + " was passed instead of a matcher. Did you do something like getByText(" + matcher + ")?");
}
function fuzzyMatches(textToMatch, node, matcher, normalizer) {
  if (typeof textToMatch != "string") return false;
  assertNotNullOrUndefined(matcher);
  let normalizedText = normalizer(textToMatch);
  return typeof matcher == "string" || typeof matcher == "number" ? normalizedText.toLowerCase().includes(matcher.toString().toLowerCase()) : typeof matcher == "function" ? matcher(normalizedText, node) : matchRegExp(matcher, normalizedText);
}
function matches2(textToMatch, node, matcher, normalizer) {
  if (typeof textToMatch != "string") return false;
  assertNotNullOrUndefined(matcher);
  let normalizedText = normalizer(textToMatch);
  return matcher instanceof Function ? matcher(normalizedText, node) : matcher instanceof RegExp ? matchRegExp(matcher, normalizedText) : normalizedText === String(matcher);
}
function getDefaultNormalizer(_temp) {
  let { trim = true, collapseWhitespace = true } = _temp === void 0 ? {} : _temp;
  return (text) => {
    let normalizedText = text;
    return normalizedText = trim ? normalizedText.trim() : normalizedText, normalizedText = collapseWhitespace ? normalizedText.replace(/\s+/g, " ") : normalizedText, normalizedText;
  };
}
function makeNormalizer(_ref) {
  let { trim, collapseWhitespace, normalizer } = _ref;
  if (!normalizer) return getDefaultNormalizer({ trim, collapseWhitespace });
  if (typeof trim < "u" || typeof collapseWhitespace < "u") throw new Error('trim and collapseWhitespace are not supported with a normalizer. If you want to use the default trim and collapseWhitespace logic in your normalizer, use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer');
  return normalizer;
}
function matchRegExp(matcher, text) {
  let match = matcher.test(text);
  return matcher.global && matcher.lastIndex !== 0 && (console.warn("To match all elements we had to reset the lastIndex of the RegExp because the global flag is enabled. We encourage to remove the global flag from the RegExp."), matcher.lastIndex = 0), match;
}
function getNodeText(node) {
  return node.matches("input[type=submit], input[type=button], input[type=reset]") ? node.value : Array.from(node.childNodes).filter((child) => child.nodeType === TEXT_NODE2 && !!child.textContent).map((c) => c.textContent).join("");
}
var elementRoleList2 = buildElementRoleList2(import_aria_query3.elementRoles);
function isSubtreeInaccessible(element) {
  return element.hidden === true || element.getAttribute("aria-hidden") === "true" || element.ownerDocument.defaultView.getComputedStyle(element).display === "none";
}
function isInaccessible(element, options) {
  options === void 0 && (options = {});
  let { isSubtreeInaccessible: isSubtreeInaccessibleImpl = isSubtreeInaccessible } = options;
  if (element.ownerDocument.defaultView.getComputedStyle(element).visibility === "hidden") return true;
  let currentElement = element;
  for (; currentElement; ) {
    if (isSubtreeInaccessibleImpl(currentElement)) return true;
    currentElement = currentElement.parentElement;
  }
  return false;
}
function getImplicitAriaRoles2(currentNode) {
  for (let { match, roles: roles3 } of elementRoleList2) if (match(currentNode)) return [...roles3];
  return [];
}
function buildElementRoleList2(elementRolesMap) {
  function makeElementSelector(_ref) {
    let { name, attributes } = _ref;
    return "" + name + attributes.map((_ref2) => {
      let { name: attributeName, value, constraints = [] } = _ref2, shouldNotExist = constraints.indexOf("undefined") !== -1, shouldBeNonEmpty = constraints.indexOf("set") !== -1;
      return typeof value < "u" ? "[" + attributeName + '="' + value + '"]' : shouldNotExist ? ":not([" + attributeName + "])" : shouldBeNonEmpty ? "[" + attributeName + "]:not([" + attributeName + '=""])' : "[" + attributeName + "]";
    }).join("");
  }
  function getSelectorSpecificity(_ref3) {
    let { attributes = [] } = _ref3;
    return attributes.length;
  }
  function bySelectorSpecificity(_ref4, _ref5) {
    let { specificity: leftSpecificity } = _ref4, { specificity: rightSpecificity } = _ref5;
    return rightSpecificity - leftSpecificity;
  }
  function match(element) {
    let { attributes = [] } = element, typeTextIndex = attributes.findIndex((attribute) => attribute.value && attribute.name === "type" && attribute.value === "text");
    typeTextIndex >= 0 && (attributes = [...attributes.slice(0, typeTextIndex), ...attributes.slice(typeTextIndex + 1)]);
    let selector = makeElementSelector({ ...element, attributes });
    return (node) => typeTextIndex >= 0 && node.type !== "text" ? false : node.matches(selector);
  }
  let result = [];
  for (let [element, roles3] of elementRolesMap.entries()) result = [...result, { match: match(element), roles: Array.from(roles3), specificity: getSelectorSpecificity(element) }];
  return result.sort(bySelectorSpecificity);
}
function getRoles(container, _temp) {
  let { hidden = false } = _temp === void 0 ? {} : _temp;
  function flattenDOM(node) {
    return [node, ...Array.from(node.children).reduce((acc, child) => [...acc, ...flattenDOM(child)], [])];
  }
  return flattenDOM(container).filter((element) => hidden === false ? isInaccessible(element) === false : true).reduce((acc, node) => {
    let roles3 = [];
    return node.hasAttribute("role") ? roles3 = node.getAttribute("role").split(" ").slice(0, 1) : roles3 = getImplicitAriaRoles2(node), roles3.reduce((rolesAcc, role) => Array.isArray(rolesAcc[role]) ? { ...rolesAcc, [role]: [...rolesAcc[role], node] } : { ...rolesAcc, [role]: [node] }, acc);
  }, {});
}
function prettyRoles(dom, _ref6) {
  let { hidden, includeDescription } = _ref6, roles3 = getRoles(dom, { hidden });
  return Object.entries(roles3).filter((_ref7) => {
    let [role] = _ref7;
    return role !== "generic";
  }).map((_ref8) => {
    let [role, elements] = _ref8, delimiterBar = "-".repeat(50), elementsString = elements.map((el) => {
      let nameString = 'Name "' + computeAccessibleName2(el, { computedStyleSupportsPseudoElements: getConfig2().computedStyleSupportsPseudoElements }) + `":
`, domString = prettyDOM(el.cloneNode(false));
      if (includeDescription) {
        let descriptionString = 'Description "' + computeAccessibleDescription2(el, { computedStyleSupportsPseudoElements: getConfig2().computedStyleSupportsPseudoElements }) + `":
`;
        return "" + nameString + descriptionString + domString;
      }
      return "" + nameString + domString;
    }).join(`

`);
    return role + `:

` + elementsString + `

` + delimiterBar;
  }).join(`
`);
}
var logRoles = function(dom, _temp2) {
  let { hidden = false } = _temp2 === void 0 ? {} : _temp2;
  return console.log(prettyRoles(dom, { hidden }));
};
function computeAriaSelected(element) {
  return element.tagName === "OPTION" ? element.selected : checkBooleanAttribute(element, "aria-selected");
}
function computeAriaBusy(element) {
  return element.getAttribute("aria-busy") === "true";
}
function computeAriaChecked(element) {
  if (!("indeterminate" in element && element.indeterminate)) return "checked" in element ? element.checked : checkBooleanAttribute(element, "aria-checked");
}
function computeAriaPressed(element) {
  return checkBooleanAttribute(element, "aria-pressed");
}
function computeAriaCurrent(element) {
  var _ref9, _checkBooleanAttribut;
  return (_ref9 = (_checkBooleanAttribut = checkBooleanAttribute(element, "aria-current")) != null ? _checkBooleanAttribut : element.getAttribute("aria-current")) != null ? _ref9 : false;
}
function computeAriaExpanded(element) {
  return checkBooleanAttribute(element, "aria-expanded");
}
function checkBooleanAttribute(element, attribute) {
  let attributeValue = element.getAttribute(attribute);
  if (attributeValue === "true") return true;
  if (attributeValue === "false") return false;
}
function computeHeadingLevel(element) {
  let implicitHeadingLevels = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6 };
  return element.getAttribute("aria-level") && Number(element.getAttribute("aria-level")) || implicitHeadingLevels[element.tagName];
}
function computeAriaValueNow(element) {
  let valueNow = element.getAttribute("aria-valuenow");
  return valueNow === null ? void 0 : +valueNow;
}
function computeAriaValueMax(element) {
  let valueMax = element.getAttribute("aria-valuemax");
  return valueMax === null ? void 0 : +valueMax;
}
function computeAriaValueMin(element) {
  let valueMin = element.getAttribute("aria-valuemin");
  return valueMin === null ? void 0 : +valueMin;
}
function computeAriaValueText(element) {
  let valueText = element.getAttribute("aria-valuetext");
  return valueText === null ? void 0 : valueText;
}
var normalize2 = getDefaultNormalizer();
function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}
function getRegExpMatcher(string) {
  return new RegExp(escapeRegExp(string.toLowerCase()), "i");
}
function makeSuggestion(queryName, element, content, _ref) {
  let { variant, name } = _ref, warning = "", queryOptions = {}, queryArgs = [["Role", "TestId"].includes(queryName) ? content : getRegExpMatcher(content)];
  name && (queryOptions.name = getRegExpMatcher(name)), queryName === "Role" && isInaccessible(element) && (queryOptions.hidden = true, warning = `Element is inaccessible. This means that the element and all its children are invisible to screen readers.
    If you are using the aria-hidden prop, make sure this is the right choice for your case.
    `), Object.keys(queryOptions).length > 0 && queryArgs.push(queryOptions);
  let queryMethod = variant + "By" + queryName;
  return { queryName, queryMethod, queryArgs, variant, warning, toString() {
    warning && console.warn(warning);
    let [text, options] = queryArgs;
    return text = typeof text == "string" ? "'" + text + "'" : text, options = options ? ", { " + Object.entries(options).map((_ref2) => {
      let [k2, v] = _ref2;
      return k2 + ": " + v;
    }).join(", ") + " }" : "", queryMethod + "(" + text + options + ")";
  } };
}
function canSuggest(currentMethod, requestedMethod, data) {
  return data && (!requestedMethod || requestedMethod.toLowerCase() === currentMethod.toLowerCase());
}
function getSuggestedQuery(element, variant, method) {
  var _element$getAttribute, _getImplicitAriaRoles;
  if (variant === void 0 && (variant = "get"), element.matches(getConfig2().defaultIgnore)) return;
  let role = (_element$getAttribute = element.getAttribute("role")) != null ? _element$getAttribute : (_getImplicitAriaRoles = getImplicitAriaRoles2(element)) == null ? void 0 : _getImplicitAriaRoles[0];
  if (role !== "generic" && canSuggest("Role", method, role)) return makeSuggestion("Role", element, role, { variant, name: computeAccessibleName2(element, { computedStyleSupportsPseudoElements: getConfig2().computedStyleSupportsPseudoElements }) });
  let labelText = getLabels3(document, element).map((label) => label.content).join(" ");
  if (canSuggest("LabelText", method, labelText)) return makeSuggestion("LabelText", element, labelText, { variant });
  let placeholderText = element.getAttribute("placeholder");
  if (canSuggest("PlaceholderText", method, placeholderText)) return makeSuggestion("PlaceholderText", element, placeholderText, { variant });
  let textContent = normalize2(getNodeText(element));
  if (canSuggest("Text", method, textContent)) return makeSuggestion("Text", element, textContent, { variant });
  if (canSuggest("DisplayValue", method, element.value)) return makeSuggestion("DisplayValue", element, normalize2(element.value), { variant });
  let alt = element.getAttribute("alt");
  if (canSuggest("AltText", method, alt)) return makeSuggestion("AltText", element, alt, { variant });
  let title = element.getAttribute("title");
  if (canSuggest("Title", method, title)) return makeSuggestion("Title", element, title, { variant });
  let testId = element.getAttribute(getConfig2().testIdAttribute);
  if (canSuggest("TestId", method, testId)) return makeSuggestion("TestId", element, testId, { variant });
}
function copyStackTrace(target, source) {
  target.stack = source.stack.replace(source.message, target.message);
}
function waitFor(callback, _ref) {
  let { container = getDocument(), timeout = getConfig2().asyncUtilTimeout, showOriginalStackTrace = getConfig2().showOriginalStackTrace, stackTraceError, interval = 50, onTimeout = (error) => (Object.defineProperty(error, "message", { value: getConfig2().getElementError(error.message, container).message }), error), mutationObserverOptions = { subtree: true, childList: true, attributes: true, characterData: true } } = _ref;
  if (typeof callback != "function") throw new TypeError("Received `callback` arg must be a function");
  return new Promise(async (resolve, reject) => {
    let lastError, intervalId, observer, finished = false, promiseStatus = "idle", overallTimeoutTimer = setTimeout(handleTimeout, timeout), usingJestFakeTimers = jestFakeTimersAreEnabled();
    if (usingJestFakeTimers) {
      let { unstable_advanceTimersWrapper: advanceTimersWrapper } = getConfig2();
      for (checkCallback(); !finished; ) {
        if (!jestFakeTimersAreEnabled()) {
          let error = new Error("Changed from using fake timers to real timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to real timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
          showOriginalStackTrace || copyStackTrace(error, stackTraceError), reject(error);
          return;
        }
        if (await advanceTimersWrapper(async () => {
          jest.advanceTimersByTime(interval);
        }), finished) break;
        checkCallback();
      }
    } else {
      try {
        checkContainerType(container);
      } catch (e) {
        reject(e);
        return;
      }
      intervalId = setInterval(checkRealTimersCallback, interval);
      let { MutationObserver } = getWindowFromNode(container);
      observer = new MutationObserver(checkRealTimersCallback), observer.observe(container, mutationObserverOptions), checkCallback();
    }
    function onDone(error, result) {
      finished = true, clearTimeout(overallTimeoutTimer), usingJestFakeTimers || (clearInterval(intervalId), observer.disconnect()), error ? reject(error) : resolve(result);
    }
    function checkRealTimersCallback() {
      if (jestFakeTimersAreEnabled()) {
        let error = new Error("Changed from using real timers to fake timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to fake timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
        return showOriginalStackTrace || copyStackTrace(error, stackTraceError), reject(error);
      } else return checkCallback();
    }
    function checkCallback() {
      if (promiseStatus !== "pending") try {
        let result = runWithExpensiveErrorDiagnosticsDisabled(callback);
        typeof (result == null ? void 0 : result.then) == "function" ? (promiseStatus = "pending", result.then((resolvedValue) => {
          promiseStatus = "resolved", onDone(null, resolvedValue);
        }, (rejectedValue) => {
          promiseStatus = "rejected", lastError = rejectedValue;
        })) : onDone(null, result);
      } catch (error) {
        lastError = error;
      }
    }
    function handleTimeout() {
      let error;
      lastError ? (error = lastError, !showOriginalStackTrace && error.name === "TestingLibraryElementError" && copyStackTrace(error, stackTraceError)) : (error = new Error("Timed out in waitFor."), showOriginalStackTrace || copyStackTrace(error, stackTraceError)), onDone(onTimeout(error), null);
    }
  });
}
function waitForWrapper(callback, options) {
  let stackTraceError = new Error("STACK_TRACE_MESSAGE");
  return getConfig2().asyncWrapper(() => waitFor(callback, { stackTraceError, ...options }));
}
function getElementError(message, container) {
  return getConfig2().getElementError(message, container);
}
function getMultipleElementsFoundError(message, container) {
  return getElementError(message + "\n\n(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).", container);
}
function queryAllByAttribute(attribute, container, text, _temp) {
  let { exact = true, collapseWhitespace, trim, normalizer } = _temp === void 0 ? {} : _temp, matcher = exact ? matches2 : fuzzyMatches, matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });
  return Array.from(container.querySelectorAll("[" + attribute + "]")).filter((node) => matcher(node.getAttribute(attribute), node, text, matchNormalizer));
}
function queryByAttribute(attribute, container, text, options) {
  let els = queryAllByAttribute(attribute, container, text, options);
  if (els.length > 1) throw getMultipleElementsFoundError("Found multiple elements by [" + attribute + "=" + text + "]", container);
  return els[0] || null;
}
function makeSingleQuery(allQuery, getMultipleError2) {
  return function(container) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
    let els = allQuery(container, ...args);
    if (els.length > 1) {
      let elementStrings = els.map((element) => getElementError(null, element).message).join(`

`);
      throw getMultipleElementsFoundError(getMultipleError2(container, ...args) + `

Here are the matching elements:

` + elementStrings, container);
    }
    return els[0] || null;
  };
}
function getSuggestionError(suggestion, container) {
  return getConfig2().getElementError(`A better query is available, try this:
` + suggestion.toString() + `
`, container);
}
function makeGetAllQuery(allQuery, getMissingError2) {
  return function(container) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
    let els = allQuery(container, ...args);
    if (!els.length) throw getConfig2().getElementError(getMissingError2(container, ...args), container);
    return els;
  };
}
function makeFindQuery(getter) {
  return (container, text, options, waitForOptions) => waitForWrapper(() => getter(container, text, options), { container, ...waitForOptions });
}
var wrapSingleQueryWithSuggestion = (query, queryAllByName, variant) => function(container) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
  let element = query(container, ...args), [{ suggest = getConfig2().throwSuggestions } = {}] = args.slice(-1);
  if (element && suggest) {
    let suggestion = getSuggestedQuery(element, variant);
    if (suggestion && !queryAllByName.endsWith(suggestion.queryName)) throw getSuggestionError(suggestion.toString(), container);
  }
  return element;
}, wrapAllByQueryWithSuggestion = (query, queryAllByName, variant) => function(container) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) args[_key4 - 1] = arguments[_key4];
  let els = query(container, ...args), [{ suggest = getConfig2().throwSuggestions } = {}] = args.slice(-1);
  if (els.length && suggest) {
    let uniqueSuggestionMessages = [...new Set(els.map((element) => {
      var _getSuggestedQuery;
      return (_getSuggestedQuery = getSuggestedQuery(element, variant)) == null ? void 0 : _getSuggestedQuery.toString();
    }))];
    if (uniqueSuggestionMessages.length === 1 && !queryAllByName.endsWith(getSuggestedQuery(els[0], variant).queryName)) throw getSuggestionError(uniqueSuggestionMessages[0], container);
  }
  return els;
};
function buildQueries(queryAllBy, getMultipleError2, getMissingError2) {
  let queryBy = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllBy, getMultipleError2), queryAllBy.name, "query"), getAllBy = makeGetAllQuery(queryAllBy, getMissingError2), getBy = makeSingleQuery(getAllBy, getMultipleError2), getByWithSuggestions = wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, "get"), getAllWithSuggestions = wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name.replace("query", "get"), "getAll"), findAllBy = makeFindQuery(wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name, "findAll")), findBy = makeFindQuery(wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, "find"));
  return [queryBy, getAllWithSuggestions, getByWithSuggestions, findAllBy, findBy];
}
var queryHelpers = Object.freeze({ __proto__: null, getElementError, wrapAllByQueryWithSuggestion, wrapSingleQueryWithSuggestion, getMultipleElementsFoundError, queryAllByAttribute, queryByAttribute, makeSingleQuery, makeGetAllQuery, makeFindQuery, buildQueries });
function queryAllLabels(container) {
  return Array.from(container.querySelectorAll("label,input")).map((node) => ({ node, textToMatch: getLabelContent(node) })).filter((_ref) => {
    let { textToMatch } = _ref;
    return textToMatch !== null;
  });
}
var queryAllLabelsByText = function(container, text, _temp) {
  let { exact = true, trim, collapseWhitespace, normalizer } = _temp === void 0 ? {} : _temp, matcher = exact ? matches2 : fuzzyMatches, matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });
  return queryAllLabels(container).filter((_ref2) => {
    let { node, textToMatch } = _ref2;
    return matcher(textToMatch, node, text, matchNormalizer);
  }).map((_ref3) => {
    let { node } = _ref3;
    return node;
  });
}, queryAllByLabelText = function(container, text, _temp2) {
  let { selector = "*", exact = true, collapseWhitespace, trim, normalizer } = _temp2 === void 0 ? {} : _temp2;
  checkContainerType(container);
  let matcher = exact ? matches2 : fuzzyMatches, matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer }), matchingLabelledElements = Array.from(container.querySelectorAll("*")).filter((element) => getRealLabels(element).length || element.hasAttribute("aria-labelledby")).reduce((labelledElements, labelledElement) => {
    let labelList = getLabels3(container, labelledElement, { selector });
    labelList.filter((label) => !!label.formControl).forEach((label) => {
      matcher(label.content, label.formControl, text, matchNormalizer) && label.formControl && labelledElements.push(label.formControl);
    });
    let labelsValue = labelList.filter((label) => !!label.content).map((label) => label.content);
    return matcher(labelsValue.join(" "), labelledElement, text, matchNormalizer) && labelledElements.push(labelledElement), labelsValue.length > 1 && labelsValue.forEach((labelValue, index) => {
      matcher(labelValue, labelledElement, text, matchNormalizer) && labelledElements.push(labelledElement);
      let labelsFiltered = [...labelsValue];
      labelsFiltered.splice(index, 1), labelsFiltered.length > 1 && matcher(labelsFiltered.join(" "), labelledElement, text, matchNormalizer) && labelledElements.push(labelledElement);
    }), labelledElements;
  }, []).concat(queryAllByAttribute("aria-label", container, text, { exact, normalizer: matchNormalizer }));
  return Array.from(new Set(matchingLabelledElements)).filter((element) => element.matches(selector));
}, getAllByLabelText = function(container, text) {
  for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) rest[_key - 2] = arguments[_key];
  let els = queryAllByLabelText(container, text, ...rest);
  if (!els.length) {
    let labels = queryAllLabelsByText(container, text, ...rest);
    if (labels.length) {
      let tagNames = labels.map((label) => getTagNameOfElementAssociatedWithLabelViaFor(container, label)).filter((tagName) => !!tagName);
      throw tagNames.length ? getConfig2().getElementError(tagNames.map((tagName) => "Found a label with the text of: " + text + ", however the element associated with this label (<" + tagName + " />) is non-labellable [https://html.spec.whatwg.org/multipage/forms.html#category-label]. If you really need to label a <" + tagName + " />, you can use aria-label or aria-labelledby instead.").join(`

`), container) : getConfig2().getElementError("Found a label with the text of: " + text + `, however no form control was found associated to that label. Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.`, container);
    } else throw getConfig2().getElementError("Unable to find a label with the text of: " + text, container);
  }
  return els;
};
function getTagNameOfElementAssociatedWithLabelViaFor(container, label) {
  let htmlFor = label.getAttribute("for");
  if (!htmlFor) return null;
  let element = container.querySelector('[id="' + htmlFor + '"]');
  return element ? element.tagName.toLowerCase() : null;
}
var getMultipleError$7 = (c, text) => "Found multiple elements with the text of: " + text, queryByLabelText = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllByLabelText, getMultipleError$7), queryAllByLabelText.name, "query"), getByLabelText = makeSingleQuery(getAllByLabelText, getMultipleError$7), findAllByLabelText = makeFindQuery(wrapAllByQueryWithSuggestion(getAllByLabelText, getAllByLabelText.name, "findAll")), findByLabelText = makeFindQuery(wrapSingleQueryWithSuggestion(getByLabelText, getAllByLabelText.name, "find")), getAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(getAllByLabelText, getAllByLabelText.name, "getAll"), getByLabelTextWithSuggestions = wrapSingleQueryWithSuggestion(getByLabelText, getAllByLabelText.name, "get"), queryAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByLabelText, queryAllByLabelText.name, "queryAll"), queryAllByPlaceholderText = function() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
  return checkContainerType(args[0]), queryAllByAttribute("placeholder", ...args);
}, getMultipleError$6 = (c, text) => "Found multiple elements with the placeholder text of: " + text, getMissingError$6 = (c, text) => "Unable to find an element with the placeholder text of: " + text, queryAllByPlaceholderTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByPlaceholderText, queryAllByPlaceholderText.name, "queryAll"), [queryByPlaceholderText, getAllByPlaceholderText, getByPlaceholderText, findAllByPlaceholderText, findByPlaceholderText] = buildQueries(queryAllByPlaceholderText, getMultipleError$6, getMissingError$6), queryAllByText = function(container, text, _temp) {
  let { selector = "*", exact = true, collapseWhitespace, trim, ignore = getConfig2().defaultIgnore, normalizer } = _temp === void 0 ? {} : _temp;
  checkContainerType(container);
  let matcher = exact ? matches2 : fuzzyMatches, matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer }), baseArray = [];
  return typeof container.matches == "function" && container.matches(selector) && (baseArray = [container]), [...baseArray, ...Array.from(container.querySelectorAll(selector))].filter((node) => !ignore || !node.matches(ignore)).filter((node) => matcher(getNodeText(node), node, text, matchNormalizer));
}, getMultipleError$5 = (c, text) => "Found multiple elements with the text: " + text, getMissingError$5 = function(c, text, options) {
  options === void 0 && (options = {});
  let { collapseWhitespace, trim, normalizer, selector } = options, normalizedText = makeNormalizer({ collapseWhitespace, trim, normalizer })(text.toString()), isNormalizedDifferent = normalizedText !== text.toString(), isCustomSelector = (selector ?? "*") !== "*";
  return "Unable to find an element with the text: " + (isNormalizedDifferent ? normalizedText + " (normalized from '" + text + "')" : text) + (isCustomSelector ? ", which matches selector '" + selector + "'" : "") + ". This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.";
}, queryAllByTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByText, queryAllByText.name, "queryAll"), [queryByText, getAllByText, getByText, findAllByText, findByText] = buildQueries(queryAllByText, getMultipleError$5, getMissingError$5), queryAllByDisplayValue = function(container, value, _temp) {
  let { exact = true, collapseWhitespace, trim, normalizer } = _temp === void 0 ? {} : _temp;
  checkContainerType(container);
  let matcher = exact ? matches2 : fuzzyMatches, matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });
  return Array.from(container.querySelectorAll("input,textarea,select")).filter((node) => node.tagName === "SELECT" ? Array.from(node.options).filter((option) => option.selected).some((optionNode) => matcher(getNodeText(optionNode), optionNode, value, matchNormalizer)) : matcher(node.value, node, value, matchNormalizer));
}, getMultipleError$4 = (c, value) => "Found multiple elements with the display value: " + value + ".", getMissingError$4 = (c, value) => "Unable to find an element with the display value: " + value + ".", queryAllByDisplayValueWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByDisplayValue, queryAllByDisplayValue.name, "queryAll"), [queryByDisplayValue, getAllByDisplayValue, getByDisplayValue, findAllByDisplayValue, findByDisplayValue] = buildQueries(queryAllByDisplayValue, getMultipleError$4, getMissingError$4), VALID_TAG_REGEXP = /^(img|input|area|.+-.+)$/i, queryAllByAltText = function(container, alt, options) {
  return options === void 0 && (options = {}), checkContainerType(container), queryAllByAttribute("alt", container, alt, options).filter((node) => VALID_TAG_REGEXP.test(node.tagName));
}, getMultipleError$3 = (c, alt) => "Found multiple elements with the alt text: " + alt, getMissingError$3 = (c, alt) => "Unable to find an element with the alt text: " + alt, queryAllByAltTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByAltText, queryAllByAltText.name, "queryAll"), [queryByAltText, getAllByAltText, getByAltText, findAllByAltText, findByAltText] = buildQueries(queryAllByAltText, getMultipleError$3, getMissingError$3), isSvgTitle = (node) => {
  var _node$parentElement;
  return node.tagName.toLowerCase() === "title" && ((_node$parentElement = node.parentElement) == null ? void 0 : _node$parentElement.tagName.toLowerCase()) === "svg";
}, queryAllByTitle = function(container, text, _temp) {
  let { exact = true, collapseWhitespace, trim, normalizer } = _temp === void 0 ? {} : _temp;
  checkContainerType(container);
  let matcher = exact ? matches2 : fuzzyMatches, matchNormalizer = makeNormalizer({ collapseWhitespace, trim, normalizer });
  return Array.from(container.querySelectorAll("[title], svg > title")).filter((node) => matcher(node.getAttribute("title"), node, text, matchNormalizer) || isSvgTitle(node) && matcher(getNodeText(node), node, text, matchNormalizer));
}, getMultipleError$2 = (c, title) => "Found multiple elements with the title: " + title + ".", getMissingError$2 = (c, title) => "Unable to find an element with the title: " + title + ".", queryAllByTitleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTitle, queryAllByTitle.name, "queryAll"), [queryByTitle, getAllByTitle, getByTitle, findAllByTitle, findByTitle] = buildQueries(queryAllByTitle, getMultipleError$2, getMissingError$2), queryAllByRole = function(container, role, _temp) {
  let { hidden = getConfig2().defaultHidden, name, description, queryFallbacks = false, selected, busy, checked, pressed, current, level, expanded, value: { now: valueNow, min: valueMin, max: valueMax, text: valueText } = {} } = _temp === void 0 ? {} : _temp;
  if (checkContainerType(container), selected !== void 0) {
    var _allRoles$get;
    if (((_allRoles$get = import_aria_query3.roles.get(role)) == null ? void 0 : _allRoles$get.props["aria-selected"]) === void 0) throw new Error('"aria-selected" is not supported on role "' + role + '".');
  }
  if (busy !== void 0) {
    var _allRoles$get2;
    if (((_allRoles$get2 = import_aria_query3.roles.get(role)) == null ? void 0 : _allRoles$get2.props["aria-busy"]) === void 0) throw new Error('"aria-busy" is not supported on role "' + role + '".');
  }
  if (checked !== void 0) {
    var _allRoles$get3;
    if (((_allRoles$get3 = import_aria_query3.roles.get(role)) == null ? void 0 : _allRoles$get3.props["aria-checked"]) === void 0) throw new Error('"aria-checked" is not supported on role "' + role + '".');
  }
  if (pressed !== void 0) {
    var _allRoles$get4;
    if (((_allRoles$get4 = import_aria_query3.roles.get(role)) == null ? void 0 : _allRoles$get4.props["aria-pressed"]) === void 0) throw new Error('"aria-pressed" is not supported on role "' + role + '".');
  }
  if (current !== void 0) {
    var _allRoles$get5;
    if (((_allRoles$get5 = import_aria_query3.roles.get(role)) == null ? void 0 : _allRoles$get5.props["aria-current"]) === void 0) throw new Error('"aria-current" is not supported on role "' + role + '".');
  }
  if (level !== void 0 && role !== "heading") throw new Error('Role "' + role + '" cannot have "level" property.');
  if (valueNow !== void 0) {
    var _allRoles$get6;
    if (((_allRoles$get6 = import_aria_query3.roles.get(role)) == null ? void 0 : _allRoles$get6.props["aria-valuenow"]) === void 0) throw new Error('"aria-valuenow" is not supported on role "' + role + '".');
  }
  if (valueMax !== void 0) {
    var _allRoles$get7;
    if (((_allRoles$get7 = import_aria_query3.roles.get(role)) == null ? void 0 : _allRoles$get7.props["aria-valuemax"]) === void 0) throw new Error('"aria-valuemax" is not supported on role "' + role + '".');
  }
  if (valueMin !== void 0) {
    var _allRoles$get8;
    if (((_allRoles$get8 = import_aria_query3.roles.get(role)) == null ? void 0 : _allRoles$get8.props["aria-valuemin"]) === void 0) throw new Error('"aria-valuemin" is not supported on role "' + role + '".');
  }
  if (valueText !== void 0) {
    var _allRoles$get9;
    if (((_allRoles$get9 = import_aria_query3.roles.get(role)) == null ? void 0 : _allRoles$get9.props["aria-valuetext"]) === void 0) throw new Error('"aria-valuetext" is not supported on role "' + role + '".');
  }
  if (expanded !== void 0) {
    var _allRoles$get10;
    if (((_allRoles$get10 = import_aria_query3.roles.get(role)) == null ? void 0 : _allRoles$get10.props["aria-expanded"]) === void 0) throw new Error('"aria-expanded" is not supported on role "' + role + '".');
  }
  let subtreeIsInaccessibleCache = /* @__PURE__ */ new WeakMap();
  function cachedIsSubtreeInaccessible(element) {
    return subtreeIsInaccessibleCache.has(element) || subtreeIsInaccessibleCache.set(element, isSubtreeInaccessible(element)), subtreeIsInaccessibleCache.get(element);
  }
  return Array.from(container.querySelectorAll(makeRoleSelector(role))).filter((node) => {
    if (node.hasAttribute("role")) {
      let roleValue = node.getAttribute("role");
      if (queryFallbacks) return roleValue.split(" ").filter(Boolean).some((roleAttributeToken) => roleAttributeToken === role);
      let [firstRoleAttributeToken] = roleValue.split(" ");
      return firstRoleAttributeToken === role;
    }
    return getImplicitAriaRoles2(node).some((implicitRole) => implicitRole === role);
  }).filter((element) => {
    if (selected !== void 0) return selected === computeAriaSelected(element);
    if (busy !== void 0) return busy === computeAriaBusy(element);
    if (checked !== void 0) return checked === computeAriaChecked(element);
    if (pressed !== void 0) return pressed === computeAriaPressed(element);
    if (current !== void 0) return current === computeAriaCurrent(element);
    if (expanded !== void 0) return expanded === computeAriaExpanded(element);
    if (level !== void 0) return level === computeHeadingLevel(element);
    if (valueNow !== void 0 || valueMax !== void 0 || valueMin !== void 0 || valueText !== void 0) {
      let valueMatches = true;
      if (valueNow !== void 0 && valueMatches && (valueMatches = valueNow === computeAriaValueNow(element)), valueMax !== void 0 && valueMatches && (valueMatches = valueMax === computeAriaValueMax(element)), valueMin !== void 0 && valueMatches && (valueMatches = valueMin === computeAriaValueMin(element)), valueText !== void 0) {
        var _computeAriaValueText;
        valueMatches && (valueMatches = matches2((_computeAriaValueText = computeAriaValueText(element)) != null ? _computeAriaValueText : null, element, valueText, (text) => text));
      }
      return valueMatches;
    }
    return true;
  }).filter((element) => name === void 0 ? true : matches2(computeAccessibleName2(element, { computedStyleSupportsPseudoElements: getConfig2().computedStyleSupportsPseudoElements }), element, name, (text) => text)).filter((element) => description === void 0 ? true : matches2(computeAccessibleDescription2(element, { computedStyleSupportsPseudoElements: getConfig2().computedStyleSupportsPseudoElements }), element, description, (text) => text)).filter((element) => hidden === false ? isInaccessible(element, { isSubtreeInaccessible: cachedIsSubtreeInaccessible }) === false : true);
};
function makeRoleSelector(role) {
  var _roleElements$get;
  let explicitRoleSelector = '*[role~="' + role + '"]', roleRelations = (_roleElements$get = import_aria_query3.roleElements.get(role)) != null ? _roleElements$get : /* @__PURE__ */ new Set(), implicitRoleSelectors = new Set(Array.from(roleRelations).map((_ref) => {
    let { name } = _ref;
    return name;
  }));
  return [explicitRoleSelector].concat(Array.from(implicitRoleSelectors)).join(",");
}
var getNameHint = (name) => {
  let nameHint = "";
  return name === void 0 ? nameHint = "" : typeof name == "string" ? nameHint = ' and name "' + name + '"' : nameHint = " and name `" + name + "`", nameHint;
}, getMultipleError$1 = function(c, role, _temp2) {
  let { name } = _temp2 === void 0 ? {} : _temp2;
  return 'Found multiple elements with the role "' + role + '"' + getNameHint(name);
}, getMissingError$1 = function(container, role, _temp3) {
  let { hidden = getConfig2().defaultHidden, name, description } = _temp3 === void 0 ? {} : _temp3;
  if (getConfig2()._disableExpensiveErrorDiagnostics) return 'Unable to find role="' + role + '"' + getNameHint(name);
  let roles3 = "";
  Array.from(container.children).forEach((childElement) => {
    roles3 += prettyRoles(childElement, { hidden, includeDescription: description !== void 0 });
  });
  let roleMessage;
  roles3.length === 0 ? hidden === false ? roleMessage = "There are no accessible roles. But there might be some inaccessible roles. If you wish to access them, then set the `hidden` option to `true`. Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole" : roleMessage = "There are no available roles." : roleMessage = (`
Here are the ` + (hidden === false ? "accessible" : "available") + ` roles:

  ` + roles3.replace(/\n/g, `
  `).replace(/\n\s\s\n/g, `

`) + `
`).trim();
  let nameHint = "";
  name === void 0 ? nameHint = "" : typeof name == "string" ? nameHint = ' and name "' + name + '"' : nameHint = " and name `" + name + "`";
  let descriptionHint = "";
  return description === void 0 ? descriptionHint = "" : typeof description == "string" ? descriptionHint = ' and description "' + description + '"' : descriptionHint = " and description `" + description + "`", (`
Unable to find an ` + (hidden === false ? "accessible " : "") + 'element with the role "' + role + '"' + nameHint + descriptionHint + `

` + roleMessage).trim();
}, queryAllByRoleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByRole, queryAllByRole.name, "queryAll"), [queryByRole, getAllByRole, getByRole, findAllByRole, findByRole] = buildQueries(queryAllByRole, getMultipleError$1, getMissingError$1), getTestIdAttribute = () => getConfig2().testIdAttribute, queryAllByTestId = function() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
  return checkContainerType(args[0]), queryAllByAttribute(getTestIdAttribute(), ...args);
}, getMultipleError = (c, id) => "Found multiple elements by: [" + getTestIdAttribute() + '="' + id + '"]', getMissingError = (c, id) => "Unable to find an element by: [" + getTestIdAttribute() + '="' + id + '"]', queryAllByTestIdWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTestId, queryAllByTestId.name, "queryAll"), [queryByTestId, getAllByTestId, getByTestId, findAllByTestId, findByTestId] = buildQueries(queryAllByTestId, getMultipleError, getMissingError), queries = Object.freeze({ __proto__: null, queryAllByLabelText: queryAllByLabelTextWithSuggestions, queryByLabelText, getAllByLabelText: getAllByLabelTextWithSuggestions, getByLabelText: getByLabelTextWithSuggestions, findAllByLabelText, findByLabelText, queryByPlaceholderText, queryAllByPlaceholderText: queryAllByPlaceholderTextWithSuggestions, getByPlaceholderText, getAllByPlaceholderText, findAllByPlaceholderText, findByPlaceholderText, queryByText, queryAllByText: queryAllByTextWithSuggestions, getByText, getAllByText, findAllByText, findByText, queryByDisplayValue, queryAllByDisplayValue: queryAllByDisplayValueWithSuggestions, getByDisplayValue, getAllByDisplayValue, findAllByDisplayValue, findByDisplayValue, queryByAltText, queryAllByAltText: queryAllByAltTextWithSuggestions, getByAltText, getAllByAltText, findAllByAltText, findByAltText, queryByTitle, queryAllByTitle: queryAllByTitleWithSuggestions, getByTitle, getAllByTitle, findAllByTitle, findByTitle, queryByRole, queryAllByRole: queryAllByRoleWithSuggestions, getAllByRole, getByRole, findAllByRole, findByRole, queryByTestId, queryAllByTestId: queryAllByTestIdWithSuggestions, getByTestId, getAllByTestId, findAllByTestId, findByTestId });
function getQueriesForElement(element, queries$1, initialValue2) {
  return queries$1 === void 0 && (queries$1 = queries), initialValue2 === void 0 && (initialValue2 = {}), Object.keys(queries$1).reduce((helpers, key) => {
    let fn3 = queries$1[key];
    return helpers[key] = fn3.bind(null, element), helpers;
  }, initialValue2);
}
var isRemoved = (result) => !result || Array.isArray(result) && !result.length;
function initialCheck(elements) {
  if (isRemoved(elements)) throw new Error("The element(s) given to waitForElementToBeRemoved are already removed. waitForElementToBeRemoved requires that the element(s) exist(s) before waiting for removal.");
}
async function waitForElementToBeRemoved(callback, options) {
  let timeoutError = new Error("Timed out in waitForElementToBeRemoved.");
  if (typeof callback != "function") {
    initialCheck(callback);
    let getRemainingElements = (Array.isArray(callback) ? callback : [callback]).map((element) => {
      let parent = element.parentElement;
      if (parent === null) return () => null;
      for (; parent.parentElement; ) parent = parent.parentElement;
      return () => parent.contains(element) ? element : null;
    });
    callback = () => getRemainingElements.map((c) => c()).filter(Boolean);
  }
  return initialCheck(callback()), waitForWrapper(() => {
    let result;
    try {
      result = callback();
    } catch (error) {
      if (error.name === "TestingLibraryElementError") return;
      throw error;
    }
    if (!isRemoved(result)) throw timeoutError;
  }, options);
}
var eventMap = { copy: { EventType: "ClipboardEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, cut: { EventType: "ClipboardEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, paste: { EventType: "ClipboardEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, compositionEnd: { EventType: "CompositionEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, compositionStart: { EventType: "CompositionEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, compositionUpdate: { EventType: "CompositionEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, keyDown: { EventType: "KeyboardEvent", defaultInit: { bubbles: true, cancelable: true, charCode: 0, composed: true } }, keyPress: { EventType: "KeyboardEvent", defaultInit: { bubbles: true, cancelable: true, charCode: 0, composed: true } }, keyUp: { EventType: "KeyboardEvent", defaultInit: { bubbles: true, cancelable: true, charCode: 0, composed: true } }, focus: { EventType: "FocusEvent", defaultInit: { bubbles: false, cancelable: false, composed: true } }, blur: { EventType: "FocusEvent", defaultInit: { bubbles: false, cancelable: false, composed: true } }, focusIn: { EventType: "FocusEvent", defaultInit: { bubbles: true, cancelable: false, composed: true } }, focusOut: { EventType: "FocusEvent", defaultInit: { bubbles: true, cancelable: false, composed: true } }, change: { EventType: "Event", defaultInit: { bubbles: true, cancelable: false } }, input: { EventType: "InputEvent", defaultInit: { bubbles: true, cancelable: false, composed: true } }, invalid: { EventType: "Event", defaultInit: { bubbles: false, cancelable: true } }, submit: { EventType: "Event", defaultInit: { bubbles: true, cancelable: true } }, reset: { EventType: "Event", defaultInit: { bubbles: true, cancelable: true } }, click: { EventType: "MouseEvent", defaultInit: { bubbles: true, cancelable: true, button: 0, composed: true } }, contextMenu: { EventType: "MouseEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, dblClick: { EventType: "MouseEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, drag: { EventType: "DragEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, dragEnd: { EventType: "DragEvent", defaultInit: { bubbles: true, cancelable: false, composed: true } }, dragEnter: { EventType: "DragEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, dragExit: { EventType: "DragEvent", defaultInit: { bubbles: true, cancelable: false, composed: true } }, dragLeave: { EventType: "DragEvent", defaultInit: { bubbles: true, cancelable: false, composed: true } }, dragOver: { EventType: "DragEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, dragStart: { EventType: "DragEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, drop: { EventType: "DragEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, mouseDown: { EventType: "MouseEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, mouseEnter: { EventType: "MouseEvent", defaultInit: { bubbles: false, cancelable: false, composed: true } }, mouseLeave: { EventType: "MouseEvent", defaultInit: { bubbles: false, cancelable: false, composed: true } }, mouseMove: { EventType: "MouseEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, mouseOut: { EventType: "MouseEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, mouseOver: { EventType: "MouseEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, mouseUp: { EventType: "MouseEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, select: { EventType: "Event", defaultInit: { bubbles: true, cancelable: false } }, touchCancel: { EventType: "TouchEvent", defaultInit: { bubbles: true, cancelable: false, composed: true } }, touchEnd: { EventType: "TouchEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, touchMove: { EventType: "TouchEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, touchStart: { EventType: "TouchEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, resize: { EventType: "UIEvent", defaultInit: { bubbles: false, cancelable: false } }, scroll: { EventType: "UIEvent", defaultInit: { bubbles: false, cancelable: false } }, wheel: { EventType: "WheelEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, abort: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, canPlay: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, canPlayThrough: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, durationChange: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, emptied: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, encrypted: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, ended: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, loadedData: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, loadedMetadata: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, loadStart: { EventType: "ProgressEvent", defaultInit: { bubbles: false, cancelable: false } }, pause: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, play: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, playing: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, progress: { EventType: "ProgressEvent", defaultInit: { bubbles: false, cancelable: false } }, rateChange: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, seeked: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, seeking: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, stalled: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, suspend: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, timeUpdate: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, volumeChange: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, waiting: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, load: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, error: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, animationStart: { EventType: "AnimationEvent", defaultInit: { bubbles: true, cancelable: false } }, animationEnd: { EventType: "AnimationEvent", defaultInit: { bubbles: true, cancelable: false } }, animationIteration: { EventType: "AnimationEvent", defaultInit: { bubbles: true, cancelable: false } }, transitionCancel: { EventType: "TransitionEvent", defaultInit: { bubbles: true, cancelable: false } }, transitionEnd: { EventType: "TransitionEvent", defaultInit: { bubbles: true, cancelable: true } }, transitionRun: { EventType: "TransitionEvent", defaultInit: { bubbles: true, cancelable: false } }, transitionStart: { EventType: "TransitionEvent", defaultInit: { bubbles: true, cancelable: false } }, pointerOver: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, pointerEnter: { EventType: "PointerEvent", defaultInit: { bubbles: false, cancelable: false } }, pointerDown: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, pointerMove: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, pointerUp: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, pointerCancel: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: false, composed: true } }, pointerOut: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, pointerLeave: { EventType: "PointerEvent", defaultInit: { bubbles: false, cancelable: false } }, gotPointerCapture: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: false, composed: true } }, lostPointerCapture: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: false, composed: true } }, popState: { EventType: "PopStateEvent", defaultInit: { bubbles: true, cancelable: false } }, offline: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, online: { EventType: "Event", defaultInit: { bubbles: false, cancelable: false } }, pageHide: { EventType: "PageTransitionEvent", defaultInit: { bubbles: true, cancelable: true } }, pageShow: { EventType: "PageTransitionEvent", defaultInit: { bubbles: true, cancelable: true } } }, eventAliasMap = { doubleClick: "dblClick" };
function fireEvent(element, event) {
  return getConfig2().eventWrapper(() => {
    if (!event) throw new Error("Unable to fire an event - please provide an event object.");
    if (!element) throw new Error('Unable to fire a "' + event.type + '" event - please provide a DOM element.');
    return element.dispatchEvent(event);
  });
}
function createEvent(eventName, node, init, _temp) {
  let { EventType = "Event", defaultInit = {} } = _temp === void 0 ? {} : _temp;
  if (!node) throw new Error('Unable to fire a "' + eventName + '" event - please provide a DOM element.');
  let eventInit = { ...defaultInit, ...init }, { target: { value, files, ...targetProperties } = {} } = eventInit;
  value !== void 0 && setNativeValue(node, value), files !== void 0 && Object.defineProperty(node, "files", { configurable: true, enumerable: true, writable: true, value: files }), Object.assign(node, targetProperties);
  let window2 = getWindowFromNode(node), EventConstructor = window2[EventType] || window2.Event, event;
  if (typeof EventConstructor == "function") event = new EventConstructor(eventName, eventInit);
  else {
    event = window2.document.createEvent(EventType);
    let { bubbles, cancelable, detail, ...otherInit } = eventInit;
    event.initEvent(eventName, bubbles, cancelable, detail), Object.keys(otherInit).forEach((eventKey) => {
      event[eventKey] = otherInit[eventKey];
    });
  }
  return ["dataTransfer", "clipboardData"].forEach((dataTransferKey) => {
    let dataTransferValue = eventInit[dataTransferKey];
    typeof dataTransferValue == "object" && (typeof window2.DataTransfer == "function" ? Object.defineProperty(event, dataTransferKey, { value: Object.getOwnPropertyNames(dataTransferValue).reduce((acc, propName) => (Object.defineProperty(acc, propName, { value: dataTransferValue[propName] }), acc), new window2.DataTransfer()) }) : Object.defineProperty(event, dataTransferKey, { value: dataTransferValue }));
  }), event;
}
Object.keys(eventMap).forEach((key) => {
  let { EventType, defaultInit } = eventMap[key], eventName = key.toLowerCase();
  createEvent[key] = (node, init) => createEvent(eventName, node, init, { EventType, defaultInit }), fireEvent[key] = (node, init) => fireEvent(node, createEvent[key](node, init));
});
function setNativeValue(element, value) {
  let { set: valueSetter } = Object.getOwnPropertyDescriptor(element, "value") || {}, prototype = Object.getPrototypeOf(element), { set: prototypeValueSetter } = Object.getOwnPropertyDescriptor(prototype, "value") || {};
  if (prototypeValueSetter && valueSetter !== prototypeValueSetter) prototypeValueSetter.call(element, value);
  else if (valueSetter) valueSetter.call(element, value);
  else throw new Error("The given element does not have a value setter");
}
Object.keys(eventAliasMap).forEach((aliasKey) => {
  let key = eventAliasMap[aliasKey];
  fireEvent[aliasKey] = function() {
    return fireEvent[key](...arguments);
  };
});
function unindent(string) {
  return string.replace(/[ \t]*[\n][ \t]*/g, `
`);
}
function encode(value) {
  return import_lz_string.default.compressToEncodedURIComponent(unindent(value));
}
function getPlaygroundUrl(markup) {
  return "https://testing-playground.com/#markup=" + encode(markup);
}
var debug = (element, maxLength, options) => Array.isArray(element) ? element.forEach((el) => logDOM(el, maxLength, options)) : logDOM(element, maxLength, options), logTestingPlaygroundURL = function(element) {
  if (element === void 0 && (element = getDocument().body), !element || !("innerHTML" in element)) {
    console.log("The element you're providing isn't a valid DOM element.");
    return;
  }
  if (!element.innerHTML) {
    console.log("The provided element doesn't have any children.");
    return;
  }
  let playgroundUrl = getPlaygroundUrl(element.innerHTML);
  return console.log(`Open this URL in your browser

` + playgroundUrl), playgroundUrl;
}, initialValue = { debug, logTestingPlaygroundURL }, screen = typeof document < "u" && document.body ? getQueriesForElement(document.body, queries, initialValue) : Object.keys(queries).reduce((helpers, key) => (helpers[key] = () => {
  throw new TypeError("For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error");
}, helpers), initialValue);
function isElementType(element, tag, props) {
  return element.namespaceURI && element.namespaceURI !== "http://www.w3.org/1999/xhtml" || (tag = Array.isArray(tag) ? tag : [tag], !tag.includes(element.tagName.toLowerCase())) ? false : props ? Object.entries(props).every(([k2, v]) => element[k2] === v) : true;
}
var clickableInputTypes;
(function(clickableInputTypes2) {
  clickableInputTypes2.button = "button", clickableInputTypes2.color = "color", clickableInputTypes2.file = "file", clickableInputTypes2.image = "image", clickableInputTypes2.reset = "reset", clickableInputTypes2.submit = "submit", clickableInputTypes2.checkbox = "checkbox", clickableInputTypes2.radio = "radio";
})(clickableInputTypes || (clickableInputTypes = {}));
function isClickableInput(element) {
  return isElementType(element, "button") || isElementType(element, "input") && element.type in clickableInputTypes;
}
function getWindow(node) {
  var _node_ownerDocument;
  if (isDocument(node) && node.defaultView) return node.defaultView;
  if (!((_node_ownerDocument = node.ownerDocument) === null || _node_ownerDocument === void 0) && _node_ownerDocument.defaultView) return node.ownerDocument.defaultView;
  throw new Error(`Could not determine window of node. Node was ${describe(node)}`);
}
function isDocument(node) {
  return node.nodeType === 9;
}
function describe(val) {
  return typeof val == "function" ? `function ${val.name}` : val === null ? "null" : String(val);
}
function readBlobText(blob, FileReader) {
  return new Promise((res, rej) => {
    let fr = new FileReader();
    fr.onerror = rej, fr.onabort = rej, fr.onload = () => {
      res(String(fr.result));
    }, fr.readAsText(blob);
  });
}
function createFileList(window2, files) {
  let list = { ...files, length: files.length, item: (index) => list[index], [Symbol.iterator]: function* () {
    for (let i = 0; i < list.length; i++) yield list[i];
  } };
  return list.constructor = window2.FileList, window2.FileList && Object.setPrototypeOf(list, window2.FileList.prototype), Object.freeze(list), list;
}
function _define_property(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) : obj[key] = value, obj;
}
var DataTransferItemStub = class {
  getAsFile() {
    return this.file;
  }
  getAsString(callback) {
    typeof this.data == "string" && callback(this.data);
  }
  webkitGetAsEntry() {
    throw new Error("not implemented");
  }
  constructor(dataOrFile, type5) {
    _define_property(this, "kind", void 0), _define_property(this, "type", void 0), _define_property(this, "file", null), _define_property(this, "data", void 0), typeof dataOrFile == "string" ? (this.kind = "string", this.type = String(type5), this.data = dataOrFile) : (this.kind = "file", this.type = dataOrFile.type, this.file = dataOrFile);
  }
}, DataTransferItemListStub = class extends Array {
  add(...args) {
    let item = new DataTransferItemStub(args[0], args[1]);
    return this.push(item), item;
  }
  clear() {
    this.splice(0, this.length);
  }
  remove(index) {
    this.splice(index, 1);
  }
};
function getTypeMatcher(type5, exact) {
  let [group, sub] = type5.split("/"), isGroup = !sub || sub === "*";
  return (item) => exact ? item.type === (isGroup ? group : type5) : isGroup ? item.type.startsWith(`${group}/`) : item.type === group;
}
function createDataTransferStub(window2) {
  return new class {
    getData(format4) {
      var _this_items_find;
      let match = (_this_items_find = this.items.find(getTypeMatcher(format4, true))) !== null && _this_items_find !== void 0 ? _this_items_find : this.items.find(getTypeMatcher(format4, false)), text = "";
      return match == null ? void 0 : match.getAsString((t) => {
        text = t;
      }), text;
    }
    setData(format4, data) {
      let matchIndex = this.items.findIndex(getTypeMatcher(format4, true)), item = new DataTransferItemStub(data, format4);
      matchIndex >= 0 ? this.items.splice(matchIndex, 1, item) : this.items.push(item);
    }
    clearData(format4) {
      if (format4) {
        let matchIndex = this.items.findIndex(getTypeMatcher(format4, true));
        matchIndex >= 0 && this.items.remove(matchIndex);
      } else this.items.clear();
    }
    get types() {
      let t = [];
      return this.files.length && t.push("Files"), this.items.forEach((i) => t.push(i.type)), Object.freeze(t), t;
    }
    setDragImage() {
    }
    constructor() {
      _define_property(this, "dropEffect", "none"), _define_property(this, "effectAllowed", "uninitialized"), _define_property(this, "items", new DataTransferItemListStub()), _define_property(this, "files", createFileList(window2, []));
    }
  }();
}
function createDataTransfer(window2, files = []) {
  let dt = typeof window2.DataTransfer > "u" ? createDataTransferStub(window2) : new window2.DataTransfer();
  return Object.defineProperty(dt, "files", { get: () => createFileList(window2, files) }), dt;
}
function getBlobFromDataTransferItem(window2, item) {
  if (item.kind === "file") return item.getAsFile();
  let data = "";
  return item.getAsString((s) => {
    data = s;
  }), new window2.Blob([data], { type: item.type });
}
function _define_property2(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) : obj[key] = value, obj;
}
function createClipboardItem(window2, ...blobs) {
  let dataMap = Object.fromEntries(blobs.map((b) => [typeof b == "string" ? "text/plain" : b.type, Promise.resolve(b)]));
  return typeof window2.ClipboardItem < "u" ? new window2.ClipboardItem(dataMap) : new class {
    get types() {
      return Array.from(Object.keys(this.data));
    }
    async getType(type5) {
      let value = await this.data[type5];
      if (!value) throw new Error(`${type5} is not one of the available MIME types on this item.`);
      return value instanceof window2.Blob ? value : new window2.Blob([value], { type: type5 });
    }
    constructor(d2) {
      _define_property2(this, "data", void 0), this.data = d2;
    }
  }(dataMap);
}
var ClipboardStubControl = Symbol("Manage ClipboardSub");
function createClipboardStub(window2, control) {
  return Object.assign(new class extends window2.EventTarget {
    async read() {
      return Array.from(this.items);
    }
    async readText() {
      let text = "";
      for (let item of this.items) {
        let type5 = item.types.includes("text/plain") ? "text/plain" : item.types.find((t) => t.startsWith("text/"));
        type5 && (text += await item.getType(type5).then((b) => readBlobText(b, window2.FileReader)));
      }
      return text;
    }
    async write(data) {
      this.items = data;
    }
    async writeText(text) {
      this.items = [createClipboardItem(window2, text)];
    }
    constructor(...args) {
      super(...args), _define_property2(this, "items", []);
    }
  }(), { [ClipboardStubControl]: control });
}
function isClipboardStub(clipboard) {
  return !!(clipboard == null ? void 0 : clipboard[ClipboardStubControl]);
}
function attachClipboardStubToView(window2) {
  if (isClipboardStub(window2.navigator.clipboard)) return window2.navigator.clipboard[ClipboardStubControl];
  let realClipboard = Object.getOwnPropertyDescriptor(window2.navigator, "clipboard"), stub, control = { resetClipboardStub: () => {
    stub = createClipboardStub(window2, control);
  }, detachClipboardStub: () => {
    realClipboard ? Object.defineProperty(window2.navigator, "clipboard", realClipboard) : Object.defineProperty(window2.navigator, "clipboard", { value: void 0, configurable: true });
  } };
  return stub = createClipboardStub(window2, control), Object.defineProperty(window2.navigator, "clipboard", { get: () => stub, configurable: true }), stub[ClipboardStubControl];
}
function resetClipboardStubOnView(window2) {
  isClipboardStub(window2.navigator.clipboard) && window2.navigator.clipboard[ClipboardStubControl].resetClipboardStub();
}
function detachClipboardStubFromView(window2) {
  isClipboardStub(window2.navigator.clipboard) && window2.navigator.clipboard[ClipboardStubControl].detachClipboardStub();
}
async function readDataTransferFromClipboard(document2) {
  let window2 = document2.defaultView, clipboard = window2 == null ? void 0 : window2.navigator.clipboard, items = clipboard && await clipboard.read();
  if (!items) throw new Error("The Clipboard API is unavailable.");
  let dt = createDataTransfer(window2);
  for (let item of items) for (let type5 of item.types) dt.setData(type5, await item.getType(type5).then((b) => readBlobText(b, window2.FileReader)));
  return dt;
}
async function writeDataTransferToClipboard(document2, clipboardData) {
  let window2 = getWindow(document2), clipboard = window2.navigator.clipboard, items = [];
  for (let i = 0; i < clipboardData.items.length; i++) {
    let dtItem = clipboardData.items[i], blob = getBlobFromDataTransferItem(window2, dtItem);
    items.push(createClipboardItem(window2, blob));
  }
  if (!(clipboard && await clipboard.write(items).then(() => true, () => false))) throw new Error("The Clipboard API is unavailable.");
}
var g2 = globalThis;
typeof g2.afterEach == "function" && g2.afterEach(() => resetClipboardStubOnView(globalThis.window));
typeof g2.afterAll == "function" && g2.afterAll(() => detachClipboardStubFromView(globalThis.window));
function isContentEditable(element) {
  return element.hasAttribute("contenteditable") && (element.getAttribute("contenteditable") == "true" || element.getAttribute("contenteditable") == "");
}
function getContentEditable(node) {
  let element = getElement(node);
  return element && (element.closest('[contenteditable=""]') || element.closest('[contenteditable="true"]'));
}
function getElement(node) {
  return node.nodeType === 1 ? node : node.parentElement;
}
function isEditable(element) {
  return isEditableInputOrTextArea(element) && !element.readOnly || isContentEditable(element);
}
var editableInputTypes;
(function(editableInputTypes2) {
  editableInputTypes2.text = "text", editableInputTypes2.date = "date", editableInputTypes2["datetime-local"] = "datetime-local", editableInputTypes2.email = "email", editableInputTypes2.month = "month", editableInputTypes2.number = "number", editableInputTypes2.password = "password", editableInputTypes2.search = "search", editableInputTypes2.tel = "tel", editableInputTypes2.time = "time", editableInputTypes2.url = "url", editableInputTypes2.week = "week";
})(editableInputTypes || (editableInputTypes = {}));
function isEditableInputOrTextArea(element) {
  return isElementType(element, "textarea") || isElementType(element, "input") && element.type in editableInputTypes;
}
var maxLengthSupportedTypes;
(function(maxLengthSupportedTypes2) {
  maxLengthSupportedTypes2.email = "email", maxLengthSupportedTypes2.password = "password", maxLengthSupportedTypes2.search = "search", maxLengthSupportedTypes2.telephone = "telephone", maxLengthSupportedTypes2.text = "text", maxLengthSupportedTypes2.url = "url";
})(maxLengthSupportedTypes || (maxLengthSupportedTypes = {}));
function getMaxLength(element) {
  var _element_getAttribute;
  let attr = (_element_getAttribute = element.getAttribute("maxlength")) !== null && _element_getAttribute !== void 0 ? _element_getAttribute : "";
  return /^\d+$/.test(attr) && Number(attr) >= 0 ? Number(attr) : void 0;
}
function supportsMaxLength(element) {
  return isElementType(element, "textarea") || isElementType(element, "input") && element.type in maxLengthSupportedTypes;
}
var FOCUSABLE_SELECTOR = ["input:not([type=hidden]):not([disabled])", "button:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", '[contenteditable=""]', '[contenteditable="true"]', "a[href]", "[tabindex]:not([disabled])"].join(", ");
function isFocusable(element) {
  return element.matches(FOCUSABLE_SELECTOR);
}
var bracketDict;
(function(bracketDict2) {
  bracketDict2["{"] = "}", bracketDict2["["] = "]";
})(bracketDict || (bracketDict = {}));
function readNextDescriptor(text, context) {
  let pos = 0, startBracket = text[pos] in bracketDict ? text[pos] : "";
  pos += startBracket.length;
  let type5 = new RegExp(`^\\${startBracket}{2}`).test(text) ? "" : startBracket;
  return { type: type5, ...type5 === "" ? readPrintableChar(text, pos, context) : readTag(text, pos, type5, context) };
}
function readPrintableChar(text, pos, context) {
  let descriptor = text[pos];
  return assertDescriptor(descriptor, text, pos, context), pos += descriptor.length, { consumedLength: pos, descriptor, releasePrevious: false, releaseSelf: true, repeat: 1 };
}
function readTag(text, pos, startBracket, context) {
  var _text_slice_match, _text_slice_match1;
  let releasePreviousModifier = text[pos] === "/" ? "/" : "";
  pos += releasePreviousModifier.length;
  let escapedDescriptor = startBracket === "{" && text[pos] === "\\";
  pos += Number(escapedDescriptor);
  let descriptor = escapedDescriptor ? text[pos] : (_text_slice_match = text.slice(pos).match(startBracket === "{" ? /^\w+|^[^}>/]/ : /^\w+/)) === null || _text_slice_match === void 0 ? void 0 : _text_slice_match[0];
  assertDescriptor(descriptor, text, pos, context), pos += descriptor.length;
  var _text_slice_match_;
  let repeatModifier = (_text_slice_match_ = (_text_slice_match1 = text.slice(pos).match(/^>\d+/)) === null || _text_slice_match1 === void 0 ? void 0 : _text_slice_match1[0]) !== null && _text_slice_match_ !== void 0 ? _text_slice_match_ : "";
  pos += repeatModifier.length;
  let releaseSelfModifier = text[pos] === "/" || !repeatModifier && text[pos] === ">" ? text[pos] : "";
  pos += releaseSelfModifier.length;
  let expectedEndBracket = bracketDict[startBracket], endBracket = text[pos] === expectedEndBracket ? expectedEndBracket : "";
  if (!endBracket) throw new Error(getErrorMessage([!repeatModifier && "repeat modifier", !releaseSelfModifier && "release modifier", `"${expectedEndBracket}"`].filter(Boolean).join(" or "), text[pos], text, context));
  return pos += endBracket.length, { consumedLength: pos, descriptor, releasePrevious: !!releasePreviousModifier, repeat: repeatModifier ? Math.max(Number(repeatModifier.substr(1)), 1) : 1, releaseSelf: hasReleaseSelf(releaseSelfModifier, repeatModifier) };
}
function assertDescriptor(descriptor, text, pos, context) {
  if (!descriptor) throw new Error(getErrorMessage("key descriptor", text[pos], text, context));
}
function hasReleaseSelf(releaseSelfModifier, repeatModifier) {
  if (releaseSelfModifier) return releaseSelfModifier === "/";
  if (repeatModifier) return false;
}
function getErrorMessage(expected, found, text, context) {
  return `Expected ${expected} but found "${found ?? ""}" in "${text}"
    See ${context === "pointer" ? "https://testing-library.com/docs/user-event/pointer#pressing-a-button-or-touching-the-screen" : "https://testing-library.com/docs/user-event/keyboard"}
    for more information about how userEvent parses your input.`;
}
function cloneEvent(event) {
  return new event.constructor(event.type, event);
}
var ApiLevel;
(function(ApiLevel2) {
  ApiLevel2[ApiLevel2.Trigger = 2] = "Trigger", ApiLevel2[ApiLevel2.Call = 1] = "Call";
})(ApiLevel || (ApiLevel = {}));
function setLevelRef(instance, level) {
  instance.levelRefs[level] = {};
}
function getLevelRef(instance, level) {
  return instance.levelRefs[level];
}
var PointerEventsCheckLevel;
(function(PointerEventsCheckLevel2) {
  PointerEventsCheckLevel2[PointerEventsCheckLevel2.EachTrigger = 4] = "EachTrigger", PointerEventsCheckLevel2[PointerEventsCheckLevel2.EachApiCall = 2] = "EachApiCall", PointerEventsCheckLevel2[PointerEventsCheckLevel2.EachTarget = 1] = "EachTarget", PointerEventsCheckLevel2[PointerEventsCheckLevel2.Never = 0] = "Never";
})(PointerEventsCheckLevel || (PointerEventsCheckLevel = {}));
function isDisabled2(element) {
  for (let el = element; el; el = el.parentElement) if (isElementType(el, ["button", "input", "select", "textarea", "optgroup", "option"])) {
    if (el.hasAttribute("disabled")) return true;
  } else if (isElementType(el, "fieldset")) {
    var _el_querySelector;
    if (el.hasAttribute("disabled") && !(!((_el_querySelector = el.querySelector(":scope > legend")) === null || _el_querySelector === void 0) && _el_querySelector.contains(element))) return true;
  } else if (el.tagName.includes("-") && el.constructor.formAssociated && el.hasAttribute("disabled")) return true;
  return false;
}
function getActiveElement(document2) {
  let activeElement = document2.activeElement;
  return (activeElement == null ? void 0 : activeElement.shadowRoot) ? getActiveElement(activeElement.shadowRoot) : isDisabled2(activeElement) ? document2.ownerDocument ? document2.ownerDocument.body : document2.body : activeElement;
}
function getActiveElementOrBody(document2) {
  var _getActiveElement;
  return (_getActiveElement = getActiveElement(document2)) !== null && _getActiveElement !== void 0 ? _getActiveElement : document2.body;
}
function findClosest(element, callback) {
  let el = element;
  do {
    if (callback(el)) return el;
    el = el.parentElement;
  } while (el && el !== element.ownerDocument.body);
}
function hasOwnSelection(node) {
  return isElement3(node) && isEditableInputOrTextArea(node);
}
function hasNoSelection(node) {
  return isElement3(node) && isClickableInput(node);
}
function isElement3(node) {
  return node.nodeType === 1;
}
function updateSelectionOnFocus(element) {
  let selection = element.ownerDocument.getSelection();
  if ((selection == null ? void 0 : selection.focusNode) && hasOwnSelection(element)) {
    let contenteditable = getContentEditable(selection.focusNode);
    if (contenteditable) {
      if (!selection.isCollapsed) {
        var _contenteditable_firstChild;
        let focusNode = ((_contenteditable_firstChild = contenteditable.firstChild) === null || _contenteditable_firstChild === void 0 ? void 0 : _contenteditable_firstChild.nodeType) === 3 ? contenteditable.firstChild : contenteditable;
        selection.setBaseAndExtent(focusNode, 0, focusNode, 0);
      }
    } else selection.setBaseAndExtent(element, 0, element, 0);
  }
}
function wrapEvent(cb, _element) {
  return getConfig2().eventWrapper(cb);
}
function focusElement(element) {
  let target = findClosest(element, isFocusable), activeElement = getActiveElement(element.ownerDocument);
  (target ?? element.ownerDocument.body) !== activeElement && (target ? wrapEvent(() => target.focus()) : wrapEvent(() => activeElement == null ? void 0 : activeElement.blur()), updateSelectionOnFocus(target ?? element.ownerDocument.body));
}
function blurElement(element) {
  !isFocusable(element) || !(getActiveElement(element.ownerDocument) === element) || wrapEvent(() => element.blur());
}
var behavior = {};
behavior.click = (event, target, instance) => {
  let context = target.closest("button,input,label,select,textarea"), control = context && isElementType(context, "label") && context.control;
  if (control) return () => {
    isFocusable(control) && focusElement(control), instance.dispatchEvent(control, cloneEvent(event));
  };
  if (isElementType(target, "input", { type: "file" })) return () => {
    blurElement(target), target.dispatchEvent(new (getWindow(target)).Event("fileDialog")), focusElement(target);
  };
};
var UIValue = Symbol("Displayed value in UI"), UISelection = Symbol("Displayed selection in UI"), InitialValue = Symbol("Initial value to compare on blur");
function isUIValue(value) {
  return typeof value == "object" && UIValue in value;
}
function isUISelectionStart(start) {
  return !!start && typeof start == "object" && UISelection in start;
}
function setUIValue(element, value) {
  element[InitialValue] === void 0 && (element[InitialValue] = element.value), element[UIValue] = value, element.value = Object.assign(new String(value), { [UIValue]: true });
}
function getUIValue(element) {
  return element[UIValue] === void 0 ? element.value : String(element[UIValue]);
}
function setUIValueClean(element) {
  element[UIValue] = void 0;
}
function clearInitialValue(element) {
  element[InitialValue] = void 0;
}
function getInitialValue(element) {
  return element[InitialValue];
}
function setUISelectionRaw(element, selection) {
  element[UISelection] = selection;
}
function setUISelection(element, { focusOffset: focusOffsetParam, anchorOffset: anchorOffsetParam = focusOffsetParam }, mode = "replace") {
  let valueLength = getUIValue(element).length, sanitizeOffset = (o) => Math.max(0, Math.min(valueLength, o)), anchorOffset = mode === "replace" || element[UISelection] === void 0 ? sanitizeOffset(anchorOffsetParam) : element[UISelection].anchorOffset, focusOffset = sanitizeOffset(focusOffsetParam), startOffset = Math.min(anchorOffset, focusOffset), endOffset = Math.max(anchorOffset, focusOffset);
  if (element[UISelection] = { anchorOffset, focusOffset }, element.selectionStart === startOffset && element.selectionEnd === endOffset) return;
  let startObj = Object.assign(new Number(startOffset), { [UISelection]: true });
  try {
    element.setSelectionRange(startObj, endOffset);
  } catch {
  }
}
function getUISelection(element) {
  var _element_selectionStart, _element_selectionEnd, _element_UISelection;
  let sel = (_element_UISelection = element[UISelection]) !== null && _element_UISelection !== void 0 ? _element_UISelection : { anchorOffset: (_element_selectionStart = element.selectionStart) !== null && _element_selectionStart !== void 0 ? _element_selectionStart : 0, focusOffset: (_element_selectionEnd = element.selectionEnd) !== null && _element_selectionEnd !== void 0 ? _element_selectionEnd : 0 };
  return { ...sel, startOffset: Math.min(sel.anchorOffset, sel.focusOffset), endOffset: Math.max(sel.anchorOffset, sel.focusOffset) };
}
function hasUISelection(element) {
  return !!element[UISelection];
}
function setUISelectionClean(element) {
  element[UISelection] = void 0;
}
var parseInt2 = globalThis.parseInt;
function buildTimeValue(value) {
  let onlyDigitsValue = value.replace(/\D/g, "");
  if (onlyDigitsValue.length < 2) return value;
  let firstDigit = parseInt2(onlyDigitsValue[0], 10), secondDigit = parseInt2(onlyDigitsValue[1], 10);
  if (firstDigit >= 3 || firstDigit === 2 && secondDigit >= 4) {
    let index;
    return firstDigit >= 3 ? index = 1 : index = 2, build2(onlyDigitsValue, index);
  }
  return value.length === 2 ? value : build2(onlyDigitsValue, 2);
}
function build2(onlyDigitsValue, index) {
  let hours = onlyDigitsValue.slice(0, index), validHours = Math.min(parseInt2(hours, 10), 23), minuteCharacters = onlyDigitsValue.slice(index), parsedMinutes = parseInt2(minuteCharacters, 10), validMinutes = Math.min(parsedMinutes, 59);
  return `${validHours.toString().padStart(2, "0")}:${validMinutes.toString().padStart(2, "0")}`;
}
function isValidDateOrTimeValue(element, value) {
  let clone2 = element.cloneNode();
  return clone2.value = value, clone2.value === value;
}
function getNextCursorPosition(node, offset, direction, inputType) {
  if (isTextNode(node) && offset + direction >= 0 && offset + direction <= node.nodeValue.length) return { node, offset: offset + direction };
  let nextNode = getNextCharacterContentNode(node, offset, direction);
  if (nextNode) {
    if (isTextNode(nextNode)) return { node: nextNode, offset: direction > 0 ? Math.min(1, nextNode.nodeValue.length) : Math.max(nextNode.nodeValue.length - 1, 0) };
    if (isElementType(nextNode, "br")) {
      let nextPlusOne = getNextCharacterContentNode(nextNode, void 0, direction);
      return nextPlusOne ? isTextNode(nextPlusOne) ? { node: nextPlusOne, offset: direction > 0 ? 0 : nextPlusOne.nodeValue.length } : direction < 0 && isElementType(nextPlusOne, "br") ? { node: nextNode.parentNode, offset: getOffset(nextNode) } : { node: nextPlusOne.parentNode, offset: getOffset(nextPlusOne) + (direction > 0 ? 0 : 1) } : direction < 0 && inputType === "deleteContentBackward" ? { node: nextNode.parentNode, offset: getOffset(nextNode) } : void 0;
    } else return { node: nextNode.parentNode, offset: getOffset(nextNode) + (direction > 0 ? 1 : 0) };
  }
}
function getNextCharacterContentNode(node, offset, direction) {
  let nextOffset = Number(offset) + (direction < 0 ? -1 : 0);
  return offset !== void 0 && isElement4(node) && nextOffset >= 0 && nextOffset < node.children.length && (node = node.children[nextOffset]), walkNodes(node, direction === 1 ? "next" : "previous", isTreatedAsCharacterContent);
}
function isTreatedAsCharacterContent(node) {
  if (isTextNode(node)) return true;
  if (isElement4(node)) {
    if (isElementType(node, ["input", "textarea"])) return node.type !== "hidden";
    if (isElementType(node, "br")) return true;
  }
  return false;
}
function getOffset(node) {
  let i = 0;
  for (; node.previousSibling; ) i++, node = node.previousSibling;
  return i;
}
function isElement4(node) {
  return node.nodeType === 1;
}
function isTextNode(node) {
  return node.nodeType === 3;
}
function walkNodes(node, direction, callback) {
  for (; ; ) {
    var _node_ownerDocument;
    let sibling = node[`${direction}Sibling`];
    if (sibling) {
      if (node = getDescendant(sibling, direction === "next" ? "first" : "last"), callback(node)) return node;
    } else if (node.parentNode && (!isElement4(node.parentNode) || !isContentEditable(node.parentNode) && node.parentNode !== ((_node_ownerDocument = node.ownerDocument) === null || _node_ownerDocument === void 0 ? void 0 : _node_ownerDocument.body))) node = node.parentNode;
    else break;
  }
}
function getDescendant(node, direction) {
  for (; node.hasChildNodes(); ) node = node[`${direction}Child`];
  return node;
}
var TrackChanges = Symbol("Track programmatic changes for React workaround");
function isReact17Element(element) {
  return Object.getOwnPropertyNames(element).some((k2) => k2.startsWith("__react")) && getWindow(element).REACT_VERSION === 17;
}
function startTrackValue(element) {
  isReact17Element(element) && (element[TrackChanges] = { previousValue: String(element.value), tracked: [] });
}
function trackOrSetValue(element, v) {
  var _element_TrackChanges_tracked, _element_TrackChanges;
  (_element_TrackChanges = element[TrackChanges]) === null || _element_TrackChanges === void 0 || (_element_TrackChanges_tracked = _element_TrackChanges.tracked) === null || _element_TrackChanges_tracked === void 0 || _element_TrackChanges_tracked.push(v), element[TrackChanges] || (setUIValueClean(element), setUISelection(element, { focusOffset: v.length }));
}
function commitValueAfterInput(element, cursorOffset) {
  var _changes_tracked;
  let changes = element[TrackChanges];
  if (element[TrackChanges] = void 0, !(!(changes == null || (_changes_tracked = changes.tracked) === null || _changes_tracked === void 0) && _changes_tracked.length)) return;
  let isJustReactStateUpdate = changes.tracked.length === 2 && changes.tracked[0] === changes.previousValue && changes.tracked[1] === element.value;
  isJustReactStateUpdate || setUIValueClean(element), hasUISelection(element) && setUISelection(element, { focusOffset: isJustReactStateUpdate ? cursorOffset : element.value.length });
}
function getTargetTypeAndSelection(node) {
  let element = getElement2(node);
  if (element && hasOwnSelection(element)) return { type: "input", selection: getUISelection(element) };
  let selection = element == null ? void 0 : element.ownerDocument.getSelection();
  return { type: getContentEditable(node) && (selection == null ? void 0 : selection.anchorNode) && getContentEditable(selection.anchorNode) ? "contenteditable" : "default", selection };
}
function getElement2(node) {
  return node.nodeType === 1 ? node : node.parentElement;
}
function getInputRange(focusNode) {
  let typeAndSelection = getTargetTypeAndSelection(focusNode);
  if (typeAndSelection.type === "input") return typeAndSelection.selection;
  if (typeAndSelection.type === "contenteditable") {
    var _typeAndSelection_selection;
    return (_typeAndSelection_selection = typeAndSelection.selection) === null || _typeAndSelection_selection === void 0 ? void 0 : _typeAndSelection_selection.getRangeAt(0);
  }
}
function setSelection({ focusNode, focusOffset, anchorNode = focusNode, anchorOffset = focusOffset }) {
  var _anchorNode_ownerDocument_getSelection, _anchorNode_ownerDocument;
  if (getTargetTypeAndSelection(focusNode).type === "input") return setUISelection(focusNode, { anchorOffset, focusOffset });
  (_anchorNode_ownerDocument = anchorNode.ownerDocument) === null || _anchorNode_ownerDocument === void 0 || (_anchorNode_ownerDocument_getSelection = _anchorNode_ownerDocument.getSelection()) === null || _anchorNode_ownerDocument_getSelection === void 0 || _anchorNode_ownerDocument_getSelection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
}
function isDateOrTime(element) {
  return isElementType(element, "input") && ["date", "time"].includes(element.type);
}
function input(instance, element, data, inputType = "insertText") {
  let inputRange = getInputRange(element);
  inputRange && (!isDateOrTime(element) && !instance.dispatchUIEvent(element, "beforeinput", { inputType, data }) || ("startContainer" in inputRange ? editContenteditable(instance, element, inputRange, data, inputType) : editInputElement(instance, element, inputRange, data, inputType)));
}
function editContenteditable(instance, element, inputRange, data, inputType) {
  let del = false;
  if (!inputRange.collapsed) del = true, inputRange.deleteContents();
  else if (["deleteContentBackward", "deleteContentForward"].includes(inputType)) {
    let nextPosition = getNextCursorPosition(inputRange.startContainer, inputRange.startOffset, inputType === "deleteContentBackward" ? -1 : 1, inputType);
    if (nextPosition) {
      del = true;
      let delRange = inputRange.cloneRange();
      delRange.comparePoint(nextPosition.node, nextPosition.offset) < 0 ? delRange.setStart(nextPosition.node, nextPosition.offset) : delRange.setEnd(nextPosition.node, nextPosition.offset), delRange.deleteContents();
    }
  }
  if (data) if (inputRange.endContainer.nodeType === 3) {
    let offset = inputRange.endOffset;
    inputRange.endContainer.insertData(offset, data), inputRange.setStart(inputRange.endContainer, offset + data.length), inputRange.setEnd(inputRange.endContainer, offset + data.length);
  } else {
    let text = element.ownerDocument.createTextNode(data);
    inputRange.insertNode(text), inputRange.setStart(text, data.length), inputRange.setEnd(text, data.length);
  }
  (del || data) && instance.dispatchUIEvent(element, "input", { inputType });
}
function editInputElement(instance, element, inputRange, data, inputType) {
  let dataToInsert = data;
  if (supportsMaxLength(element)) {
    let maxLength = getMaxLength(element);
    if (maxLength !== void 0 && data.length > 0) {
      let spaceUntilMaxLength = maxLength - element.value.length;
      if (spaceUntilMaxLength > 0) dataToInsert = data.substring(0, spaceUntilMaxLength);
      else return;
    }
  }
  let { newValue, newOffset, oldValue } = calculateNewValue(dataToInsert, element, inputRange, inputType);
  newValue === oldValue && newOffset === inputRange.startOffset && newOffset === inputRange.endOffset || isElementType(element, "input", { type: "number" }) && !isValidNumberInput(newValue) || (setUIValue(element, newValue), setSelection({ focusNode: element, anchorOffset: newOffset, focusOffset: newOffset }), isDateOrTime(element) ? isValidDateOrTimeValue(element, newValue) && (commitInput(instance, element, newOffset, {}), instance.dispatchUIEvent(element, "change"), clearInitialValue(element)) : commitInput(instance, element, newOffset, { data, inputType }));
}
function calculateNewValue(inputData, node, { startOffset, endOffset }, inputType) {
  let value = getUIValue(node), prologEnd = Math.max(0, startOffset === endOffset && inputType === "deleteContentBackward" ? startOffset - 1 : startOffset), prolog = value.substring(0, prologEnd), epilogStart = Math.min(value.length, startOffset === endOffset && inputType === "deleteContentForward" ? startOffset + 1 : endOffset), epilog = value.substring(epilogStart, value.length), newValue = `${prolog}${inputData}${epilog}`, newOffset = prologEnd + inputData.length;
  if (isElementType(node, "input", { type: "time" })) {
    let builtValue = buildTimeValue(newValue);
    builtValue !== "" && isValidDateOrTimeValue(node, builtValue) && (newValue = builtValue, newOffset = builtValue.length);
  }
  return { oldValue: value, newValue, newOffset };
}
function commitInput(instance, element, newOffset, inputInit) {
  instance.dispatchUIEvent(element, "input", inputInit), commitValueAfterInput(element, newOffset);
}
function isValidNumberInput(value) {
  var _value_match, _value_match1;
  let valueParts = value.split("e", 2);
  return !(/[^\d.\-e]/.test(value) || Number((_value_match = value.match(/-/g)) === null || _value_match === void 0 ? void 0 : _value_match.length) > 2 || Number((_value_match1 = value.match(/\./g)) === null || _value_match1 === void 0 ? void 0 : _value_match1.length) > 1 || valueParts[1] && !/^-?\d*$/.test(valueParts[1]));
}
behavior.cut = (event, target, instance) => () => {
  isEditable(target) && input(instance, target, "", "deleteByCut");
};
function getValueOrTextContent(element) {
  return element ? isContentEditable(element) ? element.textContent : getUIValue(element) : null;
}
function isVisible(element) {
  let window2 = getWindow(element);
  for (let el = element; el == null ? void 0 : el.ownerDocument; el = el.parentElement) {
    let { display: display2, visibility } = window2.getComputedStyle(el);
    if (display2 === "none" || visibility === "hidden") return false;
  }
  return true;
}
function getTabDestination(activeElement, shift) {
  let document2 = activeElement.ownerDocument, focusableElements = document2.querySelectorAll(FOCUSABLE_SELECTOR), enabledElements = Array.from(focusableElements).filter((el) => el === activeElement || !(Number(el.getAttribute("tabindex")) < 0 || isDisabled2(el)));
  Number(activeElement.getAttribute("tabindex")) >= 0 && enabledElements.sort((a2, b) => {
    let i = Number(a2.getAttribute("tabindex")), j = Number(b.getAttribute("tabindex"));
    return i === j ? 0 : i === 0 ? 1 : j === 0 ? -1 : i - j;
  });
  let checkedRadio = {}, prunedElements = [document2.body], activeRadioGroup = isElementType(activeElement, "input", { type: "radio" }) ? activeElement.name : void 0;
  enabledElements.forEach((currentElement) => {
    let el = currentElement;
    if (isElementType(el, "input", { type: "radio" }) && el.name) {
      if (el === activeElement) {
        prunedElements.push(el);
        return;
      } else if (el.name === activeRadioGroup) return;
      if (el.checked) {
        prunedElements = prunedElements.filter((e) => !isElementType(e, "input", { type: "radio", name: el.name })), prunedElements.push(el), checkedRadio[el.name] = el;
        return;
      }
      if (typeof checkedRadio[el.name] < "u") return;
    }
    prunedElements.push(el);
  });
  for (let index = prunedElements.findIndex((el) => el === activeElement); ; ) if (index += shift ? -1 : 1, index === prunedElements.length ? index = 0 : index === -1 && (index = prunedElements.length - 1), prunedElements[index] === activeElement || prunedElements[index] === document2.body || isVisible(prunedElements[index])) return prunedElements[index];
}
function moveSelection(node, direction) {
  if (hasOwnSelection(node)) {
    let selection = getUISelection(node);
    setSelection({ focusNode: node, focusOffset: selection.startOffset === selection.endOffset ? selection.focusOffset + direction : direction < 0 ? selection.startOffset : selection.endOffset });
  } else {
    let selection = node.ownerDocument.getSelection();
    if (!(selection == null ? void 0 : selection.focusNode)) return;
    if (selection.isCollapsed) {
      let nextPosition = getNextCursorPosition(selection.focusNode, selection.focusOffset, direction);
      nextPosition && setSelection({ focusNode: nextPosition.node, focusOffset: nextPosition.offset });
    } else selection[direction < 0 ? "collapseToStart" : "collapseToEnd"]();
  }
}
function selectAll(target) {
  if (hasOwnSelection(target)) return setSelection({ focusNode: target, anchorOffset: 0, focusOffset: getUIValue(target).length });
  var _getContentEditable;
  let focusNode = (_getContentEditable = getContentEditable(target)) !== null && _getContentEditable !== void 0 ? _getContentEditable : target.ownerDocument.body;
  setSelection({ focusNode, anchorOffset: 0, focusOffset: focusNode.childNodes.length });
}
function isAllSelected(target) {
  if (hasOwnSelection(target)) return getUISelection(target).startOffset === 0 && getUISelection(target).endOffset === getUIValue(target).length;
  var _getContentEditable;
  let focusNode = (_getContentEditable = getContentEditable(target)) !== null && _getContentEditable !== void 0 ? _getContentEditable : target.ownerDocument.body, selection = target.ownerDocument.getSelection();
  return (selection == null ? void 0 : selection.anchorNode) === focusNode && selection.focusNode === focusNode && selection.anchorOffset === 0 && selection.focusOffset === focusNode.childNodes.length;
}
function setSelectionRange(element, anchorOffset, focusOffset) {
  var _element_firstChild;
  if (hasOwnSelection(element)) return setSelection({ focusNode: element, anchorOffset, focusOffset });
  if (isContentEditable(element) && ((_element_firstChild = element.firstChild) === null || _element_firstChild === void 0 ? void 0 : _element_firstChild.nodeType) === 3) return setSelection({ focusNode: element.firstChild, anchorOffset, focusOffset });
  throw new Error("Not implemented. The result of this interaction is unreliable.");
}
function walkRadio(instance, el, direction) {
  let window2 = getWindow(el), group = Array.from(el.ownerDocument.querySelectorAll(el.name ? `input[type="radio"][name="${window2.CSS.escape(el.name)}"]` : 'input[type="radio"][name=""], input[type="radio"]:not([name])'));
  for (let i = group.findIndex((e) => e === el) + direction; ; i += direction) {
    if (group[i] || (i = direction > 0 ? 0 : group.length - 1), group[i] === el) return;
    isDisabled2(group[i]) || (focusElement(group[i]), instance.dispatchUIEvent(group[i], "click"));
  }
}
behavior.keydown = (event, target, instance) => {
  var _keydownBehavior_event_key, _keydownBehavior_event_key1;
  return (_keydownBehavior_event_key1 = (_keydownBehavior_event_key = keydownBehavior[event.key]) === null || _keydownBehavior_event_key === void 0 ? void 0 : _keydownBehavior_event_key.call(keydownBehavior, event, target, instance)) !== null && _keydownBehavior_event_key1 !== void 0 ? _keydownBehavior_event_key1 : combinationBehavior(event, target, instance);
};
var keydownBehavior = { ArrowDown: (event, target, instance) => {
  if (isElementType(target, "input", { type: "radio" })) return () => walkRadio(instance, target, -1);
}, ArrowLeft: (event, target, instance) => isElementType(target, "input", { type: "radio" }) ? () => walkRadio(instance, target, -1) : () => moveSelection(target, -1), ArrowRight: (event, target, instance) => isElementType(target, "input", { type: "radio" }) ? () => walkRadio(instance, target, 1) : () => moveSelection(target, 1), ArrowUp: (event, target, instance) => {
  if (isElementType(target, "input", { type: "radio" })) return () => walkRadio(instance, target, 1);
}, Backspace: (event, target, instance) => {
  if (isEditable(target)) return () => {
    input(instance, target, "", "deleteContentBackward");
  };
}, Delete: (event, target, instance) => {
  if (isEditable(target)) return () => {
    input(instance, target, "", "deleteContentForward");
  };
}, End: (event, target) => {
  if (isElementType(target, ["input", "textarea"]) || isContentEditable(target)) return () => {
    var _getValueOrTextContent, _getValueOrTextContent_length;
    let newPos = (_getValueOrTextContent_length = (_getValueOrTextContent = getValueOrTextContent(target)) === null || _getValueOrTextContent === void 0 ? void 0 : _getValueOrTextContent.length) !== null && _getValueOrTextContent_length !== void 0 ? _getValueOrTextContent_length : 0;
    setSelectionRange(target, newPos, newPos);
  };
}, Home: (event, target) => {
  if (isElementType(target, ["input", "textarea"]) || isContentEditable(target)) return () => {
    setSelectionRange(target, 0, 0);
  };
}, PageDown: (event, target) => {
  if (isElementType(target, ["input"])) return () => {
    let newPos = getUIValue(target).length;
    setSelectionRange(target, newPos, newPos);
  };
}, PageUp: (event, target) => {
  if (isElementType(target, ["input"])) return () => {
    setSelectionRange(target, 0, 0);
  };
}, Tab: (event, target, instance) => () => {
  let dest = getTabDestination(target, instance.system.keyboard.modifiers.Shift);
  focusElement(dest), hasOwnSelection(dest) && setUISelection(dest, { anchorOffset: 0, focusOffset: dest.value.length });
} }, combinationBehavior = (event, target, instance) => {
  if (event.code === "KeyA" && instance.system.keyboard.modifiers.Control) return () => selectAll(target);
};
behavior.keypress = (event, target, instance) => {
  if (event.key === "Enter") {
    if (isElementType(target, "button") || isElementType(target, "input") && ClickInputOnEnter.includes(target.type) || isElementType(target, "a") && target.href) return () => {
      instance.dispatchUIEvent(target, "click");
    };
    if (isElementType(target, "input")) {
      let form = target.form, submit = form == null ? void 0 : form.querySelector('input[type="submit"], button:not([type]), button[type="submit"]');
      return submit ? () => instance.dispatchUIEvent(submit, "click") : form && SubmitSingleInputOnEnter.includes(target.type) && form.querySelectorAll("input").length === 1 ? () => instance.dispatchUIEvent(form, "submit") : void 0;
    }
  }
  if (isEditable(target)) {
    let inputType = event.key === "Enter" ? isContentEditable(target) && !instance.system.keyboard.modifiers.Shift ? "insertParagraph" : "insertLineBreak" : "insertText", inputData = event.key === "Enter" ? `
` : event.key;
    return () => input(instance, target, inputData, inputType);
  }
};
var ClickInputOnEnter = ["button", "color", "file", "image", "reset", "submit"], SubmitSingleInputOnEnter = ["email", "month", "password", "search", "tel", "text", "url", "week"];
behavior.keyup = (event, target, instance) => {
  var _keyupBehavior_event_key;
  return (_keyupBehavior_event_key = keyupBehavior[event.key]) === null || _keyupBehavior_event_key === void 0 ? void 0 : _keyupBehavior_event_key.call(keyupBehavior, event, target, instance);
};
var keyupBehavior = { " ": (event, target, instance) => {
  if (isClickableInput(target)) return () => instance.dispatchUIEvent(target, "click");
} };
behavior.paste = (event, target, instance) => {
  if (isEditable(target)) return () => {
    var _event_clipboardData;
    let insertData = (_event_clipboardData = event.clipboardData) === null || _event_clipboardData === void 0 ? void 0 : _event_clipboardData.getData("text");
    insertData && input(instance, target, insertData, "insertFromPaste");
  };
};
var eventMap2 = { auxclick: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, beforeinput: { EventType: "InputEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, click: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, contextmenu: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, copy: { EventType: "ClipboardEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, change: { EventType: "Event", defaultInit: { bubbles: true, cancelable: false } }, cut: { EventType: "ClipboardEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, dblclick: { EventType: "MouseEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, keydown: { EventType: "KeyboardEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, keypress: { EventType: "KeyboardEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, keyup: { EventType: "KeyboardEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, paste: { EventType: "ClipboardEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, input: { EventType: "InputEvent", defaultInit: { bubbles: true, cancelable: false, composed: true } }, mousedown: { EventType: "MouseEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, mouseenter: { EventType: "MouseEvent", defaultInit: { bubbles: false, cancelable: false, composed: true } }, mouseleave: { EventType: "MouseEvent", defaultInit: { bubbles: false, cancelable: false, composed: true } }, mousemove: { EventType: "MouseEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, mouseout: { EventType: "MouseEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, mouseover: { EventType: "MouseEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, mouseup: { EventType: "MouseEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, pointerover: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, pointerenter: { EventType: "PointerEvent", defaultInit: { bubbles: false, cancelable: false } }, pointerdown: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, pointermove: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, pointerup: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, pointercancel: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: false, composed: true } }, pointerout: { EventType: "PointerEvent", defaultInit: { bubbles: true, cancelable: true, composed: true } }, pointerleave: { EventType: "PointerEvent", defaultInit: { bubbles: false, cancelable: false } }, submit: { EventType: "Event", defaultInit: { bubbles: true, cancelable: true } } };
function getEventClass(type5) {
  return eventMap2[type5].EventType;
}
var mouseEvents = ["MouseEvent", "PointerEvent"];
function isMouseEvent(type5) {
  return mouseEvents.includes(getEventClass(type5));
}
function isKeyboardEvent(type5) {
  return getEventClass(type5) === "KeyboardEvent";
}
var eventInitializer = { ClipboardEvent: [initClipboardEvent], Event: [], InputEvent: [initUIEvent, initInputEvent], MouseEvent: [initUIEvent, initUIEventModififiers, initMouseEvent], PointerEvent: [initUIEvent, initUIEventModififiers, initMouseEvent, initPointerEvent], KeyboardEvent: [initUIEvent, initUIEventModififiers, initKeyboardEvent] };
function createEvent2(type5, target, init) {
  let window2 = getWindow(target), { EventType, defaultInit } = eventMap2[type5], event = new (getEventConstructors(window2))[EventType](type5, defaultInit);
  return eventInitializer[EventType].forEach((f4) => f4(event, init ?? {})), event;
}
function getEventConstructors(window2) {
  var _window_Event;
  let Event = (_window_Event = window2.Event) !== null && _window_Event !== void 0 ? _window_Event : class {
  };
  var _window_AnimationEvent;
  let AnimationEvent = (_window_AnimationEvent = window2.AnimationEvent) !== null && _window_AnimationEvent !== void 0 ? _window_AnimationEvent : class extends Event {
  };
  var _window_ClipboardEvent;
  let ClipboardEvent = (_window_ClipboardEvent = window2.ClipboardEvent) !== null && _window_ClipboardEvent !== void 0 ? _window_ClipboardEvent : class extends Event {
  };
  var _window_PopStateEvent;
  let PopStateEvent = (_window_PopStateEvent = window2.PopStateEvent) !== null && _window_PopStateEvent !== void 0 ? _window_PopStateEvent : class extends Event {
  };
  var _window_ProgressEvent;
  let ProgressEvent = (_window_ProgressEvent = window2.ProgressEvent) !== null && _window_ProgressEvent !== void 0 ? _window_ProgressEvent : class extends Event {
  };
  var _window_TransitionEvent;
  let TransitionEvent = (_window_TransitionEvent = window2.TransitionEvent) !== null && _window_TransitionEvent !== void 0 ? _window_TransitionEvent : class extends Event {
  };
  var _window_UIEvent;
  let UIEvent = (_window_UIEvent = window2.UIEvent) !== null && _window_UIEvent !== void 0 ? _window_UIEvent : class extends Event {
  };
  var _window_CompositionEvent;
  let CompositionEvent = (_window_CompositionEvent = window2.CompositionEvent) !== null && _window_CompositionEvent !== void 0 ? _window_CompositionEvent : class extends UIEvent {
  };
  var _window_FocusEvent;
  let FocusEvent = (_window_FocusEvent = window2.FocusEvent) !== null && _window_FocusEvent !== void 0 ? _window_FocusEvent : class extends UIEvent {
  };
  var _window_InputEvent;
  let InputEvent = (_window_InputEvent = window2.InputEvent) !== null && _window_InputEvent !== void 0 ? _window_InputEvent : class extends UIEvent {
  };
  var _window_KeyboardEvent;
  let KeyboardEvent = (_window_KeyboardEvent = window2.KeyboardEvent) !== null && _window_KeyboardEvent !== void 0 ? _window_KeyboardEvent : class extends UIEvent {
  };
  var _window_MouseEvent;
  let MouseEvent = (_window_MouseEvent = window2.MouseEvent) !== null && _window_MouseEvent !== void 0 ? _window_MouseEvent : class extends UIEvent {
  };
  var _window_DragEvent;
  let DragEvent = (_window_DragEvent = window2.DragEvent) !== null && _window_DragEvent !== void 0 ? _window_DragEvent : class extends MouseEvent {
  };
  var _window_PointerEvent;
  let PointerEvent = (_window_PointerEvent = window2.PointerEvent) !== null && _window_PointerEvent !== void 0 ? _window_PointerEvent : class extends MouseEvent {
  };
  var _window_TouchEvent;
  let TouchEvent = (_window_TouchEvent = window2.TouchEvent) !== null && _window_TouchEvent !== void 0 ? _window_TouchEvent : class extends UIEvent {
  };
  return { Event, AnimationEvent, ClipboardEvent, PopStateEvent, ProgressEvent, TransitionEvent, UIEvent, CompositionEvent, FocusEvent, InputEvent, KeyboardEvent, MouseEvent, DragEvent, PointerEvent, TouchEvent };
}
function assignProps(obj, props) {
  for (let [key, value] of Object.entries(props)) Object.defineProperty(obj, key, { get: () => value ?? null });
}
function sanitizeNumber(n) {
  return Number(n ?? 0);
}
function initClipboardEvent(event, { clipboardData }) {
  assignProps(event, { clipboardData });
}
function initInputEvent(event, { data, inputType, isComposing }) {
  assignProps(event, { data, isComposing: !!isComposing, inputType: String(inputType) });
}
function initUIEvent(event, { view, detail }) {
  assignProps(event, { view, detail: sanitizeNumber(detail ?? 0) });
}
function initUIEventModififiers(event, { altKey, ctrlKey, metaKey, shiftKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierNumLock, modifierScrollLock, modifierSymbol, modifierSymbolLock }) {
  assignProps(event, { altKey: !!altKey, ctrlKey: !!ctrlKey, metaKey: !!metaKey, shiftKey: !!shiftKey, getModifierState(k2) {
    return !!{ Alt: altKey, AltGraph: modifierAltGraph, CapsLock: modifierCapsLock, Control: ctrlKey, Fn: modifierFn, FnLock: modifierFnLock, Meta: metaKey, NumLock: modifierNumLock, ScrollLock: modifierScrollLock, Shift: shiftKey, Symbol: modifierSymbol, SymbolLock: modifierSymbolLock }[k2];
  } });
}
function initKeyboardEvent(event, { key, code, location, repeat, isComposing, charCode }) {
  assignProps(event, { key: String(key), code: String(code), location: sanitizeNumber(location), repeat: !!repeat, isComposing: !!isComposing, charCode });
}
function initMouseEvent(event, { x: x2, y: y2, screenX, screenY, clientX = x2, clientY = y2, button, buttons, relatedTarget }) {
  assignProps(event, { screenX: sanitizeNumber(screenX), screenY: sanitizeNumber(screenY), clientX: sanitizeNumber(clientX), x: sanitizeNumber(clientX), clientY: sanitizeNumber(clientY), y: sanitizeNumber(clientY), button: sanitizeNumber(button), buttons: sanitizeNumber(buttons), relatedTarget });
}
function initPointerEvent(event, { pointerId, width, height, pressure, tangentialPressure, tiltX, tiltY, twist, pointerType, isPrimary }) {
  assignProps(event, { pointerId: sanitizeNumber(pointerId), width: sanitizeNumber(width), height: sanitizeNumber(height), pressure: sanitizeNumber(pressure), tangentialPressure: sanitizeNumber(tangentialPressure), tiltX: sanitizeNumber(tiltX), tiltY: sanitizeNumber(tiltY), twist: sanitizeNumber(twist), pointerType: String(pointerType), isPrimary: !!isPrimary });
}
function dispatchUIEvent(target, type5, init, preventDefault = false) {
  (isMouseEvent(type5) || isKeyboardEvent(type5)) && (init = { ...init, ...this.system.getUIEventModifiers() });
  let event = createEvent2(type5, target, init);
  return dispatchEvent.call(this, target, event, preventDefault);
}
function dispatchEvent(target, event, preventDefault = false) {
  var _behavior_type;
  let type5 = event.type, behaviorImplementation = preventDefault ? () => {
  } : (_behavior_type = behavior[type5]) === null || _behavior_type === void 0 ? void 0 : _behavior_type.call(behavior, event, target, this);
  if (behaviorImplementation) {
    event.preventDefault();
    let defaultPrevented = false;
    return Object.defineProperty(event, "defaultPrevented", { get: () => defaultPrevented }), Object.defineProperty(event, "preventDefault", { value: () => {
      defaultPrevented = event.cancelable;
    } }), wrapEvent(() => target.dispatchEvent(event)), defaultPrevented || behaviorImplementation(), !defaultPrevented;
  }
  return wrapEvent(() => target.dispatchEvent(event));
}
function dispatchDOMEvent(target, type5, init) {
  let event = createEvent2(type5, target, init);
  wrapEvent(() => target.dispatchEvent(event));
}
var Interceptor = Symbol("Interceptor for programmatical calls");
function prepareInterceptor(element, propName, interceptorImpl) {
  let prototypeDescriptor = Object.getOwnPropertyDescriptor(element.constructor.prototype, propName), objectDescriptor = Object.getOwnPropertyDescriptor(element, propName), target = (prototypeDescriptor == null ? void 0 : prototypeDescriptor.set) ? "set" : "value";
  if (typeof (prototypeDescriptor == null ? void 0 : prototypeDescriptor[target]) != "function" || prototypeDescriptor[target][Interceptor]) throw new Error(`Element ${element.tagName} does not implement "${String(propName)}".`);
  function intercept(...args) {
    let { applyNative = false, realArgs, then } = interceptorImpl.call(this, ...args), realFunc = (!applyNative && objectDescriptor || prototypeDescriptor)[target];
    target === "set" ? realFunc.call(this, realArgs) : realFunc.call(this, ...realArgs), then == null ? void 0 : then();
  }
  intercept[Interceptor] = Interceptor, Object.defineProperty(element, propName, { ...objectDescriptor ?? prototypeDescriptor, [target]: intercept });
}
function prepareValueInterceptor(element) {
  prepareInterceptor(element, "value", function(v) {
    let isUI = isUIValue(v);
    return isUI && startTrackValue(this), { applyNative: !!isUI, realArgs: sanitizeValue(this, v), then: isUI ? void 0 : () => trackOrSetValue(this, String(v)) };
  });
}
function sanitizeValue(element, v) {
  return isElementType(element, "input", { type: "number" }) && String(v) !== "" && !Number.isNaN(Number(v)) ? String(Number(v)) : String(v);
}
function prepareSelectionInterceptor(element) {
  prepareInterceptor(element, "setSelectionRange", function(start, ...others) {
    let isUI = isUISelectionStart(start);
    return { applyNative: !!isUI, realArgs: [Number(start), ...others], then: () => isUI ? void 0 : setUISelectionClean(element) };
  }), prepareInterceptor(element, "selectionStart", function(v) {
    return { realArgs: v, then: () => setUISelectionClean(element) };
  }), prepareInterceptor(element, "selectionEnd", function(v) {
    return { realArgs: v, then: () => setUISelectionClean(element) };
  }), prepareInterceptor(element, "select", function() {
    return { realArgs: [], then: () => setUISelectionRaw(element, { anchorOffset: 0, focusOffset: getUIValue(element).length }) };
  });
}
function prepareRangeTextInterceptor(element) {
  prepareInterceptor(element, "setRangeText", function(...realArgs) {
    return { realArgs, then: () => {
      setUIValueClean(element), setUISelectionClean(element);
    } };
  });
}
var isPrepared = Symbol("Node prepared with document state workarounds");
function prepareDocument(document2) {
  document2[isPrepared] || (document2.addEventListener("focus", (e) => {
    let el = e.target;
    prepareElement(el);
  }, { capture: true, passive: true }), document2.activeElement && prepareElement(document2.activeElement), document2.addEventListener("blur", (e) => {
    let el = e.target, initialValue2 = getInitialValue(el);
    initialValue2 !== void 0 && (el.value !== initialValue2 && dispatchDOMEvent(el, "change"), clearInitialValue(el));
  }, { capture: true, passive: true }), document2[isPrepared] = isPrepared);
}
function prepareElement(el) {
  el[isPrepared] || (isElementType(el, ["input", "textarea"]) && (prepareValueInterceptor(el), prepareSelectionInterceptor(el), prepareRangeTextInterceptor(el)), el[isPrepared] = isPrepared);
}
function getDocumentFromNode(el) {
  return isDocument2(el) ? el : el.ownerDocument;
}
function isDocument2(node) {
  return node.nodeType === 9;
}
function wait(config3) {
  let delay = config3.delay;
  if (typeof delay == "number") return Promise.all([new Promise((resolve) => globalThis.setTimeout(() => resolve(), delay)), config3.advanceTimers(delay)]);
}
function _define_property3(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) : obj[key] = value, obj;
}
var DOM_KEY_LOCATION;
(function(DOM_KEY_LOCATION2) {
  DOM_KEY_LOCATION2[DOM_KEY_LOCATION2.STANDARD = 0] = "STANDARD", DOM_KEY_LOCATION2[DOM_KEY_LOCATION2.LEFT = 1] = "LEFT", DOM_KEY_LOCATION2[DOM_KEY_LOCATION2.RIGHT = 2] = "RIGHT", DOM_KEY_LOCATION2[DOM_KEY_LOCATION2.NUMPAD = 3] = "NUMPAD";
})(DOM_KEY_LOCATION || (DOM_KEY_LOCATION = {}));
var modifierKeys = ["Alt", "AltGraph", "Control", "Fn", "Meta", "Shift", "Symbol"];
function isModifierKey(key) {
  return modifierKeys.includes(key);
}
var modifierLocks = ["CapsLock", "FnLock", "NumLock", "ScrollLock", "SymbolLock"];
function isModifierLock(key) {
  return modifierLocks.includes(key);
}
var KeyboardHost = class {
  isKeyPressed(keyDef) {
    return !!this.pressed[String(keyDef.code)];
  }
  getPressedKeys() {
    return Object.values(this.pressed).map((p3) => p3.keyDef);
  }
  async keydown(instance, keyDef) {
    var _this_pressed, _code, _this_pressed_code;
    let key = String(keyDef.key), code = String(keyDef.code), target = getActiveElementOrBody(instance.config.document);
    this.setKeydownTarget(target);
    var _;
    (_ = (_this_pressed = this.pressed)[_code = code]) !== null && _ !== void 0 || (_this_pressed[_code] = { keyDef, unpreventedDefault: false }), isModifierKey(key) && (this.modifiers[key] = true);
    let unprevented = instance.dispatchUIEvent(target, "keydown", { key, code });
    isModifierLock(key) && !this.modifiers[key] && (this.modifiers[key] = true, this.modifierLockStart[key] = true), (_this_pressed_code = this.pressed[code]).unpreventedDefault || (_this_pressed_code.unpreventedDefault = unprevented), unprevented && this.hasKeyPress(key) && instance.dispatchUIEvent(getActiveElementOrBody(instance.config.document), "keypress", { key, code, charCode: keyDef.key === "Enter" ? 13 : String(keyDef.key).charCodeAt(0) });
  }
  async keyup(instance, keyDef) {
    let key = String(keyDef.key), code = String(keyDef.code), unprevented = this.pressed[code].unpreventedDefault;
    delete this.pressed[code], isModifierKey(key) && !Object.values(this.pressed).find((p3) => p3.keyDef.key === key) && (this.modifiers[key] = false), instance.dispatchUIEvent(getActiveElementOrBody(instance.config.document), "keyup", { key, code }, !unprevented), isModifierLock(key) && this.modifiers[key] && (this.modifierLockStart[key] ? this.modifierLockStart[key] = false : this.modifiers[key] = false);
  }
  setKeydownTarget(target) {
    target !== this.lastKeydownTarget && (this.carryChar = ""), this.lastKeydownTarget = target;
  }
  hasKeyPress(key) {
    return (key.length === 1 || key === "Enter") && !this.modifiers.Control && !this.modifiers.Alt;
  }
  constructor(system) {
    _define_property3(this, "system", void 0), _define_property3(this, "modifiers", { Alt: false, AltGraph: false, CapsLock: false, Control: false, Fn: false, FnLock: false, Meta: false, NumLock: false, ScrollLock: false, Shift: false, Symbol: false, SymbolLock: false }), _define_property3(this, "pressed", {}), _define_property3(this, "carryChar", ""), _define_property3(this, "lastKeydownTarget", void 0), _define_property3(this, "modifierLockStart", {}), this.system = system;
  }
};
var defaultKeyMap = [..."0123456789".split("").map((c) => ({ code: `Digit${c}`, key: c })), ...")!@#$%^&*(".split("").map((c, i) => ({ code: `Digit${i}`, key: c, shiftKey: true })), ..."abcdefghijklmnopqrstuvwxyz".split("").map((c) => ({ code: `Key${c.toUpperCase()}`, key: c })), ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c) => ({ code: `Key${c}`, key: c, shiftKey: true })), { code: "Space", key: " " }, { code: "AltLeft", key: "Alt", location: DOM_KEY_LOCATION.LEFT }, { code: "AltRight", key: "Alt", location: DOM_KEY_LOCATION.RIGHT }, { code: "ShiftLeft", key: "Shift", location: DOM_KEY_LOCATION.LEFT }, { code: "ShiftRight", key: "Shift", location: DOM_KEY_LOCATION.RIGHT }, { code: "ControlLeft", key: "Control", location: DOM_KEY_LOCATION.LEFT }, { code: "ControlRight", key: "Control", location: DOM_KEY_LOCATION.RIGHT }, { code: "MetaLeft", key: "Meta", location: DOM_KEY_LOCATION.LEFT }, { code: "MetaRight", key: "Meta", location: DOM_KEY_LOCATION.RIGHT }, { code: "OSLeft", key: "OS", location: DOM_KEY_LOCATION.LEFT }, { code: "OSRight", key: "OS", location: DOM_KEY_LOCATION.RIGHT }, { code: "Tab", key: "Tab" }, { code: "CapsLock", key: "CapsLock" }, { code: "Backspace", key: "Backspace" }, { code: "Enter", key: "Enter" }, { code: "Escape", key: "Escape" }, { code: "ArrowUp", key: "ArrowUp" }, { code: "ArrowDown", key: "ArrowDown" }, { code: "ArrowLeft", key: "ArrowLeft" }, { code: "ArrowRight", key: "ArrowRight" }, { code: "Home", key: "Home" }, { code: "End", key: "End" }, { code: "Delete", key: "Delete" }, { code: "PageUp", key: "PageUp" }, { code: "PageDown", key: "PageDown" }, { code: "Fn", key: "Fn" }, { code: "Symbol", key: "Symbol" }, { code: "AltRight", key: "AltGraph" }];
var defaultKeyMap2 = [{ name: "MouseLeft", pointerType: "mouse", button: "primary" }, { name: "MouseRight", pointerType: "mouse", button: "secondary" }, { name: "MouseMiddle", pointerType: "mouse", button: "auxiliary" }, { name: "TouchA", pointerType: "touch" }, { name: "TouchB", pointerType: "touch" }, { name: "TouchC", pointerType: "touch" }];
function _define_property4(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) : obj[key] = value, obj;
}
var Buttons = class {
  getButtons() {
    let v = 0;
    for (let button of Object.keys(this.pressed)) v |= 2 ** Number(button);
    return v;
  }
  down(keyDef) {
    let button = getMouseButtonId(keyDef.button);
    if (button in this.pressed) {
      this.pressed[button].push(keyDef);
      return;
    }
    return this.pressed[button] = [keyDef], button;
  }
  up(keyDef) {
    let button = getMouseButtonId(keyDef.button);
    if (button in this.pressed && (this.pressed[button] = this.pressed[button].filter((k2) => k2.name !== keyDef.name), this.pressed[button].length === 0)) return delete this.pressed[button], button;
  }
  constructor() {
    _define_property4(this, "pressed", {});
  }
}, MouseButton = { primary: 0, secondary: 1, auxiliary: 2, back: 3, X1: 3, forward: 4, X2: 4 };
function getMouseButtonId(button = 0) {
  return button in MouseButton ? MouseButton[button] : Number(button);
}
var MouseButtonFlip = { 1: 2, 2: 1 };
function getMouseEventButton(button) {
  return button = getMouseButtonId(button), button in MouseButtonFlip ? MouseButtonFlip[button] : button;
}
function _define_property5(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) : obj[key] = value, obj;
}
var Device = class {
  get countPressed() {
    return this.pressedKeys.size;
  }
  isPressed(keyDef) {
    return this.pressedKeys.has(keyDef.name);
  }
  addPressed(keyDef) {
    return this.pressedKeys.add(keyDef.name);
  }
  removePressed(keyDef) {
    return this.pressedKeys.delete(keyDef.name);
  }
  constructor() {
    _define_property5(this, "pressedKeys", /* @__PURE__ */ new Set());
  }
};
function getTreeDiff(a2, b) {
  let treeA = [];
  for (let el = a2; el; el = el.parentElement) treeA.push(el);
  let treeB = [];
  for (let el = b; el; el = el.parentElement) treeB.push(el);
  let i = 0;
  for (; !(i >= treeA.length || i >= treeB.length || treeA[treeA.length - 1 - i] !== treeB[treeB.length - 1 - i]); i++) ;
  return [treeA.slice(0, treeA.length - i), treeB.slice(0, treeB.length - i), treeB.slice(treeB.length - i)];
}
function resolveCaretPosition({ target, node, offset }) {
  return hasOwnSelection(target) ? { node: target, offset: offset ?? getUIValue(target).length } : node ? { node, offset: offset ?? (node.nodeType === 3 ? node.nodeValue.length : node.childNodes.length) } : findNodeAtTextOffset(target, offset);
}
function findNodeAtTextOffset(node, offset, isRoot = true) {
  let i = offset === void 0 ? node.childNodes.length - 1 : 0, step = offset === void 0 ? -1 : 1;
  for (; offset === void 0 ? i >= (isRoot ? Math.max(node.childNodes.length - 1, 0) : 0) : i <= node.childNodes.length; ) {
    if (offset && i === node.childNodes.length) throw new Error("The given offset is out of bounds.");
    let c = node.childNodes.item(i), text = String(c.textContent);
    if (text.length) if (offset !== void 0 && text.length < offset) offset -= text.length;
    else {
      if (c.nodeType === 1) return findNodeAtTextOffset(c, offset, false);
      if (c.nodeType === 3) return { node: c, offset: offset ?? c.nodeValue.length };
    }
    i += step;
  }
  return { node, offset: node.childNodes.length };
}
function setSelectionPerMouseDown({ document: document2, target, clickCount, node, offset }) {
  if (hasNoSelection(target)) return;
  let targetHasOwnSelection = hasOwnSelection(target), text = String(targetHasOwnSelection ? getUIValue(target) : target.textContent), [start, end] = node ? [offset, offset] : getTextRange(text, offset, clickCount);
  if (targetHasOwnSelection) return setUISelection(target, { anchorOffset: start ?? text.length, focusOffset: end ?? text.length }), { node: target, start: start ?? 0, end: end ?? text.length };
  {
    let { node: startNode, offset: startOffset } = resolveCaretPosition({ target, node, offset: start }), { node: endNode, offset: endOffset } = resolveCaretPosition({ target, node, offset: end }), range = target.ownerDocument.createRange();
    try {
      range.setStart(startNode, startOffset), range.setEnd(endNode, endOffset);
    } catch {
      throw new Error("The given offset is out of bounds.");
    }
    let selection = document2.getSelection();
    return selection == null ? void 0 : selection.removeAllRanges(), selection == null ? void 0 : selection.addRange(range.cloneRange()), range;
  }
}
function getTextRange(text, pos, clickCount) {
  if (clickCount % 3 === 1 || text.length === 0) return [pos, pos];
  let textPos = pos ?? text.length;
  return clickCount % 3 === 2 ? [textPos - text.substr(0, pos).match(/(\w+|\s+|\W)?$/)[0].length, pos === void 0 ? pos : pos + text.substr(pos).match(/^(\w+|\s+|\W)?/)[0].length] : [textPos - text.substr(0, pos).match(/[^\r\n]*$/)[0].length, pos === void 0 ? pos : pos + text.substr(pos).match(/^[^\r\n]*/)[0].length];
}
function modifySelectionPerMouseMove(selectionRange, { document: document2, target, node, offset }) {
  let selectionFocus = resolveCaretPosition({ target, node, offset });
  if ("node" in selectionRange) {
    if (selectionFocus.node === selectionRange.node) {
      let anchorOffset = selectionFocus.offset < selectionRange.start ? selectionRange.end : selectionRange.start, focusOffset = selectionFocus.offset > selectionRange.end || selectionFocus.offset < selectionRange.start ? selectionFocus.offset : selectionRange.end;
      setUISelection(selectionRange.node, { anchorOffset, focusOffset });
    }
  } else {
    let range = selectionRange.cloneRange(), cmp = range.comparePoint(selectionFocus.node, selectionFocus.offset);
    cmp < 0 ? range.setStart(selectionFocus.node, selectionFocus.offset) : cmp > 0 && range.setEnd(selectionFocus.node, selectionFocus.offset);
    let selection = document2.getSelection();
    selection == null ? void 0 : selection.removeAllRanges(), selection == null ? void 0 : selection.addRange(range.cloneRange());
  }
}
function isDifferentPointerPosition(positionA, positionB) {
  var _positionA_coords, _positionB_coords, _positionA_coords1, _positionB_coords1, _positionA_caret, _positionB_caret, _positionA_caret1, _positionB_caret1;
  return positionA.target !== positionB.target || ((_positionA_coords = positionA.coords) === null || _positionA_coords === void 0 ? void 0 : _positionA_coords.x) !== ((_positionB_coords = positionB.coords) === null || _positionB_coords === void 0 ? void 0 : _positionB_coords.y) || ((_positionA_coords1 = positionA.coords) === null || _positionA_coords1 === void 0 ? void 0 : _positionA_coords1.y) !== ((_positionB_coords1 = positionB.coords) === null || _positionB_coords1 === void 0 ? void 0 : _positionB_coords1.y) || ((_positionA_caret = positionA.caret) === null || _positionA_caret === void 0 ? void 0 : _positionA_caret.node) !== ((_positionB_caret = positionB.caret) === null || _positionB_caret === void 0 ? void 0 : _positionB_caret.node) || ((_positionA_caret1 = positionA.caret) === null || _positionA_caret1 === void 0 ? void 0 : _positionA_caret1.offset) !== ((_positionB_caret1 = positionB.caret) === null || _positionB_caret1 === void 0 ? void 0 : _positionB_caret1.offset);
}
function _define_property6(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) : obj[key] = value, obj;
}
var Mouse = class {
  move(instance, position) {
    let prevPosition = this.position, prevTarget = this.getTarget(instance);
    if (this.position = position, !isDifferentPointerPosition(prevPosition, position)) return;
    let nextTarget = this.getTarget(instance), init = this.getEventInit("mousemove"), [leave, enter] = getTreeDiff(prevTarget, nextTarget);
    return { leave: () => {
      prevTarget !== nextTarget && (instance.dispatchUIEvent(prevTarget, "mouseout", init), leave.forEach((el) => instance.dispatchUIEvent(el, "mouseleave", init)));
    }, enter: () => {
      prevTarget !== nextTarget && (instance.dispatchUIEvent(nextTarget, "mouseover", init), enter.forEach((el) => instance.dispatchUIEvent(el, "mouseenter", init)));
    }, move: () => {
      instance.dispatchUIEvent(nextTarget, "mousemove", init), this.modifySelecting(instance);
    } };
  }
  down(instance, keyDef, pointer3) {
    let button = this.buttons.down(keyDef);
    if (button === void 0) return;
    let target = this.getTarget(instance);
    this.buttonDownTarget[button] = target;
    let disabled = isDisabled2(target), init = this.getEventInit("mousedown", keyDef.button);
    (disabled || instance.dispatchUIEvent(target, "mousedown", init)) && (this.startSelecting(instance, init.detail), focusElement(target)), !disabled && getMouseEventButton(keyDef.button) === 2 && instance.dispatchUIEvent(target, "contextmenu", this.getEventInit("contextmenu", keyDef.button, pointer3));
  }
  up(instance, keyDef, pointer3) {
    let button = this.buttons.up(keyDef);
    if (button === void 0) return;
    let target = this.getTarget(instance);
    if (!isDisabled2(target)) {
      instance.dispatchUIEvent(target, "mouseup", this.getEventInit("mouseup", keyDef.button)), this.endSelecting();
      let clickTarget = getTreeDiff(this.buttonDownTarget[button], target)[2][0];
      if (clickTarget) {
        let init = this.getEventInit("click", keyDef.button, pointer3);
        init.detail && (instance.dispatchUIEvent(clickTarget, init.button === 0 ? "click" : "auxclick", init), init.button === 0 && init.detail === 2 && instance.dispatchUIEvent(clickTarget, "dblclick", { ...this.getEventInit("dblclick", keyDef.button), detail: init.detail }));
      }
    }
  }
  resetClickCount() {
    this.clickCount.reset();
  }
  getEventInit(type5, button, pointer3) {
    let init = { ...this.position.coords };
    return pointer3 && (init.pointerId = pointer3.pointerId, init.pointerType = pointer3.pointerType, init.isPrimary = pointer3.isPrimary), init.button = getMouseEventButton(button), init.buttons = this.buttons.getButtons(), type5 === "mousedown" ? init.detail = this.clickCount.getOnDown(init.button) : type5 === "mouseup" ? init.detail = this.clickCount.getOnUp(init.button) : (type5 === "click" || type5 === "auxclick") && (init.detail = this.clickCount.incOnClick(init.button)), init;
  }
  getTarget(instance) {
    var _this_position_target;
    return (_this_position_target = this.position.target) !== null && _this_position_target !== void 0 ? _this_position_target : instance.config.document.body;
  }
  startSelecting(instance, clickCount) {
    var _this_position_caret, _this_position_caret1;
    this.selecting = setSelectionPerMouseDown({ document: instance.config.document, target: this.getTarget(instance), node: (_this_position_caret = this.position.caret) === null || _this_position_caret === void 0 ? void 0 : _this_position_caret.node, offset: (_this_position_caret1 = this.position.caret) === null || _this_position_caret1 === void 0 ? void 0 : _this_position_caret1.offset, clickCount });
  }
  modifySelecting(instance) {
    var _this_position_caret, _this_position_caret1;
    this.selecting && modifySelectionPerMouseMove(this.selecting, { document: instance.config.document, target: this.getTarget(instance), node: (_this_position_caret = this.position.caret) === null || _this_position_caret === void 0 ? void 0 : _this_position_caret.node, offset: (_this_position_caret1 = this.position.caret) === null || _this_position_caret1 === void 0 ? void 0 : _this_position_caret1.offset });
  }
  endSelecting() {
    this.selecting = void 0;
  }
  constructor() {
    _define_property6(this, "position", {}), _define_property6(this, "buttons", new Buttons()), _define_property6(this, "selecting", void 0), _define_property6(this, "buttonDownTarget", {}), _define_property6(this, "clickCount", new class {
      incOnClick(button) {
        let current = this.down[button] === void 0 ? void 0 : Number(this.down[button]) + 1;
        return this.count = this.count[button] === void 0 ? {} : { [button]: Number(this.count[button]) + 1 }, current;
      }
      getOnDown(button) {
        var _this_count_button;
        this.down = { [button]: (_this_count_button = this.count[button]) !== null && _this_count_button !== void 0 ? _this_count_button : 0 };
        var _this_count_button1;
        return this.count = { [button]: (_this_count_button1 = this.count[button]) !== null && _this_count_button1 !== void 0 ? _this_count_button1 : 0 }, Number(this.count[button]) + 1;
      }
      getOnUp(button) {
        return this.down[button] === void 0 ? void 0 : Number(this.down[button]) + 1;
      }
      reset() {
        this.count = {};
      }
      constructor() {
        _define_property6(this, "down", {}), _define_property6(this, "count", {});
      }
    }());
  }
};
function hasPointerEvents(instance, element) {
  var _checkPointerEvents;
  return ((_checkPointerEvents = checkPointerEvents(instance, element)) === null || _checkPointerEvents === void 0 ? void 0 : _checkPointerEvents.pointerEvents) !== "none";
}
function closestPointerEventsDeclaration(element) {
  let window2 = getWindow(element);
  for (let el = element, tree = []; el == null ? void 0 : el.ownerDocument; el = el.parentElement) {
    tree.push(el);
    let pointerEvents = window2.getComputedStyle(el).pointerEvents;
    if (pointerEvents && !["inherit", "unset"].includes(pointerEvents)) return { pointerEvents, tree };
  }
}
var PointerEventsCheck = Symbol("Last check for pointer-events");
function checkPointerEvents(instance, element) {
  let lastCheck = element[PointerEventsCheck];
  if (!(instance.config.pointerEventsCheck !== PointerEventsCheckLevel.Never && (!lastCheck || hasBitFlag(instance.config.pointerEventsCheck, PointerEventsCheckLevel.EachApiCall) && lastCheck[ApiLevel.Call] !== getLevelRef(instance, ApiLevel.Call) || hasBitFlag(instance.config.pointerEventsCheck, PointerEventsCheckLevel.EachTrigger) && lastCheck[ApiLevel.Trigger] !== getLevelRef(instance, ApiLevel.Trigger)))) return lastCheck == null ? void 0 : lastCheck.result;
  let declaration = closestPointerEventsDeclaration(element);
  return element[PointerEventsCheck] = { [ApiLevel.Call]: getLevelRef(instance, ApiLevel.Call), [ApiLevel.Trigger]: getLevelRef(instance, ApiLevel.Trigger), result: declaration }, declaration;
}
function assertPointerEvents(instance, element) {
  let declaration = checkPointerEvents(instance, element);
  if ((declaration == null ? void 0 : declaration.pointerEvents) === "none") throw new Error([`Unable to perform pointer interaction as the element ${declaration.tree.length > 1 ? "inherits" : "has"} \`pointer-events: none\`:`, "", printTree(declaration.tree)].join(`
`));
}
function printTree(tree) {
  return tree.reverse().map((el, i) => ["".padEnd(i), el.tagName, el.id && `#${el.id}`, el.hasAttribute("data-testid") && `(testId=${el.getAttribute("data-testid")})`, getLabelDescr(el), tree.length > 1 && i === 0 && "  <-- This element declared `pointer-events: none`", tree.length > 1 && i === tree.length - 1 && "  <-- Asserted pointer events here"].filter(Boolean).join("")).join(`
`);
}
function getLabelDescr(element) {
  var _element_labels;
  let label;
  if (element.hasAttribute("aria-label")) label = element.getAttribute("aria-label");
  else if (element.hasAttribute("aria-labelledby")) {
    var _element_ownerDocument_getElementById_textContent, _element_ownerDocument_getElementById;
    label = (_element_ownerDocument_getElementById = element.ownerDocument.getElementById(element.getAttribute("aria-labelledby"))) === null || _element_ownerDocument_getElementById === void 0 || (_element_ownerDocument_getElementById_textContent = _element_ownerDocument_getElementById.textContent) === null || _element_ownerDocument_getElementById_textContent === void 0 ? void 0 : _element_ownerDocument_getElementById_textContent.trim();
  } else if (isElementType(element, ["button", "input", "meter", "output", "progress", "select", "textarea"]) && (!((_element_labels = element.labels) === null || _element_labels === void 0) && _element_labels.length)) label = Array.from(element.labels).map((el) => {
    var _el_textContent;
    return (_el_textContent = el.textContent) === null || _el_textContent === void 0 ? void 0 : _el_textContent.trim();
  }).join("|");
  else if (isElementType(element, "button")) {
    var _element_textContent;
    label = (_element_textContent = element.textContent) === null || _element_textContent === void 0 ? void 0 : _element_textContent.trim();
  }
  return label = label == null ? void 0 : label.replace(/\n/g, "  "), Number(label == null ? void 0 : label.length) > 30 && (label = `${label == null ? void 0 : label.substring(0, 29)}…`), label ? `(label=${label})` : "";
}
function hasBitFlag(conf, flag3) {
  return (conf & flag3) > 0;
}
function _define_property7(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) : obj[key] = value, obj;
}
var Pointer = class {
  init(instance, position) {
    this.position = position;
    let target = this.getTarget(instance), [, enter] = getTreeDiff(null, target), init = this.getEventInit();
    return assertPointerEvents(instance, target), instance.dispatchUIEvent(target, "pointerover", init), enter.forEach((el) => instance.dispatchUIEvent(el, "pointerenter", init)), this;
  }
  move(instance, position) {
    let prevPosition = this.position, prevTarget = this.getTarget(instance);
    if (this.position = position, !isDifferentPointerPosition(prevPosition, position)) return;
    let nextTarget = this.getTarget(instance), init = this.getEventInit(), [leave, enter] = getTreeDiff(prevTarget, nextTarget);
    return { leave: () => {
      hasPointerEvents(instance, prevTarget) && prevTarget !== nextTarget && (instance.dispatchUIEvent(prevTarget, "pointerout", init), leave.forEach((el) => instance.dispatchUIEvent(el, "pointerleave", init)));
    }, enter: () => {
      assertPointerEvents(instance, nextTarget), prevTarget !== nextTarget && (instance.dispatchUIEvent(nextTarget, "pointerover", init), enter.forEach((el) => instance.dispatchUIEvent(el, "pointerenter", init)));
    }, move: () => {
      instance.dispatchUIEvent(nextTarget, "pointermove", init);
    } };
  }
  down(instance, _keyDef) {
    if (this.isDown) return;
    let target = this.getTarget(instance);
    assertPointerEvents(instance, target), this.isDown = true, this.isPrevented = !instance.dispatchUIEvent(target, "pointerdown", this.getEventInit());
  }
  up(instance, _keyDef) {
    if (!this.isDown) return;
    let target = this.getTarget(instance);
    assertPointerEvents(instance, target), this.isDown = false, instance.dispatchUIEvent(target, "pointerup", this.getEventInit());
  }
  release(instance) {
    let target = this.getTarget(instance), [leave] = getTreeDiff(target, null), init = this.getEventInit();
    hasPointerEvents(instance, target) && (instance.dispatchUIEvent(target, "pointerout", init), leave.forEach((el) => instance.dispatchUIEvent(el, "pointerleave", init))), this.isCancelled = true;
  }
  getTarget(instance) {
    var _this_position_target;
    return (_this_position_target = this.position.target) !== null && _this_position_target !== void 0 ? _this_position_target : instance.config.document.body;
  }
  getEventInit() {
    return { ...this.position.coords, pointerId: this.pointerId, pointerType: this.pointerType, isPrimary: this.isPrimary };
  }
  constructor({ pointerId, pointerType, isPrimary }) {
    _define_property7(this, "pointerId", void 0), _define_property7(this, "pointerType", void 0), _define_property7(this, "isPrimary", void 0), _define_property7(this, "isMultitouch", false), _define_property7(this, "isCancelled", false), _define_property7(this, "isDown", false), _define_property7(this, "isPrevented", false), _define_property7(this, "position", {}), this.pointerId = pointerId, this.pointerType = pointerType, this.isPrimary = isPrimary, this.isMultitouch = !isPrimary;
  }
};
function _define_property8(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) : obj[key] = value, obj;
}
var PointerHost = class {
  isKeyPressed(keyDef) {
    return this.devices.get(keyDef.pointerType).isPressed(keyDef);
  }
  async press(instance, keyDef, position) {
    let pointerName = this.getPointerName(keyDef), pointer3 = keyDef.pointerType === "touch" ? this.pointers.new(pointerName, keyDef).init(instance, position) : this.pointers.get(pointerName);
    pointer3.position = position, pointer3.pointerType !== "touch" && (this.mouse.position = position), this.devices.get(keyDef.pointerType).addPressed(keyDef), this.buttons.down(keyDef), pointer3.down(instance, keyDef), pointer3.pointerType !== "touch" && !pointer3.isPrevented && this.mouse.down(instance, keyDef, pointer3);
  }
  async move(instance, pointerName, position) {
    let pointer3 = this.pointers.get(pointerName), pointermove = pointer3.move(instance, position), mousemove = pointer3.pointerType === "touch" || pointer3.isPrevented && pointer3.isDown ? void 0 : this.mouse.move(instance, position);
    pointermove == null ? void 0 : pointermove.leave(), mousemove == null ? void 0 : mousemove.leave(), pointermove == null ? void 0 : pointermove.enter(), mousemove == null ? void 0 : mousemove.enter(), pointermove == null ? void 0 : pointermove.move(), mousemove == null ? void 0 : mousemove.move();
  }
  async release(instance, keyDef, position) {
    let device = this.devices.get(keyDef.pointerType);
    device.removePressed(keyDef), this.buttons.up(keyDef);
    let pointer3 = this.pointers.get(this.getPointerName(keyDef));
    if (pointer3.position = position, pointer3.pointerType !== "touch" && (this.mouse.position = position), device.countPressed === 0 && pointer3.up(instance, keyDef), pointer3.pointerType === "touch" && pointer3.release(instance), !pointer3.isPrevented) {
      if (pointer3.pointerType === "touch" && !pointer3.isMultitouch) {
        let mousemove = this.mouse.move(instance, pointer3.position);
        mousemove == null ? void 0 : mousemove.leave(), mousemove == null ? void 0 : mousemove.enter(), mousemove == null ? void 0 : mousemove.move(), this.mouse.down(instance, keyDef, pointer3);
      }
      if (!pointer3.isMultitouch) {
        let mousemove = this.mouse.move(instance, pointer3.position);
        mousemove == null ? void 0 : mousemove.leave(), mousemove == null ? void 0 : mousemove.enter(), mousemove == null ? void 0 : mousemove.move(), this.mouse.up(instance, keyDef, pointer3);
      }
    }
  }
  getPointerName(keyDef) {
    return keyDef.pointerType === "touch" ? keyDef.name : keyDef.pointerType;
  }
  getPreviousPosition(pointerName) {
    return this.pointers.has(pointerName) ? this.pointers.get(pointerName).position : void 0;
  }
  resetClickCount() {
    this.mouse.resetClickCount();
  }
  getMouseTarget(instance) {
    var _this_mouse_position_target;
    return (_this_mouse_position_target = this.mouse.position.target) !== null && _this_mouse_position_target !== void 0 ? _this_mouse_position_target : instance.config.document.body;
  }
  setMousePosition(position) {
    this.mouse.position = position, this.pointers.get("mouse").position = position;
  }
  constructor(system) {
    _define_property8(this, "system", void 0), _define_property8(this, "mouse", void 0), _define_property8(this, "buttons", void 0), _define_property8(this, "devices", new class {
      get(k2) {
        var _this_registry, _k, _;
        return (_ = (_this_registry = this.registry)[_k = k2]) !== null && _ !== void 0 || (_this_registry[_k] = new Device()), this.registry[k2];
      }
      constructor() {
        _define_property8(this, "registry", {});
      }
    }()), _define_property8(this, "pointers", new class {
      new(pointerName, keyDef) {
        let isPrimary = keyDef.pointerType !== "touch" || !Object.values(this.registry).some((p3) => p3.pointerType === "touch" && !p3.isCancelled);
        return isPrimary || Object.values(this.registry).forEach((p3) => {
          p3.pointerType === keyDef.pointerType && !p3.isCancelled && (p3.isMultitouch = true);
        }), this.registry[pointerName] = new Pointer({ pointerId: this.nextId++, pointerType: keyDef.pointerType, isPrimary }), this.registry[pointerName];
      }
      get(pointerName) {
        if (!this.has(pointerName)) throw new Error(`Trying to access pointer "${pointerName}" which does not exist.`);
        return this.registry[pointerName];
      }
      has(pointerName) {
        return pointerName in this.registry;
      }
      constructor() {
        _define_property8(this, "registry", { mouse: new Pointer({ pointerId: 1, pointerType: "mouse", isPrimary: true }) }), _define_property8(this, "nextId", 2);
      }
    }()), this.system = system, this.buttons = new Buttons(), this.mouse = new Mouse();
  }
};
function _define_property9(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) : obj[key] = value, obj;
}
var System = class {
  getUIEventModifiers() {
    return { altKey: this.keyboard.modifiers.Alt, ctrlKey: this.keyboard.modifiers.Control, metaKey: this.keyboard.modifiers.Meta, shiftKey: this.keyboard.modifiers.Shift, modifierAltGraph: this.keyboard.modifiers.AltGraph, modifierCapsLock: this.keyboard.modifiers.CapsLock, modifierFn: this.keyboard.modifiers.Fn, modifierFnLock: this.keyboard.modifiers.FnLock, modifierNumLock: this.keyboard.modifiers.NumLock, modifierScrollLock: this.keyboard.modifiers.ScrollLock, modifierSymbol: this.keyboard.modifiers.Symbol, modifierSymbolLock: this.keyboard.modifiers.SymbolLock };
  }
  constructor() {
    _define_property9(this, "keyboard", new KeyboardHost(this)), _define_property9(this, "pointer", new PointerHost(this));
  }
};
async function click(element) {
  let pointerIn = [];
  return this.config.skipHover || pointerIn.push({ target: element }), pointerIn.push({ keys: "[MouseLeft]", target: element }), this.pointer(pointerIn);
}
async function dblClick(element) {
  return this.pointer([{ target: element }, "[MouseLeft][MouseLeft]"]);
}
async function tripleClick(element) {
  return this.pointer([{ target: element }, "[MouseLeft][MouseLeft][MouseLeft]"]);
}
async function hover(element) {
  return this.pointer({ target: element });
}
async function unhover(element) {
  return assertPointerEvents(this, this.system.pointer.getMouseTarget(this)), this.pointer({ target: element.ownerDocument.body });
}
async function tab({ shift } = {}) {
  return this.keyboard(shift === true ? "{Shift>}{Tab}{/Shift}" : shift === false ? "[/ShiftLeft][/ShiftRight]{Tab}" : "{Tab}");
}
function parseKeyDef(keyboardMap, text) {
  let defs = [];
  do {
    let { type: type5, descriptor, consumedLength, releasePrevious, releaseSelf = true, repeat } = readNextDescriptor(text, "keyboard");
    var _keyboardMap_find;
    let keyDef = (_keyboardMap_find = keyboardMap.find((def) => {
      if (type5 === "[") {
        var _def_code;
        return ((_def_code = def.code) === null || _def_code === void 0 ? void 0 : _def_code.toLowerCase()) === descriptor.toLowerCase();
      } else if (type5 === "{") {
        var _def_key;
        return ((_def_key = def.key) === null || _def_key === void 0 ? void 0 : _def_key.toLowerCase()) === descriptor.toLowerCase();
      }
      return def.key === descriptor;
    })) !== null && _keyboardMap_find !== void 0 ? _keyboardMap_find : { key: "Unknown", code: "Unknown", [type5 === "[" ? "code" : "key"]: descriptor };
    defs.push({ keyDef, releasePrevious, releaseSelf, repeat }), text = text.slice(consumedLength);
  } while (text);
  return defs;
}
async function keyboard(text) {
  let actions = parseKeyDef(this.config.keyboardMap, text);
  for (let i = 0; i < actions.length; i++) await wait(this.config), await keyboardAction(this, actions[i]);
}
async function keyboardAction(instance, { keyDef, releasePrevious, releaseSelf, repeat }) {
  let { system } = instance;
  if (system.keyboard.isKeyPressed(keyDef) && await system.keyboard.keyup(instance, keyDef), !releasePrevious) {
    for (let i = 1; i <= repeat; i++) await system.keyboard.keydown(instance, keyDef), i < repeat && await wait(instance.config);
    releaseSelf && await system.keyboard.keyup(instance, keyDef);
  }
}
async function releaseAllKeys(instance) {
  for (let k2 of instance.system.keyboard.getPressedKeys()) await instance.system.keyboard.keyup(instance, k2);
}
function copySelection(target) {
  let data = hasOwnSelection(target) ? { "text/plain": readSelectedValueFromInput(target) } : { "text/plain": String(target.ownerDocument.getSelection()) }, dt = createDataTransfer(getWindow(target));
  for (let type5 in data) data[type5] && dt.setData(type5, data[type5]);
  return dt;
}
function readSelectedValueFromInput(target) {
  let sel = getUISelection(target);
  return getUIValue(target).substring(sel.startOffset, sel.endOffset);
}
async function copy() {
  let doc = this.config.document;
  var _doc_activeElement;
  let target = (_doc_activeElement = doc.activeElement) !== null && _doc_activeElement !== void 0 ? _doc_activeElement : doc.body, clipboardData = copySelection(target);
  if (clipboardData.items.length !== 0) return this.dispatchUIEvent(target, "copy", { clipboardData }) && this.config.writeToClipboard && await writeDataTransferToClipboard(doc, clipboardData), clipboardData;
}
async function cut() {
  let doc = this.config.document;
  var _doc_activeElement;
  let target = (_doc_activeElement = doc.activeElement) !== null && _doc_activeElement !== void 0 ? _doc_activeElement : doc.body, clipboardData = copySelection(target);
  if (clipboardData.items.length !== 0) return this.dispatchUIEvent(target, "cut", { clipboardData }) && this.config.writeToClipboard && await writeDataTransferToClipboard(target.ownerDocument, clipboardData), clipboardData;
}
async function paste(clipboardData) {
  let doc = this.config.document;
  var _doc_activeElement;
  let target = (_doc_activeElement = doc.activeElement) !== null && _doc_activeElement !== void 0 ? _doc_activeElement : doc.body;
  var _ref;
  let dataTransfer = (_ref = typeof clipboardData == "string" ? getClipboardDataFromString(doc, clipboardData) : clipboardData) !== null && _ref !== void 0 ? _ref : await readDataTransferFromClipboard(doc).catch(() => {
    throw new Error("`userEvent.paste()` without `clipboardData` requires the `ClipboardAPI` to be available.");
  });
  this.dispatchUIEvent(target, "paste", { clipboardData: dataTransfer });
}
function getClipboardDataFromString(doc, text) {
  let dt = createDataTransfer(getWindow(doc));
  return dt.setData("text", text), dt;
}
function parseKeyDef2(pointerMap, keys2) {
  let defs = [];
  do {
    let { descriptor, consumedLength, releasePrevious, releaseSelf = true } = readNextDescriptor(keys2, "pointer"), keyDef = pointerMap.find((p3) => p3.name === descriptor);
    keyDef && defs.push({ keyDef, releasePrevious, releaseSelf }), keys2 = keys2.slice(consumedLength);
  } while (keys2);
  return defs;
}
async function pointer(input2) {
  let { pointerMap } = this.config, actions = [];
  (Array.isArray(input2) ? input2 : [input2]).forEach((actionInput) => {
    typeof actionInput == "string" ? actions.push(...parseKeyDef2(pointerMap, actionInput)) : "keys" in actionInput ? actions.push(...parseKeyDef2(pointerMap, actionInput.keys).map((i) => ({ ...actionInput, ...i }))) : actions.push(actionInput);
  });
  for (let i = 0; i < actions.length; i++) await wait(this.config), await pointerAction(this, actions[i]);
  this.system.pointer.resetClickCount();
}
async function pointerAction(instance, action) {
  var _previousPosition_caret, _previousPosition_caret1;
  let pointerName = "pointerName" in action && action.pointerName ? action.pointerName : "keyDef" in action ? instance.system.pointer.getPointerName(action.keyDef) : "mouse", previousPosition = instance.system.pointer.getPreviousPosition(pointerName);
  var _action_target, _action_coords, _action_node, _action_offset;
  let position = { target: (_action_target = action.target) !== null && _action_target !== void 0 ? _action_target : getPrevTarget(instance, previousPosition), coords: (_action_coords = action.coords) !== null && _action_coords !== void 0 ? _action_coords : previousPosition == null ? void 0 : previousPosition.coords, caret: { node: (_action_node = action.node) !== null && _action_node !== void 0 ? _action_node : hasCaretPosition(action) || previousPosition == null || (_previousPosition_caret = previousPosition.caret) === null || _previousPosition_caret === void 0 ? void 0 : _previousPosition_caret.node, offset: (_action_offset = action.offset) !== null && _action_offset !== void 0 ? _action_offset : hasCaretPosition(action) || previousPosition == null || (_previousPosition_caret1 = previousPosition.caret) === null || _previousPosition_caret1 === void 0 ? void 0 : _previousPosition_caret1.offset } };
  "keyDef" in action ? (instance.system.pointer.isKeyPressed(action.keyDef) && (setLevelRef(instance, ApiLevel.Trigger), await instance.system.pointer.release(instance, action.keyDef, position)), action.releasePrevious || (setLevelRef(instance, ApiLevel.Trigger), await instance.system.pointer.press(instance, action.keyDef, position), action.releaseSelf && (setLevelRef(instance, ApiLevel.Trigger), await instance.system.pointer.release(instance, action.keyDef, position)))) : (setLevelRef(instance, ApiLevel.Trigger), await instance.system.pointer.move(instance, pointerName, position));
}
function hasCaretPosition(action) {
  var _action_target, _ref;
  return !!((_ref = (_action_target = action.target) !== null && _action_target !== void 0 ? _action_target : action.node) !== null && _ref !== void 0 ? _ref : action.offset !== void 0);
}
function getPrevTarget(instance, position) {
  if (!position) throw new Error("This pointer has no previous position. Provide a target property!");
  var _position_target;
  return (_position_target = position.target) !== null && _position_target !== void 0 ? _position_target : instance.config.document.body;
}
async function clear(element) {
  if (!isEditable(element) || isDisabled2(element)) throw new Error("clear()` is only supported on editable elements.");
  if (focusElement(element), element.ownerDocument.activeElement !== element) throw new Error("The element to be cleared could not be focused.");
  if (selectAll(element), !isAllSelected(element)) throw new Error("The element content to be cleared could not be selected.");
  input(this, element, "", "deleteContentBackward");
}
async function selectOptions(select, values) {
  return selectOptionsBase.call(this, true, select, values);
}
async function deselectOptions(select, values) {
  return selectOptionsBase.call(this, false, select, values);
}
async function selectOptionsBase(newValue, select, values) {
  if (!newValue && !select.multiple) throw getConfig2().getElementError("Unable to deselect an option in a non-multiple select. Use selectOptions to change the selection instead.", select);
  let valArray = Array.isArray(values) ? values : [values], allOptions = Array.from(select.querySelectorAll('option, [role="option"]')), selectedOptions = valArray.map((val) => {
    if (typeof val != "string" && allOptions.includes(val)) return val;
    {
      let matchingOption = allOptions.find((o) => o.value === val || o.innerHTML === val);
      if (matchingOption) return matchingOption;
      throw getConfig2().getElementError(`Value "${String(val)}" not found in options`, select);
    }
  }).filter((option) => !isDisabled2(option));
  if (isDisabled2(select) || !selectedOptions.length) return;
  let selectOption = (option) => {
    option.selected = newValue, this.dispatchUIEvent(select, "input", { bubbles: true, cancelable: false, composed: true }), this.dispatchUIEvent(select, "change");
  };
  if (isElementType(select, "select")) if (select.multiple) for (let option of selectedOptions) {
    let withPointerEvents = this.config.pointerEventsCheck === 0 ? true : hasPointerEvents(this, option);
    withPointerEvents && (this.dispatchUIEvent(option, "pointerover"), this.dispatchUIEvent(select, "pointerenter"), this.dispatchUIEvent(option, "mouseover"), this.dispatchUIEvent(select, "mouseenter"), this.dispatchUIEvent(option, "pointermove"), this.dispatchUIEvent(option, "mousemove"), this.dispatchUIEvent(option, "pointerdown"), this.dispatchUIEvent(option, "mousedown")), focusElement(select), withPointerEvents && (this.dispatchUIEvent(option, "pointerup"), this.dispatchUIEvent(option, "mouseup")), selectOption(option), withPointerEvents && this.dispatchUIEvent(option, "click"), await wait(this.config);
  }
  else if (selectedOptions.length === 1) {
    let withPointerEvents = this.config.pointerEventsCheck === 0 ? true : hasPointerEvents(this, select);
    withPointerEvents ? await this.click(select) : focusElement(select), selectOption(selectedOptions[0]), withPointerEvents && (this.dispatchUIEvent(select, "pointerover"), this.dispatchUIEvent(select, "pointerenter"), this.dispatchUIEvent(select, "mouseover"), this.dispatchUIEvent(select, "mouseenter"), this.dispatchUIEvent(select, "pointerup"), this.dispatchUIEvent(select, "mouseup"), this.dispatchUIEvent(select, "click")), await wait(this.config);
  } else throw getConfig2().getElementError("Cannot select multiple options on a non-multiple select", select);
  else if (select.getAttribute("role") === "listbox") for (let option of selectedOptions) await this.click(option), await this.unhover(option);
  else throw getConfig2().getElementError("Cannot select options on elements that are neither select nor listbox elements", select);
}
async function type3(element, text, { skipClick = this.config.skipClick, skipAutoClose = this.config.skipAutoClose, initialSelectionStart, initialSelectionEnd } = {}) {
  element.disabled || (skipClick || await this.click(element), initialSelectionStart !== void 0 && setSelectionRange(element, initialSelectionStart, initialSelectionEnd ?? initialSelectionStart), await this.keyboard(text), skipAutoClose || await releaseAllKeys(this));
}
var fakeFiles = Symbol("files and value properties are mocked");
function restoreProperty(obj, prop, descriptor) {
  descriptor ? Object.defineProperty(obj, prop, descriptor) : delete obj[prop];
}
function setFiles(el, files) {
  var _el_fakeFiles;
  (_el_fakeFiles = el[fakeFiles]) === null || _el_fakeFiles === void 0 || _el_fakeFiles.restore();
  let typeDescr = Object.getOwnPropertyDescriptor(el, "type"), valueDescr = Object.getOwnPropertyDescriptor(el, "value"), filesDescr = Object.getOwnPropertyDescriptor(el, "files");
  function restore() {
    restoreProperty(el, "type", typeDescr), restoreProperty(el, "value", valueDescr), restoreProperty(el, "files", filesDescr);
  }
  el[fakeFiles] = { restore }, Object.defineProperties(el, { files: { configurable: true, get: () => files }, value: { configurable: true, get: () => files.length ? `C:\\fakepath\\${files[0].name}` : "", set(v) {
    if (v === "") restore();
    else {
      var _valueDescr_set;
      valueDescr == null || (_valueDescr_set = valueDescr.set) === null || _valueDescr_set === void 0 || _valueDescr_set.call(el, v);
    }
  } }, type: { configurable: true, get: () => "file", set(v) {
    v !== "file" && (restore(), el.type = v);
  } } });
}
async function upload(element, fileOrFiles) {
  let input2 = isElementType(element, "label") ? element.control : element;
  if (!input2 || !isElementType(input2, "input", { type: "file" })) throw new TypeError(`The ${input2 === element ? "given" : "associated"} ${input2 == null ? void 0 : input2.tagName} element does not accept file uploads`);
  if (isDisabled2(element)) return;
  let files = (Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles]).filter((file) => !this.config.applyAccept || isAcceptableFile(file, input2.accept)).slice(0, input2.multiple ? void 0 : 1), fileDialog = () => {
    var _input_files;
    files.length === ((_input_files = input2.files) === null || _input_files === void 0 ? void 0 : _input_files.length) && files.every((f4, i) => {
      var _input_files2;
      return f4 === ((_input_files2 = input2.files) === null || _input_files2 === void 0 ? void 0 : _input_files2.item(i));
    }) || (setFiles(input2, createFileList(getWindow(element), files)), this.dispatchUIEvent(input2, "input"), this.dispatchUIEvent(input2, "change"));
  };
  input2.addEventListener("fileDialog", fileDialog), await this.click(element), input2.removeEventListener("fileDialog", fileDialog);
}
function isAcceptableFile(file, accept) {
  if (!accept) return true;
  let wildcards = ["audio/*", "image/*", "video/*"];
  return accept.split(",").some((acceptToken) => acceptToken.startsWith(".") ? file.name.endsWith(acceptToken) : wildcards.includes(acceptToken) ? file.type.startsWith(acceptToken.substr(0, acceptToken.length - 1)) : file.type === acceptToken);
}
var userEventApi = { click, dblClick, tripleClick, hover, unhover, tab, keyboard, copy, cut, paste, pointer, clear, deselectOptions, selectOptions, type: type3, upload };
function wrapAsync(implementation) {
  return getConfig2().asyncWrapper(implementation);
}
var defaultOptionsDirect = { applyAccept: true, autoModify: true, delay: 0, document: globalThis.document, keyboardMap: defaultKeyMap, pointerMap: defaultKeyMap2, pointerEventsCheck: PointerEventsCheckLevel.EachApiCall, skipAutoClose: false, skipClick: false, skipHover: false, writeToClipboard: false, advanceTimers: () => Promise.resolve() }, defaultOptionsSetup = { ...defaultOptionsDirect, writeToClipboard: true };
function createConfig(options = {}, defaults = defaultOptionsSetup, node) {
  let document2 = getDocument2(options, node, defaults);
  return { ...defaults, ...options, document: document2 };
}
function setupMain(options = {}) {
  let config3 = createConfig(options);
  prepareDocument(config3.document);
  var _config_document_defaultView;
  let view = (_config_document_defaultView = config3.document.defaultView) !== null && _config_document_defaultView !== void 0 ? _config_document_defaultView : globalThis.window;
  return attachClipboardStubToView(view), createInstance(config3).api;
}
function setupDirect({ keyboardState, pointerState, ...options } = {}, node) {
  let config3 = createConfig(options, defaultOptionsDirect, node);
  prepareDocument(config3.document);
  var _ref;
  let system = (_ref = pointerState ?? keyboardState) !== null && _ref !== void 0 ? _ref : new System();
  return { api: createInstance(config3, system).api, system };
}
function setupSub(options) {
  return createInstance({ ...this.config, ...options }, this.system).api;
}
function wrapAndBindImpl(instance, impl) {
  function method(...args) {
    return setLevelRef(instance, ApiLevel.Call), wrapAsync(() => impl.apply(instance, args).then(async (ret) => (await wait(instance.config), ret)));
  }
  return Object.defineProperty(method, "name", { get: () => impl.name }), method;
}
function createInstance(config3, system = new System()) {
  let instance = {};
  return Object.assign(instance, { config: config3, dispatchEvent: dispatchEvent.bind(instance), dispatchUIEvent: dispatchUIEvent.bind(instance), system, levelRefs: {}, ...userEventApi }), { instance, api: { ...Object.fromEntries(Object.entries(userEventApi).map(([name, api]) => [name, wrapAndBindImpl(instance, api)])), setup: setupSub.bind(instance) } };
}
function getDocument2(options, node, defaults) {
  var _options_document, _ref;
  return (_ref = (_options_document = options.document) !== null && _options_document !== void 0 ? _options_document : node && getDocumentFromNode(node)) !== null && _ref !== void 0 ? _ref : defaults.document;
}
var directApi_exports = {};
__export(directApi_exports, { clear: () => clear2, click: () => click2, copy: () => copy2, cut: () => cut2, dblClick: () => dblClick2, deselectOptions: () => deselectOptions2, hover: () => hover2, keyboard: () => keyboard2, paste: () => paste2, pointer: () => pointer2, selectOptions: () => selectOptions2, tab: () => tab2, tripleClick: () => tripleClick2, type: () => type4, unhover: () => unhover2, upload: () => upload2 });
function clear2(element) {
  return setupDirect().api.clear(element);
}
function click2(element, options = {}) {
  return setupDirect(options, element).api.click(element);
}
function copy2(options = {}) {
  return setupDirect(options).api.copy();
}
function cut2(options = {}) {
  return setupDirect(options).api.cut();
}
function dblClick2(element, options = {}) {
  return setupDirect(options).api.dblClick(element);
}
function deselectOptions2(select, values, options = {}) {
  return setupDirect(options).api.deselectOptions(select, values);
}
function hover2(element, options = {}) {
  return setupDirect(options).api.hover(element);
}
async function keyboard2(text, options = {}) {
  let { api, system } = setupDirect(options);
  return api.keyboard(text).then(() => system);
}
async function pointer2(input2, options = {}) {
  let { api, system } = setupDirect(options);
  return api.pointer(input2).then(() => system);
}
function paste2(clipboardData, options) {
  return setupDirect(options).api.paste(clipboardData);
}
function selectOptions2(select, values, options = {}) {
  return setupDirect(options).api.selectOptions(select, values);
}
function tripleClick2(element, options = {}) {
  return setupDirect(options).api.tripleClick(element);
}
function type4(element, text, options = {}) {
  return setupDirect(options, element).api.type(element, text, options);
}
function unhover2(element, options = {}) {
  let { api, system } = setupDirect(options);
  return system.pointer.setMousePosition({ target: element }), api.unhover(element);
}
function upload2(element, fileOrFiles, options = {}) {
  return setupDirect(options).api.upload(element, fileOrFiles);
}
function tab2(options = {}) {
  return setupDirect().api.tab(options);
}
var userEvent = { ...directApi_exports, setup: setupMain };
function dedent(templ) {
  for (var values = [], _i = 1; _i < arguments.length; _i++) values[_i - 1] = arguments[_i];
  var strings = Array.from(typeof templ == "string" ? [templ] : templ);
  strings[strings.length - 1] = strings[strings.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var indentLengths = strings.reduce(function(arr, str) {
    var matches3 = str.match(/\n([\t ]+|(?!\s).)/g);
    return matches3 ? arr.concat(matches3.map(function(match) {
      var _a2, _b;
      return (_b = (_a2 = match.match(/[\t ]/g)) === null || _a2 === void 0 ? void 0 : _a2.length) !== null && _b !== void 0 ? _b : 0;
    })) : arr;
  }, []);
  if (indentLengths.length) {
    var pattern_1 = new RegExp(`
[	 ]{` + Math.min.apply(Math, indentLengths) + "}", "g");
    strings = strings.map(function(str) {
      return str.replace(pattern_1, `
`);
    });
  }
  strings[0] = strings[0].replace(/^\r?\n/, "");
  var string = strings[0];
  return values.forEach(function(value, i) {
    var endentations = string.match(/(?:^|\n)( *)$/), endentation = endentations ? endentations[1] : "", indentedValue = value;
    typeof value == "string" && value.includes(`
`) && (indentedValue = String(value).split(`
`).map(function(str, i2) {
      return i2 === 0 ? str : "" + endentation + str;
    }).join(`
`)), string += indentedValue + strings[i + 1];
  }), string;
}
var esm_default = dedent;
var testingLibrary = instrument({ ...dom_esm_exports }, { intercept: (method, path) => path[0] === "fireEvent" || method.startsWith("find") || method.startsWith("waitFor") });
testingLibrary.screen = new Proxy(testingLibrary.screen, { get(target, prop, receiver) {
  return once.warn(esm_default`
          You are using Testing Library's \`screen\` object. Use \`within(canvasElement)\` instead.
          More info: https://storybook.js.org/docs/essentials/interactions
        `), Reflect.get(target, prop, receiver);
} });
var { buildQueries: buildQueries2, configure: configure2, createEvent: createEvent3, fireEvent: fireEvent2, findAllByAltText: findAllByAltText2, findAllByDisplayValue: findAllByDisplayValue2, findAllByLabelText: findAllByLabelText2, findAllByPlaceholderText: findAllByPlaceholderText2, findAllByRole: findAllByRole2, findAllByTestId: findAllByTestId2, findAllByText: findAllByText2, findAllByTitle: findAllByTitle2, findByAltText: findByAltText2, findByDisplayValue: findByDisplayValue2, findByLabelText: findByLabelText2, findByPlaceholderText: findByPlaceholderText2, findByRole: findByRole2, findByTestId: findByTestId2, findByText: findByText2, findByTitle: findByTitle2, getAllByAltText: getAllByAltText2, getAllByDisplayValue: getAllByDisplayValue2, getAllByLabelText: getAllByLabelText2, getAllByPlaceholderText: getAllByPlaceholderText2, getAllByRole: getAllByRole2, getAllByTestId: getAllByTestId2, getAllByText: getAllByText2, getAllByTitle: getAllByTitle2, getByAltText: getByAltText2, getByDisplayValue: getByDisplayValue2, getByLabelText: getByLabelText2, getByPlaceholderText: getByPlaceholderText2, getByRole: getByRole2, getByTestId: getByTestId2, getByText: getByText2, getByTitle: getByTitle2, getConfig: getConfig3, getDefaultNormalizer: getDefaultNormalizer2, getElementError: getElementError2, getNodeText: getNodeText2, getQueriesForElement: getQueriesForElement2, getRoles: getRoles2, getSuggestedQuery: getSuggestedQuery2, isInaccessible: isInaccessible2, logDOM: logDOM2, logRoles: logRoles2, prettyDOM: prettyDOM2, queries: queries2, queryAllByAltText: queryAllByAltText2, queryAllByAttribute: queryAllByAttribute2, queryAllByDisplayValue: queryAllByDisplayValue2, queryAllByLabelText: queryAllByLabelText2, queryAllByPlaceholderText: queryAllByPlaceholderText2, queryAllByRole: queryAllByRole2, queryAllByTestId: queryAllByTestId2, queryAllByText: queryAllByText2, queryAllByTitle: queryAllByTitle2, queryByAltText: queryByAltText2, queryByAttribute: queryByAttribute2, queryByDisplayValue: queryByDisplayValue2, queryByLabelText: queryByLabelText2, queryByPlaceholderText: queryByPlaceholderText2, queryByRole: queryByRole2, queryByTestId: queryByTestId2, queryByText: queryByText2, queryByTitle: queryByTitle2, queryHelpers: queryHelpers2, screen: screen2, waitFor: waitFor2, waitForElementToBeRemoved: waitForElementToBeRemoved2, within, prettyFormat: prettyFormat2 } = testingLibrary;
instrument({ userEvent }, { intercept: true });
instrument({ expect: expect2 }, { getKeys: (obj, depth) => {
  let privateApi = ["assert", "__methods", "__flags", "_obj"];
  if (obj.constructor === Assertion) {
    let keys2 = Object.keys(Object.getPrototypeOf(obj)).filter((it) => !privateApi.includes(it));
    return depth > 2 ? keys2 : [...keys2, "not"];
  }
  return Object.keys(obj);
}, intercept: (method) => method !== "expect" });
var resetAllMocksLoader = ({ parameters: parameters2 }) => {
  var _a2, _b, _c;
  ((_a2 = parameters2 == null ? void 0 : parameters2.test) == null ? void 0 : _a2.mockReset) === true ? resetAllMocks() : ((_b = parameters2 == null ? void 0 : parameters2.test) == null ? void 0 : _b.clearMocks) === true ? clearAllMocks() : ((_c = parameters2 == null ? void 0 : parameters2.test) == null ? void 0 : _c.restoreMocks) !== false && restoreAllMocks();
}, traverseArgs = (value, depth = 0, key) => {
  var _a2;
  if (depth > 5 || value == null) return value;
  if (isMockFunction(value)) return key && value.mockName(key), value;
  if (typeof value == "function" && "isAction" in value && value.isAction && !("implicit" in value && value.implicit)) {
    let mock = fn2(value);
    return key && mock.mockName(key), mock;
  }
  if (Array.isArray(value)) return depth++, value.map((item) => traverseArgs(item, depth));
  if (typeof value == "object" && value.constructor === Object) {
    depth++;
    for (let [k2, v] of Object.entries(value)) ((_a2 = Object.getOwnPropertyDescriptor(value, k2)) == null ? void 0 : _a2.writable) && (value[k2] = traverseArgs(v, depth, k2));
    return value;
  }
  return value;
}, nameSpiesAndWrapActionsInSpies = ({ initialArgs }) => {
  traverseArgs(initialArgs);
}, enhanceContext = (context) => {
  globalThis.HTMLElement && context.canvasElement instanceof globalThis.HTMLElement && (context.canvas = within(context.canvasElement));
};
global$1.__STORYBOOK_TEST_LOADERS__ = [resetAllMocksLoader, nameSpiesAndWrapActionsInSpies, enhanceContext];
global$1.__STORYBOOK_TEST_ON_MOCK_CALL__ = onMockCall;
var { step: runStep } = instrument({ step: (label, play, context) => play(context) }, { intercept: true }), parameters = { throwPlayFunctionExceptions: false };
export {
  parameters,
  runStep
};
