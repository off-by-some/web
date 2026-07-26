import{n as m,a as o,f as d,c as v,p as u,e as x,d as l,b as h}from"./iframe-ieh-0Dpd.js";import{c as f,d as C}from"./create-runtime-stories-7YLcQk9Y.js";import{E as c}from"./ExperienceCard-bexbud1O.js";import{h as _}from"./controls-B7FSozl-.js";import{i as b}from"./lifecycle-Cw5C--U9.js";import"./preload-helper-k3ZeA0S-.js";import"./each-Dk9X25Wy.js";import"./attributes-WN7uc8HD.js";import"./class-c5mAc_9k.js";import"./Card-CrmcPoAs.js";import"./svelte-element-pglhJyBM.js";import"./pressable-D8AtzM9Q.js";import"./IconTile-Cf_EGyLr.js";import"./Image-BJ64YY0A.js";import"./this-MMdfefvF.js";import"./paths-D9_bW2Ul.js";const y=(s,e=m)=>{var a=w(),t=v(a);c(t,{get experience(){return e().experience},index:0,get active(){return e().active},get expanded(){return e().expanded},get detailsClickable(){return e().detailsClickable},onDetailsToggleRequested:()=>console.log("Experience details toggle requested")}),o(s,a)},k={title:"Principal Engineer",company:"Example Studio",logo:"svg/Svelte_Logo.svg",date:"2021 - Present",dateValue:"2021",location:"Remote",summary:"Built design systems and delivery patterns for high-polish product surfaces.",highlights:["Created a composable component library with shared card and button primitives.","Improved frontend consistency while preserving existing visual polish."],skills:["Svelte","SCSS","Design Systems"]},E={title:"Library/Site/Timeline/Experience Card",component:c,render:y,tags:["autodocs"],args:{experience:k,active:!0,expanded:!0,detailsClickable:!1},argTypes:{..._(["index","delay","onDetailsToggleRequested"])},parameters:{docs:{description:{component:'Summary and highlight text run through a small markdown-link parser — write `[label](https://...)` inside `experience.summary` or `.highlights` and it renders as a real anchor; anything else stays literal text, so a bracket that is not a real link is left alone rather than stripped. The card is only clickable when `detailsClickable` is true; the "More/Less" button always reports the same semantic details-toggle request and stops its click from bubbling to the card surface.'}}}},{Story:i}=C();var w=d('<div class="story-width svelte-1q3r8bk"><!></div>'),q=d("<!> <!> <!>",1);function p(s,e){u(e,!1),b();var a=q(),t=x(a);i(t,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <ExperienceCard
    experience={args.experience}
    index={0}
    active={args.active}
    expanded={args.expanded}
    detailsClickable={args.detailsClickable}
    onDetailsToggleRequested={() => console.log('Experience details toggle requested')}
  />
</div>`}}});var n=l(t,2);i(n,{name:"Collapsed",args:{expanded:!1},parameters:{__svelteCsf:{rawCode:`<div class="story-width">
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
</div>`}}}),o(s,a),h()}p.__docgen={data:[],name:"ExperienceCard.stories.svelte"};const r=f(p,E),G=["Default","Collapsed","Inactive"],H={...r.Default,tags:["svelte-csf-v5"]},J={...r.Collapsed,tags:["svelte-csf-v5"]},K={...r.Inactive,tags:["svelte-csf-v5"]};export{J as Collapsed,H as Default,K as Inactive,G as __namedExportsOrder,E as default};
