
import React from "react";
import { 
  Store, 
  ShoppingCart, 
  Truck, 
  Calendar, 
  type LucideIcon 
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

export interface VendorStat {
  id: string;
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
  trend: { value: number; positive: boolean };
  color?: string;
}

interface VendorStatsSectionProps {
  totalVendors: number;
  customStats?: VendorStat[];
  isLoading?: boolean;
}

const defaultStats = (totalVendors: number): VendorStat[] => [
  {
    id: "total-vendors",
    title: "Active Vendors",
    value: totalVendors,
    description: "Total active suppliers",
    icon: Store,
    trend: { value: 5, positive: true },
    color: "#3b82f6" // blue
  },
  {
    id: "avg-fulfillment",
    title: "Avg. Fulfillment",
    value: "94.3%",
    description: "Order fulfillment rate",
    icon: ShoppingCart,
    trend: { value: 2.1, positive: true },
    color: "#10b981" // emerald
  },
  {
    id: "on-time-delivery",
    title: "On-Time Delivery",
    value: "92%",
    description: "Last 30 days average",
    icon: Truck,
    trend: { value: 1.5, positive: true },
    color: "#f59e0b" // amber
  },
  {
    id: "response-time",
    title: "Avg. Response Time",
    value: "4.2h",
    description: "Time to respond to inquiries",
    icon: Calendar,
    trend: { value: 8.3, positive: false },
    color: "#ef4444" // red
  }
];

const VendorStatsSection = ({ 
  totalVendors, 
  customStats, 
  isLoading = false 
}: VendorStatsSectionProps) => {
  // Use customStats if provided, otherwise use defaultStats
  const stats = customStats || defaultStats(totalVendors);

  return (
    <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          trend={stat.trend}
          isLoading={isLoading}
          style={{ borderTopColor: stat.color }}
          className="h-full"
        />
      ))}
    </div>
  );
};

export default VendorStatsSection;
