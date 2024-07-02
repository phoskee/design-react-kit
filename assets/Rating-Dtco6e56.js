import { j as jsxRuntimeExports, M as Meta, d as Canvas, e as Controls3, C as Code, A as ArgTypes } from "./index-dIfejrFL.js";
import { useMDXComponents } from "./index-BqkeGXjM.js";
import { R as RatingStories, a as RatingBase, b as RatingConLabel, c as RatingReadOnly, d as Rating } from "./Rating.stories-BSHil1KQ.js";
import { C as Callout, a as CalloutText } from "./CalloutText-B3REk1Nj.js";
import "./iframe-MlAXxqxI.js";
import "../sb-preview/runtime.js";
import "./index-C-_iGYWo.js";
import "./_commonjsHelpers-CcAunmGO.js";
import "./index-CClgydmT.js";
import "./index-ClxGM1EF.js";
import "./index-DLlB04eo.js";
import "./inheritsLoose-DBHupcN5.js";
import "./index-CX88d7aO.js";
import "./index-BdOSk9or.js";
import "./index-xoeSAV6i.js";
import "./FormGroup-Dm03kL2Q.js";
import "./index-C6XlOQIa.js";
import "./utils-BFoSoHid.js";
import "./Label-Dgx7kIS2.js";
import "./Input-3mdvAx-k.js";
import "./index-C2nrqh0v.js";
import "./Icon-DRwA3K3x.js";
import "./utils-DNvasP3d.js";
function _createMdxContent(props) {
  const _components = {
    code: "code",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    p: "p",
    pre: "pre",
    ...useMDXComponents(),
    ...props.components
  };
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
    children: [jsxRuntimeExports.jsx(Meta, {
      of: RatingStories
    }), "\n", jsxRuntimeExports.jsx(_components.h1, {
      id: "rating",
      children: "Rating"
    }), "\n", jsxRuntimeExports.jsx(_components.h2, {
      id: "per-esprimere-una-valutazione-su-un-contenuto",
      children: "Per esprimere una valutazione su un contenuto"
    }), "\n", jsxRuntimeExports.jsx(_components.h3, {
      id: "esempio",
      children: "Esempio"
    }), "\n", jsxRuntimeExports.jsx(Canvas, {
      of: RatingBase
    }), "\n", jsxRuntimeExports.jsx(Controls3, {
      of: RatingBase
    }), "\n", jsxRuntimeExports.jsx(_components.h3, {
      id: "con-label",
      children: "Con label"
    }), "\n", jsxRuntimeExports.jsxs(_components.p, {
      children: ["Per visualizzare una label utilizzare l'attributo ", jsxRuntimeExports.jsx(_components.code, {
        children: "legend"
      }), " del componente ", jsxRuntimeExports.jsx(_components.code, {
        children: "Rating"
      }), ". In questo caso viene passato un nodo tsx all'attributo, che però accetta anche una struttura JSON (vedi documentazione)."]
    }), "\n", jsxRuntimeExports.jsx("div", {
      className: "docs",
      children: jsxRuntimeExports.jsx(Callout, {
        color: "success",
        children: jsxRuntimeExports.jsx(CalloutText, {
          children: jsxRuntimeExports.jsxs(_components.p, {
            children: ["L'attributo ", jsxRuntimeExports.jsx(Code, {
              children: "<legend>"
            }), " contiene testo aggiuntivo per Screen Reader all’interno di uno\r\n", jsxRuntimeExports.jsx(Code, {
              children: '<span class="visually-hidden">'
            }), "\r\n.", jsxRuntimeExports.jsx("br", {}), "\r\nLa label con il numero di stelle dev’essere contenuta in uno ", jsxRuntimeExports.jsx(Code, {
              children: "<span>"
            }), " semplice."]
          })
        })
      })
    }), "\n", jsxRuntimeExports.jsx(Canvas, {
      of: RatingConLabel
    }), "\n", jsxRuntimeExports.jsx(_components.h4, {
      id: "codice",
      children: "Codice"
    }), "\n", jsxRuntimeExports.jsx(_components.pre, {
      children: jsxRuntimeExports.jsx(_components.code, {
        className: "language-tsx",
        children: "const [rating, setRating] = useState(4);\r\nreturn (\r\n  <Rating\r\n    value={rating}\r\n    legend={\r\n      <>\r\n        <span className='visually-hidden'>Valutazione</span> <span>{rating} stelle</span>\r\n        <span className='visually-hidden'>su 5</span>\r\n      </>\r\n    }\r\n    inputs={['star1b', 'star2b', 'star3b', 'star4b', 'star5b']}\r\n    name='ratingB'\r\n    onChangeRating={setRating}\r\n  />\r\n);\n"
      })
    }), "\n", jsxRuntimeExports.jsx(_components.h3, {
      id: "sola-lettura",
      children: "Sola lettura"
    }), "\n", jsxRuntimeExports.jsx("div", {
      className: "docs",
      children: jsxRuntimeExports.jsx(Callout, {
        color: "success",
        children: jsxRuntimeExports.jsx(CalloutText, {
          children: jsxRuntimeExports.jsxs(_components.p, {
            children: ["Per rendere accessibile il contenuto è necessario aggiungere l'attributo ", jsxRuntimeExports.jsx(Code, {
              children: "<legend>"
            }), " con classe", " ", "\r\n", jsxRuntimeExports.jsx("code", {
              children: ".visually-hidden"
            }), "."]
          })
        })
      })
    }), "\n", jsxRuntimeExports.jsxs(_components.p, {
      children: ["Aggiungendo l'attributo ", jsxRuntimeExports.jsx(_components.code, {
        children: "readOnly"
      }), " si ottiene un Rating non modificabile di sola lettura."]
    }), "\n", jsxRuntimeExports.jsx(Canvas, {
      of: RatingReadOnly
    }), "\n", jsxRuntimeExports.jsxs(_components.p, {
      children: ["I seguenti valori per l'attributo ", jsxRuntimeExports.jsx(_components.code, {
        children: "legend"
      }), " sono equivalenti:"]
    }), "\n", jsxRuntimeExports.jsx(_components.pre, {
      children: jsxRuntimeExports.jsx(_components.code, {
        className: "language-tsx",
        children: "<Rating legend={{ content: 'Valutazione 4 stelle su 5', srOnly: true }} />\n"
      })
    }), "\n", jsxRuntimeExports.jsx(_components.p, {
      children: "oppure"
    }), "\n", jsxRuntimeExports.jsx(_components.pre, {
      children: jsxRuntimeExports.jsx(_components.code, {
        className: "language-tsx",
        children: "<Rating legend={<legend className='visually-hidden'>Valutazione 4 stelle su 5</legend>} />\n"
      })
    }), "\n", jsxRuntimeExports.jsx(_components.h2, {
      id: "argomenti-componente",
      children: "Argomenti componente"
    }), "\n", jsxRuntimeExports.jsx(_components.h3, {
      id: "rating-1",
      children: "Rating"
    }), "\n", jsxRuntimeExports.jsx(ArgTypes, {
      of: Rating
    })]
  });
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = {
    ...useMDXComponents(),
    ...props.components
  };
  return MDXLayout ? jsxRuntimeExports.jsx(MDXLayout, {
    ...props,
    children: jsxRuntimeExports.jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
export {
  MDXContent as default
};