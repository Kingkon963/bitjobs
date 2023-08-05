import { prisma } from "src/server/db";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedEmployerProcedure,
  protectedJobseekerProcedure,
} from "../trpc";
import { TRPCError } from "@trpc/server";
import { EmploymentType, type WorkExperience } from "@prisma/client";

export const jobSeekerProfileRouter = createTRPCRouter({
  getJobseekerProfile: protectedJobseekerProcedure.query(async ({ ctx }) => {
    const jobseeker = await prisma.jobseekerProfile.findUnique({
      where: { userId: ctx.session.user.id },
      include: {
        address: true,
        education: true,
        workExperience: true,
      },
    });

    return jobseeker;
  }),

  saveWorkExperience: protectedJobseekerProcedure
    .input(
      z.object({
        profileId: z.string(),
        data: z.object({
          title: z
            .string({
              required_error: "Title is required",
            })
            .min(4, {
              message: "Title must be at least 4 characters long",
            })
            .max(50),
          company: z
            .string({
              required_error: "Company name is required",
            })
            .min(2),
          city: z.string().optional(),
          country: z.string().optional(),
          companyWebsite: z.string().optional(),
          companyLinkedIn: z.string().optional(),
          employmentType: z.nativeEnum(EmploymentType),
          description: z.string().optional(),
          startDate: z.date({
            required_error: "Start date is required",
          }),
          endDate: z.date().optional(),
          skills: z.array(z.string()).optional(),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const jobseeker = await prisma.jobseekerProfile.findUnique({
        where: { userId: ctx.session.user.id },
      });

      if (!jobseeker) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Jobseeker profile not found",
        });
      }

      const workExperience = await prisma.workExperience.create({
        data: {
          profileId: input.profileId,
          title: input.data.title,
          company: input.data.company,
          city: input.data.city,
          country: input.data.country,
          companyWebsite: input.data.companyWebsite,
          companyLinkedIn: input.data.companyLinkedIn,
          employmentType: input.data.employmentType,
          description: input.data.description,
          startDate: input.data.startDate,
          endDate: input.data.endDate,
          skills: input.data.skills,
        },
      });

      return workExperience;
    }),

  deleteWorkExperience: protectedJobseekerProcedure.input(
    z.object({
      id: z.string(),
    })
  ).mutation(async ({ input }) => {
    const workExperience = await prisma.workExperience.delete({
      where: { id: input.id },
    });

    return workExperience;
  }),
});
