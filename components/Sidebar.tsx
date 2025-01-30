"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BarChart2,
  MapPin,
  Calendar,
  MessageSquare,
  FolderInput,
  Briefcase,
  Info,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Image,
} from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

// Define menu items with their respective icons and routes
const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/' },
  { icon: BarChart2, label: 'Analytics', href: '/analytics' },
  { icon: MapPin, label: 'Locations', href: '/locations' },
  { icon: Calendar, label: 'Events', href: '/events' },
  { icon: MessageSquare, label: 'Feedback', href: '/feedback' },
  { icon: FolderInput, label: 'Acquisition', href: '/acquisition' },
  { icon: MessageSquare, label: 'Contact', href: '/contact' },
  { icon: Briefcase, label: 'Jobs', href: '/jobs' },
  { icon: Users, label: 'Users', href: '/users' },
  { icon: Image, label: 'Gallery', href: '/gallery' },
  { icon: Info, label: 'About', href: '/about' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Main Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-background border-r transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          isMobile ? "w-16" : ""
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!collapsed && !isMobile && (
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CMS
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 rounded-lg px-3 py-2 transition-all duration-200",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-primary/5 hover:text-foreground",
                      collapsed || isMobile ? "justify-center" : ""
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {!collapsed && !isMobile && <span>{item.label}</span>}
                  </Link>
                </TooltipTrigger>
                {(collapsed || isMobile) && (
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>
      </aside>

      {/* Content Offset */}
      <div className={cn(
        "transition-all duration-300",
        collapsed ? "ml-16" : "ml-64",
        isMobile ? "ml-16" : ""
      )} />
    </>
  );
}