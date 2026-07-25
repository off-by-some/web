import{n as i,a as n,f as d,c as l,p,d as c}from"./iframe-DmgFrAu9.js";import{c as u,i as m,d as f}from"./create-runtime-stories-jbBq72Oc.js";import{D as o}from"./Dropdown-CdI_kVVf.js";import{h as v}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./each-8IwPPa-j.js";import"./attributes-B7zwgSRl.js";import"./this-B8V-COpz.js";import"./Input-BuZqvIvc.js";const b=(r,e=i)=>{var a=_(),s=l(a);o(s,{get id(){return e().id},get options(){return e().options},get value(){return e().value},get placeholder(){return e().placeholder},get ariaLabel(){return e().ariaLabel},get disabled(){return e().disabled},get error(){return e().error}}),n(r,a)},g=[{value:"discuss",label:"Let's discuss",description:"Custom pricing for unique work"},{value:"under-10k",label:"Under $10K",description:"Small projects and quick fixes"},{value:"25k-50k",label:"$25K - $50K",description:"Complex web applications"}],h={title:"Library/Primitives/Forms/Dropdown",component:o,render:b,tags:["autodocs"],args:{id:"storybook-budget",options:g,value:"discuss",placeholder:"Select budget range",ariaLabel:"Select your project budget range",disabled:!1,error:!1},argTypes:{...v(["id","ariaLabel"])},parameters:{docs:{description:{component:"Custom listbox, not a native <select> — needed so each option can carry a description line under its label. That tradeoff only pays off if the keyboard behavior matches what a native select would do: try Arrow Up/Down, Home, End, and Escape here."}}}},{Story:w}=f();var _=d('<div class="story-width svelte-1ufkktv"><!></div>');function t(r,e){p(e,!1),m(),w(r,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <Dropdown
    id={args.id}
    options={args.options}
    value={args.value}
    placeholder={args.placeholder}
    ariaLabel={args.ariaLabel}
    disabled={args.disabled}
    error={args.error}
  />
</div>`}}}),c()}t.__docgen={data:[],name:"Dropdown.stories.svelte"};const y=u(t,h),j=["Default"],q={...y.Default,tags:["svelte-csf-v5"]};export{q as Default,j as __namedExportsOrder,h as default};
