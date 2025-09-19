// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview AI-powered environmental project assessment and pre-verification flow.
 *
 * - adminAutoAssessProject - Function to assess and pre-verify environmental projects.
 * - AdminAutoAssessProjectInput - Input type for the adminAutoAssessProject function.
 * - AdminAutoAssessProjectOutput - Return type for the adminAutoAssessProject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the project assessment
const AdminAutoAssessProjectInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('Detailed description of the environmental project.'),
  evidenceDocument: z
    .string()
    .describe(
      'Evidence document as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // using data URI
    ),
  projectCategory: z
    .string()
    .describe(
      'Category of the environmental project (e.g., reforestation, conservation).' // example categories
    ),
  expectedImpact: z
    .string()
    .describe('Expected environmental impact of the project.'),
});
export type AdminAutoAssessProjectInput = z.infer<
  typeof AdminAutoAssessProjectInputSchema
>;

// Define the output schema for the project assessment result
const AdminAutoAssessProjectOutputSchema = z.object({
  verificationStatus: z
    .string()
    .describe(
      'AI assessment of the project verification status (e.g., approved, rejected, needs clarification).' // example states
    ),
  assessmentSummary: z
    .string()
    .describe('Summary of the AI assessment, including key findings.'),
  suggestedActions: z
    .string()
    .describe('Suggested actions for the administrator (e.g., request more evidence, approve project).'),
});
export type AdminAutoAssessProjectOutput = z.infer<
  typeof AdminAutoAssessProjectOutputSchema
>;

// Exported function to initiate the project assessment
export async function adminAutoAssessProject(
  input: AdminAutoAssessProjectInput
): Promise<AdminAutoAssessProjectOutput> {
  return adminAutoAssessProjectFlow(input);
}

// Define the prompt for the AI assessment
const projectAssessmentPrompt = ai.definePrompt({
  name: 'projectAssessmentPrompt',
  input: {schema: AdminAutoAssessProjectInputSchema},
  output: {schema: AdminAutoAssessProjectOutputSchema},
  prompt: `You are an AI assistant designed to assess environmental projects for pre-verification.
  Review the project details and attached evidence to determine the verification status.

  Project Category: {{{projectCategory}}}
  Project Description: {{{projectDescription}}}
  Expected Impact: {{{expectedImpact}}}
  Evidence Document: {{media url=evidenceDocument}}

  Based on the provided information, provide a verification status, a summary of your assessment,
  and suggest actions for the administrator.
  Ensure that the assessment summary highlights key findings from the evidence document and project details.
`,
});

// Define the Genkit flow for the project assessment
const adminAutoAssessProjectFlow = ai.defineFlow(
  {
    name: 'adminAutoAssessProjectFlow',
    inputSchema: AdminAutoAssessProjectInputSchema,
    outputSchema: AdminAutoAssessProjectOutputSchema,
  },
  async input => {
    const {output} = await projectAssessmentPrompt(input);
    return output!;
  }
);
