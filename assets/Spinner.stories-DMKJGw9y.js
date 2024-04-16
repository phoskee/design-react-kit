var _a, _b, _c, _d, _e, _f;
import { R as React } from "./index-CQCy530F.js";
import { c as classNames } from "./index-CpyNLP69.js";
import "./_commonjsHelpers-LQfde5yM.js";
const Spinner = ({
  className,
  tag = "span",
  active = false,
  small = false,
  double = false,
  label = "Caricamento",
  testId,
  ...attributes
}) => {
  const Tag = tag;
  const wrapperClasses = classNames("progress-spinner", {
    "progress-spinner-active": active,
    "size-sm": small,
    "progress-spinner-double": double
  });
  const classes = classNames(className, "visually-hidden");
  if (double) {
    return /* @__PURE__ */ React.createElement(Tag, { className: wrapperClasses, "data-testid": testId }, /* @__PURE__ */ React.createElement("div", { className: "progress-spinner-inner" }), /* @__PURE__ */ React.createElement("div", { className: "progress-spinner-inner" }), /* @__PURE__ */ React.createElement(Tag, { ...attributes, className: classes }, label));
  }
  return /* @__PURE__ */ React.createElement(Tag, { className: wrapperClasses, "data-testid": testId }, /* @__PURE__ */ React.createElement(Tag, { ...attributes, className: classes }, label));
};
Spinner.__docgenInfo = { "description": "", "methods": [], "displayName": "Spinner", "props": { "tag": { "required": false, "tsType": { "name": "ElementType" }, "description": "Utilizzarlo in caso di utilizzo di componenti personalizzati", "defaultValue": { "value": "'span'", "computed": false } }, "className": { "required": false, "tsType": { "name": "string" }, "description": "Classi aggiuntive da usare per il componente Spinner" }, "active": { "required": false, "tsType": { "name": "boolean" }, "description": "Utilizzato per indicare lo stato attivo di caricamento (animato)", "defaultValue": { "value": "false", "computed": false } }, "small": { "required": false, "tsType": { "name": "boolean" }, "description": "Utilizzato per ottenere la versione ridotta del componente Spinner", "defaultValue": { "value": "false", "computed": false } }, "double": { "required": false, "tsType": { "name": "boolean" }, "description": "Utilizzato per ottenere una animazione alternativa in fase di caricamento", "defaultValue": { "value": "false", "computed": false } }, "label": { "required": false, "tsType": { "name": "string" }, "description": "Etichetta con testo da mostrare ai dispositivi screen reader", "defaultValue": { "value": "'Caricamento'", "computed": false } }, "testId": { "required": false, "tsType": { "name": "string" }, "description": "" } }, "composes": ["HTMLAttributes"] };
const meta = {
  title: "Documentazione/Componenti/Spinner",
  component: Spinner,
  parameters: {
    docs: {
      canvas: {
        sourceState: "none"
      }
    }
  }
};
const Esempio = () => /* @__PURE__ */ React.createElement("div", {
  className: "container"
}, /* @__PURE__ */ React.createElement("div", {
  className: "row"
}, /* @__PURE__ */ React.createElement("div", {
  className: "col-6 col-lg-3"
}, /* @__PURE__ */ React.createElement("p", {
  className: "mb-3"
}, /* @__PURE__ */ React.createElement("strong", null, "Spinner standard")), /* @__PURE__ */ React.createElement(Spinner, null)), /* @__PURE__ */ React.createElement("div", {
  className: "col-6 col-lg-3"
}, /* @__PURE__ */ React.createElement("p", {
  className: "mb-3"
}, /* @__PURE__ */ React.createElement("strong", null, "Spinner Attivo")), /* @__PURE__ */ React.createElement(Spinner, {
  active: true
})), /* @__PURE__ */ React.createElement("div", {
  className: "col-6 col-lg-3 mt-3 mt-lg-0"
}, /* @__PURE__ */ React.createElement("p", {
  className: "mb-3"
}, /* @__PURE__ */ React.createElement("strong", null, "Small")), /* @__PURE__ */ React.createElement(Spinner, {
  small: true
})), /* @__PURE__ */ React.createElement("div", {
  className: "col-6 col-lg-3 mt-3 mt-lg-0"
}, /* @__PURE__ */ React.createElement("p", {
  className: "mb-3"
}, /* @__PURE__ */ React.createElement("strong", null, "Small attivo")), /* @__PURE__ */ React.createElement(Spinner, {
  small: true,
  active: true
}))));
const SpinnerDoppio = () => /* @__PURE__ */ React.createElement("div", {
  className: "container"
}, /* @__PURE__ */ React.createElement("div", {
  className: "row"
}, /* @__PURE__ */ React.createElement("div", {
  className: "col-6 col-lg-3"
}, /* @__PURE__ */ React.createElement("p", {
  className: "mb-3"
}, /* @__PURE__ */ React.createElement("strong", null, "Spinner doppio")), /* @__PURE__ */ React.createElement(Spinner, {
  double: true
})), /* @__PURE__ */ React.createElement("div", {
  className: "col-6 col-lg-3"
}, /* @__PURE__ */ React.createElement("p", {
  className: "mb-3"
}, /* @__PURE__ */ React.createElement("strong", null, "Doppio attivo")), /* @__PURE__ */ React.createElement(Spinner, {
  double: true,
  active: true
})), /* @__PURE__ */ React.createElement("div", {
  className: "col-6 col-lg-3 mt-3 mt-lg-0"
}, /* @__PURE__ */ React.createElement("p", {
  className: "mb-3"
}, /* @__PURE__ */ React.createElement("strong", null, "Doppio small")), /* @__PURE__ */ React.createElement(Spinner, {
  double: true,
  small: true
})), /* @__PURE__ */ React.createElement("div", {
  className: "col-6 col-lg-3 mt-3 mt-lg-0"
}, /* @__PURE__ */ React.createElement("p", {
  className: "mb-3"
}, /* @__PURE__ */ React.createElement("strong", null, "Doppio small attivo")), /* @__PURE__ */ React.createElement(Spinner, {
  double: true,
  small: true,
  active: true
}))));
Esempio.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "Esempio"
};
SpinnerDoppio.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "SpinnerDoppio"
};
Esempio.parameters = {
  ...Esempio.parameters,
  docs: {
    ...(_a = Esempio.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '() => <div className="container">\n        <div className="row">\n            <div className="col-6 col-lg-3">\n                <p className="mb-3">\n                    <strong>Spinner standard</strong>\n                </p>\n                <Spinner />\n            </div>\n            <div className="col-6 col-lg-3">\n                <p className="mb-3">\n                    <strong>Spinner Attivo</strong>\n                </p>\n                <Spinner active />\n            </div>\n            <div className="col-6 col-lg-3 mt-3 mt-lg-0">\n                <p className="mb-3">\n                    <strong>Small</strong>\n                </p>\n                <Spinner small />\n            </div>\n            <div className="col-6 col-lg-3 mt-3 mt-lg-0">\n                <p className="mb-3">\n                    <strong>Small attivo</strong>\n                </p>\n                <Spinner small active />\n            </div>\n        </div>\n    </div>',
      ...(_c = (_b = Esempio.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
SpinnerDoppio.parameters = {
  ...SpinnerDoppio.parameters,
  docs: {
    ...(_d = SpinnerDoppio.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: '() => <div className="container">\n        <div className="row">\n            <div className="col-6 col-lg-3">\n                <p className="mb-3">\n                    <strong>Spinner doppio</strong>\n                </p>\n                <Spinner double />\n            </div>\n            <div className="col-6 col-lg-3">\n                <p className="mb-3">\n                    <strong>Doppio attivo</strong>\n                </p>\n                <Spinner double active />\n            </div>\n            <div className="col-6 col-lg-3 mt-3 mt-lg-0">\n                <p className="mb-3">\n                    <strong>Doppio small</strong>\n                </p>\n                <Spinner double small />\n            </div>\n            <div className="col-6 col-lg-3 mt-3 mt-lg-0">\n                <p className="mb-3">\n                    <strong>Doppio small attivo</strong>\n                </p>\n                <Spinner double small active />\n            </div>\n        </div>\n    </div>',
      ...(_f = (_e = SpinnerDoppio.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
const __namedExportsOrder = ["Esempio", "SpinnerDoppio"];
export {
  Esempio,
  SpinnerDoppio,
  __namedExportsOrder,
  meta as default
};