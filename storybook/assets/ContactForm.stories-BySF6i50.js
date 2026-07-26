import{n as f,a as d,f as u,c as F,p as _,e as D,d as l,b as C}from"./iframe-NmQMUAFk.js";import{c as h,i as y,d as E}from"./create-runtime-stories-s97yaUQ7.js";import{C as g}from"./ContactForm-DRuJrCMn.js";import{c as b}from"./en-DQ6e60PE.js";import{h as A}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./attributes-Dugq6qa8.js";import"./class-Bw_OhP9U.js";import"./this-BR_WVk-G.js";import"./Button-BeB0LDha.js";import"./svelte-element-DIVtkeEr.js";import"./pressable-D8AtzM9Q.js";import"./Card-C8guIco4.js";import"./Dropdown-DUhJVNQj.js";import"./each-CgetZTUB.js";import"./Input-CMCp_vD1.js";import"./Field-BufUCHEG.js";import"./index-CaShxTf9.js";const w=(m,t=f)=>{var i=x(),s=F(i);g(s,{get emailAddress(){return t().emailAddress},get content(){return t().content},get initialFormData(){return t().initialFormData},get initialErrors(){return t().initialErrors},get initialSubmitting(){return t().initialSubmitting},get initialSubmitSuccess(){return t().initialSubmitSuccess},onFormSubmit:n=>console.log("Form submitted:",n)}),d(m,i)},a=b.contactMe.contactForm,S={name:"Cassidy Bridges",email:"cassidy@example.com",company:"Northstar Labs",budget:"50k-100k",timeline:"2-3-months",subject:"Platform modernization",message:"We need help untangling a frontend platform migration while keeping release velocity steady."},r={emailAddress:b.contactMe.emailAddress,content:a},j={...r,initialFormData:{name:"",email:"cassidy@",subject:"",message:"Too short"},initialErrors:{name:a.validation.nameRequired,email:a.validation.emailInvalid,subject:a.validation.subjectRequired,message:a.validation.messageTooShort}},$={...r,initialFormData:S,initialSubmitting:!0},V={...r,initialFormData:S,initialSubmitSuccess:!0},k={title:"Library/Site/Contact/Contact Form",component:g,render:w,tags:["autodocs"],args:r,argTypes:{...A(["emailAddress"]),content:{control:{type:"object"},description:"Copy, field labels, validation text, options, and mailto template."},initialFormData:{control:{type:"object"},description:"Seed values for state previews and tests."},initialErrors:{control:{type:"object"},description:"Seed validation errors for state previews and tests."},initialSubmitting:{control:"boolean"},initialSubmitSuccess:{control:"boolean"}},parameters:{docs:{description:{component:"Contact Form composes Field, Input, Dropdown, Button, and Card into the real visitor submission flow. The state stories make validation, loading, and success treatments visible without requiring manual form interaction."}}}},{Story:e}=E();var x=u('<div class="story-shell svelte-19d5oay"><!></div>'),T=u("<!> <!> <!> <!>",1);function p(m,t){_(t,!1),y();var i=T(),s=D(i);e(s,{name:"Default",get args(){return r},parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
  <ContactForm
    emailAddress={args.emailAddress}
    content={args.content}
    initialFormData={args.initialFormData}
    initialErrors={args.initialErrors}
    initialSubmitting={args.initialSubmitting}
    initialSubmitSuccess={args.initialSubmitSuccess}
    onFormSubmit={(formData) => console.log('Form submitted:', formData)}
  />
</div>`}}});var n=l(s,2);e(n,{name:"Validation Errors",get args(){return j},parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
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
</div>`}}}),d(m,i),C()}p.__docgen={data:[],name:"ContactForm.stories.svelte"};const o=h(p,k),Y=["Default","ValidationErrors","Submitting","Success"],Z={...o.Default,tags:["svelte-csf-v5"]},tt={...o.ValidationErrors,tags:["svelte-csf-v5"]},it={...o.Submitting,tags:["svelte-csf-v5"]},at={...o.Success,tags:["svelte-csf-v5"]};export{Z as Default,it as Submitting,at as Success,tt as ValidationErrors,Y as __namedExportsOrder,k as default};
