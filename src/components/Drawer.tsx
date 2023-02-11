import * as React from "react";
import Menu from "./Menu";

interface Drawer {
  children: React.ReactNode;
}

const Drawer: React.FC<Drawer> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen(!open);

  return (
    <div className="drawer drawer-mobile h-screen rounded-none bg-base-200 shadow">
      <input id="appDrawer" type="checkbox" className="drawer-toggle" checked={open} readOnly />
      <div className="drawer-content flex flex-col items-center justify-start">
        <label
          htmlFor="appDrawer"
          className="btn btn-primary drawer-button mb-4 lg:hidden"
          onClick={toggleDrawer}
        >
          open menu
        </label>

        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="appDrawer" className="drawer-overlay" onClick={toggleDrawer}></label>
        <Menu />
      </div>
    </div>
  );
};

export default Drawer;
