import { r as reactExports } from "./index-CQCy530F.js";
import "./_commonjsHelpers-LQfde5yM.js";
const component = ({ title, titleId, ...props }) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-labelledby": titleId,
      ...props
    },
    title ? /* @__PURE__ */ reactExports.createElement("title", { id: titleId }, title) : null,
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M3.567 1.333h16.762a2.286 2.286 0 0 1 2.286 2.286v16.762a2.286 2.286 0 0 1-2.286 2.286H3.567a2.286 2.286 0 0 1-2.286-2.286V3.619a2.286 2.286 0 0 1 2.286-2.286Zm6.322 6.029c-.925 0-1.68-.756-1.68-1.681S8.963 4 9.888 4c.925 0 1.681.756 1.681 1.68v1.682H9.89Zm-4.208 8.43c.925 0 1.68-.756 1.68-1.681V12.43h-1.68c-.925 0-1.681.756-1.681 1.68 0 .926.756 1.681 1.68 1.681Zm4.208-3.362c-.925 0-1.68.756-1.68 1.68v4.21c0 .924.755 1.68 1.68 1.68.925 0 1.681-.756 1.681-1.68v-4.21c0-.924-.756-1.68-1.68-1.68Zm1.681-2.54c0-.926-.756-1.682-1.68-1.682H5.68C4.757 8.208 4 8.964 4 9.89s.756 1.681 1.68 1.681h4.21c.924 0 1.68-.756 1.68-1.68Zm5.069 0c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V9.89Zm-2.528 1.68c.925 0 1.68-.756 1.68-1.68V5.68c0-.924-.755-1.68-1.68-1.68-.925 0-1.681.756-1.681 1.68v4.21c0 .924.756 1.68 1.68 1.68Zm0 5.068c.925 0 1.68.756 1.68 1.681S15.037 20 14.112 20c-.925 0-1.681-.756-1.681-1.68v-1.682h1.68Zm-1.681-2.527c0 .925.756 1.68 1.68 1.68h4.21c.924 0 1.68-.755 1.68-1.68 0-.925-.756-1.681-1.68-1.681h-4.21c-.924 0-1.68.756-1.68 1.68Z"
      }
    )
  );
};
component.__docgenInfo = { "description": "", "methods": [], "displayName": "component", "props": { "title": { "required": false, "tsType": { "name": "string" }, "description": "" }, "titleId": { "required": false, "tsType": { "name": "string" }, "description": "" } } };
export {
  component
};
