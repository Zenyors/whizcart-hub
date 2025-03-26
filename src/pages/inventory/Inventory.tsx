
import React from "react";
import { Helmet } from 'react-helmet';
import { Package, AlertTriangle, BarChart3, Truck, Plus, Search } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const Inventory = () => {
  return (
    <>
      <Helmet>
        <title>Inventory | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <PageHeader
            title="Inventory Management"
            description="Track and manage your product inventory across all locations"
          >
            <Button variant="outline" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Reports
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </PageHeader>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">1,832</div>
                  <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                    <Package className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">24</div>
                  <div className="rounded-full bg-yellow-100 p-2 text-yellow-600">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">8</div>
                  <div className="rounded-full bg-green-100 p-2 text-green-600">
                    <Truck className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Storage Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="text-2xl font-bold">78%</div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name, SKU or category..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
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
                  className="h-4 w-4"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                Stock Levels
              </Button>
              <Button variant="outline" className="gap-2">
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
                  className="h-4 w-4"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" x2="12" y1="3" y2="15" />
                </svg>
                Export
              </Button>
            </div>
          </div>

          <Card className="p-6">
            <div className="flex flex-col gap-8 items-center justify-center text-center py-16">
              <Package className="h-16 w-16 text-muted-foreground/40" />
              <div>
                <h3 className="text-xl font-medium mb-2">Inventory Management Page</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  This page is under construction. Here you'll be able to track inventory levels,
                  manage stock, set alerts for low inventory, and coordinate with suppliers.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline">View Documentation</Button>
                  <Button>Get Started</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Inventory;
