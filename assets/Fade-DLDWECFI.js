import{r as x,R as d}from"./index-BFWcBMrj.js";import{P as s}from"./index-D3ylJrlI.js";import{c as A}from"./index-Bl6ORisp.js";import{t as E,p as N,o as M,m as D,T as S,a as m}from"./utils-CUovxYU2.js";import{T as p}from"./Transition-GxAQdkDD.js";var $=["tag","baseClass","baseClassActive","className","cssModule","children","innerRef"];function c(){return c=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},c.apply(this,arguments)}function F(e,n){if(e==null)return{};var r=K(e,n),t,a;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}function K(e,n){if(e==null)return{};var r={},t=Object.keys(e),a,i;for(i=0;i<t.length;i++)a=t[i],!(n.indexOf(a)>=0)&&(r[a]=e[a]);return r}function v(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),r.push.apply(r,t)}return r}function o(e){for(var n=1;n<arguments.length;n++){var r=arguments[n]!=null?arguments[n]:{};n%2?v(Object(r),!0).forEach(function(t){W(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function W(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}var I=o(o({},p.propTypes),{},{children:s.oneOfType([s.arrayOf(s.node),s.node]),tag:E,baseClass:s.string,baseClassActive:s.string,className:s.string,cssModule:s.object,innerRef:s.oneOfType([s.object,s.string,s.func])}),O=o(o({},p.defaultProps),{},{timeout:S.Fade,appear:!0,enter:!0,exit:!0,in:!0});function g(e){var n=x.useRef(null),r=e.tag,t=r===void 0?"div":r,a=e.baseClass,i=a===void 0?"fade":a,f=e.baseClassActive,y=f===void 0?"show":f,P=e.className,j=e.cssModule,h=e.children,l=e.innerRef,u=l===void 0?n:l,b=F(e,$),T=N(o({defaultProps:O},b),m),w=M(b,m);return d.createElement(p,c({nodeRef:u},T),function(C){var _=C==="entered",R=D(A(P,i,_&&y),j);return d.createElement(t,c({className:R},w,{ref:u}),h)})}g.propTypes=I;g.defaultProps=O;export{g as F};