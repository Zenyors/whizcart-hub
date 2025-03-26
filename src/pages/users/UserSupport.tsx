import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Search, 
  MoreHorizontal, 
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  User,
  Mail,
  Phone,
  Filter
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";

// Mock support tickets
const mockTickets = Array.from({ length: 20 }).map((_, i) => {
  const statusOptions = ["Open", "In Progress", "Resolved", "Closed"];
  const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
  const priorityOptions = ["Low", "Medium", "High", "Urgent"];
  const priority = priorityOptions[Math.floor(Math.random() * priorityOptions.length)];
  const categoryOptions = ["Order Issue", "Product Inquiry", "Return Request", "Account Problem", "Payment Issue", "Shipping Question"];
  const category = categoryOptions[Math.floor(Math.random() * categoryOptions.length)];
  
  return {
    id: `TKT-${10000 + i}`,
    customer: {
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      id: `USR-${1000 + i}`,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`,
    },
    subject: category,
    description: `I need help with my ${category.toLowerCase()}. Please assist as soon as possible.`,
    status,
    priority,
    category,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    updatedAt: new Date(Date.now() - Math.random() * 5000000000).toLocaleDateString(),
    assignedTo: i % 3 === 0 ? "Sarah Johnson" : i % 4 === 0 ? "Michael Chen" : i % 5 === 0 ? "Emily Rodriguez" : null,
    messages: [
      {
        sender: "Customer",
        text: `I need help with my ${category.toLowerCase()}. Please assist as soon as possible.`,
        timestamp: new Date(Date.now() - Math.random() * 10000000000).toLocaleString(),
      },
      ...(i % 2 === 0 ? [{
        sender: "Support",
        text: "Thank you for contacting us. We're looking into this issue and will get back to you shortly.",
        timestamp: new Date(Date.now() - Math.random() * 5000000000).toLocaleString(),
      }] : []),
      ...(i % 4 === 0 ? [{
        sender: "Customer",
        text: "Any updates on this? I'm still having the same issue.",
        timestamp: new Date(Date.now() - Math.random() * 1000000000).toLocaleString(),
      }] : []),
    ],
  };
});

const UserSupport = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<(typeof mockTickets)[0] | null>(null);
  const [replyText, setReplyText] = useState("");

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = 
      ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ticket.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "open") return matchesSearch && ticket.status === "Open";
    if (selectedTab === "in-progress") return matchesSearch && ticket.status === "In Progress";
    if (selectedTab === "resolved") return matchesSearch && (ticket.status === "Resolved" || ticket.status === "Closed");
    if (selectedTab === "urgent") return matchesSearch && ticket.priority === "Urgent";
    
    return matchesSearch;
  });

  const handleSelectTicket = (ticket: (typeof mockTickets)[0]) => {
    setSelectedTicket(ticket);
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;
    
    toast({
      title: "Reply Sent",
      description: "Your response has been sent to the customer.",
    });
    
    setReplyText("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-500 text-white";
      case "In Progress":
        return "bg-amber-500 text-white";
      case "Resolved":
        return "bg-green-500 text-white";
      case "Closed":
        return "bg-gray-500 text-white";
      default:
        return "";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-500 text-white";
      case "High":
        return "bg-orange-500 text-white";
      case "Medium":
        return "bg-amber-500 text-white";
      case "Low":
        return "bg-blue-500 text-white";
      default:
        return "";
    }
  };

  const ticketStats = {
    open: mockTickets.filter(t => t.status === "Open").length,
    inProgress: mockTickets.filter(t => t.status === "In Progress").length,
    resolved: mockTickets.filter(t => t.status === "Resolved").length,
    closed: mockTickets.filter(t => t.status === "Closed").length,
    urgent: mockTickets.filter(t => t.priority === "Urgent").length,
    avgResponseTime: "3.2 hours",
    firstResolutionTime: "8.5 hours",
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
            title="User Support"
            description="Manage customer support tickets and inquiries"
          >
            <Button className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>New Ticket</span>
            </Button>
          </PageHeader>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Open Tickets" 
            value={ticketStats.open}
            description="Waiting for response"
            icon={AlertCircle}
            trend={{ value: 3, positive: false }}
          />
          <StatCard 
            title="In Progress" 
            value={ticketStats.inProgress}
            description="Currently being handled"
            icon={Clock}
          />
          <StatCard 
            title="Resolved" 
            value={ticketStats.resolved + ticketStats.closed}
            description="Successfully closed tickets"
            icon={CheckCircle}
            trend={{ value: 12, positive: true }}
          />
          <StatCard 
            title="Avg. Response Time" 
            value={ticketStats.avgResponseTime}
            description="First response to customers"
            icon={Clock}
            trend={{ value: 8, positive: true }}
          />
        </div>
        
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <CardTitle>Tickets</CardTitle>
                  <Button size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tickets..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Tabs defaultValue="all" onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="in-progress">Active</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                    <TabsTrigger value="urgent">Urgent</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-2">
                  {filteredTickets.map((ticket) => (
                    <div 
                      key={ticket.id} 
                      className={`rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors ${selectedTicket?.id === ticket.id ? 'bg-muted' : ''}`}
                      onClick={() => handleSelectTicket(ticket)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{ticket.id}</Badge>
                        <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                      </div>
                      
                      <h4 className="font-medium text-sm mb-1">{ticket.subject}</h4>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={ticket.customer.avatarUrl} alt={ticket.customer.name} />
                          <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{ticket.customer.name}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{ticket.createdAt}</span>
                        <Badge className={getPriorityColor(ticket.priority)} variant="outline">
                          {ticket.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            {selectedTicket ? (
              <>
                <CardHeader>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{selectedTicket.subject}</CardTitle>
                        <Badge className={getStatusColor(selectedTicket.status)}>
                          {selectedTicket.status}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        {selectedTicket.id} • {selectedTicket.createdAt}
                      </CardDescription>
                    </div>
                    
                    <div className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            Set Status
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Open</DropdownMenuItem>
                          <DropdownMenuItem>In Progress</DropdownMenuItem>
                          <DropdownMenuItem>Resolved</DropdownMenuItem>
                          <DropdownMenuItem>Closed</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            Assign
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Sarah Johnson</DropdownMenuItem>
                          <DropdownMenuItem>Michael Chen</DropdownMenuItem>
                          <DropdownMenuItem>Emily Rodriguez</DropdownMenuItem>
                          <DropdownMenuItem>Unassigned</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <Button size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-6 flex gap-4 items-start">
                    <Avatar>
                      <AvatarImage src={selectedTicket.customer.avatarUrl} alt={selectedTicket.customer.name} />
                      <AvatarFallback>{selectedTicket.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <div>
                          <h3 className="text-sm font-medium">{selectedTicket.customer.name}</h3>
                          <p className="text-xs text-muted-foreground">{selectedTicket.customer.email}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/users/${selectedTicket.customer.id}`)}>
                          <User className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Category</p>
                          <p className="text-sm">{selectedTicket.category}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Priority</p>
                          <Badge className={getPriorityColor(selectedTicket.priority)}>
                            {selectedTicket.priority}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Assigned To</p>
                          <p className="text-sm">{selectedTicket.assignedTo || "Unassigned"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-1">
                    <ScrollArea className="h-[300px] py-1">
                      <div className="space-y-4 p-3">
                        {selectedTicket.messages.map((message, index) => (
                          <div 
                            key={index} 
                            className={`flex ${message.sender === 'Customer' ? 'justify-start' : 'justify-end'}`}
                          >
                            <div 
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.sender === 'Customer' 
                                  ? 'bg-muted' 
                                  : 'bg-primary text-primary-foreground'
                              }`}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-xs">{message.sender}</span>
                                <span className="text-xs opacity-70">{message.timestamp}</span>
                              </div>
                              <p className="text-sm">{message.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Textarea 
                      placeholder="Type your reply here..." 
                      className="min-h-[100px]"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="flex justify-between">
                      <Button variant="outline">
                        Add Template
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline">Save Draft</Button>
                        <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center py-16 px-4 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Ticket Selected</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Select a ticket from the list on the left to view its details and respond to the customer.
                </p>
              </div>
            )}
          </Card>
        </div>
        
        <div className="grid gap-6 mt-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Support Performance</CardTitle>
              <CardDescription>Key metrics and SLA compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">First Response Time</span>
                    <span className="text-sm font-medium">3.2 hours</span>
                  </div>
                  <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Target: 4 hours</span>
                    <span>85% SLA compliance</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Resolution Time</span>
                    <span className="text-sm font-medium">8.5 hours</span>
                  </div>
                  <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Target: 8 hours</span>
                    <span>72% SLA compliance</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Customer Satisfaction</span>
                    <span className="text-sm font-medium">4.6 / 5.0</span>
                  </div>
                  <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Target: 4.5 / 5.0</span>
                    <span>92% positive ratings</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Common Issues</CardTitle>
              <CardDescription>Frequently reported customer problems</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue</TableHead>
                    <TableHead>Tickets</TableHead>
                    <TableHead className="text-right">% of Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Shipping Delays</TableCell>
                    <TableCell>32</TableCell>
                    <TableCell className="text-right">24%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Payment Problems</TableCell>
                    <TableCell>28</TableCell>
                    <TableCell className="text-right">21%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Product Quality</TableCell>
                    <TableCell>21</TableCell>
                    <TableCell className="text-right">16%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Return Process</TableCell>
                    <TableCell>18</TableCell>
                    <TableCell className="text-right">14%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Account Access</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell className="text-right">11%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline" className="w-full">Generate Knowledge Base Articles</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserSupport;
