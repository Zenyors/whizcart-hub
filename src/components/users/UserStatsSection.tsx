
import React from "react";
import { UsersIcon, ShoppingCart, Star, Calendar } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

export interface UserStat {
  id: string;
  title: string;
  value: number | string;
  description: string;
  icon: React.ComponentType<any>;
  trend: { value: number; positive: boolean };
  color?: string;
}

interface UserStatsSectionProps {
  totalUsers: number;
  customStats?: UserStat[];
  isLoading?: boolean;
}

const defaultStats = (totalUsers: number): UserStat[] => [
  {
    id: "total-users",
    title: "Total Users",
    value: totalUsers,
    description: "Active platform users",
    icon: UsersIcon,
    trend: { value: 12, positive: true },
    color: "#3b82f6" // blue
  },
  {
    id: "avg-order",
    title: "Avg. Order Value",
    value: "$248.92",
    description: "Per user average",
    icon: ShoppingCart,
    trend: { value: 5.2, positive: true },
    color: "#10b981" // emerald
  },
  {
    id: "loyalty",
    title: "Loyalty Engagement",
    value: "72%",
    description: "Users in loyalty program",
    icon: Star,
    trend: { value: 3.1, positive: true },
    color: "#f59e0b" // amber
  },
  {
    id: "retention",
    title: "30-Day Retention",
    value: "68%",
    description: "Users returning within 30 days",
    icon: Calendar,
    trend: { value: 2.7, positive: false },
    color: "#ef4444" // red
  }
];

const UserStatsSection = ({ 
  totalUsers, 
  customStats, 
  isLoading = false 
}: UserStatsSectionProps) => {
  // Use customStats if provided, otherwise use defaultStats
  const stats = customStats || defaultStats(totalUsers);

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

export default UserStatsSection;
