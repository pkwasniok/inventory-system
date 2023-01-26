import { createTRPCRouter, protectedProcedure } from '../trpc';
import { organizationCreateSchema } from '../../../utils/schemas';
import { TRPCError } from '@trpc/server';
import { accessibleBy } from '@casl/prisma';
import { z } from 'zod';



export const organizationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(organizationCreateSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.ability.can('create', 'Organization')) {
        return await ctx.prisma.organization.create({
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
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.organization.findMany({
        where: accessibleBy(ctx.ability).Organization,
      });
    }),
  getById: protectedProcedure
    .input(z.string().uuid().nullish())
    .query(async ({ ctx, input }) => {
      if (input == undefined || input == null) {
        return null;
      }

      return await ctx.prisma.organization.findFirst({
        where: {
          AND: [
            accessibleBy(ctx.ability).Organization,
            { id: input },
          ],
        },
      });
    }),
});

