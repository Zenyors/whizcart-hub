
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Truck,
  BarChart3,
  Settings,
  Store,
  HelpCircle,
  User,
  Star,
  MessageSquare,
  Mail,
  Shield,
} from "lucide-react";

export interface NavItem {
  icon: React.ElementType;
  title: string;
  path: string;
  badge?: number;
  children?: { title: string; path: string }[];
}

export const navItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: Users,
    title: "User Management",
    path: "/users",
    badge: 8,
    children: [
      { title: "All Users", path: "/users" },
      { title: "User Analytics", path: "/users/analytics" },
      { title: "VIP Users", path: "/users/vip" },
      { title: "User Feedback", path: "/users/feedback" },
      { title: "User Support", path: "/users/support" },
    ],
  },
  {
    icon: Store,
    title: "Vendor Management",
    path: "/vendors",
    children: [
      { title: "All Vendors", path: "/vendors" },
      { title: "Vendor Products", path: "/vendors/products" },
      { title: "Payouts", path: "/vendors/payouts" },
    ],
  },
  {
    icon: Truck,
    title: "Delivery Partners",
    path: "/delivery-partners",
  },
  {
    icon: ShoppingCart,
    title: "Orders",
    path: "/orders",
    badge: 12,
  },
  {
    icon: Package,
    title: "Inventory",
    path: "/inventory",
  },
  {
    icon: BarChart3,
    title: "Reports",
    path: "/reports",
  },
  {
    icon: HelpCircle,
    title: "Customer Service",
    path: "/support",
    badge: 3,
  },
  {
    icon: Shield,
    title: "Administration",
    path: "/administration",
  },
  {
    icon: Settings,
    title: "Settings",
    path: "/settings",
  },
];
