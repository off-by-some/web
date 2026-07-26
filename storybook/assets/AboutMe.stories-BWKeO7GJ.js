import{i as C,a as g,c as u,s as d,f as y,n as P,p as F,b as M,g as l,d as V,e as s}from"./iframe-B7k5r1i8.js";import{c as D,i as E,d as I}from"./create-runtime-stories-B-V5fa9q.js";import{S as q}from"./Section-CXlkS9Nr.js";import{H as j}from"./HeroPortrait-C43UgWVs.js";import{H as G}from"./HeroProfile-CRoKMP61.js";import{H as N}from"./HeroValue-DO2k9m4Y.js";import{S as O}from"./ScrollIndicator-_MFQYAA1.js";import{c as H}from"./en-DQ6e60PE.js";import{V as R,s as v,a as b}from"./ViewportFrame-Dq-K9J9K.js";import{h as z}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./attributes-B8kKt70b.js";import"./each-COoGI0cM.js";import"./Image-3h-u6nJv.js";import"./this-DHVTOJma.js";import"./paths-BVgFyWr9.js";import"./HeroActionLink-CGXjizfy.js";import"./Button-B7n6Ca3Z.js";import"./svelte-element-agrdmvP5.js";import"./pressable-D8AtzM9Q.js";var J=y('<div class="hero__canvas" id="hero-canvas-container" aria-hidden="true"></div>'),K=y('<div class="hero-grid svelte-1obn1xa"><div class="hero-grid__content svelte-1obn1xa"><!> <!></div> <div class="hero-grid__portrait svelte-1obn1xa"><!></div></div>'),Q=y('<section class="hero svelte-1obn1xa" id="about" role="main" aria-labelledby="profile-name" data-section="about-me"><!> <!> <!></section>');function f(a,e){var i=Q(),o=u(i);{var c=r=>{var h=J();g(r,h)};C(o,r=>{e.showCanvasBackground&&r(c)})}var p=d(o,2);q(p,{className:"hero__container",children:(r,h)=>{var w=K(),A=u(w),_=u(A);G(_,{get greeting(){return e.greeting},get name(){return e.name},get role(){return e.role}});var B=d(_,2);N(B,{get headline(){return e.valueHeadline},get headlineEmphasis(){return e.valueHeadlineEmphasis},get description(){return e.valueDescription},get primaryButtonText(){return e.primaryButtonText},get exploreLinkText(){return e.exploreLinkText},get linkedinUrl(){return e.linkedinUrl},get githubUrl(){return e.githubUrl},repoUrl:"https://github.com/off-by-some/web",get resumeHref(){return e.resumeHref},get resumeFilename(){return e.resumeFilename},get onPrimaryAction(){return e.onPrimaryAction},get onExploreClick(){return e.onScrollIndicator}});var L=d(A,2),U=u(L);j(U,{get avatarSrc(){return e.avatarSrc},get avatarAlt(){return e.avatarAlt},get annotations(){return e.portraitAnnotations}}),g(r,w)},$$slots:{default:!0}});var n=d(p,2);O(n,{get text(){return e.scrollText},get ariaLabel(){return e.scrollAriaLabel},get onclick(){return e.onScrollIndicator}}),g(a,i)}f.__docgen={data:[{name:"greeting",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"name",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"role",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"valueHeadline",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"valueHeadlineEmphasis",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"object",text:"{ primary?: string | undefined; accent?: string | undefined; }"},static:!1,readonly:!1},{name:"valueDescription",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"avatarSrc",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"avatarAlt",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"primaryButtonText",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"exploreLinkText",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"linkedinUrl",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"githubUrl",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"resumeHref",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"resumeFilename",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"scrollText",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"showCanvasBackground",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1},{name:"scrollAriaLabel",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"portraitAnnotations",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"array",text:"{ label: string; }[]"},static:!1,readonly:!1},{name:"onPrimaryAction",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"() => void"},static:!1,readonly:!1},{name:"onScrollIndicator",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"() => void"},static:!1,readonly:!1}],name:"AboutMe.svelte"};const W=(a,e=P)=>{R(a,{get mode(){return e().previewViewport},children:(i,o)=>{f(i,{get greeting(){return e().greeting},get name(){return e().name},get role(){return e().role},get valueHeadline(){return e().valueHeadline},get valueHeadlineEmphasis(){return e().valueHeadlineEmphasis},get valueDescription(){return e().valueDescription},get avatarSrc(){return e().avatarSrc},get avatarAlt(){return e().avatarAlt},get primaryButtonText(){return e().primaryButtonText},get exploreLinkText(){return e().exploreLinkText},get linkedinUrl(){return e().linkedinUrl},get githubUrl(){return e().githubUrl},get resumeHref(){return e().resumeHref},get resumeFilename(){return e().resumeFilename},get scrollText(){return e().scrollText},get showCanvasBackground(){return e().showCanvasBackground},get scrollAriaLabel(){return e().scrollAriaLabel},get portraitAnnotations(){return e().portraitAnnotations},onPrimaryAction:()=>console.log("Primary action"),onScrollIndicator:()=>console.log("Scroll indicator clicked")})},$$slots:{default:!0}})},T=H.contactMe.methods,t=H.aboutMe,X=T.find(a=>a.type==="linkedin")?.href,Y=T.find(a=>a.type==="github")?.href,m={greeting:t.greeting,name:t.name,role:t.role,valueHeadline:t.valueHeadline,valueHeadlineEmphasis:t.valueHeadlineEmphasis,valueDescription:t.valueDescription,avatarSrc:t.avatarSrc,avatarAlt:t.avatarAlt,primaryButtonText:t.primaryButtonText,exploreLinkText:t.exploreLinkText,linkedinUrl:X,githubUrl:Y,resumeHref:"/resume/Cassidy-Bridges-Software-Engineering.pdf",resumeFilename:"Cassidy-Bridges-Software-Engineering.pdf",scrollText:t.scrollText,showCanvasBackground:!0,scrollAriaLabel:t.scrollIndicatorAriaLabel,portraitAnnotations:t.portraitAnnotations,previewViewport:"desktop"},Z={title:"Page Sections/About Me",component:f,render:W,tags:["autodocs"],args:m,argTypes:{...z(["avatarAlt","linkedinUrl","githubUrl","resumeHref","resumeFilename","scrollAriaLabel","showCanvasBackground"]),greeting:{control:{type:"text"}},name:{control:{type:"text"}},role:{control:{type:"text"}},valueHeadline:{control:{type:"text"}},valueHeadlineEmphasis:{control:{type:"object"}},valueDescription:{control:{type:"text"}},avatarSrc:{control:{type:"text"}},primaryButtonText:{control:{type:"text"}},exploreLinkText:{control:{type:"text"}},scrollText:{control:{type:"text"}},portraitAnnotations:{control:{type:"object"},description:"Desktop-only callouts rendered around the portrait composition."},previewViewport:{control:"select",options:["mobile","ipad","desktop"],table:{disable:!0}}},parameters:{layout:"fullscreen",docs:{description:{component:"About Me is the opening section of the site: greeting, identity, value proposition, portrait art, social/resume actions, and scroll affordance. The stories below treat it as a full viewport experience because its composition changes meaningfully between phone, tablet, and desktop widths."}}}},{Story:k}=I();var $=y("<!> <!> <!>",1);function S(a,e){F(e,!1),E();var i=$(),o=M(i);{let n=s(()=>({...m,previewViewport:"desktop"})),r=s(()=>b("desktop"));k(o,{name:"Desktop",get args(){return l(n)},get globals(){return v.desktop},parameters:{...l(r),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
  <AboutMe
    greeting={args.greeting}
    name={args.name}
    role={args.role}
    valueHeadline={args.valueHeadline}
    valueHeadlineEmphasis={args.valueHeadlineEmphasis}
    valueDescription={args.valueDescription}
    avatarSrc={args.avatarSrc}
    avatarAlt={args.avatarAlt}
    primaryButtonText={args.primaryButtonText}
    exploreLinkText={args.exploreLinkText}
    linkedinUrl={args.linkedinUrl}
    githubUrl={args.githubUrl}
    resumeHref={args.resumeHref}
    resumeFilename={args.resumeFilename}
    scrollText={args.scrollText}
    showCanvasBackground={args.showCanvasBackground}
    scrollAriaLabel={args.scrollAriaLabel}
    portraitAnnotations={args.portraitAnnotations}
    onPrimaryAction={() => console.log('Primary action')}
    onScrollIndicator={() => console.log('Scroll indicator clicked')}
  />
