
import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
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
import { Badge } from "@/components/ui/badge";
import { Search, IndianRupee, Plus, FileText, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Mock vendor payouts data
const mockVendorPayouts = [
  {
    id: "PV-10045",
    vendor: "Fresh Foods Market",
    invoiceNumber: "INV-2023-1245",
    amount: 12450.75,
    dueDate: "2023-07-15",
    status: "Scheduled",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX6789",
  },
  {
    id: "PV-10046",
    vendor: "Global Distributors",
    invoiceNumber: "INV-2023-1154",
    amount: 8790.30,
    dueDate: "2023-07-05",
    status: "Processing",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX1234",
  },
  {
    id: "PV-10047",
    vendor: "Sunshine Textiles",
    invoiceNumber: "INV-2023-1087",
    amount: 5450.50,
    dueDate: "2023-06-30",
    status: "Paid",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX5678",
  },
  {
    id: "PV-10048",
    vendor: "Metro Manufacturing",
    invoiceNumber: "INV-2023-0893",
    amount: 3120.25,
    dueDate: "2023-06-25",
    status: "Paid",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX2345",
  },
  {
    id: "PV-10049",
    vendor: "EcoPackage Solutions",
    invoiceNumber: "INV-2023-1275",
    amount: 2875.60,
    dueDate: "2023-07-20",
    status: "Scheduled",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX7890",
  },
];

// Mock delivery partner payouts
const mockDeliveryPayouts = [
  {
    id: "PD-10050",
    partner: "City Express",
    period: "June 1-15, 2023",
    amount: 7450.25,
    dueDate: "2023-06-20",
    status: "Paid",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX3456",
  },
  {
    id: "PD-10051",
    partner: "Swift Delivery",
    period: "June 1-15, 2023",
    amount: 6890.50,
    dueDate: "2023-06-20",
    status: "Paid",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX4567",
  },
  {
    id: "PD-10052",
    partner: "Rapid Delivery",
    period: "June 1-15, 2023",
    amount: 5240.75,
    dueDate: "2023-06-20",
    status: "Failed",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX5678",
    failureReason: "Incorrect bank details",
  },
  {
    id: "PD-10053",
    partner: "City Express",
    period: "June 16-30, 2023",
    amount: 8120.30,
    dueDate: "2023-07-05",
    status: "Scheduled",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX3456",
  },
  {
    id: "PD-10054",
    partner: "Swift Delivery",
    period: "June 16-30, 2023",
    amount: 7350.60,
    dueDate: "2023-07-05",
    status: "Scheduled",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX4567",
  },
];

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

const PayoutsSection = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNewPayoutDialog, setShowNewPayoutDialog] = useState(false);
  
  const form = useForm<z.infer<typeof payoutFormSchema>>({
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

  const filteredVendorPayouts = mockVendorPayouts.filter(payout => {
    // Apply search filter
    const searchMatch = payout.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       payout.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       payout.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const statusMatch = statusFilter === "all" || payout.status.toLowerCase() === statusFilter.toLowerCase();
    
    return searchMatch && statusMatch;
  });

  const filteredDeliveryPayouts = mockDeliveryPayouts.filter(payout => {
    // Apply search filter
    const searchMatch = payout.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       payout.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       payout.period.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const statusMatch = statusFilter === "all" || payout.status.toLowerCase() === statusFilter.toLowerCase();
    
    return searchMatch && statusMatch;
  });

  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Paid</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Scheduled</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const onSubmit = (values: z.infer<typeof payoutFormSchema>) => {
    toast({
      title: "New Payout Created",
      description: `A new payout has been scheduled for ${values.partner}.`,
    });
    setShowNewPayoutDialog(false);
    form.reset();
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generation",
      description: "Payout report is being generated and will download shortly.",
    });
  };

  const handleProcessPayout = (id: string) => {
    toast({
      title: "Payout Processing",
      description: `Payout ${id} is being processed immediately.`,
    });
  };

  const handleRetryPayout = (id: string) => {
    toast({
      title: "Payout Retry",
      description: `Payout ${id} has been queued for retry.`,
    });
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle>Payouts</CardTitle>
              <CardDescription>Manage payments to your vendors and delivery partners</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2" onClick={handleGenerateReport}>
                <FileText className="h-4 w-4" />
                Generate Report
              </Button>
              <Button className="gap-2" onClick={() => setShowNewPayoutDialog(true)}>
                <Plus className="h-4 w-4" />
                New Payout
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search payouts..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              
              {(searchTerm || statusFilter !== "all") && (
                <Button variant="ghost" onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}>
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="vendors" className="mb-6">
            <TabsList>
              <TabsTrigger value="vendors">Vendor Payouts</TabsTrigger>
              <TabsTrigger value="delivery">Delivery Partner Payouts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vendors" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payout ID</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Invoice</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          Amount
                        </div>
                      </TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVendorPayouts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          No vendor payouts found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredVendorPayouts.map((payout) => (
                        <TableRow key={payout.id}>
                          <TableCell className="font-medium">{payout.id}</TableCell>
                          <TableCell>{payout.vendor}</TableCell>
                          <TableCell>{payout.invoiceNumber}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <IndianRupee className="h-4 w-4 mr-1" />
                              {payout.amount.toLocaleString('en-IN', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </div>
                          </TableCell>
                          <TableCell>{new Date(payout.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell>{getStatusBadge(payout.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">View</Button>
                              {payout.status === "Scheduled" && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleProcessPayout(payout.id)}
                                >
                                  Process Now
                                </Button>
                              )}
                              {payout.status === "Failed" && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleRetryPayout(payout.id)}
                                >
                                  <RefreshCw className="h-3 w-3 mr-1" />
                                  Retry
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="delivery" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payout ID</TableHead>
                      <TableHead>Delivery Partner</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          Amount
                        </div>
                      </TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDeliveryPayouts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          No delivery partner payouts found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDeliveryPayouts.map((payout) => (
                        <TableRow key={payout.id}>
                          <TableCell className="font-medium">{payout.id}</TableCell>
                          <TableCell>{payout.partner}</TableCell>
                          <TableCell>{payout.period}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <IndianRupee className="h-4 w-4 mr-1" />
                              {payout.amount.toLocaleString('en-IN', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </div>
                          </TableCell>
                          <TableCell>{new Date(payout.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell>{getStatusBadge(payout.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">View</Button>
                              {payout.status === "Scheduled" && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleProcessPayout(payout.id)}
                                >
                                  Process Now
                                </Button>
                              )}
                              {payout.status === "Failed" && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleRetryPayout(payout.id)}
                                >
                                  <RefreshCw className="h-3 w-3 mr-1" />
                                  Retry
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* New Payout Dialog */}
      <Dialog open={showNewPayoutDialog} onOpenChange={setShowNewPayoutDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Payout</DialogTitle>
            <DialogDescription>
              Schedule a new payout to a vendor or delivery partner
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="partnerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select partner type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                    <FormLabel>Partner</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select partner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                    <FormLabel>Amount (₹)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter amount" {...field} />
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
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
                    <FormLabel>Payment Method</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                    <FormLabel>Reference (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter reference number" {...field} />
                    </FormControl>
                    <FormDescription>
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
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Add notes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowNewPayoutDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Schedule Payout</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PayoutsSection;
