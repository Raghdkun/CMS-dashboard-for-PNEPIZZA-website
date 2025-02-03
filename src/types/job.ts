// Types for job data
export interface Job {
  id: string;
  title: string;
  salary: string;
  location: string;
  type: 'FULL TIME' | 'PART TIME' | 'CONTRACT';
  status: 'active' | 'closed' | 'draft';
  description: string;
  requirements: string[];
  externalLinks: {
    indeed?: string;
    workstream?: string;
  };
  postedAt: string;
}

export type JobFormData = Omit<Job, 'id'>;