// Types for acquisition data
export interface Acquisition {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  status: 'new' | 'in_review' | 'contacted' | 'not_qualified';
  priority: 'high' | 'medium' | 'low';
  submittedAt: string;
  notes: string;
}

export type AcquisitionFormData = Omit<Acquisition, 'id'>;