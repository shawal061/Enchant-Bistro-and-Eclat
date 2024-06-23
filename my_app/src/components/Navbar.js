import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div>
      {/* A Navbar is chosen from bootstrap templates */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#2E86AB", zIndex: 1000 }}>
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/">
                  <img
                    src={process.env.PUBLIC_URL + "/logo/Clear Logo.png"} // Adjust the path based on your project structure
                    alt="Logo"
                    className="navbar-brand"
                    style={{ maxWidth: "50px", maxHeight: "50px" }} // Adjust the size as needed
                  />
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link className="btn bg-white text-success mx-1" to="/signup">
                    My orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/signup">
                  Signup
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-2">My Cart</div>
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
