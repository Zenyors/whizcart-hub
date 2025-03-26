
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";

// Sample data - in a real app, this would come from your API
const monthlyData = [
  { name: "Jan", revenue: 120000 },
  { name: "Feb", revenue: 150000 },
  { name: "Mar", revenue: 180000 },
  { name: "Apr", revenue: 145000 },
  { name: "May", revenue: 195000 },
  { name: "Jun", revenue: 220000 },
  { name: "Jul", revenue: 240000 },
  { name: "Aug", revenue: 280000 },
  { name: "Sep", revenue: 265000 },
  { name: "Oct", revenue: 310000 },
  { name: "Nov", revenue: 350000 },
  { name: "Dec", revenue: 390000 },
];

const weeklyData = [
  { name: "Mon", revenue: 35000 },
  { name: "Tue", revenue: 42000 },
  { name: "Wed", revenue: 58000 },
  { name: "Thu", revenue: 45000 },
  { name: "Fri", revenue: 59000 },
  { name: "Sat", revenue: 72000 },
  { name: "Sun", revenue: 64000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-2 text-xs">
        <p className="font-medium">{label}</p>
        <p className="text-primary">₹{(payload[0].value).toLocaleString()}</p>
      </div>
    );
};
  return null;
};

const RevenueChart = () => {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly">("monthly");
  const chartData = timeframe === "weekly" ? weeklyData : monthlyData;

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>
            {timeframe === "monthly" ? "Monthly" : "Weekly"} revenue breakdown
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeframe === "weekly" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe("weekly")}
            className="h-8 text-xs transition-all"
          >
            Weekly
          </Button>
          <Button
            variant={timeframe === "monthly" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe("monthly")}
            className="h-8 text-xs transition-all"
          >
            Monthly
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `₹${value / 1000}k`}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ opacity: 0.1 }} />
              <Bar
                dataKey="revenue"
                radius={[4, 4, 0, 0]}
                fill="hsl(var(--primary))"
                barSize={timeframe === "weekly" ? 40 : 24}
                animationDuration={500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
