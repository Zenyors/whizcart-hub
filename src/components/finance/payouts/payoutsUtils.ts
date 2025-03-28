
import { useToast } from "@/hooks/use-toast";

// Mock vendor payouts data
export const mockVendorPayouts = [
  {
    id: "PV-10045",
    vendor: "Fresh Foods Market",
    invoiceNumber: "INV-2023-1245",
    amount: 12450.75,
    dueDate: "2023-07-15",
    status: "Scheduled",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX6789",
  },
  {
    id: "PV-10046",
    vendor: "Global Distributors",
    invoiceNumber: "INV-2023-1154",
    amount: 8790.30,
    dueDate: "2023-07-05",
    status: "Processing",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX1234",
  },
  {
    id: "PV-10047",
    vendor: "Sunshine Textiles",
    invoiceNumber: "INV-2023-1087",
    amount: 5450.50,
    dueDate: "2023-06-30",
    status: "Paid",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX5678",
  },
  {
    id: "PV-10048",
    vendor: "Metro Manufacturing",
    invoiceNumber: "INV-2023-0893",
    amount: 3120.25,
    dueDate: "2023-06-25",
    status: "Paid",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX2345",
  },
  {
    id: "PV-10049",
    vendor: "EcoPackage Solutions",
    invoiceNumber: "INV-2023-1275",
    amount: 2875.60,
    dueDate: "2023-07-20",
    status: "Scheduled",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX7890",
  },
];

// Mock delivery partner payouts
export const mockDeliveryPayouts = [
  {
    id: "PD-10050",
    partner: "City Express",
    period: "June 1-15, 2023",
    amount: 7450.25,
    dueDate: "2023-06-20",
    status: "Paid",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX3456",
  },
  {
    id: "PD-10051",
    partner: "Swift Delivery",
    period: "June 1-15, 2023",
    amount: 6890.50,
    dueDate: "2023-06-20",
    status: "Paid",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX4567",
  },
  {
    id: "PD-10052",
    partner: "Rapid Delivery",
    period: "June 1-15, 2023",
    amount: 5240.75,
    dueDate: "2023-06-20",
    status: "Failed",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX5678",
    failureReason: "Incorrect bank details",
  },
  {
    id: "PD-10053",
    partner: "City Express",
    period: "June 16-30, 2023",
    amount: 8120.30,
    dueDate: "2023-07-05",
    status: "Scheduled",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX3456",
  },
  {
    id: "PD-10054",
    partner: "Swift Delivery",
    period: "June 16-30, 2023",
    amount: 7350.60,
    dueDate: "2023-07-05",
    status: "Scheduled",
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXX4567",
  },
];

// Helper functions
export const getStatusBadge = (status: string) => {
  switch(status.toLowerCase()) {
    case 'paid':
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case 'scheduled':
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case 'processing':
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case 'failed':
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case 'pending':
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    default:
      return "";
  }
};

// Handler functions
export const usePayoutHandlers = () => {
  const { toast } = useToast();
  
  const handleGenerateReport = () => {
    toast({
      title: "Report Generation",
      description: "Payout report is being generated and will download shortly.",
    });
  };

  const handleProcessPayout = (id: string) => {
    toast({
      title: "Payout Processing",
      description: `Payout ${id} is being processed immediately.`,
    });
  };

  const handleRetryPayout = (id: string) => {
    toast({
      title: "Payout Retry",
      description: `Payout ${id} has been queued for retry.`,
    });
  };
  
  return {
    handleGenerateReport,
    handleProcessPayout,
    handleRetryPayout
  };
};
