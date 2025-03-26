
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Quality",
    topVendors: 92,
    averageVendors: 78,
  },
  {
    name: "Delivery",
    topVendors: 96,
    averageVendors: 85,
  },
  {
    name: "Communication",
    topVendors: 89,
    averageVendors: 72,
  },
  {
    name: "Price",
    topVendors: 85,
    averageVendors: 80,
  },
  {
    name: "Support",
    topVendors: 90,
    averageVendors: 75,
  },
];

const VendorPerformanceChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={12} />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
            fontSize={12}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, ""]}
            labelStyle={{ fontSize: "12px" }}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "6px",
              fontSize: "12px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar
            dataKey="topVendors"
            name="Top Vendors"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="averageVendors"
            name="Average Vendors"
            fill="#94a3b8"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VendorPerformanceChart;
