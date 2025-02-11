import pandas as pd
import numpy as np
import tensorflow as tf
import joblib
import matplotlib.pyplot as plt
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

# Load dataset
df = pd.read_csv(r"C:\\Users\\raman\\Documents\\ELECTRICITY_DEMAND\\prediction_model\\data\\Dataset.csv", parse_dates=["Date"])

# Extract date components
df["Month"] = df["Date"].dt.month
df["Day"] = df["Date"].dt.day
df["Year"] = df["Date"].dt.year

# Filter for 2024 data
df_2024 = df[df["Year"] == 2024]

# Define features and targets
temp_features = ["dayofweek", "Month", "Day", "Year", "cloudcover", "feelslike"]
temp_targets = ["tempmax", "tempmin", "temp"]

# Scaling
temp_scaler = MinMaxScaler()
temp_target_scaler = MinMaxScaler()

df[temp_features] = temp_scaler.fit_transform(df[temp_features])
df[temp_targets] = temp_target_scaler.fit_transform(df[temp_targets])

# Save scalers
joblib.dump(temp_scaler, "temp_scaler.pkl")
joblib.dump(temp_target_scaler, "temp_target_scaler.pkl")

# Function to create LSTM sequences
def create_sequences(data, target_columns, seq_length=10):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:i + seq_length, :-len(target_columns)])  # Input features
        y.append(data[i + seq_length, -len(target_columns):])  # Targets
    return np.array(X), np.array(y)

# Prepare sequences
temp_data = df[temp_features + temp_targets].values
temp_X, temp_y = create_sequences(temp_data, temp_targets)

# Define LSTM model
def build_lstm(input_shape, output_size):
    model = Sequential([
        LSTM(64, return_sequences=True, input_shape=input_shape),
        LSTM(32),
        Dense(output_size)
    ])
    model.compile(optimizer='adam', loss='mse')
    return model

# Train temperature model
temp_model = build_lstm(temp_X.shape[1:], len(temp_targets))
temp_model.fit(temp_X, temp_y, epochs=30, batch_size=32, verbose=1)
temp_model.save("temp_model.keras")

print("Temperature model trained and saved successfully.")

# Load trained model and predict
temp_model = load_model("temp_model.keras", compile=False)
temp_model.compile(optimizer='adam', loss='mse')  # Recompile model
temp_predictions = temp_model.predict(temp_X)

# Debugging statements
print("Predictions shape:", temp_predictions.shape)
print("Sample predictions:", temp_predictions[:5])
print("Actual values shape:", temp_y.shape)
print("Sample actual values:", temp_y[:5])

# Load scaler
temp_target_scaler = joblib.load("temp_target_scaler.pkl")

# Inverse transform predictions and actual values
temp_predictions = temp_target_scaler.inverse_transform(temp_predictions)
temp_y_actual = temp_target_scaler.inverse_transform(temp_y)

# Calculate evaluation metrics
rmse = np.sqrt(mean_squared_error(temp_y_actual, temp_predictions))
mae = mean_absolute_error(temp_y_actual, temp_predictions)
r2 = r2_score(temp_y_actual, temp_predictions)

# Print metrics
print(f"RMSE: {rmse}")
print(f"MAE: {mae}")
print(f"R2 Score: {r2}")

# Filter actual data for 2024
df_2024 = df[(df["Year"] == 2024)].copy()

# Extract actual temperature values for 2024
actual_temp_2024 = df_2024[["Date", "temp"]].reset_index(drop=True)

# Ensure temp_predictions has the correct length
predicted_temp_2024 = pd.DataFrame({
    "Date": actual_temp_2024["Date"],
    "temp": temp_predictions[:len(actual_temp_2024), 2]  # Selecting the correct column
})
# Convert 'Date' column to datetime format for proper plotting
actual_temp_2024["Date"] = pd.to_datetime(actual_temp_2024["Date"])
predicted_temp_2024["Date"] = pd.to_datetime(predicted_temp_2024["Date"])


dataset = pd.read_csv(r"C:\Users\Rakesh\OneDrive\Desktop\vit hackathon\temperature\randomforest\Dataset.csv", parse_dates=["Date"])


dataset["Month"] = dataset["Date"].dt.month
dataset["Day"] = dataset["Date"].dt.day
dataset["Year"] = dataset["Date"].dt.year

actual_data = dataset[(dataset["Date"] >= "2024-01-01") & (dataset["Date"] <= "2024-08-31")]


columns_needed = ["Date", "dayofweek", "Month", "Day", "Year", "dew", "humidity", "solarenergy", "tempmax", "tempmin", "temp"]
actual_data = actual_data[columns_needed].reset_index(drop=True)

#plt.plot(predicted_temp_2024["Date"], predicted_temp_2024["temp"], label="Predicted Temperature", color='red', linestyle='dashed')
# Ensure temp_predictions has enough values for 2024
predicted_temp_2024 = pd.DataFrame({
    "Date": actual_data["Date"],  # Use actual date range
    "temp": temp_predictions[-len(actual_data):, 2]  # Correctly align predictions with actual dates
})

# Convert 'Date' column to datetime format for proper plotting
predicted_temp_2024["Date"] = pd.to_datetime(predicted_temp_2024["Date"])

plt.figure(figsize=(10, 5))
plt.plot(actual_data["Date"], actual_data["temp"], label="Actual Temperature", color="blue")
plt.plot(predicted_temp_2024["Date"], predicted_temp_2024["temp"], label="Predicted Temperature", color='red', linestyle='dashed')

#plt.plot(predicted_data["Date"], predicted_data["temp"], label="Predicted Temperature", color="red", linestyle="dashed")
plt.xlabel("Date")
plt.ylabel("Temperature")
plt.title("Actual vs. Predicted Temperature (2024)")
plt.legend()
plt.xticks(rotation=45)
plt.grid()
plt.show()
print(f"RMSE for 2024 predictions: {rmse}")
