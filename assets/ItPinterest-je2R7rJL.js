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
    /* @__PURE__ */ reactExports.createElement("path", { d: "M12 3a9 9 0 0 0-3.28 17.384c-.079-.712-.15-1.808.031-2.585.164-.702 1.056-4.473 1.056-4.473s-.27-.54-.27-1.337c0-1.251.726-2.185 1.629-2.185.768 0 1.139.576 1.139 1.267 0 .773-.492 1.927-.746 2.997-.212.896.45 1.626 1.333 1.626 1.6 0 2.83-1.686 2.83-4.121 0-2.155-1.55-3.662-3.76-3.662-2.56 0-4.064 1.921-4.064 3.906 0 .774.298 1.603.67 2.054.073.09.084.167.062.258-.068.284-.22.896-.25 1.02-.039.166-.13.2-.3.121-1.125-.523-1.827-2.166-1.827-3.486 0-2.84 2.062-5.447 5.946-5.447 3.122 0 5.548 2.225 5.548 5.198 0 3.102-1.955 5.598-4.67 5.598-.912 0-1.769-.474-2.063-1.033l-.56 2.14c-.203.781-.752 1.76-1.119 2.359.842.26 1.737.401 2.665.401a9 9 0 1 0 0-18Z" })
  );
};
component.__docgenInfo = { "description": "", "methods": [], "displayName": "component", "props": { "title": { "required": false, "tsType": { "name": "string" }, "description": "" }, "titleId": { "required": false, "tsType": { "name": "string" }, "description": "" } } };
export {
  component
};
