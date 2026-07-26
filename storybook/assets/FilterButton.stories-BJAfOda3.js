import{n as r,a as i,f as l,c,p as d,b as u}from"./iframe-NmQMUAFk.js";import{c as p,i as m,d as v}from"./create-runtime-stories-s97yaUQ7.js";import{F as n}from"./FilterButton-BjNG_8Ii.js";import"./preload-helper-k3ZeA0S-.js";import"./Button-BeB0LDha.js";import"./svelte-element-DIVtkeEr.js";import"./attributes-Dugq6qa8.js";import"./class-Bw_OhP9U.js";import"./pressable-D8AtzM9Q.js";const f=(e,t=r)=>{var o=b(),s=c(o);n(s,{get label(){return t().label},get count(){return t().count},get icon(){return t().icon},get active(){return t().active},onclick:()=>console.log("Filter selected")}),i(e,o)},g={title:"Library/Site/Skills/Filter Button",component:n,render:f,tags:["autodocs"],args:{label:"All Skills",count:41,icon:"",active:!0},parameters:{docs:{description:{component:'A secondary Button with an active state and count badge layered on — that\'s the entire component. It renders `role="tab"` and `aria-selected`, so it only makes sense inside a `role="tablist"` container the way SkillsSection uses it; dropped in on its own, the ARIA roles would be misleading.'}}}},{Story:_}=v();var b=l('<div class="story-row svelte-gwrzp0"><!></div>');function a(e,t){d(t,!1),m(),_(e,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-row">
  <FilterButton
    label={args.label}
    count={args.count}
    icon={args.icon}
    active={args.active}
    onclick={() => console.log('Filter selected')}
  />
</div>`}}}),u()}a.__docgen={data:[],name:"FilterButton.stories.svelte"};const h=p(a,g),x=["Default"],C={...h.Default,tags:["svelte-csf-v5"]};export{C as Default,x as __namedExportsOrder,g as default};
