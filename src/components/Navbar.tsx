import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import * as React from "react";
import NavbarLink from "./NavbarLink";

const Navbar: React.FC = () => {
  const session = useSession();

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex w-full justify-center bg-base-300 p-0">
      <nav className="navbar max-w-screen-2xl p-0">
        <div className="navbar-start flex items-center self-stretch">
          <Link href="/">
            <span className="bold p-0 text-4xl normal-case tracking-wider">Bitjobs</span>
          </Link>

          <div className="ml-5">
            <NavbarLink url="/provider/dashboard/jobs" text="Jobs" />
          </div>
        </div>
        <div className="navbar-end flex gap-2">
          {!session && (
            <>
              <Link href="/auth/login" passHref>
                <button className="btn btn-primary">Login</button>
              </Link>
              <Link href="/auth/register" passHref>
                <button className="btn">Register</button>
              </Link>
            </>
          )}
          {session && (
            <>
              <div className="dropdown-end dropdown">
                {/* <button tabIndex={0} className="btn btn-circle bg-base-100 p-0">
                  {defaultProfilePic}
                </button> */}
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box w-52 bg-base-300 p-2 shadow"
                >
                  <li>
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li>
                    <a onClick={() => void handleLogout()}>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
