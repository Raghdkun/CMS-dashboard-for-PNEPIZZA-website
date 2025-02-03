import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

const content = [
  {
    id: 1,
    title: "How to get started",
    views: "5.2k",
    comments: 32,
    delay: 100,
  },
  {
    id: 2,
    title: "Best practices guide",
    views: "3.8k",
    comments: 24,
    delay: 200,
  },
  {
    id: 3,
    title: "Advanced techniques",
    views: "2.9k",
    comments: 18,
    delay: 300,
  },
];

export function PopularContent() {
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <CardTitle>Popular Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {content.map((item) => (
            <div
              key={item.id}
              className="group flex items-center justify-between animate-in fade-in slide-in-from-right duration-1000 ease-in-out"
              style={{ animationDelay: `${item.delay}ms` }}
            >
              <div>
                <p className="font-medium group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground">{item.views} views</p>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">{item.comments}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}