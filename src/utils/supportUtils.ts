
/**
 * Returns a CSS class string for styling status badges
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Open":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "In Progress":
      return "bg-blue-500 hover:bg-blue-600";
    case "Resolved":
      return "bg-green-500 hover:bg-green-600";
    case "Closed":
      return "bg-gray-500 hover:bg-gray-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

/**
 * Returns a CSS class string for styling priority badges
 */
export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "Low":
      return "border-blue-500 text-blue-500";
    case "Medium":
      return "border-yellow-500 text-yellow-500";
    case "High":
      return "border-orange-500 text-orange-500";
    case "Urgent":
      return "border-red-500 text-red-500";
    default:
      return "";
  }
};
