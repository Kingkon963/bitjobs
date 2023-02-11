import * as React from "react";
import Navbar from "./Navbar";

interface Layout {
  children: React.ReactNode;
}

const Layout: React.FC<Layout> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-screen-2xl">{children}</div>
    </div>
  );
};

export default Layout;
