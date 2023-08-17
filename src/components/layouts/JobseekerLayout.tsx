import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface JobseekerLayoutProps {
  children: React.ReactNode;
}

function JobseekerLayout({ children }: JobseekerLayoutProps) {
  const { data: userData } = useSession();

  return (
    <div className="mx-4 xl:mx-auto mt-4 max-w-screen-xl">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={"/"} className="btn-ghost btn text-4xl normal-case">
            BitJobs
          </Link>
        </div>
        <div className="flex-none gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={userData?.user?.image || ""} alt={userData?.user?.name || ""}/>
                <AvatarFallback>{userData?.user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={"/jobseeker/profile"}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <a>Settings</a>
              </DropdownMenuItem>
              <Link href={"/api/auth/signout"}>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <main className="mt-16">{children}</main>
    </div>
  );
}

export default JobseekerLayout;
