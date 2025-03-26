
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Download,
  Search,
  Filter,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Star,
  AlertTriangle
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for feedback
const mockFeedback = Array.from({ length: 20 }).map((_, i) => {
  const sentimentType = i % 5 === 0 ? "negative" : i % 3 === 0 ? "neutral" : "positive";
  const feedbackType = i % 4 === 0 ? "product" : i % 3 === 0 ? "shipping" : i % 5 === 0 ? "support" : "website";
  const rating = sentimentType === "positive" ? Math.floor(Math.random() * 2) + 4 :
                sentimentType === "neutral" ? 3 : Math.floor(Math.random() * 2) + 1;
                
  return {
    id: `FB-${1000 + i}`,
    user: `User ${i + 1}`,
    userEmail: `user${i + 1}@example.com`,
    userId: `USR-${1000 + i}`,
    date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    feedback: sentimentType === "positive" ? 
      "I love the quality of the products and the fast shipping. Everything arrived perfectly packaged!" :
      sentimentType === "neutral" ? 
      "The product was good but shipping took longer than expected. Would appreciate faster delivery options." :
      "I had issues with my order and customer service was slow to respond. The product quality was also not as advertised.",
    sentiment: sentimentType,
    type: feedbackType,
    rating: rating,
    response: i % 3 === 0 ? "Thanks for your feedback! We've passed this along to our team." : null,
    responseDate: i % 3 === 0 ? new Date(Date.now() - Math.random() * 5000000000).toLocaleDateString() : null,
    isResolved: i % 3 === 0,
  };
});

// NPS data
const npsScoreData = [
  { month: "Jan", nps: 42 },
  { month: "Feb", nps: 44 },
  { month: "Mar", nps: 46 },
  { month: "Apr", nps: 45 },
  { month: "May", nps: 48 },
  { month: "Jun", nps: 51 },
  { month: "Jul", nps: 53 },
  { month: "Aug", nps: 56 },
  { month: "Sep", nps: 58 },
  { month: "Oct", nps: 60 },
  { month: "Nov", nps: 62 },
  { month: "Dec", nps: 65 },
];

