
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Bell, Mail, MessageSquare, Settings, Clock, Server, Check, AlertTriangle, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock APIs configuration data
const mockAPIs = [
  {
    id: "api-1",
    name: "Firebase Cloud Messaging",
    type: "push",
    status: "active",
    key: "********-****-****-****-************",
  },
  {
    id: "api-2",
    name: "SendGrid",
    type: "email",
    status: "active",
    key: "********-****-****-****-************",
  },
  {
    id: "api-3",
    name: "Twilio",
    type: "sms",
    status: "inactive",
    key: "",
  },
  {
    id: "api-4",
    name: "OneSignal",
    type: "push",
    status: "inactive",
    key: "",
  }
];

// Mock channels data
const mockChannels = [
  {
    id: "channel-1",
    name: "Transactional",
    description: "Order updates, payment confirmations, etc.",
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: true,
  },
  {
    id: "channel-2",
    name: "Marketing",
    description: "Promotions, offers, and campaigns",
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
  },
  {
    id: "channel-3",
    name: "System",
    description: "System alerts and important notices",
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
  }
];

// Mock rate limits data
const mockRateLimits = [
  {
    id: "limit-1",
    type: "push",
    maxPerMinute: 100,
    maxPerHour: 1000,
    maxPerDay: 5000,
    cooldown: 10,
  },
  {
    id: "limit-2",
    type: "email",
    maxPerMinute: 50,
    maxPerHour: 500,
    maxPerDay: 2000,
    cooldown: 30,
  },
  {
    id: "limit-3",
    type: "sms",
    maxPerMinute: 20,
    maxPerHour: 100,
    maxPerDay: 500,
    cooldown: 60,
  }
];

