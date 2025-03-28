
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Copy, Trash2, Edit, Send, Bell, MessageSquare, Tag, User, FileText, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const templates = [
  {
    id: "template-1",
    name: "Order Confirmation",
    type: "transactional",
    app: "customer",
    lastEdited: "2023-07-15",
    subject: "Your order has been confirmed",
    body: "Dear {{customer_name}}, we're happy to confirm your order #{{order_id}} has been received and is being processed. You'll receive another notification once it ships. Thank you for shopping with us!",
    variables: ["customer_name", "order_id"],
  },
  {
    id: "template-2",
    name: "Delivery Assignment",
    type: "transactional",
    app: "rider",
    lastEdited: "2023-07-10",
    subject: "New delivery assignment",
    body: "Hi {{rider_name}}, you have a new delivery assignment. Order #{{order_id}} is ready for pickup from {{vendor_name}} at {{pickup_address}}. Please proceed to the pickup location.",
    variables: ["rider_name", "order_id", "vendor_name", "pickup_address"],
  },
  {
    id: "template-3",
    name: "New Order Received",
    type: "transactional",
    app: "vendor",
    lastEdited: "2023-07-05",
    subject: "New order received",
    body: "Hello {{vendor_name}}, you have received a new order #{{order_id}} from {{customer_name}}. Please review and confirm the order as soon as possible.",
    variables: ["vendor_name", "order_id", "customer_name"],
  },
  {
    id: "template-4",
    name: "Promotional Offer",
    type: "marketing",
    app: "customer",
    lastEdited: "2023-06-28",
    subject: "Special offer just for you!",
    body: "Hi {{customer_name}}, we've got a special offer just for you! Use code {{promo_code}} to get {{discount_amount}} off your next purchase until {{expiry_date}}.",
    variables: ["customer_name", "promo_code", "discount_amount", "expiry_date"],
  },
  {
    id: "template-5",
    name: "Weekly Earnings Summary",
    type: "transactional",
    app: "vendor",
    lastEdited: "2023-06-22",
    subject: "Your weekly earnings summary",
    body: "Dear {{vendor_name}}, here's your earnings summary for the week of {{week_start}} to {{week_end}}. Total orders: {{total_orders}}. Total earnings: {{total_earnings}}.",
    variables: ["vendor_name", "week_start", "week_end", "total_orders", "total_earnings"],
  },
];

const TemplateVariable = ({ name }) => (
  <Badge variant="outline" className="mr-1 mb-1 cursor-help">
    <Tag className="h-3 w-3 mr-1" /> {name}
  </Badge>
);

