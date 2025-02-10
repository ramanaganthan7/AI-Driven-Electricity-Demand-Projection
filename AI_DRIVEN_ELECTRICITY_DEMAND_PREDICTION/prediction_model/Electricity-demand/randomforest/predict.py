# predict.py

import pandas as pd
import joblib

# Load the trained model
model = joblib.load('electric_demand.pkl')

# Load future dataset
future_data = pd.read_csv('C:\\Users\\raman\\Documents\\ELECTRICITY_DEMAND\\prediction_model\\data\\Predictions_2025_Daily.csv')

# Feature engineering for 2025 data
future_data['Date'] = pd.to_datetime(future_data['Date'])
future_data['Month'] = future_data['Date'].dt.month
future_data['Day'] = future_data['Date'].dt.day
future_data['Year'] = future_data['Date'].dt.year

# Define features Date,dayofweek,Month,Day,Year,tempmax,tempmin,temp,dew,humidity,solarenergy
features = ['Date','dayofweek','Month','Day','Year','tempmax','tempmin','temp','dew','humidity','solarenergy']

# Predict for 2025
X_2025 = future_data[features]
predictions_2025 = model.predict(X_2025)

# Save predictions to a CSV
future_data['Predicted Max Demand (MW)'] = predictions_2025
future_data.to_csv('2025_demand_prediction_rf.csv', index=False)