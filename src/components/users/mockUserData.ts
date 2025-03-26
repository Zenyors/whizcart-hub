
import { User } from "./UserTableRow";

// Generate mock user data
export const generateMockUsers = (count: number = 10): User[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `USR-${1000 + i}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: i % 5 === 0 ? "At Risk" : i % 3 === 0 ? "Inactive" : "Active",
    spend: `$${(Math.random() * 1000).toFixed(2)}`,
    orders: Math.floor(Math.random() * 50),
    lastPurchase: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    joinDate: new Date(Date.now() - Math.random() * 100000000000).toLocaleDateString(),
    loyaltyPoints: Math.floor(Math.random() * 5000),
    segment: i % 4 === 0 ? "VIP" : i % 3 === 0 ? "Regular" : i % 5 === 0 ? "New" : "Returning",
  }));
};

export const mockUsers = generateMockUsers(10);
