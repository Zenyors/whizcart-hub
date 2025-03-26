
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';
import { 
  Calendar, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Truck
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import VendorOrdersHistory from "@/components/vendors/VendorOrdersHistory";
import VendorProductsTable from "@/components/vendors/VendorProductsTable";
import VendorQualityMetrics from "@/components/vendors/VendorQualityMetrics";
import VendorCommunicationLog from "@/components/vendors/VendorCommunicationLog";
import { fetchVendorById } from "@/api/vendorApi";
import type { VendorDetail } from "@/api/vendorApi";

const VendorDetails = () => {
  const { id } = useParams();
  const { data: vendor, isLoading } = useQuery<VendorDetail>({
    queryKey: ['vendor', id],
    queryFn: () => fetchVendorById(id as string),
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!vendor) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-2xl font-bold">Vendor not found</h2>
          <p className="text-muted-foreground">The vendor you're looking for doesn't exist or has been removed.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{vendor.name} | Vendor Details</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{vendor.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={vendor.status === 'active' ? 'success' : 'secondary'}>
                  {vendor.status}
                </Badge>
                {vendor.isPreferred && (
                  <Badge variant="default" className="bg-amber-500">Preferred</Badge>
                )}
                {vendor.rating >= 4.5 && (
                  <Badge variant="outline" className="border-emerald-500 text-emerald-500">Top Rated</Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Contact</Button>
              <Button>Edit Details</Button>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="On-Time Delivery"
              value={`${vendor.metrics.onTimeDelivery}%`}
              description="Last 30 days average"
              icon={Truck}
              trend={{ value: vendor.metrics.onTimeDeliveryTrend, positive: vendor.metrics.onTimeDeliveryTrend > 0 }}
              color="#3b82f6"
            />
            <StatCard
              title="Quality Score"
              value={`${vendor.metrics.qualityScore}/100`}
              description="Based on returns & feedback"
              icon={CheckCircle}
              trend={{ value: vendor.metrics.qualityScoreTrend, positive: vendor.metrics.qualityScoreTrend > 0 }}
              color="#10b981"
            />
            <StatCard
              title="Response Time"
              value={`${vendor.metrics.responseTime}h`}
              description="Average response to inquiries"
              icon={Calendar}
              trend={{ value: vendor.metrics.responseTimeTrend, positive: vendor.metrics.responseTimeTrend < 0 }}
              color="#f59e0b"
            />
            <StatCard
              title="Issue Rate"
              value={`${vendor.metrics.issueRate}%`}
              description="Problems per 100 orders"
              icon={AlertTriangle}
              trend={{ value: vendor.metrics.issueRateTrend, positive: vendor.metrics.issueRateTrend < 0 }}
              color="#ef4444"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Vendor Profile</CardTitle>
              <CardDescription>Complete information about this vendor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Company Name</dt>
                      <dd className="text-base">{vendor.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Primary Contact</dt>
                      <dd className="text-base">{vendor.contact.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                      <dd className="text-base">{vendor.contact.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                      <dd className="text-base">{vendor.contact.phone}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Onboarded Date</dt>
                      <dd className="text-base">{new Date(vendor.onboardedDate).toLocaleDateString()}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Payment Terms</dt>
                      <dd className="text-base">{vendor.paymentTerms}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Categories</dt>
                      <dd className="flex flex-wrap gap-2 mt-1">
                        {vendor.categories.map(category => (
                          <Badge key={category} variant="outline">{category}</Badge>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="products">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Order History</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
            </TabsList>
            <TabsContent value="products" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>All products supplied by this vendor</CardDescription>
                </CardHeader>
                <CardContent>
                  <VendorProductsTable products={vendor.products} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>History of all orders with this vendor</CardDescription>
                </CardHeader>
                <CardContent>
                  <VendorOrdersHistory vendorId={vendor.id} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="performance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Detailed quality and delivery metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <VendorQualityMetrics metrics={vendor.metrics} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="communication" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Communication Log</CardTitle>
                  <CardDescription>History of all communications with this vendor</CardDescription>
                </CardHeader>
                <CardContent>
                  <VendorCommunicationLog vendorId={vendor.id} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default VendorDetails;
