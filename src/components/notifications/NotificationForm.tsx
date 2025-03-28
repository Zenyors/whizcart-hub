
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const notificationSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title cannot exceed 100 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message cannot exceed 500 characters"),
  targetApp: z.enum(["customer", "rider", "vendor", "all"]),
  userSegment: z.string().optional(),
  notificationType: z.enum(["info", "success", "warning", "critical"]),
  actionUrl: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
  scheduleForLater: z.boolean().default(false),
  scheduledTime: z.string().optional(),
  sendInApp: z.boolean().default(true),
  sendPush: z.boolean().default(false),
  sendEmail: z.boolean().default(false),
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

const NotificationForm = () => {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      title: "",
      message: "",
      targetApp: "customer",
      userSegment: "",
      notificationType: "info",
      actionUrl: "",
      scheduleForLater: false,
      scheduledTime: "",
      sendInApp: true,
      sendPush: false,
      sendEmail: false,
    },
  });

  const watchScheduleForLater = form.watch("scheduleForLater");

  const onSubmit = (data: NotificationFormValues) => {
    console.log("Notification data:", data);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Notification created successfully", {
        description: `${data.title} will be sent to ${data.targetApp} app users`
      });
      form.reset();
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Notification</CardTitle>
        <CardDescription>
          Send notifications to your users, riders, or vendors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notification Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter notification title" />
                    </FormControl>
                    <FormDescription>
                      A short, attention-grabbing title
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="targetApp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Application</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select target application" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="customer">Customer App</SelectItem>
                        <SelectItem value="rider">Rider App</SelectItem>
                        <SelectItem value="vendor">Vendor App</SelectItem>
                        <SelectItem value="all">All Apps</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select which app users should receive this notification
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="userSegment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Segment (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., VIP, New Users, Inactive" />
                    </FormControl>
                    <FormDescription>
                      Target specific user segments (leave empty for all users)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notificationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notification Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select notification type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="info">Informational</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The type determines visual styling and urgency
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notification Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Enter detailed notification message" 
                      className="min-h-[120px]" 
                    />
                  </FormControl>
                  <FormDescription>
                    The main content of your notification
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="actionUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action URL (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://example.com/action" />
                  </FormControl>
                  <FormDescription>
                    Link to open when notification is clicked
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="scheduleForLater"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Schedule For Later</FormLabel>
                      <FormDescription>
                        Toggle to schedule this notification for a later time
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
              
              {watchScheduleForLater && (
                <FormField
                  control={form.control}
                  name="scheduledTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scheduled Time</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          min={new Date().toISOString().slice(0, 16)}
                        />
                      </FormControl>
                      <FormDescription>
                        When this notification should be sent
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Delivery Channels</h3>
              
              <FormField
                control={form.control}
                name="sendInApp"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">In-App Notification</FormLabel>
                      <FormDescription>
                        Show notification within the app
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
                name="sendPush"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Push Notification</FormLabel>
                      <FormDescription>
                        Send as a push notification to mobile devices
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
                name="sendEmail"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Email Notification</FormLabel>
                      <FormDescription>
                        Also send this notification as an email
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
            
            <div className="flex justify-end">
              <Button type="submit" size="lg">
                {watchScheduleForLater ? "Schedule Notification" : "Send Notification Now"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NotificationForm;
