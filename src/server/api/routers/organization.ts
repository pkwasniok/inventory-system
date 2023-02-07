import { createTRPCRouter, protectedProcedure } from '../trpc';
import { OrganizationCreateSchema, OrganizationUpdateSchema } from '@/schemas/organization';
import { TRPCError } from '@trpc/server';
import { accessibleBy } from '@casl/prisma';
import { z } from 'zod';
import { subject } from '@casl/ability';



export const organizationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(OrganizationCreateSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.defineAbility(ctx.user).cannot('create', 'Organization')) {
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
      const organization = await ctx.prisma.organization.findUnique({
        where: {
          id: input.id,
        },
      });

      if (organization == null || ctx.defineAbility(ctx.user).cannot('update', subject('Organization', organization))) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      return await ctx.prisma.organization.update({
        where: {
          id: organization.id,
        },
        data: input,
      });
    }),
  delete: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input }) => {
      const organization = await ctx.prisma.organization.findUnique({
        where: {
          id: input,
        },
      });

      if (organization == null || ctx.defineAbility(ctx.user).cannot('delete', subject('Organization', organization))) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      return await ctx.prisma.organization.delete({
        where: {
          id: organization.id,
        },
      });
    }),
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.organization.findMany({
        where: accessibleBy(ctx.defineAbility(ctx.user)).Organization,
      });
    }),
  getById: protectedProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.organization.findFirst({
        where: {
          AND: [
            accessibleBy(ctx.defineAbility(ctx.user)).Organization,
            { id: input },
          ],
        },
      }) ?? undefined;
    }),
});
