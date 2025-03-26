
import React from "react";
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SystemSettings from "@/components/administration/SystemSettings";
import UserManagement from "@/components/administration/UserManagement";
import SecuritySettings from "@/components/administration/SecuritySettings";
import IntegrationsPanel from "@/components/administration/IntegrationsPanel";

const Administration = () => {
  return (
    <>
      <Helmet>
        <title>Administration | WhizCart</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full">
          <PageHeader
            title="Administration"
            description="Manage system settings, users, and security configurations"
          />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>System Administration</CardTitle>
              <CardDescription>
                Configure global settings, manage users, and control system parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="system" className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="system">System Settings</TabsTrigger>
                  <TabsTrigger value="users">User Management</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                </TabsList>
                <TabsContent value="system">
                  <SystemSettings />
                </TabsContent>
                <TabsContent value="users">
                  <UserManagement />
                </TabsContent>
                <TabsContent value="security">
                  <SecuritySettings />
                </TabsContent>
                <TabsContent value="integrations">
                  <IntegrationsPanel />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Administration;
