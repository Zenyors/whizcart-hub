
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, HelpCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FAQ } from "@/types/support";
import { useToast } from "@/hooks/use-toast";

interface KnowledgeBaseProps {
  faqs: FAQ[];
  onSetActiveTab: (tab: string) => void;
}

const KnowledgeBase = ({ faqs, onSetActiveTab }: KnowledgeBaseProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [helpfulRatings, setHelpfulRatings] = useState<Record<string, boolean | null>>({});
  const { toast } = useToast();
  
  const filteredFAQs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  const categoryFilteredFAQs = activeCategory === "all" 
    ? filteredFAQs 
    : filteredFAQs.filter(faq => 
        faq.category.toLowerCase() === activeCategory.toLowerCase()
      );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

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
        <CardTitle>Knowledge Base</CardTitle>
        <CardDescription>Search for answers or browse by category</CardDescription>
        <div className="pt-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search knowledge base..."
              className="pl-9"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
          <TabsList className="grid grid-cols-7 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeCategory} className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {categoryFilteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                    <Badge variant="outline" className="ml-2">
                      {faq.category}
                    </Badge>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-2">
                      {faq.answer}
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Was this helpful?
                      </div>
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
            
            {categoryFilteredFAQs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <HelpCircle className="h-12 w-12 text-muted-foreground/40 mb-4" />
                <h3 className="font-medium text-lg mb-1">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any articles matching your search
                </p>
                <Button onClick={() => onSetActiveTab("create-ticket")}>
                  Create a Support Ticket
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onSetActiveTab("support-home")}>
          Back to Support
        </Button>
        <Button onClick={() => onSetActiveTab("create-ticket")}>
          Can't find an answer? Create a ticket
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KnowledgeBase;
