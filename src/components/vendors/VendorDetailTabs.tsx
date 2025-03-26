
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VendorProductsTable from "./VendorProductsTable";
import VendorOrdersHistory from "./VendorOrdersHistory";
import VendorQualityMetrics from "./VendorQualityMetrics";
import VendorCommunicationLog from "./VendorCommunicationLog";
import { VendorDetail } from "@/api/vendorApi";

interface VendorDetailTabsProps {
  vendor: VendorDetail;
}

const VendorDetailTabs = ({ vendor }: VendorDetailTabsProps) => {
  return (
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
  );
};

export default VendorDetailTabs;
