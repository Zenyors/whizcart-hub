
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    amount: 120000,
    pending: 20000,
  },
  {
    name: "Feb",
    amount: 140000,
    pending: 25000,
  },
  {
    name: "Mar",
    amount: 130000,
    pending: 18000,
  },
  {
    name: "Apr",
    amount: 170000,
    pending: 30000,
  },
  {
    name: "May",
    amount: 160000,
    pending: 22000,
  },
  {
    name: "Jun",
    amount: 190000,
    pending: 28000,
  },
];

const VendorPaymentChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => 
              value === 0 ? '0' : 
              value < 1000 ? `${value}` : 
              `$${(value / 1000).toFixed(0)}k`
            } 
          />
          <Tooltip
            formatter={(value) => [`$${value.toLocaleString()}`, ""]}
            labelStyle={{ fontSize: "12px" }}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "6px",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            name="Paid Amount"
            stackId="1"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="pending"
            name="Pending Amount"
            stackId="1"
            stroke="#f59e0b"
            fill="#f59e0b"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VendorPaymentChart;
