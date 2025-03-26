
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Mail, Clock } from "lucide-react";

const ContactMethods = () => {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>Contact Methods</CardTitle>
        <CardDescription>Choose your preferred way to reach our support team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:bg-accent transition-all">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Phone className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Phone Support</h3>
            <p className="text-muted-foreground mb-4">
              Speak directly with our support agents for urgent matters
            </p>
            <p className="font-medium text-lg">+91 1800-123-4567</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
              <Clock className="h-3 w-3" />
              <span>Available 24/7</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:bg-accent transition-all">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Live Chat</h3>
            <p className="text-muted-foreground mb-4">
              Chat with our support team for real-time assistance
            </p>
            <Button className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Start Chat
            </Button>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
              <Clock className="h-3 w-3" />
              <span>9 AM - 10 PM IST</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:bg-accent transition-all">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Email Support</h3>
            <p className="text-muted-foreground mb-4">
              Send us an email for non-urgent inquiries
            </p>
            <p className="font-medium">support@whizcart.com</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
              <Clock className="h-3 w-3" />
              <span>Replies within 24 hours</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactMethods;
