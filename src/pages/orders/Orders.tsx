
import React from "react";
import { Helmet } from 'react-helmet';
import { ShoppingCart, Package, TrendingUp, AlertCircle, Plus, Filter } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Orders = () => {
  return (
    <>
      <Helmet>
        <title>Orders | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <PageHeader
            title="Orders"
            description="Manage customer orders and fulfillment"
          >
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Order
            </Button>
          </PageHeader>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">1,248</div>
                  <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                    <ShoppingCart className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Fulfillment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">42</div>
                  <div className="rounded-full bg-yellow-100 p-2 text-yellow-600">
                    <Package className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">$86.42</div>
                  <div className="rounded-full bg-green-100 p-2 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Issues to Resolve</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">8</div>
                  <div className="rounded-full bg-red-100 p-2 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search orders by ID, customer, or product..."
                className="pl-9"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <Card className="p-6">
                <div className="flex flex-col gap-8 items-center justify-center text-center py-16">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground/40" />
                  <div>
                    <h3 className="text-xl font-medium mb-2">Orders Management Page</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      This page is under construction. Here you'll be able to manage all customer orders, 
                      track fulfillment status, and handle customer communications.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button variant="outline">View Documentation</Button>
                      <Button>Get Started</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="new" className="mt-4">
              <Card className="p-6 py-20 text-center">
                <p className="text-muted-foreground">New orders will appear here</p>
              </Card>
            </TabsContent>
            <TabsContent value="processing" className="mt-4">
              <Card className="p-6 py-20 text-center">
                <p className="text-muted-foreground">Processing orders will appear here</p>
              </Card>
            </TabsContent>
            <TabsContent value="shipped" className="mt-4">
              <Card className="p-6 py-20 text-center">
                <p className="text-muted-foreground">Shipped orders will appear here</p>
              </Card>
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <Card className="p-6 py-20 text-center">
                <p className="text-muted-foreground">Completed orders will appear here</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Orders;
