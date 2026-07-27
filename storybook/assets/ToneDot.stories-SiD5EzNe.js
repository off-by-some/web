import{n as x,t as T,a as o,f as r,d as c,c as n,p as y,e as A,b as C,k as h,g as a,h as S}from"./iframe-DeC7x6UV.js";import{c as P,d as q}from"./create-runtime-stories-Bct099J7.js";import{T as m}from"./ToneDot-CG4pPXWp.js";import{e as z}from"./each-BOawckNi.js";import{i as E}from"./lifecycle-S0Yv-zRo.js";import"./preload-helper-k3ZeA0S-.js";import"./class-DwhYdrYt.js";const I=(i,e=x)=>{var t=O(),s=n(t);m(s,{get tone(){return e().tone},get pulse(){return e().pulse}});var l=c(s,2),v=n(l);T(()=>h(v,e().tone)),o(i,t)},L=["expert","advanced","proficient","learning","available","interactive"],M={title:"Library/Primitives/Status/Tone Dot",component:m,render:I,tags:["autodocs"],args:{tone:"interactive",pulse:!1},parameters:{docs:{description:{component:"ToneDot centralizes the glowing status dot shape used for mastery indicators, availability, and interactive state. It maps semantic tones to token-backed color and glow values."}}}},{Story:g}=q();var O=r('<div class="story-row svelte-ksssml"><!> <span> </span></div>'),R=r('<div class="tone-item svelte-ksssml"><!> <span> </span></div>'),j=r('<div class="tone-grid svelte-ksssml"></div>'),B=r("<!> <!>",1);function D(i,e){y(e,!1),E();var t=B(),s=A(t);g(s,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-row">
  <ToneDot tone={args.tone} pulse={args.pulse} />
  <span>{args.tone}</span>
</div>`}}});var l=c(s,2);g(l,{name:"All Tones",asChild:!0,children:(v,F)=>{var _=j();z(_,5,()=>L,d=>d,(d,p)=>{var f=R(),u=n(f);{let w=S(()=>a(p)==="available");m(u,{get tone(){return a(p)},get pulse(){return a(w)}})}var b=c(u,2),k=n(b);T(()=>h(k,a(p))),o(d,f)}),o(v,_)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="tone-grid">
  {#each tones as tone (tone)}
    <div class="tone-item">
      <ToneDot {tone} pulse={tone === 'available'} />
      <span>{tone}</span>
    </div>
  {/each}
</div>`}}}),o(i,t),C()}D.__docgen={data:[],name:"ToneDot.stories.svelte"};const $=P(D,M),V=["Default","AllTones"],W={...$.Default,tags:["svelte-csf-v5"]},X={...$.AllTones,tags:["svelte-csf-v5"]};export{X as AllTones,W as Default,V as __namedExportsOrder,M as default};
