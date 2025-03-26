
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, User, IndianRupee, Truck, Store, FileText, Phone, MessageSquare, Mail, Clock } from "lucide-react";
import { FAQ } from "@/types/support";

interface SupportHomeProps {
  faqs: FAQ[];
  onSetActiveTab: (tab: string) => void;
}

const SupportHome = ({ faqs, onSetActiveTab }: SupportHomeProps) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Customer Support</CardTitle>
            <CardDescription>Help for shoppers and buyers</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Account & Orders</h4>
                  <p className="text-sm text-muted-foreground">Manage your account, track orders</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <IndianRupee className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Payments & Refunds</h4>
                  <p className="text-sm text-muted-foreground">Payment issues, refund status</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Delivery & Returns</h4>
                  <p className="text-sm text-muted-foreground">Track delivery, process returns</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full gap-1" onClick={() => onSetActiveTab("create-ticket")}>
              Get Customer Help <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Vendor Support</CardTitle>
            <CardDescription>Help for sellers and partners</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-3">
                <Store className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Seller Dashboard</h4>
                  <p className="text-sm text-muted-foreground">Manage listings, inventory</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <IndianRupee className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Payouts & Finances</h4>
                  <p className="text-sm text-muted-foreground">Payment schedules, invoicing</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Policies & Compliance</h4>
                  <p className="text-sm text-muted-foreground">Selling guidelines, regulations</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full gap-1" onClick={() => onSetActiveTab("create-ticket")}>
              Get Vendor Help <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Delivery Partner Support</CardTitle>
            <CardDescription>Help for delivery personnel</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Delivery App</h4>
                  <p className="text-sm text-muted-foreground">App issues, order updates</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <IndianRupee className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Earnings & Incentives</h4>
                  <p className="text-sm text-muted-foreground">Payment issues, incentives</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Scheduling & Availability</h4>
                  <p className="text-sm text-muted-foreground">Shifts, time off, zone changes</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full gap-1" onClick={() => onSetActiveTab("create-ticket")}>
              Get Delivery Help <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
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
      
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.slice(0, 3).map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
        <CardFooter>
          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={() => onSetActiveTab("knowledge-base")}
          >
            View All FAQs
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SupportHome;
