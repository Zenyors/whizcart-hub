
import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

const SidebarHeader = () => {
  const { state, toggleSidebar } = useSidebar();
  const isOpen = state === "expanded";

  return (
    <div className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-6">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar} 
        className="mr-2"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </Button>
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
  );
};

export default SidebarHeader;
