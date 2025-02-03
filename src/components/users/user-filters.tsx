"use client";

import { Card } from '@/src/components/ui/card';
import { Label } from '@/src/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group';
import { Separator } from '@/src/components/ui/separator';

export function UserFilters() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-4">Role</h3>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Users</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="admin" id="admin" />
              <Label htmlFor="admin">Admins</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manager" id="manager" />
              <Label htmlFor="manager">Managers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="user" id="user" />
              <Label htmlFor="user">Users</Label>
            </div>
          </RadioGroup>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium mb-4">Status</h3>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="status-all" />
              <Label htmlFor="status-all">All Status</Label>
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
      </div>
    </Card>
  );
}