import{n as m,a as n,f as s,c as p,p as g,e as h,d as u,b as f}from"./iframe-iHgWXpqb.js";import{c as v,d as C}from"./create-runtime-stories-OJQiI11p.js";import{C as i}from"./ContactMethodCard-BS4MQKLf.js";import{h as _}from"./controls-B7FSozl-.js";import{i as y}from"./lifecycle-oh23v1XI.js";import"./preload-helper-k3ZeA0S-.js";import"./Card-D5FMJKpE.js";import"./svelte-element-m8zypF36.js";import"./attributes-BeeCpROB.js";import"./class-Be_wVUyV.js";import"./pressable-D8AtzM9Q.js";import"./IconTile-Dwcitllg.js";import"./Image-Eg0U9Ce_.js";import"./each-BggA73e3.js";import"./this-B-OJnU7o.js";import"./paths-D3iutkR_.js";const b=(o,e=m)=>{var t=P(),a=p(t);i(a,{get href(){return e().href},get type(){return e().type},get label(){return e().label},get value(){return e().value},get imagePath(){return e().imagePath},get description(){return e().description},onContactRequested:()=>console.log("Contact requested")}),n(o,t)},w={title:"Library/Site/Contact/Contact Method Card",component:i,render:b,tags:["autodocs"],args:{href:"https://github.com/off-by-some",type:"github",label:"GitHub",value:"@off-by-some",imagePath:"svg/github_brand_icon.svg",description:"View my code"},argTypes:{..._(["href","onContactRequested"]),type:{control:"select",options:["email","linkedin","github","calendar"]},label:{control:"text"},value:{control:"text"},imagePath:{control:"text"},description:{control:"text"}},parameters:{docs:{description:{component:"One card layout for every contact channel — email, LinkedIn, GitHub, calendar — so a new channel only needs new content, not new hover or focus styling."}}}},{Story:r}=C();var P=s('<div class="story-width svelte-1ayd325"><!></div>'),q=s("<!> <!>",1);function l(o,e){g(e,!1),y();var t=q(),a=h(t);r(a,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <ContactMethodCard
    href={args.href}
    type={args.type}
    label={args.label}
    value={args.value}
    imagePath={args.imagePath}
    description={args.description}
    onContactRequested={() => console.log('Contact requested')}
  />
</div>`}}});var d=u(a,2);r(d,{name:"Email",args:{href:"mailto:cassidybridges@gmail.com",type:"email",label:"Email",value:"cassidybridges@gmail.com",imagePath:"svg/email_brand_icon.svg",description:"Direct message"},parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <ContactMethodCard
    href={args.href}
    type={args.type}
    label={args.label}
    value={args.value}
    imagePath={args.imagePath}
    description={args.description}
    onContactRequested={() => console.log('Contact requested')}
  />
</div>`}}}),n(o,t),f()}l.__docgen={data:[],name:"ContactMethodCard.stories.svelte"};const c=v(l,w),z=["Default","Email"],A={...c.Default,tags:["svelte-csf-v5"]},B={...c.Email,tags:["svelte-csf-v5"]};export{A as Default,B as Email,z as __namedExportsOrder,w as default};
