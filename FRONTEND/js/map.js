(function(){
  "use strict";
  if(!window.L){document.getElementById("incident-map").innerHTML='<div class="empty-state"><strong>Map library could not be loaded.</strong><p>Check your internet connection to load Leaflet map tiles.</p></div>';return;}
  const map=L.map("incident-map").setView([12.9716,77.5946],12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
  const colors={HIGH:"#d83f4f",MEDIUM:"#dda02b",LOW:"#35a06b"};
  window.ReliefOps.getState().requests.forEach(request=>{
    const coords=request.coordinates;if(!Array.isArray(coords)||coords.length!==2)return;
    const marker=L.circleMarker(coords,{radius:9,color:"#fff",weight:2,fillColor:colors[request.priority]||colors.LOW,fillOpacity:.95}).addTo(map);
    marker.bindPopup(`<strong>${window.ReliefOps.escapeHTML(request.id)}</strong><br>${window.ReliefOps.badge(request.priority)}<p>${window.ReliefOps.escapeHTML(request.location)}</p><p>${window.ReliefOps.escapeHTML(request.message.slice(0,130))}${request.message.length>130?"…":""}</p><a href="request-details.html?id=${encodeURIComponent(request.id)}">View request details</a>`);
  });
})();
