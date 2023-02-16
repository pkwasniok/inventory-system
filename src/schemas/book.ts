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



const BookIdSchema = z.string().uuid();
const BookNameSchema = z.string().min(3);
const BookDescriptionSchema = z.string().default('');
const BookColorSchema = z.string().default('000000');



export const BookCreateSchema = z.object({
  name: BookNameSchema,
  description: BookDescriptionSchema,
  color: BookColorSchema,
});
export type BookCreateInput = z.infer<typeof BookCreateSchema>;



export const BookUpdateSchema = z.object({
  id: BookIdSchema,
  name: BookNameSchema.optional(),
  description: BookDescriptionSchema.optional(),
  color: BookColorSchema.optional(),
});
export type BookUpdateInput = z.infer<typeof BookUpdateSchema>;



export const BookDeleteSchema = z.object({
  id: BookIdSchema,
});
export type BookDeleteInput = z.infer<typeof BookDeleteSchema>;
