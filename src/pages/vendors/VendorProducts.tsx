
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';
import { PlusCircle } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { fetchAllVendorProducts } from "@/api/vendorApi";
import { VendorProductWithVendor } from "@/api/types/vendor.types";
import ProductFilters from "@/components/vendors/ProductFilters";
import VendorProductsAllTable from "@/components/vendors/VendorProductsAllTable";

const VendorProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const { data, isLoading } = useQuery<VendorProductWithVendor[]>({
    queryKey: ['vendorProducts'],
    queryFn: fetchAllVendorProducts,
  });

  const products = data || [];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.vendorName && product.vendorName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "inStock" && product.stockStatus === "In Stock") ||
                         (filterStatus === "lowStock" && product.stockStatus === "Low Stock") ||
                         (filterStatus === "outOfStock" && product.stockStatus === "Out of Stock") ||
                         (filterStatus === "discontinued" && product.stockStatus === "Discontinued");
    
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Helmet>
        <title>Vendor Products | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full max-w-full">
          <PageHeader
            title="Vendor Products"
            description="Browse and manage products from all vendors"
          >
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Product
            </Button>
          </PageHeader>

          <ProductFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />

          <VendorProductsAllTable 
            products={filteredProducts} 
            isLoading={isLoading} 
          />
        </div>
      </DashboardLayout>
    </>
  );
};

export default VendorProducts;
