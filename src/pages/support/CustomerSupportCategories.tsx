
import React from "react";
import { Helmet } from "react-helmet";
import { 
  User, 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  Package, 
  Settings, 
  ArrowRight, 
  MessageSquare,
  IndianRupee
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

interface SupportCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  articles: number;
  color: string;
}

const CustomerSupportCategories = () => {
  const navigate = useNavigate();
  
  const customerCategories: SupportCategory[] = [
    {
      id: "account",
      title: "Account Management",
      description: "Profile settings, privacy, security",
      icon: User,
      articles: 24,
      color: "bg-blue-500"
    },
    {
      id: "orders",
      title: "Orders & Tracking",
      description: "Track orders, modify orders, history",
      icon: ShoppingCart,
      articles: 32,
      color: "bg-green-500"
    },
    {
      id: "payments",
      title: "Payments & Refunds",
      description: "Payment methods, refund status",
      icon: IndianRupee,
      articles: 18,
      color: "bg-purple-500"
    },
    {
      id: "delivery",
      title: "Delivery Issues",
      description: "Delivery status, delays, location",
      icon: Truck,
      articles: 15,
      color: "bg-amber-500"
    },
    {
      id: "returns",
      title: "Returns & Replacements",
      description: "Return policy, process, status",
      icon: Package,
      articles: 12,
      color: "bg-red-500"
    },
    {
      id: "tech",
      title: "Technical Support",
      description: "App/website issues, account access",
      icon: Settings,
      articles: 21,
      color: "bg-teal-500"
    }
  ];
  
  const vendorCategories: SupportCategory[] = [
    {
      id: "store-setup",
      title: "Store Setup & Management",
      description: "Store settings, branding, policies",
      icon: Settings,
      articles: 18,
      color: "bg-blue-500"
    },
    {
      id: "listings",
      title: "Product Listings",
      description: "Adding products, inventory, pricing",
      icon: Package,
      articles: 26,
      color: "bg-green-500"
    },
    {
      id: "vendor-orders",
      title: "Order Management",
      description: "Processing orders, logistics",
      icon: ShoppingCart,
      articles: 22,
      color: "bg-purple-500"
    },
    {
      id: "vendor-payments",
      title: "Payments & Finances",
      description: "Payment schedules, invoicing, taxes",
      icon: IndianRupee,
      articles: 19,
      color: "bg-amber-500"
    }
  ];
  
  const deliveryCategories: SupportCategory[] = [
    {
      id: "delivery-app",
      title: "Delivery App",
      description: "App issues, updates, functionality",
      icon: Settings,
      articles: 14,
      color: "bg-blue-500"
    },
    {
      id: "assignments",
      title: "Order Assignments",
      description: "Receiving orders, issues with assignments",
      icon: Package,
      articles: 10,
      color: "bg-green-500"
    },
    {
      id: "earnings",
      title: "Earnings & Incentives",
      description: "Payment issues, incentives, bonuses",
      icon: IndianRupee,
      articles: 12,
      color: "bg-purple-500"
    },
    {
      id: "navigation",
      title: "Navigation & Location",
      description: "Maps issues, location updates",
      icon: Truck,
      articles: 8,
      color: "bg-amber-500"
    }
  ];
  
  return (
    <>
      <Helmet>
        <title>Support Categories | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full">
          <PageHeader
            title="Support Categories"
            description="Browse help articles by category"
          >
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => navigate("/support")}
            >
              <MessageSquare className="h-4 w-4" />
              All Support
            </Button>
          </PageHeader>
          
          <Tabs defaultValue="customer" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="customer">Customer Support</TabsTrigger>
              <TabsTrigger value="vendor">Vendor Support</TabsTrigger>
              <TabsTrigger value="delivery">Delivery Support</TabsTrigger>
            </TabsList>
            
            <TabsContent value="customer" className="mt-6">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {customerCategories.map((category) => (
                  <Card key={category.id} className="overflow-hidden">
                    <div className={`h-2 w-full ${category.color}`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                        <div className={`p-2 rounded-full ${category.color.replace('bg-', 'bg-').replace('500', '100')} ${category.color.replace('bg-', 'text-').replace('500', '700')}`}>
                          <category.icon className="h-5 w-5" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        {category.articles} help articles
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm hover:underline cursor-pointer">
                          <span>How to update your profile</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between text-sm hover:underline cursor-pointer">
                          <span>Change your password</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between text-sm hover:underline cursor-pointer">
                          <span>Managing your addresses</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full" onClick={() => {}}>
                        View All {category.title} Articles
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="vendor" className="mt-6">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {vendorCategories.map((category) => (
                  <Card key={category.id} className="overflow-hidden">
                    <div className={`h-2 w-full ${category.color}`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                        <div className={`p-2 rounded-full ${category.color.replace('bg-', 'bg-').replace('500', '100')} ${category.color.replace('bg-', 'text-').replace('500', '700')}`}>
                          <category.icon className="h-5 w-5" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        {category.articles} help articles
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm hover:underline cursor-pointer">
                          <span>Setting up your vendor account</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between text-sm hover:underline cursor-pointer">
                          <span>Product listing guidelines</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between text-sm hover:underline cursor-pointer">
                          <span>Understanding commission rates</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full" onClick={() => {}}>
                        View All {category.title} Articles
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="delivery" className="mt-6">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {deliveryCategories.map((category) => (
                  <Card key={category.id} className="overflow-hidden">
                    <div className={`h-2 w-full ${category.color}`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                        <div className={`p-2 rounded-full ${category.color.replace('bg-', 'bg-').replace('500', '100')} ${category.color.replace('bg-', 'text-').replace('500', '700')}`}>
                          <category.icon className="h-5 w-5" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        {category.articles} help articles
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm hover:underline cursor-pointer">
                          <span>Troubleshooting app issues</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between text-sm hover:underline cursor-pointer">
                          <span>Accepting and completing deliveries</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between text-sm hover:underline cursor-pointer">
                          <span>Payment schedule and calculations</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full" onClick={() => {}}>
                        View All {category.title} Articles
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default CustomerSupportCategories;
