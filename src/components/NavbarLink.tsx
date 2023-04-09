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
        <span className="flex h-full flex-col justify-center bg-base-100 p-8">{text}</span>
      </Link>
    </span>
  );
};

export default NavbarLink;