const NotificationSettings = () => {
  const { toast } = useToast();
  const [showAddAPIDialog, setShowAddAPIDialog] = useState(false);
  
  const handleSaveAPI = (e) => {
    e.preventDefault();
    toast({
      title: "API Configured",
      description: "Your API configuration has been saved successfully.",
    });
    setShowAddAPIDialog(false);
  };
  
  const handleDeleteAPI = (apiId) => {
    toast({
      title: "API Removed",
      description: "The API configuration has been removed.",
    });
  };
  
  const handleUpdateChannel = (channelId, field, value) => {
    toast({
      title: "Channel Updated",
      description: "Notification channel settings have been updated.",
    });
  };
  
  const handleSaveRateLimits = () => {
    toast({
      title: "Rate Limits Updated",
      description: "Notification rate limits have been saved.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Configure notification delivery settings and integrations</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="apis" className="space-y-4">
          <TabsList>
            <TabsTrigger value="apis">
              <Server className="h-4 w-4 mr-2" />
              API Integrations
            </TabsTrigger>
            <TabsTrigger value="channels">
              <Bell className="h-4 w-4 mr-2" />
              Notification Channels
            </TabsTrigger>
            <TabsTrigger value="rate-limits">
              <Clock className="h-4 w-4 mr-2" />
              Rate Limits
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Settings className="h-4 w-4 mr-2" />
              Default Preferences
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="apis" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Notification Service Providers</h3>
              <Button onClick={() => setShowAddAPIDialog(true)} className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Add API
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>API Key</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAPIs.map((api) => (
                    <TableRow key={api.id}>
                      <TableCell className="font-medium">{api.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {api.type === "push" && <Bell className="h-3 w-3 mr-1" />}
                          {api.type === "email" && <Mail className="h-3 w-3 mr-1" />}
                          {api.type === "sms" && <MessageSquare className="h-3 w-3 mr-1" />}
                          {api.type.charAt(0).toUpperCase() + api.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={api.status === "active" ? "default" : "secondary"} className="gap-1">
                          {api.status === "active" ? <Check className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                          {api.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {api.key ? api.key : "Not configured"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            Configure
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteAPI(api.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Testing</h3>
              <div className="flex items-center gap-4">
                <Button variant="outline">Send Test Push Notification</Button>
                <Button variant="outline">Send Test Email</Button>
                <Button variant="outline">Send Test SMS</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="channels" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Channels</h3>
              <p className="text-sm text-muted-foreground">
                Configure which notification types are enabled for each channel
              </p>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Channel</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Push</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>SMS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockChannels.map((channel) => (
                    <TableRow key={channel.id}>
                      <TableCell className="font-medium">{channel.name}</TableCell>
                      <TableCell>{channel.description}</TableCell>
                      <TableCell>
                        <Switch
                          checked={channel.pushEnabled}
                          onCheckedChange={(checked) => handleUpdateChannel(channel.id, "pushEnabled", checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={channel.emailEnabled}
                          onCheckedChange={(checked) => handleUpdateChannel(channel.id, "emailEnabled", checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={channel.smsEnabled}
                          onCheckedChange={(checked) => handleUpdateChannel(channel.id, "smsEnabled", checked)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex items-center justify-between">
              <Button variant="outline" className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Channel
              </Button>
              <Button>Save Changes</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="rate-limits" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Rate Limiting</h3>
                  <p className="text-sm text-muted-foreground">
                    Control how many notifications can be sent in a given time period
                  </p>
                </div>
                <Button variant="outline">Reset to Defaults</Button>
              </div>
            </div>
            
            <div className="space-y-8">
              {mockRateLimits.map((limit) => (
                <div key={limit.id} className="space-y-4">
                  <div className="flex items-center gap-2">
                    {limit.type === "push" && <Bell className="h-5 w-5" />}
                    {limit.type === "email" && <Mail className="h-5 w-5" />}
                    {limit.type === "sms" && <MessageSquare className="h-5 w-5" />}
                    <h4 className="text-base font-medium">
                      {limit.type.charAt(0).toUpperCase() + limit.type.slice(1)} Notification Limits
                    </h4>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${limit.id}-per-minute`}>Max per minute: {limit.maxPerMinute}</Label>
                        <span className="text-sm text-muted-foreground w-12 text-right">{limit.maxPerMinute}</span>
                      </div>
                      <Slider
                        id={`${limit.id}-per-minute`}
                        defaultValue={[limit.maxPerMinute]}
                        max={200}
                        step={5}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${limit.id}-per-hour`}>Max per hour: {limit.maxPerHour}</Label>
                        <span className="text-sm text-muted-foreground w-12 text-right">{limit.maxPerHour}</span>
                      </div>
                      <Slider
                        id={`${limit.id}-per-hour`}
                        defaultValue={[limit.maxPerHour]}
                        max={2000}
                        step={50}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${limit.id}-per-day`}>Max per day: {limit.maxPerDay}</Label>
                        <span className="text-sm text-muted-foreground w-12 text-right">{limit.maxPerDay}</span>
                      </div>
                      <Slider
                        id={`${limit.id}-per-day`}
                        defaultValue={[limit.maxPerDay]}
                        max={10000}
                        step={100}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${limit.id}-cooldown`}>
                          Cooldown period (seconds): {limit.cooldown}
                        </Label>
                        <span className="text-sm text-muted-foreground w-12 text-right">{limit.cooldown}</span>
                      </div>
                      <Slider
                        id={`${limit.id}-cooldown`}
                        defaultValue={[limit.cooldown]}
                        max={300}
                        step={5}
                      />
                      <p className="text-sm text-muted-foreground">
                        Minimum time between notifications sent to the same user
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSaveRateLimits}>Save Rate Limits</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Default User Preferences</h3>
              <p className="text-sm text-muted-foreground">
                Set default notification preferences for new users
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Bell className="h-4 w-4 mr-2" />
                    <span className="font-medium">Push Notifications</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Send notifications to users' devices
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="font-medium">Email Notifications</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Send notification emails to users
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span className="font-medium">SMS Notifications</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Send SMS text messages to users
                  </div>
                </div>
                <Switch />
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">Time Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quiet-hours-start">Quiet Hours Start</Label>
                  <Select defaultValue="22">
                    <SelectTrigger id="quiet-hours-start">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(24)].map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i < 10 ? `0${i}:00` : `${i}:00`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quiet-hours-end">Quiet Hours End</Label>
                  <Select defaultValue="7">
                    <SelectTrigger id="quiet-hours-end">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(24)].map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i < 10 ? `0${i}:00` : `${i}:00`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="respect-quiet-hours" defaultChecked />
                <Label htmlFor="respect-quiet-hours">Respect quiet hours for marketing notifications</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Transactional notifications will still be delivered during quiet hours
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button>Save Preferences</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Add API Dialog */}
      <Dialog open={showAddAPIDialog} onOpenChange={setShowAddAPIDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add API Integration</DialogTitle>
            <DialogDescription>
              Configure a new notification service provider
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveAPI} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-service">Service Type</Label>
              <Select defaultValue="push">
                <SelectTrigger id="api-service">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="push">Push Notification Service</SelectItem>
                  <SelectItem value="email">Email Service</SelectItem>
                  <SelectItem value="sms">SMS Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-provider">Service Provider</Label>
              <Select defaultValue="firebase">
                <SelectTrigger id="api-provider">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="firebase">Firebase Cloud Messaging</SelectItem>
                  <SelectItem value="onesignal">OneSignal</SelectItem>
                  <SelectItem value="sendgrid">SendGrid</SelectItem>
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="custom">Custom API</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-name">Display Name</Label>
              <Input id="api-name" placeholder="e.g., Production FCM" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input id="api-key" type="password" placeholder="Enter your API key" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-secret">API Secret (if applicable)</Label>
              <Input id="api-secret" type="password" placeholder="Enter your API secret" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="active-status" defaultChecked />
                <Label htmlFor="active-status">Set as active</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowAddAPIDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Configuration</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default NotificationSettings;
