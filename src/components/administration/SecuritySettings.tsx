
import React from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertCircle, Key, Shield } from "lucide-react";

const securitySettingsSchema = z.object({
  passwordMinLength: z.number().min(6).max(32),
  passwordComplexity: z.string(),
  mfaEnabled: z.boolean().default(false),
  sessionTimeout: z.number().min(5).max(720),
  loginAttempts: z.number().min(3).max(10),
  ipWhitelisting: z.boolean().default(false),
  whitelistedIps: z.string().optional(),
});

type SecuritySettingsValues = z.infer<typeof securitySettingsSchema>;

const SecuritySettings = () => {
  const form = useForm<SecuritySettingsValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      passwordMinLength: 8,
      passwordComplexity: "medium",
      mfaEnabled: false,
      sessionTimeout: 60,
      loginAttempts: 5,
      ipWhitelisting: false,
      whitelistedIps: "",
    },
  });

  const onSubmit = (data: SecuritySettingsValues) => {
    console.log("Security settings:", data);
    toast.success("Security settings updated successfully");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Security Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Configure your application's security settings, authentication methods, and access controls.
              </p>
              <div className="mt-4 w-full">
                <Button variant="outline" className="w-full mt-2">Run Security Scan</Button>
                <Button variant="outline" className="w-full mt-2">View Audit Logs</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="col-span-1 md:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Key className="h-5 w-5" /> Password Policy
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="passwordMinLength"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Password Length</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value))} 
                          />
                        </FormControl>
                        <FormDescription>Minimum length for passwords (6-32)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="passwordComplexity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Complexity</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select complexity" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low (letters only)</SelectItem>
                            <SelectItem value="medium">Medium (letters + numbers)</SelectItem>
                            <SelectItem value="high">High (letters, numbers, symbols)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Required password complexity level</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <h3 className="text-lg font-medium mt-6 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" /> Authentication Security
                </h3>
                
                <FormField
                  control={form.control}
                  name="mfaEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Multi-Factor Authentication</FormLabel>
                        <FormDescription>
                          Require MFA for all administrator accounts
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sessionTimeout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session Timeout (minutes)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value))} 
                          />
                        </FormControl>
                        <FormDescription>Auto-logout after inactivity (5-720 min)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="loginAttempts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Login Attempts</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value))} 
                          />
                        </FormControl>
                        <FormDescription>Before account lockout (3-10)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="ipWhitelisting"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">IP Whitelisting</FormLabel>
                        <FormDescription>
                          Restrict admin access to specific IP addresses
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
                
                {form.watch("ipWhitelisting") && (
                  <FormField
                    control={form.control}
                    name="whitelistedIps"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Whitelisted IP Addresses</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 192.168.1.1, 10.0.0.0/24" />
                        </FormControl>
                        <FormDescription>Enter IP addresses or CIDR ranges, separated by commas</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              
              <Button type="submit">Save Security Settings</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
