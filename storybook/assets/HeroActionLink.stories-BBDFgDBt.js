import{n as d,b as n,f as a,c as m,p as f,d as h,s as u,e as g}from"./iframe-CizSZPhs.js";import{c as b,d as v}from"./create-runtime-stories-qZGdqjtD.js";import{H as i}from"./HeroActionLink-C9kApElN.js";import{h as _}from"./controls-B7FSozl-.js";import{i as y}from"./lifecycle-CZYbCPQ5.js";import"./preload-helper-k3ZeA0S-.js";import"./Button-BIWSimSy.js";import"./svelte-element-B0A3JMz1.js";import"./attributes-CfgYz-0Q.js";import"./class-BdT285uw.js";import"./pressable-D8AtzM9Q.js";import"./paths-BANDXZpd.js";import"./client-BQR8gN4p.js";const k=(r,e=d)=>{var o=A(),t=m(o);i(t,{get href(){return e().href},get label(){return e().label},get icon(){return e().icon},get shape(){return e().shape},onActionRequested:()=>console.log("Hero action requested")}),n(r,o)},C={title:"Component Library/Site/Hero/Action Link",component:i,render:k,tags:["autodocs"],args:{href:"#contact",label:"Let's build something great",icon:"arrow",shape:"label"},argTypes:{..._(["href","download","target","rel","onclick","onActionRequested"]),label:{control:{type:"text"}},icon:{control:{type:"select"},options:["github","linkedin","download","arrow","star","storybook"]},shape:{control:{type:"select"},options:["circle","label"]}},parameters:{docs:{description:{component:"Reusable hero action link for circular social controls, resume download buttons, and text-arrow contact CTAs. This keeps the hero action language centralized instead of restyling each link separately."}}}},{Story:s}=v();var A=a('<div class="story-shell svelte-afxdtv"><!></div>'),H=a("<!> <!>",1);function l(r,e){f(e,!1),y();var o=H(),t=h(o);s(t,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
  <HeroActionLink
    href={args.href}
    label={args.label}
    icon={args.icon}
    shape={args.shape}
    onActionRequested={() => console.log('Hero action requested')}
  />
</div>`}}});var p=u(t,2);s(p,{name:"Circle",args:{href:"https://github.com/off-by-some",label:"Open GitHub profile",icon:"github",shape:"circle"},parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
  <HeroActionLink
    href={args.href}
    label={args.label}
    icon={args.icon}
    shape={args.shape}
    onActionRequested={() => console.log('Hero action requested')}
  />
</div>`}}}),n(r,o),g()}l.__docgen={data:[],name:"HeroActionLink.stories.svelte"};const c=b(l,C),M=["Default","Circle"],j={...c.Default,tags:["svelte-csf-v5"]},B={...c.Circle,tags:["svelte-csf-v5"]};export{B as Circle,j as Default,M as __namedExportsOrder,C as default};
