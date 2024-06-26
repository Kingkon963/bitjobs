import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EmployerLayout from "@components/layouts/EmployerLayout";
import { api } from "@utils/api";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { UploadButton } from "@utils/uploadthing";
import "@uploadthing/react/styles.css";
import { Button } from "@/components/ui/button";

type CompanyCreateForm = {
  name: string;
  location: string;
};

const CompanyCreatePage: NextPage = () => {
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const { data: session } = useSession();
  const router = useRouter();
  const { register, handleSubmit } = useForm<CompanyCreateForm>();
  const createCompanyMutation = api.company.save.useMutation({
    onSuccess: async () => {
      await router.push(`/employer/company`);
    },
  });

  const onSubmit: SubmitHandler<CompanyCreateForm> = (data) => {
    console.log(data);
    if (!session?.user?.id) return;
    createCompanyMutation.mutate({
      name: data.name,
      location: data.location,
      imageUrl: logoUrl,
      userId: session?.user?.id,
    });
  };

  const isCreating = createCompanyMutation.isLoading;

  return (
    <EmployerLayout title="Create your company">
      <div className="max-w-lg">
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Company Name"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="companyLocation"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <div className="mt-1">
                <input
                  {...register("location", { required: true })}
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Company Location"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="companyAdmin"
                className="block text-sm font-medium text-gray-700"
              >
                Admin
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="companyAdmin"
                  id="companyAdmin"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed sm:text-sm"
                  placeholder="Company Admin"
                  defaultValue={session?.user?.email || ""}
                  disabled
                />
              </div>
            </div>

            <div className="my-8 flex">
              {logoUrl && typeof logoUrl === "string" && (
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={logoUrl}
                      width={64}
                      height={64}
                      alt="Company Logo"
                    />
                    <AvatarFallback>Logo</AvatarFallback>
                  </Avatar>
                  <Button
                    variant={"destructive"}
                    size={"sm"}
                    onClick={() => {
                      setLogoUrl(undefined);
                    }}
                  >
                    Reset
                  </Button>
                </div>
              )}
              {!logoUrl && (
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (
                      Array.isArray(res) &&
                      res.length > 0 &&
                      res[0]?.fileUrl
                    ) {
                      setLogoUrl(res[0]?.fileUrl);
                    } else {
                      throw new Error("upload error");
                    }
                  }}
                  onUploadError={() => {
                    alert("upload error");
                  }}
                />
              )}
            </div>

            <button
              type="submit"
              className="mr-auto inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-4 text-lg font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={isCreating}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </EmployerLayout>
  );
};

export default CompanyCreatePage;
