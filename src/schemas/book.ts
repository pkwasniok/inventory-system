import { z } from 'zod';



// type Book = {
//   id: string; <- auto
//   organizationId: string;
//   name: string;
//   description: string;
//   color: string;
//   createdAt: Date; <- auto
//   updatedAt: Date; <- auto
// }



const BookSchema = z.object({
  name: z.string().min(3),
  description: z.string().default(''),
  color: z.string().default("000000"),
});



export const BookCreateSchema = BookSchema;
export type BookCreateInput = z.infer<typeof BookCreateSchema>;



export const BookUpdateSchema = z.object({
  id: z.string().uuid(),
}).merge(BookSchema);
export type BookUpdateInput = z.infer<typeof BookUpdateSchema>;
