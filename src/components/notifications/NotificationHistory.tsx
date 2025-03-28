
import React, { useState } from "react";
import { Bell, BellOff, CheckCircle, Info, AlertTriangle, AlertCircle } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for notification history
const mockNotifications = [
  {
    id: "1",
    title: "New Feature: Quick Checkout",
    message: "We've added a new quick checkout feature to improve your shopping experience",
    targetApp: "customer",
    notificationType: "info",
    sentAt: "2023-07-15T10:30:00",
    status: "delivered",
    deliveryStats: { sent: 5420, opened: 3240, clicked: 1540 },
  },
  {
    id: "2",
    title: "System Maintenance",
    message: "The app will be unavailable for maintenance tonight from 2AM to 4AM",
    targetApp: "all",
    notificationType: "warning",
    sentAt: "2023-07-14T14:45:00",
    status: "delivered",
    deliveryStats: { sent: 12500, opened: 9820, clicked: 3450 },
  },
  {
    id: "3",
    title: "Your Delivery is On the Way",
    message: "Your food order #4523 is on the way. Estimated delivery time: 25 minutes",
    targetApp: "customer",
    notificationType: "success",
    sentAt: "2023-07-14T12:15:00",
    status: "delivered",
    deliveryStats: { sent: 1, opened: 1, clicked: 1 },
  },
  {
    id: "4",
    title: "New Order Assigned",
    message: "You have been assigned a new delivery order #4523. Accept within 2 minutes.",
    targetApp: "rider",
    notificationType: "info",
    sentAt: "2023-07-14T12:00:00",
    status: "delivered",
    deliveryStats: { sent: 1, opened: 1, clicked: 1 },
  },
  {
    id: "5",
    title: "Critical: Incorrect Menu Prices",
    message: "Some menu items have incorrect pricing. Please update immediately.",
    targetApp: "vendor",
    notificationType: "critical",
    sentAt: "2023-07-13T09:30:00",
    status: "delivered",
    deliveryStats: { sent: 245, opened: 240, clicked: 238 },
  },
  {
    id: "6",
    title: "Weekly Earnings Report",
    message: "Your weekly earnings report is now available. You earned ₹15,420 this week!",
    targetApp: "vendor",
    notificationType: "info",
    sentAt: "2023-07-12T08:00:00",
    status: "delivered",
    deliveryStats: { sent: 245, opened: 198, clicked: 172 },
  },
  {
    id: "7",
    title: "Special Promotion Campaign",
    message: "50% off weekend sale starting tomorrow. Prepare your inventory!",
    targetApp: "vendor",
    notificationType: "info",
    sentAt: "2023-07-10T16:45:00",
    status: "scheduled",
    scheduledFor: "2023-07-16T08:00:00",
    deliveryStats: { sent: 0, opened: 0, clicked: 0 },
  },
];

const NotificationHistory = () => {
  const [filter, setFilter] = useState("");
  const [appFilter, setAppFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  // Filter notifications based on search and dropdown filters
  const filteredNotifications = mockNotifications.filter(notification => {
    const matchesSearch = filter === "" || 
      notification.title.toLowerCase().includes(filter.toLowerCase()) ||
      notification.message.toLowerCase().includes(filter.toLowerCase());
    
    const matchesApp = appFilter === "" || notification.targetApp === appFilter;
    
    const matchesStatus = statusFilter === "" || notification.status === statusFilter;
    
    return matchesSearch && matchesApp && matchesStatus;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "critical":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getAppBadge = (app: string) => {
    switch (app) {
      case "customer":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Customer</Badge>;
      case "rider":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Rider</Badge>;
      case "vendor":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Vendor</Badge>;
      case "all":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">All Apps</Badge>;
      default:
        return <Badge variant="outline">{app}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification History</CardTitle>
        <CardDescription>
          View past notifications and their performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search notifications..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1"
            />
            <div className="flex flex-row gap-2">
              <Select value={appFilter} onValueChange={setAppFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Apps" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Apps</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="rider">Rider</SelectItem>
                  <SelectItem value="vendor">Vendor</SelectItem>
                  <SelectItem value="all">Multi-App</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Type</TableHead>
                  <TableHead className="w-[300px]">Notification</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Sent/Scheduled</TableHead>
                  <TableHead className="text-right">Stats</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <BellOff className="h-10 w-10 mb-2" />
                        <p>No notifications found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        {getNotificationIcon(notification.notificationType)}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {notification.message}
                        </div>
                      </TableCell>
                      <TableCell>{getAppBadge(notification.targetApp)}</TableCell>
                      <TableCell>
                        {notification.status === 'scheduled' ? (
                          <div>
                            <span className="text-amber-600 font-medium">Scheduled</span>
                            <div className="text-xs text-muted-foreground">
                              {formatDate(notification.scheduledFor!)}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <span className="text-green-600 font-medium">Sent</span>
                            <div className="text-xs text-muted-foreground">
                              {formatDate(notification.sentAt)}
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {notification.status === 'scheduled' ? (
                          <span className="text-xs text-muted-foreground">Pending</span>
                        ) : (
                          <div className="text-xs">
                            <div><span className="font-medium">{notification.deliveryStats.sent}</span> sent</div>
                            <div><span className="font-medium">{notification.deliveryStats.opened}</span> opened ({Math.round((notification.deliveryStats.opened / notification.deliveryStats.sent) * 100)}%)</div>
                            <div><span className="font-medium">{notification.deliveryStats.clicked}</span> clicked ({Math.round((notification.deliveryStats.clicked / notification.deliveryStats.sent) * 100)}%)</div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                              >
                                <path
                                  d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            {notification.status === 'scheduled' && (
                              <DropdownMenuItem>Cancel Schedule</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationHistory;
