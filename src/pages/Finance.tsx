
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, TrendingDown, CreditCard, PieChart, BarChart3 } from "lucide-react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

const TransactionList = () => {
  const transactions = [
    { id: 1, date: "2023-09-10", description: "Order #12345", amount: "₹35,400", status: "Completed" },
    { id: 2, date: "2023-09-09", description: "Vendor Payout", amount: "₹12,750", status: "Completed" },
    { id: 3, date: "2023-09-08", description: "Refund #9876", amount: "₹2,300", status: "Pending" },
    { id: 4, date: "2023-09-07", description: "Order #12346", amount: "₹18,200", status: "Completed" },
    { id: 5, date: "2023-09-06", description: "Delivery Partner Payout", amount: "₹5,600", status: "Completed" },
    { id: 6, date: "2023-09-05", description: "Subscription Payment", amount: "₹15,000", status: "Failed" },
  ];

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-medium">Recent Transactions</h3>
        <a href="#" className="text-sm text-primary hover:underline">View All</a>
      </div>
      <div className="divide-y">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-muted/40 transition-colors">
            <div className="space-y-1">
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-muted-foreground">{transaction.date}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-medium">{transaction.amount}</span>
              <span className={`text-xs ${
                transaction.status === "Completed" ? "text-green-500" : 
                transaction.status === "Pending" ? "text-amber-500" : "text-red-500"
              }`}>
                {transaction.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RevenueBreakdown = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Revenue Breakdown</CardTitle>
        <CardDescription>Analysis of revenue sources</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-center py-4">
          <PieChart className="h-64 w-64 text-muted-foreground" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
              <span className="text-sm">Product Sales</span>
            </div>
            <p className="font-medium">₹825,400 (65%)</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm">Subscriptions</span>
            </div>
            <p className="font-medium">₹245,000 (19%)</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Service Fees</span>
            </div>
            <p className="font-medium">₹152,600 (12%)</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
              <span className="text-sm">Other Income</span>
            </div>
            <p className="font-medium">₹50,800 (4%)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PaymentMethodsAnalysis = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Analysis of payment methods used</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-center py-4">
          <BarChart3 className="h-64 w-64 text-muted-foreground" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
              <span className="text-sm">Credit/Debit Cards</span>
            </div>
            <p className="font-medium">42%</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm">UPI</span>
            </div>
            <p className="font-medium">35%</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Wallets</span>
            </div>
            <p className="font-medium">15%</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
              <span className="text-sm">Cash on Delivery</span>
            </div>
            <p className="font-medium">8%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Finance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const financeStats = [
    {
      title: "Total Revenue",
      value: "₹1,273,800",
      description: "Current financial year",
      icon: DollarSign,
      trend: { value: 12, positive: true },
    },
    {
      title: "Vendor Payouts",
      value: "₹865,450",
      description: "Current financial year",
      icon: CreditCard,
      trend: { value: 8, positive: true },
    },
    {
      title: "Profit Margin",
      value: "22.4%",
      description: "Average across all sales",
      icon: TrendingUp,
      trend: { value: 3, positive: true },
    },
    {
      title: "Refunds",
      value: "₹42,350",
      description: "Current financial year",
      icon: TrendingDown,
      trend: { value: 5, positive: false },
    },
  ];

  return (
    <div className="flex min-h-screen bg-muted/5">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : ""}`}>
        <Header 
          isSidebarOpen={sidebarOpen} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
        
        <main className="px-4 py-6 sm:px-6 lg:px-8 page-transition-container">
          <div className="mb-8 flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight">Finance Management</h1>
            <p className="text-muted-foreground">
              Comprehensive overview of financial data, transactions, and analytics.
            </p>
          </div>
          
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {financeStats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                trend={stat.trend}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              />
            ))}
          </div>
          
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid w-full grid-cols-4 h-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="payouts">Vendor Payouts</TabsTrigger>
              <TabsTrigger value="reports">Financial Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <RevenueBreakdown />
                <PaymentMethodsAnalysis />
              </div>
              <TransactionList />
            </TabsContent>
            
            <TabsContent value="transactions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Detailed view of all financial transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 bg-muted/40 p-4 font-medium border-b">
                      <div>Transaction ID</div>
                      <div>Date</div>
                      <div>Description</div>
                      <div>Amount</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-5 p-4 hover:bg-muted/40">
                          <div>TRX-{(100000 + i).toString().padStart(6, '0')}</div>
                          <div>{new Date(2023, 8, 15 - i).toLocaleDateString()}</div>
                          <div>{i % 3 === 0 ? 'Order Payment' : i % 3 === 1 ? 'Vendor Payout' : 'Refund'}</div>
                          <div>{i % 3 === 0 ? '₹' + (Math.floor(Math.random() * 50000) + 5000) : 
                                i % 3 === 1 ? '₹' + (Math.floor(Math.random() * 30000) + 5000) : 
                                '₹' + (Math.floor(Math.random() * 5000) + 1000)}</div>
                          <div className={`${i % 5 === 0 ? 'text-amber-500' : i % 7 === 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {i % 5 === 0 ? 'Pending' : i % 7 === 0 ? 'Failed' : 'Completed'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payouts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vendor Payouts</CardTitle>
                  <CardDescription>Manage and track all vendor payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 bg-muted/40 p-4 font-medium border-b">
                      <div>Payout ID</div>
                      <div>Vendor</div>
                      <div>Date</div>
                      <div>Amount</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    <div className="divide-y">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-6 p-4 hover:bg-muted/40">
                          <div>PAY-{(200000 + i).toString().padStart(6, '0')}</div>
                          <div className="font-medium">Vendor {i + 1}</div>
                          <div>{new Date(2023, 8, 15 - i).toLocaleDateString()}</div>
                          <div>₹{(Math.floor(Math.random() * 50000) + 10000).toLocaleString()}</div>
                          <div className={`${i % 4 === 0 ? 'text-amber-500' : i % 5 === 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {i % 4 === 0 ? 'Pending' : i % 5 === 0 ? 'Failed' : 'Completed'}
                          </div>
                          <div>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Reports</CardTitle>
                  <CardDescription>Generate and export financial reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Revenue Report</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Detailed breakdown of all revenue streams</p>
                        <Button className="w-full">Generate Report</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Vendor Payments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Summary of all payments made to vendors</p>
                        <Button className="w-full">Generate Report</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Tax Statement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Comprehensive tax information for filing</p>
                        <Button className="w-full">Generate Report</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Expense Report</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Detailed breakdown of all platform expenses</p>
                        <Button className="w-full">Generate Report</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Profit & Loss</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Overview of platform profitability</p>
                        <Button className="w-full">Generate Report</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Custom Report</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Create a custom financial report</p>
                        <Button className="w-full">Create Custom</Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Finance;
