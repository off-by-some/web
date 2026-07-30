import{n as g,b as c,f as l,c as u,p as b,d as j,s as a,e as f}from"./iframe-CizSZPhs.js";import{c as _,d as y}from"./create-runtime-stories-qZGdqjtD.js";import{P as p}from"./ProjectDotNav-BjIIeOrI.js";import{c as x}from"./en-nYwYkc2o.js";import{i as P}from"./lifecycle-CZYbCPQ5.js";import"./preload-helper-k3ZeA0S-.js";import"./each-BUEsaMkY.js";import"./attributes-CfgYz-0Q.js";import"./class-BdT285uw.js";import"./Image-DwM3DyIN.js";import"./this-B5pmUPfd.js";import"./paths-BANDXZpd.js";import"./client-BQR8gN4p.js";import"./types-Dh3nkXnh.js";const h=(i,e=g)=>{var t=D(),o=u(t);p(o,{get projects(){return e().projects},get activeIndex(){return e().activeIndex},get visible(){return e().visible},get position(){return e().position},get mediaReady(){return e().mediaReady},onSelectRequested:s=>console.log("Project requested:",s)}),c(i,t)},d=x.projectsSection.projects,R={title:"Component Library/Site/Projects/Project Dot Navigation",component:p,render:h,tags:["autodocs"],args:{projects:d,activeIndex:0,visible:!0,position:"top",mediaReady:!0},argTypes:{projects:{control:{type:"object"},description:"Projects represented by circular banner thumbnails."},activeIndex:{control:{type:"number",min:0,max:Math.max(d.length-1,0),step:1},description:"Selected project index owned by ProjectsSection."},visible:{control:"boolean",description:"Semantic visibility state; hidden rails are removed from tab order."},position:{control:"select",options:["top","bottom"],description:"Directional entrance treatment for the rail."},mediaReady:{control:"boolean",description:"Whether thumbnail media may render."}},parameters:{docs:{description:{component:"Compact project navigation for tablet and mobile layouts. It receives selection state and reports selection intent, but does not own the active project."}}}},{Story:n}=y();var D=l('<div class="story-dot-shell svelte-qdzgq2"><!></div>'),I=l("<!> <!> <!>",1);function m(i,e){b(e,!1),P();var t=I(),o=j(t);n(o,{name:"Default",parameters:{__svelteCsf:{rawCode:`<div class="story-dot-shell">
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
</div>`}}}),c(i,t),f()}m.__docgen={data:[],name:"ProjectDotNav.stories.svelte"};const r=_(m,R),W=["Default","BottomPosition","Hidden"],k={...r.Default,tags:["svelte-csf-v5"]},A={...r.BottomPosition,tags:["svelte-csf-v5"]},F={...r.Hidden,tags:["svelte-csf-v5"]};export{A as BottomPosition,k as Default,F as Hidden,W as __namedExportsOrder,R as default};
