"use client";

import { useState } from 'react';
import { Search, Filter, Grid, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LocationCard } from '@/components/locations/location-card';
import { LocationDialog } from '@/components/locations/location-dialog';
import { LocationFilters } from '@/components/locations/location-filters';
import { cn } from '@/lib/utils';
import type { Location } from '@/types/location';

// Mock data - Replace with actual API calls
const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Downtown Store',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    image: 'https://images.unsplash.com/photo-1534857960402-ea3b66ba10b8?q=80&w=2070',
    description: 'Our flagship store in the heart of downtown',
    status: 'active',
  },
  {
    id: '2',
    name: 'Westside Mall',
    address: '456 Market Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90012',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070',
    description: 'Located in the bustling Westside Shopping Mall',
    status: 'active',
  },
];

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleDelete = (id: string) => {
    setLocations(locations.filter(location => location.id !== id));
  };

  const handleAdd = (newLocation: Location) => {
    setLocations([...locations, { ...newLocation, id: Date.now().toString() }]);
    setShowAddDialog(false);
  };

  const handleEdit = (updatedLocation: Location) => {
    setLocations(locations.map(location => 
      location.id === updatedLocation.id ? updatedLocation : location
    ));
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Locations</h1>
          <p className="text-muted-foreground mt-1">
            Manage your franchise store locations
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search locations..."
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

      {showFilters && <LocationFilters />}

      <div className={cn(
        "grid gap-6",
        viewMode === 'grid' 
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
          : "grid-cols-1"
      )}>
        {filteredLocations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            viewMode={viewMode}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <LocationDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={handleAdd}
      />
    </div>
  );
}