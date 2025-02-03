"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AuthNotFound() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Page Not Found</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild variant="outline">
          <Link href="/login" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}