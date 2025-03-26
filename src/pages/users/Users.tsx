
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { useToast } from "@/hooks/use-toast";
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
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
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
import { 
  Filter, 
  Search, 
  MoreHorizontal, 
  Download, 
  Users as UsersIcon,
  ShoppingCart,
  Star,
  Calendar,
  Mail
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

// Mock data
const mockUsers = Array.from({ length: 10 }).map((_, i) => ({
  id: `USR-${1000 + i}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: i % 5 === 0 ? "At Risk" : i % 3 === 0 ? "Inactive" : "Active",
  spend: `$${(Math.random() * 1000).toFixed(2)}`,
  orders: Math.floor(Math.random() * 50),
  lastPurchase: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
  joinDate: new Date(Date.now() - Math.random() * 100000000000).toLocaleDateString(),
  loyaltyPoints: Math.floor(Math.random() * 5000),
  segment: i % 4 === 0 ? "VIP" : i % 3 === 0 ? "Regular" : i % 5 === 0 ? "New" : "Returning",
}));

const Users = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    toast({
      title: sidebarOpen ? "Sidebar Collapsed" : "Sidebar Expanded",
      description: sidebarOpen ? "The sidebar has been collapsed." : "The sidebar has been expanded.",
    });
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "active") return matchesSearch && user.status === "Active";
    if (selectedTab === "inactive") return matchesSearch && user.status === "Inactive";
    if (selectedTab === "at-risk") return matchesSearch && user.status === "At Risk";
    if (selectedTab === "vip") return matchesSearch && user.segment === "VIP";
    
    return matchesSearch;
  });

  const handleViewDetails = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  return (
    <div className="flex min-h-screen bg-muted/5">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-0" : ""}`}>
        <Header 
          isSidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />
        
        <main className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="mb-8 flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Monitor, analyze, and manage your e-commerce platform users.
            </p>
          </div>
          
          <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              title="Total Users" 
              value={mockUsers.length} 
              description="Active platform users"
              icon={UsersIcon}
              trend={{ value: 12, positive: true }}
            />
            <StatCard 
              title="Avg. Order Value" 
              value="$248.92" 
              description="Per user average"
              icon={ShoppingCart}
              trend={{ value: 5.2, positive: true }}
            />
            <StatCard 
              title="Loyalty Engagement" 
              value="72%" 
              description="Users in loyalty program"
              icon={Star}
              trend={{ value: 3.1, positive: true }}
            />
            <StatCard 
              title="30-Day Retention" 
              value="68%" 
              description="Users returning within 30 days"
              icon={Calendar}
              trend={{ value: 2.7, positive: false }}
            />
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>User Overview</CardTitle>
                  <CardDescription>
                    Comprehensive view of all platform users and their metrics
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by name, email, or ID..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setSelectedTab}>
                  <TabsList className="w-full grid grid-cols-5">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="inactive">Inactive</TabsTrigger>
                    <TabsTrigger value="at-risk">At Risk</TabsTrigger>
                    <TabsTrigger value="vip">VIP</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Segment</TableHead>
                      <TableHead className="hidden md:table-cell">Spend</TableHead>
                      <TableHead className="hidden md:table-cell">Orders</TableHead>
                      <TableHead className="hidden md:table-cell">Last Purchase</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              user.status === "Active" ? "default" :
                              user.status === "Inactive" ? "secondary" : "destructive"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              user.segment === "VIP" ? "default" :
                              user.segment === "Regular" ? "default" :
                              user.segment === "New" ? "outline" : "secondary"
                            }
                            className={
                              user.segment === "VIP" ? "bg-green-500 text-white" : ""
                            }
                          >
                            {user.segment}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{user.spend}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.orders}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.lastPurchase}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewDetails(user.id)}>
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit user</DropdownMenuItem>
                              <DropdownMenuItem>Send email</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Deactivate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Segments</CardTitle>
                <CardDescription>Distribution of users by segment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium">VIP Customers</span>
                      <span className="text-xs text-muted-foreground">High-value recurring customers</span>
                    </div>
                    <Badge className="bg-green-500 text-white">25%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium">Regular Customers</span>
                      <span className="text-xs text-muted-foreground">Consistent shoppers</span>
                    </div>
                    <Badge>42%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium">Returning Customers</span>
                      <span className="text-xs text-muted-foreground">Occasional shoppers</span>
                    </div>
                    <Badge variant="secondary">18%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium">New Customers</span>
                      <span className="text-xs text-muted-foreground">First-time shoppers</span>
                    </div>
                    <Badge variant="outline">15%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common user management tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="flex justify-start items-center gap-2" onClick={() => navigate("/users/vip")}>
                    <Star className="h-4 w-4" />
                    <span>Manage VIP Users</span>
                  </Button>
                  <Button className="flex justify-start items-center gap-2" onClick={() => navigate("/users/support")}>
                    <Mail className="h-4 w-4" />
                    <span>User Support</span>
                  </Button>
                  <Button className="flex justify-start items-center gap-2" onClick={() => navigate("/users/feedback")}>
                    <ShoppingCart className="h-4 w-4" />
                    <span>Review Feedback</span>
                  </Button>
                  <Button className="flex justify-start items-center gap-2" onClick={() => navigate("/users/analytics")}>
                    <UsersIcon className="h-4 w-4" />
                    <span>User Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;
