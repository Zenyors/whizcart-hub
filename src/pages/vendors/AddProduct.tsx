
import React from "react";
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VendorProductForm from "@/components/vendors/VendorProductForm";

const AddProduct = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    // In a real application, this would connect to an API to create the product
    console.log("Creating vendor product:", data);
    
    // Show success message
    toast.success("Product added successfully", {
      description: `${data.name} has been added to the inventory.`,
    });
    
    // Navigate back to the products list
    setTimeout(() => {
      navigate("/vendors/products");
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Add Product | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full">
          <PageHeader
            title="Add Product"
            description="Add a new product to the vendor catalog"
          />

          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <VendorProductForm onSubmit={handleSubmit} />
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AddProduct;
