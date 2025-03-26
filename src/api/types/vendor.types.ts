
import { VendorProduct } from "@/components/vendors/VendorProductsTable";

// Vendor types
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

export interface VendorDetail extends Vendor {
  onboardedDate: string;
  paymentTerms: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  metrics: {
    onTimeDelivery: number;
    onTimeDeliveryTrend: number;
    qualityScore: number;
    qualityScoreTrend: number;
    responseTime: number;
    responseTimeTrend: number;
    issueRate: number;
    issueRateTrend: number;
    historicalData: Array<{
      month: string;
      qualityScore: number;
      onTimeDelivery: number;
      issueRate: number;
    }>;
  };
  products: VendorProduct[];
}

export interface VendorOrder {
  id: string;
  orderNumber: string;
  date: string;
  itemsCount: number;
  amount: number;
  status: string;
  deliveryStatus: string;
  qualityScore: number;
}

export interface VendorCommunication {
  id: string;
  type: string;
  subject: string;
  content: string;
  date: string;
  category: string;
  user: {
    name: string;
    avatar: string;
  };
  files?: string[];
}

export interface VendorProductWithVendor extends VendorProduct {
  vendorName: string;
}

export interface VendorPayoutsData {
  payouts: Array<{
    id: string;
    vendorName: string;
    invoiceNumber: string;
    amount: number;
    dueDate: string;
    status: string;
    paymentMethod: string;
  }>;
  stats: {
    totalPending: number;
    totalPaid: number;
    averageProcessingTime: number;
    monthlyChange: number;
  };
}
