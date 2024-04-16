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
    /* @__PURE__ */ reactExports.createElement("path", { d: "M22 19h-1c0-8.8-7.2-16-16-16V2c9.4 0 17 7.6 17 17z" }),
    /* @__PURE__ */ reactExports.createElement("path", { d: "M5 7v1c6.1 0 11 4.9 11 11h1c0-6.6-5.4-12-12-12zM5 12v1c3.3 0 6 2.7 6 6h1c0-3.9-3.1-7-7-7zM5 17c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" })
  );
};
component.__docgenInfo = { "description": "", "methods": [], "displayName": "component", "props": { "title": { "required": false, "tsType": { "name": "string" }, "description": "" }, "titleId": { "required": false, "tsType": { "name": "string" }, "description": "" } } };
export {
  component
};