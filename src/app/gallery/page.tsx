"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Search, Upload, Grid, List, Trash2 } from 'lucide-react';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';
import type { GalleryImage } from '@/src/types/gallery';

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

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(mockImages);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      id: Date.now().toString(),
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
    }));
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  });

  const handleDelete = (id: string) => {
    setImages(images.filter(image => image.id !== id));
  };

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Gallery</h1>
        <p className="text-muted-foreground mt-1">
          Manage and organize your images
        </p>
      </div>

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

      <div {...getRootProps()} className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
      )}>
        <input {...getInputProps()} />
        <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
        <div className="text-lg font-medium">
          {isDragActive ? (
            "Drop the files here..."
          ) : (
            "Drag 'n' drop images here, or click to select files"
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Supports PNG, JPG, JPEG, GIF up to 10MB
        </p>
      </div>

      <div className={cn(
        "grid gap-6",
        viewMode === 'grid' 
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" 
          : "grid-cols-1"
      )}>
        {filteredImages.map((image) => (
          <Card key={image.id} className={cn(
            "overflow-hidden",
            viewMode === 'list' && "flex"
          )}>
            <div className={cn(
              "relative",
              viewMode === 'grid' ? "h-48" : "w-48 shrink-0 h-32"
            )}>
              <Image
                src={image.url}
                alt={image.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="font-medium truncate">{image.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(image.size)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(image.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}