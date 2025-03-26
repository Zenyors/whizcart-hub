
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import NotFound from "./pages/NotFound";

// User Routes
import Users from "./pages/users/Users";
import UserDetails from "./pages/users/UserDetails";
import UserAnalytics from "./pages/users/UserAnalytics";
import UserFeedback from "./pages/users/UserFeedback";
import VipUsers from "./pages/users/VipUsers";
import UserSupport from "./pages/users/UserSupport";

// Vendor Routes
import Vendors from "./pages/vendors/Vendors";
import VendorDetails from "./pages/vendors/VendorDetails";
import VendorProducts from "./pages/vendors/VendorProducts";
import VendorPayouts from "./pages/vendors/VendorPayouts";
import AddProduct from "./pages/vendors/AddProduct";

// New Routes
import DeliveryPartners from "./pages/delivery/DeliveryPartners";
import AddDeliveryPartner from "./pages/delivery/AddDeliveryPartner";
import Orders from "./pages/orders/Orders";
import Inventory from "./pages/inventory/Inventory";
import Reports from "./pages/reports/Reports";
import Settings from "./pages/settings/Settings";
import CustomerSupport from "./pages/support/CustomerSupport";
import CustomerSupportCategories from "./pages/support/CustomerSupportCategories";
import ContactSupport from "./pages/support/ContactSupport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/finance" element={<Finance />} />
            
            {/* User Routes */}
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/users/analytics" element={<UserAnalytics />} />
            <Route path="/users/feedback" element={<UserFeedback />} />
            <Route path="/users/vip" element={<VipUsers />} />
            <Route path="/users/support" element={<UserSupport />} />
            
            {/* Vendor Routes */}
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/vendors/:id" element={<VendorDetails />} />
            <Route path="/vendors/products" element={<VendorProducts />} />
            <Route path="/vendors/products/add" element={<AddProduct />} />
            <Route path="/vendors/payouts" element={<VendorPayouts />} />
            
            {/* Delivery Routes */}
            <Route path="/delivery-partners" element={<DeliveryPartners />} />
            <Route path="/delivery-partners/add" element={<AddDeliveryPartner />} />
            
            {/* New Routes */}
            <Route path="/orders" element={<Orders />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Support Routes */}
            <Route path="/support" element={<CustomerSupport />} />
            <Route path="/support/categories" element={<CustomerSupportCategories />} />
            <Route path="/support/contact" element={<ContactSupport />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
