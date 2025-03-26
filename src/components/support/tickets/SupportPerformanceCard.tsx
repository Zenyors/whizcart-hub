
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", tickets: 7, resolved: 5 },
  { day: "Tue", tickets: 12, resolved: 8 },
  { day: "Wed", tickets: 15, resolved: 11 },
  { day: "Thu", tickets: 9, resolved: 7 },
  { day: "Fri", tickets: 11, resolved: 9 },
  { day: "Sat", tickets: 4, resolved: 4 },
  { day: "Sun", tickets: 3, resolved: 2 }
];

const SupportPerformanceCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support Performance</CardTitle>
        <CardDescription>Weekly ticket volume and resolution rate</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="tickets" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="resolved" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportPerformanceCard;
