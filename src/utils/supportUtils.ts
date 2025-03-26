
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Open":
      return "bg-blue-500 text-white";
    case "In Progress":
      return "bg-amber-500 text-white";
    case "Resolved":
      return "bg-green-500 text-white";
    case "Closed":
      return "bg-gray-500 text-white";
    default:
      return "";
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "Urgent":
      return "bg-red-500 text-white";
    case "High":
      return "bg-orange-500 text-white";
    case "Medium":
      return "bg-amber-500 text-white";
    case "Low":
      return "bg-blue-500 text-white";
    default:
      return "";
  }
};
