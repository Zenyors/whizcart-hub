
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft,
  Calendar,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  ShoppingCart,
  Star,
  User as UserIcon
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock user data
const mockUserDetails = {
  id: "USR-1001",
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 123-4567",
  address: {
    street: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States"
  },
  status: "Active",
  segment: "VIP",
  joinDate: "Oct 12, 2022",
  lastLogin: "Today, 9:42 AM",
  totalSpend: "$3,246.78",
  orderCount: 27,
  averageOrderValue: "$120.25",
  loyaltyPoints: 1850,
  loyaltyTier: "Gold",
  preferredPaymentMethod: "Visa ending in 4242",
  emailSubscription: true,
  referralCount: 5,
  notes: "High-value customer who frequently purchases premium items. Prefers fast shipping and has referred multiple friends to the platform."
};

// Mock order data
const mockOrders = Array.from({ length: 5 }).map((_, i) => ({
  id: `ORD-${10050 + i}`,
  date: new Date(Date.now() - (i * 7 * 86400000)).toLocaleDateString(),
  status: i === 0 ? "Delivered" : i === 1 ? "Shipped" : i === 2 ? "Processing" : "Completed",
  items: Math.floor(Math.random() * 5) + 1,
  total: `$${(Math.random() * 200 + 50).toFixed(2)}`,
}));

