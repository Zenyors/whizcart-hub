
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Plus } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

interface VendorPayoutsHeaderProps {
  onNewPayoutClick: () => void;
}

const VendorPayoutsHeader = ({ onNewPayoutClick }: VendorPayoutsHeaderProps) => {
  return (
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
      <Button className="gap-2" onClick={onNewPayoutClick}>
        <Plus className="h-4 w-4" />
        New Payout
      </Button>
    </PageHeader>
  );
};

export default VendorPayoutsHeader;
