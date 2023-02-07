import { z } from 'zod';



export const organizationIdSchema = z.string().uuid();
export type OrganizationId = z.infer<typeof organizationIdSchema>;



export const organizationCreateSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
});
export type OrganizationCreateInput = z.infer<typeof organizationCreateSchema>;



export const organizationUpdateSchema = z.object({
  id: organizationIdSchema,
  name: z.string().min(3),
  description: z.string().optional(),
});
export type OrganizationUpdateInput = z.infer<typeof organizationUpdateSchema>;
