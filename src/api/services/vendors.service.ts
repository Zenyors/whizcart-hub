
import { Vendor, VendorDetail } from "../types/vendor.types";
import { mockVendors, mockVendorDetail } from "../mock-data";

// API functions for general vendor operations
export const fetchVendors = async (): Promise<Vendor[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVendors);
    }, 500);
  });
};

export const fetchVendorById = async (id: string): Promise<VendorDetail> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVendorDetail as VendorDetail);
    }, 500);
  });
};
