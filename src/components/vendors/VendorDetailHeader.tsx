
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VendorDetail } from "@/api/vendorApi";

interface VendorDetailHeaderProps {
  vendor: VendorDetail;
}

const VendorDetailHeader = ({ vendor }: VendorDetailHeaderProps) => {
  return (
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
  );
};

export default VendorDetailHeader;
