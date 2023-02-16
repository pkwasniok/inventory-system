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



const RoomIdSchema = z.string().uuid();
const RoomNameSchema = z.string().min(3);
const RoomDescriptionSchema = z.string().default('');
const RoomColorSchema = z.string().default('000000');



export const RoomCreateSchema = z.object({
  name: RoomNameSchema,
  description: RoomDescriptionSchema,
  color: RoomColorSchema,
});
export type RoomCreateInput = z.infer<typeof RoomCreateSchema>;



export const RoomUpdateSchema = z.object({
  id: RoomIdSchema,
  name: RoomNameSchema.optional(),
  description: RoomDescriptionSchema.optional(),
  color: RoomColorSchema.optional(),
});
export type RoomUpdateSchema = z.infer<typeof RoomUpdateSchema>;



export const RoomDeleteSchema = z.object({
  id: RoomIdSchema,
});
export type RoomDeleteInput = z.infer<typeof RoomDeleteSchema>;
