import JobseekerLayout from "@components/layouts/JobseekerLayout";
import React from "react";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { prisma } from "~/server/db";
import { type Job, JobStatus, type Company } from "@prisma/client";
import { formatDistance } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type PageProp = {
  job?: Pick<Job, "title" | "refId" | "description"> & {
    lastUpdated: string;
    company: Pick<Company, "name" | "imageUrl" | "location">;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const jobs = await prisma.job.findMany({
    where: {
      status: JobStatus.Open,
    },
  });

  const paths = jobs.map((j) => {
    return {
      params: {
        id: j.refId,
      },
    };
  });

  return {
    paths,
    fallback: true, // false or "blocking"
  };
};

export const getStaticProps: GetStaticProps<PageProp> = async ({ params }) => {
  if (params === undefined || !params?.id) {
    return { notFound: true };
  }

  const jobRefId = params.id;

  if (Array.isArray(jobRefId)) {
    console.log("ERROR: jobRefId can't be an Array");
    console.log(
      "🚀 ~ file: [id].tsx:41 ~ constgetStaticProps:GetStaticProps= ~ jobRefId:",
      jobRefId
    );
    return { notFound: true };
  }

  const job = await prisma.job.findUnique({
    where: {
      refId: jobRefId,
    }, 
    select: {
      title: true,
      refId: true,
      updatedAt: true,
      description: true,
      company: {
        select: {
          name: true,
          imageUrl: true,
          location: true
        }
      }
    }
  });

  if (!job) {
    return { notFound: true };
  }

  const props = {
    job: {
      title: job.title,
      refId: job.refId,
      lastUpdated: formatDistance(job.updatedAt, new Date(), {
        addSuffix: true,
      }),
      description: job.description,
      company: {
        name: job.company.name,
        imageUrl: job.company.imageUrl,
        location: job.company.location
      }
    },
  } satisfies PageProp;

  // Pass post data to the page via props
  return {
    props: props,
  };
};

function JobDetailPage({
  job,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!job) return null;

  console.log("🚀 ~ file: [id].tsx:99 ~ job.description:", job.description);
  return (
    <JobseekerLayout>
      <div className="mb-32">
        <div className="flex gap-24">
          <div className="max-w-screen-md">
            <h1 className="text-3xl font-semibold">{job.title}</h1>
            <div className="mt-4 flex gap-2 text-gray-500">
              <span>{job.lastUpdated}</span>
              <span>•</span>
              <span>30 views</span>
            </div>
            <div className="divider"></div>
            <div className="whitespace-pre-line">{job.description}</div>
            <div className="divider"></div>
          </div>
          <div className="">
            <div className="p-4 border rounded-md">
              <div className="flex gap-4 items-start">
                {job.company.imageUrl && (
                  <Avatar className="mt-1">
                    <AvatarImage 
                      src={job.company.imageUrl}
                      alt={job.company.name}
                    />
                    <AvatarFallback>{job.company.name}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <h4 className="font-semibold">{job.company.name}</h4>
                  <p className="text-gray-500">{job.company.location}</p>
                </div>
                <Button className="ml-8" variant={"outline"}>Follow</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </JobseekerLayout>
  );
}

export default JobDetailPage;
