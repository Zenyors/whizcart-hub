
import React from "react";
import { Helmet } from 'react-helmet';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewPayment = () => {
  return (
    <>
      <Helmet>
        <title>Process Payment | Admin</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <PageHeader
            title="Process Payment"
            description="Process a new payment transaction"
          />
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Payment processing form will be implemented here.</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default NewPayment;
