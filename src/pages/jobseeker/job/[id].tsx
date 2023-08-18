import JobseekerLayout from "@components/layouts/JobseekerLayout";
import React from "react";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { prisma } from "~/server/db";
import { type Job, JobStatus } from "@prisma/client";

type PageProp = {
  job?: Pick<Job, "title" | "refId">;
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
  });

  if (!job) {
    return { notFound: true };
  }

  const props = {
    job: {
      title: job.title,
      refId: job.refId
    },
  } satisfies PageProp;

  // Pass post data to the page via props
  return {
    props
  };
};

function JobDetailPage({
  job,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  if(!job) return null;

  return (
    <JobseekerLayout>
      <div>
        <h1>Job Detail Page for {job.title}</h1>
      </div>
    </JobseekerLayout>
  );
}

export default JobDetailPage;
