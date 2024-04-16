var _a, _b, _c, _d, _e, _f;
import { R as React } from "./index-CQCy530F.js";
import { A as AvatarIcon } from "./AvatarIcon-BtWd5PRe.js";
import { A as AvatarContainer, a as AvatarWrapper } from "./AvatarWrapper-11RnJjLL.js";
import { c as classNames } from "./index-CpyNLP69.js";
import { I as Icon } from "./Icon-CYxksTIN.js";
const AvatarPresence = ({
  className,
  tag = "div",
  presence,
  testId,
  ...attributes
}) => {
  const Tag = tag;
  const typeClass = classNames("avatar-presence", {
    presence
  });
  return /* @__PURE__ */ React.createElement(Tag, { ...attributes, className: typeClass, "data-testid": testId });
};
AvatarPresence.__docgenInfo = { "description": "", "methods": [], "displayName": "AvatarPresence", "props": { "tag": { "required": false, "tsType": { "name": "ElementType" }, "description": "Utilizzarlo in caso di utilizzo di componenti personalizzati", "defaultValue": { "value": "'div'", "computed": false } }, "className": { "required": false, "tsType": { "name": "string" }, "description": "Classi aggiuntive da usare per il componente AvatarPresence" }, "presence": { "required": true, "tsType": { "name": "union", "raw": "'active' | 'busy' | 'hidden' | string", "elements": [{ "name": "literal", "value": "'active'" }, { "name": "literal", "value": "'busy'" }, { "name": "literal", "value": "'hidden'" }, { "name": "string" }] }, "description": "Utilizzare questo attributo per indicare il tipo di presenza dell'utente." }, "testId": { "required": false, "tsType": { "name": "string" }, "description": "" } }, "composes": ["HTMLAttributes"] };
const AvatarStatus = ({ className, tag = "div", status, testId, ...attributes }) => {
  const Tag = tag;
  const typeClass = classNames("avatar-status", {
    status
  });
  return /* @__PURE__ */ React.createElement(Tag, { ...attributes, className: typeClass, "data-testid": testId });
};
AvatarStatus.__docgenInfo = { "description": "", "methods": [], "displayName": "AvatarStatus", "props": { "tag": { "required": false, "tsType": { "name": "ElementType" }, "description": "Utilizzarlo in caso di utilizzo di componenti personalizzati", "defaultValue": { "value": "'div'", "computed": false } }, "className": { "required": false, "tsType": { "name": "string" }, "description": "Classi aggiuntive da usare per il componente AvatarStatus" }, "status": { "required": true, "tsType": { "name": "union", "raw": "'approved' | 'declined' | 'notify' | string", "elements": [{ "name": "literal", "value": "'approved'" }, { "name": "literal", "value": "'declined'" }, { "name": "literal", "value": "'notify'" }, { "name": "string" }] }, "description": "Utilizzare questo attributo per indicare il tipo di stato dell'utente." }, "testId": { "required": false, "tsType": { "name": "string" }, "description": "" } }, "composes": ["HTMLAttributes"] };
const meta = {
  title: "Documentazione/Componenti/Avatar/Behavior",
  component: AvatarIcon
};
const UserPresence = {
  render: () => /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AvatarContainer, null, /* @__PURE__ */ React.createElement(AvatarWrapper, null, /* @__PURE__ */ React.createElement(AvatarIcon, {
    size: "xl"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://randomuser.me/api/portraits/men/43.jpg",
    alt: "Mario Rossi"
  }), /* @__PURE__ */ React.createElement(AvatarPresence, {
    presence: "active"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "visually-hidden"
  }, "Presenza:attivo")))), /* @__PURE__ */ React.createElement(AvatarWrapper, null, /* @__PURE__ */ React.createElement(AvatarIcon, {
    size: "xl"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://randomuser.me/api/portraits/women/41.jpg",
    alt: "Luisa Neri"
  }), /* @__PURE__ */ React.createElement(AvatarPresence, {
    presence: "busy"
  }, /* @__PURE__ */ React.createElement(Icon, {
    color: "white",
    icon: "it-minus"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "visually-hidden"
  }, "Presenza: non disponibile")))), /* @__PURE__ */ React.createElement(AvatarWrapper, null, /* @__PURE__ */ React.createElement(AvatarIcon, {
    size: "xl"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://randomuser.me/api/portraits/men/33.jpg",
    alt: "Gioacchino Romani"
  }), /* @__PURE__ */ React.createElement(AvatarPresence, {
    presence: "hidden"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "visually-hidden"
  }, "Presenza: invisible"))))), /* @__PURE__ */ React.createElement(AvatarContainer, null, /* @__PURE__ */ React.createElement(AvatarWrapper, null, /* @__PURE__ */ React.createElement(AvatarIcon, {
    size: "md"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://randomuser.me/api/portraits/women/32.jpg",
    alt: "Ludovica Galli"
  }), /* @__PURE__ */ React.createElement(AvatarPresence, {
    presence: "busy"
  }, /* @__PURE__ */ React.createElement(Icon, {
    color: "white",
    icon: "it-minus"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "visually-hidden"
  }, "Presenza: non disponibile")))), /* @__PURE__ */ React.createElement(AvatarWrapper, null, /* @__PURE__ */ React.createElement(AvatarIcon, {
    size: "lg"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://randomuser.me/api/portraits/women/32.jpg",
    alt: "Ludovica Galli"
  }), /* @__PURE__ */ React.createElement(AvatarPresence, {
    presence: "busy"
  }, /* @__PURE__ */ React.createElement(Icon, {
    color: "white",
    icon: "it-minus"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "visually-hidden"
  }, "Presenza: non disponibile")))), /* @__PURE__ */ React.createElement(AvatarWrapper, null, /* @__PURE__ */ React.createElement(AvatarIcon, {
    size: "xl"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://randomuser.me/api/portraits/women/32.jpg",
    alt: "Ludovica Galli"
  }), /* @__PURE__ */ React.createElement(AvatarPresence, {
    presence: "busy"
  }, /* @__PURE__ */ React.createElement(Icon, {
    color: "white",
    icon: "it-minus"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "visually-hidden"
  }, "Presenza: non disponibile")))), /* @__PURE__ */ React.createElement(AvatarWrapper, null, /* @__PURE__ */ React.createElement(AvatarIcon, {
    size: "xxl"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://randomuser.me/api/portraits/women/32.jpg",
    alt: "Ludovica Galli"
  }), /* @__PURE__ */ React.createElement(AvatarPresence, {
    presence: "busy"
  }, /* @__PURE__ */ React.createElement(Icon, {
    color: "white",
    icon: "it-minus"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "visually-hidden"
  }, "Presenza: non disponibile"))))))
};
const UserStatus = {
  render: () => /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AvatarContainer, null, /* @__PURE__ */ React.createElement(AvatarWrapper, null, /* @__PURE__ */ React.createElement(AvatarIcon, {
    size: "xl"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://randomuser.me/api/portraits/men/43.jpg",
    alt: "Mario Rossi"
  }), /* @__PURE__ */ React.createElement(AvatarStatus, {
    status: "approved"
  }, /* @__PURE__ */ React.createElement(Icon, {
    color: "white",
    icon: "it-check"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "visually-hidden"
  }, "Stato: approvato")))), /* @__PURE__ */ React.createElement(AvatarWrapper, null, /* @__PURE__ */ React.createElement(AvatarIcon, {
    size: "xl"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://randomuser.me/api/portraits/women/41.jpg",
    alt: "Luisa Neri"
  }), /* @__PURE__ */ React.createElement(AvatarStatus, {
    status: "declined"
  }, /* @__PURE__ */ React.createElement(Icon, {
    color: "white",
    icon: "it-close"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "visually-hidden"
  }, "Stato: respinto")))), /* @__PURE__ */ React.createElement(AvatarWrapper, null, /* @__PURE__ */ React.createElement(AvatarIcon, {
    size: "xl"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://randomuser.me/api/portraits/men/33.jpg",
    alt: "Gioacchino Romani"
  }), /* @__PURE__ */ React.createElement(AvatarStatus, {
    status: "notify"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "visually-hidden"
  }, "Testa notifica"))))), /* @__PURE__ */ React.createElement(AvatarContainer, null, /* @__PURE__ */ React.createElement(AvatarWrapper, null, /* @__PURE__ */ React.createElement(AvatarIcon, {
    size: "md"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://randomuser.me/api/portraits/women/32.jpg",
    alt: "Ludovica Galli"
  }), /* @__PURE__ */ React.createElement(AvatarStatus, {
    status: "approved"
  }, /* @__PURE__ */ React.createElement(Icon, {
    color: "white",
    icon: "it-check"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "visually-hidden"
  }, "Stato: approvato")))), /* @__PURE__ */ React.createElement(AvatarWrapper, null, /* @__PURE__ */ React.createElement(AvatarIcon, {
    size: "lg"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://randomuser.me/api/portraits/women/32.jpg",
    alt: "Ludovica Galli"
  }), /* @__PURE__ */ React.createElement(AvatarStatus, {
    status: "declined"
  }, /* @__PURE__ */ React.createElement(Icon, {
    color: "white",
    icon: "it-close"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "visually-hidden"
  }, "Stato: respinto")))), /* @__PURE__ */ React.createElement(AvatarWrapper, null, /* @__PURE__ */ React.createElement(AvatarIcon, {
    size: "xl"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://randomuser.me/api/portraits/women/32.jpg",
    alt: "Ludovica Galli"
  }), /* @__PURE__ */ React.createElement(AvatarStatus, {
    status: "approved"
  }, /* @__PURE__ */ React.createElement(Icon, {
    color: "white",
    icon: "it-check"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "visually-hidden"
  }, "Stato: approvato")))), /* @__PURE__ */ React.createElement(AvatarWrapper, null, /* @__PURE__ */ React.createElement(AvatarIcon, {
    size: "xxl"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://randomuser.me/api/portraits/women/32.jpg",
    alt: "Ludovica Galli"
  }), /* @__PURE__ */ React.createElement(AvatarStatus, {
    status: "declined"
  }, /* @__PURE__ */ React.createElement(Icon, {
    color: "white",
    icon: "it-close"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "visually-hidden"
  }, "Stato: approvato"))))))
};
UserPresence.parameters = {
  ...UserPresence.parameters,
  docs: {
    ...(_a = UserPresence.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  render: () => <div>\n            <AvatarContainer>\n                <AvatarWrapper>\n                    <AvatarIcon size="xl">\n                        <img src="https://randomuser.me/api/portraits/men/43.jpg" alt="Mario Rossi" />\n                        <AvatarPresence presence="active">\n                            <span className="visually-hidden">Presenza:attivo</span>\n                        </AvatarPresence>\n                    </AvatarIcon>\n                </AvatarWrapper>\n                <AvatarWrapper>\n                    <AvatarIcon size="xl">\n                        <img src="https://randomuser.me/api/portraits/women/41.jpg" alt="Luisa Neri" />\n                        <AvatarPresence presence="busy">\n                            <Icon color="white" icon="it-minus" />\n                            <span className="visually-hidden">Presenza: non disponibile</span>\n                        </AvatarPresence>\n                    </AvatarIcon>\n                </AvatarWrapper>\n                <AvatarWrapper>\n                    <AvatarIcon size="xl">\n                        <img src="https://randomuser.me/api/portraits/men/33.jpg" alt="Gioacchino Romani" />\n                        <AvatarPresence presence="hidden">\n                            <span className="visually-hidden">Presenza: invisible</span>\n                        </AvatarPresence>\n                    </AvatarIcon>\n                </AvatarWrapper>\n            </AvatarContainer>\n            <AvatarContainer>\n                <AvatarWrapper>\n                    <AvatarIcon size="md">\n                        <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Ludovica Galli" />\n                        <AvatarPresence presence="busy">\n                            <Icon color="white" icon="it-minus" />\n                            <span className="visually-hidden">Presenza: non disponibile</span>\n                        </AvatarPresence>\n                    </AvatarIcon>\n                </AvatarWrapper>\n                <AvatarWrapper>\n                    <AvatarIcon size="lg">\n                        <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Ludovica Galli" />\n                        <AvatarPresence presence="busy">\n                            <Icon color="white" icon="it-minus" />\n                            <span className="visually-hidden">Presenza: non disponibile</span>\n                        </AvatarPresence>\n                    </AvatarIcon>\n                </AvatarWrapper>\n                <AvatarWrapper>\n                    <AvatarIcon size="xl">\n                        <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Ludovica Galli" />\n                        <AvatarPresence presence="busy">\n                            <Icon color="white" icon="it-minus" />\n                            <span className="visually-hidden">Presenza: non disponibile</span>\n                        </AvatarPresence>\n                    </AvatarIcon>\n                </AvatarWrapper>\n                <AvatarWrapper>\n                    <AvatarIcon size="xxl">\n                        <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Ludovica Galli" />\n                        <AvatarPresence presence="busy">\n                            <Icon color="white" icon="it-minus" />\n                            <span className="visually-hidden">Presenza: non disponibile</span>\n                        </AvatarPresence>\n                    </AvatarIcon>\n                </AvatarWrapper>\n            </AvatarContainer>\n        </div>\n}',
      ...(_c = (_b = UserPresence.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
UserStatus.parameters = {
  ...UserStatus.parameters,
  docs: {
    ...(_d = UserStatus.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: '{\n  render: () => <div>\n            <AvatarContainer>\n                <AvatarWrapper>\n                    <AvatarIcon size="xl">\n                        <img src="https://randomuser.me/api/portraits/men/43.jpg" alt="Mario Rossi" />\n                        <AvatarStatus status="approved">\n                            <Icon color="white" icon="it-check" />\n                            <span className="visually-hidden">Stato: approvato</span>\n                        </AvatarStatus>\n                    </AvatarIcon>\n                </AvatarWrapper>\n                <AvatarWrapper>\n                    <AvatarIcon size="xl">\n                        <img src="https://randomuser.me/api/portraits/women/41.jpg" alt="Luisa Neri" />\n                        <AvatarStatus status="declined">\n                            <Icon color="white" icon="it-close" />\n                            <span className="visually-hidden">Stato: respinto</span>\n                        </AvatarStatus>\n                    </AvatarIcon>\n                </AvatarWrapper>\n                <AvatarWrapper>\n                    <AvatarIcon size="xl">\n                        <img src="https://randomuser.me/api/portraits/men/33.jpg" alt="Gioacchino Romani" />\n                        <AvatarStatus status="notify">\n                            <span className="visually-hidden">Testa notifica</span>\n                        </AvatarStatus>\n                    </AvatarIcon>\n                </AvatarWrapper>\n            </AvatarContainer>\n            <AvatarContainer>\n                <AvatarWrapper>\n                    <AvatarIcon size="md">\n                        <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Ludovica Galli" />\n                        <AvatarStatus status="approved">\n                            <Icon color="white" icon="it-check" />\n                            <span className="visually-hidden">Stato: approvato</span>\n                        </AvatarStatus>\n                    </AvatarIcon>\n                </AvatarWrapper>\n                <AvatarWrapper>\n                    <AvatarIcon size="lg">\n                        <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Ludovica Galli" />\n                        <AvatarStatus status="declined">\n                            <Icon color="white" icon="it-close" />\n                            <span className="visually-hidden">Stato: respinto</span>\n                        </AvatarStatus>\n                    </AvatarIcon>\n                </AvatarWrapper>\n                <AvatarWrapper>\n                    <AvatarIcon size="xl">\n                        <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Ludovica Galli" />\n                        <AvatarStatus status="approved">\n                            <Icon color="white" icon="it-check" />\n                            <span className="visually-hidden">Stato: approvato</span>\n                        </AvatarStatus>\n                    </AvatarIcon>\n                </AvatarWrapper>\n                <AvatarWrapper>\n                    <AvatarIcon size="xxl">\n                        <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Ludovica Galli" />\n                        <AvatarStatus status="declined">\n                            <Icon color="white" icon="it-close" />\n                            <span className="visually-hidden">Stato: approvato</span>\n                        </AvatarStatus>\n                    </AvatarIcon>\n                </AvatarWrapper>\n            </AvatarContainer>\n        </div>\n}',
      ...(_f = (_e = UserStatus.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
const __namedExportsOrder = ["UserPresence", "UserStatus"];
const AvatarBehaviour_stories = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UserPresence,
  UserStatus,
  __namedExportsOrder,
  default: meta
}, Symbol.toStringTag, { value: "Module" }));
export {
  AvatarPresence as A,
  UserPresence as U,
  UserStatus as a,
  AvatarStatus as b,
  AvatarBehaviour_stories as c
};
