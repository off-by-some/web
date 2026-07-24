import{n as y,e as T,a as o,f as r,s as c,c as n,p as k,h as A,d as C,g as h,m as a,F as S}from"./iframe-BVUC6E54.js";import{c as P,i as q,d as z}from"./create-runtime-stories-Cp6wAVFG.js";import{T as m}from"./ToneDot-B0OHSga2.js";import{e as E}from"./each-X1efffkY.js";import"./preload-helper-k3ZeA0S-.js";const F=(l,e=y)=>{var t=M(),s=n(t);m(s,{get tone(){return e().tone},get pulse(){return e().pulse}});var i=c(s,2),v=n(i);T(()=>h(v,e().tone)),o(l,t)},I=["expert","advanced","proficient","learning","available","interactive"],L={title:"Library/Primitives/Status/Tone Dot",component:m,render:F,tags:["autodocs"],args:{tone:"interactive",pulse:!1},parameters:{docs:{description:{component:"ToneDot centralizes the glowing status dot shape used for mastery indicators, availability, and interactive state. It maps semantic tones to token-backed color and glow values."}}}},{Story:g}=z();var M=r('<div class="story-row svelte-ksssml"><!> <span> </span></div>'),O=r('<div class="tone-item svelte-ksssml"><!> <span> </span></div>'),R=r('<div class="tone-grid svelte-ksssml"></div>'),j=r("<!> <!>",1);function D(l,e){k(e,!1),q();var t=j(),s=A(t);g(s,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-row">
  <ToneDot tone={args.tone} pulse={args.pulse} />
  <span>{args.tone}</span>
</div>`}}});var i=c(s,2);g(i,{name:"All Tones",asChild:!0,children:(v,B)=>{var _=R();E(_,5,()=>I,d=>d,(d,p)=>{var u=O(),f=n(u);{let x=S(()=>a(p)==="available");m(f,{get tone(){return a(p)},get pulse(){return a(x)}})}var b=c(f,2),w=n(b);T(()=>h(w,a(p))),o(d,u)}),o(v,_)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="tone-grid">
  {#each tones as tone (tone)}
    <div class="tone-item">
      <ToneDot {tone} pulse={tone === 'available'} />
      <span>{tone}</span>
    </div>
  {/each}
</div>`}}}),o(l,t),C()}D.__docgen={data:[],name:"ToneDot.stories.svelte"};const $=P(D,L),Q=["Default","AllTones"],U={...$.Default,tags:["svelte-csf-v5"]},V={...$.AllTones,tags:["svelte-csf-v5"]};export{V as AllTones,U as Default,Q as __namedExportsOrder,L as default};
