
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample data for different periods
const dailyData = [
  { category: "Electronics", sales: 120000 },
  { category: "Home", sales: 90000 },
  { category: "Fashion", sales: 70000 },
  { category: "Sports", sales: 50000 },
  { category: "Books", sales: 40000 },
  { category: "Toys", sales: 30000 },
];

const weeklyData = [
  { category: "Electronics", sales: 850000 },
  { category: "Home", sales: 620000 },
  { category: "Fashion", sales: 480000 },
  { category: "Sports", sales: 320000 },
  { category: "Books", sales: 290000 },
  { category: "Toys", sales: 210000 },
];

const monthlyData = [
  { category: "Electronics", sales: 3200000 },
  { category: "Home", sales: 2400000 },
  { category: "Fashion", sales: 1800000 },
  { category: "Sports", sales: 1200000 },
  { category: "Books", sales: 950000 },
  { category: "Toys", sales: 720000 },
];

const yearlyData = [
  { category: "Electronics", sales: 24000000 },
  { category: "Home", sales: 18000000 },
  { category: "Fashion", sales: 12000000 },
  { category: "Sports", sales: 8500000 },
  { category: "Books", sales: 6200000 },
  { category: "Toys", sales: 4800000 },
];

const formatSales = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value;
};

interface ProductCategoriesChartProps {
  period: "daily" | "weekly" | "monthly" | "yearly";
}

const ProductCategoriesChart = ({ period }: ProductCategoriesChartProps) => {
  // Select data based on period
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Product Categories</CardTitle>
          <CardDescription>Sales by category</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tickFormatter={formatSales}
              />
              <YAxis
                dataKey="category"
                type="category"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [`₹${formatSales(value as number)}`, "Sales"]}
                labelFormatter={(label) => `Category: ${label}`}
              />
              <Bar dataKey="sales" fill="#4096ff" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCategoriesChart;
