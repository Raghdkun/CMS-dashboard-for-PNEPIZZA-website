"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { Loader2 } from "lucide-react";

export default function AuthLoading() {
  return (
    <Card className="w-full max-w-md p-6">
      <CardContent className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-lg font-medium text-muted-foreground">Loading...</p>
      </CardContent>
    </Card>
  );
}