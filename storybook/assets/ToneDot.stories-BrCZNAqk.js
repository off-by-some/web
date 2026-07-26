import{n as x,t as T,a as o,f as r,d as c,c as n,p as y,e as A,b as C,k as h,g as a,h as S}from"./iframe-NmQMUAFk.js";import{c as P,i as q,d as z}from"./create-runtime-stories-s97yaUQ7.js";import{T as m}from"./ToneDot-BTesGnJo.js";import{e as E}from"./each-CgetZTUB.js";import"./preload-helper-k3ZeA0S-.js";import"./class-Bw_OhP9U.js";const I=(i,e=x)=>{var t=O(),s=n(t);m(s,{get tone(){return e().tone},get pulse(){return e().pulse}});var l=c(s,2),v=n(l);T(()=>h(v,e().tone)),o(i,t)},L=["expert","advanced","proficient","learning","available","interactive"],M={title:"Library/Primitives/Status/Tone Dot",component:m,render:I,tags:["autodocs"],args:{tone:"interactive",pulse:!1},parameters:{docs:{description:{component:"ToneDot centralizes the glowing status dot shape used for mastery indicators, availability, and interactive state. It maps semantic tones to token-backed color and glow values."}}}},{Story:g}=z();var O=r('<div class="story-row svelte-ksssml"><!> <span> </span></div>'),R=r('<div class="tone-item svelte-ksssml"><!> <span> </span></div>'),j=r('<div class="tone-grid svelte-ksssml"></div>'),B=r("<!> <!>",1);function D(i,e){y(e,!1),q();var t=B(),s=A(t);g(s,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-row">
  <ToneDot tone={args.tone} pulse={args.pulse} />
  <span>{args.tone}</span>
</div>`}}});var l=c(s,2);g(l,{name:"All Tones",asChild:!0,children:(v,F)=>{var _=j();E(_,5,()=>L,d=>d,(d,p)=>{var u=R(),f=n(u);{let w=S(()=>a(p)==="available");m(f,{get tone(){return a(p)},get pulse(){return a(w)}})}var b=c(f,2),k=n(b);T(()=>h(k,a(p))),o(d,u)}),o(v,_)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="tone-grid">
  {#each tones as tone (tone)}
    <div class="tone-item">
      <ToneDot {tone} pulse={tone === 'available'} />
      <span>{tone}</span>
    </div>
  {/each}
</div>`}}}),o(i,t),C()}D.__docgen={data:[],name:"ToneDot.stories.svelte"};const $=P(D,M),U=["Default","AllTones"],V={...$.Default,tags:["svelte-csf-v5"]},W={...$.AllTones,tags:["svelte-csf-v5"]};export{W as AllTones,V as Default,U as __namedExportsOrder,M as default};
