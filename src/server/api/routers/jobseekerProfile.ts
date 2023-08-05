import { prisma } from "src/server/db";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedEmployerProcedure,
  protectedJobseekerProcedure,
} from "../trpc";
import { TRPCError } from "@trpc/server";
import { EmploymentType, JobStatus } from "@prisma/client";

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
    console.log("🚀 ~ file: jobseekerProfile.ts:22 ~ getJobseekerProfile:protectedJobseekerProcedure.query ~ jobseeker:", jobseeker)

    return jobseeker;
  }),
});
