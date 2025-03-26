
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

interface CreateTicketProps {
  onSetActiveTab: (tab: string) => void;
  onCreateTicket: () => void;
}

const ticketFormSchema = z.object({
  type: z.string(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.string(),
  priority: z.string(),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type TicketFormValues = z.infer<typeof ticketFormSchema>;

const CreateTicket = ({ onSetActiveTab, onCreateTicket }: CreateTicketProps) => {
  const { toast } = useToast();

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      type: "Customer",
      subject: "",
      category: "",
      priority: "Medium",
      description: "",
    },
  });

  const handleSubmit = (values: TicketFormValues) => {
    console.log("Form values:", values);
    onCreateTicket();
    toast({
      title: "Support Ticket Created",
      description: "Your ticket has been submitted successfully. We'll get back to you soon.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Support Ticket</CardTitle>
        <CardDescription>Submit a new support request</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Ticket Type</FormLabel>
                  <div className="col-span-3">
                    <select 
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="Customer">Customer Support</option>
                      <option value="Vendor">Vendor Support</option>
                      <option value="Delivery">Delivery Partner Support</option>
                    </select>
                  </div>
                </div>
              )}
            />
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Subject</FormLabel>
                  <div className="col-span-3">
                    <Input
                      placeholder="Brief description of the issue"
                      {...field}
                    />
                    <FormMessage />
                  </div>
                </div>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Category</FormLabel>
                  <div className="col-span-3">
                    <select 
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="">Select a category</option>
                      <option value="account">Account Issues</option>
                      <option value="order">Order Problems</option>
                      <option value="payment">Payment & Refunds</option>
                      <option value="delivery">Delivery Issues</option>
                      <option value="product">Product Queries</option>
                      <option value="technical">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                    <FormMessage />
                  </div>
                </div>
              )}
            />
            
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Priority</FormLabel>
                  <div className="col-span-3">
                    <select 
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="Low">Low - No immediate impact</option>
                      <option value="Medium">Medium - Minor functionality affected</option>
                      <option value="High">High - Major functionality affected</option>
                      <option value="Urgent">Urgent - System unusable</option>
                    </select>
                    <FormMessage />
                  </div>
                </div>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-start gap-4">
                  <FormLabel className="text-right">Description</FormLabel>
                  <div className="col-span-3">
                    <Textarea
                      placeholder="Detailed description of your issue"
                      rows={5}
                      {...field}
                    />
                    <FormMessage />
                  </div>
                </div>
              )}
            />
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Attachments</Label>
              <div className="col-span-3">
                <Input
                  type="file"
                  multiple
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload screenshots or relevant files. Max 5 MB each (PNG, JPG, PDF).
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onSetActiveTab("support-home")}
              >
                Cancel
              </Button>
              <Button type="submit">
                Submit Ticket
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateTicket;
