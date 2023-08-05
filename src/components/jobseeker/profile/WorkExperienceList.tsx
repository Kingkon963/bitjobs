import React from "react";

import EditWorkExperienceDialog from "./EditWorkExperienceDialog";
import { DialogTrigger } from "@/components/ui/dialog";
import WorkExperienceCard from "./WorkExperienceCard";
import { api } from "@utils/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationIcon } from "@heroicons/react/solid";
import EmptyState from "@components/EmptyState";

function WorkExperienceList() {
  const getProfileQuery = api.jobSeekerProfile.getJobseekerProfile.useQuery();

  return (
    <div>
      <div className="flex flex-col gap-4">
        {getProfileQuery.isLoading && (
          <Skeleton className="h-[200px] w-full bg-neutral-300" />
        )}
        {getProfileQuery.isError && (
          <>
            <Alert>
              <ExclamationIcon className="mr-2 h-5 w-5 text-yellow-500" />
              <AlertTitle>We are sorry!</AlertTitle>
              <AlertDescription>
                Failed to load work experiences. <br />
                {getProfileQuery.error.message}
              </AlertDescription>
            </Alert>
          </>
        )}
        {getProfileQuery.isSuccess &&
          (!getProfileQuery.data ||
            !Array.isArray(getProfileQuery.data?.workExperience) ||
            getProfileQuery?.data?.workExperience.length === 0) && (
            <>
              <EmptyState title="Found nothing here" hideBtn={true} />
            </>
          )}

        {/* <WorkExperienceCard />
        <WorkExperienceCard />
        <WorkExperienceCard /> */}
      </div>
    </div>
  );
}

export default WorkExperienceList;
