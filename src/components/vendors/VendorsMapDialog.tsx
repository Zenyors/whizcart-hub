
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Map from "@/components/shared/Map";
import { Vendor } from "@/api/types/vendor.types";

// Mock locations for demonstration
// In a real app, this would come from your API
const generateMockLocations = (vendors: Vendor[]) => {
  return vendors.map(vendor => ({
    id: vendor.id,
    name: vendor.name,
    location: {
      lat: 40 + Math.random() * 10, // Random latitude
      lng: -100 + Math.random() * 50, // Random longitude
    },
    type: 'vendor' as const,
  }));
};

interface VendorsMapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vendors: Vendor[];
  deliveryPartners?: Array<{
    id: string;
    name: string;
    location: { lat: number; lng: number };
  }>;
}

const VendorsMapDialog = ({
  open,
  onOpenChange,
  vendors,
  deliveryPartners = [],
}: VendorsMapDialogProps) => {
  const vendorLocations = generateMockLocations(vendors);
  
  // Combine vendor and delivery partner locations
  const allLocations = [
    ...vendorLocations,
    ...deliveryPartners.map(partner => ({
      id: partner.id,
      name: partner.name,
      location: partner.location,
      type: 'delivery' as const,
    })),
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Vendor & Delivery Partner Locations</DialogTitle>
          <DialogDescription>
            Monitor all vendor and delivery partner locations. Select a pin on the map to send a message.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Map 
            locations={allLocations}
            height={600}
            title="Vendor & Delivery Partner Locations"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VendorsMapDialog;
