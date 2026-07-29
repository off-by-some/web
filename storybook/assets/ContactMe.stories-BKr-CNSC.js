import{l as h,a as k,c as v,d as s,f as C,n as A,p as E,e as P,g as a,b as j,h as r}from"./iframe--eitKjQy.js";import{c as L,d as z}from"./create-runtime-stories-D-yTnBRP.js";import{S as R}from"./Section-BPlzYDiy.js";import{C as q}from"./ContactForm-DnNA1WDF.js";import{C as N}from"./ContactMethodsPanel-DIYtBP_v.js";import{S as B}from"./SectionHeader-Dtm5r1OR.js";import{S as G}from"./StatusPill-DXGxFjaJ.js";import{c as H}from"./en-LnIPh7--.js";import{V as O,s as g,a as b}from"./ViewportFrame-CDCLfACi.js";import{h as W}from"./controls-B7FSozl-.js";import{i as J}from"./lifecycle-B1Yf6BtG.js";import"./preload-helper-k3ZeA0S-.js";import"./attributes-Bss4N0R3.js";import"./class-B9Usjill.js";import"./this-BDmGiPdS.js";import"./Button-B4fTYiky.js";import"./svelte-element-BRYU3VQh.js";import"./pressable-D8AtzM9Q.js";import"./VisuallyHidden-oTpaPkFs.js";import"./Card-DICd1Zim.js";import"./Dropdown-DHQtxdS3.js";import"./each-OgVr12J6.js";import"./Input-Z_OZ7XEj.js";import"./Field-CzDDOOnJ.js";import"./index-CaShxTf9.js";import"./ContactMethodCard-C1RPeMSA.js";import"./IconTile-CUu6TCrI.js";import"./Image-Dkkwj6Lt.js";import"./paths-8f8MEkK_.js";import"./Header-BneB8-H9.js";import"./ToneDot-f68MExRW.js";var K=C('<div class="contact__container svelte-1pupyzx"><header class="contact__header svelte-1pupyzx"><!> <!></header> <div class="contact__main svelte-1pupyzx"><!> <!></div></div>'),Q=C('<section class="contact svelte-1pupyzx" id="contact" aria-labelledby="contact-title"><!></section>');function I(d,t){let l=h(t,"title",3,"Lorem Ipsum Dolor"),c=h(t,"subtitle",3,"Lorem ipsum dolor sit amet, consectetur adipiscing elit."),n=h(t,"emailAddress",3,"you@example.com"),y=h(t,"contactMethods",19,()=>[]);var u=Q(),S=v(u);R(S,{className:"contact__content",children:(i,o)=>{var w=K(),_=v(w),x=v(_);B(x,{get title(){return l()},get subtitle(){return c()},titleId:"contact-title",contentClass:"contact__heading"});var D=s(x,2);G(D,{get text(){return t.availabilityText}});var T=s(_,2),F=v(T);q(F,{get emailAddress(){return n()},get content(){return t.formContent},get initialFormData(){return t.formInitialData},get initialErrors(){return t.formInitialErrors},get initialSubmitting(){return t.formInitialSubmitting},get initialSubmitSuccess(){return t.formInitialSubmitSuccess},get onFormSubmit(){return t.onFormSubmit}});var V=s(F,2);N(V,{get title(){return t.methodsTitle},get subtitle(){return t.methodsSubtitle},get methods(){return y()},get onContactRequested(){return t.onContactMethodClick}}),k(i,w)},$$slots:{default:!0}}),k(d,u)}I.__docgen={data:[{name:"title",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"Lorem Ipsum Dolor"'},{name:"subtitle",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"Lorem ipsum dolor sit amet, consectetur adipiscing elit."'},{name:"emailAddress",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"you@example.com"'},{name:"contactMethods",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"array",text:"ContactMethod[]"},static:!1,readonly:!1,defaultValue:"[]"},{name:"availabilityText",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"formContent",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"object",text:"{ title: string; subtitle: string; formAriaLabel: string; fields: { nameLabel: string; namePlaceholder: string; emailLabel: string; emailPlaceholder: string; companyLabel: string; companyPlaceholder: string; ... 9 more ...; messagePlaceholder: string; }; ... 6 more ...; emailTemplate: { ...; }; }"},static:!1,readonly:!1},{name:"formInitialData",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"object",text:"Partial<ContactFormData>"},static:!1,readonly:!1},{name:"formInitialErrors",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"object",text:"FormErrors"},static:!1,readonly:!1},{name:"formInitialSubmitting",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1},{name:"formInitialSubmitSuccess",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1},{name:"methodsTitle",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"methodsSubtitle",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"onFormSubmit",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(formData: ContactFormData) => void"},static:!1,readonly:!1},{name:"onContactMethodClick",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(method: ContactMethod) => void"},static:!1,readonly:!1}],name:"ContactMe.svelte"};const U=(d,t=A)=>{O(d,{get mode(){return t().previewViewport},children:(l,c)=>{I(l,{get title(){return t().title},get subtitle(){return t().subtitle},get emailAddress(){return t().emailAddress},get contactMethods(){return t().contactMethods},get availabilityText(){return t().availabilityText},get formContent(){return t().formContent},get methodsTitle(){return t().methodsTitle},get methodsSubtitle(){return t().methodsSubtitle},get formInitialData(){return t().formInitialData},get formInitialErrors(){return t().formInitialErrors},get formInitialSubmitting(){return t().formInitialSubmitting},get formInitialSubmitSuccess(){return t().formInitialSubmitSuccess},onFormSubmit:n=>console.log("Form submitted:",n),onContactMethodClick:n=>console.log("Contact method clicked:",n)})},$$slots:{default:!0}})},e=H.contactMe,m={title:e.title,subtitle:e.subtitle,emailAddress:e.emailAddress,availabilityText:e.availabilityText,contactMethods:e.methods,formContent:e.contactForm,methodsTitle:e.contactMethodsPanel.title,methodsSubtitle:e.contactMethodsPanel.subtitle,previewViewport:"desktop"},X={...m,formInitialData:{name:"",email:"cassidy@",subject:"",message:"Too short"},formInitialErrors:{name:e.contactForm.validation.nameRequired,email:e.contactForm.validation.emailInvalid,subject:e.contactForm.validation.subjectRequired,message:e.contactForm.validation.messageTooShort}},Y={...m,formInitialData:{name:"Cassidy Bridges",email:"cassidy@example.com",company:"Northstar Labs",budget:"50k-100k",timeline:"2-3-months",subject:"Platform modernization",message:"We need help untangling a frontend platform migration while keeping release velocity steady."},formInitialSubmitting:!0},Z={title:"Page Sections/Contact",component:I,render:U,tags:["autodocs"],args:m,argTypes:{...W(["emailAddress"]),title:{control:"text"},subtitle:{control:"text"},availabilityText:{control:"text"},contactMethods:{control:{type:"object"}},formContent:{control:{type:"object"}},methodsTitle:{control:"text"},methodsSubtitle:{control:"text"},previewViewport:{control:"select",options:["mobile","ipad","desktop"],table:{disable:!0}}},parameters:{layout:"fullscreen",docs:{description:{component:"Contact combines the shared availability status, the full contact form, and alternate contact-method cards. Responsive stories show where the two-column desktop layout becomes a stacked mobile flow."}}}},{Story:p}=z();var $=C("<!> <!> <!> <!> <!>",1);function M(d,t){E(t,!1),J();var l=$(),c=P(l);{let i=r(()=>({...m,previewViewport:"desktop"})),o=r(()=>b("desktop"));p(c,{name:"Desktop",get args(){return a(i)},get globals(){return g.desktop},parameters:{...a(o),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
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
</ViewportFrame>`}}})}var n=s(c,2);{let i=r(()=>({...m,previewViewport:"mobile"})),o=r(()=>b("mobile"));p(n,{name:"Mobile",get args(){return a(i)},get globals(){return g.mobile},parameters:{...a(o),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
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
</ViewportFrame>`}}})}var y=s(n,2);{let i=r(()=>({...m,previewViewport:"ipad"})),o=r(()=>b("ipad"));p(y,{name:"iPad",get args(){return a(i)},get globals(){return g.ipad},parameters:{...a(o),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
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
</ViewportFrame>`}}})}var u=s(y,2);{let i=r(()=>({...X,previewViewport:"desktop"})),o=r(()=>b("desktop"));p(u,{name:"Form Errors",get args(){return a(i)},get globals(){return g.desktop},parameters:{...a(o),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
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
</ViewportFrame>`}}})}var S=s(u,2);{let i=r(()=>({...Y,previewViewport:"desktop"})),o=r(()=>b("desktop"));p(S,{name:"Form Submitting",get args(){return a(i)},get globals(){return g.desktop},parameters:{...a(o),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
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
</ViewportFrame>`}}})}k(d,l),j()}M.__docgen={data:[],name:"ContactMe.stories.svelte"};const f=L(M,Z),Vt=["Desktop","Mobile","IPad","FormErrors","FormSubmitting"],At={...f.Desktop,tags:["svelte-csf-v5"]},Et={...f.Mobile,tags:["svelte-csf-v5"]},Pt={...f.IPad,tags:["svelte-csf-v5"]},jt={...f.FormErrors,tags:["svelte-csf-v5"]},Lt={...f.FormSubmitting,tags:["svelte-csf-v5"]};export{At as Desktop,jt as FormErrors,Lt as FormSubmitting,Pt as IPad,Et as Mobile,Vt as __namedExportsOrder,Z as default};
