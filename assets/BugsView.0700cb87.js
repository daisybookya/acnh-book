import{L}from"./Layout.bbd8c550.js";import{r as h,l as b}from"./translation.6e7fee71.js";import{r as y,c as f,o as U,a as n,b as g,d as k,w as o,e as j,f as l,g as r,i as c,t as u,u as v,z as w,j as D}from"./index.b127c03b.js";import{f as A}from"./index.bc9575af.js";const F=l("h2",{class:"display-2"},[c("\u6606\u87F2\u554A "),l("span",{class:"sp-font"},"Bugs")],-1),O=c(" \u8ACB\u901A\u77E5\u7DB2\u7AD9\u7BA1\u7406\u54E1 "),R={key:1,class:"flex"},W={class:"filter-list layout gutter--md"},$={class:"row"},q={class:"flex xs12 sm7"},G={class:"item"},H={class:"flex xs12 sm5"},I={class:"item"},J={class:"data-list"},K={colspan:"8"},tt={__name:"BugsView",setup(P){const p=y({isError:!1,errorMsg:""}),a=y({list:[],keyword:"",rarity:{text:"\u5168\u90E8",value:"all"},result:f(()=>a.rarity.value==="all"?a.list:a.list.filter(t=>t.availability.rarity===a.rarity.value)),options:f(()=>{const t=[];return Object.entries(h).forEach(([s,m])=>{const d={text:m,value:s};t.push(d)}),t.unshift({text:"\u5168\u90E8",value:"all"}),t})}),x=[{key:"icon_uri",label:"\u5716\u7247",name:"image"},{key:"name.name-TWzh",label:"\u4E2D\u6587\u540D\u7A31"},{key:"availability.location",label:"\u51FA\u73FE\u5730\u9EDE",name:"location"},{key:"availability.rarity",label:"\u7A00\u6709\u5EA6",name:"rarity"},{key:"availability.time",label:"\u51FA\u73FE\u6642\u9593",name:"showTime",sortable:!0},{key:"availability.month-northern",label:"\u5317\u534A\u7403\u6708\u4EFD",name:"showNorth",sortable:!0},{key:"availability.month-southern",label:"\u5357\u534A\u7403\u6708\u4EFD",name:"showSouth",sortable:!0},{key:"price",label:"\u50F9\u683C",sortable:!0,sortingFn:(t,s)=>t-s}],i=y({current:1,perSize:15,total:f(()=>{const t=a.result.length;return t>0?Math.ceil(t/i.perSize):1})});U(()=>{A("bugs").then(t=>{a.list=t}).catch(t=>{p.isError=!0,p.errorMsg=`${t.statusText}`,console.error(t)})});const V=t=>{a.rarity=t.value,i.current=1};function z(t){return h[t]?h[t]:t}function T(t){return b[t]?b[t]:t}return(t,s)=>{const m=n("va-alert"),d=n("va-input"),B=n("va-select"),M=n("va-progress-circle"),S=n("va-image"),_=n("va-chip"),E=n("va-pagination"),N=n("va-data-table"),C=n("va-backtop");return g(),k(L,null,{title:o(()=>[F]),default:o(()=>[p.isError?(g(),k(m,{key:0,color:"warning",title:p.errorMsg,icon:"info",class:"mb-4"},{default:o(()=>[O]),_:1},8,["title"])):(g(),j("div",R,[l("div",W,[l("div",$,[l("div",q,[l("div",G,[r(d,{placeholder:"\u540D\u7A31\u95DC\u9375\u5B57\u641C\u5C0B...",modelValue:a.keyword,"onUpdate:modelValue":s[0]||(s[0]=e=>a.keyword=e)},null,8,["modelValue"])])]),l("div",H,[l("div",I,[r(B,{label:"\u7A00\u6709\u5EA6","onUpdate:modelValue":[V,s[1]||(s[1]=e=>a.rarity=e)],modelValue:a.rarity,options:a.options},null,8,["modelValue","options"])])])])]),l("div",J,[r(N,{striped:"","sticky-header":"",height:"500px",items:a.result,columns:x,"per-page":i.perSize,"current-page":i.current,filter:a.keyword},{"cell(image)":o(({value:e})=>[r(S,{src:e,style:{width:"70px"}},{loader:o(()=>[r(M,{indeterminate:""})]),_:2},1032,["src"])]),"cell(location)":o(({value:e})=>[c(u(T(e)),1)]),"cell(rarity)":o(({value:e})=>[c(u(z(e)),1)]),"cell(showTime)":o(({value:e})=>[r(_,{size:"small",outline:!e.length>0},{default:o(()=>[c(u(e.length>0?e:"\u6574\u5929\u90FD\u6709"),1)]),_:2},1032,["outline"])]),"cell(showNorth)":o(({value:e})=>[r(_,{size:"small",outline:!e.length>0},{default:o(()=>[c(u(v(w)(e)),1)]),_:2},1032,["outline"])]),"cell(showSouth)":o(({value:e})=>[r(_,{size:"small",outline:!e.length>0},{default:o(()=>[c(u(v(w)(e)),1)]),_:2},1032,["outline"])]),bodyAppend:o(()=>[l("tr",null,[l("td",K,[r(E,{modelValue:i.current,"onUpdate:modelValue":s[2]||(s[2]=e=>i.current=e),input:"",pages:i.total},null,8,["modelValue","pages"])])])]),_:1},8,["items","per-page","current-page","filter"]),r(C,{onClick:v(D)},null,8,["onClick"])])]))]),_:1})}}};export{tt as default};
