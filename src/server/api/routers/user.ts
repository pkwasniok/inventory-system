import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { UserRegisterSchema, UserUpdateSchema, UserPasswordUpdateSchema } from '@/schemas/user';
import { TRPCError } from '@trpc/server';
import { comparePassword, hashPassword } from '@/server/password';



export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(UserRegisterSchema)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
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
    .input(UserUpdateSchema)
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
  changePassword: protectedProcedure
    .input(UserPasswordUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      if(comparePassword(input.currentPassword, ctx.user.password) == false) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      await ctx.prisma.user.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          password: hashPassword(input.newPassword),
        },
      });
    }),
});
