import{p as w,h as k,s as r,a as i,d as y,f as a,c as p}from"./iframe-CorkyMTL.js";import{c as C,i as A,d as H}from"./create-runtime-stories-CTUIHbMr.js";import{H as e}from"./HeroActionLink-DjrRqLcf.js";import"./preload-helper-k3ZeA0S-.js";import"./client-CwtDgCSc.js";import"./Button-Mm2qci0I.js";import"./svelte-element-BL3dl_66.js";import"./attributes-BhHEIJSa.js";import"./pressable-D8AtzM9Q.js";const L={title:"Library/Site/Hero/Action Link",component:e,tags:["autodocs"],args:{href:"https://github.com/off-by-some",label:"Open GitHub profile",icon:"github",shape:"circle"},argTypes:{href:{control:{type:"text"}},label:{control:{type:"text"}},icon:{control:{type:"select"},options:["github","linkedin","download","arrow"]},shape:{control:{type:"select"},options:["circle","label","corner"]},download:{control:{type:"text"}},target:{control:{type:"select"},options:["_self","_blank"]}},parameters:{docs:{description:{component:"Reusable hero action link for the circular social controls, resume download button, text-arrow contact CTA, and the expanding project link in the corner. This keeps the hero action language centralized instead of restyling each link separately."}}}},{Story:f}=H();var $=a('<div class="story-row svelte-1wf3lfg"><!> <!> <!> <span class="story-divider svelte-1wf3lfg" aria-hidden="true"></span> <!></div>'),x=a('<div class="story-corner svelte-1wf3lfg"><!></div>'),R=a("<!> <!>",1);function h(g,m){w(m,!1),A();var s=R(),l=k(s);f(l,{name:"Action Row",asChild:!0,children:(t,_)=>{var o=$(),n=p(o);e(n,{href:"https://linkedin.com/in/cassidy-bridges-tech",label:"Open LinkedIn profile",icon:"linkedin",target:"_blank",rel:"noopener noreferrer"});var c=r(n,2);e(c,{href:"https://github.com/off-by-some",label:"Open GitHub profile",icon:"github",target:"_blank",rel:"noopener noreferrer"});var d=r(c,2);e(d,{href:"/resume/Cassidy-Bridges-Software-Engineering.pdf",label:"Download resume",icon:"download",download:"Cassidy-Bridges-Software-Engineering.pdf"});var v=r(d,4);e(v,{href:"#contact",label:"Contact Me",icon:"arrow",shape:"label"}),i(t,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="story-row">
  <HeroActionLink
    href="https://linkedin.com/in/cassidy-bridges-tech"
    label="Open LinkedIn profile"
    icon="linkedin"
    target="_blank"
    rel="noopener noreferrer"
  />
  <HeroActionLink
    href="https://github.com/off-by-some"
    label="Open GitHub profile"
    icon="github"
    target="_blank"
    rel="noopener noreferrer"
  />
  <HeroActionLink
    href="/resume/Cassidy-Bridges-Software-Engineering.pdf"
    label="Download resume"
    icon="download"
    download="Cassidy-Bridges-Software-Engineering.pdf"
  />
  <span class="story-divider" aria-hidden="true"></span>
  <HeroActionLink href="#contact" label="Contact Me" icon="arrow" shape="label" />
</div>`}}});var u=r(l,2);f(u,{name:"Corner",asChild:!0,children:(t,_)=>{var o=x(),n=p(o);e(n,{href:"https://github.com/off-by-some/web",label:"Check out this project on GitHub",icon:"github",shape:"corner",target:"_blank",rel:"noopener noreferrer"}),i(t,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div class="story-corner">
  <HeroActionLink
    href="https://github.com/off-by-some/web"
    label="Check out this project on GitHub"
    icon="github"
    shape="corner"
    target="_blank"
    rel="noopener noreferrer"
  />
</div>`}}}),i(g,s),y()}h.__docgen={data:[],name:"HeroActionLink.stories.svelte"};const b=C(h,L),I=["ActionRow","Corner"],P={...b.ActionRow,tags:["svelte-csf-v5"]},z={...b.Corner,tags:["svelte-csf-v5"]};export{P as ActionRow,z as Corner,I as __namedExportsOrder,L as default};
