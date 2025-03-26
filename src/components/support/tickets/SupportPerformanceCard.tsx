
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SupportPerformanceCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support Performance</CardTitle>
        <CardDescription>Key metrics and SLA compliance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">First Response Time</span>
              <span className="text-sm font-medium">3.2 hours</span>
            </div>
            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Target: 4 hours</span>
              <span>85% SLA compliance</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Resolution Time</span>
              <span className="text-sm font-medium">8.5 hours</span>
            </div>
            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '72%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Target: 8 hours</span>
              <span>72% SLA compliance</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Customer Satisfaction</span>
              <span className="text-sm font-medium">4.6 / 5.0</span>
            </div>
            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Target: 4.5 / 5.0</span>
              <span>92% positive ratings</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportPerformanceCard;
