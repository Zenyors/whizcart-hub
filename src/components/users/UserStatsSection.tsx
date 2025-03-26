
import React from "react";
import { UsersIcon, ShoppingCart, Star, Calendar } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

interface UserStatsSectionProps {
  totalUsers: number;
}

const UserStatsSection = ({ totalUsers }: UserStatsSectionProps) => {
  return (
    <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="Total Users" 
        value={totalUsers} 
        description="Active platform users"
        icon={UsersIcon}
        trend={{ value: 12, positive: true }}
      />
      <StatCard 
        title="Avg. Order Value" 
        value="$248.92" 
        description="Per user average"
        icon={ShoppingCart}
        trend={{ value: 5.2, positive: true }}
      />
      <StatCard 
        title="Loyalty Engagement" 
        value="72%" 
        description="Users in loyalty program"
        icon={Star}
        trend={{ value: 3.1, positive: true }}
      />
      <StatCard 
        title="30-Day Retention" 
        value="68%" 
        description="Users returning within 30 days"
        icon={Calendar}
        trend={{ value: 2.7, positive: false }}
      />
    </div>
  );
};

export default UserStatsSection;
