"use client";

import { Card } from "@/components/ui/card";

export default function ProfileLoading() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-10 w-32 bg-muted animate-pulse rounded" />
      </div>
      <div className="grid gap-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-6 w-40 bg-muted animate-pulse rounded" />
              <div className="h-4 w-64 bg-muted animate-pulse rounded" />
            </div>
            <div className="flex gap-6">
              <div className="h-24 w-24 rounded-full bg-muted animate-pulse" />
              <div className="flex-1 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="h-10 bg-muted animate-pulse rounded" />
                  <div className="h-10 bg-muted animate-pulse rounded" />
                </div>
                <div className="h-10 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-6 w-40 bg-muted animate-pulse rounded" />
              <div className="h-4 w-64 bg-muted animate-pulse rounded" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-10 bg-muted animate-pulse rounded" />
              <div className="h-10 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-10 bg-muted animate-pulse rounded" />
          </div>
        </Card>
      </div>
    </div>
  );
}