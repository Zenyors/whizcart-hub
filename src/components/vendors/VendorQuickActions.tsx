
import React from "react";
import { useNavigate } from "react-router-dom";
import { Store, FileText, TrendingUp, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface QuickAction {
  title: string;
  icon: React.ComponentType<any>;
  path: string;
}

interface VendorQuickActionsProps {
  actions?: QuickAction[];
  title?: string;
  description?: string;
}

// Default quick actions
const defaultActions: QuickAction[] = [
  {
    title: "Add New Vendor",
    icon: Store,
    path: "/vendors/add",
  },
  {
    title: "View Products",
    icon: Package,
    path: "/vendors/products",
  },
  {
    title: "Manage Payouts",
    icon: FileText,
    path: "/vendors/payouts",
  },
  {
    title: "Performance Reports",
    icon: TrendingUp,
    path: "/vendors/reports",
  },
];

const VendorQuickActions: React.FC<VendorQuickActionsProps> = ({
  actions = defaultActions,
  title = "Quick Actions",
  description = "Common vendor management tasks",
}) => {
  const navigate = useNavigate();

  // Update the default actions to include the add product action
  const updatedActions = actions.map(action => {
    if (action.title === "View Products") {
      return {
        ...action,
        title: "View Products",
        path: "/vendors/products"
      };
    }
    return action;
  });

  // Add "Add New Product" action if it doesn't exist
  const hasAddProduct = updatedActions.some(action => action.title === "Add New Product");
  if (!hasAddProduct) {
    updatedActions.splice(2, 0, {
      title: "Add New Product",
      icon: Package,
      path: "/vendors/products/add"
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {updatedActions.map((action) => (
            <Button 
              key={action.title}
              variant="outline"
              className="justify-start" 
              onClick={() => navigate(action.path)}
            >
              <action.icon className="mr-2 h-4 w-4" />
              <span>{action.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorQuickActions;
