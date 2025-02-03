// Types for event data
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  capacity: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export type EventFormData = Omit<Event, 'id'>;

export interface EventCardProps {
  event: Event;
  viewMode: 'grid' | 'list';
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
  onImageClick?: (event: Event) => void;  // Added this optional prop
}