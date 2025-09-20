'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud } from 'lucide-react';
import type { Project } from './projects-table';


const formSchema = z.object({
  name: z.string().min(5, 'Project name is too short'),
  description: z.string().min(20, 'Description should be at least 20 characters'),
  category: z.string({ required_error: 'Please select a project category.' }),
  location: z.string().min(3, 'Location is required'),
  area: z.string().min(1, 'Area is required (e.g., 150 Hectares)'),
  evidenceFile: z
    .any()
    .refine((files) => files?.length === 1, 'Evidence document is required.')
    .refine((files) => files?.[0]?.size <= 5000000, `Max file size is 5MB.`),
});

type SubmitProjectModalProps = {
  children: React.ReactNode;
  onProjectSubmit: (project: Omit<Project, 'status'>) => void;
};

export function SubmitProjectModal({ children, onProjectSubmit }: SubmitProjectModalProps) {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      location: '',
      area: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onProjectSubmit({
        name: values.name,
        location: values.location,
        area: values.area,
    });
    toast({
      title: 'Project Submitted!',
      description: 'Your project is now pending review.',
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Submit New Project</DialogTitle>
          <DialogDescription>
            Fill out the details below to submit your project for verification.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Coastal Mangrove Reforestation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the project goals, methods, and expected outcomes." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Krabi, Thailand" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 150 Hectares" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="reforestation">Reforestation</SelectItem>
                        <SelectItem value="conservation">Conservation</SelectItem>
                        <SelectItem value="rewetting">Rewetting</SelectItem>
                        <SelectItem value="seagrass">Seagrass Restoration</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="evidenceFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evidence Document</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <UploadCloud className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="file"
                        className="pl-10"
                        accept=".pdf,.jpg,.jpeg,.png,.docx"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Submit for Review
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
