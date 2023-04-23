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
        city: z.string(),
        postcode: z.string(),
        country: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.address.create({ data: input });
    }),
});
