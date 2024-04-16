import { r as reactExports } from "./index-CQCy530F.js";
import "./_commonjsHelpers-LQfde5yM.js";
const component = ({ title, titleId, ...props }) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      id: "Livello_1",
      xmlns: "http://www.w3.org/2000/svg",
      x: 0,
      y: 0,
      viewBox: "0 0 24 24",
      xmlSpace: "preserve",
      enableBackground: "new 0 0 24 24",
      "aria-labelledby": titleId,
      ...props
    },
    title ? /* @__PURE__ */ reactExports.createElement("title", { id: titleId }, title) : null,
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        d: "M18.5 0h-17C.7 0 0 .7 0 1.5v15c0 .8.7 1.5 1.5 1.5h17c.8 0 1.5-.7 1.5-1.5v-15c0-.8-.7-1.5-1.5-1.5zm.5 16.5c0 .3-.2.5-.5.5h-17c-.3 0-.5-.2-.5-.5V5h18v11.5zM19 4H1V1.5c0-.3.2-.5.5-.5h17c.3 0 .5.2.5.5V4z",
        transform: "translate(2 3)"
      }
    ),
    /* @__PURE__ */ reactExports.createElement("path", { d: "M10 13h5v1h-5zM10 11.1l-5.1 3.7v-1.3l3.4-2.4-3.4-2.5V7.4z", transform: "translate(2 3)" }),
    /* @__PURE__ */ reactExports.createElement("path", { className: "st0", d: "m8.3 11.1-3.4 2.4M8.3 11.1 4.9 8.6", transform: "translate(2 3)" })
  );
};
component.__docgenInfo = { "description": "", "methods": [], "displayName": "component", "props": { "title": { "required": false, "tsType": { "name": "string" }, "description": "" }, "titleId": { "required": false, "tsType": { "name": "string" }, "description": "" } } };
export {
  component
};
