import torch
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

# Define Model Architecture
class DemandNN(torch.nn.Module):
    def __init__(self, input_dim, hidden_dim1=64, hidden_dim2=32, output_dim=1):
        super(DemandNN, self).__init__()
        self.fc1 = torch.nn.Linear(input_dim, hidden_dim1)
        self.relu1 = torch.nn.ReLU()
        self.fc2 = torch.nn.Linear(hidden_dim1, hidden_dim2)
        self.relu2 = torch.nn.ReLU()
        self.fc3 = torch.nn.Linear(hidden_dim2, output_dim)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu1(x)
        x = self.fc2(x)
        x = self.relu2(x)
        x = self.fc3(x)
        return x

# Load dataset
data = pd.read_csv("Predictions_2025_Daily.csv")

# Ensure features match trained model
features = ['dayofweek', 'Month', 'Day', 'Year','dew', 'humidity', 'solarenergy', 'tempmax', 'tempmin', 'temp']
X_future = data[features]

# Standardize the data
scaler = StandardScaler()
X_future_scaled = scaler.fit_transform(X_future)

# Convert to PyTorch tensor
X_future_tensor = torch.tensor(X_future_scaled, dtype=torch.float32)

# Load trained model
input_size = len(features)
model = DemandNN(input_dim=input_size)

# Load model weights
model.load_state_dict(torch.load("electricity_demand_nn.pth"), strict=False)
model.eval()

# Predict demand
with torch.no_grad():
    predictions = model(X_future_tensor).numpy().flatten()

# Save predictions with all original columns
data['Predicted_Demand'] = predictions
data.to_csv("Predicted_Demand_All_Columns.csv", index=False)

print("Predictions saved to 'Predicted_Demand_All_Columns.csv'")

