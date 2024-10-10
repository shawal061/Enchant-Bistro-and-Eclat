import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from './ContextReducer';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // Proud of myself :')
  const cartLength = useCart().length

  return (
    <>
      {/* A Navbar is chosen from bootstrap templates */}
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-white" style={{ zIndex: 1000 }}>
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/">
                  <img
                    src={process.env.PUBLIC_URL + "/logo/Clear Logo.png"}
                    alt="Logo"
                    className="navbar-brand"
                    style={{ maxWidth: "75px", maxHeight: "75px" }}
                  />
                </Link>
              </li>
              <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                <li className="nav-item mt-2">
                  Welcome to
                  <br />
                  <span className="text-uppercase fs-4 font-weight-bold">
                    Enchanté Bistro and Eclat
                  </span>
                </li>
              </Link>
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-black mx-1" to="/signup">
                  Signup
                </Link>

                <Link className="btn bg-white text-black mx-1" to="/login">
                  Login
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/order-history" className="btn bg-white text-success mx-2">Order History</Link>
                <Link to="/cart" className="btn bg-white text-success mx-2">
                  My Cart {""}
                  <span class="badge badge-pill badge-primary text-success">{cartLength}</span>
                </Link>
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
    </>
  );
}
