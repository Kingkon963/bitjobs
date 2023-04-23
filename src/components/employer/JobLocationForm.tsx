/* eslint-disable @typescript-eslint/no-misused-promises */
import AddressFinderForm from "@components/AddressFinderForm";
import PanelCard from "@components/PanelCard";
import { api } from "@utils/api";
import { useRouter } from "next/router";
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
