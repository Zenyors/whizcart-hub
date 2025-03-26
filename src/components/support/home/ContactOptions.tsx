
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactOptions = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const { toast } = useToast();

  const handleStartChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setChatMessage("");
  };

  const handleSendChat = () => {
    if (chatMessage.trim()) {
      toast({
        title: "Chat message sent",
        description: "Our support team will respond shortly.",
      });
      handleCloseChat();
    }
  };

  const handleCall = () => {
    // This would typically use the tel: protocol in a real app
    toast({
      title: "Calling support",
      description: "Connecting to +91 1800-123-4567...",
    });
  };

  const handleEmailClick = () => {
    // This would typically use the mailto: protocol in a real app
    toast({
      title: "Email client opened",
      description: "Composing email to support@whizcart.com",
    });
    window.location.href = "mailto:support@whizcart.com";
  };

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
            <Button variant="outline" size="sm" onClick={handleCall}>
              +91 1800-123-4567
            </Button>
          </div>
          
          <div className="flex flex-col items-center text-center p-4 border rounded-lg hover:bg-accent transition-all">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-3">Available 9 AM - 10 PM IST</p>
            <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleStartChat}>Start Chat</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Live Chat Support</DialogTitle>
                  <DialogDescription>
                    Describe your issue and a support agent will assist you shortly.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="chat-message">Your message</Label>
                    <Textarea
                      id="chat-message"
                      placeholder="How can we help you today?"
                      rows={5}
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseChat}>Cancel</Button>
                  <Button onClick={handleSendChat}>Send</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex flex-col items-center text-center p-4 border rounded-lg hover:bg-accent transition-all">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-3">Replies within 24 hours</p>
            <Button variant="outline" size="sm" onClick={handleEmailClick}>
              support@whizcart.com
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactOptions;
