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
      const organization = await ctx.prisma.organization.findFirst({
        where: {
          AND: [
            { id: input.organizationId },
            accessibleBy(ctx.defineAbility(ctx.user)).Organization,
          ],
        },
      });

    }),
  update: protectedProcedure
    .input(z.object({
      organizationId: z.string().uuid(),
      books: z.array(BookUpdateSchema),
    }))
    .mutation(async ({ ctx, input }) => {
      const books = await ctx.prisma.book.findMany({
        where: {
          AND: [
            accessibleBy(ctx.defineAbility(ctx.user)).Book,
            { id: { in: input.books.map((book) => book.id) } }
          ]
        },
        include: {
          organization: {
            select: {
              users: true,
            }
          },
        }
      });

      console.log(books);
    }),
  getByOrganization: protectedProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.book.findMany({
        where: {
          AND: [
            { organizationId: input },
            accessibleBy(ctx.defineAbility(ctx.user)).Book,
          ],
        },
      });
    }),
});

