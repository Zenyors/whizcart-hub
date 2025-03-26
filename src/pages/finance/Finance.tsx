
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
        <div className="space-y-6">
          <PageHeader 
            title="Finance Management" 
            description="Manage payments, settlements, and financial operations"
          />
          
          <FinanceOverview />
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="settlements">Settlements</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
              <TabsTrigger value="refunds">Refunds</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <TransactionsSection limit={5} />
            </TabsContent>
            
            <TabsContent value="transactions">
              <TransactionsSection />
            </TabsContent>
            
            <TabsContent value="settlements">
              <SettlementsSection />
            </TabsContent>
            
            <TabsContent value="payouts">
              <PayoutsSection />
            </TabsContent>
            
            <TabsContent value="refunds">
              <RefundsSection />
            </TabsContent>
            
            <TabsContent value="analytics">
              <AnalyticsSection />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Finance;
