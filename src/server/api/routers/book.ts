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
            accessibleBy(ctx.userAbility).Organization,
            { id: input.organizationId },
          ],
        },
      });

      if (organization == null) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      await ctx.prisma.book.createMany({
        data: input.books.map((book) => ({ organizationId: organization.id, ...book })),
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
            { organization: accessibleBy(ctx.userAbility).Organization },
            { organizationId: input.organizationId },
          ],
        },
        select: {
          id: true,
        },
      });

      // check if input books belong to organization
      const booksId = books.map((book) => book.id);
      if (input.books.some((book) => !booksId.includes(book.id))) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      await ctx.prisma.$transaction(input.books.map((book) => ctx.prisma.book.update({
        where: {
          id: book.id,
        },
        data: {
          ...book,
          id: undefined,
        }
      })));
    }),

  delete: protectedProcedure
    .input(z.object({
      organizationId: z.string().uuid(),
      books: z.array(z.string().uuid()),
    }))
    .mutation(async ({ ctx, input }) => {
      const books = await ctx.prisma.book.findMany({
        where: {
          AND: [
            { organization: accessibleBy(ctx.userAbility).Organization },
            { organizationId: input.organizationId },
          ],
        },
        select: {
          id: true,
        },
      });

      // check if input books belong to organization
      const booksId = books.map((book) => book.id);
      if (input.books.some((bookId) => !booksId.includes(bookId))) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      await ctx.prisma.$transaction(input.books.map((bookId) => ctx.prisma.book.delete({
        where: {
          id: bookId,
        },
      })));
    }),

  getByOrganization: protectedProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input }) => {
      const organization = await ctx.prisma.organization.findFirst({
        where: {
          AND: [
            accessibleBy(ctx.userAbility).Organization,
            { id: input },
          ],
        },
      });

      if (organization == null) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return await ctx.prisma.book.findMany({
        where: {
          organizationId: organization.id,
        },
      });
    }),

});

