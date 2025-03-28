
import React, { useState } from "react";
import { PlusCircle, File, FileEdit, FileX, AlignJustify, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Sample template categories
const templateCategories = [
  "Order Updates",
  "Promotions",
  "Account Alerts",
  "System Notifications",
  "Delivery Updates",
  "Payment Notifications",
];

// Sample templates
const initialTemplates = [
  {
    id: "1",
    name: "Order Confirmation",
    category: "Order Updates",
    content: "Thank you for your order #{{orderId}}! Your order has been confirmed and is being processed.",
    title: "Your Order #{{orderId}} is Confirmed",
    variables: ["orderId"],
    targetApp: "customer",
  },
  {
    id: "2",
    name: "Order Dispatched",
    category: "Order Updates",
    content: "Great news! Your order #{{orderId}} has been dispatched and is on its way to you. Track your delivery with this link: {{trackingLink}}",
    title: "Your Order #{{orderId}} is on the Way!",
    variables: ["orderId", "trackingLink"],
    targetApp: "customer",
  },
  {
    id: "3",
    name: "New Order Received",
    category: "Order Updates",
    content: "You have received a new order #{{orderId}}. Please prepare it within {{preparationTime}} minutes.",
    title: "New Order #{{orderId}} Received",
    variables: ["orderId", "preparationTime"],
    targetApp: "vendor",
  },
  {
    id: "4",
    name: "Weekend Sale",
    category: "Promotions",
    content: "Don't miss our weekend sale! Get {{discountPercent}}% off on all items this weekend only. Shop now!",
    title: "Weekend Sale - {{discountPercent}}% OFF Everything!",
    variables: ["discountPercent"],
    targetApp: "customer",
  },
  {
    id: "5",
    name: "Low Stock Alert",
    category: "System Notifications",
    content: "Your product '{{productName}}' is running low on stock ({{currentStock}} remaining). Please restock soon.",
    title: "Low Stock Alert: {{productName}}",
    variables: ["productName", "currentStock"],
    targetApp: "vendor",
  },
];

interface Template {
  id: string;
  name: string;
  category: string;
  content: string;
  title: string;
  variables: string[];
  targetApp: string;
}

const NotificationTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [appFilter, setAppFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({
    name: "",
    category: "",
    content: "",
    title: "",
    variables: [],
    targetApp: "customer",
  });
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [variablesInput, setVariablesInput] = useState("");

  // Filter templates based on category, app, and search query
  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = categoryFilter === "" || template.category === categoryFilter;
    const matchesApp = appFilter === "" || template.targetApp === appFilter;
    const matchesSearch = searchQuery === "" || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesApp && matchesSearch;
  });

  const handleAddTemplate = () => {
    if (!newTemplate.name || !newTemplate.category || !newTemplate.content || !newTemplate.title) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const variables = variablesInput.split(",").map(v => v.trim()).filter(v => v);
    
    const template: Template = {
      id: Date.now().toString(),
      name: newTemplate.name,
      category: newTemplate.category,
      content: newTemplate.content,
      title: newTemplate.title,
      variables: variables,
      targetApp: newTemplate.targetApp || "customer",
    };
    
    setTemplates([...templates, template]);
    setNewTemplate({
      name: "",
      category: "",
      content: "",
      title: "",
      variables: [],
      targetApp: "customer",
    });
    setVariablesInput("");
    setIsAddDialogOpen(false);
    toast.success("Template added successfully");
  };

  const handleEditTemplate = () => {
    if (!editingTemplate) return;
    
    const variables = variablesInput.split(",").map(v => v.trim()).filter(v => v);
    const updatedTemplate = { ...editingTemplate, variables };
    
    setTemplates(templates.map(t => t.id === updatedTemplate.id ? updatedTemplate : t));
    setEditingTemplate(null);
    setVariablesInput("");
    toast.success("Template updated successfully");
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast.success("Template deleted successfully");
  };

  const startEdit = (template: Template) => {
    setEditingTemplate(template);
    setVariablesInput(template.variables.join(", "));
  };

  const handleDuplicateTemplate = (template: Template) => {
    const newId = Date.now().toString();
    const duplicatedTemplate = {
      ...template,
      id: newId,
      name: `${template.name} (Copy)`,
    };
    
    setTemplates([...templates, duplicatedTemplate]);
    toast.success("Template duplicated successfully");
  };

  const getAppLabel = (app: string) => {
    switch (app) {
      case "customer": return "Customer App";
      case "rider": return "Rider App";
      case "vendor": return "Vendor App";
      case "all": return "All Apps";
      default: return app;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>
                Create and manage reusable notification templates
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Template
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Template</DialogTitle>
                  <DialogDescription>
                    Create a reusable notification template with variables
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="name">Template Name</Label>
                      <Input
                        id="name"
                        value={newTemplate.name}
                        onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                        placeholder="e.g., Order Confirmation"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={newTemplate.category} 
                        onValueChange={(value) => setNewTemplate({ ...newTemplate, category: value })}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {templateCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="targetApp">Target App</Label>
                      <Select 
                        value={newTemplate.targetApp} 
                        onValueChange={(value) => setNewTemplate({ ...newTemplate, targetApp: value })}
                      >
                        <SelectTrigger id="targetApp">
                          <SelectValue placeholder="Select target app" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">Customer App</SelectItem>
                          <SelectItem value="rider">Rider App</SelectItem>
                          <SelectItem value="vendor">Vendor App</SelectItem>
                          <SelectItem value="all">All Apps</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="title">Notification Title</Label>
                      <Input
                        id="title"
                        value={newTemplate.title}
                        onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                        placeholder="e.g., Your Order #{{orderId}} is Confirmed"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Use {{variableName}} syntax for dynamic content
                      </p>
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="content">Notification Content</Label>
                      <Textarea
                        id="content"
                        value={newTemplate.content}
                        onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                        placeholder="e.g., Thank you for your order #{{orderId}}! Your order has been confirmed and is being processed."
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Use {{variableName}} syntax for dynamic content
                      </p>
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="variables">Variables (comma separated)</Label>
                      <Input
                        id="variables"
                        value={variablesInput}
                        onChange={(e) => setVariablesInput(e.target.value)}
                        placeholder="e.g., orderId, customerName, amount"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddTemplate}>Save Template</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <div className="flex flex-row gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {templateCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={appFilter} onValueChange={setAppFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Apps" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Apps</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="rider">Rider</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                    <SelectItem value="all">Multi-App</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <AlignJustify className="h-3 w-3" />
                          {template.category}
                        </CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => startEdit(template)}
                          className="h-8 w-8"
                        >
                          <FileEdit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDuplicateTemplate(template)}
                          className="h-8 w-8"
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Duplicate</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <FileX className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border text-sm">
                      <div className="font-medium mb-1">{template.title}</div>
                      <div className="text-muted-foreground">{template.content}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Variables:</span>{" "}
                      {template.variables.join(", ") || "None"}
                    </div>
                    <div className="text-xs">
                      <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {getAppLabel(template.targetApp)}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredTemplates.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                  <File className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No templates found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery || categoryFilter || appFilter 
                      ? "Try adjusting your filters" 
                      : "Create your first template to get started"}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Template
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Template Dialog */}
      {editingTemplate && (
        <Dialog open={!!editingTemplate} onOpenChange={(open) => !open && setEditingTemplate(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Template</DialogTitle>
              <DialogDescription>
                Update your notification template
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="edit-name">Template Name</Label>
                  <Input
                    id="edit-name"
                    value={editingTemplate.name}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Select 
                    value={editingTemplate.category} 
                    onValueChange={(value) => setEditingTemplate({ ...editingTemplate, category: value })}
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {templateCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-targetApp">Target App</Label>
                  <Select 
                    value={editingTemplate.targetApp} 
                    onValueChange={(value) => setEditingTemplate({ ...editingTemplate, targetApp: value })}
                  >
                    <SelectTrigger id="edit-targetApp">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer App</SelectItem>
                      <SelectItem value="rider">Rider App</SelectItem>
                      <SelectItem value="vendor">Vendor App</SelectItem>
                      <SelectItem value="all">All Apps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-title">Notification Title</Label>
                  <Input
                    id="edit-title"
                    value={editingTemplate.title}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, title: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-content">Notification Content</Label>
                  <Textarea
                    id="edit-content"
                    value={editingTemplate.content}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, content: e.target.value })}
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use {{variableName}} syntax for dynamic content
                  </p>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-variables">Variables (comma separated)</Label>
                  <Input
                    id="edit-variables"
                    value={variablesInput}
                    onChange={(e) => setVariablesInput(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingTemplate(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditTemplate}>Update Template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default NotificationTemplates;
