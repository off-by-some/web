import{n as b,a as m,f as g,c as a,p as z,e as P,d as i,b as $}from"./iframe-CA5KIqmo.js";import{c as C,d as G}from"./create-runtime-stories-DS-G3qcO.js";import{I as r}from"./Image-BecIiE0U.js";import{a as w}from"./design-notes-CQ-o3Wt1.js";import{h as x}from"./controls-B7FSozl-.js";import{i as D}from"./lifecycle-URRplwgd.js";import"./preload-helper-k3ZeA0S-.js";import"./each-C--WEFGA.js";import"./attributes-CqrEssVq.js";import"./class-6vsHnBUc.js";import"./this-B1wBLBKG.js";import"./paths-DDL2IFtC.js";const F=(o,t=b)=>{var s=j(),e=a(s);r(e,{get src(){return t().src},alt:"Portrait example",sizes:"12rem",priority:!0}),m(o,s)},S={title:"Library/Primitives/Media/Image",component:r,render:F,tags:["autodocs"],args:{src:"company_logos/upguard_logo.jpg"},argTypes:{...x(["alt","sizes","loading","decoding","fetchpriority","priority","width","height"]),src:{control:"text"}},parameters:{docs:{description:{component:w.image}}}},{Story:l}=G();var j=g('<div class="story-image story-image--portrait svelte-1acgug7"><!></div>'),q=g('<div class="story-grid svelte-1acgug7"><div class="story-image svelte-1acgug7"><!></div> <div class="story-image svelte-1acgug7"><!></div> <div class="story-image svelte-1acgug7"><!></div></div>'),J=g("<!> <!>",1);function v(o,t){z(t,!1),D();var s=J(),e=P(s);l(e,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-image story-image--portrait">
  <Image src={args.src} alt="Portrait example" sizes="12rem" priority />
</div>`}}});var _=i(e,2);l(_,{name:"Image Formats",asChild:!0,children:(u,M)=>{var n=q(),c=a(n),y=a(c);r(y,{src:"company_logos/upguard_logo.jpg",alt:"JPG company logo",sizes:"10rem"});var d=i(c,2),f=a(d);r(f,{src:"icons/Graphql.webp",alt:"WebP technology icon",sizes:"10rem"});var h=i(d,2),I=a(h);r(I,{src:"svg/github_brand_icon.svg",alt:"SVG brand icon",sizes:"10rem"}),m(u,n)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="story-grid">
  <div class="story-image">
    <Image src="company_logos/upguard_logo.jpg" alt="JPG company logo" sizes="10rem" />
  </div>
  <div class="story-image">
    <Image src="icons/Graphql.webp" alt="WebP technology icon" sizes="10rem" />
  </div>
  <div class="story-image">
    <Image src="svg/github_brand_icon.svg" alt="SVG brand icon" sizes="10rem" />
  </div>
</div>`}}}),m(o,s),$()}v.__docgen={data:[],name:"Image.stories.svelte"};const p=C(v,S),K=["Default","ImageFormats"],Q={...p.Default,tags:["svelte-csf-v5"]},U={...p.ImageFormats,tags:["svelte-csf-v5"]};export{Q as Default,U as ImageFormats,K as __namedExportsOrder,S as default};
