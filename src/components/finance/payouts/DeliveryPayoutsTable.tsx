
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IndianRupee, RefreshCw } from "lucide-react";
import { mockDeliveryPayouts, getStatusBadge, usePayoutHandlers } from "./payoutsUtils";

interface DeliveryPayoutsTableProps {
  filteredPayouts: typeof mockDeliveryPayouts;
}

const DeliveryPayoutsTable: React.FC<DeliveryPayoutsTableProps> = ({ filteredPayouts }) => {
  const { handleProcessPayout, handleRetryPayout } = usePayoutHandlers();

  return (
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
          {filteredPayouts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No delivery partner payouts found
              </TableCell>
            </TableRow>
          ) : (
            filteredPayouts.map((payout) => (
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
                <TableCell>
                  <Badge className={getStatusBadge(payout.status)}>
                    {payout.status}
                  </Badge>
                </TableCell>
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
  );
};

export default DeliveryPayoutsTable;
