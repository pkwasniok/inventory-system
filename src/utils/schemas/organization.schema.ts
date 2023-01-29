import { z } from 'zod';



export const organizationCreateSchema = z.object({
  name: z.string().min(3),
});

export type OrganizationCreateInput = z.infer<typeof organizationCreateSchema>;



export const organizationUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
});

export type OrganizationUpdateInput = z.infer<typeof organizationUpdateSchema>;
