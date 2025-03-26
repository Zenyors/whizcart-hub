
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
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
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  isOpen: boolean;
}

interface NavItemProps {
  icon: React.ElementType;
  title: string;
  path: string;
  badge?: number;
  isActive: boolean;
  children?: { title: string; path: string }[];
}

const NavItem = ({ icon: Icon, title, path, badge, isActive, children }: NavItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = children && children.length > 0;

  return (
    <div className="mb-1">
      <div
        className={cn(
          "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-foreground/70 hover:bg-accent hover:text-foreground"
        )}
        onClick={hasChildren ? () => setExpanded(!expanded) : undefined}
      >
        <Link 
          to={!hasChildren ? path : "#"}
          className="flex flex-1 items-center"
          onClick={hasChildren ? (e) => e.preventDefault() : undefined}
        >
          <Icon className="mr-2 h-5 w-5" />
          <span className="truncate">{title}</span>
        </Link>
        
        {badge && (
          <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold">
            {badge}
          </span>
        )}
        
        {hasChildren && (
          <Button variant="ghost" size="icon" className="h-5 w-5 p-0 ml-1">
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        )}
      </div>
      
      {expanded && hasChildren && (
        <div className="mt-1 ml-5 space-y-1 animate-fade-in">
          {children.map((child, index) => (
            <Link
              key={index}
              to={child.path}
              className="block rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-accent hover:text-foreground transition-colors"
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { pathname } = useLocation();
  
  const navItems = [
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
        { title: "VIP Users", path: "/users/vip" },
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
      icon: Settings,
      title: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-6">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="rounded-md bg-primary p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-white"
            >
              <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
              <path d="M8 2v20" />
              <path d="M16 2v20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">WhizCart</span>
        </Link>
      </div>
      
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col space-y-1">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              title={item.title}
              path={item.path}
              badge={item.badge}
              isActive={pathname === item.path}
              children={item.children}
            />
          ))}
        </nav>
      </ScrollArea>
      
      <div className="mt-auto border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs font-medium">AU</span>
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
