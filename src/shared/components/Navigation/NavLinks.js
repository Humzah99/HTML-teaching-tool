import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../Style.css";
import WebsiteIcon from "../../../shared/images/website-logo.png";
import { AuthContext } from "../context/auth-context";

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/documentation" className="nav-link" aria-current="page">
            Documentation
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/forum" className="nav-link">
            User Forum
          </NavLink>
        </li>
        {auth.isLoggedIn && <li className="nav-item">
          <NavLink to="/allQuizzes" className="nav-link">
            Quiz
          </NavLink>
        </li>}
      </ul>
      <div className="position-absolute top-0 start-50">
        <NavLink to="/">
          <img
            className="nav-icon shadow-lg"
            src={WebsiteIcon}
            alt="Website-Logo"
          />
        </NavLink>
      </div>
      {!auth.isLoggedIn && (
        <div className="position-absolute top-0 end-0">
          <NavLink to="/auth" className="btn mt-2 me-2">
            Login
          </NavLink>
        </div>
      )}
      {auth.isLoggedIn && (
        <div className="position-absolute top-0 end-0">
          <NavLink to="/" onClick={auth.logout} className="btn mt-2 me-2">
            Log out
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NavLinks;
