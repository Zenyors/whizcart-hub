
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
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
import { Badge } from "@/components/ui/badge";
import { Search, RotateCcw, CreditCard, CalendarDays, Clock, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Mock refunds data
const mockRefunds = [
  {
    id: "REF-10045",
    orderId: "ORD-20235",
    customer: "Rahul Sharma",
    amount: 1250.75,
    requestDate: "2023-06-15",
    completionDate: "2023-06-16",
    status: "Completed",
    reason: "Item damaged during shipping",
    paymentMethod: "Credit Card",
  },
  {
    id: "REF-10046",
    orderId: "ORD-20236",
    customer: "Priya Patel",
    amount: 450.50,
    requestDate: "2023-06-16",
    completionDate: null,
    status: "Pending Approval",
    reason: "Wrong item received",
    paymentMethod: "UPI",
  },
  {
    id: "REF-10047",
    orderId: "ORD-20230",
    customer: "Amir Khan",
    amount: 3290.25,
    requestDate: "2023-06-14",
    completionDate: "2023-06-15",
    status: "Completed",
    reason: "Customer changed mind",
    paymentMethod: "Credit Card",
  },
  {
    id: "REF-10048",
    orderId: "ORD-20228",
    customer: "Neha Gupta",
    amount: 880.00,
    requestDate: "2023-06-13",
    completionDate: null,
    status: "Processing",
    reason: "Item not as described",
    paymentMethod: "Debit Card",
  },
  {
    id: "REF-10049",
    orderId: "ORD-20225",
    customer: "Vikram Singh",
    amount: 1675.50,
    requestDate: "2023-06-12",
    completionDate: null,
    status: "Rejected",
    reason: "Return period expired",
    paymentMethod: "UPI",
  },
  {
    id: "REF-10050",
    orderId: "ORD-20220",
    customer: "Meera Kapoor",
    amount: 2450.75,
    requestDate: "2023-06-10",
    completionDate: "2023-06-11",
    status: "Completed",
    reason: "Product defective",
    paymentMethod: "NetBanking",
  },
];

// Refund form schema
const refundFormSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  amount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    "Amount must be a positive number"
  ),
  reason: z.string().min(1, "Reason is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  notes: z.string().optional(),
});

