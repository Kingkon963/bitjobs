import { prisma } from "src/server/db";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const addressRouter = createTRPCRouter({
  createAddress: publicProcedure
    .input(
      z.object({
        line1: z.string(),
        line2: z.string().optional(),
        line3: z.string().optional(),
        borough: z.string().array(),
        postcode: z.string().array(),
        postTown: z.string().array(),
      })
    )
    .mutation(({ input }) => {
      return prisma.address.create({ data: input });
    }),

  getLondonAddresses: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        limit: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      if (input.query) {
        return await prisma.londonAddress.findMany({
          ...(input.limit && { take: input.limit }),
          where: {
            OR: [
              {
                location: {
                  contains: input.query,
                  mode: "insensitive",
                },
              },
              {
                postcode: {
                  has: input.query,
                  // mode: "insensitive",
                },
              },
              {
                postTown: {
                  has: input.query,
                },
              },
            ],
          },
        });
      }

      if (input.limit)
        return await prisma.londonAddress.findMany({
          take: input.limit,
        });
      else return await prisma.londonAddress.findMany();
    }),
});
