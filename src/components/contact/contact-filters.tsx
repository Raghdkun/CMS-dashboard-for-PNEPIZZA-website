"use client";

import { Card } from '@/src/components/ui/card';
import { Label } from '@/src/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group';
import { Separator } from '@/src/components/ui/separator';

export function ContactFilters() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-4">Status</h3>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new">New</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="in_progress" id="in_progress" />
              <Label htmlFor="in_progress">In Progress</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="resolved" id="resolved" />
              <Label htmlFor="resolved">Resolved</Label>
            </div>
          </RadioGroup>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium mb-4">Priority</h3>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="priority-all" />
              <Label htmlFor="priority-all">All Priorities</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high" />
              <Label htmlFor="high">High Priority</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium">Medium Priority</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="low" />
              <Label htmlFor="low">Low Priority</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
}