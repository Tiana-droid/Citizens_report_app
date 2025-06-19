const getAllIncidence =
  "https://api.jsonbin.io/v3/b/6604a2f3fe36e24a20a8f8c0/latest?_sort=day";

async function allIncidenceApi(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const getAPI = data.record.incidents;

    return getAPI;
  } catch (error) {
    console.error("There was a problem fetching the data:", error.message);
    return { error: error.message };
  }
}
// Add click event to go to details page
function goToDetails(id) {
  window.location.href = `details.html?id=${id}`;
}

function displayIncidents(incidents) {
  const cardWrapper = document.getElementById("cardWrapper");
  cardWrapper.innerHTML = ""; // Clear previous content

  incidents.forEach((incident, index) => {
    // Unique map ID
    const mapId = `mini-map-${index}`;

    let mapHTML = "";
    if (incident.location && incident.location.lat && incident.location.lng) {
      mapHTML = `<div id="${mapId}" style="height: 200px;"></div>`;
    } else {
      `<p>No location available</p>`;
    }

    //HTML card showing incidence content with unique map container
    const showIncidence = `
        <div class="card">
        <b>${incident.date}</b>
        <h3>${incident.title}</h3>
        <img src="data:${incident.type};base64,${incident.img}" alt="${
      incident.filename
    }" />
        <p>${incident.content}</p>
        <p>Category: ${incident.category}</p>
        <p>Address: ${incident.address}</p>
         ${
           incident.location && incident.location.lat && incident.location.lng
             ? `${mapHTML}`
             : `<p>No location available</p>`
         }
         <button onclick="goToDetails('${incident.id}')">View Details</button>
      </div>
    `;

    cardWrapper.innerHTML += showIncidence;

    // Initialize map only if location data is present
    if (incident.location && incident.location.lat && incident.location.lng) {
      setTimeout(() => {
        const miniMap = L.map(mapId).setView(
          [incident.location.lat, incident.location.lng],
          13
        );
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
          miniMap
        );
        L.marker([incident.location.lat, incident.location.lng]).addTo(miniMap);
      }, 0);
    }
  });
}

function populateCategoryFilter(incidents) {
  const categoryFilter = document.getElementById("categoryFilter");

  const uniqueCategories = [
    ...new Set(incidents.map((incident) => incident.category)),
  ];

  const options = uniqueCategories.map(
    (category) => `<option value="${category}">${category}</option>`
  );

  categoryFilter.innerHTML += options.join("");
}

document.getElementById("filterButton").addEventListener("click", async () => {
  const selectedCategory = document.getElementById("categoryFilter").value;

  try {
    const incidents = await allIncidenceApi(getAllIncidence);
    const filteredIncidents = selectedCategory
      ? incidents.filter((incident) => incident.category === selectedCategory)
      : incidents;

    displayIncidents(filteredIncidents);
  } catch (error) {
    console.error(error);
  }
});

(async function () {
  try {
    const incidents = await allIncidenceApi(getAllIncidence);
    populateCategoryFilter(incidents);
    displayIncidents(incidents);
  } catch (error) {
    console.error(error);
  }
})();

// Fetch and display incidents
