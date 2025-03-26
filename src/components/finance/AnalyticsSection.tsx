
import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Download, TrendingUp, BarChart3, PieChart, Calendar, ArrowUpDown, IndianRupee, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for revenue chart
const revenueData = [
  { month: "Jan", revenue: 125400, expenses: 45200, profit: 80200 },
  { month: "Feb", revenue: 145750, expenses: 48900, profit: 96850 },
  { month: "Mar", revenue: 158300, expenses: 52600, profit: 105700 },
  { month: "Apr", revenue: 172450, expenses: 54800, profit: 117650 },
  { month: "May", revenue: 168200, expenses: 53100, profit: 115100 },
  { month: "Jun", revenue: 178450, expenses: 56700, profit: 121750 },
];

// Mock data for payment methods
const paymentMethodsData = [
  { name: "Credit Card", value: 45 },
  { name: "UPI", value: 30 },
  { name: "Net Banking", value: 15 },
  { name: "Debit Card", value: 8 },
  { name: "Wallet", value: 2 },
];

// Mock data for transaction types
const transactionTypesData = [
  { name: "Orders", count: 1245 },
  { name: "Refunds", count: 145 },
  { name: "Vendor Payouts", count: 78 },
  { name: "Delivery Payouts", count: 65 },
];

// Mock data for top vendors by revenue
const topVendorsData = [
  { name: "Fresh Foods Market", revenue: 245800 },
  { name: "Global Distributors", revenue: 186500 },
  { name: "Organic Harvest", revenue: 142700 },
  { name: "Sunshine Textiles", revenue: 98500 },
  { name: "Spice Junction", revenue: 87600 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"];

const AnalyticsSection = () => {
  const { toast } = useToast();
  const [timePeriod, setTimePeriod] = useState("6months");
  
  const downloadReport = () => {
    toast({
      title: "Report Download",
      description: "Financial analytics report is being generated and will download shortly.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Financial Analytics</h2>
          <p className="text-muted-foreground">Analyze your financial performance and trends</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
              <SelectItem value="alltime">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2" onClick={downloadReport}>
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  Revenue & Profit
                </CardTitle>
                <CardDescription>Monthly revenue and profit trends</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
                    <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-muted-foreground" />
                  Payment Methods
                </CardTitle>
                <CardDescription>Distribution of payment methods used</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={paymentMethodsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentMethodsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  Transaction Types
                </CardTitle>
                <CardDescription>Distribution of financial transactions</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transactionTypesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()}`} />
                    <Bar dataKey="count" fill="#8884d8" name="Count" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
                  Top Vendors by Revenue
                </CardTitle>
                <CardDescription>Highest earning vendor partners</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topVendorsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                    <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Detailed revenue analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                    <Bar dataKey="expenses" fill="#ff8042" name="Expenses" />
                    <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue KPIs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Average Order Value", value: "₹1,245", trend: "+5.2% from last period" },
                    { label: "Gross Profit Margin", value: "62.4%", trend: "+1.8% from last period" },
                    { label: "Net Profit Margin", value: "28.6%", trend: "+0.5% from last period" },
                    { label: "Revenue per Customer", value: "₹3,450", trend: "+7.1% from last period" },
                  ].map((kpi, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{kpi.label}</p>
                        <p className="text-sm text-muted-foreground">{kpi.trend}</p>
                      </div>
                      <div className="text-xl font-bold">{kpi.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={[
                        { name: "Electronics", value: 35 },
                        { name: "Clothing", value: 25 },
                        { name: "Groceries", value: 20 },
                        { name: "Home Goods", value: 15 },
                        { name: "Others", value: 5 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentMethodsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
                <CardDescription>Monthly transaction counts by type</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { month: "Jan", orders: 845, refunds: 42, vendorPayouts: 28, deliveryPayouts: 24 },
                    { month: "Feb", orders: 920, refunds: 38, vendorPayouts: 32, deliveryPayouts: 26 },
                    { month: "Mar", orders: 980, refunds: 45, vendorPayouts: 35, deliveryPayouts: 28 },
                    { month: "Apr", orders: 1050, refunds: 52, vendorPayouts: 38, deliveryPayouts: 30 },
                    { month: "May", orders: 1120, refunds: 48, vendorPayouts: 42, deliveryPayouts: 32 },
                    { month: "Jun", orders: 1245, refunds: 58, vendorPayouts: 45, deliveryPayouts: 36 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" stackId="a" fill="#8884d8" name="Orders" />
                    <Bar dataKey="refunds" stackId="a" fill="#ff8042" name="Refunds" />
                    <Bar dataKey="vendorPayouts" stackId="a" fill="#82ca9d" name="Vendor Payouts" />
                    <Bar dataKey="deliveryPayouts" stackId="a" fill="#ffc658" name="Delivery Payouts" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Success Rate</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { month: "Jan", success: 98.2 },
                    { month: "Feb", success: 98.5 },
                    { month: "Mar", success: 97.8 },
                    { month: "Apr", success: 99.1 },
                    { month: "May", success: 98.7 },
                    { month: "Jun", success: 99.3 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[96, 100]} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Line type="monotone" dataKey="success" stroke="#82ca9d" name="Success Rate" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Transaction Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Average Transaction Value", value: "₹1,450", trend: "+3.2% from last period" },
                    { label: "Transaction Success Rate", value: "99.3%", trend: "+0.6% from last period" },
                    { label: "Payment Gateway Fees", value: "₹24,580", trend: "+5.1% from last period" },
                    { label: "Failed Transaction Rate", value: "0.7%", trend: "-0.6% from last period" },
                  ].map((metric, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{metric.label}</p>
                        <p className="text-sm text-muted-foreground">{metric.trend}</p>
                      </div>
                      <div className="text-xl font-bold">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="vendors" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Revenue Contribution</CardTitle>
                <CardDescription>Top 10 vendors by revenue contribution</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topVendorsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Payout Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Total Vendor Payouts", value: "₹845,250", trend: "+12.5% from last period" },
                    { label: "Average Payout Amount", value: "₹24,150", trend: "+5.2% from last period" },
                    { label: "Average Processing Time", value: "2.4 days", trend: "-0.3 days from last period" },
                    { label: "Failed Payout Rate", value: "0.5%", trend: "-0.2% from last period" },
                  ].map((metric, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{metric.label}</p>
                        <p className="text-sm text-muted-foreground">{metric.trend}</p>
                      </div>
                      <div className="text-xl font-bold">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Vendors Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topVendorsData.slice(0, 5).map((vendor, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Store className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{vendor.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {["Weekly", "Bi-weekly", "Monthly"][index % 3]} payouts
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        <span className="text-md font-bold">{vendor.revenue.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsSection;
