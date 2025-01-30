"use client";

import { Card } from "@/components/ui/card";

export default function SettingsLoading() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded" />
        </div>
      </div>
      <div className="max-w-4xl">
        <Card className="p-6">
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="h-6 w-48 bg-muted animate-pulse rounded" />
              <div className="h-4 w-64 bg-muted animate-pulse rounded" />
            </div>
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-10 w-full bg-muted animate-pulse rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-10 w-full bg-muted animate-pulse rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                <div className="h-24 w-full bg-muted animate-pulse rounded" />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-10 w-full bg-muted animate-pulse rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-10 w-full bg-muted animate-pulse rounded" />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="h-10 w-32 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}