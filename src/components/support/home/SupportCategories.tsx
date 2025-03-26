
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, IndianRupee, Truck, Store, FileText, Clock } from "lucide-react";

interface SupportCategoriesProps {
  onSetActiveTab: (tab: string) => void;
}

const SupportCategories = ({ onSetActiveTab }: SupportCategoriesProps) => {
  return (
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
  );
};

export default SupportCategories;
