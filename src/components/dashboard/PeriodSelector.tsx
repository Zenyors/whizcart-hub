
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PeriodSelectorProps {
  period: "daily" | "weekly" | "monthly" | "yearly";
  dateDisplayText: string;
  handlePeriodChange: (newPeriod: "daily" | "weekly" | "monthly" | "yearly") => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  period,
  dateDisplayText,
  handlePeriodChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <Tabs defaultValue={period} className="w-full sm:w-auto">
        <TabsList className="grid grid-cols-4 w-full sm:w-auto">
          <TabsTrigger value="daily" onClick={() => handlePeriodChange("daily")}>Daily</TabsTrigger>
          <TabsTrigger value="weekly" onClick={() => handlePeriodChange("weekly")}>Weekly</TabsTrigger>
          <TabsTrigger value="monthly" onClick={() => handlePeriodChange("monthly")}>Monthly</TabsTrigger>
          <TabsTrigger value="yearly" onClick={() => handlePeriodChange("yearly")}>Yearly</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <Button variant="outline" className="gap-2 w-full sm:w-auto">
        <Calendar className="h-4 w-4" />
        <span>{dateDisplayText}</span>
      </Button>
      
      <Button variant="ghost" className="text-primary w-full sm:w-auto">
        Live
      </Button>
    </div>
  );
};

export default PeriodSelector;
