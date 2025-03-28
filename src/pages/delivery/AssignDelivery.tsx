
import React from "react";
import { Helmet } from 'react-helmet';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AssignDelivery = () => {
  return (
    <>
      <Helmet>
        <title>Assign Delivery | Admin</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <PageHeader
            title="Assign Delivery"
            description="Assign orders to delivery partners"
          />
          <Card>
            <CardHeader>
              <CardTitle>Delivery Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Delivery assignment interface will be implemented here.</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AssignDelivery;
