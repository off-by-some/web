import{n as i,a as s,f as c,c as l,p as d,d as m}from"./iframe-4rsxrbdW.js";import{c as p,i as h,d as f}from"./create-runtime-stories-PqbrM_Eu.js";import{C as a}from"./ContactMethodCard-DBBsVU_t.js";import{h as u}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./Card-DIxm0Ckv.js";import"./svelte-element-TtRlS_wt.js";import"./attributes-BGut-Y-k.js";import"./pressable-D8AtzM9Q.js";import"./IconTile-St9tH-VY.js";import"./Image-S0aYW34X.js";import"./each-CmLH2FJr.js";import"./this-Djey47U0.js";import"./paths-CgaaNJ_6.js";const g=(e,t=i)=>{var o=C(),n=l(o);a(n,{get href(){return t().href},get type(){return t().type},get label(){return t().label},get value(){return t().value},get imagePath(){return t().imagePath},get description(){return t().description},onclick:()=>console.log("Contact method clicked")}),s(e,o)},v={title:"Library/Site/Contact/Contact Method Card",component:a,render:g,tags:["autodocs"],args:{href:"https://github.com/off-by-some",type:"github",label:"GitHub",value:"@off-by-some",imagePath:"svg/github_brand_icon.svg",description:"View my code"},argTypes:{...u(["href","type"]),label:{control:"text"},value:{control:"text"},imagePath:{control:"text"},description:{control:"text"}},parameters:{docs:{description:{component:"One card layout for every contact channel — email, LinkedIn, GitHub, calendar — so a new channel only needs new content, not new hover or focus styling."}}}},{Story:y}=f();var C=c('<div class="story-width svelte-1ayd325"><!></div>');function r(e,t){d(t,!1),h(),y(e,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <ContactMethodCard
    href={args.href}
    type={args.type}
    label={args.label}
    value={args.value}
    imagePath={args.imagePath}
    description={args.description}
    onclick={() => console.log('Contact method clicked')}
  />
</div>`}}}),m()}r.__docgen={data:[],name:"ContactMethodCard.stories.svelte"};const _=p(r,v),I=["Default"],R={..._.Default,tags:["svelte-csf-v5"]};export{R as Default,I as __namedExportsOrder,v as default};
