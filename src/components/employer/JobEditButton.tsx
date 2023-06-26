import { useRouter } from "next/router";
import React from "react";
import useCreateJobStore from "~/hooks/stores/useCreateJobStore";

function JobEditButton({ jobId }: { jobId: string }) {
  const router = useRouter();
  const { setJobId } = useCreateJobStore();

  const handleEdit = async () => {
    setJobId(jobId);
    await router.push("/employer/job/create");
  };

  return (
    <button
      className="font-medium text-indigo-600 hover:text-indigo-500"
      onClick={() => void handleEdit()}
    >
      Edit
    </button>
  );
}

export default JobEditButton;
