
import React from "react";
import { Helmet } from 'react-helmet';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCards from "@/components/dashboard/StatCards";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import OrdersTable from "@/components/dashboard/OrdersTable";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Admin</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, Admin User. Here's what's happening today.
            </p>
          </div>
          
          <div className="mb-6">
            <StatCards />
          </div>
          
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-7">
            <RevenueChart />
            <RecentActivity />
          </div>
          
          <div className="mt-6">
            <OrdersTable />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
