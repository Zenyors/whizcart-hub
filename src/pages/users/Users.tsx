
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import UserStatsSection from "@/components/users/UserStatsSection";
import UserTableHeader from "@/components/users/UserTableHeader";
import UsersTable from "@/components/users/UsersTable";
import UserInsightsPanel from "@/components/users/UserInsightsPanel";
import { mockUsers } from "@/components/users/mockUserData";
import { Helmet } from "react-helmet";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";

const Users = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

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
    <>
      <Helmet>
        <title>User Management | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full">
          <PageHeader
            title="User Management"
            description="Monitor, analyze, and manage your e-commerce platform users."
          />
          
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
        </div>
      </DashboardLayout>
    </>
  );
};

export default Users;
