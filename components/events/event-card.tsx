"use client";

import { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { MoreVertical, Edit, Trash2, Calendar, Clock, MapPin, Users } from 'lucide-react';
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
import { EventDialog } from './event-dialog';
import type { Event, EventCardProps } from '@/types/event';

export function EventCard({ event, viewMode, onEdit, onDelete, onImageClick }: EventCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEdit = (updatedEvent: Event) => {
    onEdit(updatedEvent);
    setShowEditDialog(false);
  };

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Card className={viewMode === 'list' ? 'flex overflow-hidden' : ''}>
        <div 
          className={cn(
            "relative cursor-pointer",
            viewMode === 'list' ? 'w-48 shrink-0' : 'h-48'
          )}
          onClick={() => onImageClick?.(event)}
        >
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
          <Badge 
            className="absolute top-2 right-2"
            variant={getStatusColor(event.status)}
          >
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {event.description}
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
                  onClick={() => onDelete(event.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              {format(new Date(event.date), 'MMMM d, yyyy')}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              {event.time}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              {event.location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-2 h-4 w-4" />
              {event.capacity} attendees max
            </div>
          </div>
        </div>
      </Card>

      <EventDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={handleEdit}
        defaultValues={event}
      />
    </>
  );
}