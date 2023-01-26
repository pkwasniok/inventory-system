import { createTRPCRouter, protectedProcedure } from '../trpc';
import { organizationCreateSchema } from '../../../utils/schemas';
import { TRPCError } from '@trpc/server';



export const organizationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(organizationCreateSchema)
    .mutation(({ ctx, input }) => {
      return
    }),
});

