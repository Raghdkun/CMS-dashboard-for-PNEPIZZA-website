"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { name: "Jan", users: 400, views: 2400 },
  { name: "Feb", users: 300, views: 1398 },
  { name: "Mar", users: 200, views: 9800 },
  { name: "Apr", users: 278, views: 3908 },
  { name: "May", users: 189, views: 4800 },
  { name: "Jun", users: 239, views: 3800 },
];

// Default props for chart components
const defaultAxisProps = {
  fontSize: 12,
  tickLine: false,
  axisLine: false,
  tick: { fill: 'hsl(var(--muted-foreground))' }
};

const defaultAreaProps = {
  strokeWidth: 2,
  activeDot: { r: 4, strokeWidth: 1 }
};

// Custom chart wrapper to handle common props and styling
function ChartWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[300px] animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-in-out">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          {children}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DashboardChart() {
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <CardTitle>Growth Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartWrapper>
          <defs>
            <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="views" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            {...defaultAxisProps}
            dataKey="name" 
            padding={{ left: 10, right: 10 }}
            interval="preserveStartEnd"
            minTickGap={5}
          />
          <YAxis 
            {...defaultAxisProps}
            tickFormatter={(value) => `${value}`}
            width={40}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            cursor={{ fill: 'hsl(var(--muted))' }}
          />
          <Area
            {...defaultAreaProps}
            type="monotone"
            dataKey="users"
            stroke="hsl(var(--chart-1))"
            fillOpacity={1}
            fill="url(#users)"
          />
          <Area
            {...defaultAreaProps}
            type="monotone"
            dataKey="views"
            stroke="hsl(var(--chart-2))"
            fillOpacity={1}
            fill="url(#views)"
          />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}