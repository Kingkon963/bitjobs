import { prisma } from "src/server/db";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  protectedEmployerProcedure,
} from "../trpc";
import { TRPCError } from "@trpc/server";

export const companyRouter = createTRPCRouter({
  create: protectedEmployerProcedure
    .input(
      z.object({
        name: z.string(),
        location: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const company = await ctx.prisma.company.create({
        data: {
          name: input.name,
          location: input.location,
          userId: ctx.session.user.id,
        },
      });
      return company;
    }),

  get: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const company = await ctx.prisma.company.findUnique({
        where: {
          userId: input.userId,
        },
      });
      if (!company) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Company not found",
        });
      }

      return company;
    }),
});
