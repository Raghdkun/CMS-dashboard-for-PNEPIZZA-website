"use client";

import { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { UserTable } from '@/src/components/users/user-table';
import { UserDialog } from '@/src/components/users/user-dialog';
import { UserFilters } from '@/src/components/users/user-filters';
import type { User } from '@/src/types/user';

// Mock data - Replace with actual API calls
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-03-20',
    avatar: 'https://avatar.vercel.sh/john',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2024-03-19',
    avatar: 'https://avatar.vercel.sh/sarah',
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleAdd = (newUser: User) => {
    setUsers([...users, { ...newUser, id: Date.now().toString() }]);
    setShowAddDialog(false);
  };

  const handleEdit = (updatedUser: User) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage user accounts and permissions
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search users..."
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

      {showFilters && <UserFilters />}

      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={handleAdd}
      />
    </div>
  );
}