import{n as f,a as d,f as u,c as F,p as _,b as D,s as l,d as C}from"./iframe-CqqkLpEh.js";import{c as h,i as y,d as E}from"./create-runtime-stories-fFAzdfZB.js";import{C as g}from"./ContactForm-ByLnJZ8E.js";import{c as b}from"./en-CNkYxWj1.js";import{h as A}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./attributes-lXws8_Na.js";import"./this-pTVpboFM.js";import"./Button-DayAAeuZ.js";import"./svelte-element-Br6N7XwX.js";import"./pressable-D8AtzM9Q.js";import"./Card-DTFPb0-8.js";import"./Dropdown-BiekSMM8.js";import"./each-BB_CuqVM.js";import"./Input-iyOLRbyp.js";import"./Field-C-btoAIV.js";import"./index-CaShxTf9.js";const w=(m,t=f)=>{var i=x(),r=F(i);g(r,{get emailAddress(){return t().emailAddress},get content(){return t().content},get initialFormData(){return t().initialFormData},get initialErrors(){return t().initialErrors},get initialSubmitting(){return t().initialSubmitting},get initialSubmitSuccess(){return t().initialSubmitSuccess},onFormSubmit:n=>console.log("Form submitted:",n)}),d(m,i)},a=b.contactMe.contactForm,S={name:"Cassidy Bridges",email:"cassidy@example.com",company:"Northstar Labs",budget:"50k-100k",timeline:"2-3-months",subject:"Platform modernization",message:"We need help untangling a frontend platform migration while keeping release velocity steady."},s={emailAddress:b.contactMe.emailAddress,content:a},j={...s,initialFormData:{name:"",email:"cassidy@",subject:"",message:"Too short"},initialErrors:{name:a.validation.nameRequired,email:a.validation.emailInvalid,subject:a.validation.subjectRequired,message:a.validation.messageTooShort}},$={...s,initialFormData:S,initialSubmitting:!0},V={...s,initialFormData:S,initialSubmitSuccess:!0},k={title:"Library/Site/Contact/Contact Form",component:g,render:w,tags:["autodocs"],args:s,argTypes:{...A(["emailAddress"]),content:{control:{type:"object"},description:"Copy, field labels, validation text, options, and mailto template."},initialFormData:{control:{type:"object"},description:"Seed values for state previews and tests."},initialErrors:{control:{type:"object"},description:"Seed validation errors for state previews and tests."},initialSubmitting:{control:"boolean"},initialSubmitSuccess:{control:"boolean"}},parameters:{docs:{description:{component:"Contact Form composes Field, Input, Dropdown, Button, and Card into the real visitor submission flow. The state stories make validation, loading, and success treatments visible without requiring manual form interaction."}}}},{Story:e}=E();var x=u('<div class="story-shell svelte-19d5oay"><!></div>'),T=u("<!> <!> <!> <!>",1);function p(m,t){_(t,!1),y();var i=T(),r=D(i);e(r,{name:"Default",get args(){return s},parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
  <ContactForm
    emailAddress={args.emailAddress}
    content={args.content}
    initialFormData={args.initialFormData}
    initialErrors={args.initialErrors}
    initialSubmitting={args.initialSubmitting}
    initialSubmitSuccess={args.initialSubmitSuccess}
    onFormSubmit={(formData) => console.log('Form submitted:', formData)}
  />
</div>`}}});var n=l(r,2);e(n,{name:"Validation Errors",get args(){return j},parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
  <ContactForm
    emailAddress={args.emailAddress}
    content={args.content}
    initialFormData={args.initialFormData}
    initialErrors={args.initialErrors}
    initialSubmitting={args.initialSubmitting}
    initialSubmitSuccess={args.initialSubmitSuccess}
    onFormSubmit={(formData) => console.log('Form submitted:', formData)}
  />
</div>`}}});var c=l(n,2);e(c,{name:"Submitting",get args(){return $},parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
  <ContactForm
    emailAddress={args.emailAddress}
    content={args.content}
    initialFormData={args.initialFormData}
    initialErrors={args.initialErrors}
    initialSubmitting={args.initialSubmitting}
    initialSubmitSuccess={args.initialSubmitSuccess}
    onFormSubmit={(formData) => console.log('Form submitted:', formData)}
  />
</div>`}}});var v=l(c,2);e(v,{name:"Success",get args(){return V},parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
  <ContactForm
    emailAddress={args.emailAddress}
    content={args.content}
    initialFormData={args.initialFormData}
    initialErrors={args.initialErrors}
    initialSubmitting={args.initialSubmitting}
    initialSubmitSuccess={args.initialSubmitSuccess}
    onFormSubmit={(formData) => console.log('Form submitted:', formData)}
  />
</div>`}}}),d(m,i),C()}p.__docgen={data:[],name:"ContactForm.stories.svelte"};const o=h(p,k),X=["Default","ValidationErrors","Submitting","Success"],Y={...o.Default,tags:["svelte-csf-v5"]},Z={...o.ValidationErrors,tags:["svelte-csf-v5"]},tt={...o.Submitting,tags:["svelte-csf-v5"]},it={...o.Success,tags:["svelte-csf-v5"]};export{Y as Default,tt as Submitting,it as Success,Z as ValidationErrors,X as __namedExportsOrder,k as default};
