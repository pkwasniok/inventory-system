import { z } from 'zod';



export const organizationCreateSchema = z.object({
  name: z.string().min(3),
});

export type OrganizationCreateInput = z.infer<typeof organizationCreateSchema>;
