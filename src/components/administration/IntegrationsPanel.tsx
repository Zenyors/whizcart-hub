
import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, ExternalLink, Info, MoreHorizontal, Plus, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface IntegrationCardProps {
  name: string;
  description: string;
  logo: string;
  status: "connected" | "disconnected" | "available";
  isNew?: boolean;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ 
  name, 
  description, 
  logo, 
  status, 
  isNew 
}) => {
  const handleToggle = () => {
    if (status === "connected") {
      toast.info(`${name} disconnected`);
    } else {
      toast.success(`${name} connected successfully`);
    }
  };

  return (
    <div className="border rounded-lg p-5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-muted w-10 h-10 rounded-md flex items-center justify-center overflow-hidden">
            <img src={logo} alt={name} className="w-8 h-8 object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{name}</h3>
              {isNew && (
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">New</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div>
          <Switch 
            checked={status === "connected"} 
            onCheckedChange={handleToggle} 
          />
        </div>
      </div>
      <div className="mt-auto pt-4 flex items-center justify-between border-t">
        <div>
          {status === "connected" ? (
            <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
              <Check className="h-3 w-3" /> Connected
            </Badge>
          ) : (
            <Badge variant="outline">Not Connected</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Info className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const IntegrationsPanel = () => {
  const integrations = [
    {
      name: "Payment Gateway",
      description: "Process credit card and online payments",
      logo: "https://cdn-icons-png.flaticon.com/512/6772/6772140.png",
      status: "connected" as const,
    },
    {
      name: "Email Marketing",
      description: "Send newsletters and automated emails",
      logo: "https://cdn-icons-png.flaticon.com/512/3178/3178158.png",
      status: "connected" as const,
    },
    {
      name: "Analytics",
      description: "Track website visitors and user behavior",
      logo: "https://cdn-icons-png.flaticon.com/512/8463/8463079.png",
      status: "connected" as const,
    },
    {
      name: "CRM System",
      description: "Manage customer relationships",
      logo: "https://cdn-icons-png.flaticon.com/512/4149/4149882.png",
      status: "disconnected" as const,
    },
    {
      name: "Social Media",
      description: "Connect your social media accounts",
      logo: "https://cdn-icons-png.flaticon.com/512/2626/2626269.png",
      status: "disconnected" as const,
    },
    {
      name: "Shipping Provider",
      description: "Integrate with shipping carriers",
      logo: "https://cdn-icons-png.flaticon.com/512/4961/4961689.png",
      status: "available" as const,
      isNew: true,
    },
    {
      name: "Tax Calculation",
      description: "Automated tax calculations service",
      logo: "https://cdn-icons-png.flaticon.com/512/1651/1651760.png",
      status: "available" as const,
    },
    {
      name: "Inventory Management",
      description: "Sync inventory across channels",
      logo: "https://cdn-icons-png.flaticon.com/512/2897/2897785.png",
      status: "available" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Available Integrations</h3>
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((integration, index) => (
          <IntegrationCard
            key={index}
            name={integration.name}
            description={integration.description}
            logo={integration.logo}
            status={integration.status}
            isNew={integration.isNew}
          />
        ))}
        
        <div className="border border-dashed rounded-lg p-5 flex flex-col items-center justify-center text-center gap-2 h-full">
          <div className="bg-muted w-10 h-10 rounded-full flex items-center justify-center">
            <Plus className="h-5 w-5" />
          </div>
          <h3 className="font-medium">Browse Marketplace</h3>
          <p className="text-sm text-muted-foreground">Find more integrations in our marketplace</p>
          <Button variant="outline" size="sm" className="mt-2 gap-1">
            <ExternalLink className="h-3 w-3" />
            Open Marketplace
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPanel;
