import { r as reactExports } from "./index-CQCy530F.js";
import "./_commonjsHelpers-LQfde5yM.js";
const component = ({ title, titleId, ...props }) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      xmlSpace: "preserve",
      enableBackground: "new 0 0 24 24",
      "aria-labelledby": titleId,
      ...props
    },
    title ? /* @__PURE__ */ reactExports.createElement("title", { id: titleId }, title) : null,
    /* @__PURE__ */ reactExports.createElement("path", { d: "M16.3 8.3 12.6 12l3.7 3.6-.7.7-3.7-3.6-3.6 3.6-.7-.7 3.6-3.6-3.6-3.7.7-.7 3.6 3.7 3.7-3.7.7.7zM22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10zm-1 0c0-5-4-9-9-9s-9 4-9 9 4 9 9 9 9-4 9-9z" })
  );
};
component.__docgenInfo = { "description": "", "methods": [], "displayName": "component", "props": { "title": { "required": false, "tsType": { "name": "string" }, "description": "" }, "titleId": { "required": false, "tsType": { "name": "string" }, "description": "" } } };
export {
  component
};
