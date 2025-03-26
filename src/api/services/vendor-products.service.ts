
import { VendorProductWithVendor } from "../types/vendor.types";
import { mockVendorProducts } from "../mock-data/vendors.data";

// API functions for vendor products
export const fetchAllVendorProducts = async (): Promise<VendorProductWithVendor[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVendorProducts);
    }, 500);
  });
};
