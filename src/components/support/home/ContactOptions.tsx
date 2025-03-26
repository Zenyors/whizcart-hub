
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Mail } from "lucide-react";

const ContactOptions = () => {
  return (
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
  );
};

export default ContactOptions;
