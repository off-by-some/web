import{n as m,b as n,f as s,c as p,p as g,d as h,s as u,e as f}from"./iframe-tmrQQOUJ.js";import{c as v,d as C}from"./create-runtime-stories-CgxwG-ne.js";import{C as i}from"./ContactMethodCard-Cc5VWtTG.js";import{h as _}from"./controls-B7FSozl-.js";import{i as b}from"./lifecycle-CshwYw4S.js";import"./preload-helper-k3ZeA0S-.js";import"./Card-CMNNCkhj.js";import"./svelte-element-CNi0WN0f.js";import"./attributes-CEBRAIqw.js";import"./class-BWDwZskk.js";import"./pressable-D8AtzM9Q.js";import"./IconTile-jrftMVzB.js";import"./Image-l4BshVtG.js";import"./each-Cyl6FmhV.js";import"./this-IGiGVB3O.js";import"./paths-B3M7__sZ.js";import"./client-CY1upd4m.js";const y=(o,e=m)=>{var t=P(),a=p(t);i(a,{get href(){return e().href},get type(){return e().type},get label(){return e().label},get value(){return e().value},get imagePath(){return e().imagePath},get description(){return e().description},onContactRequested:()=>console.log("Contact requested")}),n(o,t)},w={title:"Component Library/Site/Contact/Contact Method Card",component:i,render:y,tags:["autodocs"],args:{href:"https://github.com/off-by-some",type:"github",label:"GitHub",value:"@off-by-some",imagePath:"svg/github_brand_icon.svg",description:"View my code"},argTypes:{..._(["href","onContactRequested"]),type:{control:"select",options:["email","linkedin","github","calendar"]},label:{control:"text"},value:{control:"text"},imagePath:{control:"text"},description:{control:"text"}},parameters:{docs:{description:{component:"One card layout for every contact channel — email, LinkedIn, GitHub, calendar — so a new channel only needs new content, not new hover or focus styling."}}}},{Story:r}=C();var P=s('<div class="story-width svelte-gj67dg"><!></div>'),q=s("<!> <!>",1);function l(o,e){g(e,!1),b();var t=q(),a=h(t);r(a,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-width">
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
</div>`}}}),n(o,t),f()}l.__docgen={data:[],name:"ContactMethodCard.stories.svelte"};const c=v(l,w),A=["Default","Email"],B={...c.Default,tags:["svelte-csf-v5"]},F={...c.Email,tags:["svelte-csf-v5"]};export{B as Default,F as Email,A as __namedExportsOrder,w as default};
