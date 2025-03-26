import React from "react";
import { Package, AlertCircle, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export interface VendorProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stockQuantity: number;
  stockStatus: string;
  qualityScore: number;
  qualityIssues: number;
  vendorName?: string; // Added for VendorProducts.tsx
}

interface VendorProductsTableProps {
  products: VendorProduct[];
}

const VendorProductsTable = ({ products }: VendorProductsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Margin</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Quality</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-10">
                <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                <p className="mt-2 text-muted-foreground">No products available</p>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => {
              const margin = ((product.price - product.cost) / product.price) * 100;
              
              return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                        <Package className="h-4 w-4" />
                      </div>
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>${product.cost.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={margin > 40 ? "success" : margin > 20 ? "default" : "warning"}
                    >
                      {margin.toFixed(0)}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.stockStatus === "In Stock" ? "success" :
                        product.stockStatus === "Low Stock" ? "warning" : "destructive"
                      }
                    >
                      {product.stockStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.qualityIssues > 0 ? (
                      <div className="flex items-center text-red-500">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>{product.qualityScore}/100</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-green-500">
                        <Check className="h-4 w-4 mr-1" />
                        <span>{product.qualityScore}/100</span>
                      </div>
                    )}
                  </TableCell>
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
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default VendorProductsTable;
