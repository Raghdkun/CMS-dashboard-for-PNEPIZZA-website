"use client";

import { Card } from "@/src/components/ui/card";

export default function LocationsLoading() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-10 w-32 bg-muted animate-pulse rounded" />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="h-10 bg-muted animate-pulse rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-32 bg-muted animate-pulse rounded" />
          <div className="h-10 w-20 bg-muted animate-pulse rounded" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-48 bg-muted animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-6 w-48 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-64 bg-muted animate-pulse rounded" />
                </div>
                <div className="h-8 w-8 bg-muted animate-pulse rounded" />
              </div>
              <div className="h-4 w-full bg-muted animate-pulse rounded" />
              <div className="h-6 w-20 bg-muted animate-pulse rounded" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}