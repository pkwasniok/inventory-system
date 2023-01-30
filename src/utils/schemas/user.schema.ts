import { z } from 'zod';



export const userUpdateSchema = z.object({
  name: z.string().min(3),
});

export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
