import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface JobseekerLayoutProps {
  children: React.ReactNode;
}

function JobseekerLayout({ children }: JobseekerLayoutProps) {
  const { data: userData } = useSession();

  return (
    <div className="mx-auto max-w-screen-xl mt-4">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={"/"} className="btn-ghost btn text-4xl normal-case">
            BitJobs
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input-bordered input"
            />
          </div>
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <Image
                  src={userData?.user?.image || "/avatar.png"}
                  width={40}
                  height={40}
                  alt="avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link href={"/api/auth/signout"}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <main className="mt-16">{children}</main>
    </div>
  );
}

export default JobseekerLayout;
