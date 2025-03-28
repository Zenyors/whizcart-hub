
import React from "react";
import PeriodSelector from "./PeriodSelector";

interface DashboardHeaderProps {
  period: "daily" | "weekly" | "monthly" | "yearly";
  dateDisplayText: string;
  handlePeriodChange: (newPeriod: "daily" | "weekly" | "monthly" | "yearly") => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  period,
  dateDisplayText,
  handlePeriodChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of our whizcart platform
        </p>
      </div>
      
      <PeriodSelector
        period={period}
        dateDisplayText={dateDisplayText}
        handlePeriodChange={handlePeriodChange}
      />
    </div>
  );
};

export default DashboardHeader;
