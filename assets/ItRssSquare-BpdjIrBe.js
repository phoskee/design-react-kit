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
    /* @__PURE__ */ reactExports.createElement("path", { d: "M17.6 3H6.4C4.5 3 3 4.5 3 6.4v11.2C3 19.5 4.5 21 6.4 21h11.3c1.9 0 3.4-1.5 3.4-3.4V6.4C21 4.5 19.5 3 17.6 3zM7.5 18.8c-1.2 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1.1 2.3-2.3 2.3zm4.5 0C12 15 9 12 5.3 12V9.8c5 0 9 4 9 9H12zm4.5 0c0-6.2-5-11.3-11.3-11.3V5.3c7.5 0 13.5 6 13.5 13.5h-2.2z" })
  );
};
component.__docgenInfo = { "description": "", "methods": [], "displayName": "component", "props": { "title": { "required": false, "tsType": { "name": "string" }, "description": "" }, "titleId": { "required": false, "tsType": { "name": "string" }, "description": "" } } };
export {
  component
};
