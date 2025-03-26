
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';
import { Calendar, Download } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { fetchVendorPayouts } from "@/api/vendorApi";
import PayoutStatsGrid from "@/components/vendors/PayoutStatsGrid";
import PayoutFilters from "@/components/vendors/PayoutFilters";
import PayoutTable from "@/components/vendors/PayoutTable";

const VendorPayouts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data, isLoading } = useQuery({
    queryKey: ['vendorPayouts'],
    queryFn: fetchVendorPayouts,
  });

  const payouts = data?.payouts || [];
  const stats = data?.stats || { 
    totalPending: 0, 
    totalPaid: 0, 
    averageProcessingTime: 0, 
    monthlyChange: 0 
  };

  const filteredPayouts = payouts.filter(payout => {
    const matchesSearch = 
      payout.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      payout.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || 
                          (filterStatus === "pending" && payout.status === "Pending") ||
                          (filterStatus === "paid" && payout.status === "Paid") ||
                          (filterStatus === "failed" && payout.status === "Failed");
    
    return matchesSearch && matchesStatus;
  });

  const sortedPayouts = [...filteredPayouts].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else if (sortBy === "amount") {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortBy === "vendor") {
      return sortOrder === "asc" 
        ? a.vendorName.localeCompare(b.vendorName) 
        : b.vendorName.localeCompare(a.vendorName);
    }
    return 0;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <Helmet>
        <title>Vendor Payouts | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full max-w-full">
          <PageHeader
            title="Vendor Payouts"
            description="Manage payments to your suppliers and vendors"
          >
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Select Period
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </PageHeader>

          <PayoutStatsGrid stats={stats} />

          <PayoutFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            sortOrder={sortOrder}
            toggleSortOrder={toggleSortOrder}
          />

          <PayoutTable
            payouts={sortedPayouts}
            isLoading={isLoading}
            sortBy={sortBy}
            sortOrder={sortOrder}
            setSortBy={setSortBy}
            toggleSortOrder={toggleSortOrder}
          />
        </div>
      </DashboardLayout>
    </>
  );
};

export default VendorPayouts;
