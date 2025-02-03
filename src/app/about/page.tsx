"use client";

import { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { MilestoneDialog } from '@/src/components/about/milestone-dialog';
import { TeamMemberDialog } from '@/src/components/about/team-member-dialog';
import type { Milestone, TeamMember } from '@/src/types/about';

// Mock data - Replace with actual API calls
const mockMilestones: Milestone[] = [
  {
    id: '1',
    date: '2023-05',
    title: 'Started with 3 stores',
    description: 'Launched our first three locations in key metropolitan areas.',
  },
  {
    id: '2',
    date: '2023-08',
    title: 'Expanded to 5 locations',
    description: 'Successfully expanded our presence with two additional stores.',
  },
  {
    id: '3',
    date: '2024-01',
    title: 'Grew to 13 stores',
    description: 'Significant expansion phase adding eight new locations.',
  },
  {
    id: '4',
    date: '2024-03',
    title: 'Reached 22 locations',
    description: 'Continued growth with nine additional stores across multiple states.',
  },
];

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Ahab',
    role: 'CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    bio: 'Experienced leader with a proven track record in retail expansion.',
    status: 'active',
  },
  {
    id: '2',
    name: 'Ayham',
    role: 'COO',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
    bio: 'Operations expert focused on streamlining processes and improving efficiency.',
    status: 'active',
  },
  {
    id: '3',
    name: 'Emma',
    role: 'CFO',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    bio: 'Financial strategist with expertise in growth management and investment.',
    status: 'active',
  },
];

export default function AboutPage() {
  const [milestones, setMilestones] = useState<Milestone[]>(mockMilestones);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [showMilestoneDialog, setShowMilestoneDialog] = useState(false);
  const [showTeamMemberDialog, setShowTeamMemberDialog] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | undefined>();
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | undefined>();

  // Milestone handlers
  const handleAddMilestone = (newMilestone: Milestone) => {
    setMilestones([...milestones, { ...newMilestone, id: Date.now().toString() }]);
    setShowMilestoneDialog(false);
  };

  const handleEditMilestone = (updatedMilestone: Milestone) => {
    setMilestones(milestones.map(milestone =>
      milestone.id === updatedMilestone.id ? updatedMilestone : milestone
    ));
    setShowMilestoneDialog(false);
    setSelectedMilestone(undefined);
  };

  const handleDeleteMilestone = (id: string) => {
    setMilestones(milestones.filter(milestone => milestone.id !== id));
  };

  // Team member handlers
  const handleAddTeamMember = (newMember: TeamMember) => {
    setTeamMembers([...teamMembers, { ...newMember, id: Date.now().toString() }]);
    setShowTeamMemberDialog(false);
  };

  const handleEditTeamMember = (updatedMember: TeamMember) => {
    setTeamMembers(teamMembers.map(member =>
      member.id === updatedMember.id ? updatedMember : member
    ));
    setShowTeamMemberDialog(false);
    setSelectedTeamMember(undefined);
  };

  const handleDeleteTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  return (
    <div className="p-8 space-y-8">
      {/* Our Journey Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Our Journey</h2>
            <p className="text-muted-foreground">Track our company's growth and milestones</p>
          </div>
          <Button onClick={() => setShowMilestoneDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Milestone
          </Button>
        </div>

        <div className="space-y-4">
          {milestones.map((milestone) => (
            <Card key={milestone.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(milestone.date), 'MMMM yyyy')}
                    </span>
                    <h3 className="text-lg font-semibold">{milestone.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedMilestone(milestone);
                      setShowMilestoneDialog(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteMilestone(milestone.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Leadership Team Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Leadership Team</h2>
            <p className="text-muted-foreground">Our company's leadership and management</p>
          </div>
          <Button onClick={() => setShowTeamMemberDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Team Member
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                    onClick={() => {
                      setSelectedTeamMember(member);
                      setShowTeamMemberDialog(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                    onClick={() => handleDeleteTeamMember(member.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                    {member.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialogs */}
      <MilestoneDialog
        open={showMilestoneDialog}
        onOpenChange={setShowMilestoneDialog}
        onSubmit={selectedMilestone ? handleEditMilestone : handleAddMilestone}
        defaultValues={selectedMilestone}
      />

      <TeamMemberDialog
        open={showTeamMemberDialog}
        onOpenChange={setShowTeamMemberDialog}
        onSubmit={selectedTeamMember ? handleEditTeamMember : handleAddTeamMember}
        defaultValues={selectedTeamMember}
      />
    </div>
  );
}