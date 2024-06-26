import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { companyRouter } from "./routers/company";
import { jobRouter } from "./routers/job";
import { addressRouter } from "./routers/address";
import { jobSeekerProfileRouter } from "./routers/jobseekerProfile";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  company: companyRouter,
  job: jobRouter,
  address: addressRouter,
  jobSeekerProfile: jobSeekerProfileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
