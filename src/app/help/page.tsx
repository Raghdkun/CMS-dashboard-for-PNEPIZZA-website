"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { FileDown, Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";

const sections = [
  {
    title: "Getting Started",
    description: "Learn the basics of using the dashboard",
    topics: [
      "Dashboard Overview",
      "Navigation Guide",
      "User Interface Elements",
      "Basic Operations",
    ]
  },
  {
    title: "Features & Functionality",
    description: "Detailed guides for each feature",
    topics: [
      "User Management",
      "Content Management",
      "Analytics & Reporting",
      "System Settings",
    ]
  },
  {
    title: "Advanced Topics",
    description: "In-depth documentation for power users",
    topics: [
      "API Integration",
      "Custom Workflows",
      "Data Management",
      "Security Features",
    ]
  }
];

export default function HelpPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-in-out">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Help & Documentation</h1>
          <p className="text-muted-foreground">Everything you need to know about using the dashboard</p>
        </div>
        <Button>
          <FileDown className="mr-2 h-4 w-4" />
          Download PDF Manual
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input className="pl-10" placeholder="Search documentation..." />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.title} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.topics.map((topic) => (
                  <li key={topic} className="text-sm">
                    <Button variant="link" className="h-auto p-0">
                      {topic}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Need Additional Help?</CardTitle>
          <CardDescription>Can't find what you're looking for? We're here to help!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="flex-1">
            Contact Support
          </Button>
          <Button variant="outline" className="flex-1">
            View FAQ
          </Button>
          <Button variant="outline" className="flex-1">
            Request Training
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}