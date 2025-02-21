const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3002;

app.use(cors());

// Path to the existing CSV file
const csvFilePath = "C:\\Users\\raman\\Documents\\demand_final_vit\\AI-Driven-Electricity-Demand-Projection-rf\\AI_DRIVEN_ELECTRICITY_DEMAND_PREDICTION\\prediction_model\\Electricity-demand\\randomforest\\2025_demand_prediction_rf.csv";

// Route to download the CSV file
app.get("/api/download-csv", (req, res) => {
  // Sending the CSV file as an attachment for download
  console.log("Downloading CSV file...");
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
