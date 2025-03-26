
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QuickActions from "./QuickActions";

interface UserSegment {
  name: string;
  description: string;
  percentage: number;
  variant?: "default" | "secondary" | "outline";
}

interface UserInsightsPanelProps {
  segments?: UserSegment[];
}

const defaultSegments: UserSegment[] = [
  {
    name: "VIP Customers",
    description: "High-value recurring customers",
    percentage: 25,
    variant: "default" // Using the bgGreen class directly for color
  },
  {
    name: "Regular Customers",
    description: "Consistent shoppers",
    percentage: 42,
    variant: "default"
  },
  {
    name: "Returning Customers",
    description: "Occasional shoppers",
    percentage: 18,
    variant: "secondary"
  },
  {
    name: "New Customers",
    description: "First-time shoppers",
    percentage: 15,
    variant: "outline"
  }
];

const UserInsightsPanel: React.FC<UserInsightsPanelProps> = ({ 
  segments = defaultSegments 
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>User Segments</CardTitle>
          <CardDescription>Distribution of users by segment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {segments.map((segment) => (
              <div key={segment.name} className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-medium">{segment.name}</span>
                  <span className="text-xs text-muted-foreground">{segment.description}</span>
                </div>
                <Badge 
                  variant={segment.variant}
                  className={segment.name === "VIP Customers" ? "bg-green-500 text-white" : ""}
                >
                  {segment.percentage}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <QuickActions />
    </div>
  );
};

export default UserInsightsPanel;
