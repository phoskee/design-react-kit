import { R as React } from "./index-CQCy530F.js";
import { c as classNames } from "./index-CpyNLP69.js";
const CalloutTitle = ({ children, className, tag = "div", testId, ...attributes }) => {
  const Tag = tag;
  const classes = classNames(className, "callout-title");
  return /* @__PURE__ */ React.createElement(Tag, { className: classes, ...attributes, "data-testid": testId }, children);
};
CalloutTitle.__docgenInfo = { "description": "", "methods": [], "displayName": "CalloutTitle", "props": { "className": { "required": false, "tsType": { "name": "string" }, "description": "Classi aggiuntive per il componente" }, "tag": { "required": false, "tsType": { "name": "ElementType" }, "description": 'Permette personalizzare il tag utilizzato per il contenitore del titolo (diverso da "div"). Accetta sia tag HTML che componenti React.', "defaultValue": { "value": "'div'", "computed": false } }, "testId": { "required": false, "tsType": { "name": "string" }, "description": "" } }, "composes": ["HTMLAttributes"] };
export {
  CalloutTitle as C
};
