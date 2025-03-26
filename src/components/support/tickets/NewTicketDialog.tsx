
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface NewTicketDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleCreateNewTicket: (e: React.FormEvent) => void;
}

const NewTicketDialog: React.FC<NewTicketDialogProps> = ({ 
  isOpen, 
  setIsOpen, 
  handleCreateNewTicket 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          <span>New Ticket</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Support Ticket</DialogTitle>
          <DialogDescription>
            Create a new ticket for customer support issues
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateNewTicket}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerName" className="text-right">
                Customer Name
              </Label>
              <Input
                id="customerName"
                name="customerName"
                placeholder="Enter customer name"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerEmail" className="text-right">
                Email
              </Label>
              <Input
                id="customerEmail"
                name="customerEmail"
                type="email"
                placeholder="customer@example.com"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerPhone" className="text-right">
                Phone
              </Label>
              <Input
                id="customerPhone"
                name="customerPhone"
                type="tel"
                placeholder="Optional phone number"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Ticket subject"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <select 
                id="category"
                name="category"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                required
              >
                <option value="">Select category</option>
                <option value="Order Issue">Order Issue</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Return Request">Return Request</option>
                <option value="Account Problem">Account Problem</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Shipping Question">Shipping Question</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <select 
                id="priority"
                name="priority"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Detailed description of the issue"
                className="col-span-3"
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Ticket</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTicketDialog;
