
import React, { useState } from "react";
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
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Sample data for the orders table
const orders = [
  {
    id: "ORD-12345",
    customer: "Rahul Sharma",
    amount: "₹4,299",
    products: 3,
    status: "delivered",
    date: "11 Sep 2023",
    items: [
      { alt: "iPhone", fallback: "iP" },
      { alt: "Case", fallback: "C" },
      { alt: "Charger", fallback: "C" },
    ],
  },
  {
    id: "ORD-12346",
    customer: "Priya Patel",
    amount: "₹2,199",
    products: 2,
    status: "processing",
    date: "12 Sep 2023",
    items: [
      { alt: "Headphones", fallback: "H" },
      { alt: "Stand", fallback: "S" },
    ],
  },
  {
    id: "ORD-12347",
    customer: "Amit Kumar",
    amount: "₹8,990",
    products: 4,
    status: "shipped",
    date: "13 Sep 2023",
    items: [
      { alt: "Laptop", fallback: "L" },
      { alt: "Mouse", fallback: "M" },
      { alt: "Keyboard", fallback: "K" },
      { alt: "Mousepad", fallback: "M" },
    ],
  },
  {
    id: "ORD-12348",
    customer: "Sanjay Gupta",
    amount: "₹1,499",
    products: 1,
    status: "cancelled",
    date: "10 Sep 2023",
    items: [
      { alt: "Earbuds", fallback: "E" },
    ],
  },
  {
    id: "ORD-12349",
    customer: "Neha Singh",
    amount: "₹5,799",
    products: 3,
    status: "delivered",
    date: "9 Sep 2023",
    items: [
      { alt: "Smartwatch", fallback: "S" },
      { alt: "Strap", fallback: "S" },
      { alt: "Charger", fallback: "C" },
    ],
  },
];

// Function to get status badge styling
const getStatusBadge = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20";
    case "processing":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
    case "shipped":
      return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20";
    case "cancelled":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
  }
};

const OrdersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Example total pages

  return (
    <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Manage your most recent customer orders
          </CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="hidden md:table-cell">Products</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <AvatarGroup
                    avatars={order.items}
                    max={3}
                    size="sm"
                  />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="text-muted-foreground text-sm">
                    {order.date}
                  </span>
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
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Cancel order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex items-center justify-end space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersTable;
