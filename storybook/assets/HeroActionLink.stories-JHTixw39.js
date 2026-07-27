import{n as d,a,f as n,c as f,p as h,e as m,d as g,b as u}from"./iframe-DeC7x6UV.js";import{c as b,d as v}from"./create-runtime-stories-Bct099J7.js";import{H as i}from"./HeroActionLink-DZ2KtQIh.js";import{h as _}from"./controls-B7FSozl-.js";import{i as y}from"./lifecycle-S0Yv-zRo.js";import"./preload-helper-k3ZeA0S-.js";import"./Button-DJl6_omw.js";import"./svelte-element-qywihgz5.js";import"./attributes-dDjv_PnK.js";import"./class-DwhYdrYt.js";import"./pressable-D8AtzM9Q.js";import"./paths-C17edzKr.js";const k=(r,e=d)=>{var o=C(),t=f(o);i(t,{get href(){return e().href},get label(){return e().label},get icon(){return e().icon},get shape(){return e().shape},onActionRequested:()=>console.log("Hero action requested")}),a(r,o)},A={title:"Library/Site/Hero/Action Link",component:i,render:k,tags:["autodocs"],args:{href:"#contact",label:"Let's build something great",icon:"arrow",shape:"label"},argTypes:{..._(["href","download","target","rel","onclick","onActionRequested"]),label:{control:{type:"text"}},icon:{control:{type:"select"},options:["github","linkedin","download","arrow","star","storybook"]},shape:{control:{type:"select"},options:["circle","label"]}},parameters:{docs:{description:{component:"Reusable hero action link for circular social controls, resume download buttons, and text-arrow contact CTAs. This keeps the hero action language centralized instead of restyling each link separately."}}}},{Story:s}=v();var C=n('<div class="story-shell svelte-1wf3lfg"><!></div>'),H=n("<!> <!>",1);function l(r,e){h(e,!1),y();var o=H(),t=m(o);s(t,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
  <HeroActionLink
    href={args.href}
    label={args.label}
    icon={args.icon}
    shape={args.shape}
    onActionRequested={() => console.log('Hero action requested')}
  />
</div>`}}});var p=g(t,2);s(p,{name:"Circle",args:{href:"https://github.com/off-by-some",label:"Open GitHub profile",icon:"github",shape:"circle"},parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
  <HeroActionLink
    href={args.href}
    label={args.label}
    icon={args.icon}
    shape={args.shape}
    onActionRequested={() => console.log('Hero action requested')}
  />
</div>`}}}),a(r,o),u()}l.__docgen={data:[],name:"HeroActionLink.stories.svelte"};const c=b(l,A),G=["Default","Circle"],M={...c.Default,tags:["svelte-csf-v5"]},j={...c.Circle,tags:["svelte-csf-v5"]};export{j as Circle,M as Default,G as __namedExportsOrder,A as default};