const NotificationTemplates = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterApp, setFilterApp] = useState("all");
  const [showNewTemplateDialog, setShowNewTemplateDialog] = useState(false);
  const [showEditTemplateDialog, setShowEditTemplateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  
  const filteredTemplates = templates.filter(template => {
    const searchMatch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        template.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = filterType === "all" || template.type === filterType;
    const appMatch = filterApp === "all" || template.app === filterApp;
    
    return searchMatch && typeMatch && appMatch;
  });

  const handleEditClick = (template) => {
    setSelectedTemplate(template);
    setShowEditTemplateDialog(true);
  };

  const handlePreviewClick = (template) => {
    setSelectedTemplate(template);
    setShowPreviewDialog(true);
  };

  const handleDuplicateTemplate = (template) => {
    toast({
      title: "Template Duplicated",
      description: `"${template.name}" has been duplicated. You can now edit the copy.`,
    });
  };

  const handleDeleteTemplate = (templateId) => {
    toast({
      title: "Template Deleted",
      description: "The template has been deleted successfully.",
    });
  };

  const handleSaveTemplate = (e) => {
    e.preventDefault();
    toast({
      title: "Template Saved",
      description: "Your template has been saved successfully.",
    });
    setShowNewTemplateDialog(false);
    setShowEditTemplateDialog(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Notification Templates</CardTitle>
            <CardDescription>Manage templates for emails, push notifications, and SMS</CardDescription>
          </div>
          <Button onClick={() => setShowNewTemplateDialog(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Template
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Template Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="transactional">Transactional</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterApp} onValueChange={setFilterApp}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="App" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Apps</SelectItem>
                <SelectItem value="customer">Customer App</SelectItem>
                <SelectItem value="rider">Rider App</SelectItem>
                <SelectItem value="vendor">Vendor App</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>App</TableHead>
                <TableHead>Last Edited</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No templates found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>
                      <Badge variant={template.type === "transactional" ? "default" : "secondary"}>
                        {template.type === "transactional" ? "Transactional" : "Marketing"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {template.app === "customer" && <User className="h-3 w-3 mr-1" />}
                        {template.app === "rider" && <Send className="h-3 w-3 mr-1" />}
                        {template.app === "vendor" && <Store className="h-3 w-3 mr-1" />}
                        {template.app.charAt(0).toUpperCase() + template.app.slice(1)} App
                      </Badge>
                    </TableCell>
                    <TableCell>{template.lastEdited}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePreviewClick(template)}
                          title="Preview"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(template)}
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDuplicateTemplate(template)}
                          title="Duplicate"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTemplate(template.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* New Template Dialog */}
      <Dialog open={showNewTemplateDialog} onOpenChange={setShowNewTemplateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>
              Create a notification template for emails, push notifications, or SMS
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveTemplate} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input id="template-name" placeholder="e.g., Order Confirmation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-type">Template Type</Label>
                  <Select defaultValue="transactional">
                    <SelectTrigger id="template-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transactional">Transactional</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="app-target">Target App</Label>
                  <Select defaultValue="customer">
                    <SelectTrigger id="app-target">
                      <SelectValue placeholder="Select app" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer App</SelectItem>
                      <SelectItem value="rider">Rider App</SelectItem>
                      <SelectItem value="vendor">Vendor App</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="delivery-channel">Delivery Channel</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="delivery-channel">
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Channels</SelectItem>
                      <SelectItem value="push">Push Notification</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject/Title</Label>
                <Input id="subject" placeholder="Notification subject or title" />
                <p className="text-xs text-muted-foreground">
                  For push notifications, this will be the notification title
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="body">Message Body</Label>
                  <div className="text-xs text-muted-foreground">
                    Use {'{{variable_name}}'} for dynamic content
                  </div>
                </div>
                <Textarea 
                  id="body" 
                  rows={5} 
                  placeholder="Enter the message body with {{variables}} for dynamic content" 
                />
              </div>
              
              <div className="space-y-2">
                <Label>Available Variables</Label>
                <div className="flex flex-wrap gap-1 p-2 border rounded-md">
                  <TemplateVariable name="customer_name" />
                  <TemplateVariable name="order_id" />
                  <TemplateVariable name="vendor_name" />
                  <TemplateVariable name="product_name" />
                  <TemplateVariable name="delivery_date" />
                  <TemplateVariable name="rider_name" />
                  <TemplateVariable name="amount" />
                  <TemplateVariable name="status" />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowNewTemplateDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Template</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={showEditTemplateDialog} onOpenChange={setShowEditTemplateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>
              Modify an existing notification template
            </DialogDescription>
          </DialogHeader>
          
          {selectedTemplate && (
            <form onSubmit={handleSaveTemplate} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-template-name">Template Name</Label>
                    <Input 
                      id="edit-template-name" 
                      defaultValue={selectedTemplate.name} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-template-type">Template Type</Label>
                    <Select defaultValue={selectedTemplate.type}>
                      <SelectTrigger id="edit-template-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="transactional">Transactional</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-app-target">Target App</Label>
                    <Select defaultValue={selectedTemplate.app}>
                      <SelectTrigger id="edit-app-target">
                        <SelectValue placeholder="Select app" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer App</SelectItem>
                        <SelectItem value="rider">Rider App</SelectItem>
                        <SelectItem value="vendor">Vendor App</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-delivery-channel">Delivery Channel</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="edit-delivery-channel">
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Channels</SelectItem>
                        <SelectItem value="push">Push Notification</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-subject">Subject/Title</Label>
                  <Input 
                    id="edit-subject" 
                    defaultValue={selectedTemplate.subject} 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="edit-body">Message Body</Label>
                    <div className="text-xs text-muted-foreground">
                      Use {'{{variable_name}}'} for dynamic content
                    </div>
                  </div>
                  <Textarea 
                    id="edit-body" 
                    rows={5} 
                    defaultValue={selectedTemplate.body} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Variables Used</Label>
                  <div className="flex flex-wrap gap-1 p-2 border rounded-md">
                    {selectedTemplate.variables.map((variable) => (
                      <TemplateVariable key={variable} name={variable} />
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowEditTemplateDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Template Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
            <DialogDescription>
              Preview how your notification will appear
            </DialogDescription>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-6">
              <Tabs defaultValue="push">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="push">
                    <Bell className="h-4 w-4 mr-2" />
                    Push
                  </TabsTrigger>
                  <TabsTrigger value="email">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="sms">
                    <FileText className="h-4 w-4 mr-2" />
                    SMS
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="push" className="space-y-4 pt-4">
                  <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        <Bell className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold">{selectedTemplate.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedTemplate.body.replace(/{{([^}]+)}}/g, (_, varName) => `[${varName}]`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="email" className="space-y-4 pt-4">
                  <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                    <p className="font-semibold mb-2">Subject: {selectedTemplate.subject}</p>
                    <div className="border-t pt-2">
                      <p className="text-sm">
                        {selectedTemplate.body.replace(/{{([^}]+)}}/g, (_, varName) => `[${varName}]`)}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="sms" className="space-y-4 pt-4">
                  <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                    <p className="text-sm">
                      {selectedTemplate.body.replace(/{{([^}]+)}}/g, (_, varName) => `[${varName}]`)}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Variables that will be replaced:</h4>
                <div className="text-sm space-y-1">
                  {selectedTemplate.variables.map((variable) => (
                    <div key={variable} className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        {`{{${variable}}}`}
                      </Badge>
                      <span className="text-muted-foreground">→</span>
                      <span className="ml-2 font-medium">[Dynamic {variable.replace(/_/g, ' ')}]</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setShowPreviewDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default NotificationTemplates;
