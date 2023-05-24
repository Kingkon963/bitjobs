import Loading from "@components/Loading";
import { api } from "@utils/api";
import { useRouter } from "next/router";
import React from "react";
import useCreateJobStore from "~/hooks/stores/useCreateJobStore";

function JobPreview() {
  const router = useRouter();
  const createdJob = useCreateJobStore();
  const getJobForEditQuery = api.job.getJobForEdit.useQuery(createdJob.jobId, {
    enabled: !!createdJob.jobId,
  });
  const publishJobMutation = api.job.publishJob.useMutation({
    onSuccess: async () => {
      await getJobForEditQuery.refetch();
      await router.push("/employer");
    },
  });

  const handlePublish = () => {
    if (!getJobForEditQuery.data) return;
    publishJobMutation.mutate({
      id: getJobForEditQuery.data.id,
    });
  };

  return (
    <div>
      <div className="rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          {getJobForEditQuery.isLoading && <Loading />}
          {getJobForEditQuery.isError && (
            <div>Something went wrong. Please try again.</div>
          )}
          {getJobForEditQuery.isSuccess && (
            <div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {getJobForEditQuery.data?.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {getJobForEditQuery.data?.location?.line1}
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                    {getJobForEditQuery.data?.employmentType}
                  </span>
                  {/* <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                    {getJobForEditQuery.data?.jobType}
                  </span> */}
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {getJobForEditQuery.data?.description}
                </p>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  className="inline-flex items-center rounded bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-700"
                  onClick={handlePublish}
                  disabled={publishJobMutation.isLoading}
                >
                  {publishJobMutation.isLoading && <Loading color="white" />}
                  {publishJobMutation.isSuccess && <span>Published</span>}
                  {!publishJobMutation.isSuccess && <span>Publish</span>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobPreview;
