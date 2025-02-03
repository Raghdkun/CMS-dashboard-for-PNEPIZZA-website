"use client";

import { Card } from "@/src/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-8">
      <Card className="w-full max-w-md p-6">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg font-medium text-muted-foreground">Loading...</p>
        </div>
      </Card>
    </div>
  );
}