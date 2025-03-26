
export const generateMockTickets = () => {
  return Array.from({ length: 20 }).map((_, i) => {
    const statusOptions = ["Open", "In Progress", "Resolved", "Closed"];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const priorityOptions = ["Low", "Medium", "High", "Urgent"];
    const priority = priorityOptions[Math.floor(Math.random() * priorityOptions.length)];
    const categoryOptions = ["Order Issue", "Product Inquiry", "Return Request", "Account Problem", "Payment Issue", "Shipping Question"];
    const category = categoryOptions[Math.floor(Math.random() * categoryOptions.length)];
    
    const hasPhone = Math.random() > 0.3;
    
    return {
      id: `TKT-${10000 + i}`,
      customer: {
        name: `Customer ${i + 1}`,
        email: `customer${i + 1}@example.com`,
        id: `USR-${1000 + i}`,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`,
        phone: hasPhone ? `+1${Math.floor(1000000000 + Math.random() * 9000000000)}` : undefined,
      },
      subject: category,
      description: `I need help with my ${category.toLowerCase()}. Please assist as soon as possible.`,
      status,
      priority,
      category,
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
      updatedAt: new Date(Date.now() - Math.random() * 5000000000).toLocaleDateString(),
      assignedTo: i % 3 === 0 ? "Sarah Johnson" : i % 4 === 0 ? "Michael Chen" : i % 5 === 0 ? "Emily Rodriguez" : null,
      messages: [
        {
          sender: "Customer",
          text: `I need help with my ${category.toLowerCase()}. Please assist as soon as possible.`,
          timestamp: new Date(Date.now() - Math.random() * 10000000000).toLocaleString(),
        },
        ...(i % 2 === 0 ? [{
          sender: "Support",
          text: "Thank you for contacting us. We're looking into this issue and will get back to you shortly.",
          timestamp: new Date(Date.now() - Math.random() * 5000000000).toLocaleString(),
        }] : []),
        ...(i % 4 === 0 ? [{
          sender: "Customer",
          text: "Any updates on this? I'm still having the same issue.",
          timestamp: new Date(Date.now() - Math.random() * 1000000000).toLocaleString(),
        }] : []),
      ],
    };
  });
};

export const calculateTicketStats = (tickets: any[]) => {
  return {
    open: tickets.filter(t => t.status === "Open").length,
    inProgress: tickets.filter(t => t.status === "In Progress").length,
    resolved: tickets.filter(t => t.status === "Resolved").length,
    closed: tickets.filter(t => t.status === "Closed").length,
    urgent: tickets.filter(t => t.priority === "Urgent").length,
    avgResponseTime: "3.2 hours",
    firstResolutionTime: "8.5 hours",
  };
};
