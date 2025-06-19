const params = new URLSearchParams(window.location.search);
const incidentId = params.get("id");


if (incidentId) {
  fetch("https://api.jsonbin.io/v3/b/6604a2f3fe36e24a20a8f8c0/latest?_sort=day")
    .then(res => res.json())
    .then(data => {
      const incident = data.record.incidents.find(item => item.id == incidentId);

      if (!incident) {
        document.getElementById("incident-details").innerHTML = "<p>Incident not found.</p>";
        return;
      }

      
      const html = `
        <h2>${incident.title}</h2>
        <p><strong>Date:</strong> ${incident.date}</p>
        <p><strong>Category:</strong> ${incident.category}</p>
        <img src="data:${incident.type};base64,${incident.img}" alt="${incident.filename}" />
        <p>${incident.content}</p>
        <div id="map" style="height: 200px;"></div>
      `;

      document.getElementById("incident-details").innerHTML = html;

      
      if (incident.location && incident.location.lat && incident.location.lng) {
        const map = L.map("map").setView([incident.location.lat, incident.location.lng], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
        L.marker([incident.location.lat, incident.location.lng]).addTo(map);
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById("incident-details").innerHTML = "<p>Error loading incident.</p>";
    });
} else {
  document.getElementById("incident-details").innerHTML = "<p>No ID provided.</p>";
}
