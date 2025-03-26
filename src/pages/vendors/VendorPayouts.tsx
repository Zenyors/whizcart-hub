
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';
import { Calendar, Download, Filter, Search, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VendorPaymentChart from "@/components/vendors/VendorPaymentChart";
import { fetchVendorPayouts } from "@/api/vendorApi";

const VendorPayouts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const { data, isLoading } = useQuery({
    queryKey: ['vendorPayouts'],
    queryFn: fetchVendorPayouts,
  });

  const payouts = data?.payouts || [];
  const stats = data?.stats || {
    totalPending: 0,
    totalPaid: 0,
    averageProcessingTime: 0,
    monthlyChange: 0,
  };

  const filteredPayouts = payouts.filter(payout => {
    const matchesSearch = payout.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         payout.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || 
                         payout.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Helmet>
        <title>Vendor Payouts | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <PageHeader
            title="Vendor Payouts"
            description="Manage and track all vendor payments"
          />

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Pending Payouts"
              value={`$${stats.totalPending.toLocaleString()}`}
              description="Awaiting processing"
              icon={Calendar}
              trend={{ value: 0, positive: true }}
              color="#3b82f6"
            />
            <StatCard
              title="Paid This Month"
              value={`$${stats.totalPaid.toLocaleString()}`}
              description="Total amount paid"
              icon={TrendingUp}
              trend={{ value: stats.monthlyChange, positive: stats.monthlyChange > 0 }}
              color="#10b981"
            />
            <StatCard
              title="Avg. Processing Time"
              value={`${stats.averageProcessingTime} days`}
              description="From invoice to payment"
              icon={Calendar}
              trend={{ value: 5.2, positive: false }}
              color="#f59e0b"
            />
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Payments
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Export Payment History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <VendorPaymentChart />
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by vendor or invoice..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Tabs 
                  value={filterStatus} 
                  onValueChange={setFilterStatus} 
                  className="w-[400px]"
                >
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="processing">Processing</TabsTrigger>
                    <TabsTrigger value="paid">Paid</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <Button>Process Selected</Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <input type="checkbox" className="h-4 w-4" />
                      </TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-10">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredPayouts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-10">
                          <p className="text-muted-foreground">No payouts found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPayouts.map((payout) => (
                        <TableRow key={payout.id}>
                          <TableCell>
                            <input type="checkbox" className="h-4 w-4" />
                          </TableCell>
                          <TableCell className="font-medium">{payout.vendorName}</TableCell>
                          <TableCell>{payout.invoiceNumber}</TableCell>
                          <TableCell>${payout.amount.toLocaleString()}</TableCell>
                          <TableCell>{new Date(payout.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                payout.status === "Paid" ? "success" :
                                payout.status === "Pending" ? "outline" :
                                payout.status === "Processing" ? "default" : "secondary"
                              }
                            >
                              {payout.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{payout.paymentMethod}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                                <circle cx="5" cy="12" r="1" />
                              </svg>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default VendorPayouts;
