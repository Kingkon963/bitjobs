import LandingFooter from "@components/LandingFooter";
import LandingNavbar from "@components/LandingNavbar";
import React from "react";

type LandingLayoutProps = {
  children: React.ReactNode;
};

function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div>
      <LandingNavbar />
      <main>{children}</main>
      <LandingFooter />
    </div>
  );
}

export default LandingLayout;
