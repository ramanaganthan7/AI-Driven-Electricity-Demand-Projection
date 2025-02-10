# train_model.py

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib

# Load dataset
historical_data = pd.read_csv("C:\\Users\\raman\\Documents\\ELECTRICITY_DEMAND\\prediction_model\\data\\Dataset.csv")


# Feature engineering for historical data
historical_data['Date'] = pd.to_datetime(historical_data['Date'])
historical_data['Month'] = historical_data['Date'].dt.month
historical_data['Day'] = historical_data['Date'].dt.day
historical_data['Year'] = historical_data['Date'].dt.year

# Define features and target
features = ['dayofweek', 'tempmax', 'tempmin', 'temp', 'dew', 'humidity', 'solarenergy', 'Month', 'Day', 'Year']
target = 'Max Demand Met (MW)'

X = historical_data[features]
y = historical_data[target]

# Split data into training and validation sets
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Preprocessing pipeline
numeric_features = ['tempmax', 'tempmin', 'temp',  'dew', 'humidity', 'solarenergy']
categorical_features = ['dayofweek', 'Month', 'Day', 'Year']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numeric_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ])

# Create and train the Random Forest model
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

model.fit(X_train, y_train)

# Validate the model
y_pred = model.predict(X_val)
print(f'RMSE: {np.sqrt(mean_squared_error(y_val, y_pred))}')
print(f'MAE: {mean_absolute_error(y_val, y_pred)}')
print(f'R²: {r2_score(y_val, y_pred)}')

# Plot actual vs predicted values as a line graph
plt.figure(figsize=(10, 6))
plt.plot(y_val.values, label='Actual Values', linestyle='-', marker='o', color='blue')
plt.plot(y_pred, label='Predicted Values', linestyle='-', marker='x', color='red')
plt.xlabel('Data Points')
plt.ylabel('Electricity Demand (MW)')
plt.title('Actual vs Predicted Electricity Demand')
plt.legend()
plt.grid()
plt.show()

# Save the model
joblib.dump(model, 'electric_demand.pkl')