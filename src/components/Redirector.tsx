import React from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { UserRole } from "@prisma/client";
import { useRouter } from "next/router";

function Redirector() {
  const { data: userData } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (userData) {
      if (userData.user.role === UserRole.Employer)
        router
          .push("/employer")
          .then(() => {
            // console.log("sf");
          })
          .catch((err) => {
            console.log(err);
          });
      else if (userData.user.role === UserRole.Jobseeker)
        router
          .push("/jobseeker")
          .then(() => {
            // console.log("sf");
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, [router, userData]);
  return <></>;
}

export default Redirector;
