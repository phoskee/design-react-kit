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
    /* @__PURE__ */ reactExports.createElement("path", { d: "M5 3h.2M20 11.6C20 7.4 16.6 4 12.5 4h-.1c-.3 0-.5.2-.5.5s.2.5.5.5C16 5 19 8 19 11.6c0 .3.3.5.5.5.3 0 .5-.2.5-.5z" }),
    /* @__PURE__ */ reactExports.createElement("path", { d: "M16.9 11.7c0-2.5-2-4.5-4.5-4.5-.3.1-.5.3-.4.6 0 .2.2.4.4.4 1.9 0 3.5 1.6 3.5 3.5 0 .3.2.5.5.5s.5-.2.5-.5zM15.7 21.2C8.6 20.9 3 15.2 2.9 8.1c0-.4.2-.8.6-.9 1.7-.6 4-1 4.7.1.5.9.8 1.9.9 2.9v.2c.2.7-.1 1.3-.7 1.7-.3.1-.5.4-.5.7.9 1.4 2 2.6 3.4 3.5.2-.1.4-.3.5-.6.1-.5.6-1 1.7-.9h.2c1 .1 2 .4 2.8.9 1 .7.6 3 .1 4.7-.1.5-.5.8-.9.8zM6.6 7.5c-.9 0-1.9.2-2.8.5.1 6.6 5.3 12 11.9 12.2.7-2.3.7-3.5.3-3.8-.8-.4-1.6-.6-2.5-.7h-.2c-.3 0-.6 0-.7.1-.2.6-.6 1.1-1.3 1.3l-.2.1H11c-1.6-1-2.9-2.4-3.9-4L7 13c-.1-.7.3-1.4 1-1.7.1-.1.3-.2.3-.8v-.2c-.1-.9-.4-1.7-.7-2.5-.3-.2-.6-.3-1-.3z" })
  );
};
component.__docgenInfo = { "description": "", "methods": [], "displayName": "component", "props": { "title": { "required": false, "tsType": { "name": "string" }, "description": "" }, "titleId": { "required": false, "tsType": { "name": "string" }, "description": "" } } };
export {
  component
};
