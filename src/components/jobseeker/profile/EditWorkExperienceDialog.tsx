import React, { ComponentProps, useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmploymentType } from "@prisma/client";

const formSchema = z.object({
  title: z
    .string()
    .min(4, {
      message: "Title must be at least 4 characters long",
    })
    .max(50),
  company: z.string().min(2),
  city: z.string().optional(),
  country: z.string().optional(),
  companyWebsite: z.string().url().optional(),
  companyLinkedIn: z.string().url().optional(),
  employmentType: z.nativeEnum(EmploymentType),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
});

type EditWorkExperienceDialogProps = {
  // can pass only DialogTrigger
  children: React.ReactNode;
};

function EditWorkExperienceDialog({ children }: EditWorkExperienceDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      city: "",
      country: "",
      companyWebsite: "",
      companyLinkedIn: "",
      employmentType: EmploymentType.FullTime,
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  useEffect(() => {
    React.Children.forEach(children, (child) => {
      // console.log(child);
      if (React.isValidElement(child)) {
        if (child.type !== DialogTrigger) {
          throw new Error(
            "EditWorkExperienceDialog component's children must be DialogTrigger"
          );
        }
      }
    });
  }, [children]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Dialog>
      {children}
      <DialogContent className="my-24">
        <DialogHeader>
          <DialogTitle>Work Experience</DialogTitle>
          <DialogDescription>
            Add details about your work experience
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 'Frontend Engineer'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your job title</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>Enter your company name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 space-x-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        City{" "}
                        <span className="text-xs text-gray-500">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>Enter your job city.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Country{" "}
                        <span className="text-xs text-gray-500">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>Country of the company</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company Website{" "}
                      <span className="text-xs text-gray-500">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>Website of the company</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyLinkedIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company LinkedIn Profile{" "}
                      <span className="text-xs text-gray-500">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      LinkedIn Profile of the company
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {Object.values(EmploymentType).map((type) => (
                          <FormItem className="flex items-center space-x-3 space-y-0" key={type}>
                            <FormControl>
                              <RadioGroupItem value={type} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {type}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    {/* <FormDescription>
                      LinkedIn Profile of the company
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <button type="submit" className="btn-primary btn">
                  Submit
                </button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditWorkExperienceDialog;
