import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const formContainerStyle = {
    maxWidth: "400px", // Set a maximum width for the form container
    margin: "auto", // Center the form container horizontally
    marginTop: "50px", // Add some top margin for spacing
    padding: "20px", // Add padding for a cleaner look
    border: "1px solid #ddd", // Add a border for styling
    borderRadius: "8px", // Add rounded corners
  };

  const labelStyle = {
    marginBottom: "8px", // Add some bottom margin to labels for spacing
  };

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      })
    );
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json, response.status);
    if (!json.success) {
      alert("Enter valid credentials!");
    } else {
      navigate("/");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" style={labelStyle}>
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" style={labelStyle}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" style={labelStyle}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" style={labelStyle}>
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
            ></input>
          </div>
          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-5">
            Already a user?
          </Link>
        </form>
      </div>
    </>
  );
}
