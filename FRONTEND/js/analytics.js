(function(){
  "use strict";
  const api=window.ReliefOps,{requests,teams}=api.getState();
  if(!window.Chart){document.querySelector(".analytics-grid").innerHTML='<section class="panel empty-state"><strong>Charts could not be loaded.</strong><p>Check your internet connection to load Chart.js.</p></section>';return;}
  const colors=["#d83f4f","#dda02b","#35a06b","#527acb","#9771c7","#51a9a0","#d78645"];
  const base={responsive:true,maintainAspectRatio:false,plugins:{legend:{position:"bottom",labels:{usePointStyle:true,boxWidth:8,padding:13,font:{size:10}}}}};
  function counts(items,key,labels){return labels.map(label=>items.filter(x=>x[key]===label).length);}
  function chart(id,type,labels,values,background,options={}){new Chart(document.getElementById(id),{type,data:{labels,datasets:[{data:values,backgroundColor:background,borderWidth:type==="line"?2:0,borderColor:"#527acb",fill:type==="line",tension:.35,pointRadius:3}]},options:{...base,...options}});}
  chart("analytics-priority","doughnut",["High","Medium","Low"],counts(requests,"priority",["HIGH","MEDIUM","LOW"]),colors.slice(0,3));
  const disasterLabels=[...new Set(requests.map(r=>r.disasterType))];
  chart("analytics-disasters","bar",disasterLabels,counts(requests,"disasterType",disasterLabels),colors,{scales:{y:{beginAtZero:true,ticks:{precision:0}},x:{grid:{display:false}}}});
  const statuses=["New","Assigned","In progress","Resolved"];
  chart("analytics-status","doughnut",statuses,counts(requests,"status",statuses),["#dda02b","#527acb","#9771c7","#35a06b"]);
  const days=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push(d);}
  chart("analytics-trend","line",days.map(d=>d.toLocaleDateString(undefined,{weekday:"short"})),days.map(d=>requests.filter(r=>new Date(r.createdAt).toDateString()===d.toDateString()).length),"#527acb",{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{precision:0}},x:{grid:{display:false}}}});
  const needCounts={};requests.flatMap(r=>r.assistance||[]).forEach(need=>needCounts[need]=(needCounts[need]||0)+1);
  const needs=Object.entries(needCounts).sort((a,b)=>b[1]-a[1]).slice(0,7);
  chart("analytics-needs","bar",needs.map(x=>x[0]),needs.map(x=>x[1]),"#56a8a0",{indexAxis:"y",plugins:{legend:{display:false}},scales:{x:{beginAtZero:true,ticks:{precision:0}},y:{grid:{display:false}}}});
  const active=requests.filter(r=>r.status!=="Resolved");
  chart("analytics-workload","bar",teams.map(t=>t.name),teams.map(t=>active.filter(r=>r.assignedTeamId===t.id).length),colors,{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{precision:0}},x:{grid:{display:false}}}});
})();
