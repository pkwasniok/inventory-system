import { createTRPCRouter, publicProcedure } from "../trpc";
import { registerSchema } from '../../../utils/schemas';
import { TRPCError } from "@trpc/server";



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
        data: input,
      });
    }),
});
