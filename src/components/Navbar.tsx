"use client";

import { useRouter } from "next/navigation";
import { Bell, User, HelpCircle } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { ThemeToggle } from '@/src/components/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import Link from 'next/link';
import { cookies } from "next/dist/server/request/cookies";

// Mock notification data
const notifications = [
  {
    id: 1,
    title: 'New contact request',
    message: 'John Doe sent you a contact request',
    time: '2 mins ago',
    avatar: 'https://avatar.vercel.sh/1'
  },
  {
    id: 2,
    title: 'System update',
    message: 'System maintenance scheduled',
    time: '5 mins ago',
    avatar: 'https://avatar.vercel.sh/2'
  }
];

export default function Navbar() {
  const router = useRouter();

  // components/Navbar.tsx
  async function handleLogout() {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include' // Required for cookie handling
      });


  
  
      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Logout failed (${response.body})`);
      }
  
      // Clear client-side storage
      localStorage.removeItem('user');
      
      // Force full page reload to clear all states
      window.location.href = '/login';
  
    } catch (error) {
      console.error("Logout error:", error);
      alert(error instanceof Error ? error.message : 'Logout failed');
      
      // Fallback cleanup
      localStorage.removeItem('user');
      document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }

  return (
    <nav className="sticky top-0 z-30 border-b bg-background/75 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-end px-4 gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                variant="destructive"
              >
                {notifications.length}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="font-normal">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Notifications</span>
                <Badge variant="secondary" className="ml-auto">
                  {notifications.length} New
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="cursor-pointer p-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={notification.avatar} />
                      <AvatarFallback>
                        {notification.title[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://avatar.vercel.sh/admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/help">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Documentation
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
