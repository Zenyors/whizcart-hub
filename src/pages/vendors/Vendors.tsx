
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import VendorStatsSection from "@/components/vendors/VendorStatsSection";
import VendorPerformanceChart from "@/components/vendors/VendorPerformanceChart";
import VendorsTable from "@/components/vendors/VendorsTable";
import VendorQuickActions from "@/components/vendors/VendorQuickActions";
import VendorsMapDialog from "@/components/vendors/VendorsMapDialog";
import { fetchVendors } from "@/api/vendorApi";

const Vendors = () => {
  const { data: vendors = [], isLoading } = useQuery({
    queryKey: ['vendors'],
    queryFn: fetchVendors,
  });
  
  const [mapDialogOpen, setMapDialogOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Vendor Management | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full">
          <PageHeader
            title="Vendor Management"
            description="Monitor, evaluate, and manage your supplier relationships"
          >
            <Button variant="outline" className="gap-2" onClick={() => setMapDialogOpen(true)}>
              <MapPin className="h-4 w-4" />
              View Map
            </Button>
            <Button className="gap-2" asChild>
              <Link to="/vendors/add">
                <Plus className="h-4 w-4" />
                Add Vendor
              </Link>
            </Button>
          </PageHeader>

          <VendorStatsSection totalVendors={vendors.length} isLoading={isLoading} />

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-7">
            <Card className="lg:col-span-2 xl:col-span-5 w-full">
              <CardHeader>
                <CardTitle>Vendor Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-0 md:p-6">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="w-full md:w-auto flex-wrap">
                    <TabsTrigger value="all">All Vendors</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="new">New</TabsTrigger>
                    <TabsTrigger value="flagged">Flagged</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-4">
                    <VendorsTable vendors={vendors} isLoading={isLoading} />
                  </TabsContent>
                  <TabsContent value="active" className="mt-4">
                    <VendorsTable 
                      vendors={vendors.filter(v => v.status === 'active')}
                      isLoading={isLoading} 
                    />
                  </TabsContent>
                  <TabsContent value="new" className="mt-4">
                    <VendorsTable 
                      vendors={vendors.filter(v => v.isNew)} 
                      isLoading={isLoading}
                    />
                  </TabsContent>
                  <TabsContent value="flagged" className="mt-4">
                    <VendorsTable 
                      vendors={vendors.filter(v => v.issues?.length > 0)} 
                      isLoading={isLoading}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-6 lg:col-span-1 xl:col-span-2">
              <VendorQuickActions />
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <VendorPerformanceChart />
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Map Dialog */}
          <VendorsMapDialog
            open={mapDialogOpen}
            onOpenChange={setMapDialogOpen}
            vendors={vendors}
          />
        </div>
      </DashboardLayout>
    </>
  );
};

export default Vendors;
