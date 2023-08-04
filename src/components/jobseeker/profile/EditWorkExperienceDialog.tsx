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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmploymentType } from "@prisma/client";
import { SlCalender } from "react-icons/sl";
import { BsChevronBarContract, BsChevronBarExpand } from "react-icons/bs";
import SkillsTagManager from "./SkillsTagManager";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(4, {
      message: "Title must be at least 4 characters long",
    })
    .max(50),
  company: z
    .string({
      required_error: "Company name is required",
    })
    .min(2),
  city: z.string().optional(),
  country: z.string().optional(),
  companyWebsite: z.string().optional(),
  companyLinkedIn: z.string().optional(),
  employmentType: z.nativeEnum(EmploymentType),
  description: z.string().optional(),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date().optional(),
  skills: z.array(z.string()).optional(),
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
  const [showCompanyFields, setShowCompanyFields] = React.useState(false);
  const [show2ndStep, setShow2ndStep] = React.useState(false);

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

  //open company fields if there is any error
  useEffect(() => {
    if (form.formState.errors.company) {
      setShowCompanyFields(true);
    }
  }, [form.formState.errors.company]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const goTo2ndStep = async () => {
    const valid = await form.trigger();
    if (!valid) return;
    setShow2ndStep(true);
  };


  return (
    <Dialog>
      {children}
      <DialogContent>
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
              {!show2ndStep && (
                <>
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
                        {/* <FormDescription>Enter your job title</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Job Description{" "}
                          <span className="text-xs text-gray-500">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about your role in this job"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Collapsible
                    open={showCompanyFields}
                    onOpenChange={setShowCompanyFields}
                  >
                    <CollapsibleTrigger>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          Company Details
                        </span>
                        <span className="w-9 p-0">
                          {showCompanyFields ? (
                            <BsChevronBarContract />
                          ) : (
                            <BsChevronBarExpand />
                          )}
                          <span className="sr-only">Toggle</span>
                        </span>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 'BitJobs'" {...field} />
                            </FormControl>
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
                                <Input placeholder="e.g. 'London'" {...field} />
                              </FormControl>
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
                                <Input placeholder="e.g. 'UK'" {...field} />
                              </FormControl>
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
                              <span className="text-xs text-gray-500">
                                (optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="https://" {...field} />
                            </FormControl>
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
                              <span className="text-xs text-gray-500">
                                (optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="https://" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CollapsibleContent>
                  </Collapsible>
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
                            className="flex flex-wrap gap-4"
                          >
                            {Object.values(EmploymentType).map((type) => (
                              <FormItem
                                className="flex items-center space-x-3 space-y-0 border-r border-black pr-4 last:border-r-0 last:pr-0"
                                key={type}
                              >
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

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>From</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <SlCalender className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              captionLayout="dropdown"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date: Date) => date > new Date()}
                              initialFocus
                              fromYear={1990}
                              toYear={new Date().getFullYear()}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>To</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <SlCalender className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              captionLayout="dropdown"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date: Date) => date > new Date()}
                              initialFocus
                              fromYear={1990}
                              toYear={new Date().getFullYear()}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {show2ndStep && (
                <>
                  <SkillsTagManager onChange={skills => {
                    form.setValue("skills", skills);
                  }}/>
                </>
              )}

              <div className="flex justify-end gap-4">
                {show2ndStep && (
                  <>
                    <button
                      type="button"
                      className="btn-outline btn"
                      onClick={() => setShow2ndStep(false)}
                    >
                      Back
                    </button>
                    <button type="submit" className="btn-primary btn">
                      Save
                    </button>
                  </>
                )}
                {!show2ndStep && (
                  <button
                    type="button"
                    className="btn-primary btn"
                    onClick={() => void goTo2ndStep()}
                  >
                    Next
                  </button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditWorkExperienceDialog;
