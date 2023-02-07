import { createTRPCRouter, protectedProcedure } from '../trpc';
import { organizationCreateSchema, organizationUpdateSchema } from '../../../schemas';
import { TRPCError } from '@trpc/server';
import { accessibleBy } from '@casl/prisma';
import { z } from 'zod';
import { subject } from '@casl/ability';



const ORGANIZATION_DEFAULT_COLOR = '#2b6cb0';



export const organizationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(organizationCreateSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.ability.can('create', 'Organization')) {
        return await ctx.prisma.organization.create({
          data: {
            ...input,
            color: ORGANIZATION_DEFAULT_COLOR,
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
  update: protectedProcedure
    .input(organizationUpdateSchema)
    .mutation( async ({ ctx, input }) => {
      const organization = await ctx.prisma.organization.findUnique({
        where: {
          id: input.id,
        },
        include: {
          users: true,
        },
      });

      if (organization == null || ctx.ability.can('update', subject('Organization', organization)) == false) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      await ctx.prisma.organization.update({
        where: {
          id: input.id,
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
      const organization = await ctx.prisma.organization.findUnique({
        where: {
          id: input,
        },
        include: {
          users: true,
        },
      });

      if (organization == null || ctx.ability.can('delete', subject('Organization', organization)) == false) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      await ctx.prisma.$transaction([
        ctx.prisma.userOnOrganization.deleteMany({
          where: {
            organizationId: organization.id,
          },
        }),
        ctx.prisma.organization.delete({
          where: {
            id: organization.id,
          },
        }),
      ]);
    }),
});

