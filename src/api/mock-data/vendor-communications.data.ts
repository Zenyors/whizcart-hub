
import { VendorCommunication } from "../types/vendor.types";

// Mock communications
export const mockCommunications: VendorCommunication[] = [
  {
    id: "c1",
    type: "email",
    subject: "Order #ORD-2023-1245 Confirmation",
    content: "This email confirms the receipt of your order #ORD-2023-1245. We are processing it and will provide shipping details soon.",
    date: "2023-06-14T10:30:00Z",
    category: "Order",
    user: {
      name: "Sarah Johnson",
      avatar: "",
    },
    files: ["order_confirmation.pdf"],
  },
  {
    id: "c2",
    type: "call",
    subject: "Delivery Schedule Discussion",
    content: "Call to discuss adjustments to the delivery schedule for the upcoming bulk order. Agreed on June 20th delivery date.",
    date: "2023-06-10T14:15:00Z",
    category: "Inquiry",
    user: {
      name: "Michael Chen",
      avatar: "",
    },
  },
  {
    id: "c3",
    type: "issue",
    subject: "Quality Concerns with Recent Shipment",
    content: "We've received some customer complaints about the quality of the smartphone cases in our last shipment. Some cases show signs of defects in the material. Please address this issue urgently.",
    date: "2023-05-25T09:45:00Z",
    category: "Issue",
    user: {
      name: "Emily Rodriguez",
      avatar: "",
    },
    files: ["case_defects.jpg", "customer_complaint.pdf"],
  },
  {
    id: "c4",
    type: "meeting",
    subject: "Quarterly Review Meeting",
    content: "Meeting to discuss Q2 performance, upcoming product launches, and improvement strategies for Q3.",
    date: "2023-05-15T13:00:00Z",
    category: "Feedback",
    user: {
      name: "David Wilson",
      avatar: "",
    },
    files: ["q2_performance_report.xlsx"],
  },
];
