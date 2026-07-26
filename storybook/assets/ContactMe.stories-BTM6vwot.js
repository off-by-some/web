import{k as v,a as k,h as L,s,f as C,c as m,j as D,n as z,p as R,b as q,g as a,d as N,e as r}from"./iframe-fOSp1g-8.js";import{c as B,i as G,d as O}from"./create-runtime-stories-iiAF5L6N.js";import{S as W}from"./Section-By4BhzYX.js";import{C as H}from"./ContactForm-DVgOrcvJ.js";import{C as J}from"./ContactMethodsPanel-ClcEawvF.js";import{S as K}from"./StatusPill-C8qJu8_b.js";import{c as Q}from"./en-CNkYxWj1.js";import{V as U,s as b,a as p}from"./ViewportFrame-BxMErJ2X.js";import{h as X}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./attributes-CNetG9VL.js";import"./this-CdFe53gN.js";import"./Button-BJceF7O5.js";import"./svelte-element-DYhZs9UK.js";import"./pressable-D8AtzM9Q.js";import"./Card-uSNg7MDJ.js";import"./Dropdown-B4FNjDhp.js";import"./each-AfYBugIQ.js";import"./Input-BAFs7D_e.js";import"./Field-D-BaA7nK.js";import"./index-CaShxTf9.js";import"./ContactMethodCard-WnhfXVFh.js";import"./IconTile-RGFl5Sg5.js";import"./Image-BzOQH6Vn.js";import"./paths-a1BFJcfT.js";import"./ToneDot-yAJBz_xd.js";var Y=C('<div class="contact__container svelte-1pupyzx"><header class="contact__header svelte-1pupyzx"><h2 class="contact__title svelte-1pupyzx" id="contact-title"> </h2> <p class="contact__subtitle svelte-1pupyzx"> </p> <!></header> <div class="contact__main svelte-1pupyzx"><!> <!></div></div>'),Z=C('<section class="contact svelte-1pupyzx" id="contact" aria-labelledby="contact-title"><!></section>');function I(c,t){let l=v(t,"title",3,"Lorem Ipsum Dolor"),u=v(t,"subtitle",3,"Lorem ipsum dolor sit amet, consectetur adipiscing elit."),n=v(t,"emailAddress",3,"you@example.com"),h=v(t,"contactMethods",19,()=>[]);var g=Z(),S=m(g);W(S,{className:"contact__content",children:(i,o)=>{var w=Y(),_=m(w),x=m(_),V=m(x),M=s(x,2),A=m(M),E=s(M,2);K(E,{get text(){return t.availabilityText}});var P=s(_,2),F=m(P);H(F,{get emailAddress(){return n()},get content(){return t.formContent},get initialFormData(){return t.formInitialData},get initialErrors(){return t.formInitialErrors},get initialSubmitting(){return t.formInitialSubmitting},get initialSubmitSuccess(){return t.formInitialSubmitSuccess},get onFormSubmit(){return t.onFormSubmit}});var j=s(F,2);J(j,{get title(){return t.methodsTitle},get subtitle(){return t.methodsSubtitle},get methods(){return h()},get onMethodClick(){return t.onContactMethodClick}}),L(()=>{D(V,l()),D(A,u())}),k(i,w)},$$slots:{default:!0}}),k(c,g)}I.__docgen={data:[{name:"title",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"Lorem Ipsum Dolor"'},{name:"subtitle",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"Lorem ipsum dolor sit amet, consectetur adipiscing elit."'},{name:"emailAddress",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"you@example.com"'},{name:"contactMethods",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"array",text:"ContactMethod[]"},static:!1,readonly:!1,defaultValue:"[]"},{name:"availabilityText",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"formContent",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"object",text:"{ title: string; subtitle: string; formAriaLabel: string; fields: { nameLabel: string; namePlaceholder: string; emailLabel: string; emailPlaceholder: string; companyLabel: string; companyPlaceholder: string; ... 9 more ...; messagePlaceholder: string; }; ... 6 more ...; emailTemplate: { ...; }; }"},static:!1,readonly:!1},{name:"formInitialData",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"object",text:"Partial<ContactFormData>"},static:!1,readonly:!1},{name:"formInitialErrors",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"object",text:"FormErrors"},static:!1,readonly:!1},{name:"formInitialSubmitting",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1},{name:"formInitialSubmitSuccess",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1},{name:"methodsTitle",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"methodsSubtitle",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"onFormSubmit",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(formData: ContactFormData) => void"},static:!1,readonly:!1},{name:"onContactMethodClick",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(method: ContactMethod) => void"},static:!1,readonly:!1}],name:"ContactMe.svelte"};const $=(c,t=z)=>{U(c,{get mode(){return t().previewViewport},children:(l,u)=>{I(l,{get title(){return t().title},get subtitle(){return t().subtitle},get emailAddress(){return t().emailAddress},get contactMethods(){return t().contactMethods},get availabilityText(){return t().availabilityText},get formContent(){return t().formContent},get methodsTitle(){return t().methodsTitle},get methodsSubtitle(){return t().methodsSubtitle},get formInitialData(){return t().formInitialData},get formInitialErrors(){return t().formInitialErrors},get formInitialSubmitting(){return t().formInitialSubmitting},get formInitialSubmitSuccess(){return t().formInitialSubmitSuccess},onFormSubmit:n=>console.log("Form submitted:",n),onContactMethodClick:n=>console.log("Contact method clicked:",n)})},$$slots:{default:!0}})},e=Q.contactMe,d={title:e.title,subtitle:e.subtitle,emailAddress:e.emailAddress,availabilityText:e.availabilityText,contactMethods:e.methods,formContent:e.contactForm,methodsTitle:e.contactMethodsPanel.title,methodsSubtitle:e.contactMethodsPanel.subtitle,previewViewport:"desktop"},tt={...d,formInitialData:{name:"",email:"cassidy@",subject:"",message:"Too short"},formInitialErrors:{name:e.contactForm.validation.nameRequired,email:e.contactForm.validation.emailInvalid,subject:e.contactForm.validation.subjectRequired,message:e.contactForm.validation.messageTooShort}},et={...d,formInitialData:{name:"Cassidy Bridges",email:"cassidy@example.com",company:"Northstar Labs",budget:"50k-100k",timeline:"2-3-months",subject:"Platform modernization",message:"We need help untangling a frontend platform migration while keeping release velocity steady."},formInitialSubmitting:!0},it={title:"Page Sections/Contact",component:I,render:$,tags:["autodocs"],args:d,argTypes:{...X(["emailAddress"]),title:{control:"text"},subtitle:{control:"text"},availabilityText:{control:"text"},contactMethods:{control:{type:"object"}},formContent:{control:{type:"object"}},methodsTitle:{control:"text"},methodsSubtitle:{control:"text"},previewViewport:{control:"select",options:["mobile","ipad","desktop"],table:{disable:!0}}},parameters:{layout:"fullscreen",docs:{description:{component:"Contact combines the shared availability status, the full contact form, and alternate contact-method cards. Responsive stories show where the two-column desktop layout becomes a stacked mobile flow."}}}},{Story:f}=O();var ot=C("<!> <!> <!> <!> <!>",1);function T(c,t){R(t,!1),G();var l=ot(),u=q(l);{let i=r(()=>({...d,previewViewport:"desktop"})),o=r(()=>p("desktop"));f(u,{name:"Desktop",get args(){return a(i)},get globals(){return b.desktop},parameters:{...a(o),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
  <ContactMe
    title={args.title}
    subtitle={args.subtitle}
    emailAddress={args.emailAddress}
    contactMethods={args.contactMethods}
    availabilityText={args.availabilityText}
    formContent={args.formContent}
    methodsTitle={args.methodsTitle}
    methodsSubtitle={args.methodsSubtitle}
    formInitialData={args.formInitialData}
    formInitialErrors={args.formInitialErrors}
    formInitialSubmitting={args.formInitialSubmitting}
    formInitialSubmitSuccess={args.formInitialSubmitSuccess}
    onFormSubmit={(formData) => console.log('Form submitted:', formData)}
    onContactMethodClick={(method) => console.log('Contact method clicked:', method)}
  />
</ViewportFrame>`}}})}var n=s(u,2);{let i=r(()=>({...d,previewViewport:"mobile"})),o=r(()=>p("mobile"));f(n,{name:"Mobile",get args(){return a(i)},get globals(){return b.mobile},parameters:{...a(o),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
  <ContactMe
    title={args.title}
    subtitle={args.subtitle}
    emailAddress={args.emailAddress}
    contactMethods={args.contactMethods}
    availabilityText={args.availabilityText}
    formContent={args.formContent}
    methodsTitle={args.methodsTitle}
    methodsSubtitle={args.methodsSubtitle}
    formInitialData={args.formInitialData}
    formInitialErrors={args.formInitialErrors}
    formInitialSubmitting={args.formInitialSubmitting}
    formInitialSubmitSuccess={args.formInitialSubmitSuccess}
    onFormSubmit={(formData) => console.log('Form submitted:', formData)}
    onContactMethodClick={(method) => console.log('Contact method clicked:', method)}
  />
</ViewportFrame>`}}})}var h=s(n,2);{let i=r(()=>({...d,previewViewport:"ipad"})),o=r(()=>p("ipad"));f(h,{name:"iPad",get args(){return a(i)},get globals(){return b.ipad},parameters:{...a(o),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
  <ContactMe
    title={args.title}
    subtitle={args.subtitle}
    emailAddress={args.emailAddress}
    contactMethods={args.contactMethods}
    availabilityText={args.availabilityText}
    formContent={args.formContent}
    methodsTitle={args.methodsTitle}
    methodsSubtitle={args.methodsSubtitle}
    formInitialData={args.formInitialData}
    formInitialErrors={args.formInitialErrors}
    formInitialSubmitting={args.formInitialSubmitting}
    formInitialSubmitSuccess={args.formInitialSubmitSuccess}
    onFormSubmit={(formData) => console.log('Form submitted:', formData)}
    onContactMethodClick={(method) => console.log('Contact method clicked:', method)}
  />
</ViewportFrame>`}}})}var g=s(h,2);{let i=r(()=>({...tt,previewViewport:"desktop"})),o=r(()=>p("desktop"));f(g,{name:"Form Errors",get args(){return a(i)},get globals(){return b.desktop},parameters:{...a(o),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
  <ContactMe
    title={args.title}
    subtitle={args.subtitle}
    emailAddress={args.emailAddress}
    contactMethods={args.contactMethods}
    availabilityText={args.availabilityText}
    formContent={args.formContent}
    methodsTitle={args.methodsTitle}
    methodsSubtitle={args.methodsSubtitle}
    formInitialData={args.formInitialData}
    formInitialErrors={args.formInitialErrors}
    formInitialSubmitting={args.formInitialSubmitting}
    formInitialSubmitSuccess={args.formInitialSubmitSuccess}
    onFormSubmit={(formData) => console.log('Form submitted:', formData)}
    onContactMethodClick={(method) => console.log('Contact method clicked:', method)}
  />
</ViewportFrame>`}}})}var S=s(g,2);{let i=r(()=>({...et,previewViewport:"desktop"})),o=r(()=>p("desktop"));f(S,{name:"Form Submitting",get args(){return a(i)},get globals(){return b.desktop},parameters:{...a(o),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
  <ContactMe
    title={args.title}
    subtitle={args.subtitle}
    emailAddress={args.emailAddress}
    contactMethods={args.contactMethods}
    availabilityText={args.availabilityText}
    formContent={args.formContent}
    methodsTitle={args.methodsTitle}
    methodsSubtitle={args.methodsSubtitle}
    formInitialData={args.formInitialData}
    formInitialErrors={args.formInitialErrors}
    formInitialSubmitting={args.formInitialSubmitting}
    formInitialSubmitSuccess={args.formInitialSubmitSuccess}
    onFormSubmit={(formData) => console.log('Form submitted:', formData)}
    onContactMethodClick={(method) => console.log('Contact method clicked:', method)}
  />
</ViewportFrame>`}}})}k(c,l),N()}T.__docgen={data:[],name:"ContactMe.stories.svelte"};const y=B(T,it),Tt=["Desktop","Mobile","IPad","FormErrors","FormSubmitting"],Vt={...y.Desktop,tags:["svelte-csf-v5"]},At={...y.Mobile,tags:["svelte-csf-v5"]},Et={...y.IPad,tags:["svelte-csf-v5"]},Pt={...y.FormErrors,tags:["svelte-csf-v5"]},jt={...y.FormSubmitting,tags:["svelte-csf-v5"]};export{Vt as Desktop,Pt as FormErrors,jt as FormSubmitting,Et as IPad,At as Mobile,Tt as __namedExportsOrder,it as default};
