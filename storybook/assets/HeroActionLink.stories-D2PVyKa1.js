import{n as h,h as f,a as s,f as l,c as d,p as g,b as m,s as b,d as u}from"./iframe-2qmlH2sq.js";import{c as _,i as v,d as k,s as y}from"./create-runtime-stories-BvE61y3P.js";import{H as i}from"./HeroActionLink-BqyI58c2.js";import{h as C}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./Button-CXv5nzga.js";import"./svelte-element-Bpoiizc8.js";import"./attributes-FIS9lIlx.js";import"./pressable-D8AtzM9Q.js";import"./paths-DA1abpE1.js";const H=(t,e=h)=>{var r=A();let o;var n=d(r);i(n,{get href(){return e().href},get label(){return e().label},get icon(){return e().icon},get shape(){return e().shape},target:"_blank",rel:"noopener noreferrer",onclick:()=>console.log("Hero action clicked")}),f(()=>o=y(r,1,"story-shell svelte-1wf3lfg",null,o,{"story-corner":e().shape==="corner"})),s(t,r)},w={title:"Library/Site/Hero/Action Link",component:i,render:H,tags:["autodocs"],args:{href:"https://github.com/off-by-some",label:"Open GitHub profile",icon:"github",shape:"circle"},argTypes:{...C(["href","download","target","rel"]),label:{control:{type:"text"}},icon:{control:{type:"select"},options:["github","linkedin","download","arrow"]},shape:{control:{type:"select"},options:["circle","label","corner"]}},parameters:{docs:{description:{component:"Reusable hero action link for the circular social controls, resume download button, text-arrow contact CTA, and the expanding project link in the corner. This keeps the hero action language centralized instead of restyling each link separately."}}}},{Story:a}=k();var A=l("<div><!></div>"),L=l("<!> <!>",1);function c(t,e){g(e,!1),v();var r=L(),o=m(r);a(o,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class:story-corner={args.shape === 'corner'} class="story-shell">
  <HeroActionLink
    href={args.href}
    label={args.label}
    icon={args.icon}
    shape={args.shape}
    target="_blank"
    rel="noopener noreferrer"
    onclick={() => console.log('Hero action clicked')}
  />
</div>`}}});var n=b(o,2);a(n,{name:"Corner",args:{href:"https://github.com/off-by-some/web",label:"Check out this project on GitHub",icon:"github",shape:"corner"},parameters:{__svelteCsf:{rawCode:`<div class:story-corner={args.shape === 'corner'} class="story-shell">
  <HeroActionLink
    href={args.href}
    label={args.label}
    icon={args.icon}
    shape={args.shape}
    target="_blank"
    rel="noopener noreferrer"
    onclick={() => console.log('Hero action clicked')}
  />
</div>`}}}),s(t,r),u()}c.__docgen={data:[],name:"HeroActionLink.stories.svelte"};const p=_(c,w),E=["Default","Corner"],M={...p.Default,tags:["svelte-csf-v5"]},q={...p.Corner,tags:["svelte-csf-v5"]};export{q as Corner,M as Default,E as __namedExportsOrder,w as default};
