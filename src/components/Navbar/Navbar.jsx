import React from "react";
import "./Navbar.css";
import logo from "../../assets/images/navbarLogo.svg";
import { Link, useLocation } from "react-router-dom";

function Navbar({ token }) {
  /* ---------------------------- change background navbar --------------------------- */
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (this.scrollY >= 10) header.classList.add("scroll__header");
    else header.classList.remove("scroll__header");
  });
  const location = useLocation();

  return (
    <>
      <header className="header">
        <nav className="nav">
          <div className="logo">
            <Link to="/home">
              <img src={logo} className="nav-logo" />
            </Link>
            <p>
              Somebody<span>FixIt</span>
            </p>
          </div>
          <ul className="nav-list">
            <li title="Search your problems">
              <div className="search">
                <input name="" id="" placeholder="Search your problem!" />
                <i className="fa-solid fa-magnifying-glass" />
              </div>
            </li>
            <li
              title="Home"
              className={location.pathname === "/home" ? "active" : ""}
            >
              <Link to="/home">
                <i className="fa-solid fa-house" />
              </Link>
            </li>

            <li
              title="My Profile"
              className={location.pathname === "/my-profile" ? "active" : ""}
            >
              <Link to="/my-profile">
                <i className="fa-solid fa-circle-user"></i>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
