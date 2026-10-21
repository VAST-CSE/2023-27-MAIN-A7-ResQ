(function(){
  "use strict";
  const api=window.ReliefOps;
  function render(){
    const {teams,requests}=api.getState(),active=requests.filter(r=>r.status!=="Resolved"&&r.assignedTeamId);
    const available=teams.filter(team=>!active.some(r=>r.assignedTeamId===team.id)).length;
    document.getElementById("team-summary").innerHTML=[["Total teams",teams.length,""],["Available",available,"success"],["Active assignments",active.length,"warning"]].map(([label,value,kind])=>`<article class="stat-card ${kind}"><div><div class="stat-label">${label}</div><div class="stat-value">${value}</div><div class="stat-note">Demonstration roster</div></div><span class="stat-icon">♧</span></article>`).join("");
    document.getElementById("teams-grid").innerHTML=teams.map(team=>{const assigned=active.filter(r=>r.assignedTeamId===team.id);const availability=assigned.length?"On assignment":team.availability;return `<article class="panel team-card"><div class="team-card-head"><span class="team-avatar">${team.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</span><span class="status-badge ${assigned.length?"status-assigned":"status-resolved"}">${availability}</span></div><h2>${api.escapeHTML(team.name)}</h2><div class="team-type">${api.escapeHTML(team.type)}</div><div class="team-stats"><span>Active assignments</span><strong>${assigned.length}</strong></div><div class="team-contact">☎ &nbsp;${api.escapeHTML(team.contact)}</div>${assigned.length?`<div class="team-contact">Assigned to: ${assigned.map(r=>`<a class="request-link" href="request-details.html?id=${encodeURIComponent(r.id)}">${api.escapeHTML(r.id)}</a>`).join(", ")}</div>`:"<div class=\"team-contact\">No active requests assigned</div>"}</article>`;}).join("");
  }
  render();
})();
