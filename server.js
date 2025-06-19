const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());


const serviceAccount = require("./citizen-report-solution-app-firebase-adminsdk-ahk08-493b3d996a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/", (req, res) => {
  res.send("Server is running and ready to accept requests.");
});

app.post("/notify", async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    notification: { title, body },
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    res.status(200).send({ success: true, response });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});



app.get("/geocode", async (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.status(400).json({ error: "Missing address" });
  }

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`, {
      headers: {
        'User-Agent': 'citizens-report-app (adelusic@gmail.com)'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Geocode error:", err);
    res.status(500).json({ error: "Failed to fetch geocode data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
