import React from 'react'
import ThemeSwitch from "@components/ThemeSwitch";
import AvatarMenu from "@components/AvatarMenu";
import { UserRole } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function LandingNavbar() {
  const { data: session } = useSession();

  return (
    <div>
              <nav className="sticky top-0 bg-base-200 p-5">
          <div className="mx-auto flex max-w-screen-2xl items-center">
            <h1 className="text-5xl">Britjobs</h1>
            <div className="ml-auto flex items-center gap-10">
              <ThemeSwitch />
              {!session && (
                <>
                  <button
                    className="btn-primary btn"
                    onClick={() => {
                      void signIn(
                        "google",
                        {},
                        { userRole: UserRole.Jobseeker }
                      );
                    }}
                  >
                    Sign in
                  </button>
                  <Link href="/hiring">Hiring?</Link>
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
  )
}

export default LandingNavbar