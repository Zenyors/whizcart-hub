
import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Daily data - 7 days
const dailyData = [
  { name: "Day 1", active: 250, total: 320 },
  { name: "Day 2", active: 280, total: 350 },
  { name: "Day 3", active: 300, total: 380 },
  { name: "Day 4", active: 320, total: 410 },
  { name: "Day 5", active: 350, total: 450 },
  { name: "Day 6", active: 380, total: 480 },
  { name: "Day 7", active: 400, total: 510 },
];

// Weekly data - 8 weeks
const weeklyData = [
  { name: "Week 1", active: 750, total: 1000 },
  { name: "Week 2", active: 950, total: 1300 },
  { name: "Week 3", active: 1150, total: 1600 },
  { name: "Week 4", active: 1350, total: 1950 },
  { name: "Week 5", active: 1550, total: 2300 },
  { name: "Week 6", active: 1750, total: 2650 },
  { name: "Week 7", active: 2000, total: 3000 },
  { name: "Week 8", active: 2250, total: 3400 },
];

// Monthly data - 12 months
const monthlyData = [
  { name: "Jan", active: 3200, total: 4500 },
  { name: "Feb", active: 4100, total: 5800 },
  { name: "Mar", active: 5000, total: 7000 },
  { name: "Apr", active: 5700, total: 8100 },
  { name: "May", active: 6500, total: 9200 },
  { name: "Jun", active: 7200, total: 10300 },
  { name: "Jul", active: 8000, total: 11400 },
  { name: "Aug", active: 8800, total: 12600 },
  { name: "Sep", active: 9600, total: 13700 },
  { name: "Oct", active: 10400, total: 14900 },
  { name: "Nov", active: 11300, total: 16000 },
  { name: "Dec", active: 12200, total: 17100 },
];

// Yearly data - 5 years
const yearlyData = [
  { name: "2021", active: 24000, total: 36000 },
  { name: "2022", active: 48000, total: 68000 },
  { name: "2023", active: 86000, total: 110000 },
  { name: "2024", active: 125000, total: 156000 },
  { name: "2025", active: 145000, total: 180000 },
];

const UserGrowthChart = ({ period = "monthly" }) => {
  // Select the appropriate data based on period
  const getChartData = () => {
    switch (period) {
      case "daily": return dailyData;
      case "weekly": return weeklyData;
      case "yearly": return yearlyData;
      default: return monthlyData;
    }
  };

  const data = getChartData();

  return (
    <ChartContainer
      config={{
        total: {
          label: "Total Users",
          theme: {
            light: "rgba(96, 165, 250, 0.6)",
            dark: "rgba(96, 165, 250, 0.6)",
          },
        },
        active: {
          label: "Active Users",
          theme: {
            light: "rgba(244, 114, 182, 0.6)",
            dark: "rgba(244, 114, 182, 0.6)",
          },
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f472b6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f472b6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area 
            type="monotone" 
            dataKey="total" 
            name="total"
            stroke="#60a5fa" 
            fillOpacity={1} 
            fill="url(#colorTotal)" 
          />
          <Area 
            type="monotone" 
            dataKey="active" 
            name="active"
            stroke="#f472b6" 
            fillOpacity={1} 
            fill="url(#colorActive)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default UserGrowthChart;
