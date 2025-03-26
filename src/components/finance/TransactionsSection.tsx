
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
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Download, Filter, Search, MoreVertical, CalendarIcon, ArrowUpDown, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock transactions data
const mockTransactions = [
  {
    id: "TR-120345",
    date: "2023-06-15",
    customer: "Rahul Sharma",
    vendor: "Fresh Foods Market",
    amount: 1250.75,
    paymentMethod: "Credit Card",
    status: "Completed",
    type: "Order",
  },
  {
    id: "TR-120346",
    date: "2023-06-14",
    customer: "Priya Patel",
    vendor: "Organic Harvest",
    amount: 890.50,
    paymentMethod: "UPI",
    status: "Completed",
    type: "Order",
  },
  {
    id: "TR-120347",
    date: "2023-06-14",
    customer: "Neel Desai",
    vendor: "Spice Junction",
    amount: 525.25,
    paymentMethod: "Debit Card",
    status: "Processing",
    type: "Order",
  },
  {
    id: "TR-120348",
    date: "2023-06-13",
    customer: "Ananya Singh",
    vendor: "Global Distributors",
    amount: 2450.00,
    paymentMethod: "NetBanking",
    status: "Completed",
    type: "Order",
  },
  {
    id: "TR-120349",
    date: "2023-06-13",
    customer: "Arjun Kumar",
    vendor: "Fresh Foods Market",
    amount: 750.25,
    paymentMethod: "UPI",
    status: "Failed",
    type: "Order",
  },
  {
    id: "TR-120350",
    date: "2023-06-12",
    customer: "Ananya Singh",
    vendor: "Organic Harvest",
    amount: 450.00,
    paymentMethod: "Credit Card",
    status: "Refunded",
    type: "Refund",
  },
  {
    id: "TR-120351",
    date: "2023-06-12",
    customer: "System",
    vendor: "Fresh Foods Market",
    amount: 12450.75,
    paymentMethod: "Bank Transfer",
    status: "Completed",
    type: "Payout",
  },
  {
    id: "TR-120352",
    date: "2023-06-11",
    customer: "System",
    vendor: "Swift Delivery",
    amount: 3450.50,
    paymentMethod: "Bank Transfer",
    status: "Processing",
    type: "Payout",
  },
];

interface TransactionsSectionProps {
  limit?: number;
}

const TransactionsSection = ({ limit }: TransactionsSectionProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionType, setTransactionType] = useState("all");
  const [status, setStatus] = useState("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const displayedTransactions = mockTransactions
    .filter(transaction => {
      // Apply search filter
      const searchMatch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply type filter
      const typeMatch = transactionType === "all" || transaction.type.toLowerCase() === transactionType.toLowerCase();
      
      // Apply status filter
      const statusMatch = status === "all" || transaction.status.toLowerCase() === status.toLowerCase();
      
      // Apply date filter
      const dateMatch = !date || transaction.date === format(date, "yyyy-MM-dd");
      
      return searchMatch && typeMatch && statusMatch && dateMatch;
    })
    .slice(0, limit || mockTransactions.length);

  const downloadReport = () => {
    toast({
      title: "Report Download",
      description: "Transaction report is being generated and will download shortly.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Failed</Badge>;
      case 'refunded':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Refunded</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleViewTransaction = (id: string) => {
    toast({
      title: "Transaction Details",
      description: `Viewing details for transaction ${id}`,
    });
  };

  return (
    <Card className="w-full">
      {!limit && (
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>View and manage all financial transactions</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2" onClick={downloadReport}>
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      )}
      
      {!limit && (
        <CardContent className="pb-1">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, customer, or vendor..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={transactionType} onValueChange={setTransactionType}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="order">Order</SelectItem>
                  <SelectItem value="refund">Refund</SelectItem>
                  <SelectItem value="payout">Payout</SelectItem>
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
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[160px] gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              {(searchTerm || transactionType !== "all" || status !== "all" || date) && (
                <Button variant="ghost" onClick={() => {
                  setSearchTerm("");
                  setTransactionType("all");
                  setStatus("all");
                  setDate(undefined);
                }}>
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      )}
      
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>From/To</TableHead>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-4 w-4" />
                    Amount
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                displayedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>
                      {transaction.type === "Payout" 
                        ? transaction.vendor 
                        : transaction.customer !== "System" 
                          ? transaction.customer 
                          : transaction.vendor}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        {transaction.amount.toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewTransaction(transaction.id)}>
                            View Details
                          </DropdownMenuItem>
                          {transaction.status === "Processing" && (
                            <DropdownMenuItem>Process Now</DropdownMenuItem>
                          )}
                          {transaction.status !== "Refunded" && transaction.type === "Order" && (
                            <DropdownMenuItem>Issue Refund</DropdownMenuItem>
                          )}
                          <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {limit && (
          <div className="flex justify-center mt-4">
            <Button variant="outline" asChild>
              <a href="/finance?tab=transactions">View All Transactions</a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsSection;
