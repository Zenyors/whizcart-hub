import { Vendor } from "@/components/vendors/VendorsTable";
import { VendorProduct } from "@/components/vendors/VendorProductsTable";

// Define types for API responses
interface VendorDetail extends Vendor {
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

interface VendorOrder {
  id: string;
  orderNumber: string;
  date: string;
  itemsCount: number;
  amount: number;
  status: string;
  deliveryStatus: string;
  qualityScore: number;
}

interface VendorCommunication {
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

interface VendorProductWithVendor extends VendorProduct {
  vendorName: string;
}

interface VendorPayoutsData {
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

// Mock vendor data
const mockVendors: Vendor[] = [
  {
    id: "v1",
    name: "Acme Supplies",
    status: "active",
    isPreferred: true,
    rating: 4.8,
    categories: ["Electronics", "Accessories"],
    productsCount: 42,
    totalSpend: 120500,
    lastOrderDate: "2023-06-15",
  },
  {
    id: "v2",
    name: "Global Distributors",
    status: "active",
    rating: 4.2,
    categories: ["Clothing", "Home Goods"],
    productsCount: 87,
    totalSpend: 245800,
    lastOrderDate: "2023-06-10",
  },
  {
    id: "v3",
    name: "Metro Manufacturing",
    status: "inactive",
    rating: 3.5,
    categories: ["Electronics", "Hardware"],
    issues: ["Late delivery", "Quality issues"],
    productsCount: 18,
    totalSpend: 67300,
    lastOrderDate: "2023-05-22",
  },
  {
    id: "v4",
    name: "Sunshine Textiles",
    status: "active",
    rating: 4.6,
    categories: ["Clothing", "Fabrics"],
    productsCount: 64,
    totalSpend: 183000,
    lastOrderDate: "2023-06-12",
  },
  {
    id: "v5",
    name: "EcoPackage Solutions",
    status: "pending",
    isNew: true,
    rating: 4.0,
    categories: ["Packaging", "Eco-Friendly"],
    productsCount: 12,
    totalSpend: 28500,
    lastOrderDate: "2023-06-08",
  },
];

// Mock vendor detail
const mockVendorDetail = {
  id: "v1",
  name: "Acme Supplies",
  status: "active",
  isPreferred: true,
  rating: 4.8,
  categories: ["Electronics", "Accessories", "Hardware"],
  productsCount: 42,
  totalSpend: 120500,
  lastOrderDate: "2023-06-15",
  onboardedDate: "2021-03-10",
  paymentTerms: "Net 30",
  contact: {
    name: "John Smith",
    email: "john@acmesupplies.com",
    phone: "555-123-4567",
  },
  metrics: {
    onTimeDelivery: 96,
    onTimeDeliveryTrend: 2.3,
    qualityScore: 92,
    qualityScoreTrend: 1.8,
    responseTime: 4.2,
    responseTimeTrend: -8.3,
    issueRate: 1.3,
    issueRateTrend: -0.5,
    historicalData: [
      {
        month: "Jan",
        qualityScore: 88,
        onTimeDelivery: 92,
        issueRate: 2.1,
      },
      {
        month: "Feb",
        qualityScore: 90,
        onTimeDelivery: 94,
        issueRate: 1.8,
      },
      {
        month: "Mar",
        qualityScore: 89,
        onTimeDelivery: 91,
        issueRate: 2.0,
      },
      {
        month: "Apr",
        qualityScore: 91,
        onTimeDelivery: 95,
        issueRate: 1.5,
      },
      {
        month: "May",
        qualityScore: 90,
        onTimeDelivery: 93,
        issueRate: 1.7,
      },
      {
        month: "Jun",
        qualityScore: 92,
        onTimeDelivery: 96,
        issueRate: 1.3,
      },
    ],
  },
  products: [
    {
      id: "p1",
      sku: "AC-E-001",
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: 129.99,
      cost: 78.50,
      stockQuantity: 45,
      stockStatus: "In Stock",
      qualityScore: 95,
      qualityIssues: 0,
    },
    {
      id: "p2",
      sku: "AC-E-002",
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 79.99,
      cost: 42.00,
      stockQuantity: 32,
      stockStatus: "In Stock",
      qualityScore: 94,
      qualityIssues: 0,
    },
    {
      id: "p3",
      sku: "AC-A-001",
      name: "Smartphone Case",
      category: "Accessories",
      price: 24.99,
      cost: 8.75,
      stockQuantity: 5,
      stockStatus: "Low Stock",
      qualityScore: 88,
      qualityIssues: 1,
    },
    {
      id: "p4",
      sku: "AC-A-002",
      name: "HDMI Cable",
      category: "Accessories",
      price: 14.99,
      cost: 3.25,
      stockQuantity: 0,
      stockStatus: "Out of Stock",
      qualityScore: 90,
      qualityIssues: 0,
    },
    {
      id: "p5",
      sku: "AC-H-001",
      name: "Screwdriver Set",
      category: "Hardware",
      price: 39.99,
      cost: 18.60,
      stockQuantity: 12,
      stockStatus: "In Stock",
      qualityScore: 92,
      qualityIssues: 0,
    },
  ],
};

// Mock orders
const mockOrders = [
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

// Mock communications
const mockCommunications = [
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

// Mock vendor products - add missing required fields for VendorProduct
const mockVendorProducts: VendorProductWithVendor[] = [
  {
    id: "p1",
    sku: "AC-E-001",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    vendorName: "Acme Supplies",
    price: 129.99,
    cost: 78.50,
    stockQuantity: 45,
    stockStatus: "In Stock",
    qualityScore: 95,
    qualityIssues: 0,
  },
  {
    id: "p2",
    sku: "AC-E-002",
    name: "Bluetooth Speaker",
    category: "Electronics",
    vendorName: "Acme Supplies",
    price: 79.99,
    cost: 42.00,
    stockQuantity: 32,
    stockStatus: "In Stock",
    qualityScore: 94,
    qualityIssues: 0,
  },
  {
    id: "p3",
    sku: "GD-C-001",
    name: "Men's Casual Shirt",
    category: "Clothing",
    vendorName: "Global Distributors",
    price: 49.99,
    cost: 22.50,
    stockQuantity: 12,
    stockStatus: "Low Stock",
    qualityScore: 91,
    qualityIssues: 0,
  },
  {
    id: "p4",
    sku: "GD-H-001",
    name: "Decorative Throw Pillow",
    category: "Home Goods",
    vendorName: "Global Distributors",
    price: 29.99,
    cost: 12.25,
    stockQuantity: 45,
    stockStatus: "In Stock",
    qualityScore: 90,
    qualityIssues: 0,
  },
  {
    id: "p5",
    sku: "MM-E-001",
    name: "Smart Thermostat",
    category: "Electronics",
    vendorName: "Metro Manufacturing",
    price: 149.99,
    cost: 85.75,
    stockQuantity: 0,
    stockStatus: "Out of Stock",
    qualityScore: 88,
    qualityIssues: 2,
  },
  {
    id: "p6",
    sku: "ST-C-001",
    name: "Women's Sundress",
    category: "Clothing",
    vendorName: "Sunshine Textiles",
    price: 59.99,
    cost: 28.50,
    stockQuantity: 30,
    stockStatus: "In Stock",
    qualityScore: 93,
    qualityIssues: 0,
  },
  {
    id: "p7",
    sku: "EPS-P-001",
    name: "Biodegradable Packaging Set",
    category: "Packaging",
    vendorName: "EcoPackage Solutions",
    price: 19.99,
    cost: 9.75,
    stockQuantity: 65,
    stockStatus: "In Stock",
    qualityScore: 90,
    qualityIssues: 0,
  },
];

// Mock payouts data
const mockPayoutsData: VendorPayoutsData = {
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

// API functions
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

export const fetchVendorOrders = async (vendorId: string): Promise<VendorOrder[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders as VendorOrder[]);
    }, 500);
  });
};

export const fetchVendorCommunications = async (vendorId: string): Promise<VendorCommunication[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCommunications as VendorCommunication[]);
    }, 500);
  });
};

export const fetchAllVendorProducts = async (): Promise<VendorProductWithVendor[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVendorProducts);
    }, 500);
  });
};

export const fetchVendorPayouts = async (): Promise<VendorPayoutsData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPayoutsData);
    }, 500);
  });
};
