import{R as e}from"./index-BFWcBMrj.js";import{c as t}from"./index-Bl6ORisp.js";import{i as f}from"./index-GAri5u7x.js";import{l as y}from"./utils-Dujee42i.js";const b=({wrapperClassName:l,className:o,tag:g="div",value:r,label:s,indeterminate:m=!1,color:i,testId:p,role:N="progressbar",...c})=>{const n=g;!f(r)&&!m&&y(`The passed "value" is not a valid number. You passed "${r}"`);const a=Number(r),v=t("progress-bar-wrapper"),d=t(l===!0?o:l,"progress",{"progress-indeterminate":m,"progress-color":i}),u=t(o,"progress-bar",{[`bg-${i}`]:i});return s&&a?e.createElement(n,{className:v,"data-testid":p},e.createElement("div",{className:"progress-bar-label"},e.createElement("span",{className:"visually-hidden"},s),a+"%"),e.createElement(n,{className:d},e.createElement("div",{...c,className:u,role:"progressbar",style:{width:a+"%"},"aria-valuenow":a,"aria-valuemin":0,"aria-valuemax":100}))):e.createElement(n,{className:d,"data-testid":p},e.createElement("div",{className:"progress-bar-label"},e.createElement("span",{className:"visually-hidden"},s)),e.createElement("div",{...c,className:u,role:"progressbar",style:{width:a+"%"},"aria-valuenow":a,"aria-valuemin":0,"aria-valuemax":100}))};b.__docgenInfo={description:"",methods:[],displayName:"Progress",props:{tag:{required:!1,tsType:{name:"ElementType"},description:"Utilizzarlo in caso di utilizzo di componenti personalizzati",defaultValue:{value:"'div'",computed:!1}},wrapperClassName:{required:!1,tsType:{name:"union",raw:"string | true",elements:[{name:"string"},{name:"literal",value:"true"}]},description:"Classi aggiuntive da usare per il componente contenitore del Progress\nPer replicare il comportamento precedente, in cui `className` veniva applicato anche al wrapper,\npassare `true`."},className:{required:!1,tsType:{name:"string"},description:"Classi aggiuntive da usare per il componente interno del Progress"},value:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"Valore corrente (numerico)"},label:{required:!1,tsType:{name:"string"},description:"Etichetta con testo per indicare il progresso corrente da mostrare ai dispositivi screen reader"},indeterminate:{required:!1,tsType:{name:"boolean"},description:"Quando non è possibile stabilire una percentuale di progressione utilizzare una Progress Bar di tipo indeterminato",defaultValue:{value:"false",computed:!1}},color:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary' | 'success' | 'danger' | 'warning' | string",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'success'"},{name:"literal",value:"'danger'"},{name:"literal",value:"'warning'"},{name:"string"}]},description:"Le varianti di colore definite in Bootstrap Italia"},testId:{required:!1,tsType:{name:"string"},description:""},role:{defaultValue:{value:"'progressbar'",computed:!1},required:!1}},composes:["HTMLAttributes"]};export{b as P};