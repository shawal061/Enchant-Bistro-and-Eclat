import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  // Container Style with Gradient Background
  const containerStyle = {
    display: "flex",
    flexDirection: "row", // Align items in a row
    justifyContent: "space-between",
    alignItems: "center",
    height: "100vh",
    padding: "0 5%",
    background: "linear-gradient(135deg, #FF6F00, #D32F2F)", // Orange to Red Gradient
    color: "#333", // Neutral text color for both sections
    fontFamily: "'Roboto', sans-serif",
    overflow: "hidden", // Prevent scrolling issues
  };

  // Left Section Style
  const leftSectionStyle = {
    width: "45%",
    color: "#fff",
    padding: "20px",
    textAlign: "left",
    lineHeight: "1.6",
  };

  // Form Container Style with Box Shadow, Padding, and Margin
  const formContainerStyle = {
    width: "450px", // Adjusted width for consistency
    padding: "10px", // Adjusted padding for consistency
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    marginTop: "25px", // Space from top
    marginBottom: "25px", // Space from bottom
  };

  // Hover Effect for Form Container
  const formContainerHoverStyle = {
    transform: "scale(1.03)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
  };

  // Label Style
  const labelStyle = {
    marginBottom: "6px", // Reduced margin
    marginLeft: "10px",
    fontWeight: "500",
    fontSize: "15px", // Smaller font size
  };

  // Input Style
  const inputStyle = {
    borderRadius: "8px",
    border: "1px solid #ddd",
    padding: "10px", // Reduced padding
    fontSize: "14px", // Smaller font size
    marginBottom: "12px", // Reduced margin
    marginLeft: "10px",
    width: "95%",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
  };

  // Button Style
  const buttonStyle = {
    backgroundColor: "#28a745",
    border: "none",
    color: "#fff",
    padding: "10px", // Reduced padding
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px", // Smaller font size
    transition: "background-color 0.3s ease",
    width: "100%",
  };

  // Button Hover Effect
  const buttonHoverStyle = {
    backgroundColor: "#218838",
  };

  // Link Style
  const linkStyle = {
    color: "#007bff",
    textDecoration: "none",
    fontSize: "14px", // Smaller font size
  };

  // State for Button Hover Effect
  const [buttonHover, setButtonHover] = useState(false);

  // State for Form Data
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    if (!json.success) {
      alert("Enter valid credentials!");
    } else {
      localStorage.setItem("authToken", json.authToken);
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
        <h1>Welcome Back!</h1>
        <p>
          Sign in to access your account and enjoy our exclusive services. If you are a new user, please register to explore our offerings.
        </p>
      </div>

      {/* Form Container with Hover Effect */}
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
              style={{ maxWidth: "100px", maxHeight: "100px" }} // Smaller logo
            />
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" style={labelStyle}>
              Email address
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
            <Link to="/signup" style={linkStyle}>
              New user?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
