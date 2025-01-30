"use client";

import { useState } from 'react';
import { Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FeedbackTable } from '@/components/feedback/feedback-table';
import type { Feedback } from '@/types/feedback';

// Mock data - Replace with actual API calls
const mockFeedback: Feedback[] = [
  {
    id: '1',
    customerName: 'John D.',
    rating: 5,
    comment: 'Best pizza in town! Always hot and ready when I arrive.',
    date: '2024-03-19',
    location: 'Downtown Store',
    status: 'published',
  },
  {
    id: '2',
    customerName: 'Sarah M.',
    rating: 5,
    comment: 'The staff is so friendly and the Crazy Bread is to die for!',
    date: '2024-03-18',
    location: 'Westside Mall',
    status: 'published',
  },
  {
    id: '3',
    customerName: 'Mike R.',
    rating: 4,
    comment: 'Great value for money. My go-to place for quick and delicious meals.',
    date: '2024-03-17',
    location: 'Downtown Store',
    status: 'published',
  },
];

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>(mockFeedback);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (updatedFeedback: Feedback) => {
    setFeedback(feedback.map(item => 
      item.id === updatedFeedback.id ? updatedFeedback : item
    ));
  };

  const handleDelete = (id: string) => {
    setFeedback(feedback.filter(item => item.id !== id));
  };

  const filteredFeedback = feedback.filter(item =>
    item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    // Implement CSV export functionality
    console.log('Exporting feedback...');
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Customer Feedback</h1>
          <p className="text-muted-foreground mt-1">
            Manage and analyze customer reviews and ratings
          </p>
        </div>
        <Button onClick={handleExport} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search feedback..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <FeedbackTable
        feedback={filteredFeedback}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}