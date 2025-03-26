
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Map from "@/components/shared/Map";
import { Vendor } from "@/api/types/vendor.types";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { MapPin, Building, Truck, Info } from "lucide-react";

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

// Generate mock delivery partner locations
const generateMockDeliveryPartners = (count: number = 5) => {
  return Array.from({ length: count }).map((_, index) => ({
    id: `delivery-${index + 1}`,
    name: `Delivery Partner ${index + 1}`,
    location: {
      lat: 40 + Math.random() * 10,
      lng: -100 + Math.random() * 50,
    },
    type: 'delivery' as const,
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
  const [activeTab, setActiveTab] = useState<string>("map");
  const vendorLocations = generateMockLocations(vendors);
  
  // If no delivery partners are provided, generate mock ones
  const allDeliveryPartners = deliveryPartners.length > 0 
    ? deliveryPartners.map(partner => ({
        id: partner.id,
        name: partner.name,
        location: partner.location,
        type: 'delivery' as const,
      }))
    : generateMockDeliveryPartners();
  
  // Combine vendor and delivery partner locations
  const allLocations = [
    ...vendorLocations,
    ...allDeliveryPartners,
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Network Locations Dashboard
          </DialogTitle>
          <DialogDescription>
            Monitor all vendor and delivery partner locations in real-time. Select a pin on the map to send a message.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="map" className="flex-1 overflow-hidden flex flex-col" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Interactive Map
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Location Info
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="flex-1 overflow-hidden mt-0">
            <Map 
              locations={allLocations}
              height={600}
              title="Network Locations"
            />
          </TabsContent>
          
          <TabsContent value="info" className="mt-0 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building className="h-4 w-4 text-amber-500" />
                    Vendor Locations
                  </CardTitle>
                  <CardDescription>
                    {vendorLocations.length} vendors in your network
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[250px] overflow-auto">
                  <div className="space-y-2">
                    {vendorLocations.map((vendor) => (
                      <div key={vendor.id} className="flex items-start p-2 rounded-md hover:bg-muted">
                        <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                          <Building className="h-3 w-3" />
                        </div>
                        <div>
                          <div className="font-medium">{vendor.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Lat: {vendor.location.lat.toFixed(4)}, Lng: {vendor.location.lng.toFixed(4)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" />
                    Delivery Partners
                  </CardTitle>
                  <CardDescription>
                    {allDeliveryPartners.length} delivery partners in your network
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[250px] overflow-auto">
                  <div className="space-y-2">
                    {allDeliveryPartners.map((partner) => (
                      <div key={partner.id} className="flex items-start p-2 rounded-md hover:bg-muted">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                          <Truck className="h-3 w-3" />
                        </div>
                        <div>
                          <div className="font-medium">{partner.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Lat: {partner.location.lat.toFixed(4)}, Lng: {partner.location.lng.toFixed(4)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default VendorsMapDialog;
