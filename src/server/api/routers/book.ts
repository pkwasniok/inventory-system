import { createTRPCRouter, protectedProcedure } from '../trpc';
import { bookCreateSchema, bookUpdateSchema, organizationIdSchema }  from '@/schemas';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';



const BOOKS_LIMIT = 100;



export const bookRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      organizationId: organizationIdSchema,
      books: z.array(bookCreateSchema),
    }))
    .mutation(async ({ ctx, input }) => {
      const booksCount = await ctx.prisma.book.count({
        where: {
          id: input.organizationId,
        },
      });

      if (booksCount < BOOKS_LIMIT) {
        await ctx.prisma.book.createMany({
          data: [],
        });
      }
    }),
  update: protectedProcedure
    .input(bookUpdateSchema)
    .mutation(({ ctx, input }) => {

    }),
  delete: protectedProcedure
    .mutation(() => {}),
  getById: protectedProcedure
    .query(() => {}),
  getByOrganization: protectedProcedure
    .query(() => {}),
});
