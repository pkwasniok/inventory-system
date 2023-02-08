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

    }),
  update: protectedProcedure
    .input(z.object({
      organizationId: z.string().uuid(),
      books: z.array(BookUpdateSchema),
    }))
    .mutation(async ({ ctx, input }) => {

    }),
  getByOrganization: protectedProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input }) => {
      return [];
    }),
});

