import{n as b,a as m,f as n,c as a,p as z,b as P,s as i,d as $}from"./iframe-2qmlH2sq.js";import{c as C,i as G,d as w}from"./create-runtime-stories-BvE61y3P.js";import{I as e}from"./Image-wAJz7V6U.js";import{d as x}from"./design-notes-DHcFwxFZ.js";import{h as D}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./each-Bl-uDLRo.js";import"./attributes-FIS9lIlx.js";import"./paths-DA1abpE1.js";const F=(t,o=b)=>{var s=j(),r=a(s);e(r,{get src(){return o().src},alt:"Portrait example",sizes:"12rem",priority:!0}),m(t,s)},S={title:"Library/Primitives/Media/Image",component:e,render:F,tags:["autodocs"],args:{src:"headshot.png"},argTypes:{...D(["alt","sizes","loading","decoding","fetchpriority","priority","width","height"]),src:{control:"text"}},parameters:{docs:{description:{component:x.image}}}},{Story:l}=w();var j=n('<div class="story-image story-image--portrait svelte-1acgug7"><!></div>'),q=n('<div class="story-grid svelte-1acgug7"><div class="story-image svelte-1acgug7"><!></div> <div class="story-image svelte-1acgug7"><!></div> <div class="story-image svelte-1acgug7"><!></div></div>'),J=n("<!> <!>",1);function v(t,o){z(o,!1),G();var s=J(),r=P(s);l(r,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-image story-image--portrait">
  <Image src={args.src} alt="Portrait example" sizes="12rem" priority />
</div>`}}});var _=i(r,2);l(_,{name:"Image Formats",asChild:!0,children:(u,M)=>{var g=q(),d=a(g),y=a(d);e(y,{src:"company_logos/upguard_logo.jpg",alt:"JPG company logo",sizes:"10rem"});var c=i(d,2),f=a(c);e(f,{src:"icons/Graphql.webp",alt:"WebP technology icon",sizes:"10rem"});var h=i(c,2),I=a(h);e(I,{src:"svg/github_brand_icon.svg",alt:"SVG brand icon",sizes:"10rem"}),m(u,g)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="story-grid">
  <div class="story-image">
    <Image src="company_logos/upguard_logo.jpg" alt="JPG company logo" sizes="10rem" />
  </div>
  <div class="story-image">
    <Image src="icons/Graphql.webp" alt="WebP technology icon" sizes="10rem" />
  </div>
  <div class="story-image">
    <Image src="svg/github_brand_icon.svg" alt="SVG brand icon" sizes="10rem" />
  </div>
</div>`}}}),m(t,s),$()}v.__docgen={data:[],name:"Image.stories.svelte"};const p=C(v,S),A=["Default","ImageFormats"],B={...p.Default,tags:["svelte-csf-v5"]},H={...p.ImageFormats,tags:["svelte-csf-v5"]};export{B as Default,H as ImageFormats,A as __namedExportsOrder,S as default};
