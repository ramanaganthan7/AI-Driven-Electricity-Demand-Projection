import pandas as pd
import joblib
import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_error

# Load dataset (actual data for comparison)
dataset = pd.read_csv("dataset.csv", parse_dates=["Date"])

# Extract Month, Day, and Year from Date
dataset["Month"] = dataset["Date"].dt.month
dataset["Day"] = dataset["Date"].dt.day
dataset["Year"] = dataset["Date"].dt.year

# Filter actual data up to 2024-08-31
actual_data = dataset[(dataset["Date"] >= "2024-01-01") & (dataset["Date"] <= "2024-08-31")]

# Select required columns
columns_needed = ["Date", "dayofweek", "Month", "Day", "Year", "dew", "humidity", "solarenergy", "tempmax", "tempmin", "temp"]
actual_data = actual_data[columns_needed].reset_index(drop=True)

# Load trained models
env_model = joblib.load("environment_model.pkl")  # Predicts dew, humidity, solarenergy
temp_model = joblib.load("temperature_model.pkl")  # Predicts tempmax, tempmin, temp

# Prepare features for prediction
X_test = actual_data[["dayofweek", "Month", "Day", "Year"]]

# Predict using saved models
predicted_data = actual_data.copy()
predicted_data[["dew", "humidity", "solarenergy"]] = env_model.predict(X_test)
predicted_data[["tempmax", "tempmin", "temp"]] = temp_model.predict(X_test)

# Compute MAE for each variable
mae_scores = {}
for col in ["dew", "humidity", "solarenergy", "tempmax", "tempmin", "temp"]:
    mae_scores[col] = mean_absolute_error(actual_data[col], predicted_data[col])
    print(f"{col} Model MAE: {mae_scores[col]:.4f}")

# Plot Actual vs. Predicted Temperature
plt.figure(figsize=(10, 5))
plt.plot(actual_data["Date"], actual_data["temp"], label="Actual Temperature", color="blue")
plt.plot(predicted_data["Date"], predicted_data["temp"], label="Predicted Temperature", color="red", linestyle="dashed")
plt.xlabel("Date")
plt.ylabel("Temperature")
plt.title("Actual vs. Predicted Temperature (2024)")
plt.legend()
plt.xticks(rotation=45)
plt.grid()
plt.show()
