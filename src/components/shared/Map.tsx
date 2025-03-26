
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MapPin, LocateFixed, Layers, Building, Truck, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// This is a placeholder for the mapbox library
// In a real implementation, you would use the mapbox-gl library
const Map = ({
  locations = [],
  title = "Location Map",
  height = 500,
}: {
  locations?: Array<{
    id: string;
    name: string;
    location: { lat: number; lng: number };
    type: 'vendor' | 'delivery';
  }>;
  title?: string;
  height?: number;
}) => {
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'vendor' | 'delivery'>('all');
  const mapRef = useRef<HTMLDivElement>(null);

  const filteredLocations = filter === 'all' 
    ? locations 
    : locations.filter(loc => loc.type === filter);

  const vendorCount = locations.filter(loc => loc.type === 'vendor').length;
  const deliveryCount = locations.filter(loc => loc.type === 'delivery').length;

  useEffect(() => {
    // This would be where you initialize the map
    // For this example, we're just creating a placeholder
    if (!mapRef.current) return;
    
    const mapElement = mapRef.current;
    
    // Clear any existing content
    mapElement.innerHTML = '';
    
    // Create a simple representation of the map
    const mapContainer = document.createElement('div');
    mapContainer.className = 'relative w-full h-full bg-gray-200 rounded-lg overflow-hidden';
    mapContainer.style.position = 'relative';
    
    // Add map background with grid pattern for more detail
    const mapBackground = document.createElement('div');
    mapBackground.className = 'absolute inset-0 bg-blue-100 dark:bg-blue-900 background-grid';
    mapBackground.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)';
    mapBackground.style.backgroundSize = '20px 20px';
    mapContainer.appendChild(mapBackground);
    
    // Add some mock terrain features
    const terrain = document.createElement('div');
    terrain.className = 'absolute inset-0';
    
    // Add some roads
    for (let i = 0; i < 5; i++) {
      const road = document.createElement('div');
      road.className = 'absolute bg-white dark:bg-gray-700';
      road.style.height = '2px';
      road.style.width = `${Math.random() * 60 + 20}%`;
      road.style.top = `${Math.random() * 80 + 10}%`;
      road.style.left = `${Math.random() * 30}%`;
      road.style.transform = `rotate(${Math.random() * 180}deg)`;
      road.style.opacity = '0.7';
      terrain.appendChild(road);
    }
    
    // Add some water bodies
    const water = document.createElement('div');
    water.className = 'absolute bg-blue-300 dark:bg-blue-800 rounded-full opacity-60';
    water.style.width = '100px';
    water.style.height = '100px';
    water.style.top = '40%';
    water.style.left = '70%';
    terrain.appendChild(water);
    
    mapContainer.appendChild(terrain);
    
    // Add location markers
    filteredLocations.forEach((loc) => {
      const marker = document.createElement('div');
      marker.className = `absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200
        ${loc.type === 'vendor' ? 'text-amber-600' : 'text-primary'}
        ${selectedLocation === loc.id ? 'scale-150 z-10' : 'scale-100'}`;
      
      // Position marker randomly on the map (in a real app, this would use actual coordinates)
      marker.style.left = `${30 + Math.random() * 60}%`;
      marker.style.top = `${30 + Math.random() * 60}%`;
      
      // Create the pin icon
      marker.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
      
      // Add pulse effect
      const pulse = document.createElement('div');
      pulse.className = 'absolute inset-0 rounded-full animate-ping opacity-70';
      pulse.style.backgroundColor = loc.type === 'vendor' ? 'rgba(217, 119, 6, 0.3)' : 'rgba(39, 76, 255, 0.3)';
      marker.appendChild(pulse);
      
      // Add name tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 transition-opacity shadow-md z-20';
      tooltip.innerHTML = `<div class="font-semibold">${loc.name}</div><div class="text-xs text-muted-foreground">${loc.type === 'vendor' ? 'Vendor' : 'Delivery Partner'}</div>`;
      marker.appendChild(tooltip);
      
      // Show tooltip on hover
      marker.addEventListener('mouseenter', () => {
        tooltip.classList.add('opacity-100');
      });
      marker.addEventListener('mouseleave', () => {
        tooltip.classList.remove('opacity-100');
      });
      
      // Select location on click
      marker.addEventListener('click', () => {
        setSelectedLocation(selectedLocation === loc.id ? null : loc.id);
      });
      
      mapContainer.appendChild(marker);
    });
    
    // Add a compass
    const compass = document.createElement('div');
    compass.className = 'absolute top-4 right-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center';
    compass.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-compass"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`;
    mapContainer.appendChild(compass);
    
    // Add a scale bar
    const scale = document.createElement('div');
    scale.className = 'absolute bottom-4 left-4 bg-white dark:bg-gray-800 px-3 py-1 rounded text-xs flex items-center shadow-md';
    scale.innerHTML = `
      <div class="mr-2">Scale:</div>
      <div class="flex items-center">
        <div class="h-1 w-10 bg-black dark:bg-white"></div>
        <div class="ml-1">5 km</div>
      </div>
    `;
    mapContainer.appendChild(scale);
    
    mapElement.appendChild(mapContainer);
    
    return () => {
      // Cleanup
      if (mapElement) {
        mapElement.innerHTML = '';
      }
    };
  }, [filteredLocations, selectedLocation]);

  const handleSendMessage = () => {
    if (!selectedLocation || !message.trim()) return;
    
    // Find the selected location name
    const location = locations.find(loc => loc.id === selectedLocation);
    
    toast({
      title: "Message Sent",
      description: `Message sent to ${location?.name}: "${message}"`,
    });
    
    setMessage('');
    setSelectedLocation(null);
  };

  const selectedLocationDetails = selectedLocation 
    ? locations.find(loc => loc.id === selectedLocation) 
    : null;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              Monitor and communicate with partners across your network
            </CardDescription>
          </div>
          <div className="flex space-x-2 mt-2 md:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-primary text-primary-foreground' : ''}
            >
              <Filter className="mr-1 h-4 w-4" />
              All ({locations.length})
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setFilter('vendor')}
              className={filter === 'vendor' ? 'bg-amber-500 text-white' : ''}
            >
              <Building className="mr-1 h-4 w-4" />
              Vendors ({vendorCount})
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setFilter('delivery')}
              className={filter === 'delivery' ? 'bg-primary text-primary-foreground' : ''}
            >
              <Truck className="mr-1 h-4 w-4" />
              Delivery ({deliveryCount})
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 border-b bg-muted/30">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-background">
              <LocateFixed className="h-3 w-3 mr-1" />
              Real-time Tracking
            </Badge>
            <Badge variant="outline" className="bg-background">
              <Layers className="h-3 w-3 mr-1" />
              Map Layers
            </Badge>
            {filter === 'all' ? (
              <Badge className="bg-primary text-primary-foreground">Showing all locations</Badge>
            ) : (
              <Badge className={filter === 'vendor' ? 'bg-amber-500' : 'bg-primary'}>
                Filtering: {filter === 'vendor' ? 'Vendors Only' : 'Delivery Partners Only'}
              </Badge>
            )}
          </div>
        </div>
        <div ref={mapRef} style={{ height: `${height}px` }} className="relative">
          {/* Map will be rendered here */}
        </div>
        
        {/* Message form */}
        {selectedLocation ? (
          <div className="p-4 border-t">
            <div className="flex items-center mb-3">
              <div className={`h-3 w-3 rounded-full mr-2 ${selectedLocationDetails?.type === 'vendor' ? 'bg-amber-500' : 'bg-primary'}`}></div>
              <p className="text-sm font-medium">
                Messaging: {selectedLocationDetails?.name} ({selectedLocationDetails?.type})
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!message.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 border-t text-center text-sm text-muted-foreground">
            Click on any location marker to send a message
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Map;
