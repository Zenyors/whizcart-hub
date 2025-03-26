
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FAQ } from "@/types/support";

interface KnowledgeBaseProps {
  faqs: FAQ[];
  onSetActiveTab: (tab: string) => void;
}

const KnowledgeBase = ({ faqs, onSetActiveTab }: KnowledgeBaseProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  
  const filteredFAQs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-7 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq) => (
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
                        <Button variant="outline" size="sm">Yes</Button>
                        <Button variant="outline" size="sm">No</Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            {filteredFAQs.length === 0 && (
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
          
          <TabsContent value="general" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs
                .filter(faq => faq.category === "General")
                .map((faq) => (
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
