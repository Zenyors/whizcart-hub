import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft,
  Search, 
  MoreHorizontal, 
  Star,
  ShoppingCart,
  Calendar,
  CreditCard,
  Mail,
  Trophy,
  Gift,
  Phone
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";

// Mock VIP user data
const mockVipUsers = Array.from({ length: 15 }).map((_, i) => ({
  id: `USR-${1000 + i}`,
  name: `VIP User ${i + 1}`,
  email: `vip${i + 1}@example.com`,
  avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=VIP${i}`,
  status: "Active",
  joinDate: new Date(Date.now() - Math.random() * 100000000000).toLocaleDateString(),
  lastPurchase: new Date(Date.now() - Math.random() * 5000000000).toLocaleDateString(),
  totalSpend: `$${(Math.random() * 5000 + 2000).toFixed(2)}`,
  loyaltyLevel: i % 5 === 0 ? "Platinum" : i % 3 === 0 ? "Gold" : "Diamond",
  orders: Math.floor(Math.random() * 50) + 30,
  averageOrderValue: `$${(Math.random() * 250 + 150).toFixed(2)}`,
  preferredCategory: i % 4 === 0 ? "Electronics" : i % 3 === 0 ? "Fashion" : i % 5 === 0 ? "Home" : "Beauty",
  birthdayMonth: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][Math.floor(Math.random() * 12)],
  phoneNumber: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
}));

const VipUsers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(mockVipUsers);

  useEffect(() => {
    const filtered = mockVipUsers.filter(user => {
      return (
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.loyaltyLevel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.preferredCategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    
    setFilteredUsers(filtered);
  }, [searchQuery]);

  const handleViewDetails = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const loyaltyColor = (level: string) => {
    switch (level) {
      case "Platinum":
        return "bg-slate-400 text-white";
      case "Diamond":
        return "bg-blue-400 text-white";
      case "Gold":
        return "bg-amber-500 text-white";
      default:
        return "";
    }
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
          
          <PageHeader 
            title="VIP Users" 
            description="Manage and analyze your highest-value customers"
          >
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>Email All VIPs</span>
              </Button>
              <Button className="flex items-center gap-1">
                <Gift className="h-4 w-4" />
                <span>Create VIP Campaign</span>
              </Button>
            </div>
          </PageHeader>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total VIP Customers" 
            value={mockVipUsers.length} 
            description="High-value customers"
            icon={Star}
            trend={{ value: 15, positive: true }}
          />
          <StatCard 
            title="VIP Revenue" 
            value="$48,275.83" 
            description="Monthly revenue from VIPs"
            icon={CreditCard}
            trend={{ value: 12, positive: true }}
          />
          <StatCard 
            title="Avg. VIP Order Value" 
            value="$185.42" 
            description="92% higher than regular users"
            icon={ShoppingCart}
            trend={{ value: 8, positive: true }}
          />
          <StatCard 
            title="Retention Rate" 
            value="94%" 
            description="VIP customer retention"
            icon={Calendar}
            trend={{ value: 3, positive: true }}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>VIP Distribution</CardTitle>
              <CardDescription>By loyalty tier</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-500 text-white">Gold</Badge>
                    <span className="text-sm">Gold Tier</span>
                  </div>
                  <span className="font-medium">40%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-400 text-white">Diamond</Badge>
                    <span className="text-sm">Diamond Tier</span>
                  </div>
                  <span className="font-medium">35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-slate-400 text-white">Platinum</Badge>
                    <span className="text-sm">Platinum Tier</span>
                  </div>
                  <span className="font-medium">25%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Birthdays</CardTitle>
              <CardDescription>VIP customers to celebrate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockVipUsers
                  .filter(user => ["May", "June"].includes(user.birthdayMonth))
                  .slice(0, 3)
                  .map((user, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.birthdayMonth}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Gift className="h-3 w-3 mr-1" />
                        Send Gift
                      </Button>
                    </div>
                  ))
                }
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-sm">View All Birthdays</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Purchases</CardTitle>
              <CardDescription>Latest VIP transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockVipUsers
                  .sort((a, b) => new Date(b.lastPurchase).getTime() - new Date(a.lastPurchase).getTime())
                  .slice(0, 3)
                  .map((user, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.lastPurchase}</p>
                      </div>
                      <Badge>{user.preferredCategory}</Badge>
                    </div>
                  ))
                }
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-sm">View All Purchases</Button>
            </CardFooter>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>VIP Customer List</CardTitle>
                  <CardDescription>
                    Manage your highest-value customer accounts
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Export List</Button>
                  <Button>Add VIP Customer</Button>
                </div>
              </div>
              
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search VIP customers..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Customer</TableHead>
                    <TableHead>Loyalty Tier</TableHead>
                    <TableHead className="hidden md:table-cell">Total Spend</TableHead>
                    <TableHead className="hidden md:table-cell">Orders</TableHead>
                    <TableHead className="hidden lg:table-cell">Avg. Order</TableHead>
                    <TableHead className="hidden lg:table-cell">Category</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={loyaltyColor(user.loyaltyLevel)}>
                          <Trophy className="h-3 w-3 mr-1" />
                          {user.loyaltyLevel}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-medium">{user.totalSpend}</TableCell>
                      <TableCell className="hidden md:table-cell">{user.orders}</TableCell>
                      <TableCell className="hidden lg:table-cell">{user.averageOrderValue}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge variant="outline">{user.preferredCategory}</Badge>
                      </TableCell>
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
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="h-4 w-4 mr-2" />
                              Call customer
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Gift className="h-4 w-4 mr-2" />
                              Send gift
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit VIP status</DropdownMenuItem>
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
      </div>
    </DashboardLayout>
  );
};

export default VipUsers;
