import { CalendarDays } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-1000 ease-in-out">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">Monitor your business metrics</p>
      </div>
      <div className="flex items-center gap-2 self-stretch sm:self-auto">
        <Select defaultValue="7d">
          <SelectTrigger className="w-[180px]">
            <CalendarDays className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
        <Button className="transition-all duration-200 hover:shadow-lg">
          Export
        </Button>
      </div>
    </div>
  );
}