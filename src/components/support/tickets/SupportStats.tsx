
import React from "react";
import { StatCard } from "@/components/ui/stat-card";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

interface SupportStatsProps {
  stats: {
    open: number;
    inProgress: number;
    resolved: number;
    closed: number;
    urgent: number;
    avgResponseTime: string;
    firstResolutionTime: string;
  };
}

const SupportStats: React.FC<SupportStatsProps> = ({ stats }) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="Open Tickets" 
        value={stats.open}
        description="Waiting for response"
        icon={AlertCircle}
        trend={{ value: 3, positive: false }}
      />
      <StatCard 
        title="In Progress" 
        value={stats.inProgress}
        description="Currently being handled"
        icon={Clock}
      />
      <StatCard 
        title="Resolved" 
        value={stats.resolved + stats.closed}
        description="Successfully closed tickets"
        icon={CheckCircle}
        trend={{ value: 12, positive: true }}
      />
      <StatCard 
        title="Avg. Response Time" 
        value={stats.avgResponseTime}
        description="First response to customers"
        icon={Clock}
        trend={{ value: 8, positive: true }}
      />
    </div>
  );
};

export default SupportStats;
