import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { EditIcon } from "lucide-react";
import { ExclamationIcon } from "@heroicons/react/solid";
import { useUploadThing } from "~/utils/uploadthing";
import Loading from "@components/Loading";
import { api } from "@utils/api";
import { useQueryClient } from "@tanstack/react-query";

interface CompanyLogoProps {
  companyId: string;
  logoUrl: string;
  alt: string;
}

function CompanyLogo({ companyId, logoUrl, alt }: CompanyLogoProps) {
  const queryClient = useQueryClient();
  const saveCompany = api.company.save.useMutation();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (Array.isArray(res) && res.length > 0 && res.at(0)?.fileUrl) {
        saveCompany
          .mutateAsync(
            {
              id: companyId,
              imageUrl: res?.at(0)?.fileUrl,
            },
            {
              onSuccess: () => {
                queryClient
                  .invalidateQueries([
                    ["company", "get"],
                    {
                      input: {
                        userId: "clgtahs8i0000g6vcdyd37zp5",
                      },
                      type: "query",
                    },
                  ])
                  .catch((err) => {
                    console.log(err);
                  });
              },
            }
          )
          .catch((err) => {
            console.log(err);
          });
      }
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
  });

  return (
    <Avatar className="h-24 w-24 overflow-visible border">
      <Button variant={"link"} className="absolute -right-3 -top-3 m-0 p-0">
        <input
          type="file"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              void startUpload([file]);
            }
          }}
          disabled={isUploading}
        />
        {isUploading && <Loading />}
        {!isUploading && <EditIcon className="m-0 h-5 w-5 p-0" />}
      </Button>
      <AvatarImage src={logoUrl} alt={alt} />
      <AvatarFallback>
        <div className="flex h-24 w-24 flex-col items-center justify-center">
          <ExclamationIcon className="h-5 w-5" />
          <span className="text-[0.5rem]">No Image</span>
        </div>
      </AvatarFallback>
    </Avatar>
  );
}

export default CompanyLogo;
