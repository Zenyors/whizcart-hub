
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Calendar, Bell, Mail, MessageSquare, User, Store, Send, Clock } from "lucide-react";

const notifications = [
  {
    id: "notif-123",
    type: "push",
    title: "Order Confirmed",
    content: "Your order #ORD-1234 has been confirmed and is being processed.",
    recipient: "John Doe",
    recipientType: "customer",
    status: "delivered",
    sentAt: "2023-07-15 14:30:05",
    app: "customer"
  },
  {
    id: "notif-124",
    type: "email",
    title: "New Order Received",
    content: "You have received a new order #ORD-1234 from John Doe. Please process it.",
    recipient: "Store Manager",
    recipientType: "vendor",
    status: "delivered",
    sentAt: "2023-07-15 14:30:00",
    app: "vendor"
  },
  {
    id: "notif-125",
    type: "push",
    title: "New Delivery",
    content: "You have a new delivery assignment. Please check the app for details.",
    recipient: "Delivery Partner",
    recipientType: "rider",
    status: "delivered",
    sentAt: "2023-07-15 14:35:00",
    app: "rider"
  },
  {
    id: "notif-126",
    type: "sms",
    title: "Order Update",
    content: "Your order #ORD-1234 is out for delivery and will arrive soon.",
    recipient: "John Doe",
    recipientType: "customer",
    status: "delivered",
    sentAt: "2023-07-15 15:00:00",
    app: "customer"
  },
  {
    id: "notif-127",
    type: "push",
    title: "Payment Received",
    content: "Payment of $50.00 has been received for order #ORD-1234.",
    recipient: "Store Manager",
    recipientType: "vendor",
    status: "failed",
    sentAt: "2023-07-15 15:15:00",
    app: "vendor"
  },
  {
    id: "notif-128",
    type: "push",
    title: "Special Offer",
    content: "Get 15% off on your next purchase! Use code SUMMER15.",
    recipient: "All Users",
    recipientType: "customer",
    status: "scheduled",
    sentAt: "2023-07-16 10:00:00",
    app: "customer"
  }
];

const NotificationHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [appFilter, setAppFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  
  const filteredNotifications = notifications.filter(notification => {
    const searchMatch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        notification.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        notification.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = typeFilter === "all" || notification.type === typeFilter;
    const appMatch = appFilter === "all" || notification.app === appFilter;
    const statusMatch = statusFilter === "all" || notification.status === statusFilter;
    
    return searchMatch && typeMatch && appMatch && statusMatch;
  });

  const handleViewDetail = (notification) => {
    setSelectedNotification(notification);
    setShowDetailDialog(true);
  };
  
  const getNotificationTypeIcon = (type) => {
    switch (type) {
      case "push":
        return <Bell className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "sms":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Scheduled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getAppIcon = (app) => {
    switch (app) {
      case "customer":
        return <User className="h-4 w-4" />;
      case "vendor":
        return <Store className="h-4 w-4" />;
      case "rider":
        return <Send className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification History</CardTitle>
        <CardDescription>View and manage all sent notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notifications..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="push">Push</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={appFilter} onValueChange={setAppFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="App" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Apps</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="rider">Rider</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>App</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent At</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No notifications found
                  </TableCell>
                </TableRow>
              ) : (
                filteredNotifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getNotificationTypeIcon(notification.type)}
                        <span className="capitalize">{notification.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{notification.title}</TableCell>
                    <TableCell>{notification.recipient}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getAppIcon(notification.app)}
                        <span className="capitalize">{notification.app}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(notification.status)}</TableCell>
                    <TableCell>{notification.sentAt}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetail(notification)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      {/* Notification Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Notification Details</DialogTitle>
            <DialogDescription>
              View complete information about this notification
            </DialogDescription>
          </DialogHeader>
          
          {selectedNotification && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{selectedNotification.title}</h3>
                {getStatusBadge(selectedNotification.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Notification ID</p>
                  <p>{selectedNotification.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Type</p>
                  <div className="flex items-center gap-2">
                    {getNotificationTypeIcon(selectedNotification.type)}
                    <span className="capitalize">{selectedNotification.type}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Recipient</p>
                  <p>{selectedNotification.recipient}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Recipient Type</p>
                  <p className="capitalize">{selectedNotification.recipientType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Sent At</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedNotification.sentAt}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">App</p>
                  <div className="flex items-center gap-2">
                    {getAppIcon(selectedNotification.app)}
                    <span className="capitalize">{selectedNotification.app} App</span>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Content</p>
                <div className="p-3 border rounded-md bg-muted/20">
                  <p>{selectedNotification.content}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-1 bg-blue-100">
                      <Clock className="h-3 w-3 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Created</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedNotification.sentAt.split(' ')[0]} {parseInt(selectedNotification.sentAt.split(' ')[1].split(':')[0]) - 1}:
                        {selectedNotification.sentAt.split(' ')[1].split(':')[1]}:
                        {selectedNotification.sentAt.split(' ')[1].split(':')[2]}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-1 bg-green-100">
                      <Send className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sent</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedNotification.sentAt}
                      </p>
                    </div>
                  </div>
                  
                  {selectedNotification.status === "delivered" && (
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-1 bg-green-100">
                        <User className="h-3 w-3 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Delivered</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedNotification.sentAt.split(' ')[0]} {parseInt(selectedNotification.sentAt.split(' ')[1].split(':')[0])}:
                          {parseInt(selectedNotification.sentAt.split(' ')[1].split(':')[1]) + 1}:
                          {selectedNotification.sentAt.split(' ')[1].split(':')[2]}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {selectedNotification.status === "failed" && (
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-1 bg-red-100">
                        <Clock className="h-3 w-3 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Failed</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedNotification.sentAt.split(' ')[0]} {parseInt(selectedNotification.sentAt.split(' ')[1].split(':')[0])}:
                          {parseInt(selectedNotification.sentAt.split(' ')[1].split(':')[1]) + 1}:
                          {selectedNotification.sentAt.split(' ')[1].split(':')[2]}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setShowDetailDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default NotificationHistory;
