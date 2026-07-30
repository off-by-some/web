import{n as x,a as T,b as o,f as r,s as c,c as n,p as C,d as A,e as S,g as h,h as s,i as k}from"./iframe-fuhK6QfV.js";import{c as P,d as q}from"./create-runtime-stories-CYWPN31x.js";import{T as m}from"./ToneDot-DmTpZjIm.js";import{e as z}from"./each-DqwwYZgk.js";import{i as E}from"./lifecycle-Dgbq_5QQ.js";import"./preload-helper-k3ZeA0S-.js";import"./class-p2RtpSS3.js";const I=(i,e=x)=>{var t=O(),a=n(t);m(a,{get tone(){return e().tone},get pulse(){return e().pulse}});var l=c(a,2),v=n(l);T(()=>h(v,e().tone)),o(i,t)},L=["expert","advanced","proficient","learning","available","interactive"],M={title:"Component Library/Primitives/Status/Tone Dot",component:m,render:I,tags:["autodocs"],args:{tone:"interactive",pulse:!1},parameters:{docs:{description:{component:"ToneDot centralizes the glowing status dot shape used for mastery indicators, availability, and interactive state. It maps semantic tones to token-backed color and glow values."}}}},{Story:g}=q();var O=r('<div class="story-row svelte-11w54y1"><!> <span> </span></div>'),R=r('<div class="tone-item svelte-11w54y1"><!> <span> </span></div>'),j=r('<div class="tone-grid svelte-11w54y1"></div>'),B=r("<!> <!>",1);function D(i,e){C(e,!1),E();var t=B(),a=A(t);g(a,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-row">
  <ToneDot tone={args.tone} pulse={args.pulse} />
  <span>{args.tone}</span>
</div>`}}});var l=c(a,2);g(l,{name:"All Tones",asChild:!0,children:(v,F)=>{var _=j();z(_,5,()=>L,d=>d,(d,p)=>{var f=R(),u=n(f);{let b=k(()=>s(p)==="available");m(u,{get tone(){return s(p)},get pulse(){return s(b)}})}var y=c(u,2),$=n(y);T(()=>h($,s(p))),o(d,f)}),o(v,_)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="tone-grid">
  {#each tones as tone (tone)}
    <div class="tone-item">
      <ToneDot {tone} pulse={tone === 'available'} />
      <span>{tone}</span>
    </div>
  {/each}
</div>`}}}),o(i,t),S()}D.__docgen={data:[],name:"ToneDot.stories.svelte"};const w=P(D,M),V=["Default","AllTones"],W={...w.Default,tags:["svelte-csf-v5"]},X={...w.AllTones,tags:["svelte-csf-v5"]};export{X as AllTones,W as Default,V as __namedExportsOrder,M as default};
