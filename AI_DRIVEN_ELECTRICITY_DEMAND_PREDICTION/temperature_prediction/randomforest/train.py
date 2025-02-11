import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split

# Load dataset
df = pd.read_csv("C:\\Users\\raman\\Documents\\ELECTRICITY_DEMAND\\prediction_model\\data\\Dataset.csv")

# Extract features and target variables
df["Date"] = pd.to_datetime(df["Date"])
df["Month"] = df["Date"].dt.month
df["Day"] = df["Date"].dt.day
df["Year"] = df["Date"].dt.year

features = ["dayofweek", "Month", "Day", "Year"]
target_temp = ["tempmax", "tempmin", "temp"]
target_env = ["dew", "humidity", "solarenergy"]

# Train model for temperature-related values
X_train, X_test, y_train, y_test = train_test_split(df[features], df[target_temp], test_size=0.2, random_state=42)
temp_model = RandomForestRegressor(n_estimators=100, random_state=42)
temp_model.fit(X_train, y_train)
y_pred_temp = temp_model.predict(X_test)
temp_mae = mean_absolute_error(y_test, y_pred_temp)

# Train model for environmental values
X_train_env, X_test_env, y_train_env, y_test_env = train_test_split(df[features], df[target_env], test_size=0.2, random_state=42)
env_model = RandomForestRegressor(n_estimators=100, random_state=42)
env_model.fit(X_train_env, y_train_env)
y_pred_env = env_model.predict(X_test_env)
env_mae = mean_absolute_error(y_test_env, y_pred_env)

# Save models
joblib.dump(temp_model, "temperature_model.pkl")
joblib.dump(env_model, "environment_model.pkl")

print(f"Temperature Model MAE: {temp_mae}")
print(f"Environmental Model MAE: {env_mae}")
