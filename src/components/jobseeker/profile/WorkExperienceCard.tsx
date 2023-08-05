import React from "react";
import Link from "next/link";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { BsGlobe2, BsThreeDotsVertical } from "react-icons/bs";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineLinkedin,
} from "react-icons/ai";
import DisplayTags from "@components/common/DisplayTags";
import { type WorkExperience } from "@prisma/client";
import { api } from "@utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { format, formatDistance } from "date-fns";
import useWorkExperience from "~/hooks/stores/useWorkExperience";

interface WorkExperienceCardProps {
  workExperience: WorkExperience;
}

function WorkExperienceCard({ workExperience }: WorkExperienceCardProps) {
  const deleteMutation =
    api.jobSeekerProfile.deleteWorkExperience.useMutation();
  const queryClient = useQueryClient();
  const setOpenWeDialog = useWorkExperience((store) => store.setOpenDialog);
  const setWorkExperienceData = useWorkExperience((store) => store.setData);
  const setCurrentWorkExperienceId = useWorkExperience((store) => store.setCurrentId);

  const handleDelete = () => {
    deleteMutation
      .mutateAsync(
        {
          id: workExperience.id,
        },
        {
          onSuccess: () => {
            queryClient
              .invalidateQueries([
                ["jobSeekerProfile", "getJobseekerProfile"],
                {
                  type: "query",
                },
              ])
              .catch(() => {
                console.log("Failed to invalidate job seeker profile query");
              });
          },
        }
      )
      .catch(() => {
        console.log("Failed to delete work experience");
      });
  };

  const handleEdit = () => {
    setCurrentWorkExperienceId(workExperience.id);
    setWorkExperienceData({
      title: workExperience.title || "",
      company: workExperience.company || "",
      companyWebsite: workExperience.companyWebsite || "",
      companyLinkedIn: workExperience.companyLinkedIn || "",
      city: workExperience.city || "",
      country: workExperience.country || "",
      employmentType: workExperience.employmentType || "",
      startDate: workExperience.startDate || new Date(),
      endDate: workExperience.endDate || new Date(),
      skills: workExperience.skills || [],
    });
    setOpenWeDialog(true);
  };

  return (
    <div className="card relative bg-base-100 p-4">
      <h1 className="text-xl">{workExperience.title}</h1>
      <h2 className="flex items-center gap-2">
        <span>@ {workExperience.company}</span>
        <span>•</span>
        <span>{workExperience.employmentType}</span>
        <span>•</span>
        {workExperience.companyWebsite && (
          <span className="flex items-center justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger tabIndex={-1}>
                  <Link href={workExperience.companyWebsite} target="_blank">
                    <BsGlobe2 className="text-sm" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Website</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        )}
        {workExperience.companyLinkedIn && (
          <span className="flex items-center justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger tabIndex={-1}>
                  <Link href={workExperience.companyLinkedIn} target="_blank">
                    <AiOutlineLinkedin className="text-lg" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        )}
      </h2>
      {workExperience.city || workExperience.country ? (
        <h3 className="text-sm text-gray-500">
          📍 {workExperience.city}
          {workExperience.city && workExperience.country ? ", " : null}
          {workExperience.country}
        </h3>
      ) : null}
      <h3 className="text-sm text-gray-500">
        {format(workExperience.startDate, "PPP")} -{" "}
        {workExperience.endDate
          ? format(workExperience.endDate, "PPP")
          : "Present"}
        {workExperience.endDate && (
          <span className="text-gray-400">
            {" "}
            ({formatDistance(workExperience.startDate, workExperience.endDate)})
          </span>
        )}
      </h3>

      {workExperience.skills.length > 0 || workExperience.description ? (
        <div className="divider my-1"></div>
      ) : null}

      <DisplayTags tags={workExperience.skills} />
      {workExperience.description && (
        <p className="mt-2">{workExperience.description}</p>
      )}

      <AlertDialog>
        <DropdownMenu>
          <div className="absolute right-5 top-5 flex gap-1">
            <DropdownMenuTrigger>
              <BsThreeDotsVertical />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="flex flex-col gap-1 py-2">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem
              className="text-md hover:cursor-pointer hover:bg-base-200 focus:bg-base-200 active:bg-base-300"
              onClick={handleEdit}
            >
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
            <AlertDialogAction
              className="bg-error hover:bg-error"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default WorkExperienceCard;
