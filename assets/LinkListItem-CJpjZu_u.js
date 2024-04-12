import{R as e}from"./index-BFWcBMrj.js";import{c as T}from"./index-Bl6ORisp.js";const v=({className:a,wrapperClassName:f,tag:c="div",multiline:n,header:s,sublist:l,avatar:L,noWrapper:r,testId:p,...t})=>{const m=c,d=T("link-list-wrapper",f,{multiline:n}),i=T(a,{"link-list":!l,"link-sublist":l,"avatar-group":L});return r?e.createElement("ul",{...t,className:i,"data-testid":p}):l?e.createElement(e.Fragment,null,s,e.createElement("ul",{...t,className:i})):e.createElement(m,{className:d,"data-testid":p},s,e.createElement("ul",{...t,className:i}))};v.__docgenInfo={description:"",methods:[],displayName:"LinkList",props:{header:{required:!1,tsType:{name:"ReactNode"},description:"Da utilizzare in caso di titolo principale della lista. Passare una componente React da mostrare come titolo"},className:{required:!1,tsType:{name:"string"},description:"Classi aggiuntive da usare per il componente lista del LinkList"},wrapperClassName:{required:!1,tsType:{name:"string"},description:"Classi aggiuntive da usare per il componente wrapper del LinkList"},tag:{required:!1,tsType:{name:"ElementType"},description:`Utilizzarlo in caso di utilizzo di componenti personalizzati per il wrapper della lista.
Nota: viene ignorato quando usato in lista annidate.`,defaultValue:{value:"'div'",computed:!1}},multiline:{required:!1,tsType:{name:"boolean"},description:"Quando abilitato gestisce una lista in cui ciascun elemento è composto da più componenti/elementi."},sublist:{required:!1,tsType:{name:"boolean"},description:"Da utilizzare per una lista annidata"},avatar:{required:!1,tsType:{name:"boolean"},description:"Da utilizzare per una lista di avatar"},noWrapper:{required:!1,tsType:{name:"boolean"},description:"Quando attivo rimuove il componente contenitore della ListList. Utile per alcuni tipi di liste annidate."},testId:{required:!1,tsType:{name:"string"},description:""}},composes:["HTMLAttributes"]};const y=a=>{a.preventDefault()},k=({className:a,active:f,disabled:c,header:n,divider:s,bold:l,large:L,href:r,tag:p="a",wrapperClassName:t,testId:m,children:d,inDropdown:i,...o})=>{let u=p;const N=T(a,{active:f,disabled:c,header:n,divider:s,large:L,medium:l,"dropdown-item":i},"list-item"),g={};return c&&(g.onClick=y),n?u="h3":s&&(u="span"),i&&(o.role="menuitem",o.tabIndex=0),n&&r?e.createElement("li",{className:t,"data-testid":m},e.createElement(u,null,e.createElement("a",{href:r||"#",...o,className:N,...g},d))):e.createElement("li",{className:t,"data-testid":m},e.createElement(u,{role:o.onClick?"button":void 0,...o,className:N,href:r,...g},d))},z=({children:a})=>e.createElement("span",{className:"list-item-title-icon-wrapper"},a);k.TitleIconWrapper=z;k.__docgenInfo={description:"",methods:[{name:"TitleIconWrapper",docblock:null,modifiers:["static"],params:[{name:"{ children }",optional:!1,type:null}],returns:null}],displayName:"LinkListItem",props:{tag:{defaultValue:{value:"'a'",computed:!1},required:!1}}};export{v as L,k as a};
