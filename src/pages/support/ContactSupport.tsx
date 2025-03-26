
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  HelpCircle, 
  MapPin, 
  Clock, 
  Calendar,
  User, 
  Store, 
  Truck,
  ChevronRight
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const ContactSupport = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [contactCategory, setContactCategory] = useState("general");
  
  const handleContactSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    toast({
      title: "Message Sent",
      description: "We have received your message and will respond shortly.",
    });
  };
  
  const supportHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 10:00 PM IST" },
    { day: "Saturday", hours: "10:00 AM - 8:00 PM IST" },
    { day: "Sunday", hours: "11:00 AM - 6:00 PM IST" }
  ];
  
  const supportOffices = [
    { 
      city: "Mumbai", 
      address: "WhizCart Tower, Bandra Kurla Complex, Mumbai, Maharashtra 400051", 
      phone: "+91 22-4563-7890" 
    },
    { 
      city: "Delhi", 
      address: "WhizCart House, Connaught Place, New Delhi 110001", 
      phone: "+91 11-2345-6789" 
    },
    { 
      city: "Bengaluru", 
      address: "WhizCart Tech Park, Whitefield, Bengaluru, Karnataka 560066", 
      phone: "+91 80-3456-7890" 
    }
  ];
  
  const userTypeIcons = {
    customer: User,
    vendor: Store,
    delivery: Truck
  };
  
  return (
    <>
      <Helmet>
        <title>Contact Support | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full">
          <PageHeader
            title="Contact Support"
            description="Get in touch with our support team"
          >
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => navigate("/support")}
            >
              <HelpCircle className="h-4 w-4" />
              Help Center
            </Button>
          </PageHeader>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {/* Contact Methods */}
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
            
            {/* Contact Form */}
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
            
            {/* Support Info */}
            <Card>
              <CardHeader>
                <CardTitle>Support Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Support Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    {supportHours.map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-muted-foreground">{item.day}</span>
                        <span className="font-medium">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Office Locations
                  </h3>
                  <div className="space-y-4 text-sm">
                    {supportOffices.map((office, i) => (
                      <div key={i} className="space-y-1">
                        <h4 className="font-medium">{office.city}</h4>
                        <p className="text-muted-foreground">{office.address}</p>
                        <p>{office.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Expected Response Times
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone Support</span>
                      <span className="font-medium">Immediate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Live Chat</span>
                      <span className="font-medium">Within 5 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Support Tickets</span>
                      <span className="font-medium">Within 12 hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => navigate("/support")}
                >
                  <HelpCircle className="h-4 w-4" />
                  Visit Help Center
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Support Options for Different User Types */}
          <Card>
            <CardHeader>
              <CardTitle>Specialized Support</CardTitle>
              <CardDescription>Select your user type for targeted support options</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="customer" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="customer">Customer Support</TabsTrigger>
                  <TabsTrigger value="vendor">Vendor Support</TabsTrigger>
                  <TabsTrigger value="delivery">Delivery Support</TabsTrigger>
                </TabsList>
                
                <TabsContent value="customer" className="pt-6">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-accent transition-all cursor-pointer">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Account & Profile</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          Update profile, password reset, account security
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm" asChild>
                          <div className="flex items-center gap-1">
                            Get Help <ChevronRight className="h-3 w-3" />
                          </div>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-accent transition-all cursor-pointer">
                      <div className="rounded-full bg-green-100 p-2 text-green-600">
                        <ShoppingCart className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Orders & Returns</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          Track orders, request returns, order cancellations
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm" asChild>
                          <div className="flex items-center gap-1">
                            Get Help <ChevronRight className="h-3 w-3" />
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="vendor" className="pt-6">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-accent transition-all cursor-pointer">
                      <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                        <Store className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Seller Dashboard</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          Manage listings, inventory, seller settings
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm" asChild>
                          <div className="flex items-center gap-1">
                            Get Help <ChevronRight className="h-3 w-3" />
                          </div>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-accent transition-all cursor-pointer">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Payments & Finances</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          Settlement issues, payout schedules, tax questions
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm" asChild>
                          <div className="flex items-center gap-1">
                            Get Help <ChevronRight className="h-3 w-3" />
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="delivery" className="pt-6">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-accent transition-all cursor-pointer">
                      <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                        <Truck className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Delivery App</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          Technical support, app issues, login problems
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm" asChild>
                          <div className="flex items-center gap-1">
                            Get Help <ChevronRight className="h-3 w-3" />
                          </div>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-accent transition-all cursor-pointer">
                      <div className="rounded-full bg-teal-100 p-2 text-teal-600">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Delivery Operations</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          Order issues, routing problems, zone questions
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm" asChild>
                          <div className="flex items-center gap-1">
                            Get Help <ChevronRight className="h-3 w-3" />
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ContactSupport;
