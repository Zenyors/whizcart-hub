import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Download,
  Users,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Map
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Helmet } from "react-helmet";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Mock data
const monthlyActiveUsers = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1350 },
  { month: "Mar", users: 1400 },
  { month: "Apr", users: 1250 },
  { month: "May", users: 1500 },
  { month: "Jun", users: 1600 },
  { month: "Jul", users: 1800 },
  { month: "Aug", users: 2000 },
  { month: "Sep", users: 2200 },
  { month: "Oct", users: 2400 },
  { month: "Nov", users: 2600 },
  { month: "Dec", users: 2800 },
];

const userRetentionData = [
  { name: "Week 1", retention: 100 },
  { name: "Week 2", retention: 85 },
  { name: "Week 3", retention: 75 },
  { name: "Week 4", retention: 70 },
  { name: "Week 5", retention: 65 },
  { name: "Week 6", retention: 60 },
  { name: "Week 7", retention: 58 },
  { name: "Week 8", retention: 55 },
];

const segmentData = [
  { name: "New", value: 20 },
  { name: "Returning", value: 30 },
  { name: "Regular", value: 35 },
  { name: "VIP", value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const deviceData = [
  { name: "Mobile", value: 65 },
  { name: "Desktop", value: 30 },
  { name: "Tablet", value: 5 },
];

const DEVICE_COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const geographicData = [
  { region: "North America", users: 4500, revenue: 125000 },
  { region: "Europe", users: 3200, revenue: 95000 },
  { region: "Asia", users: 2800, revenue: 85000 },
  { region: "South America", users: 1200, revenue: 35000 },
  { region: "Africa", users: 800, revenue: 22000 },
  { region: "Oceania", users: 500, revenue: 18000 },
];

const UserAnalytics = () => {
  const [timeframe, setTimeframe] = useState("yearly");
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>User Analytics | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              className="mb-4 flex items-center gap-1 pl-0 hover:pl-2 transition-all duration-200"
              onClick={() => navigate("/users")}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Users</span>
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">User Analytics</h1>
                <p className="text-muted-foreground">
                  Comprehensive analytics about your user base performance
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Select defaultValue={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Last 7 days</SelectItem>
                    <SelectItem value="monthly">Last 30 days</SelectItem>
                    <SelectItem value="quarterly">Last 90 days</SelectItem>
                    <SelectItem value="yearly">Last 12 months</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              title="Total Users" 
              value="28,429" 
              description="All registered users"
              icon={Users}
              trend={{ value: 12.5, positive: true }}
            />
            <StatCard 
              title="Active Users" 
              value="16,842" 
              description="Active in last 30 days"
              icon={Calendar}
              trend={{ value: 8.2, positive: true }}
            />
            <StatCard 
              title="Conversion Rate" 
              value="3.8%" 
              description="Visitors to customers"
              icon={ArrowUpRight}
              trend={{ value: 1.2, positive: true }}
            />
            <StatCard 
              title="Churn Rate" 
              value="1.2%" 
              description="Monthly user loss"
              icon={ArrowDownRight}
              trend={{ value: 0.3, positive: false }}
            />
          </div>
          
          <Tabs defaultValue="growth" className="mb-8">
            <TabsList className="grid w-full grid-cols-5 md:w-auto">
              <TabsTrigger value="growth">Growth</TabsTrigger>
              <TabsTrigger value="retention">Retention</TabsTrigger>
              <TabsTrigger value="segments">Segments</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="geography">Geography</TabsTrigger>
            </TabsList>
            
            <TabsContent value="growth" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Monthly active users over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyActiveUsers}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="users" fill="#3b82f6" name="Active Users" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Acquisition Channels</CardTitle>
                    <CardDescription>Where users are coming from</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Organic Search</span>
                          <span className="text-xs text-muted-foreground">Google, Bing, etc.</span>
                        </div>
                        <span className="font-medium">32%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Direct</span>
                          <span className="text-xs text-muted-foreground">Direct URL entry</span>
                        </div>
                        <span className="font-medium">27%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Social Media</span>
                          <span className="text-xs text-muted-foreground">Facebook, Instagram, etc.</span>
                        </div>
                        <span className="font-medium">21%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Referrals</span>
                          <span className="text-xs text-muted-foreground">User referrals</span>
                        </div>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Email</span>
                          <span className="text-xs text-muted-foreground">Email campaigns</span>
                        </div>
                        <span className="font-medium">5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Growth Rate</CardTitle>
                    <CardDescription>New user acquisition trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { month: "Jan", rate: 3.2 },
                            { month: "Feb", rate: 3.5 },
                            { month: "Mar", rate: 4.0 },
                            { month: "Apr", rate: 3.8 },
                            { month: "May", rate: 4.2 },
                            { month: "Jun", rate: 4.5 },
                            { month: "Jul", rate: 5.0 },
                            { month: "Aug", rate: 5.5 },
                            { month: "Sep", rate: 6.0 },
                            { month: "Oct", rate: 6.2 },
                            { month: "Nov", rate: 6.5 },
                            { month: "Dec", rate: 6.8 },
                          ]}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value}%`, 'Growth Rate']} />
                          <Line type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="retention" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Retention</CardTitle>
                  <CardDescription>Weekly cohort retention trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={userRetentionData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, 'Retention Rate']} />
                        <Line type="monotone" dataKey="retention" stroke="#82ca9d" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Churn Analysis</CardTitle>
                    <CardDescription>Reasons for user churn</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Product Issues</span>
                          <span className="text-xs text-muted-foreground">Missing features, quality</span>
                        </div>
                        <span className="font-medium">34%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Pricing</span>
                          <span className="text-xs text-muted-foreground">Too expensive</span>
                        </div>
                        <span className="font-medium">28%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Competitors</span>
                          <span className="text-xs text-muted-foreground">Chose a competitor</span>
                        </div>
                        <span className="font-medium">20%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Customer Service</span>
                          <span className="text-xs text-muted-foreground">Poor support</span>
                        </div>
                        <span className="font-medium">12%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Other</span>
                          <span className="text-xs text-muted-foreground">Various reasons</span>
                        </div>
                        <span className="font-medium">6%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Metrics</CardTitle>
                    <CardDescription>User interaction frequency</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Daily Active Users</span>
                          <span className="text-xs text-muted-foreground">Use app every day</span>
                        </div>
                        <span className="font-medium">5,231</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Weekly Active Users</span>
                          <span className="text-xs text-muted-foreground">Use app weekly</span>
                        </div>
                        <span className="font-medium">12,574</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Monthly Active Users</span>
                          <span className="text-xs text-muted-foreground">Use app monthly</span>
                        </div>
                        <span className="font-medium">16,842</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Avg. Session Duration</span>
                          <span className="text-xs text-muted-foreground">Time spent per session</span>
                        </div>
                        <span className="font-medium">8.5 min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Sessions per User</span>
                          <span className="text-xs text-muted-foreground">Monthly average</span>
                        </div>
                        <span className="font-medium">12.2</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="segments" className="space-y-6 pt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>User Segments</CardTitle>
                    <CardDescription>Distribution by user type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={segmentData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {segmentData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Segment Performance</CardTitle>
                    <CardDescription>Revenue and activity by segment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: "New", orders: 1.2, revenue: 120 },
                            { name: "Returning", orders: 3.5, revenue: 350 },
                            { name: "Regular", orders: 8.2, revenue: 820 },
                            { name: "VIP", orders: 12.5, revenue: 2500 },
                          ]}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                          <Tooltip />
                          <Legend />
                          <Bar yAxisId="left" dataKey="orders" fill="#8884d8" name="Avg. Orders/Month" />
                          <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Avg. Revenue/Month ($)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Segment Characteristics</CardTitle>
                    <CardDescription>Key metrics by user segment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-3 text-left font-medium">Segment</th>
                            <th className="px-4 py-3 text-left font-medium">Size</th>
                            <th className="px-4 py-3 text-left font-medium">Avg. Order Value</th>
                            <th className="px-4 py-3 text-left font-medium">Purchase Frequency</th>
                            <th className="px-4 py-3 text-left font-medium">Retention Rate</th>
                            <th className="px-4 py-3 text-left font-medium">Lifetime Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="px-4 py-3">New</td>
                            <td className="px-4 py-3">20%</td>
                            <td className="px-4 py-3">$85</td>
                            <td className="px-4 py-3">1.2 orders/month</td>
                            <td className="px-4 py-3">32%</td>
                            <td className="px-4 py-3">$250</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3">Returning</td>
                            <td className="px-4 py-3">30%</td>
                            <td className="px-4 py-3">$105</td>
                            <td className="px-4 py-3">2.1 orders/month</td>
                            <td className="px-4 py-3">48%</td>
                            <td className="px-4 py-3">$520</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3">Regular</td>
                            <td className="px-4 py-3">35%</td>
                            <td className="px-4 py-3">$125</td>
                            <td className="px-4 py-3">3.4 orders/month</td>
                            <td className="px-4 py-3">72%</td>
                            <td className="px-4 py-3">$1,250</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">VIP</td>
                            <td className="px-4 py-3">15%</td>
                            <td className="px-4 py-3">$210</td>
                            <td className="px-4 py-3">5.8 orders/month</td>
                            <td className="px-4 py-3">92%</td>
                            <td className="px-4 py-3">$4,800</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="devices" className="space-y-6 pt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Device Usage</CardTitle>
                    <CardDescription>Users by device type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={deviceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {deviceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Mobile Device Breakdown</CardTitle>
                    <CardDescription>Mobile users by platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: "iOS", users: 38 },
                            { name: "Android", users: 26 },
                            { name: "Other", users: 1 },
                          ]}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                          <Legend />
                          <Bar dataKey="users" fill="#8884d8" name="User Percentage" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Device Performance Metrics</CardTitle>
                    <CardDescription>Engagement and revenue by device type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-3 text-left font-medium">Device</th>
                            <th className="px-4 py-3 text-left font-medium">Users</th>
                            <th className="px-4 py-3 text-left font-medium">Session Duration</th>
                            <th className="px-4 py-3 text-left font-medium">Pages/Session</th>
                            <th className="px-4 py-3 text-left font-medium">Conversion Rate</th>
                            <th className="px-4 py-3 text-left font-medium">Avg. Order Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="px-4 py-3">Mobile</td>
                            <td className="px-4 py-3">65%</td>
                            <td className="px-4 py-3">6.2 min</td>
                            <td className="px-4 py-3">4.5</td>
                            <td className="px-4 py-3">2.8%</td>
                            <td className="px-4 py-3">$92</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3">Desktop</td>
                            <td className="px-4 py-3">30%</td>
                            <td className="px-4 py-3">10.5 min</td>
                            <td className="px-4 py-3">8.2</td>
                            <td className="px-4 py-3">4.2%</td>
                            <td className="px-4 py-3">$145</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">Tablet</td>
                            <td className="px-4 py-3">5%</td>
                            <td className="px-4 py-3">8.7 min</td>
                            <td className="px-4 py-3">6.3</td>
                            <td className="px-4 py-3">3.5%</td>
                            <td className="px-4 py-3">$118</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="geography" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Distribution</CardTitle>
                  <CardDescription>Users and revenue by geographic region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={geographicData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="region" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="users" fill="#8884d8" name="Users" />
                        <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Insights</CardTitle>
                  <CardDescription>Performance metrics by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-3 text-left font-medium">Region</th>
                          <th className="px-4 py-3 text-left font-medium">Users</th>
                          <th className="px-4 py-3 text-left font-medium">Revenue</th>
                          <th className="px-4 py-3 text-left font-medium">Avg. Order Value</th>
                          <th className="px-4 py-3 text-left font-medium">Conversion Rate</th>
                          <th className="px-4 py-3 text-left font-medium">Growth YoY</th>
                        </tr>
                      </thead>
                      <tbody>
                        {geographicData.map((region, index) => (
                          <tr key={index} className={index < geographicData.length - 1 ? "border-b" : ""}>
                            <td className="px-4 py-3">{region.region}</td>
                            <td className="px-4 py-3">{region.users.toLocaleString()}</td>
                            <td className="px-4 py-3">${region.revenue.toLocaleString()}</td>
                            <td className="px-4 py-3">${(region.revenue / (region.users * 0.2)).toFixed(2)}</td>
                            <td className="px-4 py-3">{(2 + Math.random() * 3).toFixed(1)}%</td>
                            <td className="px-4 py-3">{(5 + Math.random() * 20).toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Countries</CardTitle>
                    <CardDescription>User distribution by country</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">United States</span>
                          <span className="text-xs text-muted-foreground">North America</span>
                        </div>
                        <span className="font-medium">32%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">United Kingdom</span>
                          <span className="text-xs text-muted-foreground">Europe</span>
                        </div>
                        <span className="font-medium">12%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Canada</span>
                          <span className="text-xs text-muted-foreground">North America</span>
                        </div>
                        <span className="font-medium">8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Australia</span>
                          <span className="text-xs text-muted-foreground">Oceania</span>
                        </div>
                        <span className="font-medium">7%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Germany</span>
                          <span className="text-xs text-muted-foreground">Europe</span>
                        </div>
                        <span className="font-medium">6%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Regional Focus</CardTitle>
                    <CardDescription>Recommendations based on geography</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2">
                          <Map className="h-4 w-4" />
                          Expansion Opportunity
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Asia Pacific region shows strong growth potential with 32% YoY increase in active users.
                          Consider localization efforts for key markets.
                        </p>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          Performance Insights
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          European markets have the highest average order value at $135, but lower purchase frequency 
                          compared to North America.
                        </p>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4" />
                          Growth Markets
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Latin America shows the highest conversion rate improvements, with Brazil leading at 28% 
                          increase over last quarter.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default UserAnalytics;

