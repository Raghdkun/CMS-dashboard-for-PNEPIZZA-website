"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Textarea } from '@/src/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/src/components/ui/card';
import type { WebsiteMetadata } from '@/src/types/settings';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  keywords: z.string().min(1, 'At least one keyword is required'),
  openGraphTitle: z.string().min(1, 'Open Graph title is required'),
  openGraphDescription: z.string().min(1, 'Open Graph description is required'),
  openGraphImage: z.string().url('Must be a valid URL'),
  twitterHandle: z.string().min(1, 'Twitter handle is required'),
  googleAnalyticsId: z.string().min(1, 'Google Analytics ID is required'),
});

interface MetadataFormProps {
  defaultValues?: WebsiteMetadata;
  onSubmit: (data: WebsiteMetadata) => void;
}

export function MetadataForm({ defaultValues, onSubmit }: MetadataFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ? {
      ...defaultValues,
      keywords: defaultValues.keywords.join(', '),
    } : {
      title: '',
      description: '',
      keywords: '',
      openGraphTitle: '',
      openGraphDescription: '',
      openGraphImage: '',
      twitterHandle: '',
      googleAnalyticsId: '',
    },
  });

  const handleSubmit = (formData: z.infer<typeof formSchema>) => {
    onSubmit({
      ...formData,
      keywords: formData.keywords.split(',').map(s => s.trim()),
      id: defaultValues?.id || Date.now().toString(),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Metadata</CardTitle>
        <CardDescription>
          Manage your website's metadata, SEO settings, and social media integration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Title</FormLabel>
                    <FormControl>
                      <Input placeholder="PNE Pizza - Quality Pizza & Community Service" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="pizza, community service, love kitchen, restaurant" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Separate keywords with commas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Your local pizza restaurant committed to serving the community with quality food and exceptional service."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="openGraphTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Open Graph Title</FormLabel>
                    <FormControl>
                      <Input placeholder="PNE Pizza - Quality Pizza & Community Service" {...field} />
                    </FormControl>
                    <FormDescription>
                      Title shown when sharing on social media
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="openGraphImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Open Graph Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/og-image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>
                      Image shown when sharing on social media
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="openGraphDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open Graph Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Join us in making a difference while enjoying the best pizza in town."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Description shown when sharing on social media
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="twitterHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter Handle</FormLabel>
                    <FormControl>
                      <Input placeholder="@PNEPizza" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="googleAnalyticsId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Analytics ID</FormLabel>
                    <FormControl>
                      <Input placeholder="UA-XXXXXXXXX-X" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}