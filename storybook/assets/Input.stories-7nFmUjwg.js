import{n as f,a as i,f as d,g as _,h as w,c as h,p as x,e as y,d as n,b as C}from"./iframe-D0XqHut-.js";import{c as E,d as I}from"./create-runtime-stories-DCv1MVnw.js";import{I as p}from"./Input-BOQqS7Gx.js";import{d as b}from"./design-notes-CQ-o3Wt1.js";import{h as T}from"./controls-B7FSozl-.js";import{i as $}from"./lifecycle-BAoqiiyn.js";import"./preload-helper-k3ZeA0S-.js";import"./attributes-DU9SPiLX.js";import"./class-DQNO57qW.js";import"./this-BqxzC0Ew.js";const k=(l,e=f)=>{var s=D(),t=h(s);{let o=w(()=>e().as==="textarea"?e().rows:void 0);p(t,{get as(){return e().as},get value(){return e().value},get placeholder(){return e().placeholder},get error(){return e().error},get success(){return e().success},get warning(){return e().warning},get rows(){return _(o)}})}i(l,s)},S={title:"Library/Primitives/Forms/Input",component:p,render:k,tags:["autodocs"],args:{as:"input",value:"Filled value",placeholder:"Type here",error:!1,success:!1,warning:!1,rows:4},argTypes:{...T(["type","filled"]),as:{control:"select",options:["input","textarea"]},value:{control:"text"},placeholder:{control:"text"},error:{control:"boolean"},success:{control:"boolean"},warning:{control:"boolean"},rows:{control:{type:"number",min:1,max:12}}},parameters:{docs:{description:{component:`The text control underneath every Field — the empty, filled, and error states shown here are the same ones Field composes with a label and error message, not a separate visual language. Reference: [W3C Focus Appearance](${b.focusAppearance}).`}}}},{Story:r}=I();var D=d('<div class="story-stack svelte-18vt6go"><!></div>'),W=d("<!> <!> <!> <!> <!> <!>",1);function v(l,e){x(e,!1),$();var s=W(),t=y(s);r(t,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-stack">
  <Input
    as={args.as}
    value={args.value}
    placeholder={args.placeholder}
    error={args.error}
    success={args.success}
    warning={args.warning}
    rows={args.as === 'textarea' ? args.rows : undefined}
  />
</div>`}}});var o=n(t,2);r(o,{name:"Empty",args:{value:""},parameters:{__svelteCsf:{rawCode:`<div class="story-stack">
  <Input
    as={args.as}
    value={args.value}
    placeholder={args.placeholder}
    error={args.error}
    success={args.success}
    warning={args.warning}
    rows={args.as === 'textarea' ? args.rows : undefined}
  />
</div>`}}});var c=n(o,2);r(c,{name:"Error",args:{error:!0,value:"Needs attention",placeholder:"Error input"},parameters:{__svelteCsf:{rawCode:`<div class="story-stack">
  <Input
    as={args.as}
    value={args.value}
    placeholder={args.placeholder}
    error={args.error}
    success={args.success}
    warning={args.warning}
    rows={args.as === 'textarea' ? args.rows : undefined}
  />
</div>`}}});var g=n(c,2);r(g,{name:"Success",args:{success:!0,value:"Looks good"},parameters:{__svelteCsf:{rawCode:`<div class="story-stack">
  <Input
    as={args.as}
    value={args.value}
    placeholder={args.placeholder}
    error={args.error}
    success={args.success}
    warning={args.warning}
    rows={args.as === 'textarea' ? args.rows : undefined}
  />
</div>`}}});var u=n(g,2);r(u,{name:"Warning",args:{warning:!0,value:"Double-check this"},parameters:{__svelteCsf:{rawCode:`<div class="story-stack">
  <Input
    as={args.as}
    value={args.value}
    placeholder={args.placeholder}
    error={args.error}
    success={args.success}
    warning={args.warning}
    rows={args.as === 'textarea' ? args.rows : undefined}
  />
</div>`}}});var m=n(u,2);r(m,{name:"Textarea",args:{as:"textarea",value:"Tell me about your project.",placeholder:"Textarea",rows:4},parameters:{__svelteCsf:{rawCode:`<div class="story-stack">
  <Input
    as={args.as}
    value={args.value}
    placeholder={args.placeholder}
    error={args.error}
    success={args.success}
    warning={args.warning}
    rows={args.as === 'textarea' ? args.rows : undefined}
  />
</div>`}}}),i(l,s),C()}v.__docgen={data:[],name:"Input.stories.svelte"};const a=E(v,S),z=["Default","Empty","Error","Success","Warning","Textarea"],B={...a.Default,tags:["svelte-csf-v5"]},G={...a.Empty,tags:["svelte-csf-v5"]},H={...a.Error,tags:["svelte-csf-v5"]},J={...a.Success,tags:["svelte-csf-v5"]},K={...a.Warning,tags:["svelte-csf-v5"]},Q={...a.Textarea,tags:["svelte-csf-v5"]};export{B as Default,G as Empty,H as Error,J as Success,Q as Textarea,K as Warning,z as __namedExportsOrder,S as default};
