import { prisma } from "src/server/db";
import * as z from "zod";

import {
  createTRPCRouter,
  protectedEmployerProcedure,
  protectedJobseekerProcedure,
} from "../trpc";
import { TRPCError } from "@trpc/server";
import { workExpDialogFormSchema } from "@components/jobseeker/profile/EditWorkExperienceDialog";
import { educationDialogSchema } from "@components/jobseeker/profile/EditEducationDialog";

export const jobSeekerProfileRouter = createTRPCRouter({
  getJobseekerProfile: protectedJobseekerProcedure.query(async ({ ctx }) => {
    const jobseeker = await prisma.jobseekerProfile.findUnique({
      where: { userId: ctx.session.user.id },
      include: {
        workExperience: {
          orderBy: { startDate: "desc" },
        },
      },
    });

    return jobseeker;
  }),

  saveWorkExperience: protectedJobseekerProcedure
    .input(
      z.object({
        id: z.string().optional(),
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

      if (input.id) {
        // update
        const workExperience = await prisma.workExperience.update({
          where: { id: input.id },
          data: {
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
      }

      // create
      const workExperience = await prisma.workExperience.create({
        data: {
          profileId: input.profileId,
          ...input.data
        },
      });

      return workExperience;
    }),

  deleteWorkExperience: protectedJobseekerProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const workExperience = await prisma.workExperience.delete({
        where: { id: input.id },
      });

      return workExperience;
    }),

  getEducations: protectedJobseekerProcedure.query(async ({ ctx }) => {
    const jobseeker = await prisma.jobseekerProfile.findUnique({
      where: { userId: ctx.session.user.id },
      include: {
        education: true,
      },
    });

    return jobseeker?.education;
  }),

  saveEducation: protectedJobseekerProcedure
    .input(
      z.object({
        id: z.string().optional(),
        profileId: z.string(),
        data: educationDialogSchema,
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

      if (input.id) {
        // update
        const education = await prisma.education.update({
          where: { id: input.id },
          data: {
            school: input.data.school,
            degree: input.data.degree,
            fieldOfStudy: input.data.fieldOfStudy,
            description: input.data.description,
            startDate: input.data.startDate,
            endDate: input.data.endDate,
          },
        });

        return education;
      }

      // create
      const education = await prisma.education.create({
        data: {
          profileId: input.profileId,
          ...input.data
        },
      });

      return education;
    }),

  deleteEducation: protectedJobseekerProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const education = await prisma.education.delete({
        where: { id: input.id },
      });

      return education;
    }),
});
