
export interface Ticket {
  id: string;
  customer: {
    name: string;
    email: string;
    id: string;
    avatarUrl: string;
    phone?: string;
  };
  subject: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High" | "Urgent";
  category: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: string | null;
  messages: {
    sender: string;
    text: string;
    timestamp: string;
  }[];
}

export interface TicketStats {
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  urgent: number;
  avgResponseTime: string;
  firstResolutionTime: string;
}

export const generateMockTickets = (): Ticket[] => {
  return [
    {
      id: "TKT-1001",
      customer: {
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        id: "USR-5623",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
        phone: "+91 98765 43210"
      },
      subject: "Unable to checkout",
      description: "I'm trying to place an order but getting an error at checkout. My cart has 5 items and I've tried both credit card and UPI payment methods.",
      status: "Open",
      priority: "High",
      category: "Technical",
      createdAt: "2023-10-15",
      updatedAt: "2023-10-15",
      assignedTo: null,
      messages: [
        {
          sender: "Rahul Sharma",
          text: "I'm trying to place an order but getting an error at checkout. My cart has 5 items and I've tried both credit card and UPI payment methods.",
          timestamp: "2023-10-15 14:23:00"
        }
      ]
    },
    {
      id: "TKT-1002",
      customer: {
        name: "Priya Patel",
        email: "priya.patel@example.com",
        id: "USR-4217",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
        phone: "+91 87654 32109"
      },
      subject: "Wrong product received",
      description: "I ordered a blue shirt (order #ORD-7890) but received a red one instead. I need a replacement as soon as possible.",
      status: "In Progress",
      priority: "Medium",
      category: "Order",
      createdAt: "2023-10-14",
      updatedAt: "2023-10-15",
      assignedTo: "Ravi Kumar",
      messages: [
        {
          sender: "Priya Patel",
          text: "I ordered a blue shirt (order #ORD-7890) but received a red one instead. I need a replacement as soon as possible.",
          timestamp: "2023-10-14 11:45:00"
        },
        {
          sender: "Ravi Kumar",
          text: "I'm sorry about the mix-up. Could you please confirm your order number so I can check what happened?",
          timestamp: "2023-10-14 12:10:00"
        },
        {
          sender: "Priya Patel",
          text: "The order number is ORD-7890.",
          timestamp: "2023-10-14 12:15:00"
        },
        {
          sender: "Ravi Kumar",
          text: "Thank you for confirming. I've initiated a replacement for your order. The correct blue shirt will be dispatched tomorrow.",
          timestamp: "2023-10-15 09:30:00"
        }
      ]
    },
    {
      id: "TKT-1003",
      customer: {
        name: "Amit Singh",
        email: "amit.singh@example.com",
        id: "USR-7809",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit"
      },
      subject: "Refund not processed",
      description: "I returned an item 2 weeks ago (order #ORD-5432) but haven't received my refund yet. The return was confirmed as received on your end.",
      status: "Open",
      priority: "Urgent",
      category: "Billing",
      createdAt: "2023-10-13",
      updatedAt: "2023-10-13",
      assignedTo: null,
      messages: [
        {
          sender: "Amit Singh",
          text: "I returned an item 2 weeks ago (order #ORD-5432) but haven't received my refund yet. The return was confirmed as received on your end.",
          timestamp: "2023-10-13 16:50:00"
        }
      ]
    },
    {
      id: "TKT-1004",
      customer: {
        name: "Neha Gupta",
        email: "neha.gupta@example.com",
        id: "USR-3456",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha",
        phone: "+91 76543 21098"
      },
      subject: "Account access issues",
      description: "I can't log in to my account. I've tried resetting my password but I'm not receiving the reset email.",
      status: "Resolved",
      priority: "Medium",
      category: "Account",
      createdAt: "2023-10-12",
      updatedAt: "2023-10-14",
      assignedTo: "Priya Sharma",
      messages: [
        {
          sender: "Neha Gupta",
          text: "I can't log in to my account. I've tried resetting my password but I'm not receiving the reset email.",
          timestamp: "2023-10-12 10:20:00"
        },
        {
          sender: "Priya Sharma",
          text: "I'm sorry you're having trouble accessing your account. Let me check if there are any issues with your email address.",
          timestamp: "2023-10-12 10:35:00"
        },
        {
          sender: "Priya Sharma",
          text: "I've checked your account and it seems your email was misspelled. I've corrected it and sent a new password reset link to neha.gupta@example.com. Please check your inbox.",
          timestamp: "2023-10-12 10:45:00"
        },
        {
          sender: "Neha Gupta",
          text: "Thank you! I received the email and was able to reset my password and log in.",
          timestamp: "2023-10-14 09:10:00"
        },
        {
          sender: "Priya Sharma",
          text: "Great! I'm glad I could help. Is there anything else you need assistance with?",
          timestamp: "2023-10-14 09:15:00"
        },
        {
          sender: "Neha Gupta",
          text: "No, that's all. Thank you for your help!",
          timestamp: "2023-10-14 09:20:00"
        }
      ]
    },
    {
      id: "TKT-1005",
      customer: {
        name: "Vikram Desai",
        email: "vikram.desai@example.com",
        id: "USR-9012",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram"
      },
      subject: "Product availability inquiry",
      description: "When will the Samsung Galaxy S22 (Black, 256GB) be back in stock? I've been waiting for a month.",
      status: "Closed",
      priority: "Low",
      category: "Product",
      createdAt: "2023-10-10",
      updatedAt: "2023-10-11",
      assignedTo: "Amit Patel",
      messages: [
        {
          sender: "Vikram Desai",
          text: "When will the Samsung Galaxy S22 (Black, 256GB) be back in stock? I've been waiting for a month.",
          timestamp: "2023-10-10 15:30:00"
        },
        {
          sender: "Amit Patel",
          text: "Thank you for your inquiry. Let me check with our inventory team about the expected restock date for the Samsung Galaxy S22 in Black with 256GB storage.",
          timestamp: "2023-10-10 15:45:00"
        },
        {
          sender: "Amit Patel",
          text: "I've received an update from our inventory team. The Samsung Galaxy S22 (Black, 256GB) is expected to be back in stock by the end of this week. Would you like me to notify you when it's available?",
          timestamp: "2023-10-11 10:20:00"
        },
        {
          sender: "Vikram Desai",
          text: "Yes, please notify me when it's available. Thank you for checking.",
          timestamp: "2023-10-11 11:05:00"
        },
        {
          sender: "Amit Patel",
          text: "I've set up a notification for you. You'll receive an email as soon as the product is back in stock. Is there anything else you need help with?",
          timestamp: "2023-10-11 11:15:00"
        },
        {
          sender: "Vikram Desai",
          text: "No, that's all. Thank you!",
          timestamp: "2023-10-11 11:20:00"
        }
      ]
    }
  ];
};

export const calculateTicketStats = (tickets: Ticket[]): TicketStats => {
  const open = tickets.filter(ticket => ticket.status === "Open").length;
  const inProgress = tickets.filter(ticket => ticket.status === "In Progress").length;
  const resolved = tickets.filter(ticket => ticket.status === "Resolved").length;
  const closed = tickets.filter(ticket => ticket.status === "Closed").length;
  const urgent = tickets.filter(ticket => ticket.priority === "Urgent").length;
  
  return {
    open,
    inProgress,
    resolved,
    closed,
    urgent,
    avgResponseTime: "2.5 hours",
    firstResolutionTime: "8.3 hours"
  };
};
