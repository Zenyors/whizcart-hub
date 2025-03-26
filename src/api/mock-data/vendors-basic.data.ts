
import { Vendor, VendorDetail } from "../types/vendor.types";

// Mock vendor data
export const mockVendors: Vendor[] = [
  {
    id: "v1",
    name: "Acme Supplies",
    status: "active",
    isPreferred: true,
    rating: 4.8,
    categories: ["Electronics", "Accessories"],
    productsCount: 42,
    totalSpend: 120500,
    lastOrderDate: "2023-06-15",
  },
  {
    id: "v2",
    name: "Global Distributors",
    status: "active",
    rating: 4.2,
    categories: ["Clothing", "Home Goods"],
    productsCount: 87,
    totalSpend: 245800,
    lastOrderDate: "2023-06-10",
  },
  {
    id: "v3",
    name: "Metro Manufacturing",
    status: "inactive",
    rating: 3.5,
    categories: ["Electronics", "Hardware"],
    issues: ["Late delivery", "Quality issues"],
    productsCount: 18,
    totalSpend: 67300,
    lastOrderDate: "2023-05-22",
  },
  {
    id: "v4",
    name: "Sunshine Textiles",
    status: "active",
    rating: 4.6,
    categories: ["Clothing", "Fabrics"],
    productsCount: 64,
    totalSpend: 183000,
    lastOrderDate: "2023-06-12",
  },
  {
    id: "v5",
    name: "EcoPackage Solutions",
    status: "pending",
    isNew: true,
    rating: 4.0,
    categories: ["Packaging", "Eco-Friendly"],
    productsCount: 12,
    totalSpend: 28500,
    lastOrderDate: "2023-06-08",
  },
];
