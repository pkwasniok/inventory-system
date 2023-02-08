import { createTRPCRouter, protectedProcedure } from '../trpc';

import { OrganizationCreateSchema, OrganizationUpdateSchema } from '@/schemas/organization';

import { TRPCError } from '@trpc/server';

import { z } from 'zod';



const ORGANIZATIONS_LIMIT = 10;



export const organizationRouter = createTRPCRouter({

  create: protectedProcedure
    .input(OrganizationCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const organizationsCount = await ctx.prisma.organization.count({
        where: {
          users: {
            some: {
              userId: ctx.user.id,
            },
          },
        },
      });

      if (organizationsCount >= ORGANIZATIONS_LIMIT) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
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
          users: {
            some: {
              userId: ctx.user.id,
            },
          },
          id: input.id,
        },
      });

      if (organization == null) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return await ctx.prisma.organization.update({
        where: {
          id: organization.id,
        },
        data: {
          ...input,
          id: undefined,
        }
      });
    }),

  delete: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input }) => {

    }),

  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.organization.findMany({
        where: {
          users: {
            some: {
              userId: ctx.user.id,
            },
          },
        },
      });
    }),

  getById: protectedProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.organization.findFirst({
        where: {
          users: {
            some: {
              userId: ctx.user.id,
            },
          },
          id: input,
        },
      }) ?? undefined;
    }),

});
