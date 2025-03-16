import React from "react";
import "./Navbar.css";
import logo from "../../assets/images/SomebodyFixIt.svg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  /* ---------------------------- change background navbar --------------------------- */
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (this.scrollY >= 10) header.classList.add("scroll__header");
    else header.classList.remove("scroll__header");
  });

  const navigate = useNavigate();
  const handleAvatarClick = () => {
    navigate("/my-profile"); // Navigate to My Profile page
  };

  return (
    <>
      <header className="header">
        <nav className="nav">
          <div className="logo">
            <img src={logo} href="index.html" className="nav-logo" />
            SomebodyFixIt
          </div>
          <ul className="nav-list">
            <li>
              <a href="">
                <i className="fa-solid fa-house" />
              </a>
            </li>
            <li>
              <div className="search">
                <input name="" id="" placeholder="Search your problem!" />
                <i className="fa-solid fa-magnifying-glass" />
              </div>
            </li>
            <li>
              <div className="profile">
                <i className="fa-solid fa-user" />
                <div className="profile-content">
                  <a onClick={handleAvatarClick}>My Profile</a>
                  <a href="#">Logout</a>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
