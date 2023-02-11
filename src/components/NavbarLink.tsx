import Link from "next/link";
import * as React from "react";

interface NavbarLink {
  url: string;
  text: string;
}

const NavbarLink: React.FC<NavbarLink> = ({ url, text }) => {
  return (
    <span>
      <Link href={url}>
        <a className="flex h-full flex-col justify-center bg-base-100 p-8">{text}</a>
      </Link>
    </span>
  );
};

export default NavbarLink;
