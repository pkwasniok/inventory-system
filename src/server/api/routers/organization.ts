import { createTRPCRouter, protectedProcedure } from '../trpc';
import { organizationCreateSchema } from '../../../utils/schemas';
import { TRPCError } from '@trpc/server';
import { accessibleBy } from '@casl/prisma';



export const organizationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(organizationCreateSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.ability.can('create', 'Organization')) {
        await ctx.prisma.organization.create({
          data: {
            ...input,
            users: {
              create: {
                userId: ctx.user.id,
              },
            },
          },
        });
      } else {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
    }),
  get: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.organization.findMany({
        where: accessibleBy(ctx.ability).Organization,
      });
    })
});

