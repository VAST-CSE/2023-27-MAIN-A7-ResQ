(function(){
  "use strict";
  const STORAGE_KEY="reliefops-demo-v1";
  const nav=[
    ["dashboard","index.html","▦","Overview"],
    ["sos","index.html#submit-sos","＋","Submit SOS"],
    ["requests","requests.html","▤","Emergency Requests"],
    ["teams","rescue-teams.html","♧","Rescue Teams"],
    ["map","map.html","⌖","Live Map"],
    ["analytics","analytics.html","▥","Analytics"]
  ];
  function readState(){
    try{
      const saved=localStorage.getItem(STORAGE_KEY);
      if(saved){const parsed=JSON.parse(saved);if(Array.isArray(parsed.requests)&&Array.isArray(parsed.teams))return parsed;}
      const fresh={requests:window.ReliefSampleData.requests,teams:window.ReliefSampleData.teams};
      localStorage.setItem(STORAGE_KEY,JSON.stringify(fresh));return fresh;
    }catch(error){console.error("Unable to load ReliefOps local data:",error);return {requests:window.ReliefSampleData.requests,teams:window.ReliefSampleData.teams};}
  }
  let state=readState();
  function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(error){console.error("Unable to save ReliefOps local data:",error);toast("Could not save changes in this browser. Check local storage availability.",true);return false;}return true;}
  function renderShell(){
    const host=document.getElementById("app-shell");if(!host)return;
    const page=document.body.dataset.page;
    host.innerHTML=`<aside class="sidebar"><a class="brand" href="index.html"><span class="brand-mark">R</span><span class="brand-name">RESQ<span class="brand-sub">RESPONSE PLATFORM</span></span></a><div class="nav-label">WORKSPACE</div><nav class="nav-links" aria-label="Main navigation">${nav.map(([key,href,icon,label])=>`<a href="${href}" class="${key===page?"active":""}" ${key===page?'aria-current="page"':""}><span class="nav-icon" aria-hidden="true">${icon}</span>${label}</a>`).join("")}</nav><div class="sidebar-bottom"><div class="demo-safe">ⓘ <span>Academic demo only.<br>Not connected to emergency services.</span></div><p>RESQ · 2026</p></div></aside>`;
  }
  function escapeHTML(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function teamName(id){const team=state.teams.find(t=>t.id===id);return team?team.name:"Unassigned";}
  function priorityClass(value){return "priority-"+String(value||"low").toLowerCase();}
  function statusClass(value){return "status-"+String(value||"new").toLowerCase().replace(/\s+/g,"-");}
  function badge(priority){return `<span class="priority-badge ${priorityClass(priority)}">${escapeHTML(priority)}</span>`;}
  function statusBadge(status){return `<span class="status-badge ${statusClass(status)}">${escapeHTML(status)}</span>`;}
  function toast(message,isError){const region=document.getElementById("toast-region");if(!region)return;const item=document.createElement("div");item.className="toast"+(isError?" error":"");item.textContent=message;region.appendChild(item);setTimeout(()=>item.remove(),3800);}
  const assistanceTerms=["boat rescue","rescue","medical aid","ambulance","first aid","drinking water","water","shelter","evacuation","food","blankets","fire support","debris clearing","medical supplies","power","sanitation"];
  const urgencyTerms=["trapped","trapped","immediate","urgent","urgently","injured","injuries","critical","life-threatening","can't breathe","cannot breathe","stranded","roof","rising fast","missing"];
  function classifyMessage(text,disasterType){
    const normalized=text.toLowerCase();
    const found=assistanceTerms.filter(term=>normalized.includes(term));
    const assistance=[...new Set(found.length?found:["general assistance"])];
    const urgent=urgencyTerms.filter(term=>normalized.includes(term));
    let priority="LOW",reason="No immediate danger is described; the message appears to request non-urgent support.";
    if(urgent.length>=1){priority="HIGH";reason=`Urgent danger language (${[...new Set(urgent)].join(", ")}) suggests an immediate life-safety risk.`;}
    else if(["flood","earthquake","cyclone","fire","landslide"].includes(String(disasterType).toLowerCase())||assistance.some(a=>["medical aid","ambulance","first aid","evacuation","fire support","rescue"].includes(a))){priority="MEDIUM";reason="The reported hazard or requested assistance merits a timely response; no explicit immediate life-safety threat was detected.";}
    const categories=[["Flood",["flood","water rising","inundat"]],["Earthquake",["earthquake","building shook","aftershock"]],["Cyclone",["cyclone","storm","hurricane"]],["Fire",["fire","smoke","burning"]],["Landslide",["landslide","mudslide"]]];
    const detected=categories.find(([,words])=>words.some(word=>normalized.includes(word)));
    const locationMatch=text.match(/\b(?:at|near|in|from)\s+([A-Z][\w-]*(?:\s+[A-Z][\w-]*){0,3})/);
    return {priority,reason,assistance,detectedDisaster:detected?detected[0]:disasterType,possibleLocation:locationMatch?locationMatch[1]:"Not confidently detected"};
  }
  function recordStatus(request,status){
    if(request.status===status)return;
    request.status=status;request.updatedAt=new Date().toISOString();
    request.history=Array.isArray(request.history)?request.history:[];
    request.history.unshift({status,at:request.updatedAt});
  }
  function getState(){return state;}
  function updateRequest(id,updates){const request=state.requests.find(item=>item.id===id);if(!request)return false;const nextStatus=updates.status;const changedStatus=Object.prototype.hasOwnProperty.call(updates,"status");const otherUpdates={...updates};delete otherUpdates.status;Object.assign(request,otherUpdates);if(changedStatus)recordStatus(request,nextStatus);return save();}
  function makeId(){let id;do{id=`RLF-${new Date().getFullYear()}-${String(Math.floor(1000+Math.random()*9000))}`;}while(state.requests.some(r=>r.id===id));return id;}
  renderShell();
  window.ReliefOps={getState,save,toast,escapeHTML,teamName,priorityClass,badge,statusBadge,classifyMessage,updateRequest,recordStatus,makeId,STORAGE_KEY};
})();
