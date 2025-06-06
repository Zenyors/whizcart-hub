
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
  Shield,
  IndianRupee,
  BellRing,
} from "lucide-react";

export interface NavItem {
  title?: string;
  children: {
    icon: React.ElementType;
    title: string;
    path: string;
    badge?: number;
    children?: { title: string; path: string }[];
  }[];
}

export const navItems: NavItem[] = [
  {
    children: [
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
    ]
  },
  {
    title: "Finance & Operations",
    children: [
      {
        icon: IndianRupee,
        title: "Finance",
        path: "/finance",
        children: [
          { title: "Overview", path: "/finance" },
          { title: "Transactions", path: "/finance?tab=transactions" },
          { title: "Settlements", path: "/finance?tab=settlements" },
          { title: "Payouts", path: "/finance?tab=payouts" },
          { title: "Refunds", path: "/finance?tab=refunds" },
          { title: "Analytics", path: "/finance?tab=analytics" },
        ],
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
    ]
  },
  {
    title: "Support & Administration",
    children: [
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
        icon: BellRing,
        title: "Notifications",
        path: "/notifications",
      },
      {
        icon: Settings,
        title: "Settings",
        path: "/settings",
      },
    ]
  }
];
