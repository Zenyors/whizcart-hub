
import React from "react";
import { IndianRupee, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { cn } from "@/lib/utils";

// Sample data for different periods
const dailyOrders = [
  { id: "ORD-9843", customer: "Rajesh Kumar", items: 3, total: 42000, status: "delivered" },
  { id: "ORD-7648", customer: "Priya Sharma", items: 1, total: 12000, status: "processing" },
  { id: "ORD-5218", customer: "Amit Patel", items: 2, total: 24000, status: "pending" },
  { id: "ORD-4127", customer: "Sneha Verma", items: 4, total: 36000, status: "delivered" },
  { id: "ORD-3521", customer: "Vikram Singh", items: 5, total: 48000, status: "canceled" },
];

const weeklyOrders = [
  { id: "ORD-8754", customer: "Ananya Gupta", items: 2, total: 28000, status: "delivered" },
  { id: "ORD-8123", customer: "Rahul Mehta", items: 3, total: 34500, status: "processing" },
  { id: "ORD-7909", customer: "Neha Sharma", items: 1, total: 9800, status: "delivered" },
  { id: "ORD-7856", customer: "Karan Malhotra", items: 4, total: 45000, status: "pending" },
  { id: "ORD-7601", customer: "Divya Patel", items: 2, total: 18500, status: "canceled" },
];

const monthlyOrders = [
  { id: "ORD-6543", customer: "Meera Reddy", items: 3, total: 32000, status: "delivered" },
  { id: "ORD-6128", customer: "Arjun Kumar", items: 2, total: 21500, status: "processing" },
  { id: "ORD-5987", customer: "Pooja Singh", items: 4, total: 38900, status: "delivered" },
  { id: "ORD-5632", customer: "Rohan Sharma", items: 1, total: 8500, status: "pending" },
  { id: "ORD-5421", customer: "Anjali Verma", items: 6, total: 54000, status: "delivered" },
];

const yearlyOrders = [
  { id: "ORD-4278", customer: "Sanjay Kapoor", items: 3, total: 37800, status: "delivered" },
  { id: "ORD-3965", customer: "Aarti Patel", items: 2, total: 24500, status: "delivered" },
  { id: "ORD-3742", customer: "Vivek Singh", items: 5, total: 52000, status: "processing" },
  { id: "ORD-3521", customer: "Deepa Sharma", items: 1, total: 12500, status: "canceled" },
  { id: "ORD-3290", customer: "Rajesh Kumar", items: 4, total: 41200, status: "delivered" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20";
    case "processing":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
    case "pending":
      return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20";
    case "canceled":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
  }
};

interface RecentOrdersTableProps {
  period: "daily" | "weekly" | "monthly" | "yearly";
}

const RecentOrdersTable = ({ period }: RecentOrdersTableProps) => {
  // Select data based on period
  const getOrdersData = () => {
    switch (period) {
      case "daily": return dailyOrders;
      case "weekly": return weeklyOrders;
      case "yearly": return yearlyOrders;
      default: return monthlyOrders;
    }
  };

  const orders = getOrdersData();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Latest transactions from your store
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          View all
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <IndianRupee className="h-4 w-4" />
                  {order.total.toLocaleString('en-IN')}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize",
                      getStatusBadge(order.status)
                    )}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrdersTable;
