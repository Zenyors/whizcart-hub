
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { fetchVendorById } from "@/api/vendorApi";
import type { VendorDetail } from "@/api/vendorApi";

// Import refactored components
import VendorDetailHeader from "@/components/vendors/VendorDetailHeader";
import VendorMetricsOverview from "@/components/vendors/VendorMetricsOverview";
import VendorProfileCard from "@/components/vendors/VendorProfileCard";
import VendorDetailTabs from "@/components/vendors/VendorDetailTabs";

const VendorDetails = () => {
  const { id } = useParams();
  const { data: vendor, isLoading } = useQuery<VendorDetail>({
    queryKey: ['vendor', id],
    queryFn: () => fetchVendorById(id as string),
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!vendor) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-2xl font-bold">Vendor not found</h2>
          <p className="text-muted-foreground">The vendor you're looking for doesn't exist or has been removed.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{vendor.name} | Vendor Details</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
          <VendorDetailHeader vendor={vendor} />
          <VendorMetricsOverview vendor={vendor} />
          <VendorProfileCard vendor={vendor} />
          <VendorDetailTabs vendor={vendor} />
        </div>
      </DashboardLayout>
    </>
  );
};

export default VendorDetails;
