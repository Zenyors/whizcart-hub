
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Search, 
  HelpCircle, 
  MessageSquare
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Component imports
import SupportHome from "@/components/support/SupportHome";
import KnowledgeBase from "@/components/support/KnowledgeBase";
import TicketList from "@/components/support/TicketList";
import CreateTicket from "@/components/support/CreateTicket";

// Type imports
import { SupportTicket, FAQ } from "@/types/support";

const CustomerSupport = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("support-home");
  
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="support-home">Support Home</TabsTrigger>
                <TabsTrigger value="knowledge-base">Knowledge Base</TabsTrigger>
                <TabsTrigger value="tickets">My Tickets</TabsTrigger>
                <TabsTrigger value="create-ticket">Create Ticket</TabsTrigger>
              </TabsList>
              
              <TabsContent value="support-home">
                <SupportHome faqs={mockFAQs} onSetActiveTab={setActiveTab} />
              </TabsContent>
              
              <TabsContent value="knowledge-base">
                <KnowledgeBase faqs={mockFAQs} onSetActiveTab={setActiveTab} />
              </TabsContent>
              
              <TabsContent value="tickets">
                <TicketList tickets={mockTickets} onSetActiveTab={setActiveTab} />
              </TabsContent>
              
              <TabsContent value="create-ticket">
                <CreateTicket onSetActiveTab={setActiveTab} onCreateTicket={handleCreateTicket} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default CustomerSupport;
