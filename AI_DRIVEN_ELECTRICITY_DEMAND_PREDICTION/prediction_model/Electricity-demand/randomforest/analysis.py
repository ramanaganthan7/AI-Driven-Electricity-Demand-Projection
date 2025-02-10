import pandas as pd
import numpy as np
import json

# Load the demand dataset
df = pd.read_csv('C:\\Users\\raman\\Documents\\ELECTRICITY_DEMAND\\prediction_model\\Electricity-demand\\randomforest\\2025_demand_prediction_rf.csv')
df['Date'] = pd.to_datetime(df['Date'])

# Load the government holidays dataset
holidays_df = pd.read_csv('C:\\Users\\raman\\Documents\\ELECTRICITY_DEMAND\\prediction_model\\data\\holidays_updated.csv')
holidays_df['Date'] = pd.to_datetime(holidays_df['Date'], dayfirst=True)

# Extract useful features
df['Month'] = df['Date'].dt.month
df['DayOfWeek'] = df['Date'].dt.dayofweek

# Define seasons
def get_season(month):
    if month in [12, 1, 2]: return 'Winter'
    elif month in [3, 4]: return 'Spring'
    elif month in [5, 6, 7, 8]: return 'Summer'
    else: return 'Rainfall'

df['Season'] = df['Month'].apply(get_season)

# Identify weekdays, weekends, and government holidays
df['DayType'] = df['DayOfWeek'].apply(lambda x: 'Weekend' if x >= 5 else 'Weekday')
df['IsHoliday'] = df['Date'].isin(holidays_df['Date'])

# Temperature Classification
def classify_temperature(temp):
    if temp < 20:
        return 'Cool'
    elif 20 <= temp < 30:
        return 'Normal'
    else:
        return 'Hot'

df['TempCategory'] = df['temp'].apply(classify_temperature)

# Month-wise Analysis
monthly_analysis = df.groupby('Month').agg(
    Max_Demand=('Predicted Max Demand (MW)', 'max'),
    Min_Demand=('Predicted Max Demand (MW)', 'min'),
    Avg_Demand=('Predicted Max Demand (MW)', 'mean')
).reset_index()

# Season-wise Analysis
seasonal_analysis = df.groupby('Season').agg(
    Max_Demand=('Predicted Max Demand (MW)', 'max'),
    Min_Demand=('Predicted Max Demand (MW)', 'min'),
    Avg_Demand=('Predicted Max Demand (MW)', 'mean')
).reset_index()

# Temperature-wise Demand Analysis
temperature_analysis = df.groupby('TempCategory').agg(
    Avg_Demand=('Predicted Max Demand (MW)', 'mean'),
    Max_Demand=('Predicted Max Demand (MW)', 'max'),
    Min_Demand=('Predicted Max Demand (MW)', 'min')
).reset_index()

# Yearly Weekday/Weekend/Holiday Demand Analysis
yearly_weekend_weekday_holiday_analysis = pd.DataFrame({
    "DayType": ['Weekday', 'Weekend', 'Holiday'],
    "Avg_Demand": [
        df[df['DayType'] == 'Weekday']['Predicted Max Demand (MW)'].mean(),
        df[df['DayType'] == 'Weekend']['Predicted Max Demand (MW)'].mean(),
        df[df['IsHoliday']]['Predicted Max Demand (MW)'].mean()
    ],
    "Max_Demand": [
        df[df['DayType'] == 'Weekday']['Predicted Max Demand (MW)'].max(),
        df[df['DayType'] == 'Weekend']['Predicted Max Demand (MW)'].max(),
        df[df['IsHoliday']]['Predicted Max Demand (MW)'].max()
    ],
    "Min_Demand": [
        df[df['DayType'] == 'Weekday']['Predicted Max Demand (MW)'].min(),
        df[df['DayType'] == 'Weekend']['Predicted Max Demand (MW)'].min(),
        df[df['IsHoliday']]['Predicted Max Demand (MW)'].min()
    ]
})

# Convert results to JSON format and print
results = {
    "Monthly Analysis": monthly_analysis.to_dict(orient='records'),
    "Seasonal Analysis": seasonal_analysis.to_dict(orient='records'),
    "Temperature Analysis": temperature_analysis.to_dict(orient='records'),
    "Weekday/Weekend/Holiday Analysis": yearly_weekend_weekday_holiday_analysis.to_dict(orient='records')
}

print(json.dumps(results, indent=4))

# Save the results as JSON
with open('demand_analysis_rf.json', 'w') as f:
    json.dump(results, f, indent=4)

# Save the results as CSV files
monthly_analysis.to_csv('monthly_demand_analysis_rf.csv', index=False)
seasonal_analysis.to_csv('seasonal_demand_analysis_rf.csv', index=False)
temperature_analysis.to_csv('temperature_demand_analysis_rf.csv', index=False)
yearly_weekend_weekday_holiday_analysis.to_csv('weekday_weekend_demand_analysis_rf.csv', index=False)