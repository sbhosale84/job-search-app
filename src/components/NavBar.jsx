import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navBar.css";
import img from "../assests/myLogo2.png";

function NavBar({ onSearch }) {
  const [search, setSearch] = useState("");
  const location = useLocation();

  const showSearchBar = location.pathname === "/jobs";

  const onSearchChange = (e) => {
    onSearch(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/jobs">Home</Link>
        <Link to="/createJob">Create Job</Link>
      </div>
      <div>
       {showSearchBar && <input
          type="search"
          className="search-box"
          value={search}
          placeholder="Search your job..."
          onChange={onSearchChange}
        />}
      </div>
      <div>
        <img className="logo" src={img} alt="company-logo"/>
      </div>
    </nav>
  );
}

export default NavBar;
