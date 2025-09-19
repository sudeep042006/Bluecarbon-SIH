import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

const projects = [
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

const statusStyles = {
  Verified: {
    icon: <CheckCircle2 className="text-green-500" />,
    badgeClass: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300',
  },
  Pending: {
    icon: <Clock className="text-yellow-500" />,
    badgeClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-400',
  },
  Rejected: {
    icon: <XCircle className="text-red-500" />,
    badgeClass: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-400',
  },
};

export function ProjectsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Your Projects</CardTitle>
        <CardDescription>A list of all projects submitted by your organization.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden sm:table-cell">Area</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => {
              const statusInfo = statusStyles[project.status as keyof typeof statusStyles];
              return (
                <TableRow key={project.name}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{project.location}</TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">{project.area}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className={cn('flex items-center justify-center gap-2 w-[110px]', statusInfo.badgeClass)}>
                      {statusInfo.icon}
                      {project.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
