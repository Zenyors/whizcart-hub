import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { fetchVendorPayouts } from "@/api/vendorApi";

// Define the PayoutsData type
interface PayoutsData {
  payouts: Array<{
    id: string;
    vendorName: string;
    invoiceNumber: string;
    amount: number;
    dueDate: string;
    status: string;
    paymentMethod: string;
  }>;
  stats: {
    totalPending: number;
    totalPaid: number;
    averageProcessingTime: number;
    monthlyChange: number;
  };
}

const VendorPayouts = () => {
  const { data, isLoading } = useQuery<PayoutsData>({
    queryKey: ['vendorPayouts'],
    queryFn: fetchVendorPayouts,
  });

  if (isLoading || !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  const { payouts, stats } = data;

  return (
    <>
      <Helmet>
        <title>Vendor Payouts | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <PageHeader
            title="Vendor Payouts"
            description="Manage payments to your suppliers and vendors"
          />
          
          <div>
            <p>This page is under construction. Check back soon.</p>
            <pre>{JSON.stringify({ payouts: payouts.length, stats }, null, 2)}</pre>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default VendorPayouts;
