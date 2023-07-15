import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import EditWorkExperienceDialog from "./EditWorkExperienceDialog";
import { DialogTrigger } from "@/components/ui/dialog";

function WorkExperienceCard() {
  const handleDelete = () => {
    // const confirm = window.confirm("Are you sure you want to delete this?");
    // if (confirm) {
    //   console.log("Delete");
    // }
  };
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
      <AlertDialog>
        <DropdownMenu>
          <div className="absolute right-5 top-5 flex gap-1">
            <button>
              <AiOutlineArrowDown />
            </button>
            <button>
              <AiOutlineArrowUp />
            </button>
            <DropdownMenuTrigger>
              <BsThreeDotsVertical />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="flex flex-col gap-1 py-2">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem className="text-md hover:cursor-pointer hover:bg-base-200 focus:bg-base-200 active:bg-base-300">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-md text-error hover:cursor-pointer hover:bg-base-200 focus:bg-base-200 active:bg-base-300"
              // onClick={handleDelete}
              asChild
            >
              <AlertDialogTrigger>Delete</AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              work experience data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-error hover:bg-error">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
      <div className="mt-8 flex justify-end">
        <EditWorkExperienceDialog>
          <DialogTrigger className="btn-primary btn">Add New</DialogTrigger>
        </EditWorkExperienceDialog>
      </div>
    </div>
  );
}

export default WorkExperienceList;
