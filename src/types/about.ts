// Types for about page data
export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  status: 'active' | 'inactive';
}

export type MilestoneFormData = Omit<Milestone, 'id'>;
export type TeamMemberFormData = Omit<TeamMember, 'id'>;