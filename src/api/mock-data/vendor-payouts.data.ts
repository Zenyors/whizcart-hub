
import { VendorPayoutsData } from "../types/vendor.types";

// Mock payouts data
export const mockPayoutsData: VendorPayoutsData = {
  payouts: [
    {
      id: "pay1",
      vendorName: "Acme Supplies",
      invoiceNumber: "INV-2023-1245",
      amount: 12450.75,
      dueDate: "2023-07-15",
      status: "Pending",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "pay2",
      vendorName: "Global Distributors",
      invoiceNumber: "INV-2023-1154",
      amount: 8790.30,
      dueDate: "2023-07-05",
      status: "Processing",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "pay3",
      vendorName: "Sunshine Textiles",
      invoiceNumber: "INV-2023-1087",
      amount: 5450.50,
      dueDate: "2023-06-30",
      status: "Paid",
      paymentMethod: "Credit Card",
    },
    {
      id: "pay4",
      vendorName: "Metro Manufacturing",
      invoiceNumber: "INV-2023-0893",
      amount: 3120.25,
      dueDate: "2023-06-25",
      status: "Paid",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "pay5",
      vendorName: "EcoPackage Solutions",
      invoiceNumber: "INV-2023-1275",
      amount: 2875.60,
      dueDate: "2023-07-20",
      status: "Pending",
      paymentMethod: "PayPal",
    },
  ],
  stats: {
    totalPending: 24116.65,
    totalPaid: 8570.75,
    averageProcessingTime: 4.2,
    monthlyChange: 12.5,
  },
};
