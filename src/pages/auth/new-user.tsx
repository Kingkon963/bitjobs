import LandingLayout from "@components/layouts/LandingLayout";
import type { NextPage } from "next";
import Head from "next/head";
import { type GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

const NewUserPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bitjobs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingLayout>
        <main className="my-16"></main>
      </LandingLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    if (session.user.role === UserRole.Employer) {
      return {
        redirect: {
          destination: "/employer/company/create",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};

export default NewUserPage;
