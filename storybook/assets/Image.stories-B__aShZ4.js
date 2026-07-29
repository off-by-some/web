import{n as b,b as m,f as n,c as r,p as x,d as z,s as i,e as P}from"./iframe-DLDiJGs9.js";import{c as $,d as C}from"./create-runtime-stories-Bc8tgwji.js";import{I as a}from"./Image-Ayc55QrU.js";import{a as G}from"./design-notes-CQ-o3Wt1.js";import{h as w}from"./controls-B7FSozl-.js";import{i as D}from"./lifecycle-Dms2tKSv.js";import"./preload-helper-k3ZeA0S-.js";import"./each-9emWg8qb.js";import"./attributes-BnIK5ZvT.js";import"./class-BN7jOcxs.js";import"./this-DMZGiKmd.js";import"./paths-B0xucN9Y.js";import"./client-BDHwhSmg.js";const F=(o,t=b)=>{var s=j(),e=r(s);a(e,{get src(){return t().src},alt:"Portrait example",sizes:"12rem",priority:!0}),m(o,s)},S={title:"Component Library/Primitives/Media/Image",component:a,render:F,tags:["autodocs"],args:{src:"company_logos/upguard_logo.jpg"},argTypes:{...w(["alt","sizes","loading","decoding","fetchpriority","priority","width","height"]),src:{control:"text"}},parameters:{docs:{description:{component:G.image}}}},{Story:g}=C();var j=n('<div class="story-image story-image--portrait svelte-urxm97"><!></div>'),q=n('<div class="story-grid svelte-urxm97"><div class="story-image svelte-urxm97"><!></div> <div class="story-image svelte-urxm97"><!></div> <div class="story-image svelte-urxm97"><!></div></div>'),J=n("<!> <!>",1);function v(o,t){x(t,!1),D();var s=J(),e=z(s);g(e,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-image story-image--portrait">
  <Image src={args.src} alt="Portrait example" sizes="12rem" priority />
</div>`}}});var _=i(e,2);g(_,{name:"Image Formats",asChild:!0,children:(u,M)=>{var d=q(),l=r(d),y=r(l);a(y,{src:"company_logos/upguard_logo.jpg",alt:"JPG company logo",sizes:"10rem"});var c=i(l,2),f=r(c);a(f,{src:"icons/Graphql.webp",alt:"WebP technology icon",sizes:"10rem"});var h=i(c,2),I=r(h);a(I,{src:"svg/github_brand_icon.svg",alt:"SVG brand icon",sizes:"10rem"}),m(u,d)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="story-grid">
  <div class="story-image">
    <Image src="company_logos/upguard_logo.jpg" alt="JPG company logo" sizes="10rem" />
  </div>
  <div class="story-image">
    <Image src="icons/Graphql.webp" alt="WebP technology icon" sizes="10rem" />
  </div>
  <div class="story-image">
    <Image src="svg/github_brand_icon.svg" alt="SVG brand icon" sizes="10rem" />
  </div>
</div>`}}}),m(o,s),P()}v.__docgen={data:[],name:"Image.stories.svelte"};const p=$(v,S),Q=["Default","ImageFormats"],U={...p.Default,tags:["svelte-csf-v5"]},X={...p.ImageFormats,tags:["svelte-csf-v5"]};export{U as Default,X as ImageFormats,Q as __namedExportsOrder,S as default};
