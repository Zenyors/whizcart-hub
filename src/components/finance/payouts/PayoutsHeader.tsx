
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { usePayoutHandlers } from "./payoutsUtils";

interface PayoutsHeaderProps {
  onNewPayoutClick: () => void;
}

const PayoutsHeader: React.FC<PayoutsHeaderProps> = ({ onNewPayoutClick }) => {
  const { handleGenerateReport } = usePayoutHandlers();

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold">Payouts</h2>
        <p className="text-sm text-muted-foreground">Manage payments to your vendors and delivery partners</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" className="gap-2" onClick={handleGenerateReport}>
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
        <Button className="gap-2" onClick={onNewPayoutClick}>
          <Plus className="h-4 w-4" />
          New Payout
        </Button>
      </div>
    </div>
  );
};

export default PayoutsHeader;
