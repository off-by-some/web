import{n as s,a,f as l,c as m,p as d,d as u}from"./iframe-C03gCyYk.js";import{c as p,i as c,d as g}from"./create-runtime-stories-Cwkng-NY.js";import{H as i}from"./HeroValue-Bd-1fPWn.js";import{h as f}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./HeroActionLink-Dkih3sIn.js";import"./Button-Dg1dnDsc.js";import"./svelte-element-WPQrhNYs.js";import"./attributes-BGJ48NAH.js";import"./pressable-D8AtzM9Q.js";import"./paths-BmMOAvUv.js";const h=(r,e=s)=>{var t=b(),o=m(t);i(o,{get headline(){return e().headline},get description(){return e().description},get primaryButtonText(){return e().primaryButtonText},get linkedinUrl(){return e().linkedinUrl},get githubUrl(){return e().githubUrl},get repoUrl(){return e().repoUrl},get resumeHref(){return e().resumeHref},get resumeFilename(){return e().resumeFilename},onPrimaryAction:()=>console.log("Primary action")}),a(r,t)},y={title:"Library/Site/Hero/Value Statement",component:i,render:h,tags:["autodocs"],args:{headline:"I build resilient systems and focused engineering teams.",description:"From architecture to delivery, I turn messy product ideas into reliable software with clear operational guardrails.",primaryButtonText:"Get in Touch",linkedinUrl:"https://linkedin.com/in/cassidy-bridges-tech",githubUrl:"https://github.com/off-by-some",repoUrl:"https://github.com/off-by-some/web",resumeHref:"/resume/Cassidy-Bridges-Software-Engineering.pdf",resumeFilename:"Cassidy-Bridges-Software-Engineering.pdf"},argTypes:{...f(["linkedinUrl","githubUrl","repoUrl","resumeHref","resumeFilename"])},parameters:{docs:{description:{component:"Headline, supporting line, and a fixed action row for profile links, resume download, starring the project repo, and contact intent. All the circular controls share the same glass icon language."}}}},{Story:U}=g();var b=l('<div class="story-shell svelte-8i1e3f"><!></div>');function n(r,e){d(e,!1),c(),U(r,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
  <HeroValue
    headline={args.headline}
    description={args.description}
    primaryButtonText={args.primaryButtonText}
    linkedinUrl={args.linkedinUrl}
    githubUrl={args.githubUrl}
    repoUrl={args.repoUrl}
    resumeHref={args.resumeHref}
    resumeFilename={args.resumeFilename}
    onPrimaryAction={() => console.log('Primary action')}
  />
</div>`}}}),u()}n.__docgen={data:[],name:"HeroValue.stories.svelte"};const v=p(n,y),V=["Default"],P={...v.Default,tags:["svelte-csf-v5"]};export{P as Default,V as __namedExportsOrder,y as default};
