
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart, FileText, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { fetchVendorOrders } from "@/api/vendorApi";

interface VendorOrdersHistoryProps {
  vendorId: string;
}

// Define the Order type
interface Order {
  id: string;
  orderNumber: string;
  date: string;
  itemsCount: number;
  amount: number;
  status: string;
  deliveryStatus: string;
  qualityScore: number;
}

const VendorOrdersHistory = ({ vendorId }: VendorOrdersHistoryProps) => {
  const { data, isLoading } = useQuery<Order[]>({
    queryKey: ['vendorOrders', vendorId],
    queryFn: () => fetchVendorOrders(vendorId),
  });

  const orders = data || [];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead>Quality</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                <p className="mt-2 text-muted-foreground">No orders found</p>
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.orderNumber}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>{order.itemsCount} items</TableCell>
                <TableCell>${order.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "Completed" ? "success" :
                      order.status === "Processing" ? "default" :
                      order.status === "Canceled" ? "destructive" : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {order.deliveryStatus === "On Time" ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-green-500">On Time</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-red-500" />
                        <span className="text-red-500">Delayed</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.qualityScore >= 90 ? "success" :
                      order.qualityScore >= 70 ? "default" : "destructive"
                    }
                  >
                    {order.qualityScore}/100
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
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

export default VendorOrdersHistory;
