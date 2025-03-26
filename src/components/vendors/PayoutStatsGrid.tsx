
import React from "react";
import { Wallet, BanknoteIcon, RefreshCw, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PayoutStatsProps {
  stats: {
    totalPending: number;
    totalPaid: number;
    averageProcessingTime: number;
    monthlyChange: number;
  };
}

const PayoutStatsGrid = ({ stats }: PayoutStatsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">${stats.totalPaid.toLocaleString()}</div>
            <div className="rounded-full bg-green-100 p-2 text-green-600">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">${stats.totalPending.toLocaleString()}</div>
            <div className="rounded-full bg-yellow-100 p-2 text-yellow-600">
              <BanknoteIcon className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Average Processing Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{stats.averageProcessingTime} days</div>
            <div className="rounded-full bg-blue-100 p-2 text-blue-600">
              <RefreshCw className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Monthly Change</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              {stats.monthlyChange > 0 ? '+' : ''}{stats.monthlyChange}%
            </div>
            <div className={`rounded-full p-2 ${stats.monthlyChange >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {stats.monthlyChange >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayoutStatsGrid;
