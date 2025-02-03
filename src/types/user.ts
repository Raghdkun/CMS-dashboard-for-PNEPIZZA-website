// Types for user data
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive';
  lastLogin: string;
  permissions?: string[];
  avatar?: string;
}

export type UserFormData = Omit<User, 'id'>;