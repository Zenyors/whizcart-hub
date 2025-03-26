import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';
import { Search, Filter, Wallet, Download, ArrowUpDown, ArrowDown, ArrowUp, BanknoteIcon, Calendar, RefreshCw } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchVendorPayouts } from "@/api/vendorApi";

const VendorPayouts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data, isLoading } = useQuery({
    queryKey: ['vendorPayouts'],
    queryFn: fetchVendorPayouts,
  });

  const payouts = data?.payouts || [];
  const stats = data?.stats || { 
    totalPending: 0, 
    totalPaid: 0, 
    averageProcessingTime: 0, 
    monthlyChange: 0 
  };

  const filteredPayouts = payouts.filter(payout => {
    const matchesSearch = 
      payout.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      payout.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || 
                          (filterStatus === "pending" && payout.status === "Pending") ||
                          (filterStatus === "paid" && payout.status === "Paid") ||
                          (filterStatus === "failed" && payout.status === "Failed");
    
    return matchesSearch && matchesStatus;
  });

  const sortedPayouts = [...filteredPayouts].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else if (sortBy === "amount") {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortBy === "vendor") {
      return sortOrder === "asc" 
        ? a.vendorName.localeCompare(b.vendorName) 
        : b.vendorName.localeCompare(a.vendorName);
    }
    return 0;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <Helmet>
        <title>Vendor Payouts | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full max-w-full">
          <PageHeader
            title="Vendor Payouts"
            description="Manage payments to your suppliers and vendors"
          >
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Select Period
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </PageHeader>

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

          <div className="flex flex-col md:flex-row gap-4 justify-between flex-wrap">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors or invoice numbers..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <div className="w-full sm:w-48">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    More Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Filter by date range</DropdownMenuItem>
                  <DropdownMenuItem>Filter by amount</DropdownMenuItem>
                  <DropdownMenuItem>Filter by payment method</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="gap-2" onClick={toggleSortOrder}>
                <ArrowUpDown className="h-4 w-4" />
                {sortOrder === "asc" ? "Ascending" : "Descending"}
              </Button>
            </div>
          </div>

          <Card className="w-full overflow-hidden">
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-auto">
              <div className="w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="cursor-pointer" onClick={() => { setSortBy("vendor"); toggleSortOrder(); }}>
                        Vendor {sortBy === "vendor" && (sortOrder === "asc" ? "↑" : "↓")}
                      </TableHead>
                      <TableHead>Invoice Number</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => { setSortBy("amount"); toggleSortOrder(); }}>
                        Amount {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => { setSortBy("date"); toggleSortOrder(); }}>
                        Due Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {

