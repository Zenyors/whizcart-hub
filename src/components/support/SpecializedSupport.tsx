
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShoppingCart, Store, Truck, Clock, MapPin, ChevronRight } from "lucide-react";

const SpecializedSupport = () => {
  return (
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
  );
};

export default SpecializedSupport;
