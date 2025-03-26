
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-col flex-1">
        <Header toggleSidebar={toggleSidebar} />
        
        <main 
          className={cn(
            "flex-1 p-4 md:p-6 transition-all duration-300",
            isSidebarOpen ? "lg:ml-64" : ""
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
