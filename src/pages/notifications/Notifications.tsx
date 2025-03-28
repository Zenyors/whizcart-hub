
import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { BellRing, History, FileText, Settings } from "lucide-react";

import NotificationForm from "@/components/notifications/NotificationForm";
import NotificationHistory from "@/components/notifications/NotificationHistory";
import NotificationTemplates from "@/components/notifications/NotificationTemplates";
import NotificationSettings from "@/components/notifications/NotificationSettings";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("create");
  
  return (
    <>
      <Helmet>
        <title>Notifications | Admin</title>
      </Helmet>
      <DashboardLayout>
        <div className="space-y-6">
          <PageHeader
            title="Notification Management"
            description="Create, manage, and track notifications across all your apps"
          >
            <BellRing className="h-6 w-6" />
          </PageHeader>
          
          <Tabs defaultValue="create" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="create">
                <BellRing className="h-4 w-4 mr-2" />
                Create Notification
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="h-4 w-4 mr-2" />
                Notification History
              </TabsTrigger>
              <TabsTrigger value="templates">
                <FileText className="h-4 w-4 mr-2" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="create">
              <NotificationForm />
            </TabsContent>
            
            <TabsContent value="history">
              <NotificationHistory />
            </TabsContent>
            
            <TabsContent value="templates">
              <NotificationTemplates />
            </TabsContent>
            
            <TabsContent value="settings">
              <NotificationSettings />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Notifications;
