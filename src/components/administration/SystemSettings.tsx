
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const systemSettingsSchema = z.object({
  siteName: z.string().min(2, { message: "Site name must be at least 2 characters" }),
  siteUrl: z.string().url({ message: "Please enter a valid URL" }),
  adminEmail: z.string().email({ message: "Please enter a valid email address" }),
  defaultCurrency: z.string(),
  orderPrefix: z.string().min(1, { message: "Order prefix is required" }),
  maintenanceMode: z.boolean().default(false),
  analyticsEnabled: z.boolean().default(true),
});

type SystemSettingsValues = z.infer<typeof systemSettingsSchema>;

const SystemSettings = () => {
  // Add state to track if settings have been updated
  const [settingsUpdated, setSettingsUpdated] = useState(false);
  const [currentSettings, setCurrentSettings] = useState<SystemSettingsValues>({
    siteName: "WhizCart",
    siteUrl: "https://whizcart.com",
    adminEmail: "admin@whizcart.com",
    defaultCurrency: "INR",
    orderPrefix: "WC",
    maintenanceMode: false,
    analyticsEnabled: true,
  });
  
  const form = useForm<SystemSettingsValues>({
    resolver: zodResolver(systemSettingsSchema),
    defaultValues: currentSettings,
  });

  const onSubmit = (data: SystemSettingsValues) => {
    console.log("System settings:", data);
    
    // Update local state with new settings
    setCurrentSettings(data);
    setSettingsUpdated(true);
    
    // Show success notification with specific changes
    toast.success("System settings updated successfully", {
      description: "Your changes have been saved"
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {settingsUpdated && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Settings have been updated successfully</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="siteName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>The name of your e-commerce platform</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="siteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>The URL of your website</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="adminEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Primary administrator email address</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="defaultCurrency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Currency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GBP">British Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Default currency for transactions</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="orderPrefix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Prefix</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Prefix used for order IDs (e.g., WC-12345)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">System Options</h3>
          
          <FormField
            control={form.control}
            name="maintenanceMode"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Maintenance Mode</FormLabel>
                  <FormDescription>
                    Temporarily disable the site for maintenance
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="analyticsEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Analytics</FormLabel>
                  <FormDescription>
                    Enable usage analytics and tracking
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {settingsUpdated && (
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleString()}
          </div>
        )}
        
        <div className="flex gap-2">
          <Button type="submit">Save Settings</Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              form.reset(currentSettings);
              setSettingsUpdated(false);
            }}
          >
            Reset Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SystemSettings;
