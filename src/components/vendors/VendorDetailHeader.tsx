
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VendorDetail } from "@/api/vendorApi";
import { Mail, Edit, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VendorsMapDialog from "./VendorsMapDialog";

interface VendorDetailHeaderProps {
  vendor: VendorDetail;
}

const VendorDetailHeader = ({ vendor }: VendorDetailHeaderProps) => {
  const { toast } = useToast();
  const [mapDialogOpen, setMapDialogOpen] = useState(false);

  const handleContact = () => {
    toast({
      title: "Contact Vendor",
      description: `Contacting ${vendor.name} at ${vendor.contact.email}`,
    });
    // In a real app, this might open a contact form or email client
    window.open(`mailto:${vendor.contact.email}`);
  };

  const handleEdit = () => {
    toast({
      title: "Edit Vendor",
      description: `Editing vendor details for ${vendor.name}`,
    });
    // In a real app, this might navigate to an edit page
  };

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
        <Button variant="outline" onClick={() => setMapDialogOpen(true)}>
          <MapPin className="mr-2 h-4 w-4" />
          View Map
        </Button>
        <Button variant="outline" onClick={handleContact}>
          <Mail className="mr-2 h-4 w-4" />
          Contact
        </Button>
        <Button onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Details
        </Button>
      </div>
      
      {/* Map Dialog */}
      <VendorsMapDialog 
        open={mapDialogOpen} 
        onOpenChange={setMapDialogOpen} 
        vendors={[vendor]} 
      />
    </div>
  );
};

export default VendorDetailHeader;