</ViewportFrame>`}}})}var c=d(o,2);{let n=s(()=>({...m,previewViewport:"mobile"})),r=s(()=>b("mobile"));k(c,{name:"Mobile",get args(){return l(n)},get globals(){return v.mobile},parameters:{...l(r),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
  <AboutMe
    greeting={args.greeting}
    name={args.name}
    role={args.role}
    valueHeadline={args.valueHeadline}
    valueHeadlineEmphasis={args.valueHeadlineEmphasis}
    valueDescription={args.valueDescription}
    avatarSrc={args.avatarSrc}
    avatarAlt={args.avatarAlt}
    primaryButtonText={args.primaryButtonText}
    exploreLinkText={args.exploreLinkText}
    linkedinUrl={args.linkedinUrl}
    githubUrl={args.githubUrl}
    resumeHref={args.resumeHref}
    resumeFilename={args.resumeFilename}
    scrollText={args.scrollText}
    showCanvasBackground={args.showCanvasBackground}
    scrollAriaLabel={args.scrollAriaLabel}
    portraitAnnotations={args.portraitAnnotations}
    onPrimaryAction={() => console.log('Primary action')}
    onScrollIndicator={() => console.log('Scroll indicator clicked')}
  />
</ViewportFrame>`}}})}var p=d(c,2);{let n=s(()=>({...m,previewViewport:"ipad"})),r=s(()=>b("ipad"));k(p,{name:"iPad",get args(){return l(n)},get globals(){return v.ipad},parameters:{...l(r),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
  <AboutMe
    greeting={args.greeting}
    name={args.name}
    role={args.role}
    valueHeadline={args.valueHeadline}
    valueHeadlineEmphasis={args.valueHeadlineEmphasis}
    valueDescription={args.valueDescription}
    avatarSrc={args.avatarSrc}
    avatarAlt={args.avatarAlt}
    primaryButtonText={args.primaryButtonText}
    exploreLinkText={args.exploreLinkText}
    linkedinUrl={args.linkedinUrl}
    githubUrl={args.githubUrl}
    resumeHref={args.resumeHref}
    resumeFilename={args.resumeFilename}
    scrollText={args.scrollText}
    showCanvasBackground={args.showCanvasBackground}
    scrollAriaLabel={args.scrollAriaLabel}
    portraitAnnotations={args.portraitAnnotations}
    onPrimaryAction={() => console.log('Primary action')}
    onScrollIndicator={() => console.log('Scroll indicator clicked')}
  />
</ViewportFrame>`}}})}g(a,i),V()}S.__docgen={data:[],name:"AboutMe.stories.svelte"};const x=D(S,Z),xe=["Desktop","Mobile","IPad"],he={...x.Desktop,tags:["svelte-csf-v5"]},we={...x.Mobile,tags:["svelte-csf-v5"]},Ae={...x.IPad,tags:["svelte-csf-v5"]};export{he as Desktop,Ae as IPad,we as Mobile,xe as __namedExportsOrder,Z as default};
