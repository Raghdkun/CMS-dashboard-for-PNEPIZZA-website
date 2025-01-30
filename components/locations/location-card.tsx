"use client";

import { useState } from 'react';
import Image from 'next/image';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LocationDialog } from './location-dialog';
import type { Location } from '@/types/location';

interface LocationCardProps {
  location: Location;
  viewMode: 'grid' | 'list';
  onEdit: (location: Location) => void;
  onDelete: (id: string) => void;
}

export function LocationCard({ location, viewMode, onEdit, onDelete }: LocationCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEdit = (updatedLocation: Location) => {
    onEdit(updatedLocation);
    setShowEditDialog(false);
  };

  return (
    <>
      <Card className={viewMode === 'list' ? 'flex overflow-hidden' : ''}>
        <div className={cn(
          "relative",
          viewMode === 'list' ? 'w-48 shrink-0' : 'h-48'
        )}>
          <Image
            src={location.image}
            alt={location.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{location.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {location.address}, {location.city}, {location.state} {location.zipCode}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={() => onDelete(location.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {location.description}
          </p>
          <div className="mt-4">
            <Badge variant={location.status === 'active' ? 'default' : 'secondary'}>
              {location.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
      </Card>

      <LocationDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={handleEdit}
        defaultValues={location}
      />
    </>
  );
}