"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Mail, Phone, MapPin } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-in-out">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your profile photo and personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center sm:flex-row gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://avatar.vercel.sh/admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Admin User" readOnly={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="admin" readOnly={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" defaultValue="Administrator with full system access" readOnly={!isEditing} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Manage your contact details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input defaultValue="admin@example.com" readOnly={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input defaultValue="+1 (555) 123-4567" readOnly={!isEditing} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input defaultValue="New York, USA" readOnly={!isEditing} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}