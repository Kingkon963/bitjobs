import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";

function WorkExperienceCard() {
  return (
    <div className="card relative bg-base-100 p-4">
      <h1 className="text-xl">Junior Frontend Engineer</h1>
      <h2>@ Company Name</h2>
      <h3 className="text-sm text-gray-500">
        Mar 2019 - May 2020 (1 year & 1 month)
      </h3>
      <div>
        <div className="divider my-1"></div>
        <span className="badge badge-neutral">React.js</span>
        <div className="divider my-1"></div>
      </div>
      <p className="mt-2">
        I was responsible for building UI elements & write testing. There
        I&apos;ve used React and TailwindCSS. I&apos;ve also used Storybook to
        build UI components.
      </p>
      <div className="absolute right-5 top-5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <BsThreeDotsVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-1 py-2">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem className="hover:cursor-pointer hover:bg-base-200 focus:bg-base-200 active:bg-base-300 text-md">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-error hover:cursor-pointer hover:bg-base-200 focus:bg-base-200 active:bg-base-300 text-md">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function WorkExperienceList() {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <WorkExperienceCard />
        <WorkExperienceCard />
        <WorkExperienceCard />
      </div>
      <div className="flex justify-end mt-8">
        <button className="btn-primary btn">Add New</button>
      </div>
    </div>
  );
}

export default WorkExperienceList;
