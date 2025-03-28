
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

const data = [
  { name: "Week 1", active: 750, total: 1000 },
  { name: "Week 2", active: 950, total: 1300 },
  { name: "Week 3", active: 1150, total: 1600 },
  { name: "Week 4", active: 1350, total: 1950 },
  { name: "Week 5", active: 1550, total: 2300 },
  { name: "Week 6", active: 1750, total: 2650 },
  { name: "Week 8", active: 2250, total: 3400 },
];

const UserGrowthChart = () => {
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
