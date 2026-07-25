import{n as i,a as n,f as l,c as d,p as m,d as c}from"./iframe-C03gCyYk.js";import{c as p,i as f,d as v}from"./create-runtime-stories-Cwkng-NY.js";import{H as r}from"./HeroProfile-BXafqhdB.js";import{h as u}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./attributes-BGJ48NAH.js";import"./Image-DaDWe8bU.js";import"./each-TpTNVGij.js";import"./paths-BmMOAvUv.js";import"./ToneDot-DahAvCv5.js";import"./StatusPill-B_w6B2cM.js";import"./Button-Dg1dnDsc.js";import"./svelte-element-WPQrhNYs.js";import"./pressable-D8AtzM9Q.js";const g=(e,t=i)=>{var a=_(),s=d(a);r(s,{get name(){return t().name},get role(){return t().role},get statusText(){return t().statusText},get avatarSrc(){return t().avatarSrc},get avatarAlt(){return t().avatarAlt},get titleId(){return t().titleId},onclick:()=>console.log("Profile clicked")}),n(e,a)},h={title:"Library/Site/Hero/Profile",component:r,render:g,tags:["autodocs"],args:{name:"Cassidy Bridges",role:"Engineering Leader",statusText:"Open to Staff / Lead roles",avatarSrc:"headshot.png",avatarAlt:"Portrait of Cassidy Bridges",titleId:"storybook-profile-name"},argTypes:{...u(["avatarAlt","titleId"])},parameters:{docs:{description:{component:"Pairs the avatar Image with name, role, and availability status in the one layout the hero (and any future profile block) can reuse — resolving avatar formats and responsive sources is handled entirely by Image underneath."}}}},{Story:y}=v();var _=l('<div class="story-shell svelte-17y35yv"><!></div>');function o(e,t){m(t,!1),f(),y(e,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-shell">
  <HeroProfile
    name={args.name}
    role={args.role}
    statusText={args.statusText}
    avatarSrc={args.avatarSrc}
    avatarAlt={args.avatarAlt}
    titleId={args.titleId}
    onclick={() => console.log('Profile clicked')}
  />
</div>`}}}),c()}o.__docgen={data:[],name:"HeroProfile.stories.svelte"};const P=p(o,h),E=["Default"],O={...P.Default,tags:["svelte-csf-v5"]};export{O as Default,E as __namedExportsOrder,h as default};
