import{n as U,y as C,d as _,z as F,b as e,p as A,s as n,e as D,f as $,t as o,a as S,g as M}from"./iframe-CizSZPhs.js";import{c as b,d as w}from"./create-runtime-stories-qZGdqjtD.js";import{T as i,U as z}from"./PdfStoryDownload-CBqAkA3B.js";import{h as E}from"./controls-B7FSozl-.js";import{P as O}from"./PdfStoryFrame-vn0-JHZ5.js";import{i as R}from"./lifecycle-CZYbCPQ5.js";import"./preload-helper-k3ZeA0S-.js";import"./attributes-CfgYz-0Q.js";import"./class-BdT285uw.js";import"./this-B5pmUPfd.js";import"./svelte-element-B0A3JMz1.js";const j=(k,t=U)=>{O(k,{get filename(){return t().filename},get renderWidth(){return t().renderWidth},children:(m,f)=>{z(m,{class:"task-list-story",children:(c,g)=>{var T=C(),v=_(T);{var P=a=>{var l=B(),h=_(l);i(h,{checked:!0,children:(s,p)=>{var r=o("Design the API");e(s,r)},$$slots:{default:!0}});var d=n(h,2);i(d,{checked:!0,children:(s,p)=>{var r=o("Write the renderer");e(s,r)},$$slots:{default:!0}});var x=n(d,2);i(x,{children:(s,p)=>{var r=o("Write the story files");e(s,r)},$$slots:{default:!0}});var W=n(x,2);i(W,{children:(s,p)=>{var r=o("Add PDF font support");e(s,r)},$$slots:{default:!0}}),e(a,l)},y=a=>{i(a,{get checked(){return t().checked},children:(l,h)=>{var d=o();S(()=>M(d,t().text)),e(l,d)},$$slots:{default:!0}})};F(v,a=>{t().mode==="mixed"?a(P):a(y,-1)})}e(c,T)},$$slots:{default:!0}})},$$slots:{default:!0}})},q={title:"PDF/Primitives/Task List Item",component:i,render:j,tags:["autodocs"],args:{checked:!1,filename:"task-list-item.pdf",mode:"single",renderWidth:"34rem",text:"Write the story files"},argTypes:{...E(["children"]),checked:{control:"boolean"},filename:{control:"text"},mode:{control:"radio",options:["single","mixed"]},renderWidth:{control:"text"},text:{control:"text"}},parameters:{docs:{description:{component:"A `ListItem` with the marker set to `[x]` or `[ ]` based on the `checked` prop. Compose inside `UnorderedList` for correct semantics."}}}},{Story:L}=w();var B=$("<!> <!> <!> <!>",1),G=$("<!> <!> <!>",1);function u(k,t){A(t,!1),R();var m=G(),f=_(m);L(f,{name:"Unchecked",args:{checked:!1,filename:"task-list-item-unchecked.pdf"},parameters:{__svelteCsf:{rawCode:`<PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
  <UnorderedList class="task-list-story">
    {#if args.mode === 'mixed'}
      <TaskListItem checked>Design the API</TaskListItem>
      <TaskListItem checked>Write the renderer</TaskListItem>
      <TaskListItem>Write the story files</TaskListItem>
      <TaskListItem>Add PDF font support</TaskListItem>
    {:else}
      <TaskListItem checked={args.checked}>{args.text}</TaskListItem>
    {/if}
  </UnorderedList>
</PdfStoryFrame>`}}});var c=n(f,2);L(c,{name:"Checked",args:{checked:!0,filename:"task-list-item-checked.pdf",text:"Design the API"},parameters:{__svelteCsf:{rawCode:`<PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
  <UnorderedList class="task-list-story">
    {#if args.mode === 'mixed'}
      <TaskListItem checked>Design the API</TaskListItem>
      <TaskListItem checked>Write the renderer</TaskListItem>
      <TaskListItem>Write the story files</TaskListItem>
      <TaskListItem>Add PDF font support</TaskListItem>
    {:else}
      <TaskListItem checked={args.checked}>{args.text}</TaskListItem>
    {/if}
  </UnorderedList>
</PdfStoryFrame>`}}});var g=n(c,2);L(g,{name:"Mixed List",args:{filename:"task-list-mixed.pdf",mode:"mixed"},parameters:{docs:{description:{story:"A realistic task list with a mix of checked and unchecked items."}},__svelteCsf:{rawCode:`<PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
  <UnorderedList class="task-list-story">
    {#if args.mode === 'mixed'}
      <TaskListItem checked>Design the API</TaskListItem>
      <TaskListItem checked>Write the renderer</TaskListItem>
      <TaskListItem>Write the story files</TaskListItem>
      <TaskListItem>Add PDF font support</TaskListItem>
    {:else}
      <TaskListItem checked={args.checked}>{args.text}</TaskListItem>
    {/if}
  </UnorderedList>
</PdfStoryFrame>`}}}),e(k,m),D()}u.__docgen={data:[],name:"TaskListItem.stories.svelte"};const I=b(u,q),se=["Unchecked","Checked","MixedList"],re={...I.Unchecked,tags:["svelte-csf-v5"]},ae={...I.Checked,tags:["svelte-csf-v5"]},ie={...I.MixedList,tags:["svelte-csf-v5"]};export{ae as Checked,ie as MixedList,re as Unchecked,se as __namedExportsOrder,q as default};
