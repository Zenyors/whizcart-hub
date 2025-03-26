
import { VendorCommunication } from "../types/vendor.types";
import { mockCommunications } from "../mock-data/vendors.data";

// API functions for vendor communications
export const fetchVendorCommunications = async (vendorId: string): Promise<VendorCommunication[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCommunications as VendorCommunication[]);
    }, 500);
  });
};
