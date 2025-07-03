import { useState, React } from "react";
import "./Navbar.css";
import logo from "../../assets/images/logo.png";

import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar({ token, onSearch }) {
  /* ---------------------------- change background navbar --------------------------- */
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (this.scrollY >= 10) header.classList.add("scroll__header");
    else header.classList.remove("scroll__header");
  });
  const location = useLocation();

  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // if user removes with backspace it'll reset the search
    if (value.trim() === "") {
      onSearch("");
    }
  };

  const triggerSearch = () => {
    const trimmed = searchText.trim();
    if (trimmed === "") {
      onSearch("");
      return;
    }
    onSearch(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      triggerSearch();
    }
  };

  const handleClear = () => {
    setSearchText("");
    onSearch("");
  };

  return (
    <>
      <header className="header">
        <nav className="nav">
          <div className="logo">
            <img
              src={logo}
              className="nav-logo"
              onClick={() => (window.location.href = "/home")}
            />
          </div>
          <ul className="nav-list">
            <li title="Search your problems">
              <div className="search">
                <input
                  name=""
                  id=""
                  placeholder="Search your problem!"
                  value={searchText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />

                {searchText.trim() ? (
                  <i
                    className="fa-solid fa-xmark"
                    style={{ cursor: "pointer", marginRight: "8px" }}
                    onClick={handleClear}
                  />
                ) : null}
                <i
                  className="fa-solid fa-magnifying-glass"
                  style={{ cursor: "pointer" }}
                  onClick={triggerSearch}
                />
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
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
