
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/stat-card";
import { ArrowLeft, Star, ThumbsUp, MessageSquare, BarChart3, Filter, Search } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";

// Mock feedback data
const mockFeedback = Array.from({ length: 20 }).map((_, i) => {
  const rating = Math.floor(Math.random() * 5) + 1;
  const productTypes = ["Electronics", "Clothing", "Home Goods", "Beauty", "Food"];
  const productType = productTypes[Math.floor(Math.random() * productTypes.length)];
  
  return {
    id: `FB-${1000 + i}`,
    customer: {
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      id: `USR-${1000 + i}`,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=Feedback${i}`,
    },
    rating,
    helpful: Math.floor(Math.random() * 15),
    productName: `${productType} Product ${i + 1}`,
    productId: `PRD-${2000 + i}`,
    category: productType,
    comment: rating >= 4 
      ? "I love this product! It exceeded my expectations and I would definitely purchase again." 
      : rating === 3 
      ? "This product is okay, but could use some improvements. It works as expected but nothing special." 
      : "I'm not satisfied with this purchase. The quality is lower than expected and it didn't work well for me.",
    date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    hasResponse: i % 3 === 0,
  };
});

const UserFeedback = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredFeedback = mockFeedback.filter(feedback => {
    const matchesSearch = 
      feedback.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      feedback.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "positive") return matchesSearch && feedback.rating >= 4;
    if (selectedTab === "neutral") return matchesSearch && feedback.rating === 3;
    if (selectedTab === "negative") return matchesSearch && feedback.rating <= 2;
    if (selectedTab === "unanswered") return matchesSearch && !feedback.hasResponse;
    
    return matchesSearch;
  });

  const feedbackStats = {
    total: mockFeedback.length,
    average: (mockFeedback.reduce((acc, item) => acc + item.rating, 0) / mockFeedback.length).toFixed(1),
    positive: mockFeedback.filter(item => item.rating >= 4).length,
    neutral: mockFeedback.filter(item => item.rating === 3).length,
    negative: mockFeedback.filter(item => item.rating <= 2).length,
    unanswered: mockFeedback.filter(item => !item.hasResponse).length,
  };

  const getStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center gap-1 pl-0 hover:pl-2 transition-all duration-200"
            onClick={() => navigate("/users")}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Users</span>
          </Button>
          
          <PageHeader
            title="User Feedback"
            description="Monitor and respond to customer reviews and feedback"
          >
            <Button className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span>Export Report</span>
            </Button>
          </PageHeader>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Average Rating" 
            value={`${feedbackStats.average}/5`}
            description="Overall customer satisfaction"
            icon={Star}
          />
          <StatCard 
            title="Positive Reviews" 
            value={feedbackStats.positive}
            description={`${Math.round(feedbackStats.positive / feedbackStats.total * 100)}% of total feedback`}
            icon={ThumbsUp}
            trend={{ value: 7, positive: true }}
          />
          <StatCard 
            title="Negative Reviews" 
            value={feedbackStats.negative}
            description={`${Math.round(feedbackStats.negative / feedbackStats.total * 100)}% of total feedback`}
            icon={ThumbsUp}
            trend={{ value: 3, positive: false }}
          />
          <StatCard 
            title="Awaiting Response" 
            value={feedbackStats.unanswered}
            description="Feedback without replies"
            icon={MessageSquare}
          />
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Customer Feedback</CardTitle>
                  <CardDescription>
                    Reviews and ratings from your customers
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </div>
              
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search feedback..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Tabs defaultValue="all" className="sm:w-auto" onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-5 sm:w-auto">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="positive">Positive</TabsTrigger>
                    <TabsTrigger value="neutral">Neutral</TabsTrigger>
                    <TabsTrigger value="negative">Negative</TabsTrigger>
                    <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFeedback.map((feedback) => (
                <div key={feedback.id} className="rounded-lg border p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={feedback.customer.avatarUrl} alt={feedback.customer.name} />
                        <AvatarFallback>{feedback.customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{feedback.customer.name}</p>
                          <span className="text-sm text-muted-foreground">· {feedback.date}</span>
                        </div>
                        <div className="flex items-center gap-1 my-1">
                          {getStars(feedback.rating)}
                        </div>
                        <p className="text-sm font-medium mt-1">
                          {feedback.productName}
                        </p>
                        <p className="text-sm text-muted-foreground my-2">
                          {feedback.comment}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="ghost" size="sm" className="h-7 gap-1">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            <span>Helpful ({feedback.helpful})</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 gap-1">
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>Reply</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className="whitespace-nowrap">
                        {feedback.category}
                      </Badge>
                      {!feedback.hasResponse && (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                          Needs Response
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {feedback.hasResponse && (
                    <div className="mt-4 border-t pt-4 pl-4 ml-10">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/admin-avatar.png" alt="Admin" />
                          <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Store Admin</p>
                            <span className="text-sm text-muted-foreground">· {new Date(new Date(feedback.date).getTime() + 86400000).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-muted-foreground my-2">
                            Thank you for your feedback! We appreciate you taking the time to share your thoughts on our product. Your input helps us improve our offerings.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserFeedback;
