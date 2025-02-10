const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Enable CORS for all origins (you can restrict it to specific domains if needed)
app.use(cors());

// Path to the existing CSV file
const csvFilePath = "C:\\Users\\raman\\Documents\\AI_DRIVEN_ELECTRICITY_DEMAND_PREDICTION\\AI-Driven-Electricity-Demand-Projection\\AI_DRIVEN_ELECTRICITY_DEMAND_PREDICTION\\prediction_model\\Electricity-demand\\randomforest\\2025_demand_prediction_rf.csv";

// Route to download the CSV file
app.get("/api/download-csv", (req, res) => {
  // Sending the CSV file as an attachment for download
  res.download(csvFilePath, "demand_data.csv", (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error downloading file");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
