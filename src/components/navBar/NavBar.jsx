import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navBar.css";
import img from "../../assests/myLogo2.png";
import { AuthContext } from "../../assests/AuthContext";

function NavBar({ onSearch }) {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext);

  const showSearchBar = location.pathname === "/jobs";
  const showNavBar = location.pathname === "/";

  const onSearchChange = (e) => {
    onSearch(e.target.value);
    setSearch(e.target.value);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {!showNavBar && (
        <nav className="navbar">
          <div className="nav-links">
            <Link to="/jobs">Home</Link>
            <Link to="/createJob">Create Job</Link>
          </div>
          <div>
            {showSearchBar && (
              <input
                type="search"
                className="search-box"
                value={search}
                placeholder="Search your job..."
                onChange={onSearchChange}
              />
            )}
          </div>
          <div className="logo-logout">
            <img className="logo" src={img} alt="company-logo" />
            <button className="logout" onClick={() => handleLogout()}>
              Logout
            </button>
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
