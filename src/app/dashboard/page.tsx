'use client';

import { useState } from 'react';
import { StatCards } from '@/components/dashboard/stat-cards';
import { ProjectsTable, Project } from '@/components/dashboard/projects-table';
import { SubmitProjectModal } from '@/components/dashboard/submit-project-modal';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const initialProjects: Project[] = [
  {
    name: 'Andaman Coast Mangrove Restoration',
    location: 'Krabi, Thailand',
    area: '150 Hectares',
    status: 'Verified',
  },
  {
    name: 'Sunderbans Seagrass Initiative',
    location: 'West Bengal, India',
    area: '300 Hectares',
    status: 'Pending',
  },
  {
    name: 'Mekong Delta Reforestation',
    location: 'Soc Trang, Vietnam',
    area: '50 Hectares',
    status: 'Verified',
  },
  {
    name: 'Borneo Peatland Rewetting',
    location: 'Kalimantan, Indonesia',
    area: '500 Hectares',
    status: 'Rejected',
  },
  {
    name: 'Pacific Atoll Coral Garden',
    location: 'Funafuti, Tuvalu',
    area: '20 Hectares',
    status: 'Pending',
  },
];

export default function NgoDashboardPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleAddProject = (newProjectData: Omit<Project, 'status'>) => {
    const newProject: Project = {
      ...newProjectData,
      name: newProjectData.name,
      status: 'Pending',
    };
    setProjects(prevProjects => [newProject, ...prevProjects]);
  };


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">NGO Dashboard</h1>
          <p className="text-muted-foreground">An overview of your organization's projects and impact.</p>
        </div>
        <div className="flex items-center space-x-2">
          <SubmitProjectModal onProjectSubmit={handleAddProject}>
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Submit New Project
            </Button>
          </SubmitProjectModal>
        </div>
      </div>
      <StatCards />
      <ProjectsTable projects={projects} />
    </div>
  );
}
