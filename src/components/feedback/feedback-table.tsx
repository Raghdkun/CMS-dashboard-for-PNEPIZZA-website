"use client";

import { useState } from 'react';
import { Star, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { FeedbackDialog } from './feedback-dialog';
import type { Feedback } from '@/src/types/feedback';

interface FeedbackTableProps {
  feedback: Feedback[];
  onEdit: (feedback: Feedback) => void;
  onDelete: (id: string) => void;
}

export function FeedbackTable({ feedback, onEdit, onDelete }: FeedbackTableProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | undefined>();
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEdit = (updatedFeedback: Feedback) => {
    onEdit(updatedFeedback);
    setShowEditDialog(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300 fill-gray-300'
        }`}
      />
    ));
  };

  const getStatusColor = (status: Feedback['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="max-w-[300px]">Comment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedback.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.customerName}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    {renderStars(item.rating)}
                  </div>
                </TableCell>
                <TableCell className="max-w-[300px]">
                  <p className="truncate">{item.comment}</p>
                </TableCell>
                <TableCell>
                  {format(new Date(item.date), 'MM/dd/yyyy')}
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedFeedback(item);
                          setShowEditDialog(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete(item.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <FeedbackDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={handleEdit}
        defaultValues={selectedFeedback}
      />
    </>
  );
}