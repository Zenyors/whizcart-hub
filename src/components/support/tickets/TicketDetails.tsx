
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, PhoneCall, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getStatusColor, getPriorityColor } from "@/utils/supportUtils";

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

interface TicketDetailsProps {
  selectedTicket: Ticket | null;
  handleStatusChange: (status: string) => void;
  handleAssignTicket: (agent: string | null) => void;
  handleCallCustomer: () => void;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({
  selectedTicket,
  handleStatusChange,
  handleAssignTicket,
  handleCallCustomer,
}) => {
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = () => {
    // This would be implemented with actual functionality
    // but for now, it's just clearing the input
    setNewMessage("");
  };

  if (!selectedTicket) {
    return (
      <div className="lg:col-span-2">
        <Card className="h-full flex items-center justify-center">
          <div className="text-center p-6">
            <h3 className="text-lg font-medium">No ticket selected</h3>
            <p className="text-muted-foreground">Select a ticket from the list to view details</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between px-6 py-4 border-b">
          <CardTitle className="text-xl">{selectedTicket.subject}</CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={handleCallCustomer}
            >
              <PhoneCall className="h-4 w-4" />
              <span>Call</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => window.location.href = `mailto:${selectedTicket.customer.email}`}
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <span>Status: {selectedTicket.status}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleStatusChange("Open")}>
                  Open
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("In Progress")}>
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Resolved")}>
                  Resolved
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Closed")}>
                  Closed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-3 h-full">
            <div className="col-span-2 border-r">
              <div className="px-6 py-4">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedTicket.customer.avatarUrl} />
                    <AvatarFallback>{selectedTicket.customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedTicket.customer.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedTicket.customer.email}</div>
                    {selectedTicket.customer.phone && (
                      <div className="text-sm text-muted-foreground">{selectedTicket.customer.phone}</div>
                    )}
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <div className="text-sm">{selectedTicket.description}</div>
                </div>
              </div>
              <Separator />
              <ScrollArea className="h-[250px] px-6 py-4">
                {selectedTicket.messages.map((message, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <div className="font-medium">{message.sender}</div>
                      <div className="text-xs text-muted-foreground">{message.timestamp}</div>
                    </div>
                    <div className="bg-secondary p-3 rounded-md">
                      <div className="text-sm">{message.text}</div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <div className="p-4 border-t">
                <Textarea
                  placeholder="Type your message here..."
                  className="mb-2"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button onClick={handleSendMessage}>Send Message</Button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Ticket Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">ID</span>
                      <span className="text-sm font-medium">{selectedTicket.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge className={getStatusColor(selectedTicket.status)}>
                        {selectedTicket.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Priority</span>
                      <Badge variant="outline" className={getPriorityColor(selectedTicket.priority)}>
                        {selectedTicket.priority}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Category</span>
                      <span className="text-sm">{selectedTicket.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Created</span>
                      <span className="text-sm">{selectedTicket.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Updated</span>
                      <span className="text-sm">{selectedTicket.updatedAt}</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium mb-1">Assigned Agent</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current Agent</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          {selectedTicket.assignedTo || "Unassigned"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAssignTicket("Ravi Kumar")}>
                          Ravi Kumar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAssignTicket("Priya Sharma")}>
                          Priya Sharma
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAssignTicket("Amit Patel")}>
                          Amit Patel
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAssignTicket(null)}>
                          Unassign
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketDetails;
