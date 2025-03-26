
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SupportTicket } from "@/types/support";

interface TicketListProps {
  tickets: SupportTicket[];
  onSetActiveTab: (tab: string) => void;
}

const TicketList = ({ tickets, onSetActiveTab }: TicketListProps) => {
  return (
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
                {tickets.map((ticket) => (
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
        <Button variant="outline" onClick={() => onSetActiveTab("support-home")}>
          Back to Support Home
        </Button>
        <Button onClick={() => onSetActiveTab("create-ticket")}>
          Create New Ticket
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TicketList;
