
import React from "react";
import { 
  Calendar, 
  CheckCircle,
  Truck, 
  AlertTriangle
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { VendorDetail } from "@/api/vendorApi";

interface VendorMetricsOverviewProps {
  vendor: VendorDetail;
}

const VendorMetricsOverview = ({ vendor }: VendorMetricsOverviewProps) => {
  const { metrics } = vendor;
  
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="On-Time Delivery"
        value={`${metrics.onTimeDelivery}%`}
        description="Last 30 days average"
        icon={Truck}
        trend={{ value: metrics.onTimeDeliveryTrend, positive: metrics.onTimeDeliveryTrend > 0 }}
        color="#3b82f6"
      />
      <StatCard
        title="Quality Score"
        value={`${metrics.qualityScore}/100`}
        description="Based on returns & feedback"
        icon={CheckCircle}
        trend={{ value: metrics.qualityScoreTrend, positive: metrics.qualityScoreTrend > 0 }}
        color="#10b981"
      />
      <StatCard
        title="Response Time"
        value={`${metrics.responseTime}h`}
        description="Average response to inquiries"
        icon={Calendar}
        trend={{ value: metrics.responseTimeTrend, positive: metrics.responseTimeTrend < 0 }}
        color="#f59e0b"
      />
      <StatCard
        title="Issue Rate"
        value={`${metrics.issueRate}%`}
        description="Problems per 100 orders"
        icon={AlertTriangle}
        trend={{ value: metrics.issueRateTrend, positive: metrics.issueRateTrend < 0 }}
        color="#ef4444"
      />
    </div>
  );
};

export default VendorMetricsOverview;
