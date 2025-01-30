import type { LucideProps } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<LucideProps>;
}

export function StatCard({ title, value, change, icon: Icon }: StatCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {value}
            </h3>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="mt-4">
          <span
            className={cn(
              "text-sm font-medium inline-flex items-center rounded-full px-2 py-1",
              change > 0
                ? "text-green-600 bg-green-50 dark:bg-green-500/10"
                : "text-red-600 bg-red-50 dark:bg-red-500/10"
            )}
          >
            {change > 0 ? "↑" : "↓"} {Math.abs(change)}%
          </span>
          <span className="text-sm text-muted-foreground ml-2">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}