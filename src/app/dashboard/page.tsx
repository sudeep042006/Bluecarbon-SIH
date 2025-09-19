import { StatCards } from '@/components/dashboard/stat-cards';
import { ProjectsTable } from '@/components/dashboard/projects-table';
import { SubmitProjectModal } from '@/components/dashboard/submit-project-modal';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function NgoDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">NGO Dashboard</h1>
          <p className="text-muted-foreground">An overview of your organization's projects and impact.</p>
        </div>
        <div className="flex items-center space-x-2">
          <SubmitProjectModal>
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Submit New Project
            </Button>
          </SubmitProjectModal>
        </div>
      </div>
      <StatCards />
      <ProjectsTable />
    </div>
  );
}
