
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Calendar, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SupportOffice {
  city: string;
  address: string;
  phone: string;
}

interface SupportHour {
  day: string;
  hours: string;
}

const SupportInfo = () => {
  const navigate = useNavigate();
  
  const supportHours: SupportHour[] = [
    { day: "Monday - Friday", hours: "9:00 AM - 10:00 PM IST" },
    { day: "Saturday", hours: "10:00 AM - 8:00 PM IST" },
    { day: "Sunday", hours: "11:00 AM - 6:00 PM IST" }
  ];
  
  const supportOffices: SupportOffice[] = [
    { 
      city: "Mumbai", 
      address: "WhizCart Tower, Bandra Kurla Complex, Mumbai, Maharashtra 400051", 
      phone: "+91 22-4563-7890" 
    },
    { 
      city: "Delhi", 
      address: "WhizCart House, Connaught Place, New Delhi 110001", 
      phone: "+91 11-2345-6789" 
    },
    { 
      city: "Bengaluru", 
      address: "WhizCart Tech Park, Whitefield, Bengaluru, Karnataka 560066", 
      phone: "+91 80-3456-7890" 
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Support Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4" /> Support Hours
          </h3>
          <div className="space-y-2 text-sm">
            {supportHours.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-muted-foreground">{item.day}</span>
                <span className="font-medium">{item.hours}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Office Locations
          </h3>
          <div className="space-y-4 text-sm">
            {supportOffices.map((office, i) => (
              <div key={i} className="space-y-1">
                <h4 className="font-medium">{office.city}</h4>
                <p className="text-muted-foreground">{office.address}</p>
                <p>{office.phone}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Expected Response Times
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone Support</span>
              <span className="font-medium">Immediate</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Live Chat</span>
              <span className="font-medium">Within 5 minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">Within 24 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Support Tickets</span>
              <span className="font-medium">Within 12 hours</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full gap-2"
          onClick={() => navigate("/support")}
        >
          <HelpCircle className="h-4 w-4" />
          Visit Help Center
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupportInfo;
