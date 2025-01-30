"use client";

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

export function LocationFilters() {
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
              <RadioGroupItem value="active" id="active" />
              <Label htmlFor="active">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inactive" id="inactive" />
              <Label htmlFor="inactive">Inactive</Label>
            </div>
          </RadioGroup>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium mb-4">Region</h3>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="region-all" />
              <Label htmlFor="region-all">All Regions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="east" id="east" />
              <Label htmlFor="east">East Coast</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="west" id="west" />
              <Label htmlFor="west">West Coast</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="central" id="central" />
              <Label htmlFor="central">Central</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
}