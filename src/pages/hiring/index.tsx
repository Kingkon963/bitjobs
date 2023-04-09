import CTASectionForEmployer from "@components/hiring/CTASectionForEmployer";
import LandingLayout from "@components/layouts/LandingLayout";
import type { NextPage } from "next";
import Head from "next/head";

const HiringPage: NextPage = () => {
  return(
    <div>
      <Head>
        <title>Britjobs | Hiring?</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <LandingLayout>
        <div className="">
          <CTASectionForEmployer />
        </div>
      </LandingLayout>
    </div>
  )
}

export default HiringPage
