import { z } from 'zod';



export const bookIdSchema = z.string().uuid();
export type BookId = z.infer<typeof bookIdSchema>;



export const bookCreateSchema = z.object({
  name: z.string().min(3),
  description: z.string().default(''),
});
export type BookCreateInput = z.infer<typeof bookCreateSchema>;



export const bookUpdateSchema = z.object({
  id: bookIdSchema,
  name: z.string().min(3),
  description: z.string().default(''),
});
export type BookUpdateInput = z.infer<typeof bookUpdateSchema>;
