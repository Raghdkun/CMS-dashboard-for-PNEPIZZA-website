"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { MapPin, ExternalLink, MoreVertical } from 'lucide-react';
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
import { JobDialog } from './job-dialog';
import type { Job } from '@/src/types/job';

interface JobTableProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

export function JobTable({ jobs, onEdit, onDelete }: JobTableProps) {
  const [selectedJob, setSelectedJob] = useState<Job | undefined>();
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEdit = (updatedJob: Job) => {
    onEdit(updatedJob);
    setShowEditDialog(false);
  };

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: Job['type']) => {
    switch (type) {
      case 'FULL TIME':
        return 'bg-blue-100 text-blue-800';
      case 'PART TIME':
        return 'bg-purple-100 text-purple-800';
      case 'CONTRACT':
        return 'bg-orange-100 text-orange-800';
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
              <TableHead>Job Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>External Links</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-muted-foreground">{job.salary}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {job.location}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getTypeColor(job.type)}>
                    {job.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(job.status)}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {job.externalLinks.indeed && (
                      <a
                        href={job.externalLinks.indeed}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        Indeed <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    )}
                    {job.externalLinks.workstream && (
                      <a
                        href={job.externalLinks.workstream}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        Workstream <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    )}
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
                          setSelectedJob(job);
                          setShowEditDialog(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete(job.id)}
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

      <JobDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={handleEdit}
        defaultValues={selectedJob}
      />
    </>
  );
}