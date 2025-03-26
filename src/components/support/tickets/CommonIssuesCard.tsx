
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CommonIssuesCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Common Issues</CardTitle>
        <CardDescription>Frequently reported customer problems</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Issue</TableHead>
              <TableHead>Tickets</TableHead>
              <TableHead className="text-right">% of Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Shipping Delays</TableCell>
              <TableCell>32</TableCell>
              <TableCell className="text-right">24%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Payment Problems</TableCell>
              <TableCell>28</TableCell>
              <TableCell className="text-right">21%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Product Quality</TableCell>
              <TableCell>21</TableCell>
              <TableCell className="text-right">16%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Return Process</TableCell>
              <TableCell>18</TableCell>
              <TableCell className="text-right">14%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Account Access</TableCell>
              <TableCell>15</TableCell>
              <TableCell className="text-right">11%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button variant="outline" className="w-full">Generate Knowledge Base Articles</Button>
      </CardFooter>
    </Card>
  );
};

export default CommonIssuesCard;
