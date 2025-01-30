// Types for gallery data
export interface GalleryImage {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export interface GalleryPickerProps {
  onSelect: (url: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type GalleryFormData = Omit<GalleryImage, 'id'>;