import{n as g,s as m,a as k,b as c,c as o,f as l,p as C,d as y,e as R,g as b}from"./iframe-CizSZPhs.js";import{c as z,d as h}from"./create-runtime-stories-qZGdqjtD.js";import{R as p}from"./ResumeDocument-BxvHGM3r.js";import{R as S}from"./ResumeComponentStoryFrame-DeV1ynN0.js";import{i as $}from"./lifecycle-CZYbCPQ5.js";import"./preload-helper-k3ZeA0S-.js";import"./each-BUEsaMkY.js";import"./class-BdT285uw.js";import"./PdfStoryDownload-CBqAkA3B.js";import"./attributes-CfgYz-0Q.js";import"./this-B5pmUPfd.js";import"./svelte-element-B0A3JMz1.js";import"./PdfStoryFrame-vn0-JHZ5.js";const x=(s,e=g)=>{S(s,{get filename(){return e().filename},children:(t,a)=>{var n=I(),i=o(n),f=o(i);p(f,{get kind(){return e().kind},get size(){return e().size}});var _=m(i,2),v=o(_);k(()=>b(v,e().kind)),c(t,n)},$$slots:{default:!0}})},D=["location","email","linkedin","github","link"],F={title:"PDF/Site/Resume Contact Icon",component:p,render:x,tags:["autodocs"],args:{filename:"resume-contact-icons.pdf",kind:"linkedin",size:18},argTypes:{filename:{control:"text"},kind:{control:"select",options:D},size:{control:{type:"number",min:10,max:32,step:1}}}},{Story:r}=h();var I=l('<div class="resume-contact-icon-story svelte-5zdl4l"><span class="resume-contact-icon-story__icon svelte-5zdl4l"><!></span> <span> </span></div>'),G=l("<!> <!>",1);function d(s,e){C(e,!1),$();var t=G(),a=y(t);r(a,{name:"Default",parameters:{__svelteCsf:{rawCode:`<ResumeComponentStoryFrame filename={args.filename}>
  <div class="resume-contact-icon-story">
    <span class="resume-contact-icon-story__icon">
      <ResumeContactIcon kind={args.kind} size={args.size} />
    </span>
    <span>{args.kind}</span>
  </div>
</ResumeComponentStoryFrame>`}}});var n=m(a,2);r(n,{name:"GitHub",args:{filename:"resume-contact-github.pdf",kind:"github",size:18},parameters:{__svelteCsf:{rawCode:`<ResumeComponentStoryFrame filename={args.filename}>
  <div class="resume-contact-icon-story">
    <span class="resume-contact-icon-story__icon">
      <ResumeContactIcon kind={args.kind} size={args.size} />
    </span>
    <span>{args.kind}</span>
  </div>
</ResumeComponentStoryFrame>`}}}),c(s,t),R()}d.__docgen={data:[],name:"ResumeContactIcon.stories.svelte"};const u=z(d,F),L=["Default","GitHub"],N={...u.Default,tags:["svelte-csf-v5"]},Q={...u.GitHub,tags:["svelte-csf-v5"]};export{N as Default,Q as GitHub,L as __namedExportsOrder,F as default};
