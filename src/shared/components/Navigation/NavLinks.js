import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../Style.css";
import WebsiteIcon from "../../../shared/images/website-logo.png";
import { AuthContext } from "../context/auth-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";

const UserIcon = (
  <FontAwesomeIcon className="icon user-icon" icon={faUser} size="2x" />
);

const NavbarCollapseIcon = (
  <FontAwesomeIcon className="icon bar-icon" icon={faBars} size="2x" />
);

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon">{NavbarCollapseIcon}</span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              to="/documentation"
              className="nav-link"
              aria-current="page"
            >
              Documentation
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/forum" className="nav-link">
              User Forum
            </NavLink>
          </li>
          {auth.isLoggedIn && (
            <li className="nav-item">
              <NavLink to="/quiz" className="nav-link">
                Quiz
              </NavLink>
            </li>
          )}
        </ul>
        <div className="position-absolute top-0 start-50">
          <NavLink to="/">
            <img
              className="nav-icon"
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
          <div
            className="position-absolute top-0 end-0"
            style={{ marginTop: "0.3em" }}
          >
            <NavLink
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>{UserIcon}</span>
            </NavLink>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li className="dropdown-item text-center">
                <NavLink to="/" onClick={auth.logout} className="btn logout-btn mt-2 me-2">
                  Log out
                </NavLink>
              </li>
              <li className="dropdown-item text-center">
                <NavLink
                  to={`/userProfile/${auth.userId}`}
                  className="dashboard-link"
                >
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default NavLinks;
