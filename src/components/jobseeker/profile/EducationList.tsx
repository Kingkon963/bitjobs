import React from "react";

import WorkExperienceCard from "./WorkExperienceCard";
import { api } from "@utils/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationIcon } from "@heroicons/react/solid";
import EmptyState from "@components/EmptyState";
import EducationCard from "./EducationCard";

function EducationList() {
  const getEducationsQuery = api.jobSeekerProfile.getEducations.useQuery();

  return (
    <div>
      <div className="flex flex-col gap-4">
        {getEducationsQuery.isLoading && (
          <Skeleton className="h-[200px] w-full bg-neutral-300" />
        )}
        {getEducationsQuery.isError && (
          <>
            <Alert>
              <ExclamationIcon className="mr-2 h-5 w-5 text-yellow-500" />
              <AlertTitle>We are sorry!</AlertTitle>
              <AlertDescription>
                Failed to load work experiences. <br />
                {getEducationsQuery.error.message}
              </AlertDescription>
            </Alert>
          </>
        )}
        {getEducationsQuery.isSuccess &&
          (!getEducationsQuery.data ||
            !Array.isArray(getEducationsQuery.data) ||
            getEducationsQuery?.data.length === 0) && (
            <>
              <EmptyState title="Found nothing here" hideBtn={true} />
            </>
          )}
        {getEducationsQuery.isSuccess && getEducationsQuery.data && 
          Array.isArray(getEducationsQuery.data) &&
          getEducationsQuery?.data?.length > 0 && getEducationsQuery?.data?.map((education) => {
            return (
              <EducationCard
                key={education.id}
                education={education}
              />
            );
          })
        }
      </div>
    </div>
  );
}

export default EducationList;
