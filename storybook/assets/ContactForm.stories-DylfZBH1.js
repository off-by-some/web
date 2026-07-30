import{n as f,b as d,f as u,c as F,p as _,d as D,s as l,e as C}from"./iframe-fuhK6QfV.js";import{c as h,d as y}from"./create-runtime-stories-CYWPN31x.js";import{C as g}from"./ContactForm-BShA7Mgf.js";import{c as p}from"./en-nYwYkc2o.js";import{h as E}from"./controls-B7FSozl-.js";import{i as A}from"./lifecycle-Dgbq_5QQ.js";import"./preload-helper-k3ZeA0S-.js";import"./attributes-B2rWd7RV.js";import"./class-p2RtpSS3.js";import"./this-CIALxHUU.js";import"./Button-DjB5TCo2.js";import"./svelte-element-C_84bX8b.js";import"./pressable-D8AtzM9Q.js";import"./VisuallyHidden-BPQ0vOfs.js";import"./Card-lzMG70Rb.js";import"./Dropdown-DJxJ_K7t.js";import"./each-DqwwYZgk.js";import"./Input-CoIbJoZy.js";import"./Field-C4QGBvvL.js";import"./index-C1gjrNhI.js";const w=(m,t=f)=>{var i=q(),s=F(i);g(s,{get emailAddress(){return t().emailAddress},get content(){return t().content},get initialFormData(){return t().initialFormData},get initialErrors(){return t().initialErrors},get initialSubmitting(){return t().initialSubmitting},get initialSubmitSuccess(){return t().initialSubmitSuccess},onFormSubmit:n=>console.log("Form submitted:",n)}),d(m,i)},a=p.contactMe.contactForm,b={name:"Cassidy Bridges",email:"cassidy@example.com",company:"Northstar Labs",budget:"50k-100k",timeline:"2-3-months",subject:"Platform modernization",message:"We need help untangling a frontend platform migration while keeping release velocity steady."},r={emailAddress:p.contactMe.emailAddress,content:a},j={...r,initialFormData:{name:"",email:"cassidy@",subject:"",message:"Too short"},initialErrors:{name:a.validation.nameRequired,email:a.validation.emailInvalid,subject:a.validation.subjectRequired,message:a.validation.messageTooShort}},$={...r,initialFormData:b,initialSubmitting:!0},V={...r,initialFormData:b,initialSubmitSuccess:!0},k={title:"Component Library/Site/Contact/Contact Form",component:g,render:w,tags:["autodocs"],args:r,argTypes:{...E(["emailAddress"]),content:{control:{type:"object"},description:"Copy, field labels, validation text, options, and mailto template."},initialFormData:{control:{type:"object"},description:"Seed values for state previews and tests."},initialErrors:{control:{type:"object"},description:"Seed validation errors for state previews and tests."},initialSubmitting:{control:"boolean"},initialSubmitSuccess:{control:"boolean"}},parameters:{docs:{description:{component:"Contact Form composes Field, Input, Dropdown, Button, and Card into the real visitor submission flow. The state stories make validation, loading, and success treatments visible without requiring manual form interaction."}}}},{Story:e}=y();var q=u('<div class="story-shell svelte-1qriwp"><!></div>'),x=u("<!> <!> <!> <!>",1);function S(m,t){_(t,!1),A();var i=x(),s=D(i);e(s,{name:"Default",get args(){return r},parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
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
</div>`}}}),d(m,i),C()}S.__docgen={data:[],name:"ContactForm.stories.svelte"};const o=h(S,k),tt=["Default","ValidationErrors","Submitting","Success"],it={...o.Default,tags:["svelte-csf-v5"]},at={...o.ValidationErrors,tags:["svelte-csf-v5"]},rt={...o.Submitting,tags:["svelte-csf-v5"]},st={...o.Success,tags:["svelte-csf-v5"]};export{it as Default,rt as Submitting,st as Success,at as ValidationErrors,tt as __namedExportsOrder,k as default};
