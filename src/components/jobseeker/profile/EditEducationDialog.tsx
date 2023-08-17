import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@utils/api";
import { useQueryClient } from "@tanstack/react-query";

export const educationDialogSchema = z.object({
  school: z.string().refine((val) => val.trim().length > 0, {
    message: "School is required",
  }),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  degree: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  description: z.string().optional(),
});

type EducationDialogSchemaType = z.infer<typeof educationDialogSchema>;

const defaultValues = {
  school: "",
  startDate: undefined,
  endDate: undefined,
  degree: "",
  fieldOfStudy: "",
  description: "",
} satisfies EducationDialogSchemaType;

type EditEducationDialogProps = {
  // can pass only DialogTrigger
  children: React.ReactNode;
};

function EditEducationDialog({ children }: EditEducationDialogProps) {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const form = useForm<EducationDialogSchemaType>({
    resolver: zodResolver(educationDialogSchema),
    defaultValues,
  });
  const getProfileQuery = api.jobSeekerProfile.getJobseekerProfile.useQuery();
  const saveEducationMutation =
    api.jobSeekerProfile.saveEducation.useMutation();

  const onSubmit = (values: EducationDialogSchemaType) => {
    console.log(values);
    if (!getProfileQuery.data?.id) {
      return;
    }
    saveEducationMutation.mutate(
      {
        profileId: getProfileQuery.data?.id,
        data: values,
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
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
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Education</DialogTitle>
          <DialogDescription>
            Add details about your education
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1">
          <Form {...form}>
            <form
              onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 'Cambridge University'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 'Cambridge University'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fieldOfStudy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field Of Study (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 'Computer Science'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="btn-primary btn"
                  disabled={saveEducationMutation.isLoading}
                >
                  Save
                </button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditEducationDialog;
