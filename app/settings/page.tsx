"use client";

import { useState } from 'react';
import { MetadataForm } from '@/components/settings/metadata-form';
import type { WebsiteMetadata } from '@/types/settings';

// Mock data - Replace with actual API calls
const mockMetadata: WebsiteMetadata = {
  id: '1',
  title: 'PNE Pizza - Quality Pizza & Community Service',
  description: 'Your local pizza restaurant committed to serving the community with quality food and exceptional service.',
  keywords: ['pizza', 'community service', 'love kitchen', 'restaurant', 'local business'],
  openGraphTitle: 'PNE Pizza - Quality Pizza & Community Service',
  openGraphDescription: 'Join us in making a difference while enjoying the best pizza in town.',
  openGraphImage: 'https://example.com/og-image.jpg',
  twitterHandle: '@PNEPizza',
  googleAnalyticsId: 'UA-XXXXXXXXX-X',
};

export default function SettingsPage() {
  const [metadata, setMetadata] = useState<WebsiteMetadata>(mockMetadata);

  const handleMetadataSubmit = (updatedMetadata: WebsiteMetadata) => {
    setMetadata(updatedMetadata);
    // Here you would typically make an API call to save the changes
    console.log('Saving metadata:', updatedMetadata);
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your website settings and configurations
        </p>
      </div>

      <div className="max-w-4xl">
        <MetadataForm
          defaultValues={metadata}
          onSubmit={handleMetadataSubmit}
        />
      </div>
    </div>
  );
}