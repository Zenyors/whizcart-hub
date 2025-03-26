
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare, Mail, AlertCircle, Calendar, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchVendorCommunications } from "@/api/vendorApi";

interface VendorCommunicationLogProps {
  vendorId: string;
}

// Define the Communication type
interface Communication {
  id: string;
  type: string;
  subject: string;
  content: string;
  date: string;
  category: string;
  user: {
    name: string;
    avatar: string;
  };
  files?: string[];
}

const VendorCommunicationLog = ({ vendorId }: VendorCommunicationLogProps) => {
  const { data, isLoading } = useQuery<Communication[]>({
    queryKey: ['vendorCommunications', vendorId],
    queryFn: () => fetchVendorCommunications(vendorId),
  });
  
  const communications = data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const iconMap: Record<string, React.ElementType> = {
    'email': Mail,
    'message': MessageSquare,
    'call': Phone,
    'meeting': Calendar,
    'issue': AlertCircle,
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </div>
        <Button variant="default" size="sm">
          New Communication
        </Button>
      </div>

      <div className="space-y-4 mt-6">
        {communications.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
              <p className="mt-2 text-muted-foreground">No communications found</p>
            </CardContent>
          </Card>
        ) : (
          communications.map((comm) => {
            const IconComponent = iconMap[comm.type] || MessageSquare;
            
            return (
              <Card key={comm.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex border-l-4 border-primary p-4">
                    <div className="mr-4">
                      <Avatar>
                        <AvatarImage src={comm.user.avatar} alt={comm.user.name} />
                        <AvatarFallback>{comm.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{comm.subject}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <IconComponent className="h-3 w-3" />
                              {comm.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(comm.date).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant={
                            comm.category === "Issue" ? "destructive" :
                            comm.category === "Inquiry" ? "default" :
                            comm.category === "Feedback" ? "outline" : "secondary"
                          }
                        >
                          {comm.category}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{comm.content}</p>
                      {comm.files && comm.files.length > 0 && (
                        <div className="mt-3 flex gap-2">
                          {comm.files.map((file, i) => (
                            <Badge key={i} variant="outline" className="flex items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-3 w-3"
                              >
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                              {file}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="mt-3">
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default VendorCommunicationLog;
