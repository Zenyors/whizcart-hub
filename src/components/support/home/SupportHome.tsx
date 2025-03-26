
import React from "react";
import { FAQ } from "@/types/support";
import SupportCategories from "./SupportCategories";
import ContactOptions from "./ContactOptions";
import FAQPreview from "./FAQPreview";

interface SupportHomeProps {
  faqs: FAQ[];
  onSetActiveTab: (tab: string) => void;
}

const SupportHome = ({ faqs, onSetActiveTab }: SupportHomeProps) => {
  return (
    <div className="space-y-6">
      {/* Support Categories */}
      <SupportCategories onSetActiveTab={onSetActiveTab} />
      
      {/* Contact Options */}
      <ContactOptions />
      
      {/* FAQ Preview */}
      <FAQPreview faqs={faqs} onSetActiveTab={onSetActiveTab} />
    </div>
  );
};

export default SupportHome;
