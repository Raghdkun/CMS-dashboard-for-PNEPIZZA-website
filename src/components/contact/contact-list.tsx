"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { Mail, Phone, Clock, MoreVertical } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { Avatar } from '@/src/components/ui/avatar';
import { Card } from '@/src/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { ContactDialog } from './contact-dialog';
import type { Contact } from '@/src/types/contact';

interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Contact['status']) => void;
}

export function ContactList({
  contacts,
  onEdit,
  onDelete,
  onStatusChange,
}: ContactListProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEdit = (updatedContact: Contact) => {
    onEdit(updatedContact);
    setShowEditDialog(false);
  };

  const getPriorityColor = (priority: Contact['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card key={contact.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <div className="bg-primary text-white flex items-center justify-center h-full">
                    {contact.name[0]}
                  </div>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    <Badge className={getStatusColor(contact.status)}>
                      {contact.status === 'in_progress' ? 'In Progress' : 
                        contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                    </Badge>
                    <Badge className={getPriorityColor(contact.priority)}>
                      {contact.priority.charAt(0).toUpperCase() + contact.priority.slice(1)} Priority
                    </Badge>
                  </div>
                  <p className="text-gray-600 mt-1">{contact.subject}</p>
                  <div className="flex space-x-6 mt-2 text-gray-500">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      {contact.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      {contact.phone}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Received {format(new Date(contact.receivedAt), 'MM/dd/yyyy')}
                    </div>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedContact(contact);
                      setShowEditDialog(true);
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onStatusChange(contact.id, 'resolved')}
                  >
                    Mark as Resolved
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(contact.id)}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>

      <ContactDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={handleEdit}
        defaultValues={selectedContact}
      />
    </>
  );
}