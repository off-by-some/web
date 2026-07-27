import{n as g,a as c,f as l,c as b,p as u,e as j,d as a,b as f}from"./iframe-DwMq_gO4.js";import{c as _,d as y}from"./create-runtime-stories-CnoAsyGi.js";import{P as p}from"./ProjectDotNav-Dt_GuccH.js";import{c as x}from"./en-CEfL0dGA.js";import{i as P}from"./lifecycle-UUieasHA.js";import"./preload-helper-k3ZeA0S-.js";import"./each-BO64mPcb.js";import"./attributes-D_p17G3m.js";import"./class-80-ozJ2j.js";import"./Image-D9rPbM3l.js";import"./this-BmJqKqOf.js";import"./paths-BMaa_BsJ.js";import"./types-eVoZH982.js";const h=(i,e=g)=>{var t=D(),o=b(t);p(o,{get projects(){return e().projects},get activeIndex(){return e().activeIndex},get visible(){return e().visible},get position(){return e().position},get mediaReady(){return e().mediaReady},onSelectRequested:s=>console.log("Project requested:",s)}),c(i,t)},d=x.projectsSection.projects,R={title:"Library/Site/Projects/Project Dot Navigation",component:p,render:h,tags:["autodocs"],args:{projects:d,activeIndex:0,visible:!0,position:"top",mediaReady:!0},argTypes:{projects:{control:{type:"object"},description:"Projects represented by circular banner thumbnails."},activeIndex:{control:{type:"number",min:0,max:Math.max(d.length-1,0),step:1},description:"Selected project index owned by ProjectsSection."},visible:{control:"boolean",description:"Semantic visibility state; hidden rails are removed from tab order."},position:{control:"select",options:["top","bottom"],description:"Directional entrance treatment for the rail."},mediaReady:{control:"boolean",description:"Whether thumbnail media may render."}},parameters:{docs:{description:{component:"Compact project navigation for tablet and mobile layouts. It receives selection state and reports selection intent, but does not own the active project."}}}},{Story:n}=y();var D=l('<div class="story-dot-shell svelte-11e1bnr"><!></div>'),I=l("<!> <!> <!>",1);function m(i,e){u(e,!1),P();var t=I(),o=j(t);n(o,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-dot-shell">
  <ProjectDotNav
    projects={args.projects}
    activeIndex={args.activeIndex}
    visible={args.visible}
    position={args.position}
    mediaReady={args.mediaReady}
    onSelectRequested={(index) => console.log('Project requested:', index)}
  />
</div>`}}});var s=a(o,2);n(s,{name:"Bottom Position",args:{position:"bottom"},parameters:{__svelteCsf:{rawCode:`<div class="story-dot-shell">
  <ProjectDotNav
    projects={args.projects}
    activeIndex={args.activeIndex}
    visible={args.visible}
    position={args.position}
    mediaReady={args.mediaReady}
    onSelectRequested={(index) => console.log('Project requested:', index)}
  />
</div>`}}});var v=a(s,2);n(v,{name:"Hidden",args:{visible:!1},parameters:{__svelteCsf:{rawCode:`<div class="story-dot-shell">
  <ProjectDotNav
    projects={args.projects}
    activeIndex={args.activeIndex}
    visible={args.visible}
    position={args.position}
    mediaReady={args.mediaReady}
    onSelectRequested={(index) => console.log('Project requested:', index)}
  />
</div>`}}}),c(i,t),f()}m.__docgen={data:[],name:"ProjectDotNav.stories.svelte"};const r=_(m,R),W=["Default","BottomPosition","Hidden"],k={...r.Default,tags:["svelte-csf-v5"]},z={...r.BottomPosition,tags:["svelte-csf-v5"]},A={...r.Hidden,tags:["svelte-csf-v5"]};export{z as BottomPosition,k as Default,A as Hidden,W as __namedExportsOrder,R as default};
