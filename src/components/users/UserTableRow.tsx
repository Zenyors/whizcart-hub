
import React from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TableCell, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  spend: string;
  orders: number;
  lastPurchase: string;
  joinDate: string;
  loyaltyPoints: number;
  segment: string;
}

interface UserTableRowProps {
  user: User;
}

const UserTableRow = ({ user }: UserTableRowProps) => {
  const navigate = useNavigate();

  const handleViewDetails = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{user.id}</TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span>{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge 
          variant={
            user.status === "Active" ? "default" :
            user.status === "Inactive" ? "secondary" : "destructive"
          }
        >
          {user.status}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge 
          variant={
            user.segment === "VIP" ? "default" :
            user.segment === "Regular" ? "default" :
            user.segment === "New" ? "outline" : "secondary"
          }
          className={
            user.segment === "VIP" ? "bg-green-500 text-white" : ""
          }
        >
          {user.segment}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{user.spend}</TableCell>
      <TableCell className="hidden md:table-cell">{user.orders}</TableCell>
      <TableCell className="hidden md:table-cell">{user.lastPurchase}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleViewDetails(user.id)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <DropdownMenuItem>Send email</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Deactivate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
