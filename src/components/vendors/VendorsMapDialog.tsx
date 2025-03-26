
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
import { MapPin, Building, Truck, Info, Shield, Activity } from "lucide-react";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

// Location types
interface Location {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  type: 'vendor' | 'delivery';
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  lastActive?: string;
  coverage?: string;
}

// Generate mock vendor locations with status
const generateMockLocations = (vendors: Vendor[]): Location[] => {
  return vendors.map(vendor => ({
    id: vendor.id,
    name: vendor.name,
    location: {
      lat: 40 + Math.random() * 10, // Random latitude
      lng: -100 + Math.random() * 50, // Random longitude
    },
    type: 'vendor' as const,
    status: vendor.status,
    lastActive: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }));
};

// Generate mock delivery partner locations with status
const generateMockDeliveryPartners = (count: number = 5): Location[] => {
  const statuses: Array<'active' | 'inactive' | 'pending' | 'suspended'> = ['active', 'inactive', 'pending', 'suspended'];
  
  return Array.from({ length: count }).map((_, index) => ({
    id: `delivery-${index + 1}`,
    name: `Delivery Partner ${index + 1}`,
    location: {
      lat: 40 + Math.random() * 10,
      lng: -100 + Math.random() * 50,
    },
    type: 'delivery' as const,
    status: statuses[Math.floor(Math.random() * 4)],
    lastActive: new Date(Date.now() - Math.random() * 1000000).toISOString(),
    coverage: Math.floor(Math.random() * 20 + 5) + " km",
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
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showRealTimeTracking, setShowRealTimeTracking] = useState(true);
  const [showMapLayers, setShowMapLayers] = useState(true);
  
  const vendorLocations = generateMockLocations(vendors);
  
  // If no delivery partners are provided, generate mock ones
  const allDeliveryPartners: Location[] = deliveryPartners.length > 0 
    ? deliveryPartners.map(partner => ({
        id: partner.id,
        name: partner.name,
        location: partner.location,
        type: 'delivery' as const,
        status: Math.random() > 0.3 ? 'active' : 'inactive' as const,
        lastActive: new Date(Date.now() - Math.random() * 1000000).toISOString(),
        coverage: Math.floor(Math.random() * 20 + 5) + " km",
      }))
    : generateMockDeliveryPartners();
  
  // Combine vendor and delivery partner locations
  let allLocations = [...vendorLocations, ...allDeliveryPartners];
  
  // Apply status filter
  if (statusFilter !== 'all') {
    allLocations = allLocations.filter(location => {
      if (statusFilter === 'active') {
        return location.status === 'active';
      } else {
        return location.status !== 'active';
      }
    });
  }

  // Calculate status counts
  const activeVendors = vendorLocations.filter(v => v.status === 'active').length;
  const inactiveVendors = vendorLocations.length - activeVendors;
  const activeDeliveryPartners = allDeliveryPartners.filter(d => d.status === 'active').length;
  const inactiveDeliveryPartners = allDeliveryPartners.length - activeDeliveryPartners;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Network Locations Dashboard
          </DialogTitle>
          <DialogDescription>
            Monitor all vendor and delivery partner locations in real-time. Select a pin on the map to view details or send a message.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="map" className="flex-1 overflow-hidden flex flex-col" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <TabsList className="md:w-auto flex-shrink-0">
              <TabsTrigger value="map" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Interactive Map
              </TabsTrigger>
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Location Info
              </TabsTrigger>
              <TabsTrigger value="status" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Status Dashboard
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="real-time" 
                  checked={showRealTimeTracking}
                  onCheckedChange={setShowRealTimeTracking}
                />
                <Label htmlFor="real-time" className="text-sm">Real-time tracking</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="map-layers" 
                  checked={showMapLayers}
                  onCheckedChange={setShowMapLayers}
                />
                <Label htmlFor="map-layers" className="text-sm">Map layers</Label>
              </div>
            </div>
          </div>
          
          <TabsContent value="map" className="flex-1 overflow-hidden mt-0">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge 
                variant={statusFilter === 'all' ? 'default' : 'outline'} 
                className="cursor-pointer"
                onClick={() => setStatusFilter('all')}
              >
                All Locations ({allLocations.length})
              </Badge>
              <Badge 
                variant={statusFilter === 'active' ? 'default' : 'outline'} 
                className="cursor-pointer"
                onClick={() => setStatusFilter('active')}
              >
                Active Only ({activeVendors + activeDeliveryPartners})
              </Badge>
              <Badge 
                variant={statusFilter === 'inactive' ? 'default' : 'outline'} 
                className="cursor-pointer"
                onClick={() => setStatusFilter('inactive')}
              >
                Inactive ({inactiveVendors + inactiveDeliveryPartners})
              </Badge>
            </div>
            
            <Map 
              locations={allLocations}
              height={560}
              title="Network Locations"
              showRealTimeTracking={showRealTimeTracking}
              showMapLayers={showMapLayers}
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
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                          vendor.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          <Building className="h-3 w-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium flex items-center gap-2">
                            {vendor.name}
                            <Badge variant={vendor.status === 'active' ? 'default' : 'secondary'} className="text-[10px]">
                              {vendor.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Lat: {vendor.location.lat.toFixed(4)}, Lng: {vendor.location.lng.toFixed(4)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Last active: {new Date(vendor.lastActive!).toLocaleString()}
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
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                          partner.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'
                        }`}>
                          <Truck className="h-3 w-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium flex items-center gap-2">
                            {partner.name}
                            <Badge variant={partner.status === 'active' ? 'success' : 'secondary'} className="text-[10px]">
                              {partner.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Lat: {partner.location.lat.toFixed(4)}, Lng: {partner.location.lng.toFixed(4)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Coverage: {partner.coverage} | Last active: {new Date(partner.lastActive!).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="status" className="mt-0 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{activeVendors}</div>
                    <div className="rounded-full bg-green-100 p-2 text-green-600">
                      <Building className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {((activeVendors / vendorLocations.length) * 100).toFixed(0)}% of total vendors
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Inactive Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{inactiveVendors}</div>
                    <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                      <Building className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {((inactiveVendors / vendorLocations.length) * 100).toFixed(0)}% of total vendors
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Delivery Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{activeDeliveryPartners}</div>
                    <div className="rounded-full bg-green-100 p-2 text-green-600">
                      <Truck className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {((activeDeliveryPartners / allDeliveryPartners.length) * 100).toFixed(0)}% of delivery partners
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Inactive Delivery Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{inactiveDeliveryPartners}</div>
                    <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                      <Truck className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {((inactiveDeliveryPartners / allDeliveryPartners.length) * 100).toFixed(0)}% of delivery partners
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Coverage Overview</CardTitle>
                <CardDescription>Network distribution and status analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Vendor Distribution</h4>
                    <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${(activeVendors / vendorLocations.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Active: {activeVendors}</span>
                      <span>Inactive: {inactiveVendors}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Delivery Partner Distribution</h4>
                    <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(activeDeliveryPartners / allDeliveryPartners.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Active: {activeDeliveryPartners}</span>
                      <span>Inactive: {inactiveDeliveryPartners}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="text-sm font-medium">Network Health</div>
                        <div className="text-xs text-muted-foreground">
                          {(((activeVendors + activeDeliveryPartners) / (vendorLocations.length + allDeliveryPartners.length)) * 100).toFixed(0)}% active partners
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="text-sm font-medium">Activity Status</div>
                        <div className="text-xs text-muted-foreground">
                          {activeVendors + activeDeliveryPartners} active out of {vendorLocations.length + allDeliveryPartners.length} total
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default VendorsMapDialog;
