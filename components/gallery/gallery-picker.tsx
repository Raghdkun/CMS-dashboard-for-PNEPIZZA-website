"use client";

import { useState } from 'react';
import { Search, Upload, Grid, List, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { GalleryImage, GalleryPickerProps } from '@/types/gallery';

// Mock data - Replace with actual API calls
const mockImages: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    name: 'pizza-1.jpg',
    size: 1024000,
    type: 'image/jpeg',
    uploadedAt: '2024-03-20',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1541014741259-de529411b96a',
    name: 'store-front.jpg',
    size: 2048000,
    type: 'image/jpeg',
    uploadedAt: '2024-03-19',
  },
];

export function GalleryPicker({ onSelect, open, onOpenChange }: GalleryPickerProps) {
  const [images] = useState<GalleryImage[]>(mockImages);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = () => {
    if (selectedImage) {
      onSelect(selectedImage);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] w-[90vw] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Select Image</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                className="pl-10"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
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

          <div className={cn(
            "grid gap-4 overflow-y-auto max-h-[60vh]",
            viewMode === 'grid' 
              ? "grid-cols-2 sm:grid-cols-3" 
              : "grid-cols-1"
          )}>
            {filteredImages.map((image) => (
              <Card
                key={image.id}
                className={cn(
                  "overflow-hidden cursor-pointer transition-all",
                  viewMode === 'list' && "flex",
                  selectedImage === image.url && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedImage(image.url)}
              >
                <div className={cn(
                  "relative",
                  viewMode === 'grid' ? "h-32" : "w-32 shrink-0 h-24"
                )}>
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    className="object-cover"
                  />
                  {selectedImage === image.url && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Check className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium truncate">{image.name}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSelect}
              disabled={!selectedImage}
            >
              Select Image
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}