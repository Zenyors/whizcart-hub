
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VendorDetail } from "@/api/vendorApi";

interface VendorProfileCardProps {
  vendor: VendorDetail;
}

const VendorProfileCard = ({ vendor }: VendorProfileCardProps) => {
  return (
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
  );
};

export default VendorProfileCard;
