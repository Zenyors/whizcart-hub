
import React from "react";
import ProductCategoriesChart from "./ProductCategoriesChart";
import RecentOrdersTable from "./RecentOrdersTable";

interface DataAnalyticsSectionProps {
  period: "daily" | "weekly" | "monthly" | "yearly";
}

const DataAnalyticsSection: React.FC<DataAnalyticsSectionProps> = ({ period }) => {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <ProductCategoriesChart period={period} />
      <RecentOrdersTable period={period} />
    </div>
  );
};

export default DataAnalyticsSection;
