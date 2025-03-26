
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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
  const mapRef = useRef<HTMLDivElement>(null);

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
    
    // Add map background
    const mapBackground = document.createElement('div');
    mapBackground.className = 'absolute inset-0 bg-blue-100 dark:bg-blue-900';
    mapContainer.appendChild(mapBackground);
    
    // Add location markers
    locations.forEach((loc) => {
      const marker = document.createElement('div');
      marker.className = `absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer 
        ${loc.type === 'vendor' ? 'text-amber-600' : 'text-primary'}
        ${selectedLocation === loc.id ? 'scale-150' : 'scale-100'}`;
      
      // Position marker randomly on the map (in a real app, this would use actual coordinates)
      marker.style.left = `${30 + Math.random() * 60}%`;
      marker.style.top = `${30 + Math.random() * 60}%`;
      
      // Create the pin icon
      marker.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
      
      // Add name tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 transition-opacity';
      tooltip.innerText = loc.name;
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
    
    mapElement.appendChild(mapContainer);
    
    return () => {
      // Cleanup
      if (mapElement) {
        mapElement.innerHTML = '';
      }
    };
  }, [locations, selectedLocation]);

  const handleSendMessage = () => {
    if (!selectedLocation || !message.trim()) return;
    
    // Find the selected location name
    const location = locations.find(loc => loc.id === selectedLocation);
    
    toast({
      title: "Message Sent",
      description: `Message sent to ${location?.name}: "${message}"`,
    });
    
    setMessage('');
  };

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <div ref={mapRef} style={{ height: `${height}px` }} className="relative">
          {/* Map will be rendered here */}
        </div>
        
        {/* Message form */}
        {selectedLocation && (
          <div className="p-4 border-t">
            <p className="text-sm mb-2">
              Sending message to: {locations.find(loc => loc.id === selectedLocation)?.name}
            </p>
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
        )}
      </CardContent>
    </Card>
  );
};

export default Map;
