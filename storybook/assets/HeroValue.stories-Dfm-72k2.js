import{n as s,a as o,f as l,c as m,p,d}from"./iframe-B7k5r1i8.js";import{c as u,i as c,d as h}from"./create-runtime-stories-B-V5fa9q.js";import{H as i}from"./HeroValue-DO2k9m4Y.js";import{h as g}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./each-COoGI0cM.js";import"./HeroActionLink-CGXjizfy.js";import"./Button-B7n6Ca3Z.js";import"./svelte-element-agrdmvP5.js";import"./attributes-B8kKt70b.js";import"./pressable-D8AtzM9Q.js";import"./paths-BVgFyWr9.js";const f=(r,e=s)=>{var t=U(),a=m(t);i(a,{get headline(){return e().headline},get headlineEmphasis(){return e().headlineEmphasis},get description(){return e().description},get primaryButtonText(){return e().primaryButtonText},get exploreLinkText(){return e().exploreLinkText},get linkedinUrl(){return e().linkedinUrl},get githubUrl(){return e().githubUrl},get repoUrl(){return e().repoUrl},get resumeHref(){return e().resumeHref},get resumeFilename(){return e().resumeFilename},onPrimaryAction:()=>console.log("Primary action")}),o(r,t)},y={title:"Library/Site/Hero/Value Statement",component:i,render:f,tags:["autodocs"],args:{headline:"I architect systems that scale, lead teams that thrive, and build products that last.",headlineEmphasis:{primary:"scale",accent:"last"},description:"I turn complex challenges into durable systems and help high-performing engineering teams do their best work, from product architecture to cloud infrastructure.",primaryButtonText:"Let's build something great",exploreLinkText:"Explore my work",linkedinUrl:"https://linkedin.com/in/cassidy-bridges-tech",githubUrl:"https://github.com/off-by-some",repoUrl:"https://github.com/off-by-some/web",resumeHref:"/resume/Cassidy-Bridges-Software-Engineering.pdf",resumeFilename:"Cassidy-Bridges-Software-Engineering.pdf"},argTypes:{...g(["linkedinUrl","githubUrl","repoUrl","resumeHref","resumeFilename"])},parameters:{docs:{description:{component:"Headline, supporting line, and a fixed action row for profile links, resume download, starring the project repo, and contact intent. All the circular controls share the same glass icon language."}}}},{Story:x}=h();var U=l('<div class="story-shell svelte-8i1e3f"><!></div>');function n(r,e){p(e,!1),c(),x(r,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
  <HeroValue
    headline={args.headline}
    headlineEmphasis={args.headlineEmphasis}
    description={args.description}
    primaryButtonText={args.primaryButtonText}
    exploreLinkText={args.exploreLinkText}
    linkedinUrl={args.linkedinUrl}
    githubUrl={args.githubUrl}
    repoUrl={args.repoUrl}
    resumeHref={args.resumeHref}
    resumeFilename={args.resumeFilename}
    onPrimaryAction={() => console.log('Primary action')}
  />
</div>`}}}),d()}n.__docgen={data:[],name:"HeroValue.stories.svelte"};const b=u(n,y),D=["Default"],V={...b.Default,tags:["svelte-csf-v5"]};export{V as Default,D as __namedExportsOrder,y as default};
