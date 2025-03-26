import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, TrendingDown, CreditCard, PieChart, BarChart3 } from "lucide-react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { useToast } from "@/hooks/use-toast";

const Finance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    toast({
      title: sidebarOpen ? "Sidebar Collapsed" : "Sidebar Expanded",
      description: sidebarOpen ? "The sidebar has been collapsed." : "The sidebar has been expanded.",
    });
  };

  return (
    <div className="flex min-h-screen bg-muted/5">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : ""}`}>
        <Header 
          isSidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />
        
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight">Finance Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your financial data, transactions, and reports.
            </p>
          </div>
          
          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Revenue"
              value="$845,237.89"
              description="+21% from last month"
              icon={DollarSign}
              trend={{ direction: "up", value: "21%" }}
            />
            <StatCard
              title="Outstanding Balance"
              value="$45,637.12"
              description="-8% from last month"
              icon={CreditCard}
              trend={{ direction: "down", value: "8%" }}
            />
            <StatCard
              title="Vendor Payouts"
              value="$348,522.33"
              description="+15% from last month"
              icon={TrendingUp}
              trend={{ direction: "up", value: "15%" }}
            />
            <StatCard
              title="Operating Costs"
              value="$142,857.44"
              description="+3% from last month"
              icon={TrendingDown}
              trend={{ direction: "up", value: "3%" }}
            />
          </div>
          
          {/* Finance Tabs */}
          <Tabs defaultValue="transactions" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="payouts">Vendor Payouts</TabsTrigger>
              <TabsTrigger value="reports">Financial Reports</TabsTrigger>
              <TabsTrigger value="budget">Budget Planning</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Recent Transactions</span>
                    <Button variant="outline" size="sm">Export</Button>
                  </CardTitle>
                  <CardDescription>Detailed view of all recent financial transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 font-medium text-sm text-muted-foreground pb-2 border-b">
                      <div>Transaction ID</div>
                      <div>Date</div>
                      <div className="hidden md:block">Source</div>
                      <div className="hidden md:block">Category</div>
                      <div className="text-right">Amount</div>
                    </div>
                    
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-sm py-2 border-b">
                      <div className="font-medium">TRX-78943</div>
                      <div>05/15/2023</div>
                      <div className="hidden md:block">Online Store</div>
                      <div className="hidden md:block">Sales Revenue</div>
                      <div className="text-right font-medium text-green-600">+$4,325.00</div>
                    </div>
                    
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-sm py-2 border-b">
                      <div className="font-medium">TRX-78944</div>
                      <div>05/15/2023</div>
                      <div className="hidden md:block">Vendor Payment</div>
                      <div className="hidden md:block">Operating Expense</div>
                      <div className="text-right font-medium text-red-600">-$1,872.50</div>
                    </div>
                    
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-sm py-2 border-b">
                      <div className="font-medium">TRX-78945</div>
                      <div>05/14/2023</div>
                      <div className="hidden md:block">Mobile App</div>
                      <div className="hidden md:block">Sales Revenue</div>
                      <div className="text-right font-medium text-green-600">+$2,106.75</div>
                    </div>
                    
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-sm py-2 border-b">
                      <div className="font-medium">TRX-78946</div>
                      <div>05/14/2023</div>
                      <div className="hidden md:block">Subscription Fee</div>
                      <div className="hidden md:block">Service Revenue</div>
                      <div className="text-right font-medium text-green-600">+$899.00</div>
                    </div>
                    
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-sm py-2">
                      <div className="font-medium">TRX-78947</div>
                      <div>05/13/2023</div>
                      <div className="hidden md:block">Staff Payroll</div>
                      <div className="hidden md:block">Operating Expense</div>
                      <div className="text-right font-medium text-red-600">-$12,450.00</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payouts">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Vendor Payouts</span>
                    <Button variant="outline" size="sm">Process Payments</Button>
                  </CardTitle>
                  <CardDescription>Manage all vendor payment schedules and process payouts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 font-medium text-sm text-muted-foreground pb-2 border-b">
                      <div>Vendor</div>
                      <div>Due Date</div>
                      <div className="hidden md:block">Invoice Number</div>
                      <div className="hidden md:block">Status</div>
                      <div className="text-right">Amount</div>
                    </div>
                    
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-sm py-2 border-b">
                      <div className="font-medium">TechVendor Inc.</div>
                      <div>05/20/2023</div>
                      <div className="hidden md:block">INV-001234</div>
                      <div className="hidden md:block"><span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Pending</span></div>
                      <div className="text-right font-medium">$12,750.00</div>
                    </div>
                    
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-sm py-2 border-b">
                      <div className="font-medium">Global Supplies Co.</div>
                      <div>05/22/2023</div>
                      <div className="hidden md:block">INV-005634</div>
                      <div className="hidden md:block"><span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Scheduled</span></div>
                      <div className="text-right font-medium">$8,432.25</div>
                    </div>
                    
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-sm py-2 border-b">
                      <div className="font-medium">Quality Products LLC</div>
                      <div>05/18/2023</div>
                      <div className="hidden md:block">INV-000987</div>
                      <div className="hidden md:block"><span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Overdue</span></div>
                      <div className="text-right font-medium">$6,318.90</div>
                    </div>
                    
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-sm py-2 border-b">
                      <div className="font-medium">Fresh Foods Intl.</div>
                      <div>05/25/2023</div>
                      <div className="hidden md:block">INV-002345</div>
                      <div className="hidden md:block"><span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Scheduled</span></div>
                      <div className="text-right font-medium">$9,751.00</div>
                    </div>
                    
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-sm py-2">
                      <div className="font-medium">Delivery Partners Inc.</div>
                      <div>05/19/2023</div>
                      <div className="hidden md:block">INV-004321</div>
                      <div className="hidden md:block"><span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">In Review</span></div>
                      <div className="text-right font-medium">$15,287.75</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <span>Revenue Analysis</span>
                      <Button variant="outline" size="sm">View Details</Button>
                    </CardTitle>
                    <CardDescription>Monthly revenue breakdown by category</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center">
                    <div className="h-80 w-full flex items-center justify-center">
                      <PieChart className="h-60 w-60 text-muted-foreground/50" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <span>Expense Breakdown</span>
                      <Button variant="outline" size="sm">View Details</Button>
                    </CardTitle>
                    <CardDescription>Quarterly expense analysis by department</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center">
                    <div className="h-80 w-full flex items-center justify-center">
                      <BarChart3 className="h-60 w-60 text-muted-foreground/50" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="budget">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Budget Planning</span>
                    <Button variant="outline" size="sm">Adjust Budget</Button>
                  </CardTitle>
                  <CardDescription>Manage departmental budgets and track spending</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium">Marketing Department</div>
                        <div className="text-sm text-muted-foreground">$45,000 / $60,000</div>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-2 rounded-full bg-primary" style={{width: "75%"}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium">Operations</div>
                        <div className="text-sm text-muted-foreground">$78,000 / $85,000</div>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-2 rounded-full bg-amber-500" style={{width: "92%"}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium">Product Development</div>
                        <div className="text-sm text-muted-foreground">$120,000 / $200,000</div>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-2 rounded-full bg-primary" style={{width: "60%"}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium">Customer Support</div>
                        <div className="text-sm text-muted-foreground">$32,000 / $40,000</div>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-2 rounded-full bg-amber-500" style={{width: "80%"}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium">Infrastructure & IT</div>
                        <div className="text-sm text-muted-foreground">$67,000 / $90,000</div>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-2 rounded-full bg-primary" style={{width: "74%"}}></div>
                      </div>
                    </div>
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
