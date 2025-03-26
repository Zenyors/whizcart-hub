import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "order" | "user" | "vendor" | "delivery" | "inventory";
  status?: "completed" | "pending" | "failed";
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
}

const activityData: ActivityItem[] = [
  {
    id: "1",
    title: "New order received",
    description: "Order #12345 for ₹4,299",
    timestamp: "5 minutes ago",
    type: "order",
    status: "pending",
    user: {
      name: "Rahul Sharma",
      initials: "RS",
    },
  },
  {
    id: "2",
    title: "User registered",
    description: "New user from Mumbai",
    timestamp: "12 minutes ago",
    type: "user",
    user: {
      name: "Priya Patel",
      initials: "PP",
    },
  },
  {
    id: "3",
    title: "Vendor added product",
    description: "TechWiz added 5 new smartphones",
    timestamp: "45 minutes ago",
    type: "vendor",
    status: "completed",
    user: {
      name: "TechWiz Store",
      initials: "TS",
    },
  },
  {
    id: "4",
    title: "Order delivered",
    description: "Order #12340 delivered successfully",
    timestamp: "1 hour ago",
    type: "delivery",
    status: "completed",
    user: {
      name: "Delivery Partner #25",
      initials: "DP",
    },
  },
  {
    id: "5",
    title: "Low inventory alert",
    description: "iPhone 14 Pro (128GB) is running low",
    timestamp: "2 hours ago",
    type: "inventory",
    status: "failed",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20";
    case "pending":
      return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20";
    case "failed":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
    default:
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "order":
      return "🛒";
    case "user":
      return "👤";
    case "vendor":
      return "🏪";
    case "delivery":
      return "🚚";
    case "inventory":
      return "📦";
    default:
      return "📋";
  }
};

const RecentActivity = () => {
  return (
    <Card className="animate-fade-in col-span-full lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest events from your platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityData.map((item, index) => (
            <div
              key={item.id}
              className="flex items-start gap-4 animate-slide-in"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                <span role="img" aria-label={item.type}>
                  {getTypeIcon(item.type)}
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
                <div className="flex items-center pt-1">
                  {item.user && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Avatar className="h-5 w-5">
                        {item.user.avatar && <AvatarImage src={item.user.avatar} alt={item.user.name} />}
                        <AvatarFallback className="text-[10px]">{item.user.initials}</AvatarFallback>
                      </Avatar>
                      <span>{item.user.name}</span>
                    </div>
                  )}
                  {item.status && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "ml-auto text-[10px] font-medium",
                        getStatusColor(item.status)
                      )}
                    >
                      {item.status}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
