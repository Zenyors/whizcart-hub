
import React from "react";
import RevenueOrdersChart from "./RevenueOrdersChart";
import UserGrowthChart from "./UserGrowthChart";

interface ChartSectionProps {
  period: "daily" | "weekly" | "monthly" | "yearly";
}

const ChartSection: React.FC<ChartSectionProps> = ({ period }) => {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Revenue & Orders</h3>
          <span className="text-sm text-muted-foreground">{period.charAt(0).toUpperCase() + period.slice(1)} overview</span>
        </div>
        <div className="h-[300px]">
          <RevenueOrdersChart period={period} />
        </div>
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">User Growth</h3>
          <span className="text-sm text-muted-foreground">{period.charAt(0).toUpperCase() + period.slice(1)} statistics</span>
        </div>
        <div className="h-[300px]">
          <UserGrowthChart period={period} />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
