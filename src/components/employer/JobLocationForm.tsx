/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import type { LondonAddress } from "@prisma/client";
import LondonAreaSelector from "@components/LondonAreaSelector";
import { api } from "@utils/api";
import { useRouter } from "next/router";
import useCreateJobStore from "~/hooks/stores/useCreateJobStore";

const JobLocationForm = () => {
  const [selectedArea, setSelectedArea] = useState<LondonAddress>();
  const router = useRouter();
  const createdJob = useCreateJobStore();
  const getJobForEditQuery = api.job.getJobForEdit.useQuery(createdJob.jobId, {
    enabled: !!createdJob.jobId,
  });
  const updateJobMutation = api.job.updateJob.useMutation({
    onSuccess: async () => {
      await getJobForEditQuery.refetch();
      await router.push("/employer/job/create?step=3");
    },
  });
  const createAddressMutation = api.address.createAddress.useMutation();
  const { goNextStep } = useCreateJobStore();

  const handleSave = () => {
    if (!selectedArea) return;
    createAddressMutation.mutate(
      {
        line1: selectedArea.location,
        line2: "",
        line3: "",
        borough: selectedArea.borough,
        postcode: selectedArea.postcode,
        postTown: selectedArea.postTown,
      },
      {
        onSuccess: (data) => {
          updateJobMutation.mutate(
            {
              id: createdJob.jobId,
              addressId: data.id,
            },
            {
              onSuccess: () => {
                goNextStep();
              },
            }
          );
        },
      }
    );
  };

  return (
    <div>
      <div className="rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="max-w-md">
            <LondonAreaSelector
              onSelect={(londonAddress) => {
                setSelectedArea(londonAddress);
              }}
              defaultArea={getJobForEditQuery.data?.location}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="inline-flex items-center rounded bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-700"
              onClick={handleSave}
            >
              <span>Save & Next</span>
              <svg
                className="ml-2 h-4 w-4"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobLocationForm;
