import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navBar.css";
import img from "../../assests/myLogo2.png";
import { AuthContext } from "../../assests/AuthContext";

function NavBar({ onSearch }) {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [userType, setUserType] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const loginObj = JSON.parse(loggedInUser);
      if (loginObj.role === "admin") {
        setUserType(true);
      }
    }
  },[]);

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
            {userType && <Link to="/createJob">Create Job</Link>}
            {!userType && <p style={{'color': '#007bff'}} class>hello</p>}
          </div>
          <div className="search">
            {showSearchBar && (
              <input
                type="search"
                className={!userType ? "user-search-box" : "search-box"}
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
