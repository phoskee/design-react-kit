import{R as n}from"./index-BFWcBMrj.js";import{c as o}from"./index-Bl6ORisp.js";const p=({className:a,tag:t="div",testId:e,...s})=>{const r=t,i=o("d-flex align-items-center justify-content-around flex-wrap flex-sm-nowrap",a);return n.createElement(r,{...s,className:i,"data-testid":e})};p.__docgenInfo={description:"",methods:[],displayName:"AvatarContainer",props:{tag:{required:!1,tsType:{name:"ElementType"},description:"Utilizzarlo in caso di utilizzo di componenti personalizzati",defaultValue:{value:"'div'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Classi aggiuntive da usare per il componente AvatarContainer"},testId:{required:!1,tsType:{name:"string"},description:""}},composes:["HTMLAttributes"]};const d=({className:a,tag:t="div",extra:e,testId:s,...r})=>{const i=t,l=o("avatar-wrapper",a,{[`avatar-extra-${e}`]:e});return n.createElement(i,{...r,className:l,"data-testid":s})};d.__docgenInfo={description:"",methods:[],displayName:"AvatarWrapper",props:{tag:{required:!1,tsType:{name:"ElementType"},description:"Utilizzarlo in caso di utilizzo di componenti personalizzati",defaultValue:{value:"'div'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Classi aggiuntive da usare per il componente AvatarStatus"},extra:{required:!1,tsType:{name:"union",raw:"'text' | string",elements:[{name:"literal",value:"'text'"},{name:"string"}]},description:"Utilizzare questo attributo qualora si volesse utilizzare un componente AvatarExtraText all'interno dell'Avatar."},testId:{required:!1,tsType:{name:"string"},description:""}},composes:["HTMLAttributes"]};export{p as A,d as a};
