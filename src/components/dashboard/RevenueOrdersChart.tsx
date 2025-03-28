
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { name: "Jan", revenue: 1200000, orders: 2800 },
  { name: "Feb", revenue: 1800000, orders: 3200 },
  { name: "Mar", revenue: 2200000, orders: 3600 },
  { name: "Apr", revenue: 2600000, orders: 4000 },
  { name: "May", revenue: 2900000, orders: 4200 },
  { name: "Jun", revenue: 3200000, orders: 4500 },
  { name: "Jul", revenue: 3500000, orders: 4800 },
  { name: "Aug", revenue: 3800000, orders: 5100 },
  { name: "Sep", revenue: 4100000, orders: 5400 },
  { name: "Oct", revenue: 4400000, orders: 5700 },
  { name: "Nov", revenue: 4700000, orders: 6000 },
  { name: "Dec", revenue: 5000000, orders: 6300 },
];

const RevenueOrdersChart = () => {
  const formatRevenue = (value: number) => {
    if (value >= 1000000) {
      return `₹${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}K`;
    }
    return `₹${value}`;
  };

  return (
    <ChartContainer
      config={{
        revenue: {
          label: "Revenue",
          theme: {
            light: "#3b82f6",
            dark: "#60a5fa",
          },
        },
        orders: {
          label: "Orders",
          theme: {
            light: "#e2e8f0",
            dark: "#94a3b8",
          },
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis 
            yAxisId="left"
            axisLine={false} 
            tickLine={false}
            tickFormatter={formatRevenue} 
            domain={['auto', 'auto']}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            axisLine={false} 
            tickLine={false} 
            hide
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            name="revenue"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 1 }}
            activeDot={{ r: 6, strokeWidth: 1 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="orders"
            name="orders"
            stroke="var(--color-orders)"
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RevenueOrdersChart;
