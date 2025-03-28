
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CreatePayoutFormProps {
  payouts: any[];
  onSubmitSuccess: () => void;
}

const CreatePayoutForm = ({ payouts, onSubmitSuccess }: CreatePayoutFormProps) => {
  const { toast } = useToast();

  const handleCreateNewPayout = () => {
    toast({
      title: "Success",
      description: "New payout has been scheduled.",
    });
    onSubmitSuccess();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="vendor" className="text-sm font-medium">
          Vendor
        </label>
        <select 
          id="vendor" 
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Select a vendor</option>
          {payouts.map(p => (
            <option key={p.id} value={p.vendorName}>{p.vendorName}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium">
          Amount
        </label>
        <input 
          id="amount" 
          type="number"
          placeholder="0.00" 
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="date" className="text-sm font-medium">
          Date
        </label>
        <input
          type="date"
          id="date" 
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>
      <Button onClick={handleCreateNewPayout} className="w-full">
        Create Payout
      </Button>
    </div>
  );
};

export default CreatePayoutForm;
