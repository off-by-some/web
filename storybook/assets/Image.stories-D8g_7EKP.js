import{n as $,a as n,f as c,c as s,p as z,h as C,s as g,d as G}from"./iframe-bDISe4Ti.js";import{c as x,i as F,d as w}from"./create-runtime-stories-BCa2lVrs.js";import{I as a}from"./Image-aq5r-36Y.js";import{d as S}from"./design-notes-DHcFwxFZ.js";import"./preload-helper-k3ZeA0S-.js";import"./each-Brc2gF5z.js";import"./attributes-BF6ZGX27.js";import"./client-B11HaWyy.js";const j=(m,r=$)=>{var e=p(),o=s(e);a(o,{get src(){return r().src},get alt(){return r().alt},get sizes(){return r().sizes},get priority(){return r().priority}}),n(m,e)},q={title:"Library/Primitives/Media/Image",component:a,render:j,tags:["autodocs"],args:{src:"headshot.png",alt:"Portrait example",sizes:"12rem",priority:!0},parameters:{docs:{description:{component:S.image}}}},{Story:v}=w();var p=c('<div class="story-image story-image--portrait svelte-1acgug7"><!></div>'),J=c('<div class="story-grid svelte-1acgug7"><div class="story-image svelte-1acgug7"><!></div> <div class="story-image svelte-1acgug7"><!></div> <div class="story-image svelte-1acgug7"><!></div></div>'),M=c("<!> <!>",1);function _(m,r){z(r,!1),F();var e=M(),o=C(e);v(o,{name:"Portrait",asChild:!0,children:(d,h)=>{var t=p(),i=s(t);a(i,{src:"headshot.png",alt:"Portrait example",sizes:"12rem",priority:!0}),n(d,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="story-image story-image--portrait">
  <Image src="headshot.png" alt="Portrait example" sizes="12rem" priority />
</div>`}}});var y=g(o,2);v(y,{name:"Image Formats",asChild:!0,children:(d,h)=>{var t=J(),i=s(t),f=s(i);a(f,{src:"company_logos/upguard_logo.jpg",alt:"JPG company logo",sizes:"10rem"});var l=g(i,2),P=s(l);a(P,{src:"icons/Graphql.webp",alt:"WebP technology icon",sizes:"10rem"});var I=g(l,2),b=s(I);a(b,{src:"svg/github_brand_icon.svg",alt:"SVG brand icon",sizes:"10rem"}),n(d,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="story-grid">
  <div class="story-image">
    <Image src="company_logos/upguard_logo.jpg" alt="JPG company logo" sizes="10rem" />
  </div>
  <div class="story-image">
    <Image src="icons/Graphql.webp" alt="WebP technology icon" sizes="10rem" />
  </div>
  <div class="story-image">
    <Image src="svg/github_brand_icon.svg" alt="SVG brand icon" sizes="10rem" />
  </div>
</div>`}}}),n(m,e),G()}_.__docgen={data:[],name:"Image.stories.svelte"};const u=x(_,q),A=["Portrait","ImageFormats"],B={...u.Portrait,tags:["svelte-csf-v5"]},D={...u.ImageFormats,tags:["svelte-csf-v5"]};export{D as ImageFormats,B as Portrait,A as __namedExportsOrder,q as default};
