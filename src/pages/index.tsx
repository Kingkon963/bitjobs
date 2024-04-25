import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import LandingLayout from "../components/layouts/LandingLayout";
import Redirector from "@components/Redirector";

const LandingPage: NextPage = () => {
  return (
    <div>
      <Redirector />
      <Head>
        <title>Britjobs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingLayout>
        <main className="my-16">
          <div className="flex h-[75vh] flex-col items-center justify-center gap-5">
            <div className="w-[50vw]">
              <h1 className="mb-5 text-5xl">Find a Job Today</h1>
              <div className="flex justify-center gap-5 rounded-2xl bg-base-200 p-5">
                <input
                  type="text"
                  className="input  w-full"
                  placeholder="Position"
                />
                <input
                  type="text"
                  className="input  w-full"
                  placeholder="City"
                />
                <button className="btn-primary btn">Search</button>
              </div>
            </div>
          </div>
        </main>
      </LandingLayout>
    </div>
  );
};

export default LandingPage;
