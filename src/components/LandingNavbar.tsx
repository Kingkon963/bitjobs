import React from "react";
import AvatarMenu from "@components/AvatarMenu";
import { UserRole } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

function LandingNavbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const isHiringPage = router.pathname === "/hiring";

  return (
    <div>
      <nav className="sticky top-0 bg-base-200 p-5">
        <div className="mx-auto flex max-w-screen-2xl items-center">
          <Link href="/">
            <h1 className="text-5xl">Bitjobs</h1>
          </Link>
          <div className="ml-auto flex items-center gap-10">
            {session && session.user?.role === UserRole.Employer && (
              <Link href="/employer" 
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus"
              >Employer Dashboard</Link>
            )}
            {!session && !isHiringPage && (
              <>
                <button
                  className="btn-primary btn"
                  onClick={() => {
                    void signIn("google", {}, { userRole: UserRole.Jobseeker });
                  }}
                >
                  Sign in as a Jobseeker
                </button>
                <Link href="/hiring">Hiring?</Link>
              </>
            )}
            {!session && isHiringPage && (
              <>
                <button
                  className="btn-primary btn"
                  onClick={() => {
                    void signIn("google", {}, { userRole: UserRole.Employer });
                  }}
                >
                  Sign in as an Employer
                </button>
                <Link href="/">Looking for Job?</Link>
              </>
            )}
            {session && (
              <>
                <AvatarMenu />
                {/* <p>{session.user?.email}</p>
                <p className="link" onClick={() => signOut()}>
                  signout?
                </p> */}
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default LandingNavbar;
