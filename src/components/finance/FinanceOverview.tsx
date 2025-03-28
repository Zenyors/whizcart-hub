
import React from "react";
import { StatCard } from "@/components/ui/stat-card";
import { IndianRupee, TrendingUp, CreditCard, ReceiptIndianRupee, Wallet } from "lucide-react";

const FinanceOverview = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <StatCard 
        title="Total Revenue" 
        value="₹1,782,450"
        trend={{ value: 12, positive: true }}
        icon={IndianRupee}
        description="vs last period"
      />
      <StatCard 
        title="Pending Payouts" 
        value="₹258,670"
        trend={{ value: 8, positive: false }}
        icon={Wallet}
        description="vs last period"
      />
      <StatCard 
        title="Completed Settlements" 
        value="₹1,432,780"
        trend={{ value: 15, positive: true }}
        icon={ReceiptIndianRupee}
        description="vs last period"
      />
      <StatCard 
        title="Refunds" 
        value="₹87,230"
        trend={{ value: 5, positive: false }}
        icon={TrendingUp}
        description="vs last period"
      />
      <StatCard 
        title="Transactions" 
        value="18,392"
        trend={{ value: 23, positive: true }}
        icon={CreditCard}
        description="vs last period"
      />
    </div>
  );
};

export default FinanceOverview;
