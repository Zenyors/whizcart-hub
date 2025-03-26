
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, AlertCircle, CheckCircle } from "lucide-react";
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

export interface Vendor {
  id: string;
  name: string;
  status: "active" | "inactive" | "pending" | "suspended";
  isNew?: boolean;
  isPreferred?: boolean;
  rating: number;
  categories: string[];
  issues?: string[];
  productsCount: number;
  totalSpend: number;
  lastOrderDate: string;
}

interface VendorsTableProps {
  vendors: Vendor[];
  isLoading?: boolean;
}

const VendorsTable = ({ vendors, isLoading = false }: VendorsTableProps) => {
  const navigate = useNavigate();

  const handleViewVendor = (id: string) => {
    navigate(`/vendors/${id}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead className="hidden lg:table-cell">Rating</TableHead>
            <TableHead className="hidden md:table-cell">Products</TableHead>
            <TableHead className="hidden md:table-cell">Total Spend</TableHead>
            <TableHead className="hidden lg:table-cell">Last Order</TableHead>
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
          ) : vendors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                <p className="text-muted-foreground">No vendors found</p>
              </TableCell>
            </TableRow>
          ) : (
            vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 flex items-center justify-center rounded-full text-primary font-semibold">
                      {vendor.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span>{vendor.name}</span>
                      {vendor.isNew && (
                        <Badge variant="outline" className="text-xs">New</Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      vendor.status === "active" ? "success" : 
                      vendor.status === "pending" ? "outline" : 
                      vendor.status === "inactive" ? "secondary" : "destructive"
                    }
                  >
                    {vendor.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {vendor.categories.slice(0, 2).map((category, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                    {vendor.categories.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{vendor.categories.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center">
                    <div className="text-amber-500">
                      {"★".repeat(Math.floor(vendor.rating))}
                      <span className="text-muted-foreground">
                        {"★".repeat(5 - Math.floor(vendor.rating))}
                      </span>
                    </div>
                    <span className="ml-2">{vendor.rating.toFixed(1)}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {vendor.productsCount}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  ${vendor.totalSpend.toLocaleString()}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {new Date(vendor.lastOrderDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {vendor.issues && vendor.issues.length > 0 ? (
                      <div className="flex items-center text-red-500 mr-2">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">{vendor.issues.length}</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-green-500 mr-2">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewVendor(vendor.id)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default VendorsTable;
