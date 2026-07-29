import{n as m,b as o,f as d,c as v,p as u,d as x,s as l,e as h}from"./iframe-tmrQQOUJ.js";import{c as f,d as C}from"./create-runtime-stories-CgxwG-ne.js";import{E as c}from"./ExperienceCard-B71wdbFd.js";import{h as _}from"./controls-B7FSozl-.js";import{i as b}from"./lifecycle-CshwYw4S.js";import"./preload-helper-k3ZeA0S-.js";import"./each-Cyl6FmhV.js";import"./attributes-CEBRAIqw.js";import"./class-BWDwZskk.js";import"./Card-CMNNCkhj.js";import"./svelte-element-CNi0WN0f.js";import"./pressable-D8AtzM9Q.js";import"./IconTile-jrftMVzB.js";import"./Image-l4BshVtG.js";import"./this-IGiGVB3O.js";import"./paths-B3M7__sZ.js";import"./client-CY1upd4m.js";const y=(s,e=m)=>{var t=w(),a=v(t);c(a,{get experience(){return e().experience},index:0,get active(){return e().active},get expanded(){return e().expanded},get detailsClickable(){return e().detailsClickable},onDetailsToggleRequested:()=>console.log("Experience details toggle requested")}),o(s,t)},k={title:"Principal Engineer",company:"Example Studio",logo:"svg/Svelte_Logo.svg",date:"2021 - Present",dateValue:"2021",location:"Remote",summary:"Built design systems and delivery patterns for high-polish product surfaces.",highlights:["Created a composable component library with shared card and button primitives.","Improved frontend consistency while preserving existing visual polish."],skills:["Svelte","SCSS","Design Systems"]},E={title:"Component Library/Site/Timeline/Experience Card",component:c,render:y,tags:["autodocs"],args:{experience:k,active:!0,expanded:!0,detailsClickable:!1},argTypes:{..._(["index","delay","onDetailsToggleRequested"])},parameters:{docs:{description:{component:'Summary and highlight text run through a small markdown-link parser — write `[label](https://...)` inside `experience.summary` or `.highlights` and it renders as a real anchor; anything else stays literal text, so a bracket that is not a real link is left alone rather than stripped. The card is only clickable when `detailsClickable` is true; the "More/Less" button always reports the same semantic details-toggle request and stops its click from bubbling to the card surface.'}}}},{Story:i}=C();var w=d('<div class="story-width svelte-7cloh2"><!></div>'),D=d("<!> <!> <!>",1);function p(s,e){u(e,!1),b();var t=D(),a=x(t);i(a,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <ExperienceCard
    experience={args.experience}
    index={0}
    active={args.active}
    expanded={args.expanded}
    detailsClickable={args.detailsClickable}
    onDetailsToggleRequested={() => console.log('Experience details toggle requested')}
  />
</div>`}}});var n=l(a,2);i(n,{name:"Collapsed",args:{expanded:!1},parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <ExperienceCard
    experience={args.experience}
    index={0}
    active={args.active}
    expanded={args.expanded}
    detailsClickable={args.detailsClickable}
    onDetailsToggleRequested={() => console.log('Experience details toggle requested')}
  />
</div>`}}});var g=l(n,2);i(g,{name:"Inactive",args:{active:!1},parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <ExperienceCard
    experience={args.experience}
    index={0}
    active={args.active}
    expanded={args.expanded}
    detailsClickable={args.detailsClickable}
    onDetailsToggleRequested={() => console.log('Experience details toggle requested')}
  />
</div>`}}}),o(s,t),h()}p.__docgen={data:[],name:"ExperienceCard.stories.svelte"};const r=f(p,E),H=["Default","Collapsed","Inactive"],J={...r.Default,tags:["svelte-csf-v5"]},K={...r.Collapsed,tags:["svelte-csf-v5"]},N={...r.Inactive,tags:["svelte-csf-v5"]};export{K as Collapsed,J as Default,N as Inactive,H as __namedExportsOrder,E as default};
