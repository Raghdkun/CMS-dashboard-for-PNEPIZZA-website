// Types for settings data
export interface WebsiteMetadata {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: string;
  twitterHandle: string;
  googleAnalyticsId: string;
}

export type WebsiteMetadataFormData = Omit<WebsiteMetadata, 'id'>;