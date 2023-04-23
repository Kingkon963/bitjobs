import { prisma } from "src/server/db";
import { z } from "zod";

import { createTRPCRouter, protectedEmployerProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const jobRouter = createTRPCRouter({
  createJob: protectedEmployerProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const company = await prisma.company.findUnique({
        where: { userId: ctx.session.user.id },
      });

      if (!company) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You must have a company to create a job",
        });
      }

      const job = await prisma.job.create({
        data: {
          title: input.title,
          description: input.description,
          company: {
            connect: {
              id: company.id,
            },
          },
        },
      });

      return job;
    }),

  getJobForEdit: protectedEmployerProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const job = await prisma.job.findUnique({
        where: { id: input },
        include: {
          company: {
            select: {
              userId: true,
            },
          },
          location: true,
        },
      });

      if (!job) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Job not found" });
      }

      if (job.company.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Not your job" });
      }

      return job;
    }),

  updateJob: protectedEmployerProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        addressId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const job = await prisma.job.findUnique({
        where: { id: input.id },
        include: {
          company: {
            select: {
              userId: true,
            },
          },
        },
      });

      if (!job) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Job not found" });
      }

      if (job.company.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Not your job" });
      }

      const updatedJob = await prisma.job.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          addressId: input.addressId,
        },
      });

      return updatedJob;
    }),
});
