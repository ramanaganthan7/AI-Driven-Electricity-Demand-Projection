import React from "react";
import "../styles/report.css";
import re from "../assets/report.jpg";

export default function Reports() {
    const handleDownload = async () => {
        try {
          // Trigger the download from the backend
          const response = await fetch("http://localhost:3001/api/download-csv");
          if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
      
            const a = document.createElement("a");
            a.href = url;
            a.download = "demand_data.csv"; // Set the filename
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          } else {
            console.error("Download failed");
          }
        } catch (error) {
          console.error("Error downloading file:", error);
        }
      };
      
      
  return (
    <div className="container">
      <div className="grid">
        <div className="card image-card">
          <div className="card-content">
            <img
              src={re}
              alt="Featured image"
              className="image"
            />
          </div>
        </div>

        <div className="card text-card">
          <div className="card-content">
            <div className="text-section">
              <h2 className="title" >  Electricity Demand Forecast for 2025</h2>
              <p className="description">
              Explore the detailed electricity demand data for each day of 2025, including factors such as temperature, humidity, solar energy production, dew point, maximum temperature, and minimum temperature. This dataset is essential for understanding energy consumption patterns and planning for efficient energy distribution.
              </p>
            </div>

            <button onClick={handleDownload} className="download-button">
              <span className="icon">↓</span> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
