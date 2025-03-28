
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
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertCircle, Key, Shield, CheckCircle2 } from "lucide-react";

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
  const [securityUpdated, setSecurityUpdated] = useState(false);
  const [currentSecurity, setCurrentSecurity] = useState<SecuritySettingsValues>({
    passwordMinLength: 8,
    passwordComplexity: "medium",
    mfaEnabled: false,
    sessionTimeout: 60,
    loginAttempts: 5,
    ipWhitelisting: false,
    whitelistedIps: "",
  });

  const form = useForm<SecuritySettingsValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: currentSecurity,
  });

  const onSubmit = (data: SecuritySettingsValues) => {
    console.log("Security settings:", data);
    
    // Update local state
    setCurrentSecurity(data);
    setSecurityUpdated(true);
    
    toast.success("Security settings updated successfully", {
      description: "Your security changes have been applied"
    });
  };

  // Security score calculation based on settings
  const calculateSecurityScore = (settings: SecuritySettingsValues): number => {
    let score = 0;
    
    // Password length score
    score += Math.min(10, settings.passwordMinLength - 4);
    
    // Password complexity score
    score += settings.passwordComplexity === "high" ? 15 : 
             settings.passwordComplexity === "medium" ? 10 : 5;
    
    // MFA score
    score += settings.mfaEnabled ? 25 : 0;
    
    // Session timeout score (shorter is more secure)
    score += settings.sessionTimeout <= 30 ? 15 : 
             settings.sessionTimeout <= 60 ? 10 : 5;
    
    // Login attempts score (fewer is more secure)
    score += settings.loginAttempts <= 3 ? 15 : 
             settings.loginAttempts <= 5 ? 10 : 5;
    
    // IP Whitelisting score
    score += settings.ipWhitelisting ? 20 : 0;
    
    return Math.min(100, score);
  };
  
  const securityScore = calculateSecurityScore(form.watch());
  
  return (
    <div className="space-y-6">
      {securityUpdated && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Security settings have been updated successfully</p>
              <p className="text-sm mt-1">New security score: {securityScore}%</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Security Dashboard</h3>
              
              <div className="w-full py-2">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                        Security Score
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-primary">
                        {securityScore}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
                    <div 
                      style={{ width: `${securityScore}%` }} 
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        securityScore >= 80 ? "bg-green-500" : 
                        securityScore >= 60 ? "bg-amber-500" : 
                        "bg-red-500"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
              
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
              
              {securityUpdated && (
                <div className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleString()}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button type="submit">Save Security Settings</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    form.reset(currentSecurity);
                    setSecurityUpdated(false);
                  }}
                >
                  Reset Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
