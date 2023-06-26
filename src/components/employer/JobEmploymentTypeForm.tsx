import React from "react";
import { useRouter } from "next/router";
import * as RadioGroup from "@radix-ui/react-radio-group";
import useCreateJobStore from "~/hooks/stores/useCreateJobStore";
import { api } from "@utils/api";
import { EmploymentType } from "@prisma/client";
import Loading from "@components/Loading";

function JobEmploymentTypeForm() {
  const router = useRouter();
  const createdJob = useCreateJobStore();
  const getJobForEditQuery = api.job.getJobForEdit.useQuery(createdJob.jobId, {
    enabled: !!createdJob.jobId,
  });
  const updateJobMutation = api.job.updateJob.useMutation({
    onSuccess: async () => {
      await getJobForEditQuery.refetch();
      await router.push("/employer/job/create?step=4");
    },
  });
  const [value, setValue] = React.useState<EmploymentType | undefined>();

  React.useEffect(() => {
    if (getJobForEditQuery.data) {
      setValue(getJobForEditQuery.data.employmentType);
    }
  }, [getJobForEditQuery.data]);

  const handeChange = (value: EmploymentType) => {
    setValue(value);
  };

  const handleSave = () => {
    if (!value) {
      console.log("Please select an employment type");
      return;
    }
    updateJobMutation.mutate({
      id: createdJob.jobId,
      employmentType: value,
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
            <form>
              <RadioGroup.Root
                className="flex flex-col gap-2.5"
                defaultValue={getJobForEditQuery.data?.employmentType}
                onValueChange={handeChange}
                aria-label="Job Employment Type"
              >
                <div className="flex items-center">
                  <RadioGroup.Item
                    className="radio-primary radio"
                    value={EmploymentType.FullTime}
                    id="r1"
                  >
                    <RadioGroup.Indicator className="after:bg-violet11 relative flex h-full w-full items-center justify-center after:block after:h-[11px] after:w-[11px] after:rounded-[50%] after:content-['']" />
                  </RadioGroup.Item>
                  <label
                    className="pl-[15px] text-[15px] leading-none text-black"
                    htmlFor="r1"
                  >
                    FullTime
                  </label>
                </div>
                <div className="flex items-center">
                  <RadioGroup.Item
                    className="radio-primary radio"
                    value={EmploymentType.PartTime}
                    id="r2"
                  >
                    <RadioGroup.Indicator className="after:bg-violet11 relative flex h-full w-full items-center justify-center after:block after:h-[11px] after:w-[11px] after:rounded-[50%] after:content-['']" />
                  </RadioGroup.Item>
                  <label
                    className="pl-[15px] text-[15px] leading-none text-black"
                    htmlFor="r2"
                  >
                    PartTime
                  </label>
                </div>
                <div className="flex items-center">
                  <RadioGroup.Item
                    className="radio-primary radio"
                    value={EmploymentType.Contract}
                    id="r3"
                  >
                    <RadioGroup.Indicator className="after:bg-violet11 relative flex h-full w-full items-center justify-center after:block after:h-[11px] after:w-[11px] after:rounded-[50%] after:content-['']" />
                  </RadioGroup.Item>
                  <label
                    className="pl-[15px] text-[15px] leading-none text-black"
                    htmlFor="r3"
                  >
                    Contract
                  </label>
                </div>
                <div className="flex items-center">
                  <RadioGroup.Item
                    className="radio-primary radio"
                    value={EmploymentType.Internship}
                    id="r4"
                  >
                    <RadioGroup.Indicator className="after:bg-violet11 relative flex h-full w-full items-center justify-center after:block after:h-[11px] after:w-[11px] after:rounded-[50%] after:content-['']" />
                  </RadioGroup.Item>
                  <label
                    className="pl-[15px] text-[15px] leading-none text-black"
                    htmlFor="r4"
                  >
                    Internship
                  </label>
                </div>
              </RadioGroup.Root>
            </form>
          )}
          <div className="mt-8 flex justify-start">
            <button
              className="inline-flex items-center rounded bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-700"
              disabled={getJobForEditQuery.isLoading}
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
}

export default JobEmploymentTypeForm;
