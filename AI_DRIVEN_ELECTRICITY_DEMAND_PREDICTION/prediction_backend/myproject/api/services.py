import json
weekly=10
monthly=10000
with open('C:\\Users\\raman\Documents\\ELECTRICITY_DEMAND\\prediction_model\\Electricity-demand\\randomforest\\demand_analysis_rf.json', 'r') as file:
    demand_data = json.load(file)
print(demand_data)