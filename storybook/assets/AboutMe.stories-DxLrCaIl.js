import{i as M,a as p,c as g,s as l,f as m,n as V,p as D,b as L,g as c,d as q,e as d}from"./iframe-D1F28bpV.js";import{c as I,i as F,d as j}from"./create-runtime-stories-PrONI2D_.js";import{S as E}from"./Section-BFSyrwDw.js";import{H as G}from"./HeroMetricsPanel-BupQRDaU.js";import{H as N}from"./HeroProfile-BZFYYAB6.js";import{H as O}from"./HeroTechPanel-I2mtV29H.js";import{H as R}from"./HeroValue-BOYVfQb6.js";import{S as z}from"./ScrollIndicator-Lsnsbp24.js";import{c as v}from"./en-yHqbPdXo.js";import{V as J,s as k,a as b}from"./ViewportFrame-Ddr-Ov_Y.js";import{h as K}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./attributes-DIf9xYaH.js";import"./each-Bff_2BJ9.js";import"./HeroPanel-Bcq6xlSi.js";import"./Card-Ds9VfFnu.js";import"./svelte-element-TL9fle_V.js";import"./pressable-D8AtzM9Q.js";import"./SectionAccentHeader-CYf5CDnG.js";import"./Header-nYRrwE1c.js";import"./StatCard-ZmQvHdPG.js";import"./this-Cp6zX9Mz.js";import"./Image-BvMvdl6w.js";import"./paths-8sWJ7tb4.js";import"./ToneDot-D90hvj69.js";import"./StatusPill-mVY__4ve.js";import"./Button-DiRMLgX4.js";import"./TechCategoryCard-DDNGNpB_.js";import"./HeroActionLink-CXxyKCnh.js";var Q=m('<div class="hero__canvas" id="hero-canvas-container" aria-hidden="true"></div>'),W=m('<div class="hero-grid svelte-1obn1xa"><div class="hero-grid__primary svelte-1obn1xa"><!> <!></div> <div class="hero-grid__secondary svelte-1obn1xa"><!> <!></div></div>'),X=m('<section class="hero svelte-1obn1xa" id="about" role="main" aria-labelledby="profile-name" data-section="about-me"><!> <!> <!></section>');function h(t,e){var i=X(),o=g(i);{var s=a=>{var T=Q();p(a,T)};M(o,a=>{e.showCanvasBackground&&a(s)})}var u=l(o,2);E(u,{className:"hero__container",children:(a,T)=>{var w=W(),_=g(w),S=g(_);N(S,{get name(){return e.name},get role(){return e.role},get statusText(){return e.statusText},get avatarSrc(){return e.avatarSrc},get avatarAlt(){return e.avatarAlt},get onclick(){return e.onAvatarClick}});var B=l(S,2);R(B,{get headline(){return e.valueHeadline},get description(){return e.valueDescription},get primaryButtonText(){return e.primaryButtonText},get linkedinUrl(){return e.linkedinUrl},get githubUrl(){return e.githubUrl},repoUrl:"https://github.com/off-by-some/web",get resumeHref(){return e.resumeHref},get resumeFilename(){return e.resumeFilename},get onPrimaryAction(){return e.onPrimaryAction}});var U=l(_,2),A=g(U);G(A,{get stats(){return e.stats},get title(){return e.metricsTitle}});var P=l(A,2);O(P,{get techStack(){return e.techStack},get title(){return e.techTitle},get onCategoryClick(){return e.onTechCategoryClick}}),p(a,w)},$$slots:{default:!0}});var n=l(u,2);z(n,{get text(){return e.scrollText},get ariaLabel(){return e.scrollAriaLabel},get onclick(){return e.onScrollIndicator}}),p(t,i)}h.__docgen={data:[{name:"name",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"role",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"statusText",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"valueHeadline",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"valueDescription",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"avatarSrc",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"avatarAlt",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"primaryButtonText",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"linkedinUrl",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"githubUrl",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"resumeHref",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"resumeFilename",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"scrollText",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"showCanvasBackground",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1},{name:"metricsTitle",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"techTitle",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"scrollAriaLabel",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"stats",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"array",text:'{ count: string; label: string; type: "years" | "scale" | "reliability" | "performance" | "languages"; }[]'},static:!1,readonly:!1},{name:"techStack",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"array",text:'{ title: string; level: "expert" | "advanced"; technologies: string[]; }[]'},static:!1,readonly:!1},{name:"onPrimaryAction",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"() => void"},static:!1,readonly:!1},{name:"onScrollIndicator",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"() => void"},static:!1,readonly:!1},{name:"onTechCategoryClick",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(category: string) => void"},static:!1,readonly:!1},{name:"onAvatarClick",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"() => void"},static:!1,readonly:!1}],name:"AboutMe.svelte"};const Y=(t,e=V)=>{J(t,{get mode(){return e().previewViewport},children:(i,o)=>{h(i,{get name(){return e().name},get role(){return e().role},get statusText(){return e().statusText},get valueHeadline(){return e().valueHeadline},get valueDescription(){return e().valueDescription},get avatarSrc(){return e().avatarSrc},get avatarAlt(){return e().avatarAlt},get primaryButtonText(){return e().primaryButtonText},get linkedinUrl(){return e().linkedinUrl},get githubUrl(){return e().githubUrl},get resumeHref(){return e().resumeHref},get scrollText(){return e().scrollText},get showCanvasBackground(){return e().showCanvasBackground},get metricsTitle(){return e().metricsTitle},get techTitle(){return e().techTitle},get scrollAriaLabel(){return e().scrollAriaLabel},get stats(){return e().stats},get techStack(){return e().techStack},onPrimaryAction:()=>console.log("Primary action"),onScrollIndicator:()=>console.log("Scroll indicator clicked"),onTechCategoryClick:s=>console.log("Tech category clicked:",s)})},$$slots:{default:!0}})},C=v.contactMe.methods,Z=v.skillsSection.categories,$=v.timelineSection.experiences.length,r=v.aboutMe,ee=C.find(t=>t.type==="linkedin")?.href,te=C.find(t=>t.type==="github")?.href,re=r.stats.map(t=>({type:t.type,label:t.label,count:"count"in t&&t.count?t.count:String($)})),ae=Z.map(t=>({title:t.name,level:t.mastery,technologies:t.skills.map(e=>e.name).sort((e,i)=>e.length-i.length)})),y={name:r.name,role:r.role,statusText:r.statusText,valueHeadline:r.valueHeadline,valueDescription:r.valueDescription,avatarSrc:r.avatarSrc,avatarAlt:r.avatarAlt,primaryButtonText:r.primaryButtonText,linkedinUrl:ee,githubUrl:te,resumeHref:"/resume/Cassidy-Bridges-Software-Engineering.pdf",scrollText:r.scrollText,showCanvasBackground:!0,metricsTitle:r.metricsTitle,techTitle:r.techTitle,scrollAriaLabel:r.scrollIndicatorAriaLabel,stats:re,techStack:ae,previewViewport:"desktop"},ie={title:"Page Sections/About Me",component:h,render:Y,tags:["autodocs"],args:y,argTypes:{...K(["avatarAlt","linkedinUrl","githubUrl","resumeHref","scrollAriaLabel","showCanvasBackground"]),name:{control:{type:"text"}},role:{control:{type:"text"}},statusText:{control:{type:"text"}},valueHeadline:{control:{type:"text"}},valueDescription:{control:{type:"text"}},avatarSrc:{control:{type:"text"}},primaryButtonText:{control:{type:"text"}},scrollText:{control:{type:"text"}},metricsTitle:{control:{type:"text"}},techTitle:{control:{type:"text"}},stats:{control:{type:"object"},description:"Metric tiles rendered in order. Type selects the visual treatment."},techStack:{control:{type:"object"},description:"Technology groups rendered in order. Level controls the status treatment on each group."},previewViewport:{control:"select",options:["mobile","ipad","desktop"],table:{disable:!0}}},parameters:{layout:"fullscreen",docs:{description:{component:"About Me is the opening section of the site: profile, role signal, value proposition, social/resume actions, key metrics, and technology groups. The stories below treat it as a full viewport experience because its composition changes meaningfully between phone, tablet, and desktop widths."}}}},{Story:f}=j();var ne=m("<!> <!> <!>",1);function H(t,e){D(e,!1),F();var i=ne(),o=L(i);{let n=d(()=>({...y,previewViewport:"desktop"})),a=d(()=>b("desktop"));f(o,{name:"Desktop",get args(){return c(n)},get globals(){return k.desktop},parameters:{...c(a),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
  <AboutMe
    name={args.name}
    role={args.role}
    statusText={args.statusText}
    valueHeadline={args.valueHeadline}
    valueDescription={args.valueDescription}
    avatarSrc={args.avatarSrc}
    avatarAlt={args.avatarAlt}
    primaryButtonText={args.primaryButtonText}
    linkedinUrl={args.linkedinUrl}
    githubUrl={args.githubUrl}
    resumeHref={args.resumeHref}
    scrollText={args.scrollText}
    showCanvasBackground={args.showCanvasBackground}
    metricsTitle={args.metricsTitle}
    techTitle={args.techTitle}
    scrollAriaLabel={args.scrollAriaLabel}
    stats={args.stats}
    techStack={args.techStack}
    onPrimaryAction={() => console.log('Primary action')}
    onScrollIndicator={() => console.log('Scroll indicator clicked')}
    onTechCategoryClick={(category) => console.log('Tech category clicked:', category)}
  />
