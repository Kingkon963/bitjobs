import React from "react";
import { useRouter } from "next/router";
import { api } from "@utils/api";
import Loading from "@components/Loading";
import useCreateJobStore from "~/hooks/stores/useCreateJobStore";

function JobPublishButton({ jobId }: { jobId: string }) {
  const router = useRouter();
  const { reset } = useCreateJobStore();
  const publishJobMutation = api.job.publishJob.useMutation({
    onSuccess: async () => {
      reset();
      await router.push("/employer");
    },
  });

  const handlePublish = () => {
    if (!jobId) return;
    publishJobMutation.mutate({
      id: jobId,
    });
  };

  return (
    <button
      className="inline-flex items-center rounded bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-700"
      onClick={handlePublish}
      disabled={publishJobMutation.isLoading}
    >
      {publishJobMutation.isLoading && <Loading color="white" />}
      {publishJobMutation.isSuccess && <span>Published</span>}
      {!publishJobMutation.isSuccess && <span>Publish</span>}
    </button>
  );
}

export default JobPublishButton;
