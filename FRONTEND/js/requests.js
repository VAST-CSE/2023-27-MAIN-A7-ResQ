(function(){
  "use strict";
  const api=window.ReliefOps,controls=["request-search","priority-filter","status-filter","disaster-filter","sort-requests"];
  const filters={search:"",priority:"",status:"",disaster:"",sort:"newest"};
  function init(){
    const select=document.getElementById("disaster-filter");
    [...new Set(api.getState().requests.map(r=>r.disasterType))].sort().forEach(type=>select.add(new Option(type,type)));
    document.getElementById("request-search").addEventListener("input",e=>{filters.search=e.target.value.toLowerCase();render();});
    document.getElementById("priority-filter").addEventListener("change",e=>{filters.priority=e.target.value;render();});
    document.getElementById("status-filter").addEventListener("change",e=>{filters.status=e.target.value;render();});
    document.getElementById("disaster-filter").addEventListener("change",e=>{filters.disaster=e.target.value;render();});
    document.getElementById("sort-requests").addEventListener("change",e=>{filters.sort=e.target.value;render();});
    document.getElementById("clear-filters").addEventListener("click",()=>{controls.forEach(id=>{const el=document.getElementById(id);el.value=id==="sort-requests"?"newest":"";});Object.assign(filters,{search:"",priority:"",status:"",disaster:"",sort:"newest"});render();});
    document.getElementById("requests-table").addEventListener("change",event=>{const el=event.target;if(!el.matches("[data-action]"))return;const id=el.dataset.id,request=api.getState().requests.find(r=>r.id===id);if(!request)return;
      if(el.dataset.action==="status"){if(api.updateRequest(id,{status:el.value})){api.toast(`${id} status updated.`);render();}}
      if(el.dataset.action==="team"){if(api.updateRequest(id,{assignedTeamId:el.value})){if(el.value&&request.status==="New")api.updateRequest(id,{status:"Assigned"});api.toast(`${id} team assignment updated.`);render();}}
    });
    render();
  }
  function render(){
    const teamOptions=api.getState().teams.map(t=>`<option value="${api.escapeHTML(t.id)}">${api.escapeHTML(t.name)}</option>`).join("");
    let list=api.getState().requests.filter(r=>(!filters.search||`${r.id} ${r.message} ${r.location}`.toLowerCase().includes(filters.search))&&(!filters.priority||r.priority===filters.priority)&&(!filters.status||r.status===filters.status)&&(!filters.disaster||r.disasterType===filters.disaster));
    if(filters.sort==="priority")list.sort((a,b)=>({HIGH:0,MEDIUM:1,LOW:2}[a.priority]-{HIGH:0,MEDIUM:1,LOW:2}[b.priority])||b.createdAt.localeCompare(a.createdAt));
    else list.sort((a,b)=>filters.sort==="oldest"?a.createdAt.localeCompare(b.createdAt):b.createdAt.localeCompare(a.createdAt));
    document.getElementById("request-count").textContent=`Showing ${list.length} of ${api.getState().requests.length} requests`;
    document.getElementById("requests-empty").hidden=list.length>0;
    document.getElementById("requests-table").innerHTML=list.map(r=>`<tr><td><a class="request-link" href="request-details.html?id=${encodeURIComponent(r.id)}">${api.escapeHTML(r.id)}</a><div class="table-secondary">${new Date(r.createdAt).toLocaleDateString()}</div></td><td><div class="table-message">${api.escapeHTML(r.message)}</div></td><td>${api.escapeHTML(r.location)}<div class="table-secondary">${Number(r.peopleAffected)||0} affected</div></td><td>${api.escapeHTML(r.disasterType)}<div class="table-secondary">${api.escapeHTML((r.assistance||[]).join(", "))}</div></td><td>${api.badge(r.priority)}</td><td><select class="table-select" data-action="status" data-id="${api.escapeHTML(r.id)}" aria-label="Update status for ${api.escapeHTML(r.id)}">${["New","Assigned","In progress","Resolved"].map(x=>`<option ${r.status===x?"selected":""}>${x}</option>`).join("")}</select></td><td><select class="table-select" data-action="team" data-id="${api.escapeHTML(r.id)}" aria-label="Assign rescue team to ${api.escapeHTML(r.id)}"><option value="">Unassigned</option>${teamOptions}</select></td></tr>`).join("");
    document.querySelectorAll('#requests-table [data-action="team"]').forEach(el=>{el.value=api.getState().requests.find(r=>r.id===el.dataset.id)?.assignedTeamId||"";});
  }
  init();
})();
