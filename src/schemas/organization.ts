import { z } from 'zod';



// type Organization = {
//   id: string; <- auto
//   name: string;
//   description: string;
//   color: string;
//   createdAt: string; <- auto
//   updatedAt: string; <- auto
// }



const OrganizationSchema = z.object({
  name: z.string().min(3),
  description: z.string().default(""),
  color: z.string().default("000000"),
});



export const OrganizationCreateSchema = OrganizationSchema;
export type OrganizationCreateInput = z.infer<typeof OrganizationCreateSchema>;



export const OrganizationUpdateSchema = z.object({
  id: z.string().uuid(),
}).merge(OrganizationSchema);
export type OrganizationUpdateInput = z.infer<typeof OrganizationUpdateSchema>;
