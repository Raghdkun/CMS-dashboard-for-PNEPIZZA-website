import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";

const activities = [
  {
    id: 1,
    type: "New user registered",
    time: "2 minutes ago",
    initials: "JD",
    delay: 100,
  },
  {
    id: 2,
    type: "New user registered",
    time: "5 minutes ago",
    initials: "MK",
    delay: 200,
  },
  {
    id: 3,
    type: "New user registered",
    time: "10 minutes ago",
    initials: "RW",
    delay: 300,
  },
];

export function RecentActivity() {
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 animate-in fade-in slide-in-from-right duration-1000 ease-in-out"
              style={{ animationDelay: `${activity.delay}ms` }}
            >
              <Avatar className="h-9 w-9 transition-transform hover:scale-110">
                <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary text-primary-foreground">
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{activity.type}</p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}