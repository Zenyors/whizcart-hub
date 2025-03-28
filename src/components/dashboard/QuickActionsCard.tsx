
import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, UserPlus, Store, Truck, CreditCard, Package } from "lucide-react";

const QuickActionsCard = () => {
  const actions = [
    {
      name: "New Order",
      icon: ShoppingCart,
      href: "/orders/new",
    },
    {
      name: "Add User",
      icon: UserPlus,
      href: "/users/new",
    },
    {
      name: "Add Vendor",
      icon: Store,
      href: "/vendors/new",
    },
    {
      name: "Track Order",
      icon: Truck,
      href: "/orders/track",
    },
    {
      name: "Process Payment",
      icon: CreditCard,
      href: "/payments/new",
    },
    {
      name: "Assign Delivery",
      icon: Package,
      href: "/delivery/assign",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button 
                key={index} 
                variant="outline" 
                className="h-16 justify-start gap-4"
                asChild
              >
                <Link to={action.href}>
                  <Icon className="h-5 w-5" />
                  <span>{action.name}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
