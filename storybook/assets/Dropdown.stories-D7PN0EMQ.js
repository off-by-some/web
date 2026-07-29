import{n as w,b as s,f as c,c as u,p as y,d as D,s as p,e as $}from"./iframe-DLDiJGs9.js";import{c as k,d as C}from"./create-runtime-stories-Bc8tgwji.js";import{D as n}from"./Dropdown-B2oilhsa.js";import{F as L}from"./Field-Dvb_ksFm.js";import{h as S}from"./controls-B7FSozl-.js";import{i as E}from"./lifecycle-Dms2tKSv.js";import"./preload-helper-k3ZeA0S-.js";import"./each-9emWg8qb.js";import"./attributes-BnIK5ZvT.js";import"./class-BN7jOcxs.js";import"./this-DMZGiKmd.js";import"./Input-BXU1gduI.js";const x=(o,e=w)=>{var r=g(),a=u(r);n(a,{get id(){return e().id},get options(){return e().options},get value(){return e().value},get placeholder(){return e().placeholder},get ariaLabel(){return e().ariaLabel},get disabled(){return e().disabled},get error(){return e().error}}),s(o,r)},b=[{value:"discuss",label:"Let's discuss",description:"Custom pricing for unique work"},{value:"under-10k",label:"Under $10K",description:"Small projects and quick fixes"},{value:"25k-50k",label:"$25K - $50K",description:"Complex web applications"}],F={title:"Component Library/Primitives/Forms/Dropdown",component:n,render:x,tags:["autodocs"],args:{id:"storybook-budget",options:b,value:"discuss",placeholder:"Select budget range",ariaLabel:"Select your project budget range",disabled:!1,error:!1},argTypes:{...S(["id","ariaLabel"])},parameters:{docs:{description:{component:"Custom listbox, not a native <select> — needed so each option can carry a description line under its label. That tradeoff only pays off if the keyboard behavior matches what a native select would do: try Arrow Up/Down, Home, End, and Escape here."}}}},{Story:t}=C();var g=c('<div class="story-width svelte-1nhfk08"><!></div>'),j=c("<!> <!> <!>",1);function v(o,e){y(e,!1),E();var r=j(),a=D(r);t(a,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <Dropdown
    id={args.id}
    options={args.options}
    value={args.value}
    placeholder={args.placeholder}
    ariaLabel={args.ariaLabel}
    disabled={args.disabled}
    error={args.error}
  />
</div>`}}});var i=p(a,2);t(i,{name:"Disabled",args:{disabled:!0},parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <Dropdown
    id={args.id}
    options={args.options}
    value={args.value}
    placeholder={args.placeholder}
    ariaLabel={args.ariaLabel}
    disabled={args.disabled}
    error={args.error}
  />
</div>`}}});var m=p(i,2);t(m,{name:"Error",asChild:!0,children:(f,K)=>{var l=g(),h=u(l);L(h,{id:"storybook-budget-error",label:"Budget range",error:"Select a budget range to continue",children:(_,P)=>{n(_,{id:"storybook-budget-error",get options(){return b},value:"",placeholder:"Select budget range",ariaLabel:"Select your project budget range",error:!0})},$$slots:{default:!0}}),s(f,l)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <Field
    id="storybook-budget-error"
    label="Budget range"
    error="Select a budget range to continue"
  >
    <Dropdown
      id="storybook-budget-error"
      {options}
      value=""
      placeholder="Select budget range"
      ariaLabel="Select your project budget range"
      error
    />
  </Field>
</div>`}}}),s(o,r),$()}v.__docgen={data:[],name:"Dropdown.stories.svelte"};const d=k(v,F),J=["Default","Disabled","Error"],N={...d.Default,tags:["svelte-csf-v5"]},Q={...d.Disabled,tags:["svelte-csf-v5"]},V={...d.Error,tags:["svelte-csf-v5"]};export{N as Default,Q as Disabled,V as Error,J as __namedExportsOrder,F as default};
