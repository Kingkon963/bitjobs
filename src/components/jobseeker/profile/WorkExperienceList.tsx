import React from "react";

import EditWorkExperienceDialog from "./EditWorkExperienceDialog";
import { DialogTrigger } from "@/components/ui/dialog";
import WorkExperienceCard from "./WorkExperienceCard";


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
