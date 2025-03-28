
import React from "react";
import { ExternalLink, CheckCircle, Info, AlertTriangle, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  message: string;
  time: string;
  type: "success" | "info" | "warning" | "pending";
}

// Sample data for different periods
const dailyActivities: Activity[] = [
  { id: "a1", message: "New vendor \"Tech Solutions\" has been approved", time: "5 minutes ago", type: "success" },
  { id: "a2", message: "System update completed successfully", time: "2 hours ago", type: "info" },
  { id: "a3", message: "Low stock alert for iPhone 13 Pro (5 remaining)", time: "3 hours ago", type: "warning" },
  { id: "a4", message: "Payment processing for order #ORD-7648", time: "4 hours ago", type: "pending" },
];

const weeklyActivities: Activity[] = [
  { id: "a5", message: "New feature: Inventory management system launched", time: "1 day ago", type: "info" },
  { id: "a6", message: "Security certificate renewed for website", time: "2 days ago", type: "success" },
  { id: "a7", message: "Customer reported issue with checkout process", time: "3 days ago", type: "warning" },
  { id: "a8", message: "Monthly sales report generated", time: "5 days ago", type: "info" },
];

const monthlyActivities: Activity[] = [
  { id: "a9", message: "New partnership with ABC Logistics confirmed", time: "1 week ago", type: "success" },
  { id: "a10", message: "System maintenance scheduled for next weekend", time: "2 weeks ago", type: "info" },
  { id: "a11", message: "Urgent: Payment gateway temporary outage", time: "3 weeks ago", type: "warning" },
  { id: "a12", message: "Q2 financial report published", time: "3 weeks ago", type: "info" },
];

const yearlyActivities: Activity[] = [
  { id: "a13", message: "Company anniversary: 5 years of operation", time: "2 months ago", type: "success" },
  { id: "a14", message: "Major platform upgrade completed", time: "4 months ago", type: "info" },
  { id: "a15", message: "New office branch opened in Mumbai", time: "6 months ago", type: "success" },
  { id: "a16", message: "Annual security audit passed successfully", time: "8 months ago", type: "info" },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-emerald-500" />;
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case "pending":
      return <Clock className="h-5 w-5 text-gray-500" />;
    default:
      return <Info className="h-5 w-5 text-gray-500" />;
  }
};

interface RecentActivitiesProps {
  period: "daily" | "weekly" | "monthly" | "yearly";
}

const RecentActivities = ({ period }: RecentActivitiesProps) => {
  // Select data based on period
  const getActivitiesData = () => {
    switch (period) {
      case "daily": return dailyActivities;
      case "weekly": return weeklyActivities;
      case "yearly": return yearlyActivities;
      default: return monthlyActivities;
    }
  };

  const activities = getActivitiesData();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>System events and notifications</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          View all
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
