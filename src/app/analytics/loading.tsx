"use client";

import { Card } from "@/src/components/ui/card";
import { Loader2 } from "lucide-react";

export default function AnalyticsLoading() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="h-4 w-64 bg-muted animate-pulse rounded" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-6">
            <div className="space-y-4">
              <div className="h-6 w-32 bg-muted animate-pulse rounded" />
              <div className="h-24 w-full bg-muted animate-pulse rounded" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}