"use client";

import { useState } from 'react';
import { Search, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ContactList } from '@/components/contact/contact-list';
import { ContactFilters } from '@/components/contact/contact-filters';
import type { Contact } from '@/types/contact';

// Helper function to get initials
const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name[0].toUpperCase();
};

// Mock data - Replace with actual API calls
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    subject: 'Question about catering services',
    status: 'new',
    priority: 'high',
    receivedAt: '2024-03-20',
    message: 'I would like to inquire about your catering services for an upcoming event.',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    subject: 'Website feedback',
    status: 'in_progress',
    priority: 'medium',
    receivedAt: '2024-03-19',
    message: 'I have some suggestions for improving the website navigation.',
  },
];

export default function ContactPage() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts.map(contact => ({
    ...contact,
    initials: getInitials(contact.name)
  })));
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleEdit = (updatedContact: Contact) => {
    setContacts(contacts.map(contact =>
      contact.id === updatedContact.id ? {
        ...updatedContact,
        initials: getInitials(updatedContact.name)
      } : contact
    ));
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleStatusChange = (id: string, status: Contact['status']) => {
    setContacts(contacts.map(contact =>
      contact.id === id ? { ...contact, status } : contact
    ));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    // Implement CSV export functionality
    console.log('Exporting contacts...');
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Contact Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage and respond to customer inquiries and feedback
          </p>
        </div>
        <Button onClick={handleExport} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search by name, email, or subject..."
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

      {showFilters && <ContactFilters />}

      <ContactList
        contacts={filteredContacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}