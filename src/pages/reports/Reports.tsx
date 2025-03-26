import React from "react";
import { Helmet } from 'react-helmet';
import { BarChart3, TrendingUp, PieChart, Download, Calendar, Plus } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Reports = () => {
  return (
    <>
      <Helmet>
        <title>Reports | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <PageHeader
            title="Reports & Analytics"
            description="View and generate reports to track business performance"
          >
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Select Period
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </PageHeader>

          <Tabs defaultValue="sales">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="vendors">Vendors</TabsTrigger>
            </TabsList>
            <TabsContent value="sales" className="mt-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-muted-foreground" />
                      Sales Overview
                    </CardTitle>
                    <CardDescription>Monthly revenue breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      Chart will appear here
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                      Growth Trends
                    </CardTitle>
                    <CardDescription>Year-over-year comparison</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      Chart will appear here
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-muted-foreground" />
                      Sales by Category
                    </CardTitle>
                    <CardDescription>Product category distribution</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      Chart will appear here
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="inventory" className="mt-6">
              <Card className="p-6 py-20 text-center">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/40" />
                <p className="text-muted-foreground">Inventory reports will appear here</p>
              </Card>
            </TabsContent>
            <TabsContent value="customers" className="mt-6">
              <Card className="p-6 py-20 text-center">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/40" />
                <p className="text-muted-foreground">Customer reports will appear here</p>
              </Card>
            </TabsContent>
            <TabsContent value="vendors" className="mt-6">
              <Card className="p-6 py-20 text-center">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/40" />
                <p className="text-muted-foreground">Vendor reports will appear here</p>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col gap-6 md:flex-row">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Saved Reports</CardTitle>
                <CardDescription>Quick access to your saved reports</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center p-3 border rounded-md hover:bg-accent transition-colors">
                    <span>Monthly Sales Summary</span>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </li>
                  <li className="flex justify-between items-center p-3 border rounded-md hover:bg-accent transition-colors">
                    <span>Inventory Status</span>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </li>
                  <li className="flex justify-between items-center p-3 border rounded-md hover:bg-accent transition-colors">
                    <span>Customer Acquisition</span>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Report
                </Button>
              </CardContent>
            </Card>
            
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Report Schedule</CardTitle>
                <CardDescription>Upcoming automated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center p-3 border rounded-md hover:bg-accent transition-colors">
                    <div>
                      <p className="font-medium">Weekly Sales</p>
                      <p className="text-sm text-muted-foreground">Every Monday at 9:00 AM</p>
                    </div>
                    <Badge variant="outline">Email</Badge>
                  </li>
                  <li className="flex justify-between items-center p-3 border rounded-md hover:bg-accent transition-colors">
                    <div>
                      <p className="font-medium">Inventory Alert</p>
                      <p className="text-sm text-muted-foreground">Daily at 8:00 AM</p>
                    </div>
                    <Badge variant="outline">Dashboard</Badge>
                  </li>
                  <li className="flex justify-between items-center p-3 border rounded-md hover:bg-accent transition-colors">
                    <div>
                      <p className="font-medium">Monthly Performance</p>
                      <p className="text-sm text-muted-foreground">1st of month at 7:00 AM</p>
                    </div>
                    <Badge variant="outline">Email</Badge>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Schedule Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Reports;
