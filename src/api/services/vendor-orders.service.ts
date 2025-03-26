
import { VendorOrder } from "../types/vendor.types";
import { mockOrders } from "../mock-data";

// API functions for vendor orders
export const fetchVendorOrders = async (vendorId: string): Promise<VendorOrder[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders as VendorOrder[]);
    }, 500);
  });
};
