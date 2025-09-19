'use server';

import {
  adminAutoAssessProject,
  AdminAutoAssessProjectInput,
  AdminAutoAssessProjectOutput,
} from '@/ai/flows/admin-auto-assess-project';

export async function assessProjectAction(input: AdminAutoAssessProjectInput): Promise<AdminAutoAssessProjectOutput> {
  try {
    const result = await adminAutoAssessProject(input);
    return result;
  } catch (error) {
    console.error("Error in server action:", error);
    // In a real app, you might want to log this error to a monitoring service
    throw new Error("Failed to assess the project due to a server error.");
  }
}
