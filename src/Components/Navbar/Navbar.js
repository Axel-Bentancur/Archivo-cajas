import React from "react";
import Logo from "./inaeslogo.png";

/* STYLES */
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light navigation">
      <div className="container-fluid nav-inaes">
        <img src={Logo} alt="inaes logo" />
      </div>
      <div className="buttons-container"></div>
    </nav>
  );
}
