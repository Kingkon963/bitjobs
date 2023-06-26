import React from "react";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { api } from "@utils/api";
import Loading from "../Loading";
import JobEditButton from "./JobEditButton";

interface JobCardProps {
  jobId: string;
}

function JobCardForEmployer({ jobId }: JobCardProps) {
  const getJobForEditQuery = api.job.getJobForEdit.useQuery(jobId, {
    enabled: !!jobId,
  });

  if (getJobForEditQuery.isLoading) return <Loading />;
  if (getJobForEditQuery.isError) return <div>Error</div>;

  const job = getJobForEditQuery.data;

  return (
    <div className="block hover:bg-gray-50">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="truncate">
            <div className="flex text-sm">
              <p className="truncate text-lg font-medium text-indigo-600">
                {job.title}
              </p>
              {/* <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                        in {job.department}
                      </p> */}
            </div>
            {job.location && (
              <div className="mt-4 flex">
                <div className="flex items-center text-sm text-gray-500">
                  <LocationMarkerIcon
                    className="mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <p>{job.location.line1}</p>
                </div>
              </div>
            )}
          </div>
          {/* <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <div className="flex -space-x-1 overflow-hidden">
                      {position.applicants.map((applicant) => (
                        <img
                          key={applicant.email}
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          src={applicant.imageUrl}
                          alt={applicant.name}
                        />
                      ))}
                    </div>
                  </div> */}
        </div>
        <div className="ml-5 flex-shrink-0">
          <JobEditButton jobId={job.id} />
        </div>
      </div>
    </div>
  );
}

export default JobCardForEmployer;
