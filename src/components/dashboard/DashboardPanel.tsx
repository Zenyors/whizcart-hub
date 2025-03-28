
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { 
  Users, 
  ShoppingCart, 
  IndianRupee, 
  Store, 
  Truck, 
  ShoppingBag, 
  LineChart, 
  BarChart3, 
  ArrowUp, 
  ArrowDown, 
  CreditCard 
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RevenueOrdersChart from "./RevenueOrdersChart";
import UserGrowthChart from "./UserGrowthChart";

const DashboardPanel = () => {
  const [period, setPeriod] = useState("monthly");

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of our whizcart platform
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Tabs defaultValue="monthly" className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-4 w-full sm:w-auto">
              <TabsTrigger value="daily" onClick={() => setPeriod("daily")}>Daily</TabsTrigger>
              <TabsTrigger value="weekly" onClick={() => setPeriod("weekly")}>Weekly</TabsTrigger>
              <TabsTrigger value="monthly" onClick={() => setPeriod("monthly")}>Monthly</TabsTrigger>
              <TabsTrigger value="yearly" onClick={() => setPeriod("yearly")}>Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Calendar className="h-4 w-4" />
            <span>March 2025</span>
          </Button>
          
          <Button variant="ghost" className="text-primary w-full sm:w-auto">
            Live
          </Button>
        </div>
      </div>
      
      {/* First row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Total Users" 
          value="24,580"
          trend={{ value: 12, positive: true }}
          icon={Users}
          description="vs last period"
        />
        
        <StatCard 
          title="Total Orders" 
          value="18,325"
          trend={{ value: 8, positive: true }}
          icon={ShoppingCart}
          description="vs last period"
        />
        
        <StatCard 
          title="Total Revenue" 
          value="₹1.2Cr"
          trend={{ value: 15, positive: true }}
          icon={CreditCard}
          description="vs last period"
        />
      </div>
      
      {/* Second row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Active Vendors" 
          value="284"
          trend={{ value: 4, positive: true }}
          icon={Store}
          description="vs last period"
        />
        
        <StatCard 
          title="Delivery Partners" 
          value="512"
          trend={{ value: 2, positive: false }}
          icon={Truck}
          description="vs last period"
        />
        
        <StatCard 
          title="Pending Orders" 
          value="238"
          trend={{ value: 5, positive: false }}
          icon={ShoppingBag}
          description="vs last period"
        />
      </div>
      
      {/* Charts row */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Revenue & Orders</h3>
            <span className="text-sm text-muted-foreground">Monthly overview</span>
          </div>
          <div className="h-[300px]">
            <RevenueOrdersChart />
          </div>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">User Growth</h3>
            <span className="text-sm text-muted-foreground">Monthly statistics</span>
          </div>
          <div className="h-[300px]">
            <UserGrowthChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel;
