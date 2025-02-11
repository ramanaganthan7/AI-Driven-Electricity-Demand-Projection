import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from torch.utils.data import DataLoader, TensorDataset
import numpy as np

# Load dataset
data = pd.read_csv('Dataset.csv')

# Convert Date column to datetime format
data['Date'] = pd.to_datetime(data['Date'])

# Extract date features
data['Month'] = data['Date'].dt.month
data['Day'] = data['Date'].dt.day
data['Year'] = data['Date'].dt.year
data['dayofweek'] = data['Date'].dt.dayofweek

# Add lag features
data['Previous_Day_Demand'] = data['Max Demand Met (MW)'].shift(1).fillna(method='bfill')
data['Previous_7_Day_Demand'] = data['Max Demand Met (MW)'].shift(7).fillna(method='bfill')  # Weekly lag

# Add rolling statistics
data['Rolling_Mean_7_Days'] = data['Max Demand Met (MW)'].rolling(window=7).mean().fillna(method='bfill')
data['Rolling_Std_7_Days'] = data['Max Demand Met (MW)'].rolling(window=7).std().fillna(method='bfill')

# Add temperature difference feature
data['Temp_Diff'] = data['tempmax'] - data['tempmin']

# Define features and target
features = [
    'dayofweek', 'tempmax', 'tempmin', 'temp', 'dew', 'humidity', 'solarenergy', 
    'Month', 'Day', 'Year', 'Temp_Diff', 'Previous_Day_Demand', 'Previous_7_Day_Demand', 
    'Rolling_Mean_7_Days', 'Rolling_Std_7_Days'
]
target = 'Max Demand Met (MW)'

X = data[features].values
y = data[target].values

# Split data into train and validation sets
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize the features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_val = scaler.transform(X_val)

# Convert to PyTorch tensors
X_train_tensor = torch.tensor(X_train, dtype=torch.float32)
y_train_tensor = torch.tensor(y_train, dtype=torch.float32).view(-1, 1)
X_val_tensor = torch.tensor(X_val, dtype=torch.float32)
y_val_tensor = torch.tensor(y_val, dtype=torch.float32).view(-1, 1)

# Create DataLoader
train_dataset = TensorDataset(X_train_tensor, y_train_tensor)
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)

# Define Neural Network class with Dropout, Batch Normalization, and LeakyReLU
class DemandNN(nn.Module):
    def __init__(self, input_size):
        super(DemandNN, self).__init__()
        self.fc1 = nn.Linear(input_size, 256)
        self.bn1 = nn.BatchNorm1d(256)
        self.fc2 = nn.Linear(256, 128)
        self.bn2 = nn.BatchNorm1d(128)
        self.fc3 = nn.Linear(128, 64)
        self.fc4 = nn.Linear(64, 1)

        self.leaky_relu = nn.LeakyReLU(0.1)
        self.dropout = nn.Dropout(0.3)  # Dropout to prevent overfitting

    def forward(self, x):
        x = self.leaky_relu(self.bn1(self.fc1(x)))
        x = self.dropout(x)
        x = self.leaky_relu(self.bn2(self.fc2(x)))
        x = self.dropout(x)
        x = self.leaky_relu(self.fc3(x))
        x = self.fc4(x)
        return x

# Initialize model, loss function, and optimizer
model = DemandNN(input_size=len(features))
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-4)  # L2 Regularization
scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='min', factor=0.5, patience=10, verbose=True)

# Training loop with Early Stopping
num_epochs = 1000
best_val_loss = float('inf')
patience = 50  # Stop if no improvement in 'patience' epochs
counter = 0

for epoch in range(num_epochs):
    model.train()
    total_loss = 0
    for X_batch, y_batch in train_loader:
        optimizer.zero_grad()
        y_pred = model(X_batch)
        loss = criterion(y_pred, y_batch)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()

    # Validation
    model.eval()
    with torch.no_grad():
        y_val_pred = model(X_val_tensor)
        val_loss = criterion(y_val_pred, y_val_tensor).item()

    scheduler.step(val_loss)  # Adjust learning rate based on validation loss
    print(f"Epoch {epoch+1}/{num_epochs}, Train Loss: {total_loss:.4f}, Val Loss: {val_loss:.4f}")

    # Early Stopping Check
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        counter = 0
        torch.save(model.state_dict(), 'best_electricity_demand_nn.pth')  # Save best model
    else:
        counter += 1
        if counter >= patience:
            print("Early stopping triggered")
            break

# Load the best model before evaluation
model.load_state_dict(torch.load('best_electricity_demand_nn.pth'))

# Convert predictions and actual values to NumPy arrays
y_val_pred_numpy = y_val_pred.numpy().flatten()
y_val_true_numpy = y_val_tensor.numpy().flatten()
# Generate graph of actual vs predicted values
plt.figure(figsize=(10, 6))
plt.plot(y_val_true_numpy, label="Actual Values", color='blue')
plt.plot(y_val_pred_numpy, label="Predicted Values", color='red', linestyle='dashed')
plt.xlabel("Data Points")
plt.ylabel("Max Demand Met (MW)")
plt.title("Actual vs Predicted Max Demand")
plt.legend()
plt.show()

# Calculate evaluation metrics
mae = mean_absolute_error(y_val_true_numpy, y_val_pred_numpy)
r2 = r2_score(y_val_true_numpy, y_val_pred_numpy)
rmse = np.sqrt(mean_squared_error(y_val_true_numpy, y_val_pred_numpy))
print(f"RMSE: {rmse:.4f}")

print(f"RMSE: {rmse:.4f}")
print(f"MAE: {mae:.4f}")
print(f"R² Score: {r2:.4f}")

