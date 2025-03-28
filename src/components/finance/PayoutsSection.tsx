
import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Import the smaller component files
import PayoutsHeader from "./payouts/PayoutsHeader";
import PayoutsFilter from "./payouts/PayoutsFilter";
import VendorPayoutsTable from "./payouts/VendorPayoutsTable";
import DeliveryPayoutsTable from "./payouts/DeliveryPayoutsTable";
import NewPayoutForm from "./payouts/NewPayoutForm";
import { mockVendorPayouts, mockDeliveryPayouts } from "./payouts/payoutsUtils";

const PayoutsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNewPayoutDialog, setShowNewPayoutDialog] = useState(false);
  
  // Filter vendor payouts based on search term and status
  const filteredVendorPayouts = mockVendorPayouts.filter(payout => {
    // Apply search filter
    const searchMatch = payout.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       payout.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       payout.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const statusMatch = statusFilter === "all" || payout.status.toLowerCase() === statusFilter.toLowerCase();
    
    return searchMatch && statusMatch;
  });

  // Filter delivery payouts based on search term and status
  const filteredDeliveryPayouts = mockDeliveryPayouts.filter(payout => {
    // Apply search filter
    const searchMatch = payout.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       payout.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       payout.period.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const statusMatch = statusFilter === "all" || payout.status.toLowerCase() === statusFilter.toLowerCase();
    
    return searchMatch && statusMatch;
  });

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <PayoutsHeader 
            onNewPayoutClick={() => setShowNewPayoutDialog(true)} 
          />
        </CardHeader>
        <CardContent>
          <PayoutsFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          
          <Tabs defaultValue="vendors" className="mb-6">
            <TabsList>
              <TabsTrigger value="vendors">Vendor Payouts</TabsTrigger>
              <TabsTrigger value="delivery">Delivery Partner Payouts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vendors" className="mt-4">
              <VendorPayoutsTable filteredPayouts={filteredVendorPayouts} />
            </TabsContent>
            
            <TabsContent value="delivery" className="mt-4">
              <DeliveryPayoutsTable filteredPayouts={filteredDeliveryPayouts} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* New Payout Dialog */}
      <Dialog open={showNewPayoutDialog} onOpenChange={setShowNewPayoutDialog}>
        <DialogContent className="w-full max-w-md md:max-w-lg mx-auto p-6 overflow-y-auto max-h-[90vh]">
          <h2 className="text-xl font-semibold mb-1">Create New Payout</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Schedule a new payout to a vendor or delivery partner
          </p>
          
          <NewPayoutForm onSubmitSuccess={() => setShowNewPayoutDialog(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PayoutsSection;
