
import React from "react";
import { 
  Package, 
  AlertCircle, 
  CheckCircle,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VendorProductWithVendor } from "@/api/types/vendor.types";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface VendorProductsAllTableProps {
  products: VendorProductWithVendor[];
  isLoading: boolean;
}

const VendorProductsAllTable = ({ products, isLoading }: VendorProductsAllTableProps) => {
  const { toast } = useToast();

  const handleEdit = (productId: string) => {
    toast({
      title: "Edit Product",
      description: `Editing product ${productId}`,
    });
  };

  const handleDelete = (productId: string) => {
    toast({
      title: "Delete Product",
      description: `Deleting product ${productId}`,
      variant: "destructive",
    });
  };

  const handleView = (productId: string) => {
    toast({
      title: "View Product",
      description: `Viewing product ${productId}`,
    });
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Product Inventory</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-auto">
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock Status</TableHead>
                <TableHead>Quality</TableHead>
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
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                    <p className="mt-2 text-muted-foreground">No products found</p>
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>{product.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.vendorName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          product.stockStatus === "In Stock" ? "success" :
                          product.stockStatus === "Low Stock" ? "warning" :
                          product.stockStatus === "Out of Stock" ? "destructive" : "outline"
                        }
                      >
                        {product.stockStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.qualityIssues ? (
                        <div className="flex items-center gap-1 text-red-500">
                          <AlertCircle className="h-4 w-4" />
                          <span>{product.qualityScore}/100</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-green-500">
                          <CheckCircle className="h-4 w-4" />
                          <span>{product.qualityScore}/100</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
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
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(product.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-red-500">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorProductsAllTable;
