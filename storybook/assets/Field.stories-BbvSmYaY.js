import{n as h,a as c,f as g,g as i,h as d,c as _,p as b,e as x,d as u,b as y}from"./iframe-ynTwrY9v.js";import{c as w,d as q}from"./create-runtime-stories-Cs_gFoDz.js";import{F as p}from"./Field-Bt8FZt3Q.js";import{I as C}from"./Input-BE1I-Egt.js";import{d as F}from"./design-notes-CQ-o3Wt1.js";import{h as $}from"./controls-B7FSozl-.js";import{i as E}from"./lifecycle-FyX2_OJh.js";import"./preload-helper-k3ZeA0S-.js";import"./attributes-C7XIz5ua.js";import"./class-BMvqbpx8.js";import"./this-CzEwUqPd.js";const I=(o,e=h)=>{var r=k(),a=_(r);p(a,{get id(){return e().id},get label(){return e().label},get required(){return e().required},get error(){return e().error},get counter(){return e().counter},children:(t,l)=>{{let v=d(()=>!!e().error),f=d(()=>e().as==="textarea"?e().rows:void 0);C(t,{get as(){return e().as},get id(){return e().id},get value(){return e().value},get placeholder(){return e().placeholder},get error(){return i(v)},get rows(){return i(f)}})}},$$slots:{default:!0}}),c(o,r)},W={title:"Library/Primitives/Forms/Field",component:p,render:I,tags:["autodocs"],args:{id:"story-field",label:"Name",required:!0,error:"",value:"Cassidy Bridges",placeholder:"Your full name",counter:"",as:"input",rows:4},argTypes:{...$(["id","errorId","counterId","counterAriaLabel"]),as:{control:"select",options:["input","textarea"]},label:{control:"text"},required:{control:"boolean"},error:{control:"text"},value:{control:"text"},placeholder:{control:"text"},counter:{control:"text"},rows:{control:{type:"number",min:1,max:12}}},parameters:{docs:{description:{component:`Keeps label, required marker, error text, and character counter attached to one control, so a validation error always has an obvious anchor instead of floating text somewhere else on the page. Reference: [W3C cognitive accessibility guidance](${F.cognitive}).`}}}},{Story:s}=q();var k=g('<div class="story-stack svelte-1gp4yj8"><!></div>'),B=g("<!> <!> <!>",1);function m(o,e){b(e,!1),E();var r=B(),a=x(r);s(a,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-stack">
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
</div>`}}}),c(o,r),y()}m.__docgen={data:[],name:"Field.stories.svelte"};const n=w(m,W),T=["Default","WithCounter","Error"],Y={...n.Default,tags:["svelte-csf-v5"]},z={...n.WithCounter,tags:["svelte-csf-v5"]},G={...n.Error,tags:["svelte-csf-v5"]};export{Y as Default,G as Error,z as WithCounter,T as __namedExportsOrder,W as default};
