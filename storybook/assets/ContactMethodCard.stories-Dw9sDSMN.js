import{n as i,a as s,f as c,c as l,p as d,d as m}from"./iframe-C03gCyYk.js";import{c as p,i as h,d as f}from"./create-runtime-stories-Cwkng-NY.js";import{C as a}from"./ContactMethodCard-CMVYHkgX.js";import{h as u}from"./controls-B7FSozl-.js";import"./preload-helper-k3ZeA0S-.js";import"./Card-DjT2xJa-.js";import"./svelte-element-WPQrhNYs.js";import"./attributes-BGJ48NAH.js";import"./pressable-D8AtzM9Q.js";import"./IconTile-C2XkOG3Z.js";import"./Image-DaDWe8bU.js";import"./each-TpTNVGij.js";import"./paths-BmMOAvUv.js";const g=(e,t=i)=>{var o=C(),n=l(o);a(n,{get href(){return t().href},get type(){return t().type},get label(){return t().label},get value(){return t().value},get imagePath(){return t().imagePath},get description(){return t().description},onclick:()=>console.log("Contact method clicked")}),s(e,o)},v={title:"Library/Site/Contact/Contact Method Card",component:a,render:g,tags:["autodocs"],args:{href:"https://github.com/off-by-some",type:"github",label:"GitHub",value:"@off-by-some",imagePath:"svg/github_brand_icon.svg",description:"View my code"},argTypes:{...u(["href","type"]),label:{control:"text"},value:{control:"text"},imagePath:{control:"text"},description:{control:"text"}},parameters:{docs:{description:{component:"One card layout for every contact channel — email, LinkedIn, GitHub, calendar — so a new channel only needs new content, not new hover or focus styling."}}}},{Story:y}=f();var C=c('<div class="story-width svelte-1ayd325"><!></div>');function r(e,t){d(t,!1),h(),y(e,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <ContactMethodCard
    href={args.href}
    type={args.type}
    label={args.label}
    value={args.value}
    imagePath={args.imagePath}
    description={args.description}
    onclick={() => console.log('Contact method clicked')}
  />
</div>`}}}),m()}r.__docgen={data:[],name:"ContactMethodCard.stories.svelte"};const _=p(r,v),E=["Default"],I={..._.Default,tags:["svelte-csf-v5"]};export{I as Default,E as __namedExportsOrder,v as default};
