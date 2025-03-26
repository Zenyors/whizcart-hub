
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Phone, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { getStatusColor, getPriorityColor } from "@/utils/supportUtils";

interface TicketDetailsProps {
  selectedTicket: any | null;
  handleStatusChange: (newStatus: string) => void;
  handleAssignTicket: (agent: string | null) => void;
  handleCallCustomer: () => void;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({
  selectedTicket,
  handleStatusChange,
  handleAssignTicket,
  handleCallCustomer,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [replyText, setReplyText] = useState("");

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;
    
    toast({
      title: "Reply Sent",
      description: "Your response has been sent to the customer.",
    });
    
    setReplyText("");
  };

  if (!selectedTicket) {
    return (
      <Card className="lg:col-span-2">
        <div className="flex h-full flex-col items-center justify-center py-16 px-4 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No Ticket Selected</h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            Select a ticket from the list on the left to view its details and respond to the customer.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-2">
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
                <DropdownMenuItem onClick={() => handleStatusChange("Open")}>Open</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("In Progress")}>In Progress</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Resolved")}>Resolved</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Closed")}>Closed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Assign
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleAssignTicket("Sarah Johnson")}>Sarah Johnson</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAssignTicket("Michael Chen")}>Michael Chen</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAssignTicket("Emily Rodriguez")}>Emily Rodriguez</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAssignTicket(null)}>Unassigned</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button size="sm" onClick={handleCallCustomer}>
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
                {selectedTicket.customer.phone && (
                  <p className="text-xs text-muted-foreground">{selectedTicket.customer.phone}</p>
                )}
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
              {selectedTicket.messages.map((message: any, index: number) => (
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
    </Card>
  );
};

export default TicketDetails;
