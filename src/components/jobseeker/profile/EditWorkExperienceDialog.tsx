import React, { ComponentProps, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type EditWorkExperienceDialogProps = {
  // can pass only DialogTrigger
  children: React.ReactNode;
};

function EditWorkExperienceDialog({ children }: EditWorkExperienceDialogProps) {
  
  useEffect(() => {
    React.Children.forEach(children, (child) => {
      // console.log(child);
      if (React.isValidElement(child)) {
        if(child.type !== DialogTrigger) {
          throw new Error(
            "EditWorkExperienceDialog component's children must be DialogTrigger"
          );
        }
      }
    }
    );
  }, [children]);

  return (
    <Dialog>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default EditWorkExperienceDialog;
