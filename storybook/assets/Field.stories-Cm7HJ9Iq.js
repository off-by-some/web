import{n as h,a as c,f as g,g as i,e as d,c as _,p as b,b as x,s as u,d as y}from"./iframe-DmgFrAu9.js";import{c as w,i as q,d as C}from"./create-runtime-stories-jbBq72Oc.js";import{F as p}from"./Field-CfYPcH6X.js";import{I as F}from"./Input-BuZqvIvc.js";import{d as $}from"./design-notes-CQ-o3Wt1.js";import{h as E}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./attributes-B7zwgSRl.js";import"./this-B8V-COpz.js";const I=(o,e=h)=>{var r=k(),a=_(r);p(a,{get id(){return e().id},get label(){return e().label},get required(){return e().required},get error(){return e().error},get counter(){return e().counter},children:(t,l)=>{{let m=d(()=>!!e().error),f=d(()=>e().as==="textarea"?e().rows:void 0);F(t,{get as(){return e().as},get id(){return e().id},get value(){return e().value},get placeholder(){return e().placeholder},get error(){return i(m)},get rows(){return i(f)}})}},$$slots:{default:!0}}),c(o,r)},W={title:"Library/Primitives/Forms/Field",component:p,render:I,tags:["autodocs"],args:{id:"story-field",label:"Name",required:!0,error:"",value:"Cassidy Bridges",placeholder:"Your full name",counter:"",as:"input",rows:4},argTypes:{...E(["id","errorId","counterId","counterAriaLabel"]),as:{control:"select",options:["input","textarea"]},label:{control:"text"},required:{control:"boolean"},error:{control:"text"},value:{control:"text"},placeholder:{control:"text"},counter:{control:"text"},rows:{control:{type:"number",min:1,max:12}}},parameters:{docs:{description:{component:`Keeps label, required marker, error text, and character counter attached to one control, so a validation error always has an obvious anchor instead of floating text somewhere else on the page. Reference: [W3C cognitive accessibility guidance](${$.cognitive}).`}}}},{Story:s}=C();var k=g('<div class="story-stack svelte-1gp4yj8"><!></div>'),B=g("<!> <!> <!>",1);function v(o,e){b(e,!1),q();var r=B(),a=x(r);s(a,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-stack">
  <Field
    id={args.id}
    label={args.label}
    required={args.required}
    error={args.error}
    counter={args.counter}
  >
    <Input
      as={args.as}
      id={args.id}
      value={args.value}
      placeholder={args.placeholder}
      error={Boolean(args.error)}
      rows={args.as === 'textarea' ? args.rows : undefined}
    />
  </Field>
</div>`}}});var t=u(a,2);s(t,{name:"With Counter",args:{id:"story-message",label:"Message",required:!1,value:"A short project note.",placeholder:"Project details",counter:"21 characters",as:"textarea"},parameters:{__svelteCsf:{rawCode:`<div class="story-stack">
  <Field
    id={args.id}
    label={args.label}
    required={args.required}
    error={args.error}
    counter={args.counter}
  >
    <Input
      as={args.as}
      id={args.id}
      value={args.value}
      placeholder={args.placeholder}
      error={Boolean(args.error)}
      rows={args.as === 'textarea' ? args.rows : undefined}
    />
  </Field>
</div>`}}});var l=u(t,2);s(l,{name:"Error",args:{id:"story-error",label:"Email",required:!0,value:"cassidy",placeholder:"you@example.com",error:"Please enter a valid email address"},parameters:{__svelteCsf:{rawCode:`<div class="story-stack">
  <Field
    id={args.id}
    label={args.label}
    required={args.required}
    error={args.error}
    counter={args.counter}
  >
    <Input
      as={args.as}
      id={args.id}
      value={args.value}
      placeholder={args.placeholder}
      error={Boolean(args.error)}
      rows={args.as === 'textarea' ? args.rows : undefined}
    />
  </Field>
</div>`}}}),c(o,r),y()}v.__docgen={data:[],name:"Field.stories.svelte"};const n=w(v,W),N=["Default","WithCounter","Error"],O={...n.Default,tags:["svelte-csf-v5"]},T={...n.WithCounter,tags:["svelte-csf-v5"]},Y={...n.Error,tags:["svelte-csf-v5"]};export{O as Default,Y as Error,T as WithCounter,N as __namedExportsOrder,W as default};