// Mock support tickets
const mockTickets = Array.from({ length: 3 }).map((_, i) => ({
  id: `TCK-${2040 + i}`,
  date: new Date(Date.now() - (i * 10 * 86400000)).toLocaleDateString(),
  subject: i === 0 ? "Shipping Delay Question" : i === 1 ? "Return Request" : "Product Information",
  status: i === 0 ? "Open" : i === 1 ? "Pending" : "Resolved",
}));

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const handleEmailClick = () => {
    toast({
      title: "Email Sent",
      description: `Email client opened for ${mockUserDetails.email}`,
    });
    window.location.href = `mailto:${mockUserDetails.email}`;
  };

  const handleCallClick = () => {
    toast({
      title: "Calling User",
      description: `Initiating call to ${mockUserDetails.phone}`,
    });
    window.location.href = `tel:${mockUserDetails.phone.replace(/\s/g, '')}`;
  };

  const handleEditProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "User profile has been successfully updated.",
    });
    setIsEditDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center gap-1 pl-0 hover:pl-2 transition-all duration-200"
            onClick={() => navigate("/users")}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Users</span>
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mockUserDetails.name}`} alt={mockUserDetails.name} />
                <AvatarFallback>{mockUserDetails.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                  {mockUserDetails.name}
                  {mockUserDetails.segment === "VIP" && (
                    <Badge className="bg-amber-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      VIP
                    </Badge>
                  )}
                </h1>
                <p className="text-muted-foreground">
                  {mockUserDetails.id} · Joined {mockUserDetails.joinDate}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="flex items-center gap-1" onClick={handleEmailClick}>
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-1" onClick={handleCallClick}>
                <Phone className="h-4 w-4" />
                <span>Call</span>
              </Button>
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-1">
                    <UserIcon className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Edit User Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to the user's profile information
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleEditProfileSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          defaultValue={mockUserDetails.name}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          defaultValue={mockUserDetails.email}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          defaultValue={mockUserDetails.phone}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="segment" className="text-right">
                          Segment
                        </Label>
                        <select 
                          id="segment"
                          defaultValue={mockUserDetails.segment}
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                        >
                          <option value="Regular">Regular</option>
                          <option value="VIP">VIP</option>
                          <option value="New">New</option>
                          <option value="At Risk">At Risk</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="notes" className="text-right">
                          Notes
                        </Label>
                        <Textarea
                          id="notes"
                          defaultValue={mockUserDetails.notes}
                          className="col-span-3"
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Spend" 
            value={mockUserDetails.totalSpend} 
            description="Lifetime value"
            icon={CreditCard}
          />
          <StatCard 
            title="Orders" 
            value={mockUserDetails.orderCount} 
            description="Total purchases"
            icon={ShoppingCart}
          />
          <StatCard 
            title="Loyalty Points" 
            value={mockUserDetails.loyaltyPoints} 
            description={`${mockUserDetails.loyaltyTier} tier member`}
            icon={Star}
          />
          <StatCard 
            title="Last Activity" 
            value={mockUserDetails.lastLogin} 
            description="Recent platform engagement"
            icon={Calendar}
          />
        </div>
        
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 items-center gap-1">
                    <span className="text-sm font-medium text-muted-foreground col-span-1">Name</span>
                    <span className="col-span-3">{mockUserDetails.name}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-1">
                    <span className="text-sm font-medium text-muted-foreground col-span-1">Email</span>
                    <span className="col-span-3">{mockUserDetails.email}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-1">
                    <span className="text-sm font-medium text-muted-foreground col-span-1">Phone</span>
                    <span className="col-span-3">{mockUserDetails.phone}</span>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-1">
                    <span className="text-sm font-medium text-muted-foreground col-span-1">Address</span>
                    <div className="col-span-3">
                      <div>{mockUserDetails.address.street}</div>
                      <div>
                        {mockUserDetails.address.city}, {mockUserDetails.address.state} {mockUserDetails.address.zip}
                      </div>
                      <div>{mockUserDetails.address.country}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Customer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 items-center gap-1">
                    <span className="text-sm font-medium text-muted-foreground col-span-1">Status</span>
                    <span className="col-span-3">
                      <Badge variant={mockUserDetails.status === "Active" ? "default" : "secondary"}>
                        {mockUserDetails.status}
                      </Badge>
                    </span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-1">
                    <span className="text-sm font-medium text-muted-foreground col-span-1">Segment</span>
                    <span className="col-span-3">
                      <Badge className={mockUserDetails.segment === "VIP" ? "bg-amber-500 text-white" : ""}>
                        {mockUserDetails.segment}
                      </Badge>
                    </span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-1">
                    <span className="text-sm font-medium text-muted-foreground col-span-1">Joined</span>
                    <span className="col-span-3">{mockUserDetails.joinDate}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-1">
                    <span className="text-sm font-medium text-muted-foreground col-span-1">Avg. Order</span>
                    <span className="col-span-3">{mockUserDetails.averageOrderValue}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-1">
                    <span className="text-sm font-medium text-muted-foreground col-span-1">Referrals</span>
                    <span className="col-span-3">{mockUserDetails.referralCount} users</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                  <CardDescription>Customer service and administrative notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{mockUserDetails.notes}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline">Edit Notes</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="orders" className="pt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>Recent purchases and order status</CardDescription>
                  </div>
                  <Button size="sm">View All Orders</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                order.status === "Delivered" ? "default" :
                                order.status === "Shipped" ? "secondary" :
                                order.status === "Processing" ? "outline" : "default"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell className="font-medium">{order.total}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="support" className="pt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Support History</CardTitle>
                    <CardDescription>Recent support tickets and inquiries</CardDescription>
                  </div>
                  <Button size="sm">Create New Ticket</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-medium">{ticket.id}</TableCell>
                          <TableCell>{ticket.date}</TableCell>
                          <TableCell>{ticket.subject}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                ticket.status === "Open" ? "outline" :
                                ticket.status === "Pending" ? "secondary" : "default"
                              }
                            >
                              {ticket.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>User Preferences</CardTitle>
                <CardDescription>Communication and account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Communication Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-muted-foreground">Receive updates on promotions and offers</p>
                      </div>
                      <div className="flex items-center">
                        <Badge variant={mockUserDetails.emailSubscription ? "default" : "secondary"}>
                          {mockUserDetails.emailSubscription ? "Subscribed" : "Unsubscribed"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Notifications</p>
                        <p className="text-sm text-muted-foreground">Emails about orders and shipping</p>
                      </div>
                      <div className="flex items-center">
                        <Badge>Subscribed</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Text messages for order updates</p>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="secondary">Unsubscribed</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Account Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Preferred Payment Method</p>
                        <p className="text-sm">{mockUserDetails.preferredPaymentMethod}</p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Default Shipping Address</p>
                        <p className="text-sm text-muted-foreground">
                          {mockUserDetails.address.street}, {mockUserDetails.address.city}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UserDetails;
