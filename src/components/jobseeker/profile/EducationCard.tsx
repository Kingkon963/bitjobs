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
import { type Education } from "@prisma/client";
import { api } from "@utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { format, formatDistance } from "date-fns";
import useWorkExperience from "~/hooks/stores/useWorkExperience";

interface EducationCardProps {
  education: Education;
}

function EducationCard({ education }: EducationCardProps) {
  const queryClient = useQueryClient();
  const deleteEducationMutation =
    api.jobSeekerProfile.deleteEducation.useMutation();

  const handleDelete = () => {
    deleteEducationMutation.mutate(
      {
        id: education.id,
      },
      {
        onSuccess: () => {
          queryClient
            .invalidateQueries([
              ["jobSeekerProfile", "getEducations"],
              {
                type: "query",
              },
            ])
            .catch(() => {
              console.log("Failed to invalidate getEducations query");
            });
        },
      }
    );
  };
  return (
    <div className="card relative bg-base-100 p-4">
      <h1 className="text-xl">{education.school}</h1>
      <h2 className="flex items-center gap-2">
        <span>{education.degree}</span>
        {education.fieldOfStudy && education.degree && <span>•</span>}
        <span>{education.fieldOfStudy}</span>
      </h2>
      {education.startDate && (
        <h3 className="text-sm text-gray-500">
          {format(education.startDate, "PPP")} -{" "}
          {education.endDate ? format(education.endDate, "PPP") : "Present"}
          {education.endDate && (
            <span className="text-gray-400">
              {" "}
              ({formatDistance(education.startDate, education.endDate)})
            </span>
          )}
        </h3>
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
            {/* <DropdownMenuItem
              className="text-md hover:cursor-pointer hover:bg-base-200 focus:bg-base-200 active:bg-base-300"
              // onClick={handleEdit}
            >
              Edit
            </DropdownMenuItem> */}
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
              This action cannot be undone. This will permanently delete your data from our servers.
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

export default EducationCard;
