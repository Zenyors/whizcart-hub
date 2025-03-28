
import React, { useState } from "react";
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
import { MoreHorizontal, Plus, Search, UserPlus, Check, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Interface for administrator users
interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

// Mock data for demonstration
const initialAdminUsers: AdminUser[] = [
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
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(initialAdminUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Admin"
  });
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  
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
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredUsers = adminUsers.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query) || 
      user.role.toLowerCase().includes(query)
    );
  });
  
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const newId = Math.max(...adminUsers.map(user => user.id)) + 1;
    const newAdminUser: AdminUser = {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      lastLogin: new Date().toISOString(),
    };
    
    setAdminUsers([...adminUsers, newAdminUser]);
    setNewUser({ name: "", email: "", role: "Admin" });
    setIsAddDialogOpen(false);
    
    toast.success("Administrator added successfully", {
      description: `${newUser.name} has been added as ${newUser.role}`
    });
  };
  
  const handleUpdateUserStatus = (userId: number, newStatus: "active" | "inactive") => {
    setAdminUsers(adminUsers.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    const user = adminUsers.find(u => u.id === userId);
    toast.success(`User status updated`, {
      description: `${user?.name} is now ${newStatus}`
    });
  };
  
  const handleDeleteUser = (userId: number) => {
    const user = adminUsers.find(u => u.id === userId);
    setAdminUsers(adminUsers.filter(user => user.id !== userId));
    
    toast.success("Administrator removed", {
      description: `${user?.name} has been removed from the system`
    });
  };
  
  const handleEditUser = (user: AdminUser) => {
    setEditingUser(user);
  };
  
  const saveEditedUser = () => {
    if (editingUser) {
      setAdminUsers(adminUsers.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      
      toast.success("Administrator updated", {
        description: `${editingUser.name}'s information has been updated`
      });
      
      setEditingUser(null);
    }
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
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Administrator
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Administrator</DialogTitle>
              <DialogDescription>
                Create a new administrator account. They will receive an email with login instructions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input 
                  id="name" 
                  className="col-span-3" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  className="col-span-3" 
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select 
                  defaultValue={newUser.role}
                  onValueChange={(value) => setNewUser({...newUser, role: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="Analyst">Analyst</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddUser}>Add Administrator</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {editingUser?.id === user.id ? (
                  <Input 
                    value={editingUser.name} 
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} 
                  />
                ) : (
                  user.name
                )}
              </TableCell>
              <TableCell>
                {editingUser?.id === user.id ? (
                  <Input 
                    value={editingUser.email} 
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} 
                  />
                ) : (
                  user.email
                )}
              </TableCell>
              <TableCell>
                {editingUser?.id === user.id ? (
                  <Select 
                    defaultValue={editingUser.role}
                    onValueChange={(value) => setEditingUser({...editingUser, role: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={editingUser.role} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Analyst">Analyst</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  user.role
                )}
              </TableCell>
              <TableCell>
                <Badge variant={user.status === "active" ? "default" : "secondary"}>
                  {user.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(user.lastLogin)}</TableCell>
              <TableCell className="text-right">
                {editingUser?.id === user.id ? (
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" onClick={saveEditedUser}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => setEditingUser(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEditUser(user)}>
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleUpdateUserStatus(user.id, user.status === "active" ? "inactive" : "active")}>
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}>
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
          {filteredUsers.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                <div className="text-muted-foreground">
                  No administrators found matching "{searchQuery}"
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
