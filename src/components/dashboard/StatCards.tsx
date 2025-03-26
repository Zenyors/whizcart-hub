
import React from "react";
import { Users, ShoppingBag, DollarSign, Package } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

const StatCards = () => {
  const stats = [
    {
      title: "Total Users",
      value: "24.5K",
      description: "Active users across all platforms",
      icon: Users,
      trend: { value: 12, positive: true },
    },
    {
      title: "Total Orders",
      value: "12,936",
      description: "Orders processed this month",
      icon: ShoppingBag,
      trend: { value: 8, positive: true },
    },
    {
      title: "Revenue",
      value: "₹1.2M",
      description: "Total revenue this month",
      icon: DollarSign,
      trend: { value: 5, positive: true },
    },
    {
      title: "Inventory",
      value: "4,287",
      description: "Products in inventory",
      icon: Package,
      trend: { value: 2, positive: false },
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          trend={stat.trend}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        />
      ))}
    </div>
  );
};

export default StatCards;
