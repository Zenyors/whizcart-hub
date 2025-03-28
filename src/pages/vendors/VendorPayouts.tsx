
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';
import { Calendar, Download, Plus } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { fetchVendorPayouts } from "@/api/vendorApi";
import PayoutStatsGrid from "@/components/vendors/PayoutStatsGrid";
import PayoutFilters from "@/components/vendors/PayoutFilters";
import PayoutTable from "@/components/vendors/PayoutTable";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const VendorPayouts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  // Use media query to determine if we should use a dialog or drawer
  const isDesktop = useMediaQuery("(min-width: 768px)");

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

  const handleCreateNewPayout = () => {
    toast({
      title: "Success",
      description: "New payout has been scheduled.",
    });
    setOpen(false);
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
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button className="gap-2" onClick={() => setOpen(true)}>
              <Plus className="h-4 w-4" />
              New Payout
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

      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Payout</DialogTitle>
              <DialogDescription>
                Create a new payout to a vendor. Fill in all the required fields.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Form fields would go here */}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="vendor" className="text-sm font-medium col-span-1">
                  Vendor
                </label>
                <div className="col-span-3">
                  <select 
                    id="vendor" 
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select a vendor</option>
                    {filteredPayouts.map(p => (
                      <option key={p.id} value={p.vendorName}>{p.vendorName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="amount" className="text-sm font-medium col-span-1">
                  Amount
                </label>
                <input 
                  id="amount" 
                  type="number"
                  placeholder="0.00" 
                  className="col-span-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="date" className="text-sm font-medium col-span-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date" 
                  className="col-span-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleCreateNewPayout}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Create New Payout</DrawerTitle>
              <DrawerDescription>
                Create a new payout to a vendor. Fill in all the required fields.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="mobile-vendor" className="text-sm font-medium">
                  Vendor
                </label>
                <select 
                  id="mobile-vendor" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select a vendor</option>
                  {filteredPayouts.map(p => (
                    <option key={p.id} value={p.vendorName}>{p.vendorName}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="mobile-amount" className="text-sm font-medium">
                  Amount
                </label>
                <input 
                  id="mobile-amount" 
                  type="number"
                  placeholder="0.00" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="mobile-date" className="text-sm font-medium">
                  Date
                </label>
                <input
                  type="date"
                  id="mobile-date" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
            <DrawerFooter className="px-4">
              <Button onClick={handleCreateNewPayout} className="w-full">
                Create Payout
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default VendorPayouts;
