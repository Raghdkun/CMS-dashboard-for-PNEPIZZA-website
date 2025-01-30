// Types for contact data
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  status: 'new' | 'in_progress' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  receivedAt: string;
  message: string;
}

export type ContactFormData = Omit<Contact, 'id'>;