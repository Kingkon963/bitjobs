import React from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

function CreateJobButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => void router.push("/employer/job/create")}
      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      Create Job
    </button>
  );
}

export default CreateJobButton;
