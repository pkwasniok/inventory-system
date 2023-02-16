import { createTRPCRouter, protectedProcedure } from '../trpc';

import { TRPCError } from '@trpc/server';

import { accessibleBy } from '@casl/prisma';

import { z } from 'zod';

import { RoomCreateSchema, RoomUpdateSchema } from '@/schemas/room';



export const roomRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({
      organizationId: z.string().uuid(),
      rooms: z.array(RoomCreateSchema),
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

      return await ctx.prisma.room.createMany({
        data: input.rooms.map((room) => ({
          organizationId: organization.id,
          ...room,
        })),
      });
    }),

  update: protectedProcedure
    .input(z.object({
      organizationId: z.string().uuid(),
      rooms: z.array(RoomUpdateSchema),
    }))
    .mutation(async ({ ctx, input }) => {
      const rooms = await ctx.prisma.room.findMany({
        where: {
          AND: [
            { organization: accessibleBy(ctx.userAbility).Organization },
            { organizationId: input.organizationId },
          ],
        },
      });

      // check if rooms belong to organization
      const roomsId = rooms.map((room) => room.id);
      if (input.rooms.some((room) => !roomsId.includes(room.id))) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      await ctx.prisma.$transaction(input.rooms.map((room) => ctx.prisma.room.update({
        where: {
          id: room.id,
        },
        data: {
          ...room,
          id: undefined,
        },
      })));
    }),

  delete: protectedProcedure
    .input(z.object({
      organizationId: z.string().uuid(),
      rooms: z.array(z.string().uuid()),
    }))
    .mutation(async ({ ctx, input }) => {
      const rooms = await ctx.prisma.room.findMany({
        where: {
          AND: [
            { organization: accessibleBy(ctx.userAbility).Organization },
            { organizationId: input.organizationId },
          ],
        },
      });

      // check if rooms belong to organization
      const roomsId = rooms.map((room) => room.id);
      if (input.rooms.some((roomId) => !roomsId.includes(roomId))) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      await ctx.prisma.$transaction(input.rooms.map((roomId) => ctx.prisma.room.delete({
        where: {
          id: roomId,
        },
      })));
    }),

  getByOrganization: protectedProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.room.findMany({
        where: {
          AND: [
            { organization: accessibleBy(ctx.userAbility).Organization },
            { organizationId: input },
          ],
        },
      });
    }),

});
