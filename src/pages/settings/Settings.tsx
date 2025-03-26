
import React from "react";
import { Helmet } from 'react-helmet';
import { Settings as SettingsIcon, User, CreditCard, Bell, Globe, Shield, Mail, Save } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <>
      <Helmet>
        <title>Settings | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <PageHeader
            title="Settings"
            description="Manage your account settings and preferences"
          />

          <Tabs defaultValue="profile" className="w-full">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-64">
                <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
                  <TabsTrigger value="profile" className="justify-start w-full px-3 py-2 data-[state=active]:bg-accent">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="account" className="justify-start w-full px-3 py-2 data-[state=active]:bg-accent">
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="justify-start w-full px-3 py-2 data-[state=active]:bg-accent">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="justify-start w-full px-3 py-2 data-[state=active]:bg-accent">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="justify-start w-full px-3 py-2 data-[state=active]:bg-accent">
                    <Globe className="h-4 w-4 mr-2" />
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger value="security" className="justify-start w-full px-3 py-2 data-[state=active]:bg-accent">
                    <Shield className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="flex-1">
                <TabsContent value="profile" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile</CardTitle>
                      <CardDescription>
                        Manage your public profile information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Admin User" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue="admin@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input id="bio" defaultValue="Administrator" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="account" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>
                        Update your account preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <select 
                          id="language" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="en">English</option>
                          <option value="fr">French</option>
                          <option value="es">Spanish</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <select 
                          id="timezone" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="utc">UTC</option>
                          <option value="est">Eastern Time (ET)</option>
                          <option value="cst">Central Time (CT)</option>
                          <option value="pst">Pacific Time (PT)</option>
                        </select>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="notifications" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Manage how you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="order-notifications">Order notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when new orders are placed
                          </p>
                        </div>
                        <Switch id="order-notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="inventory-alerts">Inventory alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when inventory is running low
                          </p>
                        </div>
                        <Switch id="inventory-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketing-emails">Marketing emails</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive updates about new features and promotions
                          </p>
                        </div>
                        <Switch id="marketing-emails" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="billing" className="mt-0">
                  <Card className="p-6 py-20 text-center">
                    <CreditCard className="h-16 w-16 mx-auto mb-4 text-muted-foreground/40" />
                    <p className="text-muted-foreground">Billing settings will appear here</p>
                  </Card>
                </TabsContent>
                <TabsContent value="appearance" className="mt-0">
                  <Card className="p-6 py-20 text-center">
                    <Globe className="h-16 w-16 mx-auto mb-4 text-muted-foreground/40" />
                    <p className="text-muted-foreground">Appearance settings will appear here</p>
                  </Card>
                </TabsContent>
                <TabsContent value="security" className="mt-0">
                  <Card className="p-6 py-20 text-center">
                    <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground/40" />
                    <p className="text-muted-foreground">Security settings will appear here</p>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Settings;
