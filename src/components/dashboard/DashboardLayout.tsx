
import React from "react";
import { cn } from "@/lib/utils";
import Header from "./Header";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import SidebarNav from "./SidebarNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader>
            <SidebarHeader />
          </SidebarHeader>
          <SidebarContent className="px-2 py-2">
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>

        <SidebarInset>
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto w-full max-w-7xl space-y-6">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
