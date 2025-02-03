"use client";

import { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { JobTable } from '@/src/components/jobs/job-table';
import { JobDialog } from '@/src/components/jobs/job-dialog';
import { JobFilters } from '@/src/components/jobs/job-filters';
import type { Job } from '@/src/types/job';

// Mock data - Replace with actual API calls
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Store Manager',
    salary: '$45,000 - $55,000',
    location: 'Columbus, OH',
    type: 'FULL TIME',
    status: 'active',
    description: 'We are seeking an experienced Store Manager to join our team...',
    requirements: [
      'Previous retail management experience',
      'Strong leadership skills',
      'Excellent customer service',
    ],
    externalLinks: {
      indeed: 'https://indeed.com/job1',
      workstream: 'https://workstream.com/job1',
    },
    postedAt: '2024-03-20',
  },
  {
    id: '2',
    title: 'Shift Leader',
    salary: '$35,000 - $42,000',
    location: 'Indianapolis, IN',
    type: 'FULL TIME',
    status: 'active',
    description: 'Looking for a motivated Shift Leader to help manage daily operations...',
    requirements: [
      'Previous supervisory experience',
      'Flexible schedule',
      'Team player',
    ],
    externalLinks: {
      indeed: 'https://indeed.com/job2',
    },
    postedAt: '2024-03-19',
  },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleAdd = (newJob: Job) => {
    setJobs([...jobs, { ...newJob, id: Date.now().toString() }]);
    setShowAddDialog(false);
  };

  const handleEdit = (updatedJob: Job) => {
    setJobs(jobs.map(job => 
      job.id === updatedJob.id ? updatedJob : job
    ));
  };

  const handleDelete = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Job Listings</h1>
          <p className="text-muted-foreground mt-1">
            Manage job postings and application links
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Job
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {showFilters && <JobFilters />}

      <JobTable
        jobs={filteredJobs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <JobDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={handleAdd}
      />
    </div>
  );
}