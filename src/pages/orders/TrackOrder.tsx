
import React from "react";
import { Helmet } from 'react-helmet';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TrackOrder = () => {
  return (
    <>
      <Helmet>
        <title>Track Order | Admin</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <PageHeader
            title="Track Order"
            description="Track the current status of an order"
          />
          <Card>
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Order tracking interface will be implemented here.</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default TrackOrder;
