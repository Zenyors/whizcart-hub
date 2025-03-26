
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { FAQ } from "@/types/support";
import { useToast } from "@/hooks/use-toast";

interface FAQPreviewProps {
  faqs: FAQ[];
  onSetActiveTab: (tab: string) => void;
}

const FAQPreview = ({ faqs, onSetActiveTab }: FAQPreviewProps) => {
  const { toast } = useToast();
  const [helpfulRatings, setHelpfulRatings] = useState<Record<string, boolean | null>>({});

  const handleRateAnswer = (faqId: string, isHelpful: boolean) => {
    setHelpfulRatings(prev => ({
      ...prev,
      [faqId]: isHelpful
    }));

    toast({
      title: isHelpful ? "Thanks for your feedback!" : "We'll improve our answer",
      description: isHelpful 
        ? "We're glad this was helpful." 
        : "We'll use your feedback to improve our support content.",
    });
  };

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
                <div className="mb-4">
                  {faq.answer}
                </div>
                <div className="flex items-center justify-between border-t pt-3 text-sm">
                  <span className="text-muted-foreground">Was this answer helpful?</span>
                  <div className="flex gap-2">
                    <Button 
                      variant={helpfulRatings[faq.id] === true ? "default" : "outline"} 
                      size="sm"
                      className="gap-1"
                      onClick={() => handleRateAnswer(faq.id, true)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Yes
                    </Button>
                    <Button 
                      variant={helpfulRatings[faq.id] === false ? "default" : "outline"} 
                      size="sm"
                      className="gap-1"
                      onClick={() => handleRateAnswer(faq.id, false)}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      No
                    </Button>
                  </div>
                </div>
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
