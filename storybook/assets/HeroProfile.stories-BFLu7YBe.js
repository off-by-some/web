import{n,a as i,f as l,c as d,p as m,d as p}from"./iframe-B7k5r1i8.js";import{c,i as g,d as f}from"./create-runtime-stories-B-V5fa9q.js";import{H as a}from"./HeroProfile-CRoKMP61.js";import{h as u}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./attributes-B8kKt70b.js";const v=(t,e=n)=>{var r=h(),s=d(r);a(s,{get greeting(){return e().greeting},get name(){return e().name},get role(){return e().role},get titleId(){return e().titleId}}),i(t,r)},y={title:"Library/Site/Hero/Profile",component:a,render:v,tags:["autodocs"],args:{greeting:"Hi, I'm",name:"Cassidy Bridges",role:"Software Engineering Leader",titleId:"storybook-profile-name"},argTypes:{...u(["avatarAlt","titleId"])},parameters:{docs:{description:{component:"Hero identity block for greeting, name, role, and accent mark. The portrait and actions stay separate so the typography can be reused without carrying page-specific layout."}}}},{Story:_}=f();var h=l('<div class="story-shell svelte-17y35yv"><!></div>');function o(t,e){m(e,!1),g(),_(t,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
  <HeroProfile
    greeting={args.greeting}
    name={args.name}
    role={args.role}
    titleId={args.titleId}
  />
</div>`}}}),p()}o.__docgen={data:[],name:"HeroProfile.stories.svelte"};const H=c(o,y),k=["Default"],w={...H.Default,tags:["svelte-csf-v5"]};export{w as Default,k as __namedExportsOrder,y as default};
