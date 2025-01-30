"use client";

import { useState } from 'react';
import { Search, Filter, Grid, List, Plus, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EventCard } from '@/components/events/event-card';
import { EventDialog } from '@/components/events/event-dialog';
import { EventFilters } from '@/components/events/event-filters';
import { GalleryPicker } from '@/components/gallery/gallery-picker';
import { cn } from '@/lib/utils';
import type { Event } from '@/types/event';

// Mock data - Replace with actual API calls
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Love Kitchen Community Service',
    description: 'Join us in serving our community through food and love',
    date: '2024-03-24',
    time: '10:00 AM',
    location: 'Downtown Community Center',
    image: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?q=80&w=2069',
    capacity: 150,
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'School Fundraiser Pizza Night',
    description: 'Support our local school with a delicious pizza night',
    date: '2024-03-27',
    time: '6:00 PM',
    location: 'Lincoln High School',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070',
    capacity: 200,
    status: 'upcoming',
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showGalleryPicker, setShowGalleryPicker] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleDelete = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleAdd = (newEvent: Event) => {
    setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
    setShowAddDialog(false);
  };

  const handleEdit = (updatedEvent: Event) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const handleImageSelect = (url: string) => {
    if (selectedEvent) {
      handleEdit({ ...selectedEvent, image: url });
    }
    setShowGalleryPicker(false);
    setSelectedEvent(null);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-muted-foreground mt-1">
            Manage your community events and activities
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <div className="flex border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-r-none",
                viewMode === 'grid' && "bg-muted"
              )}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-l-none",
                viewMode === 'list' && "bg-muted"
              )}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {showFilters && <EventFilters />}

      <div className={cn(
        "grid gap-6",
        viewMode === 'grid' 
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
          : "grid-cols-1"
      )}>
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            viewMode={viewMode}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onImageClick={(event) => {
              setSelectedEvent(event);
              setShowGalleryPicker(true);
            }}
          />
        ))}
      </div>

      <EventDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={handleAdd}
      />

      <GalleryPicker
        open={showGalleryPicker}
        onOpenChange={setShowGalleryPicker}
        onSelect={handleImageSelect}
      />
    </div>
  );
}