</ViewportFrame>`}}})}var s=l(o,2);{let n=d(()=>({...y,previewViewport:"mobile"})),a=d(()=>b("mobile"));f(s,{name:"Mobile",get args(){return c(n)},get globals(){return k.mobile},parameters:{...c(a),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
  <AboutMe
    name={args.name}
    role={args.role}
    statusText={args.statusText}
    valueHeadline={args.valueHeadline}
    valueDescription={args.valueDescription}
    avatarSrc={args.avatarSrc}
    avatarAlt={args.avatarAlt}
    primaryButtonText={args.primaryButtonText}
    linkedinUrl={args.linkedinUrl}
    githubUrl={args.githubUrl}
    resumeHref={args.resumeHref}
    scrollText={args.scrollText}
    showCanvasBackground={args.showCanvasBackground}
    metricsTitle={args.metricsTitle}
    techTitle={args.techTitle}
    scrollAriaLabel={args.scrollAriaLabel}
    stats={args.stats}
    techStack={args.techStack}
    onPrimaryAction={() => console.log('Primary action')}
    onScrollIndicator={() => console.log('Scroll indicator clicked')}
    onTechCategoryClick={(category) => console.log('Tech category clicked:', category)}
  />
</ViewportFrame>`}}})}var u=l(s,2);{let n=d(()=>({...y,previewViewport:"ipad"})),a=d(()=>b("ipad"));f(u,{name:"iPad",get args(){return c(n)},get globals(){return k.ipad},parameters:{...c(a),__svelteCsf:{rawCode:`<ViewportFrame mode={args.previewViewport}>
  <AboutMe
    name={args.name}
    role={args.role}
    statusText={args.statusText}
    valueHeadline={args.valueHeadline}
    valueDescription={args.valueDescription}
    avatarSrc={args.avatarSrc}
    avatarAlt={args.avatarAlt}
    primaryButtonText={args.primaryButtonText}
    linkedinUrl={args.linkedinUrl}
    githubUrl={args.githubUrl}
    resumeHref={args.resumeHref}
    scrollText={args.scrollText}
    showCanvasBackground={args.showCanvasBackground}
    metricsTitle={args.metricsTitle}
    techTitle={args.techTitle}
    scrollAriaLabel={args.scrollAriaLabel}
    stats={args.stats}
    techStack={args.techStack}
    onPrimaryAction={() => console.log('Primary action')}
    onScrollIndicator={() => console.log('Scroll indicator clicked')}
    onTechCategoryClick={(category) => console.log('Tech category clicked:', category)}
  />
</ViewportFrame>`}}})}p(t,i),q()}H.__docgen={data:[],name:"AboutMe.stories.svelte"};const x=I(H,ie),Le=["Desktop","Mobile","IPad"],qe={...x.Desktop,tags:["svelte-csf-v5"]},Ie={...x.Mobile,tags:["svelte-csf-v5"]},Fe={...x.IPad,tags:["svelte-csf-v5"]};export{qe as Desktop,Fe as IPad,Ie as Mobile,Le as __namedExportsOrder,ie as default};
