"use client";

import { Users, FileText, LineChart, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "./stat-card";

const stats = [
  {
    title: "Total Users",
    value: "1,234",
    change: 12,
    icon: Users,
    delay: 100,
  },
  {
    title: "Content Pieces",
    value: "567",
    change: -2.3,
    icon: FileText,
    delay: 200,
  },
  {
    title: "Page Views",
    value: "89.4k",
    change: 8.1,
    icon: LineChart,
    delay: 300,
  },
  {
    title: "Avg. Session",
    value: "4m 32s",
    change: 5.4,
    icon: Clock,
    delay: 400,
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-in-out"
          style={{ animationDelay: `${stat.delay}ms` }}
        >
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
}