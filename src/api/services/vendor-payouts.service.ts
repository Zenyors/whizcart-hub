
import { VendorPayoutsData } from "../types/vendor.types";
import { mockPayoutsData } from "../mock-data";

// API functions for vendor payouts
export const fetchVendorPayouts = async (): Promise<VendorPayoutsData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPayoutsData);
    }, 500);
  });
};
