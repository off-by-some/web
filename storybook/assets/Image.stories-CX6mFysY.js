import{n as b,a as m,f as g,c as a,p as z,e as P,d as i,b as $}from"./iframe-NmQMUAFk.js";import{c as C,i as G,d as w}from"./create-runtime-stories-s97yaUQ7.js";import{I as e}from"./Image-D9L8Yph_.js";import{a as x}from"./design-notes-CQ-o3Wt1.js";import{h as D}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./each-CgetZTUB.js";import"./attributes-Dugq6qa8.js";import"./class-Bw_OhP9U.js";import"./this-BR_WVk-G.js";import"./paths-Bs9m8RIQ.js";const F=(t,o=b)=>{var s=j(),r=a(s);e(r,{get src(){return o().src},alt:"Portrait example",sizes:"12rem",priority:!0}),m(t,s)},S={title:"Library/Primitives/Media/Image",component:e,render:F,tags:["autodocs"],args:{src:"company_logos/upguard_logo.jpg"},argTypes:{...D(["alt","sizes","loading","decoding","fetchpriority","priority","width","height"]),src:{control:"text"}},parameters:{docs:{description:{component:x.image}}}},{Story:l}=w();var j=g('<div class="story-image story-image--portrait svelte-1acgug7"><!></div>'),q=g('<div class="story-grid svelte-1acgug7"><div class="story-image svelte-1acgug7"><!></div> <div class="story-image svelte-1acgug7"><!></div> <div class="story-image svelte-1acgug7"><!></div></div>'),J=g("<!> <!>",1);function v(t,o){z(o,!1),G();var s=J(),r=P(s);l(r,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-image story-image--portrait">
  <Image src={args.src} alt="Portrait example" sizes="12rem" priority />
</div>`}}});var _=i(r,2);l(_,{name:"Image Formats",asChild:!0,children:(u,M)=>{var n=q(),c=a(n),y=a(c);e(y,{src:"company_logos/upguard_logo.jpg",alt:"JPG company logo",sizes:"10rem"});var d=i(c,2),f=a(d);e(f,{src:"icons/Graphql.webp",alt:"WebP technology icon",sizes:"10rem"});var h=i(d,2),I=a(h);e(I,{src:"svg/github_brand_icon.svg",alt:"SVG brand icon",sizes:"10rem"}),m(u,n)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="story-grid">
  <div class="story-image">
    <Image src="company_logos/upguard_logo.jpg" alt="JPG company logo" sizes="10rem" />
  </div>
  <div class="story-image">
    <Image src="icons/Graphql.webp" alt="WebP technology icon" sizes="10rem" />
  </div>
  <div class="story-image">
    <Image src="svg/github_brand_icon.svg" alt="SVG brand icon" sizes="10rem" />
  </div>
</div>`}}}),m(t,s),$()}v.__docgen={data:[],name:"Image.stories.svelte"};const p=C(v,S),H=["Default","ImageFormats"],K={...p.Default,tags:["svelte-csf-v5"]},Q={...p.ImageFormats,tags:["svelte-csf-v5"]};export{K as Default,Q as ImageFormats,H as __namedExportsOrder,S as default};
