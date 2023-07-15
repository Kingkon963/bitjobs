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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters long",
    })
    .max(50),
});

type EditWorkExperienceDialogProps = {
  // can pass only DialogTrigger
  children: React.ReactNode;
};

function EditWorkExperienceDialog({ children }: EditWorkExperienceDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
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
  }

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
      <form onSubmit={e => void form.handleSubmit(onSubmit)(e)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditWorkExperienceDialog;
