
import React from "react";
import { Helmet } from 'react-helmet';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewVendor = () => {
  return (
    <>
      <Helmet>
        <title>Add New Vendor | Admin</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <PageHeader
            title="Add New Vendor"
            description="Register a new vendor on the platform"
          />
          <Card>
            <CardHeader>
              <CardTitle>Vendor Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Vendor creation form will be implemented here.</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default NewVendor;
