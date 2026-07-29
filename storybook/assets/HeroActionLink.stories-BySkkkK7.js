import{n as d,b as n,f as a,c as m,p as f,d as h,s as u,e as g}from"./iframe-tmrQQOUJ.js";import{c as b,d as v}from"./create-runtime-stories-CgxwG-ne.js";import{H as i}from"./HeroActionLink-BiSiBs4t.js";import{h as _}from"./controls-B7FSozl-.js";import{i as y}from"./lifecycle-CshwYw4S.js";import"./preload-helper-k3ZeA0S-.js";import"./Button-BcD7hszX.js";import"./svelte-element-CNi0WN0f.js";import"./attributes-CEBRAIqw.js";import"./class-BWDwZskk.js";import"./pressable-D8AtzM9Q.js";import"./paths-B3M7__sZ.js";import"./client-CY1upd4m.js";const k=(r,e=d)=>{var o=A(),t=m(o);i(t,{get href(){return e().href},get label(){return e().label},get icon(){return e().icon},get shape(){return e().shape},onActionRequested:()=>console.log("Hero action requested")}),n(r,o)},C={title:"Component Library/Site/Hero/Action Link",component:i,render:k,tags:["autodocs"],args:{href:"#contact",label:"Let's build something great",icon:"arrow",shape:"label"},argTypes:{..._(["href","download","target","rel","onclick","onActionRequested"]),label:{control:{type:"text"}},icon:{control:{type:"select"},options:["github","linkedin","download","arrow","star","storybook"]},shape:{control:{type:"select"},options:["circle","label"]}},parameters:{docs:{description:{component:"Reusable hero action link for circular social controls, resume download buttons, and text-arrow contact CTAs. This keeps the hero action language centralized instead of restyling each link separately."}}}},{Story:s}=v();var A=a('<div class="story-shell svelte-afxdtv"><!></div>'),H=a("<!> <!>",1);function l(r,e){f(e,!1),y();var o=H(),t=h(o);s(t,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
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
