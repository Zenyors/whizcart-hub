
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Filter, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStatusColor, getPriorityColor } from "@/utils/supportUtils";

interface TicketListSidebarProps {
  tickets: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTicket: any | null;
  handleSelectTicket: (ticket: any) => void;
  setSelectedTab: (tab: string) => void;
}

const TicketListSidebar: React.FC<TicketListSidebarProps> = ({
  tickets,
  searchQuery,
  setSearchQuery,
  selectedTicket,
  handleSelectTicket,
  setSelectedTab,
}) => {
  return (
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
            {tickets.map((ticket) => (
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
  );
};

export default TicketListSidebar;
