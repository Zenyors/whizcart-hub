
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { mockVendorPayouts, mockDeliveryPayouts } from "./payoutsUtils";

// Form schema for creating new payout
const payoutFormSchema = z.object({
  partnerType: z.string().min(1, "Partner type is required"),
  partner: z.string().min(1, "Partner is required"),
  amount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    "Amount must be a positive number"
  ),
  dueDate: z.string().min(1, "Due date is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

type PayoutFormValues = z.infer<typeof payoutFormSchema>;

interface NewPayoutFormProps {
  onSubmitSuccess: () => void;
}

const NewPayoutForm: React.FC<NewPayoutFormProps> = ({ onSubmitSuccess }) => {
  const { toast } = useToast();
  
  const form = useForm<PayoutFormValues>({
    resolver: zodResolver(payoutFormSchema),
    defaultValues: {
      partnerType: "",
      partner: "",
      amount: "",
      dueDate: "",
      paymentMethod: "Bank Transfer",
      reference: "",
      notes: "",
    },
  });

  const onSubmit = (values: PayoutFormValues) => {
    toast({
      title: "New Payout Created",
      description: `A new payout has been scheduled for ${values.partner}.`,
    });
    form.reset();
    onSubmitSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="partnerType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Partner Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select partner type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full max-h-[200px]">
                  <SelectItem value="vendor">Vendor</SelectItem>
                  <SelectItem value="delivery">Delivery Partner</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="partner"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Partner</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select partner" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full max-h-[200px]">
                  {form.watch("partnerType") === "vendor" ? (
                    mockVendorPayouts.map(vendor => (
                      <SelectItem key={vendor.vendor} value={vendor.vendor}>
                        {vendor.vendor}
                      </SelectItem>
                    ))
                  ) : form.watch("partnerType") === "delivery" ? (
                    mockDeliveryPayouts.map(partner => (
                      <SelectItem key={partner.partner} value={partner.partner}>
                        {partner.partner}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="placeholder" disabled>
                      Select partner type first
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Amount (₹)</FormLabel>
              <FormControl>
                <Input placeholder="Enter amount" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Payment Method</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Check">Check</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Reference (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter reference number" {...field} className="w-full" />
              </FormControl>
              <FormDescription className="text-xs">
                Invoice number or other reference
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Notes (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Add notes" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-end">
          <Button type="button" variant="outline" onClick={onSubmitSuccess} className="sm:mr-2">
            Cancel
          </Button>
          <Button type="submit">Schedule Payout</Button>
        </div>
      </form>
    </Form>
  );
};

export default NewPayoutForm;