const RefundsSection = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNewRefundDialog, setShowNewRefundDialog] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
  const form = useForm<z.infer<typeof refundFormSchema>>({
    resolver: zodResolver(refundFormSchema),
    defaultValues: {
      orderId: "",
      amount: "",
      reason: "",
      paymentMethod: "",
      notes: "",
    },
  });

  const filteredRefunds = mockRefunds.filter(refund => {
    // Apply search filter
    const searchMatch = refund.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       refund.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       refund.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const statusMatch = statusFilter === "all" || refund.status.toLowerCase() === statusFilter.toLowerCase();
    
    return searchMatch && statusMatch;
  });

  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Processing</Badge>;
      case 'pending approval':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending Approval</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleViewDetails = (refund: any) => {
    setSelectedRefund(refund);
    setShowDetailsDialog(true);
  };

  const handleApproveRefund = (id: string) => {
    toast({
      title: "Refund Approved",
      description: `Refund ${id} has been approved and is now processing.`,
    });
  };

  const handleRejectRefund = (id: string) => {
    toast({
      title: "Refund Rejected",
      description: `Refund ${id} has been rejected.`,
    });
  };

  const onSubmit = (values: z.infer<typeof refundFormSchema>) => {
    toast({
      title: "New Refund Created",
      description: `A refund for order ${values.orderId} has been initiated.`,
    });
    setShowNewRefundDialog(false);
    form.reset();
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle>Refunds</CardTitle>
              <CardDescription>Manage customer refunds and returns</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2">
                <Clock className="h-4 w-4" />
                Refund Policy
              </Button>
              <Button className="gap-2" onClick={() => setShowNewRefundDialog(true)}>
                <RotateCcw className="h-4 w-4" />
                New Refund
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, order, or customer..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending approval">Pending Approval</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Refund ID</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" />
                      Amount
                    </div>
                  </TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRefunds.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No refunds found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRefunds.map((refund) => (
                    <TableRow key={refund.id}>
                      <TableCell className="font-medium">{refund.id}</TableCell>
                      <TableCell>{refund.orderId}</TableCell>
                      <TableCell>{refund.customer}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <IndianRupee className="h-4 w-4 mr-1" />
                          {refund.amount.toLocaleString('en-IN', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(refund.requestDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(refund.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewDetails(refund)}
                          >
                            View
                          </Button>
                          {refund.status === "Pending Approval" && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleApproveRefund(refund.id)}
                              >
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleRejectRefund(refund.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Refund Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Refund Details</DialogTitle>
            <DialogDescription>
              Complete information about this refund
            </DialogDescription>
          </DialogHeader>
          
          {selectedRefund && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Refund ID</p>
                  <p>{selectedRefund.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                  <p>{selectedRefund.orderId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer</p>
                  <p>{selectedRefund.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Amount</p>
                  <p className="flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {selectedRefund.amount.toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Request Date</p>
                  <p>{new Date(selectedRefund.requestDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p>{getStatusBadge(selectedRefund.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                  <p>{selectedRefund.paymentMethod}</p>
                </div>
                {selectedRefund.completionDate && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completion Date</p>
                    <p>{new Date(selectedRefund.completionDate).toLocaleDateString()}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Reason</p>
                  <p>{selectedRefund.reason}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Refund Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-1 bg-blue-100">
                      <RotateCcw className="h-3 w-3 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Refund Requested</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(selectedRefund.requestDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {(selectedRefund.status !== "Pending Approval" && selectedRefund.status !== "Rejected") && (
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-1 bg-green-100">
                        <CalendarDays className="h-3 w-3 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Approved</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            new Date(selectedRefund.requestDate).getTime() + 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {selectedRefund.status === "Completed" && (
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-1 bg-green-100">
                        <CreditCard className="h-3 w-3 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Refund Completed</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(selectedRefund.completionDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {selectedRefund.status === "Rejected" && (
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-1 bg-red-100">
                        <Clock className="h-3 w-3 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Refund Rejected</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            new Date(selectedRefund.requestDate).getTime() + 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2">
            {selectedRefund && selectedRefund.status === "Pending Approval" && (
              <>
                <Button 
                  variant="outline"
                  onClick={() => {
                    handleRejectRefund(selectedRefund.id);
                    setShowDetailsDialog(false);
                  }}
                >
                  Reject
                </Button>
                <Button 
                  onClick={() => {
                    handleApproveRefund(selectedRefund.id);
                    setShowDetailsDialog(false);
                  }}
                >
                  Approve
                </Button>
              </>
            )}
            {selectedRefund && selectedRefund.status !== "Pending Approval" && (
              <Button onClick={() => setShowDetailsDialog(false)}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Refund Dialog */}
      <Dialog open={showNewRefundDialog} onOpenChange={setShowNewRefundDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Refund</DialogTitle>
            <DialogDescription>
              Process a refund for a customer order
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="orderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter order ID" {...field} />
                    </FormControl>
                    <FormDescription>
                      The order to be refunded
                    </FormDescription>
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
                      <Input placeholder="Enter refund amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Item damaged during shipping">Item damaged during shipping</SelectItem>
                        <SelectItem value="Wrong item received">Wrong item received</SelectItem>
                        <SelectItem value="Item not as described">Item not as described</SelectItem>
                        <SelectItem value="Product defective">Product defective</SelectItem>
                        <SelectItem value="Customer changed mind">Customer changed mind</SelectItem>
                        <SelectItem value="Order delay">Order delay</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Refund Method</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select refund method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Original Payment Method">Original Payment Method</SelectItem>
                        <SelectItem value="Store Credit">Store Credit</SelectItem>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Input placeholder="Add additional notes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowNewRefundDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Process Refund</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RefundsSection;
