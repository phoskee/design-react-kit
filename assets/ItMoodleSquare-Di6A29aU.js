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
    /* @__PURE__ */ reactExports.createElement("path", { fill: "#fff", d: "M0 0h24v24H0z" }),
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M3.566 1.33h16.761a2.286 2.286 0 0 1 2.286 2.286v16.762a2.286 2.286 0 0 1-2.286 2.285H3.565a2.286 2.286 0 0 1-2.285-2.285V3.616A2.286 2.286 0 0 1 3.565 1.33Zm4.767 5.444 6.222-.444-4.889 3.556H4.778v4.122c.258.273.444.979.444 1.655 0 .86-.299 1.334-.667 1.334-.368 0-.666-.697-.666-1.556 0-.676.186-1.246.444-1.46V9.886H3l5.333-3.112ZM9.89 10.33l2.222-1.778.045.049c.22.233.4.424.4.84l-.09.072c-.034.025-.063.047-.117.097-1.025.92-1.747 1.932-2.007 2.72-1.277-1.057-3.627-.912-3.96-.892l-.036.002a3.337 3.337 0 0 1-.068-.674c0-.18.007-.213.031-.323l.024-.113H9.89Zm3.333-.302a3.977 3.977 0 0 1 2.667-1.031h.444c2.2 0 4 1.8 4 4v5.333h-2.666v-5.111c0-.856-.7-1.556-1.556-1.556-.856 0-1.556.7-1.556 1.556v5.111H11.89v-5.111c0-.627-.38-1.163-.918-1.407.366-.63.933-1.324 1.655-1.972l.113-.098.052-.045c.15.102.296.21.431.33Zm-7.111 2.969c0-.466.087-.91.235-1.327 1.129.026 2.13.23 2.814.546-.234.271-.382.618-.382 1.003v5.111H6.11v-5.333Z",
        fill: "#1E1E1E"
      }
    )
  );
};
component.__docgenInfo = { "description": "", "methods": [], "displayName": "component", "props": { "title": { "required": false, "tsType": { "name": "string" }, "description": "" }, "titleId": { "required": false, "tsType": { "name": "string" }, "description": "" } } };
export {
  component
};
