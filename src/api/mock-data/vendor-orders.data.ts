
import { VendorOrder } from "../types/vendor.types";

// Mock orders
export const mockOrders: VendorOrder[] = [
  {
    id: "o1",
    orderNumber: "ORD-2023-1245",
    date: "2023-06-15",
    itemsCount: 5,
    amount: 2450.75,
    status: "Completed",
    deliveryStatus: "On Time",
    qualityScore: 95,
  },
  {
    id: "o2",
    orderNumber: "ORD-2023-1154",
    date: "2023-05-28",
    itemsCount: 12,
    amount: 4890.30,
    status: "Completed",
    deliveryStatus: "On Time",
    qualityScore: 92,
  },
  {
    id: "o3",
    orderNumber: "ORD-2023-1087",
    date: "2023-05-11",
    itemsCount: 3,
    amount: 850.50,
    status: "Completed",
    deliveryStatus: "Delayed",
    qualityScore: 85,
  },
  {
    id: "o4",
    orderNumber: "ORD-2023-0893",
    date: "2023-04-03",
    itemsCount: 8,
    amount: 3120.25,
    status: "Completed",
    deliveryStatus: "On Time",
    qualityScore: 96,
  },
];
