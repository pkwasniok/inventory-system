import { z } from 'zod';



// type User = {
//   id: string;
//   name?: string;
//   email?: string;
//   emailVerified?: Date;
//   password?: string;
// }



export const UserRegisterSchema = z.object({
  name: z.string().min(3),
  email: z.string(),
  password: z.string().min(3),
});
export type UserRegisterInput = z.infer<typeof UserRegisterSchema>;



export const UserLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export type UserLoginInput = z.infer<typeof UserLoginSchema>;



export const UserUpdateSchema = z.object({
  name: z.string().min(3),
});
export type UserUpdateInput = z.infer<typeof UserUpdateSchema>;



export const UserPasswordUpdateSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});
export type UserPasswordUpdateInput = z.infer<typeof UserPasswordUpdateSchema>;
