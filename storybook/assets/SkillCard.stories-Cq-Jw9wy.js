import{n as u,b as p,f as h,c as C,p as y,d as S,s as i,h as g,e as w,i as v}from"./iframe-CizSZPhs.js";import{c as b,d as $}from"./create-runtime-stories-qZGdqjtD.js";import{S as f}from"./SkillCard-PrJV5cst.js";import{h as q}from"./controls-B7FSozl-.js";import{i as E}from"./lifecycle-CZYbCPQ5.js";import"./preload-helper-k3ZeA0S-.js";import"./class-BdT285uw.js";import"./attributes-CfgYz-0Q.js";import"./Card-CSnJxI-4.js";import"./svelte-element-B0A3JMz1.js";import"./pressable-D8AtzM9Q.js";import"./IconTile-DmvQjthB.js";import"./Image-DwM3DyIN.js";import"./each-BUEsaMkY.js";import"./this-B5pmUPfd.js";import"./paths-BANDXZpd.js";import"./client-BQR8gN4p.js";import"./ToneDot-BZDCvSok.js";import"./VisuallyHidden-DBvpfoQZ.js";const R=(d,s=u)=>{var e=x(),r=C(e);f(r,{get skill(){return s().skill},get hovered(){return s().hovered},onEngagementChangeRequested:o=>console.log("Skill engagement changed:",o)}),p(d,e)},l={name:"TypeScript",level:"expert",years:9,description:"Complex type systems and scalable frontend architecture",image:"svg/Typescript_logo.svg"},L={title:"Component Library/Site/Skills/Skill Card",component:f,render:R,tags:["autodocs"],args:{skill:l,hovered:!1},argTypes:{...q(["delay","onEngagementChangeRequested"])},parameters:{docs:{description:{component:"`level` drives its own accent color and glow (expert/advanced/proficient/learning each get a distinct hue) independently of `years` — nothing here calculates level from years, that math lives in SkillsSection instead. The description line is hidden until hover/focus above the md breakpoint, but stays visible at reduced opacity below it, since hover isn't a reliable signal on touch."}}}},{Story:n}=$();var x=h('<div class="story-width svelte-wlo43s"><!></div>'),A=h("<!> <!> <!> <!> <!>",1);function _(d,s){y(s,!1),E();var e=A(),r=S(e);n(r,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <SkillCard
    skill={args.skill}
    hovered={args.hovered}
    onEngagementChangeRequested={(active) => console.log('Skill engagement changed:', active)}
  />
</div>`}}});var o=i(r,2);{let a=v(()=>({skill:{...l,name:"Go",level:"advanced",years:6,image:"icons/golang logo.png"}}));n(o,{name:"Advanced",get args(){return g(a)},parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <SkillCard
    skill={args.skill}
    hovered={args.hovered}
    onEngagementChangeRequested={(active) => console.log('Skill engagement changed:', active)}
  />
</div>`}}})}var c=i(o,2);{let a=v(()=>({skill:{...l,name:"GraphQL",level:"proficient",years:3,image:"icons/Graphql.webp"}}));n(c,{name:"Proficient",get args(){return g(a)},parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <SkillCard
    skill={args.skill}
    hovered={args.hovered}
    onEngagementChangeRequested={(active) => console.log('Skill engagement changed:', active)}
  />
</div>`}}})}var m=i(c,2);{let a=v(()=>({skill:{...l,name:"Jest",level:"learning",years:1,image:"svg/Jest.svg"}}));n(m,{name:"Learning",get args(){return g(a)},parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <SkillCard
    skill={args.skill}
    hovered={args.hovered}
    onEngagementChangeRequested={(active) => console.log('Skill engagement changed:', active)}
  />
</div>`}}})}var k=i(m,2);n(k,{name:"Hovered",args:{hovered:!0},parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <SkillCard
    skill={args.skill}
    hovered={args.hovered}
    onEngagementChangeRequested={(active) => console.log('Skill engagement changed:', active)}
  />
</div>`}}}),p(d,e),w()}_.__docgen={data:[],name:"SkillCard.stories.svelte"};const t=b(_,L),X=["Default","Advanced","Proficient","Learning","Hovered"],Y={...t.Default,tags:["svelte-csf-v5"]},Z={...t.Advanced,tags:["svelte-csf-v5"]},ee={...t.Proficient,tags:["svelte-csf-v5"]},ae={...t.Learning,tags:["svelte-csf-v5"]},ne={...t.Hovered,tags:["svelte-csf-v5"]};export{Z as Advanced,Y as Default,ne as Hovered,ae as Learning,ee as Proficient,X as __namedExportsOrder,L as default};
