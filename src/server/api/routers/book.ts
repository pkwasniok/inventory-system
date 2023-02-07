import { createTRPCRouter, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';



export const bookRouter = createTRPCRouter({
  create: protectedProcedure
    .mutation(() => {}),
  update: protectedProcedure
    .mutation(() => {}),
  delete: protectedProcedure
    .mutation(() => {}),
  getById: protectedProcedure
    .query(() => {}),
  getByOrganization: protectedProcedure
    .query(() => {}),
});
