"use client";

import { Card } from "@/src/components/ui/card";

export default function AcquisitionLoading() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded" />
        </div>
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-muted animate-pulse rounded" />
          <div className="h-10 w-32 bg-muted animate-pulse rounded" />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1 h-10 bg-muted animate-pulse rounded" />
        <div className="h-10 w-32 bg-muted animate-pulse rounded" />
      </div>
      <div className="rounded-md border">
        <div className="p-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="py-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-5 w-48 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                </div>
                <div className="h-8 w-8 bg-muted animate-pulse rounded" />
              </div>
              <div className="h-px bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}