import{n as i,a as n,f as l,c as d,p as m,d as c}from"./iframe-D7wbHJXp.js";import{c as p,i as f,d as v}from"./create-runtime-stories-C69MdrcP.js";import{H as r}from"./HeroProfile-c5-t-NR_.js";import{h as u}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./attributes-BuxM2Wln.js";import"./Image-zROsedLs.js";import"./each-Le0rqlqk.js";import"./this-r2B6wJD4.js";import"./paths-xDEcSY5p.js";import"./ToneDot-CDCxtb0K.js";import"./StatusPill-DpTZ76tx.js";import"./Button-DiyjdwHm.js";import"./svelte-element-BuiBM00a.js";import"./pressable-D8AtzM9Q.js";const g=(e,t=i)=>{var a=_(),s=d(a);r(s,{get name(){return t().name},get role(){return t().role},get statusText(){return t().statusText},get avatarSrc(){return t().avatarSrc},get avatarAlt(){return t().avatarAlt},get titleId(){return t().titleId},onclick:()=>console.log("Profile clicked")}),n(e,a)},h={title:"Library/Site/Hero/Profile",component:r,render:g,tags:["autodocs"],args:{name:"Cassidy Bridges",role:"Engineering Leader",statusText:"Open to Staff / Lead roles",avatarSrc:"headshot.png",avatarAlt:"Portrait of Cassidy Bridges",titleId:"storybook-profile-name"},argTypes:{...u(["avatarAlt","titleId"])},parameters:{docs:{description:{component:"Pairs the avatar Image with name, role, and availability status in the one layout the hero (and any future profile block) can reuse — resolving avatar formats and responsive sources is handled entirely by Image underneath."}}}},{Story:y}=v();var _=l('<div class="story-shell svelte-17y35yv"><!></div>');function o(e,t){m(t,!1),f(),y(e,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
  <HeroProfile
    name={args.name}
    role={args.role}
    statusText={args.statusText}
    avatarSrc={args.avatarSrc}
    avatarAlt={args.avatarAlt}
    titleId={args.titleId}
    onclick={() => console.log('Profile clicked')}
  />
</div>`}}}),c()}o.__docgen={data:[],name:"HeroProfile.stories.svelte"};const P=p(o,h),O=["Default"],M={...P.Default,tags:["svelte-csf-v5"]};export{M as Default,O as __namedExportsOrder,h as default};