const UserFeedback = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    toast({
      title: sidebarOpen ? "Sidebar Collapsed" : "Sidebar Expanded",
      description: sidebarOpen ? "The sidebar has been collapsed." : "The sidebar has been expanded.",
    });
  };

  const filteredFeedback = mockFeedback.filter(item => {
    const matchesSearch = 
      item.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.feedback.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = 
      selectedTab === "all" || 
      (selectedTab === "positive" && item.sentiment === "positive") ||
      (selectedTab === "neutral" && item.sentiment === "neutral") ||
      (selectedTab === "negative" && item.sentiment === "negative") ||
      (selectedTab === "unresolved" && !item.isResolved);

    const matchesType =
      filterType === "all" ||
      filterType === item.type;
    
    return matchesSearch && matchesTab && matchesType;
  });

  const sentimentCounts = {
    positive: mockFeedback.filter(item => item.sentiment === "positive").length,
    neutral: mockFeedback.filter(item => item.sentiment === "neutral").length,
    negative: mockFeedback.filter(item => item.sentiment === "negative").length,
  };

  const npsScore = 65; // Current NPS score
  
  const typeCounts = {
    product: mockFeedback.filter(item => item.type === "product").length,
    shipping: mockFeedback.filter(item => item.type === "shipping").length,
    support: mockFeedback.filter(item => item.type === "support").length,
    website: mockFeedback.filter(item => item.type === "website").length,
  };

  const renderSentimentIcon = (sentiment: string) => {
    if (sentiment === "positive") return <ThumbsUp className="h-4 w-4 text-green-500" />;
    if (sentiment === "negative") return <ThumbsDown className="h-4 w-4 text-red-500" />;
    return <div className="h-4 w-4 rounded-full bg-gray-400" />;
  };

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star 
            key={index} 
            className={`h-4 w-4 ${
              index < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
            }`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-muted/5">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-0" : ""}`}>
        <Header 
          isSidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />
        
        <main className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              className="mb-4 flex items-center gap-1 pl-0 hover:pl-2 transition-all duration-200"
              onClick={() => navigate("/users")}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Users</span>
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">User Feedback</h1>
                <p className="text-muted-foreground">
                  Monitor, analyze, and respond to customer feedback and reviews
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              title="Total Feedback" 
              value={mockFeedback.length} 
              description="All customer feedback"
              icon={MessageSquare}
            />
            <StatCard 
              title="Current NPS" 
              value={npsScore} 
              description="Net Promoter Score"
              icon={ThumbsUp}
              trend={{ value: 8, positive: true }}
            />
            <StatCard 
              title="Satisfaction Rate" 
              value="78%" 
              description="Positive feedback percentage"
              icon={Star}
              trend={{ value: 3, positive: true }}
            />
            <StatCard 
              title="Unresolved Issues" 
              value={mockFeedback.filter(item => !item.isResolved).length} 
              description="Pending feedback responses"
              icon={AlertTriangle}
              trend={{ value: 5, positive: false }}
            />
          </div>
          
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid grid-cols-2 md:w-auto md:grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="feedback">Feedback List</TabsTrigger>
              <TabsTrigger value="nps">NPS Tracking</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 pt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Sentiment Analysis</CardTitle>
                    <CardDescription>Distribution of feedback by sentiment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="h-4 w-4 text-green-500" />
                            <span className="font-medium">Positive</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Happy customers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-500 text-white">{sentimentCounts.positive}</Badge>
                          <span className="text-sm text-muted-foreground">
                            ({((sentimentCounts.positive / mockFeedback.length) * 100).toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-gray-400" />
                            <span className="font-medium">Neutral</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Mixed reactions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{sentimentCounts.neutral}</Badge>
                          <span className="text-sm text-muted-foreground">
                            ({((sentimentCounts.neutral / mockFeedback.length) * 100).toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <ThumbsDown className="h-4 w-4 text-red-500" />
                            <span className="font-medium">Negative</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Unhappy customers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive">{sentimentCounts.negative}</Badge>
                          <span className="text-sm text-muted-foreground">
                            ({((sentimentCounts.negative / mockFeedback.length) * 100).toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Feedback Categories</CardTitle>
                    <CardDescription>What customers are talking about</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Product Quality</span>
                          <span className="text-xs text-muted-foreground">Product-related feedback</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge>{typeCounts.product}</Badge>
                          <span className="text-sm text-muted-foreground">
                            ({((typeCounts.product / mockFeedback.length) * 100).toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Shipping & Delivery</span>
                          <span className="text-xs text-muted-foreground">Shipping-related issues</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{typeCounts.shipping}</Badge>
                          <span className="text-sm text-muted-foreground">
                            ({((typeCounts.shipping / mockFeedback.length) * 100).toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Customer Support</span>
                          <span className="text-xs text-muted-foreground">Service-related feedback</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{typeCounts.support}</Badge>
                          <span className="text-sm text-muted-foreground">
                            ({((typeCounts.support / mockFeedback.length) * 100).toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">Website Experience</span>
                          <span className="text-xs text-muted-foreground">Site usability feedback</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{typeCounts.website}</Badge>
                          <span className="text-sm text-muted-foreground">
                            ({((typeCounts.website / mockFeedback.length) * 100).toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Feedback Trends</CardTitle>
                    <CardDescription>Customer satisfaction over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { month: "Jan", positive: 65, neutral: 25, negative: 10 },
                            { month: "Feb", positive: 68, neutral: 22, negative: 10 },
                            { month: "Mar", positive: 70, neutral: 20, negative: 10 },
                            { month: "Apr", positive: 68, neutral: 22, negative: 10 },
                            { month: "May", positive: 72, neutral: 18, negative: 10 },
                            { month: "Jun", positive: 75, neutral: 15, negative: 10 },
                            { month: "Jul", positive: 78, neutral: 15, negative: 7 },
                            { month: "Aug", positive: 80, neutral: 13, negative: 7 },
                            { month: "Sep", positive: 82, neutral: 12, negative: 6 },
                            { month: "Oct", positive: 78, neutral: 15, negative: 7 },
                            { month: "Nov", positive: 80, neutral: 13, negative: 7 },
                            { month: "Dec", positive: 82, neutral: 12, negative: 6 },
                          ]}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value}%`, '']} />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="positive" 
                            stroke="#4ade80" 
                            name="Positive" 
                            strokeWidth={2}
                            activeDot={{ r: 8 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="neutral" 
                            stroke="#94a3b8" 
                            name="Neutral" 
                            strokeWidth={2}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="negative" 
                            stroke="#f87171" 
                            name="Negative" 
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights & Recommendations</CardTitle>
                  <CardDescription>Actionable insights from customer feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-md border">
                      <h3 className="text-base font-medium">Product Feedback</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Customers consistently praise product quality (85% positive), but there are recurring concerns about
                        packaging for fragile items (12% of negative feedback). Consider reinforcing packaging for glassware
                        and electronics.
                      </p>
                    </div>
                    <div className="p-4 rounded-md border">
                      <h3 className="text-base font-medium">Shipping & Delivery</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Shipping speed is the top concern (28% of all negative feedback). Most complaints come from rural areas
                        with delivery times exceeding 5 days. Consider adding an expedited shipping option specifically for
                        these regions.
                      </p>
                    </div>
                    <div className="p-4 rounded-md border">
                      <h3 className="text-base font-medium">Customer Support</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Response time for support tickets has improved by 35% since last quarter. Continued focus on reducing
                        first-response time from 4 hours to under 2 hours could further improve satisfaction scores.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Generate Detailed Report</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="feedback" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle>Customer Feedback</CardTitle>
                        <CardDescription>
                          Review and respond to customer feedback
                        </CardDescription>
                      </div>
                      <Button>Add Response Template</Button>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-5">
                      <div className="relative col-span-3">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search by user, email, or feedback content..."
                          className="w-full pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      
                      <Select defaultValue={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-full">
                          <Filter className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="shipping">Shipping</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                          <SelectItem value="website">Website</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
                        <TabsList className="w-full grid grid-cols-5">
                          <TabsTrigger value="all">All</TabsTrigger>
                          <TabsTrigger value="positive">Positive</TabsTrigger>
                          <TabsTrigger value="neutral">Neutral</TabsTrigger>
                          <TabsTrigger value="negative">Negative</TabsTrigger>
                          <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {filteredFeedback.map((item) => (
                        <div key={item.id} className="rounded-lg border p-4">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-2 gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{item.user}</span>
                                <span className="text-xs text-muted-foreground">{item.userEmail}</span>
                                <Badge 
                                  variant={
                                    item.sentiment === "positive" ? "default" :
                                    item.sentiment === "neutral" ? "secondary" : "destructive"
                                  }
                                  className={
                                    item.sentiment === "positive" ? "bg-green-500 text-white" : ""
                                  }
                                >
                                  <div className="flex items-center gap-1">
                                    {renderSentimentIcon(item.sentiment)}
                                    <span className="capitalize">{item.sentiment}</span>
                                  </div>
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-xs text-muted-foreground">{item.date}</span>
                                <div className="flex items-center gap-1">
                                  <Badge variant="outline" className="capitalize">{item.type}</Badge>
                                </div>
                                <div className="flex items-center">
                                  {renderRatingStars(item.rating)}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View User
                              </Button>
                              <Button size="sm" variant={item.isResolved ? "outline" : "default"}>
                                {item.isResolved ? "Resolved" : "Respond"}
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mt-3 text-sm">
                            <p>{item.feedback}</p>
                          </div>
                          
                          {item.response && (
                            <div className="mt-4 border-t pt-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Response</span>
                                <span className="text-xs text-muted-foreground">{item.responseDate}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.response}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="nps" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Net Promoter Score (NPS) Trend</CardTitle>
                  <CardDescription>Tracking customer loyalty and satisfaction over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={npsScoreData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="nps" 
                          stroke="#8884d8" 
                          name="NPS Score" 
                          strokeWidth={2}
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-green-50 dark:bg-green-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="rounded-full bg-green-100 p-1.5 dark:bg-green-900">
                        <ThumbsUp className="h-5 w-5 text-green-700 dark:text-green-300" />
                      </div>
                      Promoters
                    </CardTitle>
                    <CardDescription>Customers who scored 9-10</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-green-700 dark:text-green-300">58%</p>
                      <p className="text-sm text-green-700/70 dark:text-green-300/70 mt-1">16,498 customers</p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">Key characteristics:</p>
                      <ul className="text-sm space-y-1 text-green-700/70 dark:text-green-300/70">
                        <li>• 3.2x more likely to recommend products</li>
                        <li>• 43% higher lifetime value</li>
                        <li>• 68% higher repeat purchase rate</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-amber-50 dark:bg-amber-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="rounded-full bg-amber-100 p-1.5 dark:bg-amber-900">
                        <div className="h-5 w-5 rounded-full border-2 border-amber-700 dark:border-amber-300" />
                      </div>
                      Passives
                    </CardTitle>
                    <CardDescription>Customers who scored 7-8</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-amber-700 dark:text-amber-300">25%</p>
                      <p className="text-sm text-amber-700/70 dark:text-amber-300/70 mt-1">7,120 customers</p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Key characteristics:</p>
                      <ul className="text-sm space-y-1 text-amber-700/70 dark:text-amber-300/70">
                        <li>• 1.5x more price-sensitive</li>
                        <li>• Mixed product satisfaction</li>
                        <li>• 30% likely to be poached by competitors</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-red-50 dark:bg-red-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="rounded-full bg-red-100 p-1.5 dark:bg-red-900">
                        <ThumbsDown className="h-5 w-5 text-red-700 dark:text-red-300" />
                      </div>
                      Detractors
                    </CardTitle>
                    <CardDescription>Customers who scored 0-6</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-red-700 dark:text-red-300">17%</p>
                      <p className="text-sm text-red-700/70 dark:text-red-300/70 mt-1">4,843 customers</p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-red-700 dark:text-red-300">Key characteristics:</p>
                      <ul className="text-sm space-y-1 text-red-700/70 dark:text-red-300/70">
                        <li>• 4.5x more likely to churn</li>
                        <li>• 78% have had support issues</li>
                        <li>• 2.3x more negative public reviews</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>NPS by User Segment</CardTitle>
                  <CardDescription>How different customer groups rate their experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">By Customer Type</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">VIP Customers</span>
                            <span className="text-sm font-medium">82</span>
                          </div>
                          <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '82%' }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Regular Customers</span>
                            <span className="text-sm font-medium">68</span>
                          </div>
                          <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '68%' }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Returning Customers</span>
                            <span className="text-sm font-medium">52</span>
                          </div>
                          <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '52%' }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">New Customers</span>
                            <span className="text-sm font-medium">42</span>
                          </div>
                          <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '42%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">By Purchase Channel</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Mobile App</span>
                            <span className="text-sm font-medium">76</span>
                          </div>
                          <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '76%' }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Desktop Website</span>
                            <span className="text-sm font-medium">72</span>
                          </div>
                          <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '72%' }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Mobile Web</span>
                            <span className="text-sm font-medium">64</span>
                          </div>
                          <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '64%' }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Marketplace</span>
                            <span className="text-sm font-medium">58</span>
                          </div>
                          <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '58%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default UserFeedback;
