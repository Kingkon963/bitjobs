import { prisma } from "src/server/db";
import * as z from "zod";

import {
  createTRPCRouter,
  protectedEmployerProcedure,
  protectedJobseekerProcedure,
} from "../trpc";
import { TRPCError } from "@trpc/server";
import { workExpDialogFormSchema } from "@components/jobseeker/profile/EditWorkExperienceDialog";

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
        data: workExpDialogFormSchema,
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
