
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      />
      <StatCard 
        title="Pending Payouts" 
        value="₹258,670"
        trend={{ value: 8, positive: false }}
        icon={Wallet}
      />
      <StatCard 
        title="Completed Settlements" 
        value="₹1,432,780"
        trend={{ value: 15, positive: true }}
        icon={ReceiptIndianRupee}
      />
      <StatCard 
        title="Refunds" 
        value="₹87,230"
        trend={{ value: 5, positive: false }}
        icon={TrendingUp}
      />
      <StatCard 
        title="Transactions" 
        value="18,392"
        trend={{ value: 23, positive: true }}
        icon={CreditCard}
      />
    </div>
  );
};

export default FinanceOverview;
