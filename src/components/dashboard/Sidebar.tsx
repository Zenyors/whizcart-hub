
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import SidebarNavItem from "./SidebarNavItem";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import { navItems } from "./sidebarNavData";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { pathname } = useLocation();
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
      <SidebarHeader toggleSidebar={toggleSidebar} />
      
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col space-y-1">
          {navItems.map((item, index) => (
            <SidebarNavItem
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
      
      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
