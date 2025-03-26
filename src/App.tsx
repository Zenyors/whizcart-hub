
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

// New Routes
import DeliveryPartners from "./pages/delivery/DeliveryPartners";
import Orders from "./pages/orders/Orders";
import Inventory from "./pages/inventory/Inventory";
import Reports from "./pages/reports/Reports";
import Settings from "./pages/settings/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="/vendors/payouts" element={<VendorPayouts />} />
          
          {/* New Routes */}
          <Route path="/delivery-partners" element={<DeliveryPartners />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
