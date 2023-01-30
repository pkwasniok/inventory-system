import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { registerSchema, userUpdateSchema } from '@/utils/schemas';
import { TRPCError } from '@trpc/server';
import { hashPassword } from '@/server/password';



export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (user != null) {
        throw new TRPCError({ code: 'CONFLICT' });
      }

      await ctx.prisma.user.create({
        data: {
          ...input,
          password: hashPassword(input.password),
        },
      });
    }),
  get: protectedProcedure
    .query(({ ctx }) => {
      return ctx.user;
    }),
  update: protectedProcedure
    .input(userUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          ...input,
        },
      });
    }),
});
