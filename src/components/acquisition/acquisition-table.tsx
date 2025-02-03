"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { Mail, Phone, MapPin, Clock, MoreVertical } from 'lucide-react';
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
import { AcquisitionDialog } from './acquisition-dialog';
import type { Acquisition } from '@/src/types/acquisition';

interface AcquisitionTableProps {
  acquisitions: Acquisition[];
  onEdit: (acquisition: Acquisition) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Acquisition['status']) => void;
}

export function AcquisitionTable({
  acquisitions,
  onEdit,
  onDelete,
  onStatusChange,
}: AcquisitionTableProps) {
  const [selectedAcquisition, setSelectedAcquisition] = useState<Acquisition | undefined>();
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEdit = (updatedAcquisition: Acquisition) => {
    onEdit(updatedAcquisition);
    setShowEditDialog(false);
  };

  const getPriorityColor = (priority: Acquisition['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Acquisition['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-green-100 text-green-800';
      case 'not_qualified':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: Acquisition['status']) => {
    switch (status) {
      case 'in_review':
        return 'In Review';
      case 'not_qualified':
        return 'Not Qualified';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {acquisitions.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.name}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="mr-2 h-4 w-4" />
                      {item.email}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="mr-2 h-4 w-4" />
                      {item.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {item.city}, {item.state}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(item.status)}>
                    {getStatusLabel(item.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {format(new Date(item.submittedAt), 'MM/dd/yyyy')}
                  </div>
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
                          setSelectedAcquisition(item);
                          setShowEditDialog(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onStatusChange(item.id, 'contacted')}
                      >
                        Mark as Contacted
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onStatusChange(item.id, 'not_qualified')}
                        className="text-red-600"
                      >
                        Mark Not Qualified
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(item.id)}
                        className="text-red-600"
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

      <AcquisitionDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={handleEdit}
        defaultValues={selectedAcquisition}
      />
    </>
  );
}