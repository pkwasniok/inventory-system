import { createTRPCRouter, protectedProcedure } from '../trpc';

import { BookCreateSchema, BookUpdateSchema } from '@/schemas/book';

import { TRPCError } from '@trpc/server';

import { accessibleBy } from '@casl/prisma';

import { z } from 'zod';

import { subject } from '@casl/ability';



export const bookRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      organizationId: z.string().uuid(),
      books: z.array(BookCreateSchema),
    }))
    .mutation(async ({ ctx, input }) => {
      const organization = await ctx.prisma.organization.findUnique({
        where: {
          id: input.organizationId,
        },
        include: {
          users: true,
        },
      });

      if (organization == null || ctx.defineAbility(ctx.user, organization).cannot('create', 'Book')) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      await ctx.prisma.book.createMany({
        data: input.books.map((book) => ({
          organizationId: organization.id,
          ...book,
        })),
      });
    }),
  update: protectedProcedure
    .input(z.object({
      organizationId: z.string().uuid(),
      books: z.array(BookUpdateSchema),
    }))
    .mutation(({ ctx, input }) => {

    }),
});

