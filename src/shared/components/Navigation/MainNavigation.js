import React from "react";
import NavLinks from "./NavLinks";
import MainHeader from "./MainHeader";
import "../Style.css";
const MainNavigation = props => {
  return (
    <MainHeader>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <NavLinks />
        </div>
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
