
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
import { Badge } from "@/components/ui/badge";
import { Search, IndianRupee, Check, X, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock settlements data
const mockSettlements = [
  {
    id: "STL-10045",
    date: "2023-06-15",
    partner: "Fresh Foods Market",
    partnerType: "Vendor",
    amount: 24580.50,
    status: "Completed",
    method: "Bank Transfer",
    account: "XXXX6789",
    reference: "REF78901234",
  },
  {
    id: "STL-10046",
    date: "2023-06-14",
    partner: "Swift Delivery",
    partnerType: "Delivery Partner",
    amount: 8790.75,
    status: "Processing",
    method: "Bank Transfer",
    account: "XXXX1234",
    reference: "REF23456789",
  },
  {
    id: "STL-10047",
    date: "2023-06-14",
    partner: "Organic Harvest",
    partnerType: "Vendor",
    amount: 12450.25,
    status: "Pending",
    method: "Bank Transfer",
    account: "XXXX5678",
    reference: "REF34567890",
  },
  {
    id: "STL-10048",
    date: "2023-06-13",
    partner: "Rapid Delivery",
    partnerType: "Delivery Partner",
    amount: 6540.00,
    status: "Failed",
    method: "Bank Transfer",
    account: "XXXX2345",
    reference: "REF45678901",
    failureReason: "Invalid account details",
  },
  {
    id: "STL-10049",
    date: "2023-06-13",
    partner: "Spice Junction",
    partnerType: "Vendor",
    amount: 10780.50,
    status: "Completed",
    method: "Bank Transfer",
    account: "XXXX7890",
    reference: "REF56789012",
  },
  {
    id: "STL-10050",
    date: "2023-06-12",
    partner: "City Express",
    partnerType: "Delivery Partner",
    amount: 5290.25,
    status: "Completed",
    method: "Bank Transfer",
    account: "XXXX3456",
    reference: "REF67890123",
  },
];

const SettlementsSection = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [partnerType, setPartnerType] = useState("all");
  const [status, setStatus] = useState("all");
  const [selectedSettlement, setSelectedSettlement] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
  const filteredSettlements = mockSettlements.filter(settlement => {
    // Apply search filter
    const searchMatch = settlement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       settlement.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       settlement.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply partner type filter
    const typeMatch = partnerType === "all" || settlement.partnerType.toLowerCase() === partnerType.toLowerCase();
    
    // Apply status filter
    const statusMatch = status === "all" || settlement.status.toLowerCase() === status.toLowerCase();
    
    return searchMatch && typeMatch && statusMatch;
  });

  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Processing</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleViewDetails = (settlement: any) => {
    setSelectedSettlement(settlement);
    setShowDetailsDialog(true);
  };

  const handleRetrySettlement = (id: string) => {
    toast({
      title: "Settlement Retry Initiated",
      description: `Settlement ${id} has been queued for retry.`,
    });
  };

  const handleCreateNewSettlement = () => {
    toast({
      title: "New Settlement",
      description: "Creating a new settlement batch...",
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generation",
      description: "Settlement report is being generated and will download shortly.",
    });
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle>Settlements</CardTitle>
              <CardDescription>Manage payments to vendors and delivery partners</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2" onClick={handleGenerateReport}>
                <FileText className="h-4 w-4" />
                Generate Report
              </Button>
              <Button className="gap-2" onClick={handleCreateNewSettlement}>
                Create Settlement Batch
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, partner, or reference..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={partnerType} onValueChange={setPartnerType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Partner Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Partners</SelectItem>
                  <SelectItem value="vendor">Vendors</SelectItem>
                  <SelectItem value="delivery partner">Delivery Partners</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              
              {(searchTerm || partnerType !== "all" || status !== "all") && (
                <Button variant="ghost" onClick={() => {
                  setSearchTerm("");
                  setPartnerType("all");
                  setStatus("all");
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
                  <TableHead>Settlement ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Partner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" />
                      Amount
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSettlements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">
                      No settlements found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSettlements.map((settlement) => (
                    <TableRow key={settlement.id}>
                      <TableCell className="font-medium">{settlement.id}</TableCell>
                      <TableCell>{new Date(settlement.date).toLocaleDateString()}</TableCell>
                      <TableCell>{settlement.partner}</TableCell>
                      <TableCell>{settlement.partnerType}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <IndianRupee className="h-4 w-4 mr-1" />
                          {settlement.amount.toLocaleString('en-IN', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(settlement.status)}</TableCell>
                      <TableCell>{settlement.method}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewDetails(settlement)}
                          >
                            View
                          </Button>
                          {settlement.status === "Failed" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRetrySettlement(settlement.id)}
                            >
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
        </CardContent>
      </Card>

      {/* Settlement Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Settlement Details</DialogTitle>
            <DialogDescription>
              Complete information about this settlement
            </DialogDescription>
          </DialogHeader>
          
          {selectedSettlement && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Settlement ID</p>
                  <p>{selectedSettlement.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p>{new Date(selectedSettlement.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Partner</p>
                  <p>{selectedSettlement.partner}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Partner Type</p>
                  <p>{selectedSettlement.partnerType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Amount</p>
                  <p className="flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {selectedSettlement.amount.toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p>{getStatusBadge(selectedSettlement.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                  <p>{selectedSettlement.method}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Account</p>
                  <p>{selectedSettlement.account}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Reference Number</p>
                  <p>{selectedSettlement.reference}</p>
                </div>
                {selectedSettlement.status === "Failed" && (
                  <div className="col-span-2 p-3 border rounded-md bg-red-50">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800">Failure Reason</p>
                        <p className="text-red-600">{selectedSettlement.failureReason}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Settlement Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-1 bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Settlement Initiated</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(selectedSettlement.date).toLocaleDateString()} 10:00 AM
                      </p>
                    </div>
                  </div>
                  
                  {selectedSettlement.status !== "Pending" && (
                    <div className="flex items-start gap-3">
                      <div className={`rounded-full p-1 ${
                        selectedSettlement.status === "Failed" ? "bg-red-100" : "bg-blue-100"
                      }`}>
                        {selectedSettlement.status === "Failed" ? (
                          <X className="h-3 w-3 text-red-600" />
                        ) : (
                          <Check className="h-3 w-3 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">Processing</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(selectedSettlement.date).toLocaleDateString()} 11:30 AM
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {selectedSettlement.status === "Completed" && (
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-1 bg-green-100">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Settlement Completed</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(selectedSettlement.date).toLocaleDateString()} 2:15 PM
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>Close</Button>
            <Button onClick={() => {
              toast({
                title: "Receipt Generated",
                description: "The settlement receipt has been generated and will download shortly."
              });
            }}>
              Download Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettlementsSection;
