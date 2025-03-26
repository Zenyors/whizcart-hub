
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import SidebarNav from "./SidebarNav";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside the sidebar to close it (on mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && 
          !sidebarRef.current.contains(event.target as Node) && 
          isOpen && 
          window.innerWidth < 1024) { // Only on mobile
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);
  
  return (
    <div
      ref={sidebarRef}
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <SidebarHeader />
      
      <ScrollArea className="flex-1 px-3 py-4">
        <SidebarNav />
      </ScrollArea>
      
      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
