import{R as l}from"./index-BFWcBMrj.js";import{P as o}from"./index-D3ylJrlI.js";import{c as d}from"./index-Bl6ORisp.js";import{t as m,m as u}from"./utils-CUovxYU2.js";var f=["className","cssModule","tag"];function n(){return n=Object.assign?Object.assign.bind():function(e){for(var s=1;s<arguments.length;s++){var r=arguments[s];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},n.apply(this,arguments)}function g(e,s){if(e==null)return{};var r=y(e,s),t,a;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],!(s.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}function y(e,s){if(e==null)return{};var r={},t=Object.keys(e),a,i;for(i=0;i<t.length;i++)a=t[i],!(s.indexOf(a)>=0)&&(r[a]=e[a]);return r}var v={className:o.string,cssModule:o.object,tag:m};function c(e){var s=e.className,r=e.cssModule,t=e.tag,a=t===void 0?"div":t,i=g(e,f),p=u(d(s,"card-title"),r);return l.createElement(a,n({},i,{className:p}))}c.propTypes=v;const b=e=>l.createElement(c,{...e,"data-testid":e.testId});b.__docgenInfo={description:"",methods:[],displayName:"CardTitle",props:{tag:{required:!1,tsType:{name:"ElementType"},description:"Utilizzarlo in caso di utilizzo di componenti personalizzati"},className:{required:!1,tsType:{name:"string"},description:"Classi aggiuntive da usare per il componente CardTitle"},testId:{required:!1,tsType:{name:"string"},description:""}},composes:["HTMLAttributes"]};export{b as C};
