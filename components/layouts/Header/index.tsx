import React from "react";
import Container from "../Container";
import Topbar from "./Topbar";
import DesktopMenu from "./DesktopMenu";

const Header = () => {
  return (
    <div>
      <Topbar />
      <div className="bg-background shadow-2xl">
        <Container>
          <div className="hidden md:block">
            <DesktopMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Header;
