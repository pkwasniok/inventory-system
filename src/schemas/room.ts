import { z } from 'zod';



// type Room = {
//   id: string; <- auto
//   organizationId: string;
//   name: string;
//   description: string;
//   color: string;
//   createdAt: Date; <- auto
//   updatedAt: Date; <- auto
// }



const RoomSchema = z.object({
  name: z.string().min(3),
  description: z.string().default(''),
  color: z.string().default("000000"),
});



export const RoomCreateSchema = RoomSchema;
export type RoomCreateInput = z.infer<typeof RoomCreateSchema>;


export const RoomUpdateSchema = z.object({
  id: z.string().uuid(),
}).merge(RoomSchema);
export type RoomUpdateSchema = z.infer<typeof RoomUpdateSchema>;
