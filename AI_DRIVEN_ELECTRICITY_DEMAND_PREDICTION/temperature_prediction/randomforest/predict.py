import pandas as pd
import joblib

# Load models
temp_model = joblib.load("temperature_model.pkl")
env_model = joblib.load("environment_model.pkl")

# Create a DataFrame for 2025
date_range = pd.date_range(start="2025-01-01", end="2025-12-31", freq="D")
data_2025 = pd.DataFrame({
    "Date": date_range,
    "dayofweek": date_range.dayofweek,
    "Month": date_range.month,
    "Day": date_range.day,
    "Year": date_range.year
})

# Predict values
data_2025[["tempmax", "tempmin", "temp"]] = temp_model.predict(data_2025[["dayofweek", "Month", "Day", "Year"]])
data_2025[["dew", "humidity", "solarenergy"]] = env_model.predict(data_2025[["dayofweek", "Month", "Day", "Year"]])

# Save predictions
data_2025.to_csv("Predictions_2025_Daily.csv", index=False)
print("Daily predictions for 2025 saved to 'Predictions_2025_Daily.csv'")
