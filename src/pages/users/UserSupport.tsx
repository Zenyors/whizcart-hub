
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";

// Import new components
import TicketListSidebar from "@/components/support/tickets/TicketListSidebar";
import TicketDetails from "@/components/support/tickets/TicketDetails";
import NewTicketDialog from "@/components/support/tickets/NewTicketDialog";
import SupportStats from "@/components/support/tickets/SupportStats";
import SupportPerformanceCard from "@/components/support/tickets/SupportPerformanceCard";
import CommonIssuesCard from "@/components/support/tickets/CommonIssuesCard";
import { generateMockTickets, calculateTicketStats, Ticket } from "@/components/support/tickets/mockData";

const UserSupport = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] = useState(false);
  const [updatedTickets, setUpdatedTickets] = useState(generateMockTickets());

  const ticketStats = calculateTicketStats(updatedTickets);

  const filteredTickets = updatedTickets.filter(ticket => {
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

  const handleSelectTicket = (ticket: any) => {
    setSelectedTicket(ticket);
  };

  const handleStatusChange = (newStatus: string) => {
    if (!selectedTicket) return;

    const updatedTicketsList = updatedTickets.map(ticket => 
      ticket.id === selectedTicket.id ? { ...ticket, status: newStatus as any } : ticket
    );
    
    setUpdatedTickets(updatedTicketsList);
    setSelectedTicket(prev => prev ? { ...prev, status: newStatus as any } : null);
    
    toast({
      title: "Status Updated",
      description: `Ticket status changed to ${newStatus}`,
    });
  };

  const handleAssignTicket = (agent: string | null) => {
    if (!selectedTicket) return;

    const updatedTicketsList = updatedTickets.map(ticket => 
      ticket.id === selectedTicket.id ? { ...ticket, assignedTo: agent } : ticket
    );
    
    setUpdatedTickets(updatedTicketsList);
    setSelectedTicket(prev => prev ? { ...prev, assignedTo: agent } : null);
    
    toast({
      title: "Agent Assigned",
      description: agent ? `Ticket assigned to ${agent}` : "Ticket unassigned",
    });
  };

  const handleCreateNewTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newTicket: Ticket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: {
        name: formData.get('customerName') as string,
        email: formData.get('customerEmail') as string,
        id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.get('customerName')}`,
        phone: formData.get('customerPhone') as string || undefined,
      },
      subject: formData.get('subject') as string,
      description: formData.get('description') as string,
      status: "Open", // Using the literal string type
      priority: formData.get('priority') as "Low" | "Medium" | "High" | "Urgent",
      category: formData.get('category') as string,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
      assignedTo: null,
      messages: [
        {
          sender: "Customer",
          text: formData.get('description') as string,
          timestamp: new Date().toLocaleString(),
        }
      ],
    };
    
    setUpdatedTickets([newTicket, ...updatedTickets]);
    setIsNewTicketDialogOpen(false);
    
    toast({
      title: "Ticket Created",
      description: "New support ticket has been created successfully.",
    });
  };

  const handleCallCustomer = () => {
    if (selectedTicket?.customer?.phone) {
      window.location.href = `tel:${selectedTicket.customer.phone}`;
    } else {
      toast({
        title: "No Phone Number",
        description: "Customer phone number is not available",
      });
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
            title="User Support"
            description="Manage customer support tickets and inquiries"
          >
            <NewTicketDialog 
              isOpen={isNewTicketDialogOpen}
              setIsOpen={setIsNewTicketDialogOpen}
              handleCreateNewTicket={handleCreateNewTicket}
            />
          </PageHeader>
        </div>
        
        <SupportStats stats={ticketStats} />
        
        <div className="grid gap-6 lg:grid-cols-3">
          <TicketListSidebar 
            tickets={filteredTickets}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTicket={selectedTicket}
            handleSelectTicket={handleSelectTicket}
            setSelectedTab={setSelectedTab}
          />
          
          <TicketDetails 
            selectedTicket={selectedTicket}
            handleStatusChange={handleStatusChange}
            handleAssignTicket={handleAssignTicket}
            handleCallCustomer={handleCallCustomer}
          />
        </div>
        
        <div className="grid gap-6 mt-8 md:grid-cols-2">
          <SupportPerformanceCard />
          <CommonIssuesCard />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserSupport;
