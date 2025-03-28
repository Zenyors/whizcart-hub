
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";

const SidebarHeader = () => {
  return (
    <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-5 py-4">
      <Link to="/dashboard" className="flex items-center gap-3">
        <div className="rounded-md bg-primary p-1.5">
          <ShoppingCart className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">WhizCart</span>
      </Link>
      <ThemeToggle />
    </div>
  );
};

export default SidebarHeader;
