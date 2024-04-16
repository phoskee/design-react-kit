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
    /* @__PURE__ */ reactExports.createElement("path", { d: "M18.5 4h-13C4.7 4 4 4.7 4 5.5v13c0 .8.7 1.5 1.5 1.5h10.2l4.3-4.3V5.5c0-.8-.7-1.5-1.5-1.5zM5 18.5v-13c0-.3.2-.5.5-.5h13c.3 0 .5.2.5.5V15h-2.5c-.8 0-1.5.7-1.5 1.5V19H5.5c-.3 0-.5-.2-.5-.5zM18.3 16 16 18.3v-1.8c0-.3.2-.5.5-.5h1.8zM16 9H8V8h8v1zm0 2H8v-1h8v1zm-2 1v1H8v-1h6z" })
  );
};
component.__docgenInfo = { "description": "", "methods": [], "displayName": "component", "props": { "title": { "required": false, "tsType": { "name": "string" }, "description": "" }, "titleId": { "required": false, "tsType": { "name": "string" }, "description": "" } } };
export {
  component
};
