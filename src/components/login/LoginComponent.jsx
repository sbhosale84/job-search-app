import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import img from "../../assests/myLogo.png";
import { AuthContext } from "../../assests/AuthContext";

function LoginComponent() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const users = [
    {
      id: "1",
      name: "soham Bhosale",
      email: "admin@gmail.com",
      password: "123456",
      role: "admin",
    },
    {
      id: "2",
      name: "Regular User",
      email: "user@example.com",
      password: "userpass",
      role: "user",
    },
  ];

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validUser = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (validUser) {
      login(validUser);
    } else {
      setErrorMessage("Invalid email or password");
    }
    console.log("Form submitted", formData);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      navigate("/jobs");
    }
  }, [navigate]);

  return (
    <div className="main-container">
      <img className="my-logo" src={img} alt="logo" />
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="login-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            required
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="button-container">
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;
