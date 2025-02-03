"use client";

import { AuthThemeProvider } from "@/src/providers/auth-theme-provider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthThemeProvider>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        {children}
      </div>
    </AuthThemeProvider>
  );
}