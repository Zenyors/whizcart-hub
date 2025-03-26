
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";

interface Payout {
  id: string;
  vendorName: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: string;
  paymentMethod: string;
}

interface PayoutTableProps {
  payouts: Payout[];
  isLoading: boolean;
  sortBy: string;
  sortOrder: string;
  setSortBy: (value: string) => void;
  toggleSortOrder: () => void;
}

const PayoutTable = ({ 
  payouts, 
  isLoading, 
  sortBy, 
  sortOrder, 
  setSortBy, 
  toggleSortOrder 
}: PayoutTableProps) => {
  
  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Payout History</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-auto">
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer" 
                  onClick={() => { setSortBy("vendor"); toggleSortOrder(); }}
                >
                  Vendor {sortBy === "vendor" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead>Invoice Number</TableHead>
                <TableHead 
                  className="cursor-pointer" 
                  onClick={() => { setSortBy("amount"); toggleSortOrder(); }}
                >
                  Amount {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer" 
                  onClick={() => { setSortBy("date"); toggleSortOrder(); }}
                >
                  Due Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">Loading...</TableCell>
                </TableRow>
              ) : payouts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">No payouts found</TableCell>
                </TableRow>
              ) : (
                payouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell>{payout.vendorName}</TableCell>
                    <TableCell>{payout.invoiceNumber}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" />
                      {payout.amount.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>{new Date(payout.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(payout.status)}</TableCell>
                    <TableCell>{payout.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">View</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayoutTable;
