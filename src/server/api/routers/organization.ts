import { createTRPCRouter, protectedProcedure } from '../trpc';

import { OrganizationCreateSchema, OrganizationUpdateSchema } from '@/schemas/organization';

import { TRPCError } from '@trpc/server';

import { z } from 'zod';
import { accessibleBy } from '@casl/prisma';



const ORGANIZATIONS_LIMIT = 2;



export const organizationRouter = createTRPCRouter({

  create: protectedProcedure
    .input(OrganizationCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const organizationsCount = await ctx.prisma.organization.count({
        where: accessibleBy(ctx.userAbility).Organization,
      });

      if (organizationsCount >= ORGANIZATIONS_LIMIT) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

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
    }),

  update: protectedProcedure
    .input(OrganizationUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const organization = await ctx.prisma.organization.findFirst({
        where: {
          AND: [
            accessibleBy(ctx.userAbility).Organization,
            { id: input.id },
          ],
        },
      });

      if (organization == null) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      return await ctx.prisma.organization.update({
        where: {
          id: organization.id,
        },
        data: {
          ...input,
          id: undefined,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input }) => {
      const organization = await ctx.prisma.organization.findFirst({
        where: {
          AND: [
            accessibleBy(ctx.userAbility).Organization,
            { id: input },
          ],
        },
      });

      if (organization == null) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      await ctx.prisma.organization.delete({
        where: {
          id: organization.id,
        },
      });
    }),

  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.organization.findMany({
        where: accessibleBy(ctx.userAbility).Organization,
      });
    }),

  getById: protectedProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.organization.findFirst({
        where: {
          AND: [
            accessibleBy(ctx.userAbility).Organization,
            { id: input },
          ],
        },
      }) ?? undefined;
    }),

});
