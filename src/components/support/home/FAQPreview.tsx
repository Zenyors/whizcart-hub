
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ } from "@/types/support";

interface FAQPreviewProps {
  faqs: FAQ[];
  onSetActiveTab: (tab: string) => void;
}

const FAQPreview = ({ faqs, onSetActiveTab }: FAQPreviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Quick answers to common questions</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.slice(0, 3).map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full" 
          onClick={() => onSetActiveTab("knowledge-base")}
        >
          View All FAQs
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FAQPreview;
