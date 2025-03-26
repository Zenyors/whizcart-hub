
import React from "react";
import { Helmet } from "react-helmet";
import { HelpCircle } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Import the new component files
import ContactMethods from "@/components/support/ContactMethods";
import ContactForm from "@/components/support/ContactForm";
import SupportInfo from "@/components/support/SupportInfo";
import SpecializedSupport from "@/components/support/SpecializedSupport";

const ContactSupport = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>
        <title>Contact Support | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 w-full">
          <PageHeader
            title="Contact Support"
            description="Get in touch with our support team"
          >
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => navigate("/support")}
            >
              <HelpCircle className="h-4 w-4" />
              Help Center
            </Button>
          </PageHeader>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {/* Contact Methods */}
            <ContactMethods />
            
            {/* Contact Form */}
            <ContactForm />
            
            {/* Support Info */}
            <SupportInfo />
          </div>
          
          {/* Support Options for Different User Types */}
          <SpecializedSupport />
        </div>
      </DashboardLayout>
    </>
  );
};

export default ContactSupport;
