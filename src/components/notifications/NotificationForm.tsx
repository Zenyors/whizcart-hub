
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Calendar, MessageSquare, Send, User, Store, Users, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const NotificationForm = () => {
  const { toast } = useToast();
  const [recipientType, setRecipientType] = useState("specific");
  const [scheduleSending, setScheduleSending] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [notificationType, setNotificationType] = useState("push");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    toast({
      title: "Notification Sent",
      description: scheduleSending 
        ? "Your notification has been scheduled successfully!" 
        : "Your notification has been sent successfully!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Notification</CardTitle>
        <CardDescription>Send push notifications, emails, or SMS to users</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-base">Notification Type</Label>
              <Tabs defaultValue="push" value={notificationType} onValueChange={setNotificationType} className="mt-2">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="push">
                    <Bell className="h-4 w-4 mr-2" />
                    Push
                  </TabsTrigger>
                  <TabsTrigger value="email">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="sms">
                    <Send className="h-4 w-4 mr-2" />
                    SMS
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="space-y-2">
              <Label className="text-base">Target App</Label>
              <RadioGroup defaultValue="customer" className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <RadioGroupItem value="customer" id="customer" className="peer sr-only" />
                  <Label
                    htmlFor="customer"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <User className="h-6 w-6 mb-2" />
                    <span>Customer App</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="vendor" id="vendor" className="peer sr-only" />
                  <Label
                    htmlFor="vendor"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Store className="h-6 w-6 mb-2" />
                    <span>Vendor App</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="rider" id="rider" className="peer sr-only" />
                  <Label
                    htmlFor="rider"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Send className="h-6 w-6 mb-2" />
                    <span>Rider App</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label className="text-base">Choose Template (Optional)</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template or create from scratch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="order-confirmation">Order Confirmation</SelectItem>
                  <SelectItem value="delivery-update">Delivery Update</SelectItem>
                  <SelectItem value="payment-received">Payment Received</SelectItem>
                  <SelectItem value="welcome">Welcome Message</SelectItem>
                  <SelectItem value="promotion">Promotional Offer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-base">Recipients</Label>
              <RadioGroup value={recipientType} onValueChange={setRecipientType} className="grid grid-cols-1 gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="specific" id="specific" />
                  <Label htmlFor="specific" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Specific Users
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="segment" id="segment" />
                  <Label htmlFor="segment" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    User Segment
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    All Users
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {recipientType === "specific" && (
              <div className="space-y-2">
                <Label htmlFor="user-ids">User IDs or Email Addresses</Label>
                <Textarea 
                  id="user-ids" 
                  placeholder="Enter user IDs or email addresses, one per line"
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  Enter user IDs or email addresses, one per line or separated by commas
                </p>
              </div>
            )}
            
            {recipientType === "segment" && (
              <div className="space-y-2">
                <Label htmlFor="segment">User Segment</Label>
                <Select defaultValue="active">
                  <SelectTrigger id="segment">
                    <SelectValue placeholder="Select a segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active Users (last 30 days)</SelectItem>
                    <SelectItem value="inactive">Inactive Users (30+ days)</SelectItem>
                    <SelectItem value="new">New Users (last 7 days)</SelectItem>
                    <SelectItem value="high-value">High Value Customers</SelectItem>
                    <SelectItem value="abandoned-cart">Abandoned Cart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Notification Title</Label>
                <Input id="title" placeholder="Enter notification title" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Enter your notification message"
                  className="min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground">
                  For push notifications, keep the message short and concise
                </p>
              </div>
              
              {notificationType === "push" && (
                <div className="space-y-2">
                  <Label htmlFor="deep-link">Deep Link URL (Optional)</Label>
                  <Input id="deep-link" placeholder="e.g., app://orders/123" />
                  <p className="text-xs text-muted-foreground">
                    URL to open when the user taps the notification
                  </p>
                </div>
              )}
              
              {notificationType === "email" && (
                <div className="space-y-2">
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input id="subject" placeholder="Enter email subject" />
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between space-x-2 pt-2">
              <div className="flex flex-col">
                <span className="font-medium">Schedule for later</span>
                <span className="text-sm text-muted-foreground">
                  Send this notification at a specific time
                </span>
              </div>
              <Switch 
                checked={scheduleSending} 
                onCheckedChange={setScheduleSending}
              />
            </div>
            
            {scheduleSending && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schedule-date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="schedule-date" 
                      type="date" 
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule-time">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="schedule-time" 
                      type="time" 
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Wrap the button in a Dialog component instead of using DialogTrigger alone */}
          <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
            <DialogTrigger asChild>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
              >
                Preview Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Notification Preview</DialogTitle>
                <DialogDescription>
                  Preview how your notification will appear to users
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {notificationType === "push" && (
                  <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        <Bell className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold">Your App Name</p>
                        <p className="font-medium">Sample Notification Title</p>
                        <p className="text-sm text-muted-foreground">
                          This is a preview of how your push notification will appear on user devices.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {notificationType === "email" && (
                  <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                    <p className="font-medium pb-2">From: Your App &lt;notifications@yourapp.com&gt;</p>
                    <p className="font-medium pb-2">Subject: Sample Email Notification</p>
                    <div className="border-t pt-2">
                      <p className="text-sm">
                        Hello User,<br /><br />
                        This is a preview of how your email notification will appear to users.<br /><br />
                        Best regards,<br />
                        Your App Team
                      </p>
                    </div>
                  </div>
                )}
                
                {notificationType === "sms" && (
                  <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                    <p className="text-sm">
                      Your App: This is a preview of how your SMS notification will appear to users.
                    </p>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button onClick={() => setShowPreviewDialog(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          {scheduleSending ? "Schedule Notification" : "Send Now"}
        </Button>
      </CardFooter>
      
      {/* Remove the duplicate dialog at the end of the component */}
    </Card>
  );
};

export default NotificationForm;
