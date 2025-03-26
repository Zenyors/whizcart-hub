import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { IndianRupee, TrendingUp, TrendingDown, CreditCard, PieChart, BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { useToast } from "@/hooks/use-toast";

const Finance = () => {
  const { toast } = useToast();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="Finance Management" description="Monitor your company's financial health and manage payments." />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Revenue" 
            value="₹1,782,450"
            trend={{ value: 12, positive: true }}
            icon={IndianRupee}
          />
          <StatCard 
            title="Monthly Revenue" 
            value="₹258,670"
            trend={{ value: 8, positive: true }}
            icon={TrendingUp}
          />
          <StatCard 
            title="Expenses" 
            value="₹87,230"
            trend={{ value: 5, positive: false }}
            icon={TrendingDown}
          />
          <StatCard 
            title="Transactions" 
            value="18,392"
            trend={{ value: 23, positive: true }}
            icon={CreditCard}
          />
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="vendor-payouts">Vendor Payouts</TabsTrigger>
            <TabsTrigger value="reports">Financial Reports</TabsTrigger>
            <TabsTrigger value="settings">Finance Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Revenue by product category</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <div className="flex h-60 w-full items-center justify-center rounded-md border-2 border-dashed">
                    <PieChart className="h-10 w-10 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Revenue Chart</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>Revenue and expense trends</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <div className="flex h-60 w-full items-center justify-center rounded-md border-2 border-dashed">
                    <BarChart3 className="h-10 w-10 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Trends Chart</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Financial Activities</CardTitle>
                    <CardDescription>A summary of recent financial activities</CardDescription>
                  </div>
                  <Button variant="outline">Export</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-primary/10 p-2">
                          <IndianRupee className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Transaction #{1000 + i}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(2023, 5, 15 - i).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{(1000 - i * 125).toLocaleString('en-IN')}</p>
                        <p className="text-sm text-muted-foreground">
                          {i % 2 === 0 ? "Completed" : "Pending"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>All financial transactions</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Filter</Button>
                    <Button variant="outline">Export</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 border-b bg-muted/50 px-4 py-2 font-medium">
                    <div>ID</div>
                    <div>Date</div>
                    <div>Description</div>
                    <div>Amount</div>
                    <div>Status</div>
                  </div>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="grid grid-cols-5 border-b px-4 py-3 last:border-0">
                      <div>#{10045 + i}</div>
                      <div>{new Date(2023, 5, 20 - i).toLocaleDateString()}</div>
                      <div>
                        {[
                          "Product purchase",
                          "Vendor payout",
                          "Subscription fee",
                          "Refund processing",
                          "Marketing expense",
                        ][i % 5]}
                      </div>
                      <div className={i % 3 === 0 ? "text-red-500" : "text-green-500"}>
                        {i % 3 === 0 ? "-" : "+"}₹{(500 + i * 125).toLocaleString('en-IN')}
                      </div>
                      <div>
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            ["bg-green-100 text-green-700", "bg-yellow-100 text-yellow-700", "bg-red-100 text-red-700"][
                              i % 3
                            ]
                          }`}
                        >
                          {["Completed", "Pending", "Failed"][i % 3]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vendor-payouts" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Vendor Payouts</CardTitle>
                    <CardDescription>Manage payments to vendors</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Schedule Payouts</Button>
                    <Button>New Payout</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 border-b bg-muted/50 px-4 py-2 font-medium">
                    <div>Vendor</div>
                    <div>Amount</div>
                    <div>Schedule</div>
                    <div>Last Payout</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="grid grid-cols-6 border-b px-4 py-3 last:border-0">
                      <div className="font-medium">Vendor {i + 1}</div>
                      <div>₹{(1500 + i * 750).toLocaleString('en-IN')}</div>
                      <div>{["Weekly", "Bi-weekly", "Monthly"][i % 3]}</div>
                      <div>{new Date(2023, 5, 15 - i * 7).toLocaleDateString()}</div>
                      <div>
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            ["bg-green-100 text-green-700", "bg-yellow-100 text-yellow-700"][i % 2]
                          }`}
                        >
                          {["Paid", "Scheduled"][i % 2]}
                        </span>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Financial Reports</CardTitle>
                    <CardDescription>Generate and view financial reports</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Download All</Button>
                    <Button>Generate Report</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Monthly Revenue Report",
                    "Quarterly Financial Statement",
                    "Annual Tax Report",
                    "Vendor Payment Summary",
                    "Expense Breakdown",
                  ].map((report, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-primary/10 p-2">
                          <BarChart3 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{report}</p>
                          <p className="text-sm text-muted-foreground">
                            Generated on {new Date(2023, 5, 1 - i * 10).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Finance Settings</CardTitle>
                <CardDescription>Configure financial preferences and payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    "Payment Gateway Configuration",
                    "Tax Settings",
                    "Currency Preferences",
                    "Invoice Templates",
                    "Payment Reminders",
                    "Accounting Integration",
                  ].map((setting, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <p className="font-medium">{setting}</p>
                        <p className="text-sm text-muted-foreground">
                          {[
                            "Configure your payment gateway settings",
                            "Set up tax rates and calculations",
                            "Set your preferred currency and formats",
                            "Customize invoice templates",
                            "Configure automatic payment reminders",
                            "Connect to accounting software",
                          ][i]}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Configure
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Finance;
