/* eslint-disable @typescript-eslint/no-misused-promises */
import PanelCard from "@components/PanelCard";
import Stepper, { type StepProps } from "@components/Stepper";
import EmployerLayout from "@components/layouts/EmployerLayout";
import { api } from "@utils/api";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useCreateJobStore from "~/hooks/stores/useCreateJobStore";

type JobDescriptionFormType = {
  jobTitle: string;
  jobDescription: string;
};

const JobDescriptionForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JobDescriptionFormType>();
  const router = useRouter();
  const createdJob = useCreateJobStore();
  const createJobMutation = api.job.createJob.useMutation({
    onSuccess: async (data) => {
      createdJob.setJobId(data.id);
      await router.push("/employer/job/create?step=2");
    },
  });
  const getJobForEditQuery = api.job.getJobForEdit.useQuery(createdJob.jobId, {
    enabled: !!createdJob.jobId,
  });
  const updateJobMutation = api.job.updateJob.useMutation({
    onSuccess: async () => {
      await getJobForEditQuery.refetch();
    },
  });

  useEffect(() => {
    if (getJobForEditQuery.data) {
      setValue("jobTitle", getJobForEditQuery.data.title);
      setValue("jobDescription", getJobForEditQuery.data.description);
    }
  }, [getJobForEditQuery.data, setValue]);

  const onSubmit = (data: JobDescriptionFormType) => {
    console.log(data);
    if (createdJob.jobId) {
      updateJobMutation.mutate({
        id: createdJob.jobId,
        title: data.jobTitle,
        description: data.jobDescription,
      });
    } else {
      createJobMutation.mutate({
        title: data.jobTitle,
        description: data.jobDescription,
      });
    }
  };

  const creatingJob = createJobMutation.isLoading;

  return (
    <div>
      <PanelCard>
        <form className="max-w-md" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <div className="mt-1">
              <input
                {...register("jobTitle", { required: true })}
                type="text"
                name="jobTitle"
                id="jobTitle"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Senior Software Engineer..."
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="jobDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Job Description
            </label>
            <div className="mt-1">
              <textarea
                {...register("jobDescription", { required: true })}
                id="jobDescription"
                name="jobDescription"
                rows={12}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Write a short description of the job..."
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex items-center rounded bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-700 disabled:bg-gray-500"
              disabled={creatingJob}
            >
              <span>Save</span>
            </button>
          </div>
        </form>
      </PanelCard>
    </div>
  );
};

export default JobDescriptionForm;
