import { z } from 'zod';



export const userUpdateSchema = z.object({
  name: z.string().min(3),
});

export type UserUpdateInput = z.infer<typeof userUpdateSchema>;



export const userPasswordChangeSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});

export type UserPasswordChangeInput = z.infer<typeof userPasswordChangeSchema>;
