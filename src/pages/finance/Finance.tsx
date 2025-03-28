
import React from "react";
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { useToast } from "@/hooks/use-toast";
import TransactionsSection from "@/components/finance/TransactionsSection";
import AnalyticsSection from "@/components/finance/AnalyticsSection";
import SettlementsSection from "@/components/finance/SettlementsSection";
import RefundsSection from "@/components/finance/RefundsSection";
import PayoutsSection from "@/components/finance/PayoutsSection";
import FinanceOverview from "@/components/finance/FinanceOverview";

const Finance = () => {
  const { toast } = useToast();

  return (
    <>
      <Helmet>
        <title>Finance Management | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="space-y-8">
          <PageHeader 
            title="Finance Management" 
            description="Manage payments, settlements, and financial operations"
          />
          
          <FinanceOverview />
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 w-full justify-start text-base">
              <TabsTrigger value="overview" className="px-4 py-2">Overview</TabsTrigger>
              <TabsTrigger value="transactions" className="px-4 py-2">Transactions</TabsTrigger>
              <TabsTrigger value="settlements" className="px-4 py-2">Settlements</TabsTrigger>
              <TabsTrigger value="payouts" className="px-4 py-2">Payouts</TabsTrigger>
              <TabsTrigger value="refunds" className="px-4 py-2">Refunds</TabsTrigger>
              <TabsTrigger value="analytics" className="px-4 py-2">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-2">
              <TransactionsSection limit={5} />
            </TabsContent>
            
            <TabsContent value="transactions" className="mt-2">
              <TransactionsSection />
            </TabsContent>
            
            <TabsContent value="settlements" className="mt-2">
              <SettlementsSection />
            </TabsContent>
            
            <TabsContent value="payouts" className="mt-2">
              <PayoutsSection />
            </TabsContent>
            
            <TabsContent value="refunds" className="mt-2">
              <RefundsSection />
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-2">
              <AnalyticsSection />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Finance;
