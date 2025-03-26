
import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Mail, ShoppingCart, UsersIcon } from "lucide-react";
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

interface QuickActionsProps {
  actions?: QuickAction[];
  title?: string;
  description?: string;
}

// Default quick actions
const defaultActions: QuickAction[] = [
  {
    title: "Manage VIP Users",
    icon: Star,
    path: "/users/vip",
  },
  {
    title: "User Support",
    icon: Mail,
    path: "/users/support",
  },
  {
    title: "Review Feedback",
    icon: ShoppingCart,
    path: "/users/feedback",
  },
  {
    title: "User Analytics",
    icon: UsersIcon,
    path: "/users/analytics",
  },
];

const QuickActions: React.FC<QuickActionsProps> = ({
  actions = defaultActions,
  title = "Quick Actions",
  description = "Common user management tasks",
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action) => (
            <Button 
              key={action.title}
              className="flex justify-start items-center gap-2" 
              onClick={() => navigate(action.path)}
            >
              <action.icon className="h-4 w-4" />
              <span>{action.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
