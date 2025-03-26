
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Star, 
  Mail, 
  ShoppingCart, 
  UsersIcon 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserInsightsPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>User Segments</CardTitle>
          <CardDescription>Distribution of users by segment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium">VIP Customers</span>
                <span className="text-xs text-muted-foreground">High-value recurring customers</span>
              </div>
              <Badge className="bg-green-500 text-white">25%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium">Regular Customers</span>
                <span className="text-xs text-muted-foreground">Consistent shoppers</span>
              </div>
              <Badge>42%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium">Returning Customers</span>
                <span className="text-xs text-muted-foreground">Occasional shoppers</span>
              </div>
              <Badge variant="secondary">18%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium">New Customers</span>
                <span className="text-xs text-muted-foreground">First-time shoppers</span>
              </div>
              <Badge variant="outline">15%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common user management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button className="flex justify-start items-center gap-2" onClick={() => navigate("/users/vip")}>
              <Star className="h-4 w-4" />
              <span>Manage VIP Users</span>
            </Button>
            <Button className="flex justify-start items-center gap-2" onClick={() => navigate("/users/support")}>
              <Mail className="h-4 w-4" />
              <span>User Support</span>
            </Button>
            <Button className="flex justify-start items-center gap-2" onClick={() => navigate("/users/feedback")}>
              <ShoppingCart className="h-4 w-4" />
              <span>Review Feedback</span>
            </Button>
            <Button className="flex justify-start items-center gap-2" onClick={() => navigate("/users/analytics")}>
              <UsersIcon className="h-4 w-4" />
              <span>User Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInsightsPanel;
