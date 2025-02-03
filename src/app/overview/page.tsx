"use client";

import { DashboardHeader } from "@/src/components/dashboard/dashboard-header";
import { DashboardStats } from "@/src/components/dashboard/dashboard-stats";
import { RecentActivity } from "@/src/components/dashboard/recent-activity";
import { PopularContent } from "@/src/components/dashboard/popular-content";
import { DashboardChart } from "@/src/components/dashboard/dashboard-chart";

export default function OverviewPage() {
  return (
    <div className="p-8 space-y-8">
      <DashboardHeader />
      <DashboardStats />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <RecentActivity />
          <DashboardChart />
        </div>
        <PopularContent />
      </div>
    </div>
  );
}