
import React from "react";
import { Helmet } from 'react-helmet';
import { Truck, MapPin, Clock, Users, Plus, IndianRupee } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DeliveryPartners = () => {
  return (
    <>
      <Helmet>
        <title>Delivery Partners | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full">
          <PageHeader
            title="Delivery Partners"
            description="Manage your delivery network and logistics partners"
          >
            <Button variant="outline" className="gap-2">
              <MapPin className="h-4 w-4" />
              View Map
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Partner
            </Button>
          </PageHeader>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">28</div>
                  <div className="rounded-full bg-green-100 p-2 text-green-600">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Deliveries Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">142</div>
                  <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                    <Truck className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Delivery Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">32 min</div>
                  <div className="rounded-full bg-yellow-100 p-2 text-yellow-600">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold flex items-center">
                    <IndianRupee className="h-5 w-5 mr-1" />
                    180
                  </div>
                  <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                    <IndianRupee className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex flex-col gap-8 items-center justify-center text-center py-16">
              <Truck className="h-16 w-16 text-muted-foreground/40" />
              <div>
                <h3 className="text-xl font-medium mb-2">Delivery Partners Page</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  This page is under construction. Here you'll be able to manage your delivery partners, track deliveries, and optimize routes.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
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

export default DeliveryPartners;
