"use client";

import { usePathname } from 'next/navigation';
import Sidebar from '@/src/components/Sidebar';
import Navbar from '@/src/components/Navbar';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if the current route is an auth route
  const isAuthRoute = (path: string) => {
    return path.startsWith('/login') || 
           path.startsWith('/register') || 
           path.startsWith('/reset-password');
  };

  return isAuthRoute(pathname) ? (
    // Auth Layout - No navigation elements
    <div className="min-h-screen bg-background">
      {children}
    </div>
  ) : (
    // Dashboard Layout - With navigation
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}