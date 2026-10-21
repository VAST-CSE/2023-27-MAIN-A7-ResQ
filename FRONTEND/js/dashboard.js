(function(){
  "use strict";
  const api=window.ReliefOps;
  let priorityChart=null,trendChart=null;
  function render(){
    const {requests,teams}=api.getState();
    const counts={high:requests.filter(r=>r.priority==="HIGH").length,pending:requests.filter(r=>!r.assignedTeamId&&r.status!=="Resolved").length,resolved:requests.filter(r=>r.status==="Resolved").length};
    document.getElementById("dashboard-stats").innerHTML=[
      ["Total requests",requests.length,"All reports received","▤",""],
      ["High priority",counts.high,"Requires urgent attention","!","alert"],
      ["Pending assignment",counts.pending,"Awaiting a response team","◷","warning"],
      ["Resolved requests",counts.resolved,"Response marked complete","✓","success"]
    ].map(([label,value,note,icon,style])=>`<article class="stat-card ${style}"><div><div class="stat-label">${label}</div><div class="stat-value">${value}</div><div class="stat-note">${note}</div></div><span class="stat-icon">${icon}</span></article>`).join("");
    document.getElementById("recent-requests").innerHTML=`<div class="recent-list">${[...requests].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,4).map(r=>`<a class="recent-item" href="request-details.html?id=${encodeURIComponent(r.id)}" style="text-decoration:none"><i class="recent-dot ${r.priority.toLowerCase()}"></i><div><div class="recent-message">${api.escapeHTML(r.message)}</div><div class="recent-meta">${api.escapeHTML(r.location)} · ${api.escapeHTML(r.id)}</div></div>${api.badge(r.priority)}</a>`).join("")}</div>`;
    const max=Math.max(requests.length,1);
    document.getElementById("response-snapshot").innerHTML=`<div class="snapshot-list">${[["Unassigned",requests.filter(r=>!r.assignedTeamId&&r.status!=="Resolved").length],["In progress",requests.filter(r=>r.status==="In progress").length],["Teams available",teams.filter(team=>!requests.some(r=>r.assignedTeamId===team.id&&r.status!=="Resolved")).length],["People affected",requests.reduce((n,r)=>n+(Number(r.peopleAffected)||0),0)]].map(([label,n])=>`<div><div class="snapshot-row"><span>${label}</span><strong>${n}</strong></div><div class="snapshot-bar"><span style="width:${Math.min(label==="People affected"?100:n/max*100,100)}%"></span></div></div>`).join("")}</div>`;
    const priority=["HIGH","MEDIUM","LOW"].map(p=>requests.filter(r=>r.priority===p).length);
    if(window.Chart){
      if(priorityChart)priorityChart.destroy();
      if(trendChart)trendChart.destroy();
      priorityChart=new Chart(document.getElementById("priority-chart"),{type:"doughnut",data:{labels:["High","Medium","Low"],datasets:[{data:priority,backgroundColor:["#dc4654","#e5aa37","#43a675"],borderWidth:0,hoverOffset:4}]},options:{maintainAspectRatio:false,cutout:"70%",plugins:{legend:{position:"bottom",labels:{usePointStyle:true,boxWidth:7,padding:16,font:{size:10}}}}}});
      const daily=trendData(requests);
      trendChart=new Chart(document.getElementById("trend-chart"),{type:"line",data:{labels:daily.labels,datasets:[{data:daily.values,borderColor:"#4776d0",backgroundColor:"#eaf0ff",fill:true,tension:.35,pointRadius:3,pointBackgroundColor:"#4776d0"}]},options:{maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{precision:0},grid:{color:"#eff2f6"}},x:{grid:{display:false}}}}});
    }else{document.querySelectorAll(".chart-wrap").forEach(el=>el.innerHTML='<p class="muted">Chart library unavailable. Request data is still accessible elsewhere.</p>');}
    wireForm();
  }
  function trendData(requests){const days=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push(d);}return{labels:days.map(d=>d.toLocaleDateString(undefined,{weekday:"short"})),values:days.map(d=>requests.filter(r=>new Date(r.createdAt).toDateString()===d.toDateString()).length)};}
  function wireForm(){
    const form=document.getElementById("sos-form"),preview=document.getElementById("classification-preview");
    form.addEventListener("input",()=>{const msg=form.elements.message.value.trim(),kind=form.elements.disasterType.value;if(msg.length>=12&&kind){const c=api.classifyMessage(msg,kind);preview.hidden=false;preview.innerHTML=`<strong>Demonstration NLP classification · ${api.badge(c.priority)}</strong><p>${api.escapeHTML(c.reason)}</p><small>Category: ${api.escapeHTML(c.detectedDisaster)} · Assistance: ${api.escapeHTML(c.assistance.join(", "))} · Possible location: ${api.escapeHTML(c.possibleLocation)}</small>`;}else preview.hidden=true;});
    form.addEventListener("submit",event=>{event.preventDefault();if(!form.reportValidity()){api.toast("Please complete the required fields and check the values.",true);return;}
      const data=new FormData(form),message=String(data.get("message")).trim(),location=String(data.get("location")).trim(),kind=String(data.get("disasterType"));
      if(message.length<12||location.length<2){api.toast("Add a detailed message and a valid location.",true);return;}
      const classification=api.classifyMessage(message,kind),state=api.getState();
      const request={id:api.makeId(),message,location,disasterType:kind,assistance:classification.assistance,peopleAffected:Number(data.get("peopleAffected")),priority:classification.priority,priorityExplanation:classification.reason,status:"New",assignedTeamId:"",createdAt:new Date().toISOString(),coordinates:[12.9716+(Math.random()-.5)*.08,77.5946+(Math.random()-.5)*.08],history:[{status:"New",at:new Date().toISOString()}],nlp:classification};
      state.requests.unshift(request);if(api.save()){form.reset();preview.hidden=true;api.toast(`Request ${request.id} submitted as ${request.priority} priority.`);render();window.scrollTo({top:0,behavior:"smooth"});}
    });
  }
  render();
})();
