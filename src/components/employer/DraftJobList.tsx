import EmptyState from "@components/EmptyState";
import JobStackList from "@components/JobStackList";
import { JobStatus } from "@prisma/client";
import { api } from "@utils/api";
import { useRouter } from "next/router";
import React from "react";

function DraftJobList() {
  const router = useRouter();
  const getDraftJobsQuery = api.job.getJobsByStatus.useQuery({
    status: JobStatus.Draft,
  });

  return (
    <div>
      {getDraftJobsQuery.isLoading && <div>Loading...</div>}
      {getDraftJobsQuery.isError && <div>Error</div>}
      {getDraftJobsQuery.data && getDraftJobsQuery.data.length !== 0 && (
        <JobStackList jobs={getDraftJobsQuery.data} />
      )}
      {getDraftJobsQuery.data && getDraftJobsQuery.data.length === 0 && (
        <EmptyState
          title="No draft jobs"
          description="Get started by creating a new job."
          buttonLabel="Create one"
          buttonOnClick={() => void router.push("/employer/job/create")}
        />
      )}
    </div>
  );
}

export default DraftJobList;
