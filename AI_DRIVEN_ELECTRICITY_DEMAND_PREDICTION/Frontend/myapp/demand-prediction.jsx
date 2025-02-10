import { useState } from "react"
import { Bar, BarChart, Pie, PieChart, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function DemandPrediction() {
  const [activeView, setActiveView] = useState("monthly")

  const getBarData = () => {
    switch (activeView) {
      case "monthly":
        return [
          { name: "Jan", demand: 400 },
          { name: "Feb", demand: 300 },
          { name: "Mar", demand: 600 },
          { name: "Apr", demand: 400 },
          { name: "May", demand: 500 },
          { name: "Jun", demand: 350 },
          { name: "Jul", demand: 450 },
          { name: "Aug", demand: 550 },
          { name: "Sep", demand: 400 },
          { name: "Oct", demand: 500 },
          { name: "Nov", demand: 600 },
          { name: "Dec", demand: 700 },
        ]
      case "seasonal":
        return [
          { name: "Spring", demand: 1300 },
          { name: "Summer", demand: 1350 },
          { name: "Fall", demand: 1500 },
        ]
      case "holidays":
        return [
          { name: "Weekly Holidays", demand: 800 },
          { name: "Government Holidays", demand: 1200 },
        ]
    }
  }

  const getPieData = () => {
    switch (activeView) {
      case "monthly":
        return [
          { name: "January", value: 400, fill: "hsl(var(--chart-1))" },
          { name: "February", value: 300, fill: "hsl(var(--chart-2))" },
          { name: "March", value: 600, fill: "hsl(var(--chart-3))" },
          { name: "April", value: 400, fill: "hsl(var(--chart-4))" },
          { name: "May", value: 500, fill: "hsl(var(--chart-5))" },
          { name: "June", value: 350, fill: "hsl(var(--chart-6))" },
          { name: "July", value: 450, fill: "hsl(var(--chart-7))" },
          { name: "August", value: 550, fill: "hsl(var(--chart-8))" },
          { name: "September", value: 400, fill: "hsl(var(--chart-9))" },
          { name: "October", value: 500, fill: "hsl(var(--chart-10))" },
          { name: "November", value: 600, fill: "hsl(var(--chart-11))" },
          { name: "December", value: 700, fill: "hsl(var(--chart-12))" },
        ]
      case "seasonal":
        return [
          { name: "Spring", value: 1300, fill: "hsl(var(--chart-1))" },
          { name: "Summer", value: 1350, fill: "hsl(var(--chart-2))" },
          { name: "Winter", value: 1600, fill: "hsl(var(--chart-3))" },
        ]
      case "holidays":
        return [
          { name: "Weekly Holidays", value: 800, fill: "hsl(var(--chart-1))" },
          {
            name: "Government Holidays",
            value: 1200,
            fill: "hsl(var(--chart-2))",
          },
        ]
    }
  }

  return (
    (<div className="container mx-auto p-4 sm:p-6">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Demand Prediction for 2025</h1>
        <div className="flex flex-wrap gap-4">
          <Button
            variant={activeView === "monthly" ? "default" : "outline"}
            onClick={() => setActiveView("monthly")}>
            Monthly
          </Button>
          <Button
            variant={activeView === "seasonal" ? "default" : "outline"}
            onClick={() => setActiveView("seasonal")}>
            Seasonal
          </Button>
          <Button
            variant={activeView === "holidays" ? "default" : "outline"}
            onClick={() => setActiveView("holidays")}>
            Holidays
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
            <ChartContainer
              config={{
                demand: {
                  label: "Demand",
                },
              }}
              className="min-h-[400px] w-full lg:w-1/2">
              <BarChart data={getBarData()} margin={{ left: 40, bottom: 20 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: "hsl(var(--foreground))" }}
                  tickLine={{ stroke: "hsl(var(--foreground))" }}
                  axisLine={{ stroke: "hsl(var(--foreground))" }} />
                <YAxis
                  label={{
                    value: "Demand",
                    angle: -90,
                    position: "insideLeft",
                    fill: "hsl(var(--foreground))",
                  }}
                  tick={{ fill: "hsl(var(--foreground))" }}
                  tickLine={{ stroke: "hsl(var(--foreground))" }}
                  axisLine={{ stroke: "hsl(var(--foreground))" }} />
                <Bar dataKey="demand" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
              </BarChart>
            </ChartContainer>

            <ChartContainer
              config={{
                value: {
                  label: "Value",
                },
              }}
              className="min-h-[400px] w-full lg:w-1/2">
              <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <Pie
                  data={getPieData()}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label={(entry) => entry.name}
                  labelLine />
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                  className="flex-wrap gap-2" />
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>)
  );
}

