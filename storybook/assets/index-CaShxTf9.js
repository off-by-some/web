function i(t,r={}){return t.replace(/\{(\w+)\}/g,(f,n)=>n in r?String(r[n]):`{${n}}`)}export{i as f};
