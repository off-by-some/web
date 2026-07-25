import{n as s,a as i,f as l,c,p,d}from"./iframe-CqqkLpEh.js";import{c as f,i as m,d as h}from"./create-runtime-stories-fFAzdfZB.js";import{H as r}from"./HeroActionLink-DbIkEpjh.js";import{h as u}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./Button-DayAAeuZ.js";import"./svelte-element-Br6N7XwX.js";import"./attributes-lXws8_Na.js";import"./pressable-D8AtzM9Q.js";import"./paths--Wxb6G8K.js";const g=(o,e=s)=>{var t=k(),a=c(t);r(a,{get href(){return e().href},get label(){return e().label},get icon(){return e().icon},get shape(){return e().shape},target:"_blank",rel:"noopener noreferrer",onclick:()=>console.log("Hero action clicked")}),i(o,t)},b={title:"Library/Site/Hero/Action Link",component:r,render:g,tags:["autodocs"],args:{href:"https://github.com/off-by-some",label:"Open GitHub profile",icon:"github",shape:"circle"},argTypes:{...u(["href","download","target","rel"]),label:{control:{type:"text"}},icon:{control:{type:"select"},options:["github","linkedin","download","arrow"]},shape:{control:{type:"select"},options:["circle","label"]}},parameters:{docs:{description:{component:"Reusable hero action link for circular social controls, resume download buttons, and text-arrow contact CTAs. This keeps the hero action language centralized instead of restyling each link separately."}}}},{Story:_}=h();var k=l('<div class="story-shell svelte-1wf3lfg"><!></div>');function n(o,e){p(e,!1),m(),_(o,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
  <HeroActionLink
    href={args.href}
    label={args.label}
    icon={args.icon}
    shape={args.shape}
    target="_blank"
    rel="noopener noreferrer"
    onclick={() => console.log('Hero action clicked')}
  />
</div>`}}}),d()}n.__docgen={data:[],name:"HeroActionLink.stories.svelte"};const v=f(n,b),$=["Default"],O={...v.Default,tags:["svelte-csf-v5"]};export{O as Default,$ as __namedExportsOrder,b as default};
