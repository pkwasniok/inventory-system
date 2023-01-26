import { createTRPCRouter, protectedProcedure } from '../trpc';
import { organizationCreateSchema } from '../../../utils/schemas';



export const organizationRouter = createTRPCRouter({
  create: protectedProcedure
    .mutation(({ ctx }) => {
      console.log(ctx.ability.can('create', 'Organization'));

      return 'Hello, I am under water';
    }),
});

