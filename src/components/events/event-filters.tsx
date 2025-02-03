"use client";

import { Card } from '@/src/components/ui/card';
import { Label } from '@/src/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group';
import { Separator } from '@/src/components/ui/separator';

export function EventFilters() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-4">Status</h3>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Events</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upcoming" id="upcoming" />
              <Label htmlFor="upcoming">Upcoming</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="completed" id="completed" />
              <Label htmlFor="completed">Completed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cancelled" id="cancelled" />
              <Label htmlFor="cancelled">Cancelled</Label>
            </div>
          </RadioGroup>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium mb-4">Capacity</h3>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="capacity-all" />
              <Label htmlFor="capacity-all">All Sizes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="small" id="small" />
              <Label htmlFor="small">Small ({"< "}50)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium">Medium (50-150)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="large" id="large" />
              <Label htmlFor="large">Large (150+)</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
}