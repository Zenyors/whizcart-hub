
import React, { useState } from "react";
import { 
  Users, 
  ShoppingCart, 
  IndianRupee, 
  Store, 
  Truck, 
  ShoppingBag 
} from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import StatsRow from "./StatsRow";
import ChartSection from "./ChartSection";
import ProductCategoriesChart from "./ProductCategoriesChart";
import RecentOrdersTable from "./RecentOrdersTable";
import RecentActivities from "./RecentActivities";
import QuickActionsCard from "./QuickActionsCard";
import { statsData } from "./statsData";

const DashboardPanel = () => {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");
  const [dateDisplayText, setDateDisplayText] = useState("March 2025");

  // Handle the date display based on period selected
  const handlePeriodChange = (newPeriod: "daily" | "weekly" | "monthly" | "yearly") => {
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

  // Get the appropriate stats for the current period
  const currentStats = statsData[period];

  // Create stats arrays for each row
  const firstRowStats = [
    {
      title: "Total Users",
      value: currentStats.users.value,
      trend: currentStats.users.trend,
      icon: Users,
      description: "vs last period"
    },
    {
      title: "Total Orders",
      value: currentStats.orders.value,
      trend: currentStats.orders.trend,
      icon: ShoppingCart,
      description: "vs last period"
    },
    {
      title: "Total Revenue",
      value: currentStats.revenue.value,
      trend: currentStats.revenue.trend,
      icon: IndianRupee,
      description: "vs last period"
    }
  ];

  const secondRowStats = [
    {
      title: "Active Vendors",
      value: currentStats.vendors.value,
      trend: currentStats.vendors.trend,
      icon: Store,
      description: "vs last period"
    },
    {
      title: "Delivery Partners",
      value: currentStats.deliveryPartners.value,
      trend: currentStats.deliveryPartners.trend,
      icon: Truck,
      description: "vs last period"
    },
    {
      title: "Pending Orders",
      value: currentStats.pendingOrders.value,
      trend: currentStats.pendingOrders.trend,
      icon: ShoppingBag,
      description: "vs last period"
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <DashboardHeader 
        period={period}
        dateDisplayText={dateDisplayText}
        handlePeriodChange={handlePeriodChange}
      />
      
      {/* First row of stats */}
      <StatsRow stats={firstRowStats} />
      
      {/* Second row of stats */}
      <StatsRow stats={secondRowStats} />
      
      {/* Charts row */}
      <ChartSection period={period} />

      {/* Categories and Orders */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <ProductCategoriesChart period={period} />
        <RecentOrdersTable period={period} />
      </div>

      {/* Activities and Quick Actions */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <RecentActivities period={period} />
        <QuickActionsCard />
      </div>
    </div>
  );
};

export default DashboardPanel;
