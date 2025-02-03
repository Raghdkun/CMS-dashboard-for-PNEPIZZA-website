import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/src/components/ui/toaster';
import { TooltipProvider } from '@/src/components/ui/tooltip';
import { ThemeProvider } from '@/src/providers/theme-provider';
import RootLayoutClient from './root-layout-client';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CMS Dashboard',
  description: 'Modern Contact Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <RootLayoutClient>
              {children}
            </RootLayoutClient>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}