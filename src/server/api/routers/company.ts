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
  save: protectedEmployerProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        location: z.string().optional(),
        imageUrl: z.string().optional(),
        userId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id) {
        // update
        const company = await ctx.prisma.company.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            location: input.location,
            imageUrl: input.imageUrl,
          },
        });
        return company;
      }

      if(input.userId) {
        // create
        if(!input.name || !input.location) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Missing name or location",
          });
        }
        
        const company = await ctx.prisma.company.create({
          data: {
            name: input.name,
            location: input.location,
            imageUrl: input.imageUrl,
            userId: ctx.session.user.id,
          },
        });
        return company;
      }

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Missing id or userId",
      });

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
