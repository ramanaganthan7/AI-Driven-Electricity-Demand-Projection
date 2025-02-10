"use client";
import { useState ,useEffect} from "react";
import { Bar, BarChart, Pie, PieChart, XAxis, YAxis } from "recharts";
import "../styles/demand.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer, 
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function Demandprediction() {
    const [f_month, setFMonth] = useState([]);
    const [frontend_season, setFrontendSeason] = useState([]);
    const [f_days, setFDays] = useState([]);
    const [f_temp, setFTemp] = useState([]);
    const [proceed, setProceed] = useState(false);
  
    useEffect(() => {
      // Fetching the data from the backend
      const fetchData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/predict');
          const data = await response.json();
          
  
          // Storing Monthly Data
          const monthlyData = data.from_frontend["Monthly Analysis"].map(item => [
            [item.Avg_Demand, item.Max_Demand, item.Min_Demand]
          ]);
          console.log(monthlyData);
          setFMonth(monthlyData);
  
          // Storing Seasonal Data
          const seasonalData = data.from_frontend["Seasonal Analysis"].map(item => [
            [item.Avg_Demand, item.Max_Demand, item.Min_Demand]
          ]);
          setFrontendSeason(seasonalData);
          console.log(seasonalData);
  
          // Storing Weekday/Weekend/Holiday Data
          const daysData = data.from_frontend["Weekday/Weekend/Holiday Analysis"].map(item => [
            [item.Avg_Demand, item.Max_Demand, item.Min_Demand]
          ]);
          setFDays(daysData);
          console.log(daysData);
  
          // Storing Temperature Data
          const tempData = data.from_frontend["Temperature Analysis"].map(item => [
            [item.Avg_Demand, item.Max_Demand, item.Min_Demand]
          ]);
          setFTemp(tempData);
        console.log(tempData);
        setProceed(true);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData();
    }, []); 


  const [activeView, setActiveView] = useState("monthly");
if (proceed){
    const getBarData = () => {
        switch (activeView) {
          case "monthly":
            return [
              { name: "Jan", demand: f_month[0][0][0], maxdemand: f_month[0][0][1], mindemand: f_month[0][0][2] },
              { name: "Feb", demand: f_month[1][0][0], maxdemand: f_month[1][0][1], mindemand: f_month[1][0][2] },
              { name: "Mar", demand: f_month[2][0][0], maxdemand: f_month[2][0][1], mindemand: f_month[2][0][2] },
              { name: "Apr", demand: f_month[3][0][0], maxdemand: f_month[3][0][1], mindemand: f_month[3][0][2] },
              { name: "May", demand: f_month[4][0][0], maxdemand: f_month[4][0][1], mindemand: f_month[4][0][2] },
              { name: "Jun", demand: f_month[5][0][0], maxdemand: f_month[5][0][1], mindemand: f_month[5][0][2] },
              { name: "Jul", demand: f_month[6][0][0], maxdemand: f_month[6][0][1], mindemand: f_month[6][0][2] },
              { name: "Aug", demand: f_month[7][0][0], maxdemand: f_month[7][0][1], mindemand: f_month[7][0][2] },
              { name: "Sep", demand: f_month[8][0][0], maxdemand: f_month[8][0][1], mindemand: f_month[8][0][2] },
              { name: "Oct", demand: f_month[9][0][0], maxdemand: f_month[9][0][1], mindemand: f_month[9][0][2] },
              { name: "Nov", demand: f_month[10][0][0], maxdemand: f_month[10][0][1], mindemand: f_month[10][0][2] },
              { name: "Dec", demand: f_month[11][0][0], maxdemand: f_month[11][0][1], mindemand: f_month[11][0][2] },
            ];
          case "seasonal":
            return [
              { name: "RainFall", demand: frontend_season[0][0][0], maxdemand: frontend_season[0][0][1], mindemand: frontend_season[0][0][2] },
              { name: "Spring", demand: frontend_season[1][0][0], maxdemand: frontend_season[1][0][1], mindemand: frontend_season[1][0][2] },
              { name: "Summer", demand: frontend_season[2][0][0], maxdemand: frontend_season[2][0][1], mindemand: frontend_season[2][0][2] },
              { name: "Winter", demand: frontend_season[3][0][0], maxdemand: frontend_season[3][0][1], mindemand: frontend_season[3][0][2] },
            ];
          case "Days":
            return [
              { name: "Working Days", demand: f_days[0][0][0], maxdemand: f_days[0][0][1], mindemand: f_days[0][0][2] },
              { name: "Weekly Holidays", demand: f_days[1][0][0], maxdemand: f_days[1][0][1], mindemand: f_days[1][0][2] },
              { name: "Government Holidays", demand: f_days[2][0][0], maxdemand: f_days[2][0][1], mindemand: f_days[2][0][2] },
            ];
          case "Temperature":
            return [
              { name: "Cold", demand: f_temp[0][0][0], maxdemand: f_temp[0][0][1], mindemand: f_temp[0][0][2] },
              { name: "Hot", demand: f_temp[1][0][0], maxdemand: f_temp[1][0][1], mindemand: f_temp[1][0][2] },
              { name: "Normal", demand: f_temp[2][0][0], maxdemand: f_temp[2][0][1], mindemand: f_temp[2][0][2] },
            ];
        }
    };
    


    const getPieData = () => {
        switch (activeView) {
          case "monthly":
            return [
              { name: "January", value: f_month[0][0][0], fill: "hsl(0, 64.00%, 66.30%)" }, // Matte Red
              { name: "February", value: f_month[1][0][0], fill: "hsl(30, 65%, 45%)" }, // Matte Orange
              { name: "March", value: f_month[2][0][0], fill: "hsl(60, 65%, 50%)" }, // Matte Yellow
              { name: "April", value: f_month[3][0][0], fill: "hsl(90, 65%, 40%)" }, // Matte Green
              { name: "May", value: f_month[4][0][0], fill: "hsl(120, 65%, 45%)" }, // Matte Light Green
              { name: "June", value: f_month[5][0][0], fill: "hsl(150, 65%, 50%)" }, // Matte Aqua
              { name: "July", value: f_month[6][0][0], fill: "hsl(180, 65%, 45%)" }, // Matte Teal
              { name: "August", value: f_month[7][0][0], fill: "hsl(210, 65%, 40%)" }, // Matte Blue
              { name: "September", value: f_month[8][0][0], fill: "hsl(240, 45%, 45%)" }, // Matte Indigo
              { name: "October", value: f_month[9][0][0], fill: "hsl(270, 65%, 50%)" }, // Matte Purple
              { name: "November", value: f_month[10][0][0], fill: "hsl(300, 65%, 45%)" }, // Matte Pink
              { name: "December", value: f_month[11][0][0], fill: "hsl(330, 65%, 40%)" }, // Matte Magenta
            ];
            
            
          case "seasonal":
            return [
              { name: "RainFall", value: frontend_season[0][0][0], fill: "hsl(var(--chart-1))" },
              { name: "Spring", value: frontend_season[1][0][0], fill: "hsl(var(--chart-2))" },
              { name: "Summer", value: frontend_season[2][0][0], fill: "hsl(var(--chart-3))" },
              { name: "Winter", value: frontend_season[3][0][0], fill: "hsl(var(--chart-4))" },
            ];
          case "Days":
            return [
              { name: "Working Days", value: f_days[0][0][0], fill: "hsl(var(--chart-1))" },
              { name: "Weekly Holidays", value: f_days[1][0][0], fill: "hsl(var(--chart-2))" },
              { name: "Government Holidays", value: f_days[2][0][0], fill: "hsl(var(--chart-3))" },
            ];
          case "Temperature":
            return [
              { name: "Cold", value: f_temp[0][0][0], fill: "hsl(var(--chart-1))" },
              { name: "Hot", value: f_temp[1][0][0], fill: "hsl(var(--chart-2))" },
              { name: "Normal", value: f_temp[2][0][0], fill: "hsl(var(--chart-3))" },
            ];
        }
      };
      



  return (
    <div>
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold hea">Demand Prediction for 2025</h1>
        <div className="flex flex-wrap gap-4">
          <Button variant={activeView === "monthly" ? "default" : "outline"} onClick={() => setActiveView("monthly")}>
            Monthly
          </Button>
          <Button variant={activeView === "seasonal" ? "default" : "outline"} onClick={() => setActiveView("seasonal")}>
            Seasonal
          </Button>
          <Button variant={activeView === "Days" ? "default" : "outline"} onClick={() => setActiveView("Days")}>
            Holidays
          </Button>
          <Button variant={activeView === "Temperature" ? "default" : "outline"} onClick={() => setActiveView("Temperature")}>
            Temperature
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visual Representation</CardTitle>
          <CardDescription>Demand patterns across different time periods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-6">
            <ChartContainer config={{ demand: { label: "Demand" } }} className="min-h-[400px] w-full lg:w-1/2">
              <BarChart data={getBarData()} margin={{ left: 40, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fill: "hsl(var(--foreground))" }} tickLine={{ stroke: "hsl(var(--foreground))" }} axisLine={{ stroke: "hsl(var(--foreground))" }} />
                <YAxis label={{ value: "Demand", angle: -90, position: "insideLeft", fill: "hsl(var(--foreground))" }} tick={{ fill: "hsl(var(--foreground))" }} tickLine={{ stroke: "hsl(var(--foreground))" }} axisLine={{ stroke: "hsl(var(--foreground))" }} />
                <Bar dataKey="demand" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
              </BarChart>
            </ChartContainer>

            <ChartContainer config={{ value: { label: "Value" } }} className="min-h-[400px] w-full lg:w-1/2">
              <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <Pie data={getPieData()} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} label={(entry) => entry.name} labelLine />
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
                <ChartLegend content={<ChartLegendContent nameKey="name" />} className="flex-wrap gap-2" />
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
    <div className="t_container">
      <h1 className="t_heading">Tabular Representation</h1>

      <div className="t_button-group"></div>

      <table className="t_table">
        <thead>
          <tr>
            <th>{activeView}</th>
            <th>Min Demand</th>
            <th>Avg Demand</th>
            <th>Max Demand</th>
          </tr>
        </thead>
        <tbody>

          {getBarData().map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.mindemand}</td>
              <td>{item.demand}</td>
              <td>{item.maxdemand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  </div>
  );
}else{
    return(
      <div>
        <h1>No Data Available</h1>
      </div>
    )
}
}
