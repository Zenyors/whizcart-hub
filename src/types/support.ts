
export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  type: "Customer" | "Vendor" | "Delivery";
  priority: "Low" | "Medium" | "High" | "Urgent";
  created: string;
  assignedTo?: string;
  lastUpdated: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Account" | "Orders" | "Payments" | "Delivery" | "Returns" | "Vendors";
}
