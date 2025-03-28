
import React from "react";
import { Bell, Clock, Settings, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Mock data for integrations
const integrations = [
  { 
    id: "1", 
    name: "Firebase Cloud Messaging (FCM)", 
    status: "connected", 
    type: "push"
  },
  { 
    id: "2", 
    name: "SMTP Email Service", 
    status: "connected", 
    type: "email"
  },
  { 
    id: "3", 
    name: "Twilio SMS", 
    status: "disconnected", 
    type: "sms"
  },
  { 
    id: "4", 
    name: "OneSignal", 
    status: "disconnected", 
    type: "push"
  },
];

// Mock data for daily quota and limits
const quotaLimits = {
  pushNotifications: {
    daily: 100000,
    used: 34256,
    remaining: 65744,
  },
  emails: {
    daily: 50000,
    used: 12890,
    remaining: 37110,
  },
  sms: {
    daily: 10000,
    used: 3456,
    remaining: 6544,
  },
};

const NotificationSettings = () => {
  const handleSaveGeneralSettings = () => {
    toast.success("General settings saved successfully");
  };

  const handleSaveThrottling = () => {
    toast.success("Throttling settings saved successfully");
  };

  const handleConnectIntegration = (id: string) => {
    toast.success("Integration connected successfully");
  };

  const handleDisconnectIntegration = (id: string) => {
    toast.success("Integration disconnected successfully");
  };

  return (
    <Tabs defaultValue="general" className="w-full space-y-6">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="general">
          <Settings className="h-4 w-4 mr-2" />
          General
        </TabsTrigger>
        <TabsTrigger value="throttling">
          <Clock className="h-4 w-4 mr-2" />
          Throttling & Limits
        </TabsTrigger>
        <TabsTrigger value="integrations">
          <ArrowRight className="h-4 w-4 mr-2" />
          Integrations
        </TabsTrigger>
        <TabsTrigger value="monitoring">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Monitoring
        </TabsTrigger>
      </TabsList>
      
      {/* General Settings */}
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Notification Settings</CardTitle>
            <CardDescription>
              Configure global notification preferences for all apps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Default Settings</h3>
              
              <div className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Notification Preview</Label>
                  <p className="text-sm text-muted-foreground">
                    Show content preview in push notifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Sound Enabled</Label>
                  <p className="text-sm text-muted-foreground">
                    Play sound when notifications are received
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Vibration</Label>
                  <p className="text-sm text-muted-foreground">
                    Vibrate device when notifications are received
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-priority">Default Priority</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger id="default-priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-ttl">Default Time-to-Live (TTL)</Label>
                  <Select defaultValue="86400">
                    <SelectTrigger id="default-ttl">
                      <SelectValue placeholder="Select TTL" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3600">1 Hour</SelectItem>
                      <SelectItem value="43200">12 Hours</SelectItem>
                      <SelectItem value="86400">24 Hours</SelectItem>
                      <SelectItem value="604800">7 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Brand Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="notification-icon">Default Notification Icon</Label>
                  <Input id="notification-icon" placeholder="Upload or enter URL" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="brand-color">Brand Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="brand-color" 
                      defaultValue="#FF5722" 
                      className="flex-1"
                    />
                    <div 
                      className="h-10 w-10 rounded-md border" 
                      style={{ backgroundColor: "#FF5722" }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sender-name">Default Sender Name</Label>
                <Input 
                  id="sender-name" 
                  defaultValue="WhizCart"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Opt-in/out Settings</h3>
              
              <div className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Allow Users to Opt-out</Label>
                  <p className="text-sm text-muted-foreground">
                    Let users unsubscribe from non-critical notifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Default Opt-in for New Users</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically subscribe new users to notifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveGeneralSettings}>Save Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      {/* Throttling & Limits */}
      <TabsContent value="throttling">
        <Card>
          <CardHeader>
            <CardTitle>Throttling & Rate Limits</CardTitle>
            <CardDescription>
              Configure rate limits and frequency caps for notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Daily Quotas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Push Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Daily Limit:</span>
                        <span className="font-semibold">{quotaLimits.pushNotifications.daily.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Used Today:</span>
                        <span className="font-semibold">{quotaLimits.pushNotifications.used.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Remaining:</span>
                        <span className="font-semibold">{quotaLimits.pushNotifications.remaining.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${(quotaLimits.pushNotifications.used / quotaLimits.pushNotifications.daily) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Email Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Daily Limit:</span>
                        <span className="font-semibold">{quotaLimits.emails.daily.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Used Today:</span>
                        <span className="font-semibold">{quotaLimits.emails.used.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Remaining:</span>
                        <span className="font-semibold">{quotaLimits.emails.remaining.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${(quotaLimits.emails.used / quotaLimits.emails.daily) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">SMS Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Daily Limit:</span>
                        <span className="font-semibold">{quotaLimits.sms.daily.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Used Today:</span>
                        <span className="font-semibold">{quotaLimits.sms.used.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Remaining:</span>
                        <span className="font-semibold">{quotaLimits.sms.remaining.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${(quotaLimits.sms.used / quotaLimits.sms.daily) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Throttling Rules</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-rate-limit">Maximum Notifications Per User</Label>
                    <div className="flex gap-4">
                      <Input 
                        id="user-rate-limit" 
                        type="number" 
                        defaultValue="10" 
                        min="1" 
                        className="w-24" 
                      />
                      <Select defaultValue="day">
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hour">Per Hour</SelectItem>
                          <SelectItem value="day">Per Day</SelectItem>
                          <SelectItem value="week">Per Week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="min-interval">Minimum Interval Between Notifications</Label>
                    <div className="flex gap-4">
                      <Input 
                        id="min-interval" 
                        type="number" 
                        defaultValue="30" 
                        min="0" 
                        className="w-24" 
                      />
                      <Select defaultValue="minutes">
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seconds">Seconds</SelectItem>
                          <SelectItem value="minutes">Minutes</SelectItem>
                          <SelectItem value="hours">Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="batch-size">Maximum Batch Size (Bulk Notifications)</Label>
                  <Input 
                    id="batch-size" 
                    type="number" 
                    defaultValue="10000" 
                    min="100" 
                    className="w-full" 
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Quiet Hours</Label>
                    <p className="text-sm text-muted-foreground">
                      Don't send non-critical notifications during late hours
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quiet-start">Quiet Hours Start</Label>
                    <Input 
                      id="quiet-start" 
                      type="time" 
                      defaultValue="22:00" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quiet-end">Quiet Hours End</Label>
                    <Input 
                      id="quiet-end" 
                      type="time" 
                      defaultValue="07:00" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveThrottling}>Save Throttling Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      {/* Integrations */}
      <TabsContent value="integrations">
        <Card>
          <CardHeader>
            <CardTitle>Notification Integrations</CardTitle>
            <CardDescription>
              Connect with external messaging and notification services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Integration</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integrations.map((integration) => (
                    <TableRow key={integration.id}>
                      <TableCell className="font-medium">{integration.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          <span className="capitalize">{integration.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {integration.status === 'connected' ? (
                          <span className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            Connected
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                            Disconnected
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {integration.status === 'connected' ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDisconnectIntegration(integration.id)}
                          >
                            Disconnect
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            onClick={() => handleConnectIntegration(integration.id)}
                          >
                            Connect
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Integration
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      {/* Monitoring */}
      <TabsContent value="monitoring">
        <Card>
          <CardHeader>
            <CardTitle>Notification Monitoring</CardTitle>
            <CardDescription>
              Monitor delivery performance and set up alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Delivery Alerts</h3>
              
              <div className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Alert on Low Delivery Rate</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when delivery success rate drops below threshold
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="delivery-threshold">Delivery Rate Threshold</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="delivery-threshold" 
                    type="number" 
                    defaultValue="90" 
                    min="1" 
                    max="100"
                    className="w-24" 
                  />
                  <span>%</span>
                </div>
              </div>
              
              <div className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Alert on Queue Buildup</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when notification queue exceeds threshold
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="queue-threshold">Queue Size Threshold</Label>
                <Input 
                  id="queue-threshold" 
                  type="number" 
                  defaultValue="1000" 
                  min="1" 
                  className="w-full" 
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Logs</h3>
              
              <div className="space-y-2">
                <Label htmlFor="log-retention">Log Retention Period</Label>
                <Select defaultValue="90">
                  <SelectTrigger id="log-retention">
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="60">60 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                    <SelectItem value="180">180 Days</SelectItem>
                    <SelectItem value="365">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Detailed Logging</Label>
                  <p className="text-sm text-muted-foreground">
                    Log detailed information about each notification
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Analytics</h3>
              
              <div className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Track Open Rate</Label>
                  <p className="text-sm text-muted-foreground">
                    Track when users open notifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Track Click Rate</Label>
                  <p className="text-sm text-muted-foreground">
                    Track when users click on notification CTAs
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Track Conversions</Label>
                  <p className="text-sm text-muted-foreground">
                    Track actions taken after notification interaction
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => toast.success("Monitoring settings saved successfully")}>
              Save Monitoring Settings
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default NotificationSettings;
