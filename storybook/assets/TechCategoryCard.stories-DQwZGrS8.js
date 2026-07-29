import{n as f,a as m,b as i,f as c,c as w,p as y,d as u,s as l,h as _,e as C,i as S}from"./iframe-tmrQQOUJ.js";import{c as T,d as b}from"./create-runtime-stories-CgxwG-ne.js";import{T as d}from"./TechCategoryCard-DRugftf4.js";import{h as R}from"./controls-B7FSozl-.js";import{s as N}from"./class-BWDwZskk.js";import{i as O}from"./lifecycle-CshwYw4S.js";import"./preload-helper-k3ZeA0S-.js";import"./each-Cyl6FmhV.js";import"./this-IGiGVB3O.js";import"./Card-CMNNCkhj.js";import"./svelte-element-CNi0WN0f.js";import"./attributes-CEBRAIqw.js";import"./pressable-D8AtzM9Q.js";import"./ToneDot-BmDE38Mn.js";const A=(a,e=f)=>{var t=$();let o;var r=w(t);d(r,{get title(){return e().title},get level(){return e().level},get technologies(){return e().technologies},onSelectRequested:()=>console.log("Technology category selected")}),m(()=>o=N(t,1,"story-width svelte-1us3fk1",null,o,{"story-width--narrow":e().narrow})),i(a,t)},g=["React","TypeScript","Svelte","SCSS","Accessibility","Storybook"],D=g.concat(["Node.js","GraphQL","Docker","Kubernetes"]),q={title:"Component Library/Site/Skills/Technology Category Card",component:d,render:A,tags:["autodocs"],args:{title:"Frontend Architecture",level:"expert",technologies:g,narrow:!1},argTypes:{level:{control:"select",options:["expert","advanced"]},narrow:{control:"boolean",description:'Story-only toggle that shrinks the preview to force the tag-overflow "+N" collapse described above.'},...R(["delay","onSelectRequested"])},parameters:{docs:{description:{component:`Measures how many technology tags fit in two lines by rendering an offscreen clone and re-measuring on every resize (via ResizeObserver), then collapses whatever doesn't fit into a single "+N" tag rather than wrapping to a third line. Resize the preview pane to watch tags move in and out of the overflow count — this is the one component here that touches the DOM directly for layout instead of relying on CSS alone.`}}}},{Story:s}=b();var $=c("<div><!></div>"),k=c("<!> <!> <!>",1);function v(a,e){y(e,!1),O();var t=k(),o=u(t);s(o,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-width" class:story-width--narrow={args.narrow}>
  <TechCategoryCard
    title={args.title}
    level={args.level}
    technologies={args.technologies}
    onSelectRequested={() => console.log('Technology category selected')}
  />
</div>`}}});var r=l(o,2);s(r,{name:"Advanced",args:{level:"advanced"},parameters:{__svelteCsf:{rawCode:`<div class="story-width" class:story-width--narrow={args.narrow}>
  <TechCategoryCard
    title={args.title}
    level={args.level}
    technologies={args.technologies}
    onSelectRequested={() => console.log('Technology category selected')}
  />
</div>`}}});var h=l(r,2);{let p=S(()=>({technologies:D,narrow:!0}));s(h,{name:"Overflow in Narrow Container",get args(){return _(p)},parameters:{__svelteCsf:{rawCode:`<div class="story-width" class:story-width--narrow={args.narrow}>
  <TechCategoryCard
    title={args.title}
    level={args.level}
    technologies={args.technologies}
    onSelectRequested={() => console.log('Technology category selected')}
  />
</div>`}}})}i(a,t),C()}v.__docgen={data:[],name:"TechCategoryCard.stories.svelte"};const n=T(v,q),P=["Default","Advanced","OverflowInNarrowContainer"],U={...n.Default,tags:["svelte-csf-v5"]},V={...n.Advanced,tags:["svelte-csf-v5"]},W={...n.OverflowInNarrowContainer,tags:["svelte-csf-v5"]};export{V as Advanced,U as Default,W as OverflowInNarrowContainer,P as __namedExportsOrder,q as default};
