//function to POST new incident
const createForm = document.getElementById("createForm");
const statusDiv = document.getElementById("status");

createForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const newCategory = document.getElementById("incidentType").value;
  const newTitle = document.getElementById("title").value;
  const newContent = document.getElementById("content").value;
  const newDate = document.getElementById("date").value;
  const imageInput = document.getElementById("imageInput").files[0];

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
      window.location.href = "/www";
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
