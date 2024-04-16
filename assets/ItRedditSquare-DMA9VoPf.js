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
        clipRule: "evenodd",
        d: "M3.567 1.333h16.762a2.286 2.286 0 0 1 2.286 2.286v16.762a2.286 2.286 0 0 1-2.286 2.286H3.567a2.286 2.286 0 0 1-2.286-2.286V3.619a2.286 2.286 0 0 1 2.286-2.286ZM12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.36-8.84c.21-.2.497-.325.812-.325.64 0 1.165.516 1.165 1.165 0 .477-.287.888-.688 1.07.02.114.029.238.029.352 0 1.805-2.09 3.256-4.668 3.256-2.578 0-4.669-1.46-4.669-3.256 0-.124.01-.238.029-.353a1.162 1.162 0 0 1 .477-2.224c.315 0 .602.124.812.324.811-.582 1.928-.954 3.17-.992l.591-2.788a.186.186 0 0 1 .086-.134c.038-.028.095-.038.153-.028l1.938.41a.83.83 0 1 1 .744 1.194.83.83 0 0 1-.83-.793l-1.738-.372-.534 2.501c1.222.048 2.32.42 3.121.993Zm-6.023 1.67a.831.831 0 1 1 .83.831.825.825 0 0 1-.83-.83Zm4.649 2.206c-.573.573-1.661.61-1.976.61-.325 0-1.413-.047-1.976-.61a.213.213 0 0 1 0-.306.213.213 0 0 1 .305 0c.363.363 1.126.487 1.67.487.545 0 1.318-.124 1.671-.487a.213.213 0 0 1 .306 0 .232.232 0 0 1 0 .306Zm-.984-2.196c0 .458.373.83.831.83.458 0 .83-.381.83-.83a.831.831 0 0 0-1.66 0Z"
      }
    )
  );
};
component.__docgenInfo = { "description": "", "methods": [], "displayName": "component", "props": { "title": { "required": false, "tsType": { "name": "string" }, "description": "" }, "titleId": { "required": false, "tsType": { "name": "string" }, "description": "" } } };
export {
  component
};
