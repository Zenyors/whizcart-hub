import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Search, 
  Phone, 
  MessageSquare, 
  Mail, 
  HelpCircle, 
  FileText, 
  User, 
  Store, 
  Truck, 
  Clock, 
  ChevronRight, 
  ArrowRight, 
  MessageCircle, 
  IndianRupee
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

// Define types for ticket and FAQ
interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  type: "Customer" | "Vendor" | "Delivery";
  priority: "Low" | "Medium" | "High" | "Urgent";
  created: string;
  assignedTo?: string;
  lastUpdated: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Account" | "Orders" | "Payments" | "Delivery" | "Returns" | "Vendors";
}

const CustomerSupport = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("support-home");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Mock data for tickets
  const mockTickets: SupportTicket[] = [
    {
      id: "T-1001",
      subject: "Order not delivered",
      description: "My order #ORD-5678 was supposed to be delivered yesterday but I haven't received it yet.",
      status: "Open",
      type: "Customer",
      priority: "High",
      created: "2023-07-15T10:30:00",
      assignedTo: "Ravi Kumar",
      lastUpdated: "2023-07-15T14:20:00"
    },
    {
      id: "T-1002",
      subject: "Payment not received",
      description: "I haven't received payment for my last month's orders.",
      status: "In Progress",
      type: "Vendor",
      priority: "Urgent",
      created: "2023-07-14T09:15:00",
      assignedTo: "Priya Sharma",
      lastUpdated: "2023-07-15T16:45:00"
    },
    {
      id: "T-1003",
      subject: "App crash during delivery",
      description: "The delivery app keeps crashing when I try to mark orders as delivered.",
      status: "Open",
      type: "Delivery",
      priority: "Medium",
      created: "2023-07-14T11:20:00",
      lastUpdated: "2023-07-14T11:20:00"
    }
  ];
  
  // Mock FAQs data
  const mockFAQs: FAQ[] = [
    {
      id: "FAQ-1",
      question: "How do I track my order?",
      answer: "You can track your order by going to the 'My Orders' section and clicking on the order number. There you'll see real-time updates about your order status.",
      category: "Orders"
    },
    {
      id: "FAQ-2",
      question: "How do I register as a vendor?",
      answer: "To register as a vendor, click on the 'Become a Seller' link on the homepage and fill out the application form. Our team will review your application and get back to you within 48 hours.",
      category: "Vendors"
    },
    {
      id: "FAQ-3",
      question: "How are delivery fees calculated?",
      answer: "Delivery fees are calculated based on distance, order value, and delivery time. Standard delivery is free for orders above ₹499. Express delivery has additional charges starting from ₹50.",
      category: "Delivery"
    },
    {
      id: "FAQ-4",
      question: "What payment methods are accepted?",
      answer: "We accept UPI, credit cards, debit cards, net banking, and cash on delivery. We also support wallet payments through Paytm, PhonePe, and Amazon Pay.",
      category: "Payments"
    },
    {
      id: "FAQ-5",
      question: "How do I initiate a return?",
      answer: "To initiate a return, go to your order details page and click on 'Return Item'. Select a reason for return and follow the instructions. You'll receive a return confirmation and shipping label via email.",
      category: "Returns"
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFAQs = searchQuery 
    ? mockFAQs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockFAQs;
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleCreateTicket = () => {
    toast({
      title: "Support Ticket Created",
      description: "Your ticket has been submitted successfully. We'll get back to you soon.",
    });
  };
  
  return (
    <>
      <Helmet>
        <title>Customer Support | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full">
          <PageHeader
            title="Customer Support Center"
            description="Get help, find answers, and manage support tickets"
          >
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setActiveTab("knowledge-base")}
            >
              <HelpCircle className="h-4 w-4" />
              Knowledge Base
            </Button>
            <Button 
              className="gap-2"
              onClick={() => setActiveTab("create-ticket")}
            >
              <MessageSquare className="h-4 w-4" />
              Create Ticket
            </Button>
          </PageHeader>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Main Support Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="support-home">Support Home</TabsTrigger>
                <TabsTrigger value="knowledge-base">Knowledge Base</TabsTrigger>
                <TabsTrigger value="tickets">My Tickets</TabsTrigger>
                <TabsTrigger value="create-ticket">Create Ticket</TabsTrigger>
              </TabsList>
              
              {/* Support Home Tab */}
              <TabsContent value="support-home" className="space-y-6">
                {/* Support Options Cards */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Customer Support</CardTitle>
                      <CardDescription>Help for shoppers and buyers</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4 mt-4">
                        <div className="flex items-start gap-3">
                          <User className="h-5 w-5 text-blue-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Account & Orders</h4>
                            <p className="text-sm text-muted-foreground">Manage your account, track orders</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <IndianRupee className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Payments & Refunds</h4>
                            <p className="text-sm text-muted-foreground">Payment issues, refund status</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Truck className="h-5 w-5 text-purple-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Delivery & Returns</h4>
                            <p className="text-sm text-muted-foreground">Track delivery, process returns</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full gap-1" onClick={() => setActiveTab("create-ticket")}>
                        Get Customer Help <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Vendor Support</CardTitle>
                      <CardDescription>Help for sellers and partners</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4 mt-4">
                        <div className="flex items-start gap-3">
                          <Store className="h-5 w-5 text-orange-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Seller Dashboard</h4>
                            <p className="text-sm text-muted-foreground">Manage listings, inventory</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <IndianRupee className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Payouts & Finances</h4>
                            <p className="text-sm text-muted-foreground">Payment schedules, invoicing</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Policies & Compliance</h4>
                            <p className="text-sm text-muted-foreground">Selling guidelines, regulations</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full gap-1" onClick={() => setActiveTab("create-ticket")}>
                        Get Vendor Help <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Delivery Partner Support</CardTitle>
                      <CardDescription>Help for delivery personnel</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4 mt-4">
                        <div className="flex items-start gap-3">
                          <Truck className="h-5 w-5 text-blue-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Delivery App</h4>
                            <p className="text-sm text-muted-foreground">App issues, order updates</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <IndianRupee className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Earnings & Incentives</h4>
                            <p className="text-sm text-muted-foreground">Payment issues, incentives</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-purple-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Scheduling & Availability</h4>
                            <p className="text-sm text-muted-foreground">Shifts, time off, zone changes</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full gap-1" onClick={() => setActiveTab("create-ticket")}>
                        Get Delivery Help <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* Contact Methods Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                    <CardDescription>Choose your preferred contact method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                      <div className="flex flex-col items-center text-center p-4 border rounded-lg hover:bg-accent transition-all">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium mb-1">Call Support</h3>
                        <p className="text-sm text-muted-foreground mb-3">24/7 for urgent matters</p>
                        <p className="font-medium">+91 1800-123-4567</p>
                      </div>
                      
                      <div className="flex flex-col items-center text-center p-4 border rounded-lg hover:bg-accent transition-all">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <MessageSquare className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium mb-1">Live Chat</h3>
                        <p className="text-sm text-muted-foreground mb-3">Available 9 AM - 10 PM IST</p>
                        <Button variant="outline" size="sm">Start Chat</Button>
                      </div>
                      
                      <div className="flex flex-col items-center text-center p-4 border rounded-lg hover:bg-accent transition-all">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium mb-1">Email Support</h3>
                        <p className="text-sm text-muted-foreground mb-3">Replies within 24 hours</p>
                        <p className="font-medium">support@whizcart.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Popular FAQs Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Quick answers to common questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {mockFAQs.slice(0, 3).map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full" 
                      onClick={() => setActiveTab("knowledge-base")}
                    >
                      View All FAQs
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Knowledge Base Tab */}
              <TabsContent value="knowledge-base">
                <Card>
                  <CardHeader>
                    <CardTitle>Knowledge Base</CardTitle>
                    <CardDescription>Search for answers or browse by category</CardDescription>
                    <div className="pt-4">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search knowledge base..."
                          className="pl-9"
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="grid grid-cols-7 mb-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="payments">Payments</TabsTrigger>
                        <TabsTrigger value="delivery">Delivery</TabsTrigger>
                        <TabsTrigger value="returns">Returns</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="all" className="space-y-4">
                        <Accordion type="single" collapsible className="w-full">
                          {filteredFAQs.map((faq) => (
                            <AccordionItem key={faq.id} value={faq.id}>
                              <AccordionTrigger className="text-left">
                                {faq.question}
                                <Badge variant="outline" className="ml-2">
                                  {faq.category}
                                </Badge>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="p-2">
                                  {faq.answer}
                                </div>
                                <div className="mt-4 flex justify-between items-center">
                                  <div className="text-sm text-muted-foreground">
                                    Was this helpful?
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Yes</Button>
                                    <Button variant="outline" size="sm">No</Button>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                        
                        {filteredFAQs.length === 0 && (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <HelpCircle className="h-12 w-12 text-muted-foreground/40 mb-4" />
                            <h3 className="font-medium text-lg mb-1">No results found</h3>
                            <p className="text-muted-foreground mb-4">
                              We couldn't find any articles matching your search
                            </p>
                            <Button onClick={() => setActiveTab("create-ticket")}>
                              Create a Support Ticket
                            </Button>
                          </div>
                        )}
                      </TabsContent>
                      
                      {/* Other categories would have similar content but filtered */}
                      <TabsContent value="general" className="space-y-4">
                        <Accordion type="single" collapsible className="w-full">
                          {filteredFAQs
                            .filter(faq => faq.category === "General")
                            .map((faq) => (
                              <AccordionItem key={faq.id} value={faq.id}>
                                <AccordionTrigger className="text-left">
                                  {faq.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                  {faq.answer}
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                        </Accordion>
                      </TabsContent>
                      
                      {/* Similar content for other tabs */}
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("support-home")}>
                      Back to Support
                    </Button>
                    <Button onClick={() => setActiveTab("create-ticket")}>
                      Can't find an answer? Create a ticket
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* My Tickets Tab */}
              <TabsContent value="tickets">
                <Card>
                  <CardHeader>
                    <CardTitle>My Support Tickets</CardTitle>
                    <CardDescription>
                      Manage and track your existing support requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                          <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Ticket ID
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Subject
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Status
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Type
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Priority
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Created
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="[&_tr:last-child]:border-0">
                            {mockTickets.map((ticket) => (
                              <tr key={ticket.id} className="border-b transition-colors hover:bg-muted/50">
                                <td className="p-4 align-middle font-medium">{ticket.id}</td>
                                <td className="p-4 align-middle">{ticket.subject}</td>
                                <td className="p-4 align-middle">
                                  <Badge 
                                    variant={
                                      ticket.status === "Open" ? "outline" :
                                      ticket.status === "In Progress" ? "default" :
                                      ticket.status === "Resolved" ? "success" : "secondary"
                                    }
                                    className={
                                      ticket.status === "Open" ? "border-orange-500 text-orange-500" : 
                                      ticket.status === "In Progress" ? "bg-blue-500" :
                                      ticket.status === "Resolved" ? "bg-green-500" : ""
                                    }
                                  >
                                    {ticket.status}
                                  </Badge>
                                </td>
                                <td className="p-4 align-middle">
                                  <Badge variant="outline">
                                    {ticket.type}
                                  </Badge>
                                </td>
                                <td className="p-4 align-middle">
                                  <Badge 
                                    variant="outline"
                                    className={
                                      ticket.priority === "Low" ? "border-blue-500 text-blue-500" : 
                                      ticket.priority === "Medium" ? "border-yellow-500 text-yellow-500" :
                                      ticket.priority === "High" ? "border-orange-500 text-orange-500" :
                                      "border-red-500 text-red-500"
                                    }
                                  >
                                    {ticket.priority}
                                  </Badge>
                                </td>
                                <td className="p-4 align-middle">
                                  {new Date(ticket.created).toLocaleDateString('en-IN')}
                                </td>
                                <td className="p-4 align-middle">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="sm">View</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[625px]">
                                      <DialogHeader>
                                        <DialogTitle>Ticket #{ticket.id}</DialogTitle>
                                        <DialogDescription>
                                          {ticket.subject}
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label className="text-right font-medium">Status</Label>
                                          <div className="col-span-3">
                                            <Badge 
                                              variant={
                                                ticket.status === "Open" ? "outline" :
                                                ticket.status === "In Progress" ? "default" :
                                                ticket.status === "Resolved" ? "success" : "secondary"
                                              }
                                              className={
                                                ticket.status === "Open" ? "border-orange-500 text-orange-500" : 
                                                ticket.status === "In Progress" ? "bg-blue-500" :
                                                ticket.status === "Resolved" ? "bg-green-500" : ""
                                              }
                                            >
                                              {ticket.status}
                                            </Badge>
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label className="text-right font-medium">Type</Label>
                                          <div className="col-span-3">
                                            <Badge variant="outline">{ticket.type}</Badge>
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label className="text-right font-medium">Priority</Label>
                                          <div className="col-span-3">
                                            <Badge 
                                              variant="outline"
                                              className={
                                                ticket.priority === "Low" ? "border-blue-500 text-blue-500" : 
                                                ticket.priority === "Medium" ? "border-yellow-500 text-yellow-500" :
                                                ticket.priority === "High" ? "border-orange-500 text-orange-500" :
                                                "border-red-500 text-red-500"
                                              }
                                            >
                                              {ticket.priority}
                                            </Badge>
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label className="text-right font-medium">Created</Label>
                                          <div className="col-span-3">
                                            {new Date(ticket.created).toLocaleString('en-IN')}
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label className="text-right font-medium">Assigned To</Label>
                                          <div className="col-span-3">
                                            {ticket.assignedTo || "Not assigned yet"}
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-4 items-start gap-4">
                                          <Label className="text-right font-medium">Description</Label>
                                          <div className="col-span-3 border rounded-md p-3 bg-secondary">
                                            {ticket.description}
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-4 items-start gap-4">
                                          <Label className="text-right font-medium">Add Response</Label>
                                          <Textarea className="col-span-3" placeholder="Add more details or respond to agent questions..." />
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button variant="outline">Close Ticket</Button>
                                        <Button>Send Response</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("support-home")}>
                      Back to Support Home
                    </Button>
                    <Button onClick={() => setActiveTab("create-ticket")}>
                      Create New Ticket
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Create Ticket Tab */}
              <TabsContent value="create-ticket">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Support Ticket</CardTitle>
                    <CardDescription>Submit a new support request</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-right">Ticket Type</FormLabel>
                          <div className="col-span-3">
                            <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                              <option value="Customer">Customer Support</option>
                              <option value="Vendor">Vendor Support</option>
                              <option value="Delivery">Delivery Partner Support</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-right">Subject</FormLabel>
                          <Input
                            className="col-span-3"
                            placeholder="Brief description of the issue"
                          />
                        </div>
                        
                        <div className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-right">Category</FormLabel>
                          <div className="col-span-3">
                            <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                              <option value="">Select a category</option>
                              <option value="account">Account Issues</option>
                              <option value="order">Order Problems</option>
                              <option value="payment">Payment & Refunds</option>
                              <option value="delivery">Delivery Issues</option>
                              <option value="product">Product Queries</option>
                              <option value="technical">Technical Support</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-right">Priority</FormLabel>
                          <div className="col-span-3">
                            <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                              <option value="Low">Low - No immediate impact</option>
                              <option value="Medium">Medium - Minor functionality affected</option>
                              <option value="High">High - Major functionality affected</option>
                              <option value="Urgent">Urgent - System unusable</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 items-start gap-4">
                          <FormLabel className="text-right">Description</FormLabel>
                          <Textarea
                            className="col-span-3"
                            placeholder="Detailed description of your issue"
                            rows={5}
                          />
                        </div>
                        
                        <div className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-right">Attachments</FormLabel>
                          <div className="col-span-3">
                            <Input
                              type="file"
                              multiple
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Upload screenshots or relevant files. Max 5 MB each (PNG, JPG, PDF).
                            </p>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("support-home")}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateTicket}>
                      Submit Ticket
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default CustomerSupport;
