import React from "react";
import EmptyState from "@components/EmptyState";
import JobStackList from "@components/JobStackList";
import { JobStatus } from "@prisma/client";
import { api } from "@utils/api";
import { useRouter } from "next/router";
import Loading from "@components/Loading";

function OpenJobList() {
  const router = useRouter();
  const getOpenJobsQuery = api.job.getJobsByStatus.useQuery({
    status: JobStatus.Open,
  });
  return (
    <div>
      {getOpenJobsQuery.isLoading && <Loading />}
      {getOpenJobsQuery.isError && <div>Error</div>}
      {getOpenJobsQuery.data && getOpenJobsQuery.data.length !== 0 && (
        <JobStackList jobs={getOpenJobsQuery.data} />
      )}
      {getOpenJobsQuery.data && getOpenJobsQuery.data.length === 0 && (
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

export default OpenJobList;
