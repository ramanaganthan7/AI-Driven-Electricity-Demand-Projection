import json
weekly=10
monthly=10000
with open('C:\\Users\\raman\\Documents\\demand_final_vit\\AI-Driven-Electricity-Demand-Projection-rf\\AI_DRIVEN_ELECTRICITY_DEMAND_PREDICTION\\prediction_model\\Electricity-demand\\randomforest\\demand_analysis_rf.json', 'r') as file:
    demand_data = json.load(file)
print(demand_data)