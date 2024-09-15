import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  // Container Style with Gradient Background
  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100vh",
    padding: "0 5%",
    background: "linear-gradient(135deg, #FF6F00, #D32F2F)", // Orange to Red Gradient
    color: "#333",
    fontFamily: "'Roboto', sans-serif",
    overflow: "hidden",
  };

  const leftSectionStyle = {
    width: "45%",
    color: "#fff",
    padding: "20px",
    textAlign: "left",
    lineHeight: "1.6",
  };

  const formContainerStyle = {
    width: "450px",
    padding: "10px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    marginTop: "25px",
    marginBottom: "25px",
  };

  const formContainerHoverStyle = {
    transform: "scale(1.03)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
  };

  const labelStyle = {
    marginBottom: "6px",
    marginLeft: "10px",
    fontWeight: "500",
    fontSize: "15px",
  };

  const inputStyle = {
    borderRadius: "8px",
    border: "1px solid #ddd",
    padding: "10px",
    fontSize: "14px",
    marginBottom: "12px",
    marginLeft: "10px",
    width: "95%",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
  };

  const buttonStyle = {
    backgroundColor: "#28a745",
    border: "none",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
    width: "100%",
  };

  const buttonHoverStyle = {
    backgroundColor: "#218838",
  };

  const linkStyle = {
    color: "#007bff",
    textDecoration: "none",
    fontSize: "14px",
  };

  // State for Button Hover Effect
  const [buttonHover, setButtonHover] = useState(false);

  // State for Form Data
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    if (response.status === 400 && json.message) {
      // Display specific error message from backend
      alert(json.message);
    } else if (!json.success) {
      alert("Please enter valid credentials!");
    } else {
      navigate("/");
    }
  };

  // Handle Input Change
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div style={containerStyle}>
      {/* Left Section with Restaurant Info */}
      <div style={leftSectionStyle}>
        <h1>Welcome to Enchanté Bistro and Eclat</h1>
        <p>
          Enjoy our carefully curated dishes and exclusive services. Our passion
          for fine dining ensures that your experience is always memorable. Sign
          up now to stay updated on our latest offers and events.
        </p>
      </div>

      {/* Form Container */}
      <div
        style={{
          ...formContainerStyle,
          ...(buttonHover ? formContainerHoverStyle : {}),
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/logo/Clear Logo.png"}
              alt="Logo"
              className="navbar-brand"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" style={labelStyle}>
              Username
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              style={inputStyle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              style={inputStyle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              style={inputStyle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location" style={labelStyle}>
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={credentials.location}
              onChange={onChange}
              style={inputStyle}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={buttonHover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            Submit
          </button>
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <Link to="/login" style={linkStyle}>
              Already a user?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
