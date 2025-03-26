
import React from "react";
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeliveryPartnerForm from "@/components/delivery/DeliveryPartnerForm";

const AddDeliveryPartner = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    // In a real application, this would connect to an API to create the partner
    console.log("Creating delivery partner:", data);
    
    // Show success message
    toast.success("Delivery partner added successfully", {
      description: `${data.name} has been added to your delivery network.`,
    });
    
    // Navigate back to the partners list
    setTimeout(() => {
      navigate("/delivery-partners");
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Add Delivery Partner | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full">
          <PageHeader
            title="Add Delivery Partner"
            description="Add a new delivery partner to your network"
          />

          <Card>
            <CardHeader>
              <CardTitle>Partner Information</CardTitle>
            </CardHeader>
            <CardContent>
              <DeliveryPartnerForm onSubmit={handleSubmit} />
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AddDeliveryPartner;
