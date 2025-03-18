const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Path to the existing CSV file
const csvFilePath = "C:\\Users\\raman\\Documents\\demand_final_vit\\AI-Driven-Electricity-Demand-Projection-rf\\AI_DRIVEN_ELECTRICITY_DEMAND_PREDICTION\\prediction_model\\Electricity-demand\\randomforest\\2025_demand_prediction_rf.csv";

// Route to download the CSV file
app.get("/api/download-csv", (req, res) => {
  console.log("Downloading CSV file...");
  res.download(csvFilePath, "demand_data.csv", (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error downloading file");
    }
  });
});

const users = [
  { email: "ramanaganthan2005@gmail.com", password: "123", role: "administrator" },
  { email: "user@example.com", password: "user123", role: "user" },
];

// Login API
app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;
  console.log(email, password, role);

  if (!email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = users.find((u) => u.email === email && u.password === password && u.role === role);

  if (user) {
    res.json({ message: "Login successful", user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
