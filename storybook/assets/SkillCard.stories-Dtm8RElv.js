import{n as u,a as p,f as h,c as C,p as y,e as S,d as o,g,b as w,h as v}from"./iframe-Cs-VgzGu.js";import{c as b,d as $}from"./create-runtime-stories-DbfmqB7R.js";import{S as f}from"./SkillCard-0BG3qTg0.js";import{h as q}from"./controls-B7FSozl-.js";import{i as E}from"./lifecycle-CkWJ5unA.js";import"./preload-helper-k3ZeA0S-.js";import"./class-D94yQWEi.js";import"./attributes-HTIiahiM.js";import"./Card-dUeiOBJ3.js";import"./svelte-element-ysknIRS9.js";import"./pressable-D8AtzM9Q.js";import"./IconTile-nsx_tQpr.js";import"./Image-CDi6mVaT.js";import"./each-BaMNN52M.js";import"./this-UuWLgnVi.js";import"./paths-DMXmfiOk.js";import"./ToneDot-BcbVUMQO.js";import"./VisuallyHidden-BqbcZ-2l.js";const R=(d,s=u)=>{var e=x(),r=C(e);f(r,{get skill(){return s().skill},get hovered(){return s().hovered},onEngagementChangeRequested:i=>console.log("Skill engagement changed:",i)}),p(d,e)},l={name:"TypeScript",level:"expert",years:9,description:"Complex type systems and scalable frontend architecture",image:"svg/Typescript_logo.svg"},L={title:"Library/Site/Skills/Skill Card",component:f,render:R,tags:["autodocs"],args:{skill:l,hovered:!1},argTypes:{...q(["delay","onEngagementChangeRequested"])},parameters:{docs:{description:{component:"`level` drives its own accent color and glow (expert/advanced/proficient/learning each get a distinct hue) independently of `years` — nothing here calculates level from years, that math lives in SkillsSection instead. The description line is hidden until hover/focus above the md breakpoint, but stays visible at reduced opacity below it, since hover isn't a reliable signal on touch."}}}},{Story:n}=$();var x=h('<div class="story-width svelte-1tjte55"><!></div>'),A=h("<!> <!> <!> <!> <!>",1);function _(d,s){y(s,!1),E();var e=A(),r=S(e);n(r,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <SkillCard
    skill={args.skill}
    hovered={args.hovered}
    onEngagementChangeRequested={(active) => console.log('Skill engagement changed:', active)}
  />
</div>`}}});var i=o(r,2);{let a=v(()=>({skill:{...l,name:"Go",level:"advanced",years:6,image:"icons/golang logo.png"}}));n(i,{name:"Advanced",get args(){return g(a)},parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <SkillCard
    skill={args.skill}
    hovered={args.hovered}
    onEngagementChangeRequested={(active) => console.log('Skill engagement changed:', active)}
  />
</div>`}}})}var c=o(i,2);{let a=v(()=>({skill:{...l,name:"GraphQL",level:"proficient",years:3,image:"icons/Graphql.webp"}}));n(c,{name:"Proficient",get args(){return g(a)},parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <SkillCard
    skill={args.skill}
    hovered={args.hovered}
    onEngagementChangeRequested={(active) => console.log('Skill engagement changed:', active)}
  />
</div>`}}})}var m=o(c,2);{let a=v(()=>({skill:{...l,name:"Jest",level:"learning",years:1,image:"svg/Jest.svg"}}));n(m,{name:"Learning",get args(){return g(a)},parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <SkillCard
    skill={args.skill}
    hovered={args.hovered}
    onEngagementChangeRequested={(active) => console.log('Skill engagement changed:', active)}
  />
</div>`}}})}var k=o(m,2);n(k,{name:"Hovered",args:{hovered:!0},parameters:{__svelteCsf:{rawCode:`<div class="story-width">
  <SkillCard
    skill={args.skill}
    hovered={args.hovered}
    onEngagementChangeRequested={(active) => console.log('Skill engagement changed:', active)}
  />
</div>`}}}),p(d,e),w()}_.__docgen={data:[],name:"SkillCard.stories.svelte"};const t=b(_,L),W=["Default","Advanced","Proficient","Learning","Hovered"],X={...t.Default,tags:["svelte-csf-v5"]},Y={...t.Advanced,tags:["svelte-csf-v5"]},Z={...t.Proficient,tags:["svelte-csf-v5"]},ee={...t.Learning,tags:["svelte-csf-v5"]},ae={...t.Hovered,tags:["svelte-csf-v5"]};export{Y as Advanced,X as Default,ae as Hovered,ee as Learning,Z as Proficient,W as __namedExportsOrder,L as default};
