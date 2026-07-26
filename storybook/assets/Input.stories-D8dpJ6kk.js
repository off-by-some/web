import{n as g,a as c,f as i,g as v,e as m,c as f,p as _,b as h,s as l,d as w}from"./iframe-fOSp1g-8.js";import{c as x,i as y,d as T}from"./create-runtime-stories-iiAF5L6N.js";import{I as d}from"./Input-BAFs7D_e.js";import{d as b}from"./design-notes-CQ-o3Wt1.js";import{h as C}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./attributes-CNetG9VL.js";import"./this-CdFe53gN.js";const I=(t,e=g)=>{var r=$(),a=f(r);{let s=m(()=>e().as==="textarea"?e().rows:void 0);d(a,{get as(){return e().as},get value(){return e().value},get placeholder(){return e().placeholder},get error(){return e().error},get success(){return e().success},get warning(){return e().warning},get rows(){return v(s)}})}c(t,r)},E={title:"Library/Primitives/Forms/Input",component:d,render:I,tags:["autodocs"],args:{as:"input",value:"Filled value",placeholder:"Type here",error:!1,success:!1,warning:!1,rows:4},argTypes:{...C(["type","filled"]),as:{control:"select",options:["input","textarea"]},value:{control:"text"},placeholder:{control:"text"},error:{control:"boolean"},success:{control:"boolean"},warning:{control:"boolean"},rows:{control:{type:"number",min:1,max:12}}},parameters:{docs:{description:{component:`The text control underneath every Field — the empty, filled, and error states shown here are the same ones Field composes with a label and error message, not a separate visual language. Reference: [W3C Focus Appearance](${b.focusAppearance}).`}}}},{Story:n}=T();var $=i('<div class="story-stack svelte-18vt6go"><!></div>'),D=i("<!> <!> <!>",1);function u(t,e){_(e,!1),y();var r=D(),a=h(r);n(a,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-stack">
  <Input
    as={args.as}
    value={args.value}
    placeholder={args.placeholder}
    error={args.error}
    success={args.success}
    warning={args.warning}
    rows={args.as === 'textarea' ? args.rows : undefined}
  />
</div>`}}});var s=l(a,2);n(s,{name:"Error",args:{error:!0,value:"Needs attention",placeholder:"Error input"},parameters:{__svelteCsf:{rawCode:`<div class="story-stack">
  <Input
    as={args.as}
    value={args.value}
    placeholder={args.placeholder}
    error={args.error}
    success={args.success}
    warning={args.warning}
    rows={args.as === 'textarea' ? args.rows : undefined}
  />
</div>`}}});var p=l(s,2);n(p,{name:"Textarea",args:{as:"textarea",value:"Tell me about your project.",placeholder:"Textarea",rows:4},parameters:{__svelteCsf:{rawCode:`<div class="story-stack">
  <Input
    as={args.as}
    value={args.value}
    placeholder={args.placeholder}
    error={args.error}
    success={args.success}
    warning={args.warning}
    rows={args.as === 'textarea' ? args.rows : undefined}
  />
</div>`}}}),c(t,r),w()}u.__docgen={data:[],name:"Input.stories.svelte"};const o=x(u,E),M=["Default","Error","Textarea"],N={...o.Default,tags:["svelte-csf-v5"]},O={...o.Error,tags:["svelte-csf-v5"]},P={...o.Textarea,tags:["svelte-csf-v5"]};export{N as Default,O as Error,P as Textarea,M as __namedExportsOrder,E as default};
