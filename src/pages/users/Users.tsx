
import React, { useState } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import UserStatsSection from "@/components/users/UserStatsSection";
import UserTableHeader from "@/components/users/UserTableHeader";
import UsersTable from "@/components/users/UsersTable";
import UserInsightsPanel from "@/components/users/UserInsightsPanel";
import { mockUsers } from "@/components/users/mockUserData";

const Users = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    toast({
      title: sidebarOpen ? "Sidebar Collapsed" : "Sidebar Expanded",
      description: sidebarOpen ? "The sidebar has been collapsed." : "The sidebar has been expanded.",
    });
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "active") return matchesSearch && user.status === "Active";
    if (selectedTab === "inactive") return matchesSearch && user.status === "Inactive";
    if (selectedTab === "at-risk") return matchesSearch && user.status === "At Risk";
    if (selectedTab === "vip") return matchesSearch && user.segment === "VIP";
    
    return matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-muted/5">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-0" : ""}`}>
        <Header 
          isSidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />
        
        <main className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="mb-8 flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Monitor, analyze, and manage your e-commerce platform users.
            </p>
          </div>
          
          <UserStatsSection totalUsers={mockUsers.length} />
          
          <Card className="mb-8">
            <UserTableHeader 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            
            <UsersTable users={filteredUsers} />
          </Card>
          
          <UserInsightsPanel />
        </main>
      </div>
    </div>
  );
};

export default Users;
