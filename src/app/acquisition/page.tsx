"use client";

import { useState } from 'react';
import { Search, Download, Plus } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { AcquisitionTable } from '@/src/components/acquisition/acquisition-table';
import { AcquisitionDialog } from '@/src/components/acquisition/acquisition-dialog';
import type { Acquisition } from '@/src/types/acquisition';

// Mock data - Replace with actual API calls
const mockAcquisitions: Acquisition[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St',
    city: 'Columbus',
    state: 'OH',
    status: 'new',
    priority: 'high',
    submittedAt: '2024-03-20',
    notes: 'Operating successful franchise for 5 years with consistent growth',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    address: '456 Market Ave',
    city: 'Indianapolis',
    state: 'IN',
    status: 'in_review',
    priority: 'medium',
    submittedAt: '2024-03-19',
    notes: 'Interested in expanding current business operations',
  },
];

export default function AcquisitionPage() {
  const [acquisitions, setAcquisitions] = useState<Acquisition[]>(mockAcquisitions);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleAdd = (newAcquisition: Acquisition) => {
    setAcquisitions([...acquisitions, { ...newAcquisition, id: Date.now().toString() }]);
    setShowAddDialog(false);
  };

  const handleEdit = (updatedAcquisition: Acquisition) => {
    setAcquisitions(acquisitions.map(item =>
      item.id === updatedAcquisition.id ? updatedAcquisition : item
    ));
  };

  const handleDelete = (id: string) => {
    setAcquisitions(acquisitions.filter(item => item.id !== id));
  };

  const handleStatusChange = (id: string, status: Acquisition['status']) => {
    setAcquisitions(acquisitions.map(item =>
      item.id === id ? { ...item, status } : item
    ));
  };

  const filteredAcquisitions = acquisitions.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    // Implement CSV export functionality
    console.log('Exporting acquisitions...');
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Store Acquisition Inquiries</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track potential store acquisition leads
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Inquiry
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search by name, email, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <AcquisitionTable
        acquisitions={filteredAcquisitions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <AcquisitionDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={handleAdd}
      />
    </div>
  );
}