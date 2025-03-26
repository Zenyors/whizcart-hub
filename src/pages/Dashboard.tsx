
import React, { useState } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import StatCards from "@/components/dashboard/StatCards";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import OrdersTable from "@/components/dashboard/OrdersTable";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    toast({
      title: sidebarOpen ? "Sidebar Collapsed" : "Sidebar Expanded",
      description: sidebarOpen ? "The sidebar has been collapsed." : "The sidebar has been expanded.",
    });
  };

  return (
    <div className="flex min-h-screen bg-muted/5">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : ""}`}>
        <Header 
          isSidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />
        
        <main className="px-4 py-6 sm:px-6 lg:px-8 page-transition-container">
          <div className="mb-8 flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, Admin User. Here's what's happening today.
            </p>
          </div>
          
          <div className="mb-8">
            <StatCards />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <RevenueChart />
            <RecentActivity />
          </div>
          
          <div className="mt-6">
            <OrdersTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
