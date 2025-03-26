
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Search, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for demonstration
const adminUsers = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john@whizcart.com", 
    role: "Super Admin", 
    status: "active", 
    lastLogin: "2023-04-15T10:30:00Z" 
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    email: "jane@whizcart.com", 
    role: "Admin", 
    status: "active", 
    lastLogin: "2023-04-14T08:45:00Z" 
  },
  { 
    id: 3, 
    name: "Alex Brown", 
    email: "alex@whizcart.com", 
    role: "Manager", 
    status: "inactive", 
    lastLogin: "2023-03-28T14:20:00Z" 
  },
  { 
    id: 4, 
    name: "Sara Wilson", 
    email: "sara@whizcart.com", 
    role: "Support", 
    status: "active", 
    lastLogin: "2023-04-12T11:15:00Z" 
  },
  { 
    id: 5, 
    name: "Mike Johnson", 
    email: "mike@whizcart.com", 
    role: "Analyst", 
    status: "active", 
    lastLogin: "2023-04-10T09:30:00Z" 
  },
];

const UserManagement = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search administrators..."
            className="w-full pl-8"
          />
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Administrator
        </Button>
      </div>

      <Table>
        <TableCaption>List of system administrators and their access levels.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge variant={user.status === "active" ? "default" : "secondary"}>
                  {user.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(user.lastLogin)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Change Role</DropdownMenuItem>
                    <DropdownMenuItem>Reset Password</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
