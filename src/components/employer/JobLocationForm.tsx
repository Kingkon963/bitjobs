/* eslint-disable @typescript-eslint/no-misused-promises */
import AddressFinderForm from "@components/AddressFinderForm";
import PanelCard from "@components/PanelCard";
import Stepper, { type StepProps } from "@components/Stepper";
import EmployerLayout from "@components/layouts/EmployerLayout";
import { api } from "@utils/api";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useCreateJobStore from "~/hooks/stores/useCreateJobStore";

const JobLocationForm = () => {
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

  return (
    <div>
      <PanelCard>
        <>
          <AddressFinderForm
            onSave={(addressId) => {
              updateJobMutation.mutate({
                id: createdJob.jobId,
                addressId,
              });
            }}
            defaultAddress={getJobForEditQuery.data?.location}
          />
        </>
      </PanelCard>
    </div>
  );
};

export default JobLocationForm;
