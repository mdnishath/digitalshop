import React from "react";
import Container from "../Container";
import Topbar from "./Topbar";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <div>
      <Topbar />
      <div className="hidden sm:block">
        <DesktopMenu />
      </div>
      <div className="sm:hidden shadow bg-background">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Header;
