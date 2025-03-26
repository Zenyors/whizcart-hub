
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Store, Truck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [contactCategory, setContactCategory] = React.useState("general");
  
  const handleContactSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    toast({
      title: "Message Sent",
      description: "We have received your message and will respond shortly.",
    });
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Send us a Message</CardTitle>
        <CardDescription>Fill out the form and we'll get back to you</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user-type">I am a</Label>
            <RadioGroup 
              defaultValue="customer" 
              className="flex space-x-2"
              onValueChange={(value) => console.log(value)}
            >
              <div className="flex items-center space-x-2 border rounded-md px-4 py-2">
                <RadioGroupItem value="customer" id="customer" />
                <Label 
                  htmlFor="customer" 
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <User className="h-4 w-4" />
                  Customer
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border rounded-md px-4 py-2">
                <RadioGroupItem value="vendor" id="vendor" />
                <Label 
                  htmlFor="vendor" 
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Store className="h-4 w-4" />
                  Vendor
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border rounded-md px-4 py-2">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label 
                  htmlFor="delivery" 
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Truck className="h-4 w-4" />
                  Delivery Partner
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email address" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact-category">Category</Label>
            <select 
              id="contact-category"
              value={contactCategory}
              onChange={(e) => setContactCategory(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="general">General Inquiry</option>
              <option value="order">Order Issue</option>
              <option value="payment">Payment Problem</option>
              <option value="delivery">Delivery Issue</option>
              <option value="product">Product Question</option>
              <option value="account">Account Help</option>
              <option value="technical">Technical Support</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Brief description of your inquiry" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Please provide details about your inquiry"
              rows={5}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments (Optional)</Label>
            <Input
              id="attachments"
              type="file"
              multiple
            />
            <p className="text-xs text-muted-foreground mt-1">
              Upload relevant files or screenshots. Max 3 files, 5MB each.
            </p>
          </div>
          
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
