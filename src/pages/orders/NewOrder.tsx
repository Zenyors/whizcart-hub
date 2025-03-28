
import React from "react";
import { Helmet } from 'react-helmet';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewOrder = () => {
  return (
    <>
      <Helmet>
        <title>Create New Order | Admin</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <PageHeader
            title="Create New Order"
            description="Create a new customer order"
          />
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Order creation form will be implemented here.</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default NewOrder;
