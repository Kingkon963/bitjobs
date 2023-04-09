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
      <main>
        <div className="w-full max-w-screen-2xl mx-auto">{children}</div>
      </main>
      <LandingFooter />
    </div>
  );
}

export default LandingLayout;
