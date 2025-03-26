
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";

const SidebarHeader = () => {
  return (
    <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
      <Link to="/dashboard" className="flex items-center gap-2">
        <div className="rounded-md bg-primary p-1">
          <ShoppingCart className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">WhizCartt</span>
      </Link>
      <ThemeToggle />
    </div>
  );
};

export default SidebarHeader;
