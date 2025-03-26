
import React from "react";
import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getStatusColor, getPriorityColor } from "@/utils/supportUtils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Ticket {
  id: string;
  customer: {
    name: string;
    email: string;
    id: string;
    avatarUrl: string;
    phone?: string;
  };
  subject: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: string | null;
  messages: {
    sender: string;
    text: string;
    timestamp: string;
  }[];
}

interface TicketListSidebarProps {
  tickets: Ticket[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTicket: Ticket | null;
  handleSelectTicket: (ticket: Ticket) => void;
  setSelectedTab: (tab: string) => void;
  setIsNewTicketDialogOpen?: (isOpen: boolean) => void;
}

const TicketListSidebar: React.FC<TicketListSidebarProps> = ({
  tickets,
  searchQuery,
  setSearchQuery,
  selectedTicket,
  handleSelectTicket,
  setSelectedTab,
  setIsNewTicketDialogOpen,
}) => {
  return (
    <div className="lg:col-span-1">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between px-4 py-3 space-y-0">
          <CardTitle className="text-lg">Support Tickets</CardTitle>
          {setIsNewTicketDialogOpen && (
            <Button 
              variant="ghost" 
              className="h-8 w-8 p-0" 
              onClick={() => setIsNewTicketDialogOpen(true)}
            >
              <PlusCircle className="h-5 w-5" />
              <span className="sr-only">New Ticket</span>
            </Button>
          )}
        </CardHeader>
        <div className="px-4 py-2">
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
        </div>
        <div className="px-2 py-2">
          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="urgent">Urgent</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CardContent className="px-2 py-2">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-2">
              {tickets.length === 0 ? (
                <div className="text-center p-4 text-muted-foreground">
                  No tickets found
                </div>
              ) : (
                tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`p-3 rounded-md cursor-pointer transition-all border ${
                      selectedTicket?.id === ticket.id
                        ? "border-primary bg-muted"
                        : "border-border hover:border-input"
                    }`}
                    onClick={() => handleSelectTicket(ticket)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{ticket.id}</Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                    <div className="mb-2">
                      <div className="text-sm font-medium line-clamp-1">{ticket.subject}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {ticket.customer.name} · {ticket.createdAt}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {ticket.assignedTo || "Unassigned"}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketListSidebar;
