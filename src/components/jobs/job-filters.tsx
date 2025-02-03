"use client";

import { Card } from '@/src/components/ui/card';
import { Label } from '@/src/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group';
import { Separator } from '@/src/components/ui/separator';

export function JobFilters() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-4">Status</h3>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Jobs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="active" id="active" />
              <Label htmlFor="active">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="closed" id="closed" />
              <Label htmlFor="closed">Closed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="draft" id="draft" />
              <Label htmlFor="draft">Draft</Label>
            </div>
          </RadioGroup>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium mb-4">Job Type</h3>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="type-all" />
              <Label htmlFor="type-all">All Types</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="FULL TIME" id="full-time" />
              <Label htmlFor="full-time">Full Time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="PART TIME" id="part-time" />
              <Label htmlFor="part-time">Part Time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="CONTRACT" id="contract" />
              <Label htmlFor="contract">Contract</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
}