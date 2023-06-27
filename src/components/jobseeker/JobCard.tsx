import { type Job } from "@prisma/client";
import React from "react";

interface JobCardProps {
  job: Job & {
    company: {
      name: string;
    };
  };
}

function JobCard(props: JobCardProps) {
  const { job } = props;

  return (
    <div className="card bordered flex flex-col gap-4 shadow-lg">
      <div className="card-body">
        <div className="flex gap-4">
          <div className="h-16 w-16 flex-none rounded-full bg-base-200"></div>
          <div className="flex-1">
            <div className="flex gap-2">
              <div className="flex-1">
                <h2 className="card-title">{job.title}</h2>
                <p className="text-base-content text-opacity-60">
                  {job.employmentType}, <b>{job.company?.name}</b>
                </p>
              </div>
              <div className="flex-none">
                <button className="btn-ghost btn-sm btn rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-bookmark"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M8 4v16l4 -4.5l4 4.5v-16z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="flex-1">
                <p className="text-base-content text-opacity-60">
                  {job.description.split(" ").slice(0, 20).join(" ")}
                  {job.description.split(" ").length > 20 ? "..." : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
