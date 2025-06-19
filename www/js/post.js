//function to POST new incident
const createForm = document.getElementById("createForm");
const statusDiv = document.getElementById("status");

createForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const newCategory = document.getElementById("incidentType").value;
  const newTitle = document.getElementById("title").value;
  const newContent = document.getElementById("content").value;
  const newDate = document.getElementById("datePickerId").value;
  const imageInput = document.getElementById("imageInput").files[0];
  const newAddress = document.getElementById("addressInput").value;
  try {
    const base64Image = await getBase64(imageInput);

    const recordResponse = await fetch(
      "https://api.jsonbin.io/v3/b/6604a2f3fe36e24a20a8f8c0/latest",
      {
        method: "GET",
        headers: {
          "X-Master-Key":
            "$2a$10$fwgqE7ZB.7nDc7q7nyVBIu0rewQsGpOT0MUNA3LNaeVeFNwKVTJYO",
        },
      }
    );

    if (!recordResponse.ok) {
      throw new Error("Failed to fetch record data");
    }

    const recordData = await recordResponse.json();

    const newIncident = {
      id: Math.floor(Math.random() * 100),
      category: newCategory,
      title: newTitle,
      content: newContent,
      date: newDate,
      img: base64Image,
      filename: imageInput.name,
      type: imageInput.type,
      address: newAddress,
      location: {
        lat: document.getElementById("latitude").value,
        lng: document.getElementById("longitude").value
      }
    };

    const addNewIncidents = [...recordData.record.incidents, newIncident];
    const updateRecordedIncidents = {
      ...recordData.record,
      incidents: addNewIncidents,
    };

    const updateResponse = await fetch(
      "https://api.jsonbin.io/v3/b/6604a2f3fe36e24a20a8f8c0",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key":
            "$2a$10$fwgqE7ZB.7nDc7q7nyVBIu0rewQsGpOT0MUNA3LNaeVeFNwKVTJYO",
        },
        body: JSON.stringify(updateRecordedIncidents),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Failed to create new incident");
    }

    const updatedData = await updateResponse.json();
    console.log("New incident created:", updatedData);
    statusDiv.textContent = "Incident Posted Successfully";
    createForm.reset();
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.error("Error creating new incident:", error.message);
    statusDiv.textContent = "Error creating incident";
  }
});

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
}
// Function to get the location from the address input and display it on the map
let map;
document.getElementById("locateBtn").addEventListener("click", async () => {
  const address = document.getElementById("addressInput").value.trim();
  if (!address) return alert("Please enter an address");

  const url = await fetch(`https://citizens-report-app.onrender.com/geocode?address=${encodeURIComponent(address)}`);


  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) {
      alert("Address not found.");
      return;
    }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    if (map) {
      map.remove(); // reset previous map instance
    }
    map = L.map("map").setView([lat, lon], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        L.marker([lat, lon]).addTo(map).bindPopup("Incident Location").openPopup();
        document.getElementById('latitude').value = lat;
  document.getElementById('longitude').value = lon;
  } catch (error) {
    console.error("Error fetching location data:", error);
    alert("Error fetching location data.");
    return;
  }
})

// Set the date input to today's date and restrict future dates
datePickerId.max = new Date().toISOString().split("T")[0];