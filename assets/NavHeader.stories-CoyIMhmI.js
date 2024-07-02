var _a, _b, _c, _d, _e, _f;
import { R as React } from "./index-C-_iGYWo.js";
import { H as Header, a as HeaderContent } from "./HeaderContent-Djr8e9Go.js";
import { H as HeaderToggler } from "./HeaderToggler-CyWekLcj.js";
import { I as Icon } from "./Icon-DRwA3K3x.js";
import { C as Collapse } from "./Collapse-CD6v73sX.js";
import { N as Nav } from "./Nav-SUKqi6BQ.js";
import { N as NavItem, a as NavLink } from "./NavLink-DiRF8l1-.js";
import { R as Row, C as Col } from "./Col-CM3Y6KlU.js";
import { D as Dropdown, a as DropdownToggle } from "./DropdownToggle-Q9uiB2YI.js";
import { D as DropdownMenu } from "./DropdownMenu-BQNQz3tb.js";
import { L as LinkList, a as LinkListItem } from "./LinkListItem-BcZlcF5e.js";
import { M as MegamenuItem, a as MegamenuHighlightColumn } from "./MegamenuItem-DLScprp5.js";
import "./_commonjsHelpers-CcAunmGO.js";
import "./index-xoeSAV6i.js";
import "./Container-DhalTljb.js";
import "./index-C6XlOQIa.js";
import "./utils-BFoSoHid.js";
import "./Navbar-BzESDADg.js";
import "./NavbarToggler-CffHox6a.js";
import "./iframe-MlAXxqxI.js";
import "../sb-preview/runtime.js";
import "./Transition-QUIZHUz2.js";
import "./inheritsLoose-DBHupcN5.js";
import "./index-ClxGM1EF.js";
import "./DropdownToggle-D1um2tsY.js";
import "./Popper-Nje4Jlb9.js";
import "./Button-MsrGxmE9.js";
const meta = {
  title: "Documentazione/Menu di navigazione/Header/Nav",
  component: Header
};
const NavHeader = {
  render: ({
    theme,
    isOpen
  }) => {
    return /* @__PURE__ */ React.createElement(Header, {
      type: "navbar",
      theme
    }, /* @__PURE__ */ React.createElement(HeaderContent, {
      expand: "lg",
      megamenu: true
    }, /* @__PURE__ */ React.createElement(HeaderToggler, {
      onClick: () => {
      },
      "aria-controls": "nav1",
      "aria-expanded": "false",
      "aria-label": "Toggle navigation"
    }, /* @__PURE__ */ React.createElement(Icon, {
      icon: "it-burger"
    })), /* @__PURE__ */ React.createElement(Collapse, {
      navbar: true,
      header: true,
      isOpen,
      onOverlayClick: () => {
      }
    }, /* @__PURE__ */ React.createElement("div", {
      className: "menu-wrapper"
    }, /* @__PURE__ */ React.createElement(Nav, {
      navbar: true
    }, /* @__PURE__ */ React.createElement(NavItem, {
      active: true
    }, /* @__PURE__ */ React.createElement(NavLink, {
      href: "#",
      active: true
    }, /* @__PURE__ */ React.createElement("span", null, "link 1 active "), /* @__PURE__ */ React.createElement("span", {
      className: "visually-hidden"
    }, "current"))), /* @__PURE__ */ React.createElement(NavItem, null, /* @__PURE__ */ React.createElement(NavLink, {
      href: "#",
      disabled: true
    }, "Link 2")), /* @__PURE__ */ React.createElement(NavItem, null, /* @__PURE__ */ React.createElement(NavLink, {
      href: "#"
    }, "Link 3")), /* @__PURE__ */ React.createElement(NavItem, null, /* @__PURE__ */ React.createElement(NavLink, {
      href: "#"
    }, "Link 4")), /* @__PURE__ */ React.createElement(Dropdown, {
      tag: "li",
      inNavbar: true,
      theme
    }, /* @__PURE__ */ React.createElement(DropdownToggle, {
      inNavbar: true,
      caret: true
    }, /* @__PURE__ */ React.createElement("span", null, "Dropdown Menu")), /* @__PURE__ */ React.createElement(DropdownMenu, null, /* @__PURE__ */ React.createElement(LinkList, null, /* @__PURE__ */ React.createElement(LinkListItem, {
      inDropdown: true,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", null, "Link list 1")), /* @__PURE__ */ React.createElement(LinkListItem, {
      inDropdown: true,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", null, "Link list 2")), /* @__PURE__ */ React.createElement(LinkListItem, {
      inDropdown: true,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", null, "Link list 3")), /* @__PURE__ */ React.createElement(LinkListItem, {
      inDropdown: true,
      href: "#"
    }, /* @__PURE__ */ React.createElement("span", null, "Link list 4"))))), /* @__PURE__ */ React.createElement(MegamenuItem, {
      itemName: "Megamenu con Immagine e Descrizione"
    }, /* @__PURE__ */ React.createElement(Row, null, /* @__PURE__ */ React.createElement(MegamenuHighlightColumn, {
      xs: "12",
      lg: "4",
      description: true
    }, /* @__PURE__ */ React.createElement("div", {
      className: "ratio ratio-21x9 lightgrey-bg-a1 mb-4 rounded"
    }, /* @__PURE__ */ React.createElement("figure", {
      className: "figure"
    }, /* @__PURE__ */ React.createElement("img", {
      src: "https://via.placeholder.com/560x240/ebebeb/808080/?text=Immagine",
      className: "figure-img img-fluid rounded",
      alt: "Segnaposto"
    }))), /* @__PURE__ */ React.createElement("p", null, "Omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.")), /* @__PURE__ */ React.createElement(Col, {
      xs: "12",
      lg: "8"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "it-heading-link-wrapper"
    }, /* @__PURE__ */ React.createElement("a", {
      className: "it-heading-link",
      href: "#"
    }, /* @__PURE__ */ React.createElement(Icon, {
      className: "icon icon-sm me-2 mb-1",
      icon: "it-arrow-right-triangle"
    }), /* @__PURE__ */ React.createElement("span", null, "Esplora la sezione megamenu"))), /* @__PURE__ */ React.createElement(Row, null, /* @__PURE__ */ React.createElement(Col, {
      xs: "12",
      lg: "6"
    }, /* @__PURE__ */ React.createElement(LinkList, null, /* @__PURE__ */ React.createElement(LinkListItem, {
      inDropdown: true,
      href: "#"
    }, /* @__PURE__ */ React.createElement(Icon, {
      className: "me-2",
      color: "primary",
      icon: "it-arrow-right-triangle",
      size: "xs"
    }), /* @__PURE__ */ React.createElement("span", null, "Link lista 1")), /* @__PURE__ */ React.createElement(LinkListItem, {
      inDropdown: true,
      href: "#"
    }, /* @__PURE__ */ React.createElement(Icon, {
      className: "me-2",
      color: "primary",
      icon: "it-arrow-right-triangle",
      size: "xs"
    }), /* @__PURE__ */ React.createElement("span", null, "Link lista 2")), /* @__PURE__ */ React.createElement(LinkListItem, {
      inDropdown: true,
      href: "#"
    }, /* @__PURE__ */ React.createElement(Icon, {
      className: "me-2",
      color: "primary",
      icon: "it-arrow-right-triangle",
      size: "xs"
    }), /* @__PURE__ */ React.createElement("span", null, "Link lista 3")))), /* @__PURE__ */ React.createElement(Col, {
      xs: "12",
      lg: "6"
    }, /* @__PURE__ */ React.createElement(LinkList, null, /* @__PURE__ */ React.createElement(LinkListItem, {
      inDropdown: true,
      href: "#"
    }, /* @__PURE__ */ React.createElement(Icon, {
      className: "me-2",
      color: "primary",
      icon: "it-arrow-right-triangle",
      size: "xs"
    }), /* @__PURE__ */ React.createElement("span", null, "Link lista 4")), /* @__PURE__ */ React.createElement(LinkListItem, {
      inDropdown: true,
      href: "#"
    }, /* @__PURE__ */ React.createElement(Icon, {
      className: "me-2",
      color: "primary",
      icon: "it-arrow-right-triangle",
      size: "xs"
    }), /* @__PURE__ */ React.createElement("span", null, "Link lista 5")), /* @__PURE__ */ React.createElement(LinkListItem, {
      inDropdown: true,
      href: "#"
    }, /* @__PURE__ */ React.createElement(Icon, {
      className: "me-2",
      color: "primary",
      icon: "it-arrow-right-triangle",
      size: "xs"
    }), /* @__PURE__ */ React.createElement("span", null, "Link lista 6")))))))))))));
  },
  parameters: {
    docs: {
      controls: {
        exclude: ["isOpen", "className", "type", "small", "testId"]
      }
    }
  },
  args: {
    theme: "",
    isOpen: false
  }
};
const NavHeaderSecondary = {
  render: ({
    theme,
    isOpen
  }) => {
    return /* @__PURE__ */ React.createElement(Header, {
      type: "navbar",
      theme
    }, /* @__PURE__ */ React.createElement(HeaderContent, {
      expand: "lg",
      megamenu: true
    }, /* @__PURE__ */ React.createElement(HeaderToggler, {
      onClick: () => {
      },
      "aria-controls": "nav1",
      "aria-expanded": "false",
      "aria-label": "Toggle navigation"
    }, /* @__PURE__ */ React.createElement(Icon, {
      icon: "it-burger"
    })), /* @__PURE__ */ React.createElement(Collapse, {
      navbar: true,
      header: true,
      isOpen,
      onOverlayClick: () => {
      }
    }, /* @__PURE__ */ React.createElement("div", {
      className: "menu-wrapper"
    }, /* @__PURE__ */ React.createElement(Nav, {
      navbar: true
    }, /* @__PURE__ */ React.createElement(NavItem, {
      active: true
    }, /* @__PURE__ */ React.createElement(NavLink, {
      href: "#",
      active: true
    }, /* @__PURE__ */ React.createElement("span", null, "link 1 active "), /* @__PURE__ */ React.createElement("span", {
      className: "visually-hidden"
    }, "current"))), /* @__PURE__ */ React.createElement(NavItem, null, /* @__PURE__ */ React.createElement(NavLink, {
      href: "#"
    }, "Link 2")), /* @__PURE__ */ React.createElement(NavItem, null, /* @__PURE__ */ React.createElement(NavLink, {
      href: "#"
    }, "Link 3")), /* @__PURE__ */ React.createElement(NavItem, null, /* @__PURE__ */ React.createElement(NavLink, {
      href: "#"
    }, "Link 4"))), /* @__PURE__ */ React.createElement(Nav, {
      navbar: true,
      secondary: true
    }, /* @__PURE__ */ React.createElement(NavItem, null, /* @__PURE__ */ React.createElement(NavLink, {
      href: "#"
    }, "Link 5")), /* @__PURE__ */ React.createElement(NavItem, null, /* @__PURE__ */ React.createElement(NavLink, {
      href: "#"
    }, "Link 6")), /* @__PURE__ */ React.createElement(NavItem, null, /* @__PURE__ */ React.createElement(NavLink, {
      href: "#"
    }, "Link 7")), /* @__PURE__ */ React.createElement(NavItem, null, /* @__PURE__ */ React.createElement(NavLink, {
      href: "#"
    }, "Link 8")))))));
  }
};
NavHeader.parameters = {
  ...NavHeader.parameters,
  docs: {
    ...(_a = NavHeader.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  render: ({\n    theme,\n    isOpen\n  }) => {\n    return <Header type='navbar' theme={theme}>\n        <HeaderContent expand='lg' megamenu>\n          <HeaderToggler onClick={() => {\n          /* set logic open state  */\n        }} aria-controls='nav1' aria-expanded='false' aria-label='Toggle navigation'>\n            <Icon icon='it-burger' />\n          </HeaderToggler>\n          <Collapse navbar header isOpen={isOpen} onOverlayClick={() => {\n          /* set close logic here */\n        }}>\n            <div className='menu-wrapper'>\n              <Nav navbar>\n                <NavItem active>\n                  <NavLink href='#' active>\n                    <span>link 1 active </span>\n                    <span className='visually-hidden'>current</span>\n                  </NavLink>\n                </NavItem>\n                <NavItem>\n                  <NavLink href='#' disabled>\n                    Link 2\n                  </NavLink>\n                </NavItem>\n                <NavItem>\n                  <NavLink href='#'>Link 3</NavLink>\n                </NavItem>\n                <NavItem>\n                  <NavLink href='#'>Link 4</NavLink>\n                </NavItem>\n                <Dropdown tag='li' inNavbar theme={theme}>\n                  <DropdownToggle inNavbar caret>\n                    <span>Dropdown Menu</span>\n                  </DropdownToggle>\n                  <DropdownMenu>\n                    <LinkList>\n                      <LinkListItem inDropdown href='#'>\n                        <span>Link list 1</span>\n                      </LinkListItem>\n                      <LinkListItem inDropdown href='#'>\n                        <span>Link list 2</span>\n                      </LinkListItem>\n                      <LinkListItem inDropdown href='#'>\n                        <span>Link list 3</span>\n                      </LinkListItem>\n                      <LinkListItem inDropdown href='#'>\n                        <span>Link list 4</span>\n                      </LinkListItem>\n                    </LinkList>\n                  </DropdownMenu>\n                </Dropdown>\n                <MegamenuItem itemName='Megamenu con Immagine e Descrizione'>\n                  <Row>\n                    <MegamenuHighlightColumn xs='12' lg='4' description>\n                      <div className='ratio ratio-21x9 lightgrey-bg-a1 mb-4 rounded'>\n                        <figure className='figure'>\n                          <img src='https://via.placeholder.com/560x240/ebebeb/808080/?text=Immagine' className='figure-img img-fluid rounded' alt='Segnaposto' />\n                        </figure>\n                      </div>\n                      <p>Omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>\n                    </MegamenuHighlightColumn>\n                    <Col xs='12' lg='8'>\n                      <div className='it-heading-link-wrapper'>\n                        <a className='it-heading-link' href='#'>\n                          <Icon className='icon icon-sm me-2 mb-1' icon='it-arrow-right-triangle'></Icon>\n                          <span>Esplora la sezione megamenu</span>\n                        </a>\n                      </div>\n                      <Row>\n                        <Col xs='12' lg='6'>\n                          <LinkList>\n                            <LinkListItem inDropdown href='#'>\n                              <Icon className='me-2' color='primary' icon='it-arrow-right-triangle' size='xs' />\n                              <span>Link lista 1</span>\n                            </LinkListItem>\n                            <LinkListItem inDropdown href='#'>\n                              <Icon className='me-2' color='primary' icon='it-arrow-right-triangle' size='xs' />\n                              <span>Link lista 2</span>\n                            </LinkListItem>\n                            <LinkListItem inDropdown href='#'>\n                              <Icon className='me-2' color='primary' icon='it-arrow-right-triangle' size='xs' />\n                              <span>Link lista 3</span>\n                            </LinkListItem>\n                          </LinkList>\n                        </Col>\n                        <Col xs='12' lg='6'>\n                          <LinkList>\n                            <LinkListItem inDropdown href='#'>\n                              <Icon className='me-2' color='primary' icon='it-arrow-right-triangle' size='xs' />\n                              <span>Link lista 4</span>\n                            </LinkListItem>\n                            <LinkListItem inDropdown href='#'>\n                              <Icon className='me-2' color='primary' icon='it-arrow-right-triangle' size='xs' />\n                              <span>Link lista 5</span>\n                            </LinkListItem>\n                            <LinkListItem inDropdown href='#'>\n                              <Icon className='me-2' color='primary' icon='it-arrow-right-triangle' size='xs' />\n                              <span>Link lista 6</span>\n                            </LinkListItem>\n                          </LinkList>\n                        </Col>\n                      </Row>\n                    </Col>\n                  </Row>\n                </MegamenuItem>\n              </Nav>\n            </div>\n          </Collapse>\n        </HeaderContent>\n      </Header>;\n  },\n  parameters: {\n    docs: {\n      controls: {\n        exclude: ['isOpen', 'className', 'type', 'small', 'testId']\n      }\n    }\n  },\n  args: {\n    theme: '',\n    isOpen: false\n  }\n}",
      ...(_c = (_b = NavHeader.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
NavHeaderSecondary.parameters = {
  ...NavHeaderSecondary.parameters,
  docs: {
    ...(_d = NavHeaderSecondary.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  render: ({\n    theme,\n    isOpen\n  }) => {\n    return <Header type='navbar' theme={theme}>\n        <HeaderContent expand='lg' megamenu>\n          <HeaderToggler onClick={() => {\n          /* set logic open state  */\n        }} aria-controls='nav1' aria-expanded='false' aria-label='Toggle navigation'>\n            <Icon icon='it-burger' />\n          </HeaderToggler>\n          <Collapse navbar header isOpen={isOpen} onOverlayClick={() => {\n          /* set close logic here */\n        }}>\n            <div className='menu-wrapper'>\n              <Nav navbar>\n                <NavItem active>\n                  <NavLink href='#' active>\n                    <span>link 1 active </span>\n                    <span className='visually-hidden'>current</span>\n                  </NavLink>\n                </NavItem>\n                <NavItem>\n                  <NavLink href='#'>Link 2</NavLink>\n                </NavItem>\n                <NavItem>\n                  <NavLink href='#'>Link 3</NavLink>\n                </NavItem>\n                <NavItem>\n                  <NavLink href='#'>Link 4</NavLink>\n                </NavItem>\n              </Nav>\n              <Nav navbar secondary>\n                <NavItem>\n                  <NavLink href='#'>Link 5</NavLink>\n                </NavItem>\n                <NavItem>\n                  <NavLink href='#'>Link 6</NavLink>\n                </NavItem>\n                <NavItem>\n                  <NavLink href='#'>Link 7</NavLink>\n                </NavItem>\n                <NavItem>\n                  <NavLink href='#'>Link 8</NavLink>\n                </NavItem>\n              </Nav>\n            </div>\n          </Collapse>\n        </HeaderContent>\n      </Header>;\n  }\n}",
      ...(_f = (_e = NavHeaderSecondary.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
const __namedExportsOrder = ["NavHeader", "NavHeaderSecondary"];
export {
  NavHeader,
  NavHeaderSecondary,
  __namedExportsOrder,
  meta as default
};