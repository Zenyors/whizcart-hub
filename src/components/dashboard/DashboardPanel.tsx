
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
import ProductCategoriesChart from "./ProductCategoriesChart";
import RecentOrdersTable from "./RecentOrdersTable";
import RecentActivities from "./RecentActivities";
import QuickActionsCard from "./QuickActionsCard";

const DashboardPanel = () => {
  const [period, setPeriod] = useState("monthly");
  const [dateDisplayText, setDateDisplayText] = useState("March 2025");

  // Stats data for different periods
  const statsData = {
    daily: {
      users: { value: "8,250", trend: { value: 9, positive: true } },
      orders: { value: "1,925", trend: { value: 5, positive: true } },
      revenue: { value: "₹15.2L", trend: { value: 8, positive: true } },
      vendors: { value: "185", trend: { value: 3, positive: true } },
      deliveryPartners: { value: "320", trend: { value: 1, positive: false } },
      pendingOrders: { value: "98", trend: { value: 7, positive: false } }
    },
    weekly: {
      users: { value: "16,380", trend: { value: 10, positive: true } },
      orders: { value: "7,840", trend: { value: 7, positive: true } },
      revenue: { value: "₹48.5L", trend: { value: 12, positive: true } },
      vendors: { value: "235", trend: { value: 4, positive: true } },
      deliveryPartners: { value: "425", trend: { value: 1, positive: false } },
      pendingOrders: { value: "156", trend: { value: 6, positive: false } }
    },
    monthly: {
      users: { value: "24,580", trend: { value: 12, positive: true } },
      orders: { value: "18,325", trend: { value: 8, positive: true } },
      revenue: { value: "₹1.2Cr", trend: { value: 15, positive: true } },
      vendors: { value: "284", trend: { value: 4, positive: true } },
      deliveryPartners: { value: "512", trend: { value: 2, positive: false } },
      pendingOrders: { value: "238", trend: { value: 5, positive: false } }
    },
    yearly: {
      users: { value: "156K", trend: { value: 18, positive: true } },
      orders: { value: "245K", trend: { value: 14, positive: true } },
      revenue: { value: "₹12.5Cr", trend: { value: 21, positive: true } },
      vendors: { value: "328", trend: { value: 8, positive: true } },
      deliveryPartners: { value: "580", trend: { value: 3, positive: true } },
      pendingOrders: { value: "320", trend: { value: 2, positive: false } }
    }
  };

  // Get the appropriate stats for the current period
  const currentStats = statsData[period];

  // Handle the date display based on period selected
  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    
    const now = new Date();
    switch (newPeriod) {
      case "daily":
        setDateDisplayText(`${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`);
        break;
      case "weekly":
        setDateDisplayText(`Week ${Math.ceil(now.getDate() / 7)}, ${now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`);
        break;
      case "monthly":
        setDateDisplayText(`${now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`);
        break;
      case "yearly":
        setDateDisplayText(`${now.getFullYear()}`);
        break;
      default:
        setDateDisplayText("March 2025");
    }
  };

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
              <TabsTrigger value="daily" onClick={() => handlePeriodChange("daily")}>Daily</TabsTrigger>
              <TabsTrigger value="weekly" onClick={() => handlePeriodChange("weekly")}>Weekly</TabsTrigger>
              <TabsTrigger value="monthly" onClick={() => handlePeriodChange("monthly")}>Monthly</TabsTrigger>
              <TabsTrigger value="yearly" onClick={() => handlePeriodChange("yearly")}>Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Calendar className="h-4 w-4" />
            <span>{dateDisplayText}</span>
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
          value={currentStats.users.value}
          trend={currentStats.users.trend}
          icon={Users}
          description="vs last period"
        />
        
        <StatCard 
          title="Total Orders" 
          value={currentStats.orders.value}
          trend={currentStats.orders.trend}
          icon={ShoppingCart}
          description="vs last period"
        />
        
        <StatCard 
          title="Total Revenue" 
          value={currentStats.revenue.value}
          trend={currentStats.revenue.trend}
          icon={CreditCard}
          description="vs last period"
        />
      </div>
      
      {/* Second row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Active Vendors" 
          value={currentStats.vendors.value}
          trend={currentStats.vendors.trend}
          icon={Store}
          description="vs last period"
        />
        
        <StatCard 
          title="Delivery Partners" 
          value={currentStats.deliveryPartners.value}
          trend={currentStats.deliveryPartners.trend}
          icon={Truck}
          description="vs last period"
        />
        
        <StatCard 
          title="Pending Orders" 
          value={currentStats.pendingOrders.value}
          trend={currentStats.pendingOrders.trend}
          icon={ShoppingBag}
          description="vs last period"
        />
      </div>
      
      {/* Charts row */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Revenue & Orders</h3>
            <span className="text-sm text-muted-foreground">{period.charAt(0).toUpperCase() + period.slice(1)} overview</span>
          </div>
          <div className="h-[300px]">
            <RevenueOrdersChart period={period} />
          </div>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">User Growth</h3>
            <span className="text-sm text-muted-foreground">{period.charAt(0).toUpperCase() + period.slice(1)} statistics</span>
          </div>
          <div className="h-[300px]">
            <UserGrowthChart period={period} />
          </div>
        </div>
      </div>

      {/* Added sections from image */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <ProductCategoriesChart period={period} />
        <RecentOrdersTable period={period} />
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <RecentActivities period={period} />
        <QuickActionsCard />
      </div>
    </div>
  );
};

export default DashboardPanel;
