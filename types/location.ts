// Types for location data
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image: string;
  description: string;
  status: 'active' | 'inactive';
}

export type LocationFormData = Omit<Location, 'id'>;