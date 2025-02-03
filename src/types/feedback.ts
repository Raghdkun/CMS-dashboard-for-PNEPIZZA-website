// Types for feedback data
export interface Feedback {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
  status: 'published' | 'pending' | 'rejected';
}

export type FeedbackFormData = Omit<Feedback, 'id'>;