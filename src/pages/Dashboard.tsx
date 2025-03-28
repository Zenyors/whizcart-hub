
import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardPanel from "@/components/dashboard/DashboardPanel";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Admin</title>
      </Helmet>
      <DashboardLayout>
        <DashboardPanel />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
