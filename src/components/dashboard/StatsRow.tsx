
import React from "react";
import { StatCard } from "@/components/ui/stat-card";
import { LucideIcon } from "lucide-react";

interface StatItem {
  title: string;
  value: string;
  trend: {
    value: number;
    positive: boolean;
  };
  icon: LucideIcon;
  description: string;
}

interface StatsRowProps {
  stats: StatItem[];
}

const StatsRow: React.FC<StatsRowProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          trend={stat.trend}
          icon={stat.icon}
          description={stat.description}
        />
      ))}
    </div>
  );
};

export default StatsRow;
