"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function RegisterLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mx-auto" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded mx-auto" />
        </div>

        <Card>
          <CardHeader>
            <div className="space-y-2">
              <div className="h-6 w-24 bg-muted animate-pulse rounded" />
              <div className="h-4 w-48 bg-muted animate-pulse rounded" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                <div className="h-10 w-full bg-muted animate-pulse rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                <div className="h-10 w-full bg-muted animate-pulse rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                <div className="h-10 w-full bg-muted animate-pulse rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                <div className="h-10 w-full bg-muted animate-pulse rounded" />
              </div>
            </div>
            <div className="h-10 w-full bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <div className="h-4 w-48 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}